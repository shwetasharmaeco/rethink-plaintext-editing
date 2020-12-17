import React from 'react';

class PlaintextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      file: "",
    }
    this.updateText = this.updateText.bind(this);
    this.updateFileText = this.updateFileText.bind(this);
  }
  updateText(e) {
    this.setState({ text: e.target.value });
  }
  async updateFileText() {
    if(this.state.file.name != this.props.file.name) {
      const defaultTextEditor = await this.props.file.text();
      this.setState({ text: defaultTextEditor, file: this.props.file });  
    } 
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

export default PlaintextEditor;
