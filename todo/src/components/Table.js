import React, { Component } from 'react';

class Table extends Component {
    state = {
        todos: []
    }
    componentDidMount() {
        fetch('http://h2s-api.herokuapp.com/todos')
        .then( (res) => res.json())
        .then( (res) => console.log("res:", res))
        .catch((err) => console.error("Error: ", err));
    }
    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>hw</td>
                        <td>false</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;