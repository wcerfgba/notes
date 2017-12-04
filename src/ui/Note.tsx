import { h, render, Component } from 'preact';
import { PersistentNote } from '../persistence';
import { EditableTag, AddTagButton, EditableNoteText, EditableNoteTime } from './';
import './Note.scss';

export default class Note extends Component<NoteProps, NoteState> {
  render() : JSX.Element {
    return (
      <div
        className="note"
        id={`note-${this.props.note._id}`}
      >
        <EditableNoteTime
          note={this.props.note}
        />
        <EditableNoteText
          note={this.props.note}
        />
        <div
          className="note-tags"
          key="note-tags"
        >
          {...this.renderTags()}
        </div>
      </div>
    );
  }

  renderTags() : Array<JSX.Element> {
    return this.props.note.tags.map(
      (tag : string, index : number) => (
        <EditableTag
          note={this.props.note}
          tagIndex={index}
        />
      )
    ).concat(
      <AddTagButton
        note={this.props.note}
      />
    );
  }
}

export type NoteProps = {
  note : PersistentNote
};

export type NoteState = {};
