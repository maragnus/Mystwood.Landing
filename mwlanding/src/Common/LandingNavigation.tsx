import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {CalendarToday, GroupsOutlined, BookOutlined, PersonOutline} from "@mui/icons-material";
import {NavLink} from 'react-router-dom';

export default function LandingNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Profile" icon={<PersonOutline/>} to="/profile" component={NavLink}/>
            <BottomNavigationAction label="Characters" icon={<GroupsOutlined/>} to="/characters" component={NavLink}/>
            <BottomNavigationAction label="Skills" icon={<BookOutlined/>} to="/skills" component={NavLink}/>
            <BottomNavigationAction label="Events" icon={<CalendarToday/>} to="/events" component={NavLink}/>
        </BottomNavigation>
    );
}