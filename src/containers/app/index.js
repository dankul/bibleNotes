import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVersesAction } from '../Bible/fetchVersesAction'; //todo: for develop mode -dev
import NotesMenu from '../Menu';
import VersesList from '../Bible';
import Notes from '../Notes';
import Bible from "../Bible/Bible";
import DisplayChapter from "../Bible/DisplayChapter";

let search = window.location.search;
let numDay;

let errorMessage = 'Add number day of year: /?numDay=3';

search.replace(/\?/, '').split('&').map((param) => {
  if(param.search('numDay') !== -1) {
    numDay = param.replace(/numDay=/, '')
  }
});

class App extends React.Component{
  constructor(props) {
    super(props);

    if(numDay) {
      errorMessage = 'Loading...';
      this.props.fetchVersesAction(numDay);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...nextProps.notesReducer})
  }

  render() {
    if(!this.state) {return <Bible/>}

    return (
      <div>
        <NotesMenu />
        {this.state.isLogin ? <Notes /> : this.state.verses[0] ? <VersesList /> : this.state.bibleText ? <DisplayChapter/> : <Bible/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    notesReducer: state.notesReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchVersesAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
// export default withAuthenticator(App);
// export default connect(mapStateToProps, mapDispatchToProps)(process.env.REACT_APP_MODE === 'autologin' ? App : withAuthenticator(App));
