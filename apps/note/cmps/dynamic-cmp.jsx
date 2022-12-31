import { NoteTxt } from './note-text.jsx'
import { NotePic } from './note-pic.jsx'
import { NoteVideo } from './note-video.jsx'
import { NoteTodos } from './note-todos.jsx'


export function DynamicCmp( {type, info} ){
    switch (type) {
        case 'note-txt':
            return <NoteTxt info={info} />

        case 'note-pic':
            return <NotePic info={info} />

        case 'note-video':
            return <NoteVideo info={info} />

        case 'note-todos':
            return <NoteTodos info={info} />
            
    }
}