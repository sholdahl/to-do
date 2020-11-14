import { processForms } from './processForms';
import { todos } from './todo'

const createDom = {
    createTodoDom: todo => {
        let todoRowDiv = document.createElement("div");
        let todoTitleDiv = document.createElement("div");
        let todoCompleteDiv = document.createElement("input");
        let todoPriorityDiv = document.createElement("div");
        let todoDueDateDiv = document.createElement("div");
        let todoEditDiv = document.createElement("div");
        let todoTitleSpan = document.createElement("span");

        todoRowDiv.classList.add("row", "no-gutters", "todo-rows");
        todoTitleDiv.classList.add("col-10", "col-sm-6", "col-md-7", "todo-title");
        todoCompleteDiv.classList.add("todo-complete");
        todoPriorityDiv.classList.add("col-2", "todo-priority", "d-none", "d-sm-block");
        todoDueDateDiv.classList.add("col-3", "col-md-2", "todo-due-date", "d-none", "d-sm-block");
        todoEditDiv.classList.add("col-2", "col-sm-1", "todo-edit");

        todoTitleSpan.textContent = todo.title;
        todoCompleteDiv.checked = todo.complete;
        todoCompleteDiv.type = "checkbox";
        todoPriorityDiv.textContent = todo.priority;
        todoDueDateDiv.textContent = todo.dueDate;
        todoEditDiv.textContent = "...";

        todoTitleDiv.appendChild(todoCompleteDiv);
        todoTitleDiv.appendChild(todoTitleSpan);
        todoRowDiv.appendChild(todoTitleDiv);
        todoRowDiv.appendChild(todoPriorityDiv);
        todoRowDiv.appendChild(todoDueDateDiv);
        todoRowDiv.appendChild(todoEditDiv);

        return todoRowDiv
    },
    createGroupDom: (group) => {
        let groupWrapperDiv = document.createElement("div");
        let groupRowDiv = document.createElement("div");
        let groupTitleDiv = document.createElement("div");
        let groupTitleH3 = document.createElement("h3");
        let groupEditDiv = document.createElement("div");
        let groupEditH3 = document.createElement("h3");
        let todoWrapper = document.createElement("div");
        let addTodoDiv = document.createElement("div");
        let addTodoSpan = document.createElement("span");
        let todoHeaderRow = document.createElement("div");
        let todoHeaderTitle = document.createElement("div");
        let todoHeaderPriority = document.createElement("div");
        let todoHeaderDueDate = document.createElement("div");
        let todoHeaderEdit = document.createElement("div");


        groupWrapperDiv.classList.add("group-wrapper");
        groupRowDiv.classList.add("row", "no-gutters");
        groupTitleDiv.classList.add("col-10", "col-sm-11");
        groupTitleH3.classList.add("group-title");
        groupEditDiv.classList.add("col-2", "col-sm-1");
        groupEditH3.classList.add("group-edit");
        todoWrapper.classList.add("todo-wrapper");
        addTodoDiv.classList.add("col-12");
        addTodoSpan.classList.add("new-todo");
        todoHeaderRow.classList.add("row", "no-gutters", "todo-header-row")
        todoHeaderTitle.classList.add("col-10", "col-sm-6", "col-md-7", "todo-table-title", "todo-title-title")
        todoHeaderPriority.classList.add("col-2", "todo-table-title", "todo-priority-title", "d-none", "d-sm-block")
        todoHeaderDueDate.classList.add("col-3", "col-md-2", "todo-table-title", "todo-due-title-date", "d-none", "d-sm-block")
        todoHeaderEdit.classList.add("col-2", "col-sm-1", "todo-table-title", "todo-edit-title")

        groupWrapperDiv.setAttribute('data-group', group.groupTitle);

        groupTitleH3.textContent = group.groupTitle;
        groupEditH3.textContent = "...";
        addTodoSpan.textContent = "+ Add New Task";
        todoHeaderTitle.textContent = "Title";
        todoHeaderPriority.textContent = "Priority";
        todoHeaderDueDate.textContent = "Due Date";

        todoHeaderRow.appendChild(todoHeaderTitle);
        todoHeaderRow.appendChild(todoHeaderPriority);
        todoHeaderRow.appendChild(todoHeaderDueDate);
        todoHeaderRow.appendChild(todoHeaderEdit);
        todoWrapper.appendChild(todoHeaderRow);

        if (group.todoArray.length > 0) {
            group.todoArray.forEach(todo => {
                let createdTodoDom = createDom.createTodoDom(todo);
                todoWrapper.appendChild(createdTodoDom);
            });
        };

        groupTitleDiv.appendChild(groupTitleH3);
        groupEditDiv.appendChild(groupEditH3);
        groupRowDiv.appendChild(groupTitleDiv);
        groupRowDiv.appendChild(groupEditDiv);

        addTodoDiv.appendChild(addTodoSpan);

        groupWrapperDiv.appendChild(groupRowDiv);
        groupWrapperDiv.appendChild(todoWrapper);
        groupWrapperDiv.appendChild(addTodoDiv);

        return groupWrapperDiv
    },
};

const render = {
    page: todos => {
        todos.groups.forEach(group => {
            let groupDomData = createDom.createGroupDom(group);
            let container = document.querySelector("#todo-container");
            container.appendChild(groupDomData);
        });
        setUpListeners.editGroupForm();
        setUpListeners.newTaskForm();
        setUpListeners.editTaskForm();
    },
    initialPage: todos => {
        todos.groups.forEach(group => {
            let groupDomData = createDom.createGroupDom(group);
            let container = document.querySelector("#todo-container");
            container.appendChild(groupDomData);
        });
        setUpListeners.newGroupForm();
        setUpListeners.formCloseBtns();
        setUpListeners.editGroupForm();
        setUpListeners.newTaskForm();
        setUpListeners.editTaskForm();
    },
    clearPage: () => {
        let todoContainer = document.querySelector("#todo-container");
        while (todoContainer.firstChild) {
            todoContainer.removeChild(todoContainer.lastChild);
        };
    },
    newGroup: groupDomData => {
        let todoContainer = document.querySelector("#todo-container");
        todoContainer.appendChild(groupDomData);
    },
    toggleOverlay: () => {
        let overlay = document.querySelector("#overlay");
        overlay.classList.toggle("overlay-active");
    },
    editGroupForm: (e) => {
        let groupID = e.path[3].dataset.group;
        let groupNameInEditTitle = document.querySelector(".group-name-to-edit");
        let groupNameEditInput = document.querySelector("#edit-group-title-input");

        groupNameInEditTitle.textContent = groupID;
        groupNameEditInput.value = groupID;

        render.toggleOverlay();
        render.togglePopUp(".eg-pop-up");
    },
    togglePopUp: elID => {
        let el = document.querySelector(elID);
        el.classList.toggle("hidden");
    },
    newTaskForm: (e) => {
        let groupID = e.path[2].dataset.group;
        let newTaskGroupTitle = document.querySelector("#new-tasks-group");
        newTaskGroupTitle.textContent = groupID;

        render.togglePopUp(".nt-pop-up");
        render.toggleOverlay();
    },
    updateDisplayData: () => {
        let groups = document.querySelectorAll(".group-wrapper");
        groups.forEach(group => {
            let groupID = group.dataset.group;
            let groupTitle = group.childNodes[0].childNodes[0].childNodes[0].textContent;
            groupTitle = groupID;
        })
    },
    editTaskForm: (e) => {
        let groupID = e.path[3].dataset.group;
        let taskTitle = e.path[1].childNodes[0].childNodes[1].textContent;

        let taskTitleDisplay = document.querySelector("#task-name-to-edit");
        let taskEditTitle = document.querySelector("#edit-task-title-input");
        let taskDescription = document.querySelector("#edit-task-desc-input");
        let taskDueDate = document.querySelector("#edit-task-due-date-input");
        let taskPriority = document.querySelector("#edit-task-priority-input");
        let taskNotes = document.querySelector("#edit-task-notes-input");


        let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === groupID);
        let taskIndex = todos.groups[groupIndex].todoArray.findIndex((todoObj) => todoObj.title === taskTitle);
        
        taskDescription.value = todos.groups[groupIndex].todoArray[taskIndex].desc;
        taskDueDate.value = todos.groups[groupIndex].todoArray[taskIndex].dueDate;
        taskPriority.value = todos.groups[groupIndex].todoArray[taskIndex].priority.toLowerCase();
        taskNotes.value = todos.groups[groupIndex].todoArray[taskIndex].notes;
        taskTitleDisplay.textContent = taskTitle;
        taskTitleDisplay.dataset.group = groupID;
        taskEditTitle.value = taskTitle;

        render.toggleOverlay();
        render.togglePopUp(".et-pop-up");
    },
};

const setUpListeners = {
    newGroupForm: () => {
        let overlay = document.querySelector("#overlay");
        let groupPopUp = document.querySelector(".ng-pop-up");
        let newGroupFormBtn = document.querySelector("#add-group-nav-btn");

        let toggleForm = () => {
            overlay.classList.toggle("overlay-active");
            groupPopUp.classList.toggle("hidden");
        }

        newGroupFormBtn.addEventListener("click", toggleForm)
    },
    editGroupForm: () => {
        let groupEditBtns = document.querySelectorAll(".group-edit");
        groupEditBtns.forEach(btn => {
            btn.addEventListener("click", render.editGroupForm)
        });

        let groupEditSubmitBtn = document.querySelector("#edit-group-form-btn");
        groupEditSubmitBtn.addEventListener("click", processForms.editGroup);

        let groupEditDeleteBtn = document.querySelector("#delete-group-form-btn");
        groupEditDeleteBtn.addEventListener("click", processForms.deleteGroup)
    },
    formCloseBtns: () => {
        let clostBtns = document.querySelectorAll(".close-popup");
        let toggleForm = (e) => {
            e.path[5].classList.toggle("hidden");
            render.toggleOverlay();
        }
        clostBtns.forEach(btn => {
            btn.addEventListener("click", toggleForm)
        })
    },
    newTaskForm: () => {
        let newTaskBtns = document.querySelectorAll(".new-todo");
        let newTaskSubmitBtn = document.querySelector("#new-task-btn");
        newTaskBtns.forEach(btn => {
            btn.addEventListener("click", render.newTaskForm)
        });
        newTaskSubmitBtn.addEventListener("click", processForms.newTask)
    },
    editTaskForm: () => {
        let editTaskBtns = document.querySelectorAll(".todo-edit");
        editTaskBtns.forEach(btn => {
            btn.addEventListener("click", render.editTaskForm)
        })
    }

}

export { createDom, render, setUpListeners }