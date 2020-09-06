import React from 'react';
import Cards from '../components/Cards';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
// import {robots} from './robots'
import './App.css'


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots:users}));
        
    }

    onSearch = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render(){
        const {robots, searchfield} = this.state;
        const filtered = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return robots.length ?
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearch} />
                    <Scroll>
                        <Cards robots={filtered} />
                    </Scroll>
                </div>
            ) :          
            <h1 className='tc'>Loading...</h1>
        

    }
}

export default App;
