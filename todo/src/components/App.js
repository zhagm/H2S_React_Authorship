import React, { Component } from 'react';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>To-do List</h1>
                <Table/>
            </React.Fragment>
        )
    }
}

export default App;