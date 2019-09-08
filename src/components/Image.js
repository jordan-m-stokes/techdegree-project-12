import React from 'react';

const Image = props =>
(
  <li>
    <img alt="" src={`https://farm${props.data.farm}.staticflickr.com/${props.data.server}/${props.data.id}_${props.data.secret}.jpg`}/>
  </li>
);

export default Image;