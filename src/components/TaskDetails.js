import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOAD_TASK_WRT_ID } from '../graphql/Query';
import {Link, useParams} from 'react-router-dom';
import { Button, Checkbox, Container, FormControlLabel, Typography, Chip } from '@material-ui/core';
import {getconfig} from '../my-app-config';

const TaskDetails = () => {
    const {id, taskId} = useParams();
    const {error, loading, data} = useQuery(LOAD_TASK_WRT_ID, {variables: {id: parseInt(id)}});
    const [taskDetails, setTaskDetails] = useState([]);

    useEffect(() => {
        setTaskDetails(taskDetails => data)
    }, [data]);

    if (taskDetails == undefined) {
        return (<p>loading...</p>)
    }
    const listData = taskDetails.getTaskListDetails;

    if (!listData) {
        return (<>loading...</>)
    }

    const labelName = listData[0].taskDetails.map((item, index) => {
        return <FormControlLabel label={item} key={index}
        control={<Checkbox checked={true}/>}
    />
    })

    const FindDay = new Date(listData[0].date);
    const dateFormat = `${getconfig.month[FindDay.getMonth()]}, ${FindDay.getDate()} ${FindDay.getFullYear()}`;

    return (
    <Container maxWidth="sm">
        <div><Typography variant="h5">Launch Detail Page</Typography></div>
        <Typography variant="h6">T-{taskId}</Typography>
        <div><Typography variant="caption"><Chip size="small" label={dateFormat} /></Typography></div>
        {labelName}
        <Link to="/" style={{ textDecoration: "none"}}>
                <Button variant="contained" color="primary">Back to Launch Schedule</Button>
        </Link>
    </Container>)
}

export default TaskDetails;