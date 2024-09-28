import { createReducer, on } from "@ngrx/store";
import { addTask, updateTask } from "./task.action";
import { Task } from "../../models/task.model";

const saveTasks = localStorage.getItem('tasks');
export const initialState: Task[] = saveTasks ? JSON.parse(saveTasks) : [];

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => {
    return [...state, task];
  }),
  on(updateTask, (state, { task }) => {
    return state.map((t) => {
      console.log(t.id, task.id, t.completed, task.completed);
      if (t.id === task.id && t.completed) {
        return { ...t, completed: !t.completed };
      }
      if (t.id === task.id && !t.completed) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
  })
);


