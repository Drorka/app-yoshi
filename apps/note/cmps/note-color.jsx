
export function NoteColor( { note, onChangeColor, colorsClose } ) {
    const colors = [
        '#A4A4A4',
        '#FDE0DF',
        '#B0C6D0',
        '#EEF1E6',
        '#CDC5D6',
        '#CBF0F8',
        '#F8F0BC',
        '#F1E4DE',
    ]


    return <section className="colors-container"
        onMouseLeave={colorsClose}>
        {
            colors.map((color, idx) =>( 
                <div className="color"
                    key={idx}
                    style={ {backgroundColor: color}}
                    onClick={() => {
                        onChangeColor(note, color)
                        colorsClose()
                    }}>  
                </div>
        ))}
    </section>
}