import React from 'react';


const Card = props =>
(
    <div className="card bg-white">
        <img className="card-img-top" src={props.thumbnail} alt="" />
        <div className="card-body text-center">
            <h4 className="mt-3 mx-1 mx-md-2 mb-4">{props.title}</h4>
            <p className="card-text text-muted p-2 p-sm-3 p-lg-4">{props.lead}</p>
        </div>
    </div>
);

export default Card;