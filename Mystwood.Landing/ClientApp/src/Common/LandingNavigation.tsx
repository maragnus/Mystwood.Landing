import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
    LockOpenOutlined,
    CalendarToday,
    GroupsOutlined,
    BookOutlined,
    PersonOutline
} from "@mui/icons-material";
import {NavLink} from 'react-router-dom';
import sessionService from "../Session/SessionService";

export default class LandingNavigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0,
            isAuthenticated: sessionService.isAuthenticated(),
        };
    }

    private _sessionCallback?: number;

    componentDidMount() {
        this._sessionCallback = sessionService.subscribe(() => {
            this.setState((state: any) => ({
                value: state.value,
                isAuthenticated: sessionService.isAuthenticated()
            }));
        })
    }

    componentWillUnmount() {
        sessionService.unsubscribe(this._sessionCallback);
    }

    render() {
        const isAuth: boolean = this.state.isAuthenticated;
        let items = isAuth
            ? [
                <BottomNavigationAction key={0} label="Profile" icon={<PersonOutline/>} to="/profile" component={NavLink}/>,
                <BottomNavigationAction key={1} label="Characters" icon={<GroupsOutlined/>} to="/characters"
                                        component={NavLink}/>
            ]: [
                <BottomNavigationAction key={0} label="Login" icon={<LockOpenOutlined/>} to="/login" component={NavLink}/>
            ];


        return (
            <BottomNavigation
                showLabels
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({value: newValue});
                }}
            >
                {items}
                <BottomNavigationAction key={3} label="Skills" icon={<BookOutlined/>} to="/skills" component={NavLink}/>
                <BottomNavigationAction key={4} label="Events" icon={<CalendarToday/>} to="/events" component={NavLink}/>
            </BottomNavigation>
        );
    }
}