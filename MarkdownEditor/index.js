import React from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
let marked = require("marked");

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ""
    }
    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.updateFileText = this.updateFileText.bind(this);
  }
  updateMarkdown(e) {
    this.setState({ markdown: e.target.value });
  }
  async updateFileText() {
    const defaultText = await this.props.file.text();
    this.setState({ markdown: defaultText });
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



// function MarkdownEditor({ file, write }) {
//   console.log(file, write);
//   return (
//     <div className={css.editor}>
//       <h3>TODO</h3>
//       <i>text/markdown</i>
//     </div>
//   );
// }

// MarkdownEditor.propTypes = {
//   file: PropTypes.object,
//   write: PropTypes.func
// };

export default MarkdownEditor;
