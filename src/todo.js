const factories = {
    todoFactory: (title, desc, dueDate, priority, notes, complete, targetGroup) => {
        return { title, desc, dueDate, priority, notes, complete, targetGroup }
    },
    todoGroupFactory: (groupTitle) => {
        let todoArray = [];
        return { groupTitle, todoArray }
    }
};

const todoActions = {
    addGroup: (groupTitle) => {
        let newTodoGroup = factories.todoGroupFactory(groupTitle);
        todos.groups.push(newTodoGroup);
        console.log(`A new to-do group titled ${groupTitle} was added. New to-do Group data below:`);
        console.table(newTodoGroup);
        todoActions.setLocalData();
    },
    addTodo: (title, desc, dueDate, priority, notes, complete, targetGroup) => {
        let newTodo = factories.todoFactory(title, desc, dueDate, priority, notes, complete, targetGroup);
        todos.groups.forEach(group => {
            if (group.groupTitle === targetGroup) {
                group.todoArray.push(newTodo);
                console.log(`A new to-do titled ${title} was added to ${targetGroup}. New to-do data below:`);
                console.table(newTodo);
                return
            }
        });
        todoActions.setLocalData();
    },
    deleteTodo: (targetGroup, todoID) => {
        todos.groups.forEach(group => {
            if (group.groupTitle === targetGroup) {
                group.todoArray.splice(parseInt(todoID), 1)
            }
        });
        todoActions.setLocalData();
    },
    deleteGroup: (targetGroup) => {
        let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === targetGroup);
        todos.groups.splice(groupIndex, 1);
        todoActions.setLocalData();
    },
    moveTodo: (oldGroupTitle, newGroupTitle, todoID) => {
        let todoToMove = null;
        todos.groups.forEach(group => {
            if (group.groupTitle === oldGroupTitle) {
                todoToMove = group.todoArray[parseInt(todoID)];
                group.todoArray.splice(parseInt(todoID), 1)
            }
        })
        todos.groups.forEach(group => {
            if (group.groupTitle === newGroupTitle) {
                group.todoArray.push(todoToMove);
                console.log(`A to-do titled ${todoToMove.title} was moved to ${newGroupTitle} from ${oldGroupTitle}. Moved to-do's data below:`);
                console.table(todoToMove);
                return
            }
        });
        todoActions.setLocalData();
    },
    updateTodo: (targetGroup, todoID, newComplete, newTitle, newDesc, newDueDate, newPriority, newNotes) => {
        todos.groups.forEach(group => {
            if (group.groupTitle === targetGroup) {
                if(group.todoArray[todoID]) console.log(`A record was found to update! Original to-do:`)
                console.table(group.todoArray[todoID])
                console.log(newTitle == null)
                if (group.todoArray[todoID].complete !== newComplete && newComplete !== null) group.todoArray[todoID].complete = newComplete;
                if (group.todoArray[todoID].title !== newTitle && newTitle !== null) group.todoArray[todoID].title = newTitle;
                if (group.todoArray[todoID].desc !== newDesc && newDesc !== null) group.todoArray[todoID].desc = newDesc;
                if (group.todoArray[todoID].dueDate !== newDueDate && newDueDate !== null) group.todoArray[todoID].dueDate = newDueDate;
                if (group.todoArray[todoID].priority !== newPriority && newPriority !== null) group.todoArray[todoID].priority = newPriority;
                if (group.todoArray[todoID].notes !== newNotes && newNotes !== null) group.todoArray[todoID].notes = newNotes;
                console.log("The record has been updated. Updated to-do:")
                console.table(group.todoArray[todoID])
            }
        });
        todoActions.setLocalData();
    },
    setLocalData: () => {
        const todoDataString = JSON.stringify(todos);
        localStorage.setItem("todoData", todoDataString);
        console.log("task data has been saved to local storage.")
    },
    useLocalData: async () => {
        const todoDataString = localStorage.getItem("todoData");
        const todoData = JSON.parse(todoDataString);
        todos = todoData;
        console.log("task data has been loaded from local storage");
        console.log(todos);
    },
    checkLocalStorage: () => {
        if (localStorage.getItem("todoData")) {
            todoActions.useLocalData();
        }
        todos = JSON.parse(localStorage.getItem("todoData")); 
      },
};

let todos = {
    groups: [
        {
            groupTitle: "General",
            todoArray: [
                { title: "Example Title", desc: "This is an example description of the to-do", dueDate: "2020-11-20", priority: "Low", notes: "This is an example of a note.", complete: true }
            ]
        }
    ],
};



export { factories, todoActions, todos }