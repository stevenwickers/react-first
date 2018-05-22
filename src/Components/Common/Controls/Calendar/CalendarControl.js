import React, {PropTypes} from 'react';
import Calendar from 'rc-calendar';
import '../../../../../node_modules/rc-calendar/dist/rc-calendar.css';

const CalendarControl = ({id, onChange, onClick}) =>{
    return(
        <Calendar style={{position: 'absolute'}}
            showDateInput={false}
            showToday={true}
            showOk={true}
            onChange={(e) =>onClick(id,e)}
            onSelect={(e) =>onChange(id,e)} />
    )

};

export default CalendarControl;