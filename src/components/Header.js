import React, {Component} from 'react';

class Header extends Component
{
    static fadeDistance = 10 * 16 /* 10rem */

    componentDidMount()
    {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() 
    {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll()
    {
        const header = document.querySelector('header');

        header.style.opacity = (0 + ((Header.fadeDistance - window.scrollY) / Header.fadeDistance));
    }

	render()
	{
		return (
			<header className="container fixed-top mx-auto text-center">
                <h1 className="">Clarity Spanish</h1>
                <h2 className="text-muted">Español Hecho Claro</h2>
            </header>
		);
	}
}

export default Header;