import React from 'react';
import classes from './Input.module.css';

const Input = (
    {
        invalid,
        shouldValidate,
        touched,
        elementType,
        elementConfig,
        changed,
        value,
        label
    }) => {

    let inputElement;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (elementType) {
        case ('input') :
            inputElement = <input
                className={inputClasses.join(" ")}
                {...elementConfig}
                onChange={changed}
                value={value}/>;
            break;
        case ('textarea') :
            inputElement = <textarea
                className={inputClasses.join(" ")}
                {...elementConfig}
                onChange={changed}
                value={value}
                rows={5}/>;
            break;
        default :
            inputElement = <input
                className={inputClasses.join(" ")}
                {...elementConfig}
                value={value}/>
    }

    let validationError = null;
    if (invalid && touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid value.</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;