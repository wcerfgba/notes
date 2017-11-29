import { h, render, Component  } from 'preact';
import storeNote from '../../persistence/store_note';
import { default as PersistentNote } from '../../persistence/note';
import SingleLineTextField from '../single_line_text_field';

export default class EditableTag extends Component<EditableTagProps, EditableTagState> {
  render() {
    if (this.state.editing) {
      return (
        <SingleLineTextField
          className={`note-tag note-tag-${this.value}-editing`}
          autoFocus={true}
          onChange={this.updateTag}
          onBlur={() => this.setState({
            editing: false
          })}
          value={this.value}
        />
      );
    } else {
      return (
        <div
          className={`note-tag note-tag-${this.value}`}
          onClick={() => this.setState({
            editing: true
          })}
        >
          {this.value}
        </div>
      );
    }
  }

  get value() {
    return this.props.note.tags[
      this.props.tagIndex
    ];
  }

  updateTag = (tag : string) => {
    const tags = this.props.note.tags;
    tags[this.props.tagIndex] = tag;
    this.setState({
      editing: false
    }, () => {
      storeNote({
        ...this.props.note,
        tags: tags.filter((tag : string) => tag && true)
      })
    })
  };
}

export type EditableTagProps = {
  note : PersistentNote,
  tagIndex : number
};

export type EditableTagState = {
  editing : boolean
};