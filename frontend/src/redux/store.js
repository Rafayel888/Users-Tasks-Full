import { configureStore } from '@reduxjs/toolkit'

import taskReducer from './slices/tasks';
import authReducer from './slices/auth';
import filterReducer from './slices/filter';


const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    filter: filterReducer
  }
});

export default store