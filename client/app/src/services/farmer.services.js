import axios from 'axios';
import { authHeader } from '_helpers/auth-header';
export const farmerService = {
  createSeason,
  getSeason,
  getAllSeason,
  editSeason,
  deleteSeason,
  createAction,
  getAllAction
};
//------------Season-----------------------------------------------------------------------//
// create a season
async function createSeason(season) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/season`,
      {
        name: season.name,
        sowingDate: season.sowingDate,
        harvestDate: season.harvestDate,
        productId: season.productId
      },
      {
        headers: authHeader()
      }
    );

    return respone.data.seasons;
  } catch (error) {
    throw error;
  }
}
// edit season
async function editSeason(seasonId, season) {
  try {
    console.log(season);

    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/season/${seasonId}`,
      {
        name: season.name,
        sowingDate: season.sowingDate,
        harvestDate: season.harvestDate,
        productId: season.productId
      },
      {
        headers: authHeader()
      }
    );
    console.log(respone);

    return respone.seasons;
  } catch (error) {
    throw error;
  }
}

async function deleteSeason(seasonId) {
  try {
    let respone = await axios.delete(`${process.env.REACT_APP_API_BACKEND}/season/${seasonId}`, {
      headers: authHeader()
    });

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
// get a season by Id
async function getSeason(seasonId) {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/info/season/${seasonId}`, {
      headers: authHeader()
    });
    return respone.data.result;
  } catch (error) {
    throw error;
  }
}

// get all seasons
async function getAllSeason() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/season`, {
      headers: authHeader()
    });

    return respone.data.seasons;
  } catch (error) {
    throw error;
  }
}
//-----------------------------------------------------Season-------------------------------------------//

async function createAction(action) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/action`,

      {
        imgUrl: action.imgUrl,
        action: action.action,
        time: action.time,
        description: action.description,
        seasonId: action.seasonId
      },
      {
        headers: authHeader()
      }
    );
    return respone.data.action;
  } catch (error) {
    throw error;
  }
}

async function getAllAction(seasonId) {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/info/actions/${seasonId}`, {
      headers: authHeader()
    });

    return respone.data.actions;
  } catch (error) {
    throw error;
  }
}
