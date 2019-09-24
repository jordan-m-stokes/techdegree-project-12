import React, {Component} from 'react';

import Card from './pieces/Card';
import Content from '../res/content';

import Thumbnail from "../res/jumbotron-back.jpg";

class Feed extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { width: 0, height: 0 };
    }
      
    componentDidMount()
    {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount()
    {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions()
    {
        const feed = document.querySelector('.feed');
        const cards = feed.querySelectorAll('.card');
        const spacePerCard = 475 /* px */

        let totalColumns = parseInt(window.innerWidth / spacePerCard * .95);
        let columns = document.querySelectorAll('.column');

        if(totalColumns > 4) totalColumns = 4;
        if(totalColumns < 1) totalColumns = 1;

        if(columns.length > 0)
        {
            columns.forEach(column => 
            {
                column.parentNode.removeChild(column);
            });

        }

        console.log(cards[3]);

        columns = [];

        for(let i = 0; i < totalColumns; i++)
        {
            const column = document.createElement('div');

            column.className = 'column';
            column.style.display = 'inline-block';
            column.style.width  = `${475}px`;

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
                <Card thumbnail={Thumbnail} title="How to Best Learn Spanish" content={`${Content} ${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Deber, Must, Should or to Owe?" content={`${Content}`}/>
                <Card thumbnail={Thumbnail} title="Learning Language with Music" content={`${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Using Duolingo Effectively" content={`${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Learning Many-Meaning Words" content={`${Content} ${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Spanish, Half-Textbook Half-Speak-It" content={`${Content}`}/><Card thumbnail={Thumbnail} title="How to Best Learn Spanish" content={`${Content} ${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Deber, Must, Should or to Owe?" content={`${Content}`}/>
                <Card thumbnail={Thumbnail} title="Learning Language with Music" content={`${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Using Duolingo Effectively" content={`${Content}`}/>
                <Card thumbnail={Thumbnail} title="Learning Many-Meaning Words" content={`${Content} ${Content} ${Content}`}/>
                <Card thumbnail={Thumbnail} title="Spanish, Half-Textbook Half-Speak-It" content={`${Content} ${Content}`}/>
            </div>
		);
	}
}

export default Feed;