import { h, render, Component  } from 'preact';
import storeNote from '../../persistence/store_note';
import { default as PersistentNote } from '../../persistence/note';

export default class AddTagButton extends Component<AddTagButtonProps, AddTagButtonState> {
  render() {
    if (this.state.editing) {
      return (
        <input
          className="note-tags-edit"
          type="text"
          ref={
            (el : Element | undefined) => {
              if (el == undefined) { return; }
              (el as HTMLInputElement).focus();
            }
          }
          onKeyDown={
            (e : KeyboardEvent) => {
              if (e.key !== 'Enter') { return; }
              this.setState({
                editing: false
              }, () => {
                storeNote({
                  ...this.props.note,
                  tags: [
                    ...this.props.note.tags,
                    (e.target as HTMLInputElement).value
                  ]
                })
              })
            }
          }
        />
      );
    } else {
      return (
        <div
          className="note-tags-add-button"
          onClick={() => this.setState({
            editing: true
          })}
        >
          +
        </div>
      );
    }
  }
}

export type AddTagButtonProps = {
  parent : JSX.Element,
  note : PersistentNote
};

export type AddTagButtonState = {
  editing : boolean
};