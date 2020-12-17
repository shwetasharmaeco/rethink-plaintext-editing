import { CodeBlock } from "react-code-blocks";

class CodeEditor extends React.Component {
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
    var lang = '';
    switch (this.props.file.type) {
      case 'text/javascript':
      case 'application/json':
        lang = 'javascript';
        break;
      case 'text/python':
        lang = 'python';
        break;
    }
    return (
      <div>
        <h1> Plain Text Editor</h1>
        <CodeBlock
          text={this.state.text}
          language={lang}
        >
        </CodeBlock>
      </div>
    )
  }
}

export default CodeEditor;

