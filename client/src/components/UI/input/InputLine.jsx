import React from 'react';
import classes from "./input.module.css"
const InputLine = (props) => {
    return (
        <input className={classes.inputLine} {...props}/>
    );
};

export default InputLine;