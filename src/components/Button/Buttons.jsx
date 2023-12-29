import React from 'react';

const Buttons = (props) => {
    return (
        <button {...props} className={'button' + props.className }/>
    );
};

export default Buttons;