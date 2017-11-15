import { h, render, Component } from 'preact';
import { default as PersistentNote } from '../../persistence/note';
import Note from '../view_a_note/Note';

export default class NotesList extends Component<NotesListProps, NotesListState> {
  render() {
    return (
      <div
        className="notes-list"
      >
        {...this.props.notes.map(note => (<Note note={note} />))}
      </div>
    );
  }
}

export type NotesListProps = {
  notes : Array<PersistentNote>
};

export type NotesListState = {};