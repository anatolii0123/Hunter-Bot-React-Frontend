import actions from './actions'

const initialState = {
    address: 'first address'
}

export default function (state = initialState, action) {

    switch (action.type) {
        case actions.CHANGE_WALLET:
            console.log('change wallet reducer:', action)
            return {
                ...state,
                address: action.payload
            }
    }

    return state;
}