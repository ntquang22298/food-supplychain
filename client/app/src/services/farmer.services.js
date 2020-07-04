import axios from 'axios';
import { authHeader } from '_helpers/auth-header';
export const farmerService = {
  createSeason,
  getSeason,
  getAllSeason,
  editSeason,
  deleteSeason,
  createAction,
  getAllAction,
  createCertificate,
  getCertificate,
  getAllCertificate,
  editCertificate,
  deleteCertificate,
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
        productId: season.productId,
      },
      {
        headers: authHeader(),
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
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/season/${seasonId}`,
      {
        name: season.name,
        sowingDate: season.sowingDate,
        harvestDate: season.harvestDate,
        productId: season.productId,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.seasons;
  } catch (error) {
    throw error;
  }
}

async function deleteSeason(seasonId) {
  try {
    let respone = await axios.delete(`${process.env.REACT_APP_API_BACKEND}/season/${seasonId}`, {
      headers: authHeader(),
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
      headers: authHeader(),
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
      headers: authHeader(),
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
        seasonId: action.seasonId,
      },
      {
        headers: authHeader(),
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
      headers: authHeader(),
    });

    return respone.data.actions;
  } catch (error) {
    throw error;
  }
}
//----------------------------------------------CERTIFICATE---------------------------------------------------------------------------------
async function createCertificate(certificate) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/certificate`,
      {
        name: certificate.name,
        description: certificate.description,
        imageUrl: certificate.imageUrl,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.data.certificates;
  } catch (error) {
    throw error;
  }
}
// edit certificate
async function editCertificate(certificateId, certificate) {
  try {
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/certificate/${certificateId}`,
      {
        name: certificate.name,
        description: certificate.description,
        imageUrl: certificate.imageUrl,
      },
      {
        headers: authHeader(),
      }
    );

    return respone.certificates;
  } catch (error) {
    throw error;
  }
}

async function deleteCertificate(certificateId) {
  try {
    let respone = await axios.delete(
      `${process.env.REACT_APP_API_BACKEND}/certificate/${certificateId}`,
      {
        headers: authHeader(),
      }
    );

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
// get a certificate by Id
async function getCertificate(username) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/certificate/${username}`,
      {
        headers: authHeader(),
      }
    );
    return respone.data.certificate;
  } catch (error) {
    throw error;
  }
}

// get all certificates
async function getAllCertificate() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/certificate`, {
      headers: authHeader(),
    });

    return respone.data.certificates;
  } catch (error) {
    throw error;
  }
}
