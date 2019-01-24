import React, { Component } from 'react';

class DayNotesList extends Component {
  createNote() {
    return(
      this.props.dayNotesList.map((note, noteId) => {
        let verse = note.verse;

        if(verse) {
          return(
            <div key={noteId} className={'note'}>
                <div className={'noteData'}>
                    <div className={'noteTitle'}>{verse.bookTitle}  {verse.book}:{verse.chapterList}</div>
                    <div className={'tags'}>
                        {note.tags.map((tag) => {
                            return( tag + '  ')
                        })}
                    </div>
                    <div className={'userId'}>{note.userId}</div>
                </div>
                <div className={'noteText'}>{note.text}</div>
            </div>
          )
        } else {
          console.log('Заметка отсутствует!')
        }
      })
    )
  }

  render() {
    return (
      <div className={'containerNotes'}>
        {this.createNote()}
      </div>
    )
  }
}

export default DayNotesList;
