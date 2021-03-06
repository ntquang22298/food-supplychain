import { farmerService } from 'services/farmer.services.js';
import { toast } from 'react-toastify';
import * as producerAction from './producer.actions';
export const farmer = {
  CEATE_SEASON: 'CREATE_SEASON',
  GET_ALL_SEASON: 'GET_ALL_SEASON',
  GET_SEASON: 'GET_SEASON',
  EDIT_SEASON: 'EDIT_SEASON',
  DELETE_SEASON: 'DELETE_SEASON',
  CREATE_ACTION: 'CREATE_ACTION',
  GET_ALL_ACTION: 'GET_ALL_ACTION',
  CEATE_CERTIFICATE: 'CREATE_CERTIFICATE',
  GET_ALL_CERTIFICATE: 'GET_ALL_CERTIFICATE',
  GET_CERTIFICATE: 'GET_CERTIFICATE',
  EDIT_CERTIFICATE: 'EDIT_CERTIFICATE',
  DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
};
// start Season
export const createSeason = (season) => async (dispatch) => {
  try {
    let res = await farmerService.createSeason(season);
    dispatch({
      type: farmer.CEATE_SEASON,
      season: res,
    });
    dispatch(getAllSeason());

    toast.success('Season created successfully!');
  } catch (error) {
    console.log('create season error');
  }
};
export const editSeason = (id, season) => async (dispatch) => {
  try {
    let res = await farmerService.editSeason(id, season);
    dispatch(getAllSeason());
    toast.success('Season has been edited!');

    return res;
  } catch (error) {
    console.log('edit farmer error');
  }
};

export const deleteSeason = (id) => async (dispatch) => {
  try {
    let res = await farmerService.deleteSeason(id);

    dispatch({
      type: farmer.DELETE_SEASON,
      season: res,
    });
    dispatch(getAllSeason());
    toast.success('Season has been removed');
  } catch (error) {
    console.log('delete farmer error');
  }
};
export const getAllSeason = () => async (dispatch) => {
  try {
    let res = await farmerService.getAllSeason();
    dispatch({
      type: farmer.GET_ALL_SEASON,
      seasonList: res,
    });
  } catch (error) {
    console.log('Can not get all season');
  }
};

export const getSeason = (id) => async (dispatch) => {
  try {
    let res = await farmerService.getSeason(id);
    dispatch({
      type: farmer.GET_SEASON,
      season: res,
    });
    dispatch(producerAction.getProduct(res.productId));
    dispatch(getAllAction(res.id));
    return res;
  } catch (error) {
    console.log('get season error');
  }
};
//end Season

//start Action

export const createAction = (action) => async (dispatch) => {
  try {
    let res = await farmerService.createAction(action);
    dispatch({
      type: farmer.CREATE_ACTION,
      action: res,
    });
    dispatch(getAllAction(action.seasonId));
    // dispatch(getAllAction(action.seasonId));
  } catch (error) {
    console.log(error);
  }
};
export const getAllAction = (seasonId) => async (dispatch) => {
  try {
    let res = await farmerService.getAllAction(seasonId);

    dispatch({
      type: farmer.GET_ALL_ACTION,
      actionList: res,
    });
  } catch (error) {
    console.log(error);
  }
};

//certificate
export const createCertificate = (certificate) => async (dispatch) => {
  try {
    let res = await farmerService.createCertificate(certificate);
    dispatch({
      type: farmer.CEATE_CERTIFICATE,
      certificate: res,
    });
    dispatch(getAllCertificate());

    toast.success('Certificate created successfully!');
  } catch (error) {
    console.log('create certificate error');
  }
};
export const editCertificate = (id, certificate) => async (dispatch) => {
  try {
    let res = await farmerService.editCertificate(id, certificate);
    dispatch(getAllCertificate());
    toast.success('Certificate has been edited!');

    return res;
  } catch (error) {
    console.log('edit farmer error');
  }
};

export const deleteCertificate = (id) => async (dispatch) => {
  try {
    let res = await farmerService.deleteCertificate(id);

    dispatch({
      type: farmer.DELETE_CERTIFICATE,
      certificate: res,
    });
    dispatch(getAllCertificate());
    toast.success('Certificate has been removed');
  } catch (error) {
    console.log('delete farmer error');
  }
};
export const getAllCertificate = () => async (dispatch) => {
  try {
    let res = await farmerService.getAllCertificate();
    dispatch({
      type: farmer.GET_ALL_CERTIFICATE,
      certificateList: res,
    });
  } catch (error) {
    console.log('Can not get all certificate');
  }
};
export const getCertificate = (username) => async (dispatch) => {
  try {
    let res = await farmerService.getCertificate(username);
    dispatch({
      type: farmer.GET_CERTIFICATE,
      certificate: res,
    });
    return res;
  } catch (error) {
    console.log('Can not get all certificate');
  }
};
