import React from 'react';
import { connect } from 'react-redux'
import Cards from '../components/Cards';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
// import {robots} from './robots'
import './App.css'

import { setSearchField } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: []
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots:users}));
        
    }

    // onSearch = (event) => {
    //     this.setState({ searchfield: event.target.value });
    // }

    render(){
        console.log('dbg Render, state? ', this.state, this.props)
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filtered = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return robots.length ?
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <Cards robots={filtered} />
                        </ErrorBoundry>
                        
                    </Scroll>
                </div>
            ) :          
            <h1 className='tc'>Loading...</h1>
        

    }
}

// Connecting App to redux Store
export default connect(mapStateToProps, mapDispatchToProps)(App);
