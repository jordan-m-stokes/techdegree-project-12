import React, {Component} from 'react';

import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';

import Header from './components/Header';
import TopGradient from './components/pieces/TopGradient';
import Feed from './components/Feed';
import Footer from './components/Footer';

class App extends Component
{
	render()
	{
		return (
			<BrowserRouter>
				<div className="App bg-light">
					<Route path="/" component={Header}/>
					<Route path="/" component={TopGradient}/>
					<Switch>
						<Route exact path="/" component={() => <Feed />}/>
					</Switch>
					<Route path="/" component={Footer}/>
				</div>
      		</BrowserRouter>
		);
	}
}

export default App;
