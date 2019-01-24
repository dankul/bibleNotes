import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Plan from './B2YPlan';
import { putPresenterAction } from "./putPresenterAction";
import { getPresentersAction } from "./getPresentersAction";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.props.getPresentersAction();

        this.state = {
            planList: this.createPlanList(),
            weekPresenter: {
                weekNum: null,
            },
            presenters: this.props.notesReducer.presenters,
        };

        this.displayPlanList = this.displayPlanList.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log('nextProps', nextProps.notesReducer.presenters);
        this.setState({
            presenters: nextProps.notesReducer.presenters,
        });
    }


    createPlanList () {
        const daysPlanList = Plan[2].days[0];
        let weekList = {};

        daysPlanList.forEach((dayPlan) => {
            let date = moment().utc().dayOfYear(dayPlan.numday);
            let week = date.format('W');

            if(moment(date).isoWeekYear() === 2020){
                if (weekList[53]) {
                    weekList[53][weekList[53].length] = {
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }
                } else {
                    weekList[53] = [{
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }]
                }
            } else {
                if (weekList[week]) {
                    weekList[week][weekList[week].length] = {
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }
                } else {
                    weekList[week] = [{
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }]
                }
            }
        });

        return weekList
    }

    displayPlanList () {
        return (
            Object.values(this.state.planList).map((dayList, weekNum) => {
                let weekId = (weekNum+1).toString();

                return (
                    <div key={weekId}>
                        {this.state.weekPresenter.weekNum === weekId ?
                            <div className={'calendarContainer'} key={'calendarContainer' + weekId}>
                                <div className={'planWeekList'} key={'planWeekList' + weekId}>
                                    <div className={'week'} onClick={() => {
                                        this.state.weekPresenter.weekNum === weekId ?
                                            this.setState({
                                                weekPresenter: {
                                                    ...this.state.weekPresenter, weekNum: null
                                                }}):
                                            this.setState({weekPresenter: {
                                                    ...this.state.weekPresenter, weekNum: weekId
                                                }})}}
                                    > {weekId} </div>
                                    <div key={'dayId' + weekId} className={'dayContainer'}>
                                        {dayList.map((day, dayId) => {
                                            return (
                                                <div key={dayId} className={'day'}>
                                                    <div className={'dayDate'}> {day.date} </div>
                                                    <div className={'dayTitle'}> {day.title} </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={'calendarForm'}>
                                    <input
                                        value={
                                            this.state.presenters[weekId]
                                                ? this.state.presenters[weekId].presenter.name
                                                : undefined
                                        }
                                        placeholder={'Имя Фамилия Отчество'}
                                        onChange={(e) => {
                                            if (this.state.presenters[weekId]) {
                                                this.setState({
                                                    ...this.state,
                                                    presenters: {
                                                        ...this.state.presenters,
                                                        [weekId]: {
                                                            ...this.state.presenters[weekId],
                                                            presenter: {
                                                                ...this.state.presenters[weekId].presenter,
                                                                name: e.target.value
                                                            }
                                                        }
                                                    }
                                                })
                                            } else {
                                                this.props.putPresenterAction(
                                                    {
                                                        presenter: {
                                                            name: e.target.value,
                                                            phoneNum: '',
                                                            email: '',
                                                        },
                                                        weekDateReference: this.state.planList[weekId][0].date + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].date,
                                                        weekBibleReference: this.state.planList[weekId][0].title + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].title,
                                                        weekNum: +weekId,
                                                    }
                                                );
                                            }
                                        }}
                                    />
                                    <input
                                        value={
                                            this.state.presenters[weekId] ?
                                                this.state.presenters[weekId].presenter.phoneNum:
                                                undefined
                                        }
                                        placeholder={'+380'}
                                        onChange={(e) => {
                                            if (this.state.presenters[weekId]) {
                                                this.setState({
                                                    ...this.state,
                                                    presenters: {
                                                        ...this.state.presenters,
                                                        [weekId]: {
                                                            ...this.state.presenters[weekId],
                                                            presenter: {
                                                                ...this.state.presenters[weekId].presenter,
                                                                phoneNum: e.target.value
                                                            }
                                                        }
                                                    }
                                                })
                                            } else {
                                                this.props.putPresenterAction(
                                                    {
                                                        presenter: {
                                                            name: '',
                                                            phoneNum: e.target.value,
                                                            email: '',
                                                        },
                                                        weekDateReference: this.state.planList[weekId][0].date + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].date,
                                                        weekBibleReference: this.state.planList[weekId][0].title + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].title,
                                                        weekNum: +weekId,
                                                    }
                                                );
                                            }
                                        }}
                                    />
                                    <input
                                        value={
                                            this.state.presenters[weekId] ?
                                                this.state.presenters[weekId].presenter.email:
                                                undefined
                                        }
                                        placeholder={'email'}
                                        onChange={(e) => {
                                            if (this.state.presenters[weekId]) {
                                                this.setState({
                                                    ...this.state,
                                                    presenters: {
                                                        ...this.state.presenters,
                                                        [weekId]: {
                                                            ...this.state.presenters[weekId],
                                                            presenter: {
                                                                ...this.state.presenters[weekId].presenter,
                                                                email: e.target.value
                                                            }
                                                        }
                                                    }
                                                })
                                            } else {
                                                this.props.putPresenterAction(
                                                    {
                                                        presenter: {
                                                            name: '',
                                                            phoneNum: '',
                                                            email: e.target.value,
                                                        },
                                                        weekDateReference: this.state.planList[weekId][0].date + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].date,
                                                        weekBibleReference: this.state.planList[weekId][0].title + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].title,
                                                        weekNum: +weekId,
                                                    }
                                                );
                                            }
                                        }}
                                    />
                                    <button onClick={() => {this.props.putPresenterAction(this.state.presenters[weekId])}}>Submit</button>
                                </div>
                            </div> :
                            <div className={'calendarContainer mini'} key={'calendarContainer' + weekId} onClick={() => {this.setState({
                                weekPresenter: {
                                    ...this.state.weekPresenter, weekNum:
                                    weekId,
                                    weekDateReference: this.state.planList[weekId][0].date + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].date,
                                    weekBibleReference: this.state.planList[weekId][0].title + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].title,
                                }
                            })}}>
                                <div className={'week'} onClick={() => {
                                    this.state.weekPresenter.weekNum === weekId ?
                                        this.setState({
                                            weekPresenter: {
                                                ...this.state.weekPresenter, weekNum: null
                                            }}):
                                        this.setState({weekPresenter: {
                                                ...this.state.weekPresenter, weekNum: weekId
                                            }});

                                    this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter,
                                        }
                                    });
                                }}
                                > {weekId} </div>
                                <div style={{flexDirection: 'column'}}>
                                    <div className={'weekDateReference'}>
                                        {
                                            this.state.planList[weekId][0] ?
                                                this.state.planList[weekId][0].date + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].date :
                                                null
                                        }
                                    </div>
                                    <div className={'weekBibleReference'}>
                                        {
                                            this.state.planList[weekId][0] ?
                                                this.state.planList[weekId][0].title + ' - ' + this.state.planList[weekId][this.state.planList[weekId].length -1].title :
                                                null
                                        }
                                    </div>
                                    <div className={'weekPresenterReference'}>
                                        {
                                            this.state.presenters[weekId]
                                                ? this.state.presenters[weekId].presenter.name
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            })
        )
    }

    render () {
        if (Object.keys(this.state.presenters).length < 1) {
            return (
                <div>
                    {'Loading...'}
                </div>
            )
        }
        return (
            <div>
                {this.displayPlanList()}
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
        putPresenterAction,
        getPresentersAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
// export default Calendar;
