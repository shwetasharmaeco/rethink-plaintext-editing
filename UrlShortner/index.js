let shortid = require("shortid");
let validator = require("validator");

class UrlShortner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            file: "",
            text: ""
        }
        this.search = this.search.bind(this);
        this.updateFileText = this.updateFileText.bind(this);
        this.recordVal = this.recordVal.bind(this)
    }
    search(e) {
        var result = []
        if (validator.isURL(this.state.text)) {
            result = result.concat(this.state.result)
            result.push({ "url": this.state.text, "short": shortid.generate() })
            this.setState({ result: result })
        }
    }

    recordVal(e) {
        var keyword = e.target.value;
        this.setState({ text: keyword })
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
                <h1>Enter a valid URL and press Submit</h1>
                <h3>You can submit multiple URLs</h3>
                <input
                    placeholder="Type full url"
                    onChange={this.recordVal}
                >
                </input>
                <button
                    type="submit"
                    onClick={this.search}>submit</button>
                <h2>Shortned Urls</h2>
                <div className="result">
                    <table className="names" >
                        <tbody>
                            {this.state.result.map((res, idx) => (
                                <tr key={idx} style={{ border: 'solid' }}>
                                    <td style={{ border: 'solid' }}>{res.url}</td>
                                    <td style={{ border: 'solid' }}><a href={res.url} target="_blank">{res.short}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default UrlShortner;

