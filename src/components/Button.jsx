import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button 
            onClick={props.onClicked}
            style={{backgroundColor: props.color}}
            className='btn'
        >
            {props.text}
        </button>
    );
};

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClicked: PropTypes.func,
}

export default Button;