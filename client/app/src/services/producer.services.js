import axios from 'axios';

export const producerService = {
  createFarmer,
  getFarmer,
  getAllFarmer
};

// create a farmer
async function createFarmer(farmer) {
  try {
    let respone = await axios.post(`${process.env.REACT_APP_API_BACKEND}/farmer`, {
      information: farmer.information
    });

    return respone.farmers;
  } catch (error) {
    throw error;
  }
}

// get a farmer by Id
async function getFarmer(farmerId) {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer/${farmerId}`);
    console.log(respone);

    return respone.farmers;
  } catch (error) {
    throw error;
  }
}

// get all farmers
async function getAllFarmer() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer`);

    return respone.data.farmers;
  } catch (error) {
    throw error;
  }
}
