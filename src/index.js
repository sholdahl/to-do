const noteMaker = {
    noteFactory: (title, desc, dueDate, priority, notes, group) => {
        return { title, desc, dueDate, priority, notes, group }
    },
    noteGroupFactory: (groupTitle) => {
        let noteArray = [];
        return { groupTitle, noteArray }
    }
};

const noteAdder = {
    addNoteGroup: (groupTitle) => {
        noteHolder.noteGroups.push(noteMaker.noteGroupFactory(groupTitle));
    },
    addNote: (title, desc, dueDate, priority, notes, group) => {
        let newNote = noteMaker.noteFactory(title, desc, dueDate, priority, notes, group);
        noteHolder.noteGroups.forEach(note => {
            console.log(note)
            if (note.groupTitle === group) {
                note.noteArray.push(newNote);
                return
            }
        })
    }
};

const noteHolder = {
    noteGroups: [
        {
            groupTitle: "General",
            noteArray: [
                { title: "Example Title", desc: "This is an example description of the to-do", dueDate: "mm/dd/yyyy", priority: "Low", notes: "" }
            ]
        }
    ]
};

noteAdder.addNoteGroup("Work");
noteAdder.addNoteGroup("Personal");
noteAdder.addNoteGroup("Gym");

noteHolder.noteGroups[3].noteArray.push(noteMaker.noteFactory("Work Out", "Go to gym and lift some things", "11/20/2020", "High", ""));

noteAdder.addNote("Work Out", "Go to gym and lift some things", "11/20/2020", "High", "", "Gym");