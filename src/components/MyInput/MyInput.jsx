import React from 'react';
import classes from './MyInput.module.css';

const MyInput = ({onChange, placeholder}) => {
    return (
        <input  className={classes.my__input} onChange={onChange} placeholder={placeholder}/>
    );
};

export default MyInput;

