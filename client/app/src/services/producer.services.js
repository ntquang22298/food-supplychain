import axios from 'axios';

export const producerService = {
    createFarmer,
    getFarmer,
    getAllFarmer
}

// create a farmer
async function getFarmer(farmer) {
    try {
        let respone = axios.post(`${process.env.REACT_APP_API_BACKEND}/farmer`, {
            information: farmer.information
        });

        return respone.farmers;
    } catch (error) {
        throw (error);
    }

}

// get a farmer by Id
async function getFarmer(farmerId) {
    try {
        let respone = axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer/${farmerId}`);

        return respone.farmers;
    } catch (error) {
        throw (error);
    }

}

// get all farmers
async function getAllFarmer() {
    try {
        let respone = axios.get(`${process.env.REACT_APP_API_BACKEND}/farmer`);

        return respone.farmers;
    } catch (error) {
        throw (error);
    }

}