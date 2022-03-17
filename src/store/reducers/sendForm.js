import * as actionTypes from '../actions/actionTypes';

const initialState = {
    message: '',
    loading: false,
    isSent: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_FORM_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEND_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message,
                isSent: true,
            };
        case actionTypes.SEND_FORM_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;