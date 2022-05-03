import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as todosState from "./todos.reducer";

export const todosSelector =
  createFeatureSelector<todosState.ITodosState>("todos");
export const filterModeSelector =
  createFeatureSelector<todosState.ITodosState>("filterMode");

export const allTodos = createSelector(todosSelector, todosState.todos);

export const filterMode = createSelector(filterModeSelector, todosState.filterMode);


