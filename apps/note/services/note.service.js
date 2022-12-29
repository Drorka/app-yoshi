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
    getNextNoteId,
    createNote,
    createNotes,
}


function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.vendor))
            }
            if (filterBy.minSpeed) {
                notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
            }
            return notes
        })
}


function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
    
}


function getNextNoteId(noteId) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            var idx = notes.findIndex(note => note.id === noteId)
            if (idx === notes.length - 1) idx = -1
            return notes[idx + 1].id
        })
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


function getEmptyNote(txtFromUser, date) {
    return {
        id: utilService.makeId(), 
        createdAt: utilService.getMailDate(date),
        type: "note-txt", 
        isPinned: true, 
        info: { 
            title: "",
            txt: txtFromUser,
        } ,
        style: { 
            backgroundColor: utilService.getRandomColor()
        } 
    }
}


function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
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
                backgroundColor: "#F8B95F" 
            } 
        }, 
        { 
            id: "n102",
            createdAt: 11134522,
            type: "note-img", 
            isPinned: false, 
            info: { 
                title: "Mario and Yoshi Flying",
                url: "https://mario.wiki.gallery/images/5/5f/Marioyoshismw.png", 
            }, 
            style: { 
                backgroundColor: "#2ABAE3" 
            } 
        }, 
        { 
            id: "n103", 
            createdAt: 11334562,
            type: "note-todos", 
            isPinned: false, 
            info: { 
                label: "Get my stuff together", 
                todos: [ 
                    { txt: "Get the stone", doneAt: null }, 
                    { txt: "Help Mario", doneAt: 187111111 },
                ] 
            },
            style: { 
                backgroundColor: "#8D4825" 
            } 
        } 
    ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}


function createNote(txt) {
    const note = getEmptyNote(txt)
    return note
}