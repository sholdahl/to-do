import { createDom, render} from "./render";
import { todoActions, todos} from "./todo";

const processForms = {
    newGroup: () => {
        let newGroupTitle = document.querySelector("#group-title").value;
        let overlay = document.querySelector("#overlay");
        let groupPopUp = document.querySelector(".pop-up-container");

        todoActions.addGroup(newGroupTitle);

        console.log(newGroupTitle)

        let groupIndex = todos.groups.findIndex((todoObj) => todoObj.groupTitle === newGroupTitle);
        let newGroup = todos.groups[groupIndex];

        console.log(groupIndex);
        console.log(newGroup);

        let newGroupDomData = createDom.createGroupDom(newGroup);

        render.newGroup(newGroupDomData);

        overlay.classList.remove("overlay-active");
        groupPopUp.classList.add("hidden");
        document.querySelector("#group-title").value = "";
    },

}

export {processForms}