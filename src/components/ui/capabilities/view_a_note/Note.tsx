import { h, render, Component } from 'preact';
import { default as PersistentNote } from '../../../persistence/concepts/note';

export default class Note extends Component<NoteProps, NoteState> {
  render() : JSX.Element {
    return (
      <div
        className="note"
        id={`note-${this.props.note._id}`}
      >
        <div
          className="note-time"
        >
          {this.props.note.time}
        </div>
        <div
          className="note-text"
        >
          {this.props.note.text}
        </div>
        <div
          className="note-tags"
        >
          {...this.renderTags()}
        </div>
      </div>
    );
  }

  renderTags() : Array<JSX.Element> {
    return this.props.note.tags.map((tag : string) => (
      <div
        className={`note-tag note-tag-${tag}`}
      >
        {tag}
      </div>
    ));
  }
}

export type NoteProps = {
  note : PersistentNote
};

export type NoteState = {};