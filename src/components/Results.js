import React from 'react';

const Results = (props) => 
(
    <div className="photo-container">
        <ul>
            {props.results}
        </ul>
    </div>
);

export default Results;