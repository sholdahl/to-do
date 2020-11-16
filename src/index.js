import { todos } from './todo';
import {render } from './render';
import {processForms} from './processForms';

let newGroupBtn = document.querySelector("#new-group-btn");
newGroupBtn.addEventListener("click", processForms.newGroup);

render.initialPage(todos);

