import { h, render, Component  } from 'preact';

export default class SingleLineTextField extends Component<SingleLineTextFieldProps, {}> {
  input : HTMLInputElement;

  render() {
    return (
      <input
        className={this.props.className}
        type="text"
        value={this.props.value}
        ref={(el) => this.input = el as HTMLInputElement}
        onChange={
          this.props.onChange ?
          // @ts-ignore
          (e : Event) => this.props.onChange((e.target as HTMLInputElement).value)
          :
          undefined
        }
        onKeyDown={
          this.props.onChange ?
          (e : KeyboardEvent) => {
            if (e.key !== 'Enter') { return; }
            // @ts-ignore
            this.props.onChange((e.target as HTMLInputElement).value);
          }
          :
          undefined
        }
        onBlur={this.props.onBlur}
      />
    );
  }

  componentDidMount() {
    this.props.autoFocus && this.input.focus();
  }
}

export type SingleLineTextFieldProps = {
  className? : string,
  value? : string,
  autoFocus? : boolean,
  onChange? : (value : string) => void,
  onBlur? : () => void
};
