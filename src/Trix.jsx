import { Component } from 'react';

export default class TrixEditor extends Component {

  _id = this._generateId();

  componentDidMount() {
    this._editor = document.getElementById(`editor-${this._id}`);
    this._editor.addEventListener('trix-initialize', this._handleChange);
    this._editor.addEventListener('trix-change', this._handleChange);
  }

  componentWillUnmount() {
    this._editor.removeEventListener('trix-initialize', this._handleChange);
    this._editor.removeEventListener('trix-change', this._handleChange);
  }

  _generateId() {
    let timestamp = Date.now();
    let uniqueNumber = 0;

    (() => {
      // If created at same millisecond as previous
      if (timestamp <= uniqueNumber) {
        timestamp = ++uniqueNumber;
      } else {
        uniqueNumber = timestamp;
      }
    })();

    return 'T' + timestamp;
  }

  _handleChange = (e) => {
    this.props.onChange(e);
  };

  render() {
    const { toolbar } = this.props;
    const inputProps = {};

    if (toolbar) {
      inputProps['toolbar'] = toolbar
    }

    return (
      <div>
        <trix-editor
          id={`editor-${this._id}`}
          input={`input-${this._id}`}
          style={this.props.style}
        />
        <input
          type="hidden"
          id={`input-${this._id}`}
          value={this.props.value}
          {...inputProps}
        />
      </div>
    )
  }
}

TrixEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  toolbar: PropTypes.object,
  style: PropTypes.string
};