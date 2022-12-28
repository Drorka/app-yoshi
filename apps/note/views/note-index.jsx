const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteAdd } from '../cmps/note-add.jsx'


export function NoteIndex() {

    return <section className="note-index">

        <div className="note-index-add">
            <NoteAdd />
        </div>

  </section>

}
