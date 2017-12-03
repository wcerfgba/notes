import { h, render, Component } from 'preact';
import { PersistentNote } from '../persistence';
import { Note } from './';

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
