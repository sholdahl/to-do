import { todos, todoActions } from './todo';
import {render } from './render';

todoActions.checkLocalStorage();
render.initialPage(todos);

