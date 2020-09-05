import React from 'react';
import Cards from './components/Cards';
import SearchBox from './components/SearchBox';
import {robots} from './robots'
import './App.css'


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    onSearch = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render(){
        const filteredRobots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearch} />
                <Cards robots={filteredRobots} />
            </div>
        )
    }
}

export default App;
