import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/storage.service'
import { asyncStorageService } from '../../../services/async-storage.service'


const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextNoteId,
    _createNotes,
}


function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
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
    return storageService.get(NOTE_KEY, noteId)
    
}


function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            var idx = notes.findIndex(note => note.id === noteId)
            if (idx === notes.length - 1) idx = -1
            return notes[idx + 1].id
        })
}


function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}


function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}


function getEmptyNote(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}


function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = defaultNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _createNote(vendor, maxSpeed = 250) {
    const note = getEmptyNote(vendor, maxSpeed)
    note.id = utilService.makeId()
    return note
}


const defaultNotes = [ 
    { 
        id: "n101", 
        type: "note-txt", 
        isPinned: true, 
        info: { 
            txt: "Fullstack Me Baby!" 
        } 
    }, 
    { 
        id: "n102", 
        type: "note-img", 
        info: { 
            url: "http://some-img/me", 
            title: "Bobi and Me" 
        }, 
        style: { 
            backgroundColor: "#00d" 
        } 
    }, 
    { 
        id: "n103", 
        type: "note-todos", 
        info: { 
            label: "Get my stuff together", 
            todos: [ 
                { txt: "Driving liscence", doneAt: null }, 
                { txt: "Coding power", doneAt: 187111111 },
            ] 
        } 
    } 
]