import React from 'react';
import Cards from './components/Cards';
import SearchBox from './components/SearchBox';
import {robots} from './robots'


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    onSearch = (event) => {
        this.setState({searchfiled:event.target.value});
        const filteredRobots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase);
        })

    }

    render(){
        return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearch} />
                <Cards robots={this.state.robots} />
            </div>
        )
    }
}

export default App;
