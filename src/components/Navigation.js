import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import Search from './Search';

export default class Navigation extends Component
{
	//redirects route when user submits a search
	redirect = (query) =>
	{
		if(query.length > 0)
		{
			this.props.history.push(`/results/${query}`);
		}
	}

	//checks current route to see if images need to be loaded
	handleCurrentRoute()
	{
		const newQuery = this.props.match.params.query;

		if(this.props.query !== newQuery)
		{
			this.props.performSearch(newQuery);
		}
	}

	componentDidUpdate()
	{
		this.handleCurrentRoute();
	}

	componentDidMount()
	{
		this.handleCurrentRoute();
	}

    render()
    {
      	return (
    		<nav className="main-nav">

				<Search handleSearch={this.redirect}/>

				<ul className="course-nav">
        			<li><NavLink to={`/results/dogs`}>Dog</NavLink></li>
					<li><NavLink to={`/results/sunset`}>Sunset</NavLink></li>
					<li><NavLink to={`/results/snow`}>Snow</NavLink></li>
				</ul>
			</nav>
     	);
      
    }
}