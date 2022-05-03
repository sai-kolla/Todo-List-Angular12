import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITodo } from './todos/interfaces';
import { Store } from '@ngrx/store';
import {
  addTodo,
  changeFilterMode,
  clearCompleted,
} from './todos/state/todo.actions';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { allTodos, filterMode } from './todos/state/todo.selectors';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  newTodo: string;
  filter: FILTER_MODES | undefined;
  todos: ITodo[];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(filterMode).subscribe((state) => {
      this.filter = state;
      switch (state) {
        case 'Active':
          this.store
            .select(allTodos)
            .subscribe(
              (state) => (this.todos = state.filter((i) => !i.completed))
            );
          break;
        case 'Completed':
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

  addTodo(event: any) {
    event.preventDefault();
    this.newTodo = event.target.value;
    if (this.newTodo.length === 0) {
      return;
    }
    this.store.dispatch(
      addTodo({
        text: this.newTodo,
      })
    );
    this.newTodo = '';
  }

  setFilterMode(filterMode: FILTER_MODES) {
    this.store.dispatch(
      changeFilterMode({
        mode: filterMode,
      })
    );
  }

  clearCompleted() {
    this.store.dispatch(clearCompleted());
  }
}
