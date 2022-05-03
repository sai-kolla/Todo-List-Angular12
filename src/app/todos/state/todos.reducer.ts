import { Action, createReducer, on } from "@ngrx/store";
import * as TodoActions from "./todo.actions";

import { FILTER_MODES } from "./../constants/filter-modes";
import { ITodo } from "../interfaces/ITodo";

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: "All",
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [
        { text, completed: false, editing: false },
        ...existingState.todos,
      ],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const allTodos = [...existingState.todos];
      const toBeUpdatedTodo = allTodos[index];
      allTodos[index] = {
        ...toBeUpdatedTodo,
        completed: !toBeUpdatedTodo.completed,
      };

      return {
        ...existingState,
        todos: allTodos,
      };
    }),
    on(TodoActions.editTodo, (existingState, { index }) => {
      const allTodos = [...existingState.todos];
      const toBeUpdatedTodo = allTodos[index];
      allTodos[index] = {
        ...toBeUpdatedTodo,
        editing: !toBeUpdatedTodo.editing,
      };

      return {
        ...existingState,
        todos: allTodos,
      };
    }),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      const allTodos = [...existingState.todos];
      const toBeUpdatedTodo = allTodos[index];
      allTodos[index] = {
        ...toBeUpdatedTodo,
        editing: !toBeUpdatedTodo.editing,
        text: text,
      };

      return {
        ...existingState,
        todos: allTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => {
      return {
        ...existingState,
        filterMode: mode,
      };
    }),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter((todo) => !todo.completed)],
    }))
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
