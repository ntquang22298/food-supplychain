import { producerService } from 'services/producer.services.js';
import { toast } from 'react-toastify';

export const producer = {
  CEATE_FARMER: 'CREATE_FARMER',
  GET_ALL_FARMER: 'GET_ALL_FARMER',
  GET_FARMER: 'GET_FARMER',
  GET_FARMER_BY_USERNAME: 'GET_FARMER_BY_USERNAME',
  EDIT_FARMER: 'EDIT_FARMER',
  DELETE_FARMER: 'DELETE_FARMER',
  CREAT_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  GET_PRODUCT: 'GET_PRODUCT',
  GET_ALL_PRODUCT: 'GET_ALL_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  GET_ALL_PRODUCT_BY_FARMER: 'GET_ALL_PRODUCT_BY_FARMER',
};
// start Farmer
export const createFarmer = (farmer) => async (dispatch) => {
  try {
    let res = await producerService.createFarmer(farmer);
    dispatch({
      type: producer.CEATE_FARMER,
      farmer: res.farmers,
    });

    toast.success(res.msg);
    dispatch(getAllFarmer());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const editFarmer = (id, farmer) => async (dispatch) => {
  try {
    let res = await producerService.editFarmer(id, farmer);
    dispatch(getAllFarmer());
    toast.success(res.msg);

    return res;
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const deleteFarmer = (id) => async (dispatch) => {
  try {
    let res = await producerService.deleteFarmer(id);

    dispatch({
      type: producer.DELETE_FARMER,
    });
    dispatch(getAllFarmer());
    toast.success(res.msg);
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getAllFarmer = () => async (dispatch) => {
  try {
    let res = await producerService.getAllFarmer();
    dispatch({
      type: producer.GET_ALL_FARMER,
      farmerList: res.farmers,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getFarmer = (id) => async (dispatch) => {
  try {
    let res = await producerService.getFarmer(id);
    dispatch({
      type: producer.GET_FARMER,
      farmer: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getFarmerByUsername = (username) => async (dispatch) => {
  try {
    let res = await producerService.getFarmerByUsername(username);
    dispatch({
      type: producer.GET_FARMER_BY_USERNAME,
      farmer: res.farmer[0],
    });
    return res;
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
//end Farmer

//start product
export const createProduct = (product) => async (dispatch) => {
  try {
    let res = await producerService.createProduct(product);
    dispatch({
      type: producer.CREAT_PRODUCT,
      product: res.products,
    });
    toast.success(res.msg);

    dispatch(getAllProduct());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const editProduct = (productId, product) => async (dispatch) => {
  try {
    let res = await producerService.editProduct(productId, product);
    dispatch({
      type: producer.EDIT_PRODUCT,
      product: res,
    });
    toast.success(res.msg);
    dispatch(getAllProduct());
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
    let res = await producerService.getAllProduct();

    dispatch({
      type: producer.GET_ALL_PRODUCT,
      productList: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    let res = await producerService.deleteProduct(id);

    dispatch({
      type: producer.DELETE_PRODUCT,
      product: res.data,
    });

    dispatch(getAllProduct());
    toast.success(res.msg);
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const getProduct = (id) => async (dispatch) => {
  try {
    let res = await producerService.getProduct(id);
    dispatch({
      type: producer.GET_PRODUCT,
      product: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};

export const getAllProductByFarmer = (farmerUsername) => async (dispatch) => {
  try {
    let res = await producerService.getAllProductByFarmer(farmerUsername);

    dispatch({
      type: producer.GET_ALL_PRODUCT_BY_FARMER,
      productListOfFarmer: res,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
