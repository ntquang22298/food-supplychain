import { producerService } from 'services/producer.services.js';

export const producer = {
    CEATE_FARMER: "CREATE_FARMER"
}

export const createFarmer = (farmer) => async (dispatch) => {
    try {
        let res = await producerService.createFarmer(farmer);
        dispatch({
            type: producer.CEATE_FARMER,
            farmer: res
        });
    } catch (error) {
        console.log('create farmer error');
    }
}