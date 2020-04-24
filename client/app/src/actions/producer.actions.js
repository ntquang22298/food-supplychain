import { producerService } from 'services/producer.services.js';

export const producer = {
  CEATE_FARMER: 'CREATE_FARMER',
  GET_ALL_FARMER: 'GET_ALL_FARMER',
  GET_FARMER: 'GET_FARMER'
};

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
};

export const getAllFarmer = () => async (dispatch) => {
  try {
    let res = await producerService.getAllFarmer();
    dispatch({
      type: producer.GET_ALL_FARMER,
      farmerList: res
    });
  } catch (error) {
    console.log('Can not get all farmer');
  }
};

export const getFarmer = (id) => async (dispatch) => {
  try {
    let res = await producerService.getFarmer(id);
    dispatch({
      type: producer.GET_FARMER,
      farmer: res
    });
  } catch (error) {
    console.log('get farmer error');
  }
};
