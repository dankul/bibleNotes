import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import VersesList from '../Bible';
import WeekNotes from "./WeekNotes";
import Calendar from  '../Calendar/Calendar';
import Bible from '../Bible/Bible'
// import {toLoginAction} from "../Menu/toLoginAction";
// import {setMenuItemAction} from "../Menu/setMenuItemAction";

Auth.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:5a8e8b96-3736-4577-a1cb-a7f109c008ae',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_wMuuEKI4z',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1v8gtbj914scjmkjpdfdkbve2b',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.localhost',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      secure: true
    }
  }
});

// if(process.env.REACT_APP_MODE === 'autologin') {
//   Auth.signIn(process.env.REACT_APP_LOGIN, process.env.REACT_APP_PASSWD);
// }

class Notes extends React.Component{
  constructor(props) {
    super(props);

    this.state ={
      ...this.props.notesReducer
    };

    this.switchMenuElement = this.switchMenuElement.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.notesReducer
    })
  }

  switchMenuElement () {
    switch (this.state.menuItemName) {
      case 'isNote' :
        return (<WeekNotes/>);
      case 'isRead' :
        return (<VersesList/>);
      case 'presenter' :
        return(<Calendar/>);
      case 'bible' :
        return (<Bible/>);
      default:
        return(<WeekNotes/>);
    }
  }

  render() {
    return (
      <div>
        {this.switchMenuElement()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    notesReducer: state.notesReducer,
  };
}

// export default App;
// export default container;
export default connect(mapStateToProps)(withAuthenticator(Notes));
// export default connect(mapStateToProps)(process.env.REACT_APP_MODE === 'autologin' ? Notes : withAuthenticator(Notes));
