const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteList } from '../cmps/note-list.jsx'


export function NoteIndex() {

    return <section className="note-index">

        <div className="note-index-add">
            <NoteAdd />
        </div>

        <div className="note-index-list">
            <NoteList />
        </div>

  </section>

}
