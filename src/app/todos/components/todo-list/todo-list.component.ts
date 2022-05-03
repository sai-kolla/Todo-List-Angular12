import { Component, Input } from "@angular/core";
import { ITodo } from "@app/todos/interfaces";
import { Store } from "@ngrx/store";
import { allTodos, filterMode } from "@app/todos/state/todo.selectors";
import {
  editTodo,
  removeTodo,
  toggleCompleted,
  updateTodo,
} from "@app/todos/state/todo.actions";
import { FILTER_MODES } from "@app/todos/constants/filter-modes";

@Component({
  selector: "app-todos-list",
  styleUrls: ["./todo-list.component.scss"],
  templateUrl: "./todo-list.component.html",
})
export class TodosListComponent {
  todos: ITodo[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.store.select(filterMode).subscribe((state: FILTER_MODES) => {
      switch (state) {
        case "Active":
          this.store
            .select(allTodos)
            .subscribe(
              (state) => (this.todos = state.filter((i) => !i.completed))
            );
          break;
        case "Completed":
          this.store
            .select(allTodos)
            .subscribe(
              (state) => (this.todos = state.filter((i) => i.completed))
            );
          break;
        default:
          this.store
            .select(allTodos)
            .subscribe((state) => (this.todos = state));
          break;
      }
    });
  }

  deleteTodo(todo: ITodo) {
    const index = this.todos.findIndex((i) => i.text === todo.text);
    this.store.dispatch(
      removeTodo({
        index,
      })
    );
  }

  toggleTodo(todo: ITodo) {
    const index = this.todos.findIndex((i) => i.text === todo.text);
    this.store.dispatch(
      toggleCompleted({
        index,
      })
    );
  }

  editTodo(todo: ITodo) {
    const index = this.todos.findIndex((i) => i.text === todo.text);
    this.store.dispatch(
      editTodo({
        index,
      })
    );
  }

  updateEditingTodo(todo: ITodo, editedValue: string) {
    const index = this.todos.findIndex((i) => i.text === todo.text);
    this.store.dispatch(
      updateTodo({
        index,
        text: editedValue,
      })
    );
    console.log(todo, editedValue, "=====");
  }
}
