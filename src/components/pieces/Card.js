import React from 'react';

function formatDate(date)
{
    const months = 
    {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }

    const month = months[parseInt(date.split('-')[1])];
    const day = date.split('-')[2].split('T')[0];
    const year = date.split('-')[0];

    return `${month} ${day}, ${year}`;
}

const Card = props => 
{
    const publishedFormatted = formatDate(props.published);

    return (<div id={'card-' + props.id} className="card bg-white">
        <img className="card-img-top" src={props.thumbnail} alt="" />
        <div className="card-body text-center">
            <div className="published">
                <p className="date">{publishedFormatted}</p>
            </div>
            <h4 className="mt-4 mx-2 mb-2">{props.title}</h4>
            <p className="card-text text-muted p-4">{props.lead}</p>
        </div>
    </div>);
};

export default Card;