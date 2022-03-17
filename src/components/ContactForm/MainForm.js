import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import classes from './MainForm.module.css';

const MainForm = () => {

    const initialForm = {
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username (min. 3 characters)',
                label: 'Username',
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password (min. 3 characters)',
                label: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false
        },
        longText: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Some long text (min. 10 characters)',
                label: 'Message',
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 100,
            },
            valid: false,
            touched: false
        },
    }

    const { isSent, loading } = useSelector(state => state.sendForm);
    const dispatch = useDispatch();
    const [mainForm, setMainForm] = useState(initialForm);
    const [formIsValid, setFormIsValid] = useState(false);

    const sendFormHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in mainForm) {
            formData[formElementIdentifier] = mainForm[formElementIdentifier].value;
        }
        const data = {
            formData: formData,
        };

        dispatch(actions.sendForm(data));
        setMainForm(initialForm);
        setFormIsValid(!formIsValid);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedForm = {
            ...mainForm
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.touched = true;

        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        setMainForm(updatedForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in mainForm) {
        formElementsArray.push({
                id: key,
                config: mainForm[key]
            }
        );
    }

    let redirect = null;
    if (isSent) {
        redirect = <Redirect to="/final"/>
    }
    let form = (
        <div>
            <form onSubmit={sendFormHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        label={formElement.config.elementConfig.label}
                    />
                ))}
                <Button btnType="Success" disabled={!formIsValid}>SEND</Button>
            </form>
            {redirect}
        </div>
    );
    if (loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your data:</h4>
            {form}
        </div>
    );
};

export default (ErrorHandler(MainForm, axios));