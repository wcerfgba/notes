import { h, render, Component } from 'preact';
import { default as PersistentNote } from '../../persistence/note';
// @ts-ignore: untyped metaprogramming
import reopenable from '../reopenable';
import './Note.scss';

export class Note extends Component<NoteProps, NoteState> {
  noteText : Element | undefined;
  noteDate : Element | undefined;
  noteTime : Element | undefined;

  render() : JSX.Element {
    return (
      <div
        className="note"
        id={`note-${this.props.note._id}`}
      >
        {this.renderTime()}
        <div
          className="note-text"
          ref={(el) => { this.noteText = el }}
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

  renderTime() {
    return (
      <div
        className="note-time"
      >
        <div
          className="note-time-date"
          ref={(el) => { this.noteDate = el }}
        >
          {this.niceDate()}
        </div>
        <div
          className="note-time-time"
          ref={(el) => { this.noteTime = el }}
        >
          {this.niceTime()}
        </div>
      </div>
    );
  }

  niceDate() : string {
    const d = new Date(this.props.note.time);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  niceTime() : string {
    const d = new Date(this.props.note.time);
    return `${d.getHours()}:${d.getMinutes()}`;
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

const ReopenableNote = reopenable(Note);
export default ReopenableNote;