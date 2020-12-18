import { getData } from './data';

function traverse(root) {
  var results = []
  if (!root) {
    return
  }
  if (root.val != "") {
    results.push(root.val)
  }
  for (const key in root.children) {
    results = results.concat(traverse(root.children[key]))
  }
  return results
}

class Node {
  constructor(val, children) {
    this.val = val
    this.children = children
  }
}

class Trie {
  constructor(list) {
    this.root = new Node("", {})
    for (const name of list) {
      this.add(name)
    }
  }
  add(name) {
    var currRoot = this.root
    for (var i = 0; i < name.length; i++) {
      var char = name[i].toLowerCase()
      if (!currRoot.children[char]) {
        currRoot.children[char] = new Node("", {})
      }
      currRoot = currRoot.children[char]
    }
    currRoot.val = name
  }
  prefix(keyword) {
    var currRoot = this.root
    for (var i = 0; i < keyword.length; i++) {
      var char = keyword[i]
      if (!currRoot.children[char]) {
        return []
      }
      currRoot = currRoot.children[char]
    }
    return traverse(currRoot)
  }
}

class PrefixSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      trie: new Trie(getData()),
      file: ""
    }
    this.search = this.search.bind(this);
    this.updateFileText = this.updateFileText.bind(this);
  }
  search(e) {
    var keyword = e.target.value.toLowerCase();
    this.setState({ result: this.state.trie.prefix(keyword) })
  }
  async updateFileText() {
    if (this.state.file.name != this.props.file.name) {
      const defaultTextEditor = await this.props.file.text();
      this.setState({ text: defaultTextEditor, file: this.props.file });
    }
  }

  render() {
    this.updateFileText()
    return (
      <div>
        <h1>Search Bar</h1>
        <input
          placeholder="Type name to search from data.js"
          onChange={this.search}>
        </input>
        <h2>Search Result</h2>
        <div className="result">
          <ul className="names">
            {this.state.result.map((res) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}



export default PrefixSearch;

