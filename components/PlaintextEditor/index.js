import React from 'react';
import PropTypes from 'prop-types';

import css from './style.css';



class PlaintextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
    this.updateText = this.updateText.bind(this);
    this.updateFileText = this.updateFileText.bind(this);
  }
  updateText(e) {
    this.setState({ text: e.target.value });
  }
  async updateFileText() {
    const defaultTextEditor = await this.props.file.text();
    this.setState({ text: defaultTextEditor });
  }
  render() {
    this.updateFileText()
    return (
      <div>
        <h1> Plain Text Editor</h1>
        <textarea
          rows="5"
          cols="100"
          className="input"
          value={this.state.text}
          onChange={this.updateText}>
        </textarea>
      </div>
    )
  }
}



// function PlaintextEditor({ file, write }) {
//   console.log(file, write);
//   return (
//     <div className={css.editor}>
//       <h3>TODO</h3>
//       <i>text/plain</i>
//     </div>
//   );
// }

// PlaintextEditor.propTypes = {
//   file: PropTypes.object,
//   write: PropTypes.func
// };

export default PlaintextEditor;
