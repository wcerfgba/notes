import { h, render, Component  } from 'preact';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import storeNote from '../../persistence/store_note';
import PersistentNote from '../../persistence/note';
import { Note, default as ReopenableNote } from '../view_a_note/Note';
import AddTagButton from './AddTagButton';
import EditableTag from './EditableTag';

ReopenableNote.reopen.render.push(
  makeNoteTagsEditable,
  addAddTagButton
);

type NullaryDecorator<T, Y> = (this : T, f : () => Y) => () => Y;

function addAddTagButton(this : Note, render : () => JSX.Element) : NullaryDecorator<Note, JSX.Element> {
  return () => {
    const result = render.apply(this);
    const noteTags : JSX.Element = R.find(R.propEq('key', 'note-tags'), result.children);
    noteTags.children = noteTags.children || [];
    noteTags.children.push(
      <AddTagButton
        parent={noteTags}
        note={this.props.note}
      />
    );
    return result;
  }
}

function makeNoteTagsEditable(this : Note, render : () => JSX.Element) {
  return () => {
    const result = render.apply(this);
    const noteTagsIndex = R.findIndex(R.propEq('key', 'note-tags'), result.children);
    console.log(result.children[noteTagsIndex]);
    result.children[noteTagsIndex].children = result.children[noteTagsIndex].children || [];
    result.children[noteTagsIndex].children =
      result
        .children[noteTagsIndex]
        .children
        .map((tag : JSX.Element, index : number) => (
          <EditableTag
            note={this.props.note}
            tagIndex={index}
          />
        ));
        console.log(result.children[noteTagsIndex]);
    return result;
  }
}

const EditableNoteText = (props : { note : PersistentNote }) => (
  <div
    className="note-text"
    key="note-text"
  >
    <textarea
    value={props.note.text}
      ref={(el : Element | undefined) => {
        if (el != undefined) {
          const inputs = Rx.Observable.fromEvent<Event>(el, 'input');
          return inputs
            .debounceTime(333)
            .subscribe((e : Event) => {
              const text = (el as HTMLTextAreaElement).value;
              storeNote({
                ...props.note,
                text: text + '!'
              });
            });
        }
      }}
    >
    </textarea>
  </div>
);
