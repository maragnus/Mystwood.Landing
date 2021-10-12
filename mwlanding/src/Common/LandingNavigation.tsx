import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {CalendarToday, GroupsOutlined, BookOutlined} from "@mui/icons-material";

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
            <BottomNavigationAction label="Characters" icon={<GroupsOutlined/>} />
            <BottomNavigationAction label="Skills" icon={<BookOutlined/>} />
            <BottomNavigationAction label="Events" icon={<CalendarToday/>} />
        </BottomNavigation>
    );
}