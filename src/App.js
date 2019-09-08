import React, {Component} from 'react';

import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';

import Axios from 'axios';

import Config from './Config';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Results from './components/Results';
import NotFound from './components/NotFound';
import Image from './components/Image';

class App extends Component
{
	state =
	{
		apiKey: Config.apiKey,
        results: [],
        query : '',
    };

    //converts raw data from flickr into usable JSX full of images
	prepareResults(results)
	{
		return results.map( (result, index) =>
		{
            return (<Image key={index} data={result}/>);
		});
	}

    //takes a query submitted by the client and sends a request for image data from flickr
    performSearch = (query) =>
    {
        //sets a loading message for the user
        let state = this.state;

        state.results = <h4>Loading...</h4>;
        state.query = query;

        this.setState(state);

        Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&format=json&nojsoncallback=1&text=${query}&per_page=24&sort=relevance`)
			.then(response =>
			{
                let state = this.state;

                //makes the response data visible to the user
                state.results = this.prepareResults(response.data.photos.photo);

                //if no results are returned, then this is told to the user
                if(state.results.length === 0)
                {
                    state.results = 
                    [
                        <h3 key={100000}>No Results Found</h3>,
                        <p  key={100001}>You search did not return any results. Please try again.</p>
                    ];
                }

                this.setState(state);
			})
			.catch(error =>
			{
                console.log('error fetching and parsing data', error);
                
                //displays to the user that something went wrong
                let state = this.state;

                state.results = [<p>Something went wrong. We couldn't retrieve your images.</p>];
                state.query = query;

                this.setState(state);
			});
    }

	render()
	{
		return (
			<BrowserRouter>
				<div className="App">
                    <Route path="/" component={Header}/>
                    <Switch>
					    <Route exact path="/results/:query" component={({ history, match }) => <Navigation performSearch={this.performSearch} query={this.state.query} history={history} match={match}/>}/>
                        <Route component={({ history, match }) => <Navigation performSearch={this.performSearch} query={this.state.query} history={history} match={match}/>}/>
                    </Switch>
					<Switch>
						<Route exact path="/" component={() => <div></div>}/>
						<Route exact path="/results/:query" component={() => <Results results={this.state.results}/>}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
            </BrowserRouter>
		);
	}
}

export default App;
