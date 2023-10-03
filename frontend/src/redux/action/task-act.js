import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';
import pickBy from 'lodash/pickBy';
import identify from 'lodash/identity';

export const createTask = createAsyncThunk('task/fetchTask', async (params) => {
  try {
    const { data } = await axios.post("/tasks", params);
    return data;
  } catch (error) {
    throw error;
  }
})



export const getTasksAndSearch = createAsyncThunk('task/fetch', async (params) => {

  const { sortBy, search, categoryStatus } = params;
  const { data } = await axios.get(
    `/tasks?order=${sortBy}&status=${categoryStatus}&search=${search}`,
    {
      params: pickBy(
        {
          sortBy,
          categoryStatus,
          search,
        },
        identify,
      ),
    },
  );

  return data;
});



export const deleteTasks = createAsyncThunk('task/fetchDelete', async (taskId) => {
  try {
    await axios.delete(`/task/${taskId}`);
    return taskId;
  } catch (error) {
    throw error;
  }
})

export const taskEdit = createAsyncThunk('task/patchTask', async ({ taskId, updatedTaskData }) => {
  try {
    const { data } = await axios.patch(`/task/${taskId}`, updatedTaskData);
    return data;
  } catch (error) {
    console.log(error);
  }
})



