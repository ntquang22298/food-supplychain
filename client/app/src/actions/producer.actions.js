import { producerService } from 'services/producer.services.js';
import { toast } from 'react-toastify';

export const producer = {
  CEATE_FARMER: 'CREATE_FARMER',
  GET_ALL_FARMER: 'GET_ALL_FARMER',
  GET_FARMER: 'GET_FARMER',
  EDIT_FARMER: 'EDIT_FARMER',
  DELETE_FARMER: 'DELETE_FARMER'
};
// start Farmer
export const createFarmer = (farmer) => async (dispatch) => {
  try {
    let res = await producerService.createFarmer(farmer);
    dispatch({
      type: producer.CEATE_FARMER,
      farmer: res
    });
    toast.success('Farmer created successfully!');

    dispatch(getAllFarmer());
  } catch (error) {
    console.log('create farmer error');
  }
};
export const editFarmer = (id, farmer) => async (dispatch) => {
  try {
    let res = await producerService.editFarmer(id, farmer);
    dispatch(getAllFarmer());
    toast.success('Farmer has been edited!');

    return res;
  } catch (error) {
    console.log('edit farmer error');
  }
};

export const deleteFarmer = (id) => async (dispatch) => {
  try {
    let res = await producerService.deleteFarmer(id);

    dispatch({
      type: producer.DELETE_FARMER,
      farmer: res
    });
    dispatch(getAllFarmer());
    toast.success('Farmer has been removed');
  } catch (error) {
    console.log('delete farmer error');
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
//end Farmer
