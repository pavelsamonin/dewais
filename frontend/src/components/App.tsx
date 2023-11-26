import React from 'react';
import {Component} from 'react';
import axios from 'axios'

interface AppProps {
    message: string
}

interface AppState {
    text: string,
    result: string
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            text: "",
            result: ""
        }
    }

    onChange = (e) => {
        this.setState({text: e.target.value, result: ""});
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {text} = this.state;
        axios.post('https://leby34yaycecaegio7w5k7ubhy0vjdvc.lambda-url.eu-north-1.on.aws/', {text})
            .then((result) => {
                this.setState({text: this.state.text, result: JSON.stringify(result.data)})
            });
    }

    render() {
        const {text, result} = this.state;
        return <form onSubmit={this.onSubmit}>
            <p>{this.props.message}</p>
            <textarea name="body" value={text} onChange={this.onChange}/>
            <p>Results</p>
            <textarea name="result" value={result} onChange={this.onChange}/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    }
}

export default App;