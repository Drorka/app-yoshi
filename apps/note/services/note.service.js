import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


const NOTE_KEY = 'noteDB'
_createNote()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextNoteId,
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


function _createNote() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('audu', 300))
        notes.push(_createNote('fiak', 120))
        notes.push(_createNote('subali', 50))
        notes.push(_createNote('mitsu', 150))
        notes.push(_createNote('audu', 250))
        notes.push(_createNote('fiak', 180))
        notes.push(_createNote('subali', 35))
        notes.push(_createNote('mitsu', 135))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _createNote(vendor, maxSpeed = 250) {
    const note = getEmptyNote(vendor, maxSpeed)
    note.id = utilService.makeId()
    return note
}