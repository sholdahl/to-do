import { factories, todoActions, todos } from './todo';
import {createDom} from './render';
createDom.createTodoDom(todos.groups[0].todoArray[0]);
createDom.createGroupDom(todos.groups[0])

console.log(todos);
