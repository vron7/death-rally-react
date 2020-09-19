import React from 'react';
import { connect } from 'react-redux'
import Cards from '../components/Cards';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
// import {robots} from './robots'
import './App.css'

import { requestRobots, setSearchField } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component{

    componentDidMount() {
        this.props.onRequestRobots()        
    }

    render(){
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filtered = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ?
            <h1 className='tc'>Loading...</h1> :
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
            )
        

    }
}

// Connecting App to redux Store
export default connect(mapStateToProps, mapDispatchToProps)(App);
