import { render } from "./render";
import { todoActions, todos } from "./todo";

const processForms = {
  newGroup: () => {
    let newGroupTitle = document.querySelector("#new-group-title-input").value;

    todoActions.addGroup(newGroupTitle);

    render.clearPage();
    render.page(todos);
    render.toggleOverlay();
    render.togglePopUp(".ng-pop-up");

    document.querySelector("#new-group-title-input").value = "";
  },
  editGroup: () => {
    let groupID = document.querySelector(".group-name-to-edit").textContent;
    let newGroupID = document.querySelector("#edit-group-title-input").value;

    if (groupID !== newGroupID) {
      let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === groupID);
      let renamedGroup = todos.groups[groupIndex];
      renamedGroup.groupTitle = newGroupID;
    }
    render.clearPage();
    render.page(todos);
    render.toggleOverlay();
    render.togglePopUp(".eg-pop-up");
    todoActions.setLocalData();
  },
  deleteGroup: () => {
    let groupID = document.querySelector(".group-name-to-edit").textContent;
    let groups = document.querySelectorAll(".group-wrapper");

    groups.forEach((group) => {
      if (group.dataset.group === groupID) {
        group.remove();
      }
    });

    todoActions.deleteGroup(groupID);

    render.toggleOverlay();
    render.togglePopUp(".eg-pop-up");
  },
  newTask: () => {
    let groupID = document.querySelector("#new-tasks-group").textContent;
    let taskTitle = document.querySelector("#new-task-title-input").value;
    let taskDescription = document.querySelector("#new-task-desc-input").value;
    let taskDueDate = document.querySelector("#new-task-due-date-input").value;
    let taskPriority = document.querySelector("#new-task-priority-input").value;
    let taskNotes = document.querySelector("#new-task-notes-input").value;

    todoActions.addTodo(
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskNotes,
      false,
      groupID
    );

    render.clearPage();
    render.page(todos);
    render.toggleOverlay();
    render.togglePopUp(".nt-pop-up");

    document.querySelector("#new-tasks-group").textContent = "";
    document.querySelector("#new-task-title-input").value = "";
    document.querySelector("#new-task-desc-input").value = "";
    document.querySelector("#new-task-due-date-input").value = "";
    document.querySelector("#new-task-priority-input").value = "";
    document.querySelector("#new-task-notes-input").value = "";
  },
  editTask: () => {
    let taskTitle = document.querySelector("#edit-task-title-input").value;
    let taskDescription = document.querySelector("#edit-task-desc-input").value;
    let taskDueDate = document.querySelector("#edit-task-due-date-input").value;
    let taskPriority = document.querySelector("#edit-task-priority-input").value;
    let taskNotes = document.querySelector("#edit-task-notes-input").value;
    let group = document.querySelector("#task-name-to-edit").dataset.group;
    let taskIndex = document.querySelector("#task-name-to-edit").dataset.taskIndex;
    let taskCompleted = document.querySelector("#edit-task-completed").checked;

    todoActions.updateTodo(
      group,
      taskIndex,
      taskCompleted,
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskNotes
    );

    render.clearPage();
    render.page(todos);
    render.toggleOverlay();
    render.togglePopUp(".et-pop-up");
  },
  deleteTask: () => {
    let group = document.querySelector("#task-name-to-edit").dataset.group;
    let taskIndex = document.querySelector("#task-name-to-edit").dataset.taskIndex;

    todoActions.deleteTodo(group, taskIndex);

    render.clearPage();
    render.page(todos);
    render.toggleOverlay();
    render.togglePopUp(".et-pop-up");
  },
  completedStatus: (e) => {
    console.log(e.path[1].childNodes[1].textContent);
    const groupID = e.path[4].dataset.group;
    const taskName = e.path[1].childNodes[1].textContent;
    const completeStatus = e.path[0].checked;

    const groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === groupID);
    const taskIndex = todos.groups[groupIndex].todoArray.findIndex(
      (todoObj) => todoObj.title === taskName
    );

    const title = todos.groups[groupIndex].todoArray[taskIndex].title
    const desc = todos.groups[groupIndex].todoArray[taskIndex].desc
    const dueDate = todos.groups[groupIndex].todoArray[taskIndex].dueDate
    const priority = todos.groups[groupIndex].todoArray[taskIndex].priority
    const notes = todos.groups[groupIndex].todoArray[taskIndex].notes

    todoActions.updateTodo(groupID, taskIndex, completeStatus, title, desc, dueDate, priority, notes);
    console.log(todos.groups[groupIndex].todoArray[taskIndex]);
  },
};

export { processForms };
