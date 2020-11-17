(()=>{"use strict";const e={addGroup:o=>{let d=(e=>({groupTitle:e,todoArray:[]}))(o);t.groups.push(d),console.log(`A new to-do group titled ${o} was added. New to-do Group data below:`),console.table(d),e.setLocalData()},addTodo:(o,d,r,a,l,n,c)=>{let u=((e,t,o,d,r,a,l)=>({title:e,desc:t,dueDate:o,priority:d,notes:r,complete:a,targetGroup:l}))(o,d,r,a,l,n,c);t.groups.forEach((e=>{if(e.groupTitle===c)return e.todoArray.push(u),console.log(`A new to-do titled ${o} was added to ${c}. New to-do data below:`),void console.table(u)})),e.setLocalData()},deleteTodo:(o,d)=>{t.groups.forEach((e=>{e.groupTitle===o&&e.todoArray.splice(parseInt(d),1)})),e.setLocalData()},deleteGroup:o=>{let d=t.groups.findIndex((e=>e.groupTitle===o));t.groups.splice(d,1),e.setLocalData()},moveTodo:(o,d,r)=>{let a=null;t.groups.forEach((e=>{e.groupTitle===o&&(a=e.todoArray[parseInt(r)],e.todoArray.splice(parseInt(r),1))})),t.groups.forEach((e=>{if(e.groupTitle===d)return e.todoArray.push(a),console.log(`A to-do titled ${a.title} was moved to ${d} from ${o}. Moved to-do's data below:`),void console.table(a)})),e.setLocalData()},updateTodo:(o,d,r,a,l,n,c,u)=>{t.groups.forEach((e=>{e.groupTitle===o&&(e.todoArray[d]&&console.log("A record was found to update! Original to-do:"),console.table(e.todoArray[d]),console.log(null==a),e.todoArray[d].complete!==r&&null!==r&&(e.todoArray[d].complete=r),e.todoArray[d].title!==a&&null!==a&&(e.todoArray[d].title=a),e.todoArray[d].desc!==l&&null!==l&&(e.todoArray[d].desc=l),e.todoArray[d].dueDate!==n&&null!==n&&(e.todoArray[d].dueDate=n),e.todoArray[d].priority!==c&&null!==c&&(e.todoArray[d].priority=c),e.todoArray[d].notes!==u&&null!==u&&(e.todoArray[d].notes=u),console.log("The record has been updated. Updated to-do:"),console.table(e.todoArray[d]))})),e.setLocalData()},setLocalData:()=>{const e=JSON.stringify(t);localStorage.setItem("todoData",e),console.log("task data has been saved to local storage.")},useLocalData:async()=>{const e=localStorage.getItem("todoData"),o=JSON.parse(e);t=o,console.log("task data has been loaded from local storage"),console.log(t)},checkLocalStorage:()=>{localStorage.getItem("todoData")&&e.useLocalData(),t=JSON.parse(localStorage.getItem("todoData"))}};let t={groups:[{groupTitle:"General",todoArray:[{title:"Example Title",desc:"This is an example description of the to-do",dueDate:"2020-11-20",priority:"Low",notes:"This is an example of a note.",complete:!0}]}]};const o=()=>{let o=document.querySelector("#new-group-title-input").value;e.addGroup(o),s.clearPage(),s.page(t),s.toggleOverlay(),s.togglePopUp(".ng-pop-up"),document.querySelector("#new-group-title-input").value=""},d=()=>{let o=document.querySelector(".group-name-to-edit").textContent,d=document.querySelector("#edit-group-title-input").value;if(o!==d){let e=t.groups.findIndex((e=>e.groupTitle===o));t.groups[e].groupTitle=d}s.clearPage(),s.page(t),s.toggleOverlay(),s.togglePopUp(".eg-pop-up"),e.setLocalData()},r=()=>{let t=document.querySelector(".group-name-to-edit").textContent;document.querySelectorAll(".group-wrapper").forEach((e=>{e.dataset.group===t&&e.remove()})),e.deleteGroup(t),s.toggleOverlay(),s.togglePopUp(".eg-pop-up")},a=()=>{let o=document.querySelector("#new-tasks-group").textContent,d=document.querySelector("#new-task-title-input").value,r=document.querySelector("#new-task-desc-input").value,a=document.querySelector("#new-task-due-date-input").value,l=document.querySelector("#new-task-priority-input").value,n=document.querySelector("#new-task-notes-input").value;e.addTodo(d,r,a,l,n,!1,o),s.clearPage(),s.page(t),s.toggleOverlay(),s.togglePopUp(".nt-pop-up"),document.querySelector("#new-tasks-group").textContent="",document.querySelector("#new-task-title-input").value="",document.querySelector("#new-task-desc-input").value="",document.querySelector("#new-task-due-date-input").value="",document.querySelector("#new-task-priority-input").value="",document.querySelector("#new-task-notes-input").value=""},l=()=>{let o=document.querySelector("#edit-task-title-input").value,d=document.querySelector("#edit-task-desc-input").value,r=document.querySelector("#edit-task-due-date-input").value,a=document.querySelector("#edit-task-priority-input").value,l=document.querySelector("#edit-task-notes-input").value,n=document.querySelector("#task-name-to-edit").dataset.group,c=document.querySelector("#task-name-to-edit").dataset.taskIndex,u=document.querySelector("#edit-task-completed").checked;e.updateTodo(n,c,u,o,d,r,a,l),s.clearPage(),s.page(t),s.toggleOverlay(),s.togglePopUp(".et-pop-up")},n=()=>{let o=document.querySelector("#task-name-to-edit").dataset.group,d=document.querySelector("#task-name-to-edit").dataset.taskIndex;e.deleteTodo(o,d),s.clearPage(),s.page(t),s.toggleOverlay(),s.togglePopUp(".et-pop-up")},c=o=>{console.log(o.path[1].childNodes[1].textContent);const d=o.path[4].dataset.group,r=o.path[1].childNodes[1].textContent,a=o.path[0].checked,l=t.groups.findIndex((e=>e.groupTitle===d)),n=t.groups[l].todoArray.findIndex((e=>e.title===r)),c=t.groups[l].todoArray[n].title,u=t.groups[l].todoArray[n].desc,s=t.groups[l].todoArray[n].dueDate,p=t.groups[l].todoArray[n].priority,i=t.groups[l].todoArray[n].notes;e.updateTodo(d,n,a,c,u,s,p,i),console.log(t.groups[l].todoArray[n])},u={createTodoDom:e=>{let t=document.createElement("div"),o=document.createElement("div"),d=document.createElement("input"),r=document.createElement("div"),a=document.createElement("div"),l=document.createElement("div"),n=document.createElement("span");return t.classList.add("row","no-gutters","todo-rows"),o.classList.add("col-10","col-sm-6","col-md-7","todo-title"),d.classList.add("todo-complete"),r.classList.add("col-2","todo-priority","d-none","d-sm-block"),a.classList.add("col-3","col-md-2","todo-due-date","d-none","d-sm-block"),l.classList.add("col-2","col-sm-1","todo-edit"),n.textContent=e.title,d.checked=e.complete,d.type="checkbox",r.textContent=e.priority,a.textContent=e.dueDate,l.textContent="...",o.appendChild(d),o.appendChild(n),t.appendChild(o),t.appendChild(r),t.appendChild(a),t.appendChild(l),t},createGroupDom:e=>{let t=document.createElement("div"),o=document.createElement("div"),d=document.createElement("div"),r=document.createElement("h3"),a=document.createElement("div"),l=document.createElement("h3"),n=document.createElement("div"),c=document.createElement("div"),s=document.createElement("span"),p=document.createElement("div"),i=document.createElement("div"),m=document.createElement("div"),g=document.createElement("div"),y=document.createElement("div");return t.classList.add("group-wrapper"),o.classList.add("row","no-gutters"),d.classList.add("col-10","col-sm-11"),r.classList.add("group-title"),a.classList.add("col-2","col-sm-1"),l.classList.add("group-edit"),n.classList.add("todo-wrapper"),c.classList.add("col-12"),s.classList.add("new-todo"),p.classList.add("row","no-gutters","todo-header-row"),i.classList.add("col-10","col-sm-6","col-md-7","todo-table-title","todo-title-title"),m.classList.add("col-2","todo-table-title","todo-priority-title","d-none","d-sm-block"),g.classList.add("col-3","col-md-2","todo-table-title","todo-due-title-date","d-none","d-sm-block"),y.classList.add("col-2","col-sm-1","todo-table-title","todo-edit-title"),t.setAttribute("data-group",e.groupTitle),r.textContent=e.groupTitle,l.textContent="...",s.textContent="+ Add New Task",i.textContent="Title",m.textContent="Priority",g.textContent="Due Date",p.appendChild(i),p.appendChild(m),p.appendChild(g),p.appendChild(y),n.appendChild(p),e.todoArray.length>0&&e.todoArray.forEach((e=>{let t=u.createTodoDom(e);n.appendChild(t)})),d.appendChild(r),a.appendChild(l),o.appendChild(d),o.appendChild(a),c.appendChild(s),t.appendChild(o),t.appendChild(n),t.appendChild(c),t}},s={page:e=>{e.groups.forEach((e=>{let t=u.createGroupDom(e);document.querySelector("#todo-container").appendChild(t)})),p.editGroupForm(),p.newTaskForm(),p.editTaskForm(),p.completeBtns()},initialPage:e=>{e.groups.forEach((e=>{let t=u.createGroupDom(e);document.querySelector("#todo-container").appendChild(t)})),p.newGroupForm(),p.formCloseBtns(),p.editGroupForm(),p.newTaskForm(),p.editTaskForm(),p.completeBtns()},clearPage:()=>{let e=document.querySelector("#todo-container");for(;e.firstChild;)e.removeChild(e.lastChild)},newGroup:e=>{document.querySelector("#todo-container").appendChild(e)},toggleOverlay:()=>{document.querySelector("#overlay").classList.toggle("overlay-active")},editGroupForm:e=>{let t=e.path[3].dataset.group,o=document.querySelector(".group-name-to-edit"),d=document.querySelector("#edit-group-title-input");o.textContent=t,d.value=t,s.toggleOverlay(),s.togglePopUp(".eg-pop-up")},togglePopUp:e=>{document.querySelector(e).classList.toggle("hidden")},newTaskForm:e=>{let t=e.path[2].dataset.group;document.querySelector("#new-tasks-group").textContent=t,s.togglePopUp(".nt-pop-up"),s.toggleOverlay()},updateDisplayData:()=>{document.querySelectorAll(".group-wrapper").forEach((e=>{let t=e.dataset.group,o=e.childNodes[0].childNodes[0].childNodes[0].textContent;o=t}))},editTaskForm:e=>{let o=e.path[3].dataset.group,d=e.path[1].childNodes[0].childNodes[1].textContent,r=document.querySelector("#task-name-to-edit"),a=document.querySelector("#edit-task-title-input"),l=document.querySelector("#edit-task-desc-input"),n=document.querySelector("#edit-task-due-date-input"),c=document.querySelector("#edit-task-priority-input"),u=document.querySelector("#edit-task-notes-input"),p=document.querySelector("#edit-task-completed"),i=t.groups.findIndex((e=>e.groupTitle===o)),m=t.groups[i].todoArray.findIndex((e=>e.title===d));l.value=t.groups[i].todoArray[m].desc,n.value=t.groups[i].todoArray[m].dueDate,c.value=t.groups[i].todoArray[m].priority.toLowerCase(),u.value=t.groups[i].todoArray[m].notes,p.checked=t.groups[i].todoArray[m].complete,r.textContent=d,r.dataset.group=o,r.dataset.taskIndex=m,a.value=d,s.toggleOverlay(),s.togglePopUp(".et-pop-up")}},p={newGroupForm:()=>{let e=document.querySelector("#overlay"),t=document.querySelector(".ng-pop-up"),d=document.querySelector("#add-group-nav-btn");document.querySelector("#new-group-btn").addEventListener("click",o),d.addEventListener("click",(()=>{e.classList.toggle("overlay-active"),t.classList.toggle("hidden")}))},editGroupForm:()=>{document.querySelectorAll(".group-edit").forEach((e=>{e.addEventListener("click",s.editGroupForm)})),document.querySelector("#edit-group-form-btn").addEventListener("click",d),document.querySelector("#delete-group-form-btn").addEventListener("click",r)},formCloseBtns:()=>{let e=document.querySelectorAll(".close-popup"),t=e=>{e.path[5].classList.toggle("hidden"),s.toggleOverlay()};e.forEach((e=>{e.addEventListener("click",t)}))},newTaskForm:()=>{let e=document.querySelectorAll(".new-todo"),t=document.querySelector("#new-task-btn");e.forEach((e=>{e.addEventListener("click",s.newTaskForm)})),t.addEventListener("click",a)},editTaskForm:()=>{document.querySelectorAll(".todo-edit").forEach((e=>{e.addEventListener("click",s.editTaskForm)})),document.querySelector("#edit-task-form-btn").addEventListener("click",l),document.querySelector("#delete-task-form-btn").addEventListener("click",n)},completeBtns:()=>{document.querySelectorAll(".todo-complete").forEach((e=>{e.addEventListener("click",c)}))}};e.checkLocalStorage(),s.initialPage(t)})();