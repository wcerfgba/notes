import { h, render, Component  } from 'preact';
import { Note, default as LowerOrderNote }from '../view_a_note/Note';

LowerOrderNote.decorators.push(
  (that : any) => {
    console.log('decorator');
    // @ts-ignore
    console.log(that);
    // @ts-ignore
    if (that.noteText !== undefined) {
      // @ts-ignore
      that.noteText.setAttribute('contenteditable', 'true');
    }
  }
);