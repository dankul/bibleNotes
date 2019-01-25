import React from 'react';
import AllBible from './synodal'
import { bindActionCreators } from "redux";
import { fetchChapterAction } from "../Bible/fetchChapterAction";
import { connect } from "react-redux";
import DisplayChapter from "./DisplayChapter";

class Bible extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bibleStructure: this.bibleForce(),
            displayedBook: '',
            bibleLink: {}
        };

        this.bibleForce = this.bibleForce.bind(this);
        this.displayBible = this.displayBible.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            ...nextProps.notesReducer,
        })

    }

    bibleForce () {
        let bibleBookName = {
            "1": "Бытие",
            "2": "Исход",
            "3": "Левит",
            "4": "Числа",
            "5": "Второзаконие",
            "6": "Иисуса Навина",
            "7": "Судей",
            "8": "Руфь",
            "9": "Первая книга Царств",
            "10": "Вторая книга Царств",
            "11": "Третья книга Царств",
            "12": "Четвертая книга Царств",
            "13": "Первая книга Паралипоменон",
            "14": "Вторая книга Паралипоменон",
            "15": "Ездра",
            "16": "Неемия",
            "17": "Есфирь",
            "18": "Иов",
            "19": "Псалтирь",
            "20": "Притичи",
            "21": "Екклесиаст",
            "22": "Песня Песней",
            "23": "Исаия",
            "24": "Иеремия",
            "25": "Плач Иеремии",
            "26": "Иезекииль",
            "27": "Даниил",
            "28": "Осия",
            "29": "Иоиль",
            "30": "Амос",
            "31": "Авдий",
            "32": "Иона",
            "33": "Михей",
            "34": "Наум",
            "35": "Аввакум",
            "36": "Софония",
            "37": "Аггей",
            "38": "Захария",
            "39": "Малахия",
            "40": "От Матфея",
            "41": "От Марка",
            "42": "От Луки",
            "43": "От Иоанна",
            "44": "Деяния",
            "45": "Иакова",
            "46": "Первое послание Петра",
            "47": "Второе послание Петра",
            "48": "Первое послание Иоанна",
            "49": "Второе послание Иоанна",
            "50": "Третье послание Иоанна",
            "51": "Послание Иуды",
            "52": "Римлянам",
            "53": "Первое Коримфянам",
            "54": "Второе Коримфянам",
            "55": "Галатам",
            "56": "Ефесянам",
            "57": "Филиппийцам",
            "58": "Колоссянам",
            "59": "Первое Фессалоникийцам",
            "60": "Второе Фессалоникийцам",
            "61": "Первое Тимофею",
            "62": "Второе Тимофею",
            "63": "Титу",
            "64": "Филимону",
            "65": "Евреям",
            "66": "Откровение",
        };

        let bibleStructure = {};

        Object.keys(AllBible).forEach((bibleNum) => {
            bibleStructure[bibleNum] = {
                bibleBookName: bibleBookName[bibleNum],
                chapterList: []
            };
            Object.keys(AllBible[bibleNum]).forEach((chapter) => {
                if (chapter !== '0') {
                    bibleStructure[bibleNum].chapterList[bibleStructure[bibleNum].chapterList.length] = chapter;
                }
            })
        });

        return bibleStructure;
    }

    displayBible () {
        return (
            Object.keys(this.state.bibleStructure).map((bookNum, bookId) => {
                return (
                    <div
                        className={'book'}
                        key={bookId}
                    >
                        <div
                            className={'bibleBookName'}
                            onClick={() => {
                                if (this.state.displayedBook === bookNum) {
                                    this.setState({
                                        displayedBook: '',
                                        bibleLink: {
                                            ... this.state.bibleLink,
                                            bookId: '',
                                            chapterId: ''
                                        }
                                    })
                                } else {
                                    this.setState({
                                        displayedBook: bookNum,
                                        bibleLink: {
                                            ... this.state.bibleLink,
                                            bookId: bookNum,
                                            chapterId: ''
                                        }
                                    })
                                }
                            }}
                        >
                            {this.state.bibleStructure[bookNum].bibleBookName}
                        </div>
                        <div className={'chapterContainer'}>
                            {this.state.bibleStructure[bookNum].chapterList.map((chapterNum, chapterId) => {
                                if (this.state.displayedBook === bookNum){
                                    return (
                                        <div
                                            className={'chapter'}
                                            key={chapterId}
                                            onClick={() => {
                                                this.setState({
                                                    bibleLink: {
                                                        ...this.state.bibleLink,
                                                        chapterId: chapterNum
                                                    }
                                                });
                                                this.props.fetchChapterAction({bookId: this.state.bibleLink.bookId, chapterId: chapterNum});
                                            }}
                                        >
                                            {chapterNum}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className={'bible'}>
                {this.state.bibleText ? <DisplayChapter/> : this.displayBible()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Bible);