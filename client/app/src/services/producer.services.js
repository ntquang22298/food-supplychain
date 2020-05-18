import axios from 'axios';
import { authHeader } from '_helpers/auth-header';
export const producerService = {
  createFarmer,
  getFarmer,
  getAllFarmer,
  editFarmer,
  deleteFarmer,
  createProduct,
  editProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  getAllProductByFarmer
};
//------------Farmer-----------------------------------------------------------------------//
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

    return respone.data.farmers;
  } catch (error) {
    throw error;
  }
}
// edit farmer
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
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/info/farmer/${farmerId}`, {
      headers: authHeader()
    });
    return respone.data.farmer;
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
    console.log(respone);

    return respone.data.farmers;
  } catch (error) {
    throw error;
  }
}
//-----------------------------------------------------Farmer-------------------------------------------//

//-----------------------------------------------------Product------------------------------------------//
//create product
async function createProduct(product) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/product`,
      {
        imageUrl: product.imageUrl,
        name: product.name,
        type: product.type,
        origin: product.origin,
        description: product.description
      },
      {
        headers: authHeader()
      }
    );
    return respone;
  } catch (error) {
    throw error;
  }
}

async function editProduct(productId, product) {
  try {
    let respone = await axios.put(
      `${process.env.REACT_APP_API_BACKEND}/product/${productId}`,
      {
        imageUrl: product.imageUrl,
        name: product.name,
        type: product.type,
        origin: product.origin,
        description: product.description
      },
      {
        headers: authHeader()
      }
    );
    return respone;
  } catch (error) {
    throw error;
  }
}
async function getAllProduct() {
  try {
    let respone = await axios.get(`${process.env.REACT_APP_API_BACKEND}/product`, {
      headers: authHeader()
    });

    return respone.data.products;
  } catch (error) {
    throw error;
  }
}
async function getProduct(productId) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/info/product/${productId}`,
      {
        headers: authHeader()
      }
    );

    return respone.data.product;
  } catch (error) {
    throw error;
  }
}
async function deleteProduct(productId) {
  try {
    let respone = await axios.delete(`${process.env.REACT_APP_API_BACKEND}/farmer/${productId}`, {
      headers: authHeader()
    });

    return respone;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

async function getAllProductByFarmer(farmerUsername) {
  try {
    let respone = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/product/farmer/${farmerUsername}`,
      {
        headers: authHeader()
      }
    );

    return respone.data.products;
  } catch (error) {
    throw error;
  }
}
