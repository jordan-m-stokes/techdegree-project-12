import React, {Component} from 'react';
import SearchIcon from '../res/search-icon';

class Search extends Component
{
    state = 
    {
        text: ''
    }

    //syncs "state" text with the text in the search bar
    onChange = event => {
      this.setState({ text: event.target.value });
    }

    //handles when user submits text clearing the search bar
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSearch(this.query.value);
        event.currentTarget.reset();
      }

    render()
    {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="text" 
                    onChange={this.onChange}
                    ref={(input) => this.query = input}
                    placeholder="Search..." />
                <button type="submit" className="search-button">
                    <SearchIcon />	
                </button>
            </form>
        );
    }
}

export default Search;