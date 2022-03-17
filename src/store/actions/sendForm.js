import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const sendFormStart = () => {
    return {
        type: actionTypes.SEND_FORM_START
    };
};

export const sendFormSuccess = (message) => {
    return {
        type: actionTypes.SEND_FORM_SUCCESS,
        message: message,
    };
};

export const sendFormFail = (error) => {
    return {
        type: actionTypes.SEND_FORM_FAIL,
        error: error
    };
};

export const sendForm = (data) => {
    return dispatch => {
        dispatch(sendFormStart());

        axios.post('https://someendpoint.free.beeceptor.com/user', data)
            .then(response => {
                dispatch(sendFormSuccess(response?.data?.status));
            })
            .catch(err => {
                dispatch(sendFormFail(err));
            })
    };
};
