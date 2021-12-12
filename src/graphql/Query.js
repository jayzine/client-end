import React from 'react';
import gql from 'graphql-tag';

export const LOAD_TASK = gql`
    query {
        getTaskList {
            id,
            date
        }
    }
`;

export const LOAD_TASK_WRT_ID = gql`
    query getTaskListDetails($id: Int!) {
        getTaskListDetails(id: $id) {
            id,
            date,
            taskName,
            taskDetails
        }
    }
`;