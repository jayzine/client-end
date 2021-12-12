import React, { useEffect, useState } from 'react';
import { useQuery} from '@apollo/client';
import { LOAD_TASK } from '../graphql/Query';
import {TableBody, Table, TableRow, TableCell, TableContainer, Chip} from '@material-ui/core'
import {getconfig} from '../my-app-config';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    
    const {error, loading, data} = useQuery(LOAD_TASK);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        setTaskList(taskList => data);
    }, [data])

    if (taskList == undefined) {
        return (<p>loading....</p>)
    }
    const listData = taskList.getTaskList;

    if (!listData) {
        return (<>loading...</>)
    }

    let loopIndex = 1; //make table id T-1,2,3....

    //loop
    const list = listData.map(item => {
        let todaysDate = new Date();
        let year = todaysDate.getFullYear(),
            month = todaysDate.getMonth(),
            date = todaysDate.getDate();
        todaysDate = new Date(year, month, date);

        let FindDay = new Date(item.date+" 00:00:00");

        //create dateFormat
        let dateFormat = '';
        if (todaysDate.getTime() == FindDay.getTime()) {
            dateFormat = `${FindDay.getDate()} ${getconfig.monthName[FindDay.getMonth()]},  ${FindDay.getFullYear()} (Launch day)`;
            loopIndex = 1;
        } else {
            loopIndex++; //increment
            dateFormat = `${getconfig.month[FindDay.getMonth()]}, ${FindDay.getDate()} ${FindDay.getFullYear()}`;
        }

        let pathForDetails = `/task-details/${item.id}/${loopIndex}`; //create route
        let backgroundColor = '', taskId = '';

        //find if sunday or saturday
        switch(FindDay.getDay()) {
            case 0: backgroundColor = "grey";break;
            case 6: backgroundColor = "grey";break;
            default: taskId = `T-${loopIndex} - `;
        }

        return (
            <TableRow key={item.id} style={{ background: `${backgroundColor}`}}>
                <TableCell>
                        {taskId}
                        <code>{dateFormat}</code>
                        <Link to={pathForDetails} style={{ textDecoration: "none"}}>
                            <Chip size="small" label="view details" />
                        </Link>
                </TableCell>
            </TableRow>
        )
    });

    return (
        <>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {list}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Menu;