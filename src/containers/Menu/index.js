import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'semantic-ui-react'
import { toLoginAction } from "./toLoginAction";
import { setMenuItemAction } from  "./setMenuItemAction"

class NotesMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.notesReducer,
            activeItem: '',
            options: [
                { key: 1, text: 'Войти', value: 1, onClick: () => {this.onLogin()} },
                { key: 2, text: 'О проекте', value: 2 },
            ]
        };

        this.onLogin = this.onLogin.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.notesReducer
        })
    }

    handleItemClick (name) {
        this.setState({
            activeItem: name
        });

        this.props.setMenuItemAction(name);
    }

    onLogin() {
        this.props.toLoginAction(true);
    }

    render () {
        return (
            <Menu>
                <Dropdown item simple text='Меню' direction='left' options={this.state.options} />
                {this.state.isLogin ? <Menu.Item active={this.state.activeItem === 'isNote'} onClick={() => {this.handleItemClick('isNote')}}>Заметки</Menu.Item> : null}
                {this.state.isLogin ? <Menu.Item active={this.state.activeItem === 'isRead'} onClick={() => {this.handleItemClick('isRead')}}>Чтение</Menu.Item> : null}
                {this.state.isLogin ? <Menu.Item active={this.state.activeItem === 'presenter'} onClick={() => {this.handleItemClick('presenter')}}>План</Menu.Item> : null}
                {this.state.isLogin ? <Menu.Item active={this.state.activeItem === 'bible'} onClick={() => {this.handleItemClick('bible')}}>Библия</Menu.Item> : null}
            </Menu>
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
        toLoginAction,
        setMenuItemAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesMenu);
