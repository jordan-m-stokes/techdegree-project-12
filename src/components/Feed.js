import React, {Component} from 'react';

import axios from 'axios';

import Card from './pieces/Card';

class Feed extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { width: 0, height: 0, cards: [] };
    }
      
    componentDidMount()
    {
        axios.get('http://localhost:5000/posts/json',
              {
                  headers: {

                  }
              })
         .then((response) =>
         {
            const posts = response.data;

            const cards = posts.map((post) => 
            {
                let card = <Card thumbnail={post.coverPhoto.links.large} title={post.title} lead={post.lead}/>;
                return card;
            });

            this.setState({cards: cards});

            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
         })
         .catch(function (error)
         {
            console.log(error);
         });
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions()
    {
        const feed = document.querySelector('.feed');
        const cards = feed.querySelectorAll('.card');
        const spacePerCard = 360 /* px */

        let totalColumns = parseInt(window.innerWidth / spacePerCard * .95);
        let columns = document.querySelectorAll('.column');

        if(totalColumns < 1) totalColumns = 1;

        if(columns.length > 0)
        {
            columns.forEach(column => 
            {
                column.parentNode.removeChild(column);
            });

        }

        columns = [];

        for(let i = 0; i < totalColumns; i++)
        {
            const column = document.createElement('div');

            column.className = 'column';
            column.style.display = 'inline-block';
            column.style.width  = `${spacePerCard}px`;

            columns.push(column);
        }

        for(let i = 0; i < cards.length; i++)
        {
            cards[i].parentNode.removeChild(cards[i]);
            columns[i % totalColumns].appendChild(cards[i]);
            cards[i].style.display = 'flex';
        }

        columns.forEach(column => 
        {
            feed.appendChild(column);
        });
    }

	render()
	{
		return (
			<div className="feed">
                {this.state.cards}
            </div>
		);
	}
}

export default Feed;