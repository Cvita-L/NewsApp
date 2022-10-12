import { useState } from 'react';

import './NavigationBar.scss';

const Button = ({ category, img, onButtonClick }) => {
    const [active, setActive] = useState(false);

    const onClick = () => {
        setActive(active => !active);
        onButtonClick(category);
    }

    return (
        <button 
            className={active ? 'navigation-button-active' : 'navigation-button'} 
            onClick={onClick}>
                <img 
                    className='navigation-img' 
                    src={img} 
                    alt=''
                />
            {category}
        </button>
    )
}

export default Button;