import * as actions from 'actions/producer.actions.js';

const initialState = {
    farmer: null,
    listFarmer: [],
}

const ProducerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.producer.CREATE_FARMER:
            return {
                ...state,
                farmer: action.farmer
            }
        default:
            return state
    }
}

export default ProducerReducer