import { factories, todoActions, todos } from './todo';
import {createDom, render, setUpListeners} from './render';
import {processForms} from './processForms';

let newGroupBtn = document.querySelector("#new-group-btn");
newGroupBtn.addEventListener("click", processForms.newGroup);

render.initialPage(todos);

