import { createSlice } from '@reduxjs/toolkit';
import { createTask, getTasksAndSearch, deleteTasks, taskEdit } from '../action/task-act';

const initialState = {
  tasks: [],
  static:[],
  currentPage: 1,
  tasksPerPage: 4,
  statusTask: 'loading'
};


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, action) => {
      const { taskId, updatedTaskData } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        Object.assign(taskToUpdate, updatedTaskData);
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setStatic(state, action) {
      state.static = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.statusTask = 'loading'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload.task];
        state.statusTask = 'loaded';
      })
      .addCase(createTask.rejected, (state) => {
        state.statusTask = 'error'
      })
      .addCase(getTasksAndSearch.pending, (state) => {
        state.statusTask = 'loading'
      })
      .addCase(getTasksAndSearch.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.statusTask = 'loaded'
      })
      .addCase(getTasksAndSearch.rejected, (state) => {
        state.statusTask = 'error'
      })
      .addCase(deleteTasks.pending, (state) => {
        state.statusTask = 'loading'
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        const taskIdToDelete = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
        state.statusTask = 'loaded';
      })
      .addCase(deleteTasks.rejected, (state) => {
        state.statusTask = 'error';
      })
      .addCase(taskEdit.pending, (state) => {
        state.statusTask = 'loading'
      })
      .addCase(taskEdit.fulfilled, (state) => {
        state.statusTask = 'loaded'
      })
      .addCase(taskEdit.rejected, (state) => {
        state.statusTask = 'error'
      })


  }
});

export const { addTask, updateTask, setCurrentPage, filterTask, setStatic } = tasksSlice.actions;
export default tasksSlice.reducer;
