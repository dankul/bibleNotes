import React from 'react';
import {connect} from "react-redux";
import Bible from '../Bible/Bible'
import {bindActionCreators} from "redux";
import {fetchChapterAction} from "./fetchChapterAction";

class DisplayChapter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.props.notesReducer;

        this.chapterRender = this.chapterRender.bind(this);
    }

    chapterRender (selector) {
        if (selector === undefined) {
                return (
                    this.state.bibleText ?
                    <div style={{marginLeft: 30}}>
                        <div>Глава: {this.state.bibleText[0]}</div>
                        <div>
                            {Object.keys(this.state.bibleText).map((verseId) => {
                                if(verseId === '0') {return}
                                return (
                                    <div
                                        key={'verseContainer' + verseId}
                                        style={{
                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',
                                            marginTop: 5
                                        }}
                                    >
                                        <div key={'verseId' + verseId} style={{width: 40, marginRight: 10}}>{verseId}</div>
                                        <div key={'verse' + verseId}>{this.state.bibleText[verseId]}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div> :
                    null
                )
        } else {
            this.props.fetchChapterAction({bookId: '', chapterId: ''});
            return <Bible />
        }
    }

    render() {
        return (
            <div>
                <div
                    onClick={() => {
                        this.chapterRender(true)
                    }}
                >
                    {"Выбрать Книгу"}
                </div>
                {this.chapterRender()}
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
        fetchChapterAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayChapter);