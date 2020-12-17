import React from 'react';
let marked = require("marked");

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "",
      file: ""
    }
    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.updateFileText = this.updateFileText.bind(this);
  }
  updateMarkdown(e) {
    this.setState({ markdown: e.target.value });
  }

  async updateFileText() {
    if(this.state.file.name != this.props.file.name) {
      const defaultTextEditor = await this.props.file.text();
      this.setState({ markdown: defaultTextEditor, file: this.props.file });  
    } 
  }

  render() {
    this.updateFileText()
    return (
      <div>
        <div>
          <h1> Markdown Input</h1>
          <textarea
            rows="10"
            cols="100"
            className="input"
            value={this.state.markdown}
            onChange={this.updateMarkdown}>
          </textarea>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}>
        </div>
      </div>
    )
  }
}


export default MarkdownEditor;
