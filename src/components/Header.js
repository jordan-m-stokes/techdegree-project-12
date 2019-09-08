import React from 'react';

import LensIcon from '../res/lens-icon';

const Header = () => 
(
    <header>
        <div className="title">
            <LensIcon />
            <h1>The Lens</h1>
        </div>
        <h2 className="slogan">Professional Photo Browsing Experience</h2>
	</header>
);

export default Header;