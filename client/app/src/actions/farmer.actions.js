import { farmerService } from 'services/farmer.services.js';
import { toast } from 'react-toastify';

export const farmer = {
  CEATE_SEASON: 'CREATE_SEASON',
  GET_ALL_SEASON: 'GET_ALL_SEASON',
  GET_SEASON: 'GET_SEASON',
  EDIT_SEASON: 'EDIT_SEASON',
  DELETE_SEASON: 'DELETE_SEASON'
};
// start Season
export const createSeason = (season) => async (dispatch) => {
  try {
    let res = await farmerService.createSeason(season);
    dispatch({
      type: farmer.CEATE_SEASON,
      farmer: res
    });
    toast.success('Season created successfully!');

    dispatch(getAllSeason());
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
      farmer: res
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
      seasonList: res
    });
  } catch (error) {
    console.log('Can not get all season');
  }
};

// export const getSeason = (id) => async (dispatch) => {
//   try {
//     let res = await farmerService.getSeason(id);
//     dispatch({
//       type: farmer.GET_SEASON,
//       farmer: res
//     });
//   } catch (error) {
//     console.log('get farmer error');
//   }
// };
//end Season
