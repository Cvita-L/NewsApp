import './NavigationBar.scss';

import homeSvg from '../../assets/Home.svg';
import generalSvg from '../../assets/General.svg';
import businessSvg from '../../assets/Business.svg';
import healthSvg from '../../assets/Health.svg';
import scienceSvg from '../../assets/Science.svg';
import sportsSvg from '../../assets/Sports.svg';
import technologySvg from '../../assets/Technology.svg';

import Button from './Button';

const navigButtons = [
    {
        text: 'Home',
        img: homeSvg
    }, {
        text: 'General',
        img: generalSvg
    }, {
        text: 'Business',
        img: businessSvg
    }, {
        text: 'Health',
        img: healthSvg
    }, {
        text: 'Science',
        img: scienceSvg

    }, {
        text: 'Sports',
        img: sportsSvg
    }, {
        text: 'Technology',
        img: technologySvg
    }
];

const NavigationBar = ({ onClick }) => {
    return <div className='navigation-div'>
        {navigButtons.map(button => 
            <Button 
                key={button.text}
                category={button.text}
                img={button.img}
                onButtonClick={onClick}
            />
        )}
    </div>
}

export default NavigationBar;