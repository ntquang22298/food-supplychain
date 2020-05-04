import axios from 'axios';
import { authHeader } from '_helpers/auth-header';
export const producerService = {
  createFarmer,
  getFarmer,
  getAllFarmer,
  editFarmer,
  deleteFarmer
};

// create a farmer
async function createFarmer(farmer) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/farmer`,
      {
        username: farmer.username,
        name: farmer.name,
        address: farmer.address,
        description: farmer.description,
        imageUrl: farmer.imageUrl
      },
      {
        headers: authHeader()
      }
    );
    console.log(respone);

    return respone.data.farmers;
  } catch (error) {
    throw error;
  }
}

async function editFarmer(farmerId, farmer) {
  try {
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/farmer/${farmerId}`,
      {
        name: farmer.name,
        address: farmer.address,
        description: farmer.description,
        imageUrl: farmer.imageUrl
      },
      {
        headers: authHeader()
      }
    );
    console.log(respone);

    return respone.farmers;
  } catch (error) {
    throw error;
  }
}

async function deleteFarmer(farmerId) {
  try {
    let respone = await axios.delete(`${process.env.REACT_APP_API_BACKEND}/farmer/${farmerId}`, {
      headers: authHeader()
    });

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
// get a farmer by Id
async function getFarmer(farmerId) {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer/${farmerId}`, {
      headers: authHeader()
    });
    console.log(respone);

    return respone.farmers;
  } catch (error) {
    throw error;
  }
}

// get all farmers
async function getAllFarmer() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer`, {
      headers: authHeader()
    });

    return respone.data.farmers;
  } catch (error) {
    throw error;
  }
}
