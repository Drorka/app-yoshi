import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'
createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    togglePinnedNote,
    updateTextNote,
    changeColorNote,
    createNote,
    createNotes,
}


function query(filterBy = getDefaultFilter()) {
	return asyncStorageService.query(NOTE_KEY)
        .then((notes) => {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt || note.info.lable || note.info.title))
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

            return notes
        })
}


function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
    
}


function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}


function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}


function getEmptyNote (id = '', createdAt = Date.now() ,type = '', isPinned = false, info = {title:'', txt: '' }, style = {backgroundColor: ''}) {
    return { id, createdAt, type, isPinned, info, style }
}


function getDefaultFilter() {
    return { txt: '', type: '' }
}


function togglePinnedNote(noteId) {
    const notes = storageService.loadFromStorage(NOTE_KEY)

    const notePinned = notes.find(note => note.id === noteId)
    notePinned.isPinned = notePinned.isPinned ? false : true

    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes.splice(noteIdx, 1)
    notes.splice(0, 0, notePinned)

    save(notePinned)

    storageService.saveToStorage(NOTE_KEY, notes)
}


function updateTextNote(note) {
    save(note)
    storageService.saveToStorage(NOTE_KEY, note)
}


function changeColorNote(noteId, color) {
    const notes = storageService.loadFromStorage(NOTE_KEY)

    const note = notes.find(note => note.id === noteId)
    note.style.backgroundColor = color

    save(note)
    storageService.saveToStorage(NOTE_KEY, notes)
}


function createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes =  [
        { 
            id: "n101", 
            createdAt: 1112222,
            type: "note-txt", 
            isPinned: true, 
            info: { 
                title: "",
                txt: "The version of Yoshi seen in the Super Mario Bros!",
            } ,
            style: { 
                backgroundColor: "" 
            } 
        }, 
        { 
            id: "n102",
            createdAt: 11134522,
            type: "note-pic", 
            isPinned: false, 
            info: { 
                title: "Mario and Yoshi Flying",
                url: "https://mario.wiki.gallery/images/5/5f/Marioyoshismw.png", 
            }, 
            style: { 
                backgroundColor: "#FDE0DF" 
            } 
        }, 
        { 
            id: "n103",
            createdAt: 11133722,
            type: "note-video", 
            isPinned: false, 
            info: { 
                title: "Here is Yoshi",
                url: "BL_YQjqfkUk", 
            }, 
            style: { 
                backgroundColor: "" 
            } 
        }, 
        { 
            id: "n104", 
            createdAt: 11334562,
            type: "note-todos", 
            isPinned: false, 
            info: { 
                label: "Get my stuff together", 
                todos: [ 
                    { txt: "Get the stone", isDone: false }, 
                    { txt: "Help Mario", isDone: true },
                    { txt: "Save the princess", isDone: false },
                ] 
            },
            style: { 
                backgroundColor: "#B0C6D0" 
            } 
        } 
    ]
        storageService.saveToStorage(NOTE_KEY, notes)
        console.log('save to storageService', notes)
    }
}


function createNote(txt) {
    const note = getEmptyNote(txt)
    return note
}