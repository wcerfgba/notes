import { h, render, Component } from 'preact';
import { default as PersistentNote } from '../../persistence/note';
// @ts-ignore
import lowerOrderComponent from '../lower_order_component';
import './Note.scss';

export class Note extends Component<NoteProps, NoteState> {
  noteText : Element | undefined;

  render() : JSX.Element {
    return (
      <div
        className="note"
        id={`note-${this.props.note._id}`}
      >
        <div
          className="note-datetime"
        >
          <div
            className="note-date"
          >
            {this.niceDate()}
          </div>
          <div
            className="note-time"
          >
            {this.niceTime()}
          </div>
        </div>
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

// @ts-ignore: heeeelp
const LowerOrderNote = lowerOrderComponent(Note);
export default LowerOrderNote;