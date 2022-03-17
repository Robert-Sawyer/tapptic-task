import React from 'react';
import {useSelector} from "react-redux";
import classes from './FinalPage.module.css';

const FinalPage = () => {

    const {message} = useSelector(state => state.sendForm)

    return (
        <>
            <div className={classes.ButtonContainer}>
                <a className={classes.GoBackLink} href='/'>Go back to the form</a>
            </div>
            <div className={classes.EndingInfo}>Status: {message}</div>
        </>
    )
}


export default FinalPage;