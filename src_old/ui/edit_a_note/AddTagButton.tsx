import { h, render, Component  } from 'preact';
import storeNote from '../../persistence/store_note';
import { default as PersistentNote } from '../../persistence/note';
import SingleLineTextField from '../single_line_text_field';

export default class AddTagButton extends Component<AddTagButtonProps, AddTagButtonState> {
  render() {
    if (this.state.editing) {
      return (
        <SingleLineTextField
          className="note-tag note-tags-add-button-editing"
          autoFocus={true}
          onChange={this.addTag}
          onBlur={() => this.setState({
            editing: false
          })}
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

  addTag = (tag : string) => {
    this.setState({
      editing: false
    }, () => {
      storeNote({
        ...this.props.note,
        tags: [
          ...this.props.note.tags,
          tag
        ]
      })
    })
  }
}

export type AddTagButtonProps = {
  parent : JSX.Element,
  note : PersistentNote
};

export type AddTagButtonState = {
  editing : boolean
};