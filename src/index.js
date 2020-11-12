import { factories, todoActions, todos } from './todo';
import {createDom, render} from './render';
import {processForms} from './processForms';

let newGroupBtn = document.querySelector("#new-group-btn");
newGroupBtn.addEventListener("click", processForms.newGroup);

render.Page(todos);
render.toggleNewGroupForm();
