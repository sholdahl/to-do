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
        todoWrapper.setAttribute('data-group', group.groupTitle);

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
    Page: todos => {
        todos.groups.forEach(group => {
            let groupDomData = createDom.createGroupDom(group);
            let container = document.querySelector("#todo-container");
            container.appendChild(groupDomData);
        })
    },
    newGroup: groupDomData => {
        let todoContainer = document.querySelector("#todo-container");
        todoContainer.appendChild(groupDomData);
    },
    toggleNewGroupForm: () => {
        let overlay = document.querySelector("#overlay");
        let groupPopUp = document.querySelector(".pop-up-container");
        let newGroupFormBtn = document.querySelector("#add-group-nav-btn");
        let closeNewGroupPopup = document.querySelector("#close-new-group-popup");

        let toggleForm = () => {
            overlay.classList.toggle("overlay-active");
            groupPopUp.classList.toggle("hidden");
        }

        closeNewGroupPopup.addEventListener("click", toggleForm);
        newGroupFormBtn.addEventListener("click", toggleForm)
    }
}

export { createDom, render }