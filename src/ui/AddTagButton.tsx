import { h, render, Component  } from 'preact';
import { PersistentNote, Database } from '../persistence';
import SingleLineTextField from './components/SingleLineTextField';

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
      Database.put({
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
  note : PersistentNote
};

export type AddTagButtonState = {
  editing : boolean
};
