import { createDom, render, setUpListeners } from "./render";
import { todoActions, todos } from "./todo";

const processForms = {
    newGroup: () => {
        let newGroupTitle = document.querySelector("#new-group-title-input").value;

        todoActions.addGroup(newGroupTitle);

        let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === newGroupTitle);
        let newGroup = todos.groups[groupIndex];

        let newGroupDomData = createDom.createGroupDom(newGroup);

        render.newGroup(newGroupDomData);

        render.toggleOverlay();
        render.togglePopUp(".ng-pop-up");
        document.querySelector("#new-group-title-input").value = "";

        setUpListeners.editGroupForm();
        setUpListeners.newTaskBtns();
    },
    editGroup: () => {
        let groupID = document.querySelector(".group-name-to-edit").textContent;
        let newGroupID = document.querySelector("#edit-group-title-input").value;

        if (groupID !== newGroupID) {
            let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === groupID);
            let renamedGroup = todos.groups[groupIndex];
            renamedGroup.groupTitle = newGroupID;
        };
        render.clearPage();
        render.page(todos);
        render.toggleOverlay();
        render.togglePopUp(".eg-pop-up");
    },
    deleteGroup: () => {
        let groupID = document.querySelector(".group-name-to-edit").textContent;
        let groups = document.querySelectorAll(".group-wrapper");

        groups.forEach(group => {
            if (group.dataset.group === groupID) {
                group.remove()
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

        todoActions.addTodo(taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes, false, groupID)

        render.clearPage();
        render.page(todos);
        render.toggleOverlay();
        render.togglePopUp(".nt-pop-up");

        document.querySelector("#new-tasks-group").textContent = ""
        document.querySelector("#new-task-title-input").value = ""
        document.querySelector("#new-task-desc-input").value = ""
        document.querySelector("#new-task-due-date-input").value = ""
        document.querySelector("#new-task-priority-input").value = ""
        document.querySelector("#new-task-notes-input").value = ""

    }

}

export { processForms }