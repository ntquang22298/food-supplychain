import { producerService } from 'services/producer.services.js';
import { toast } from 'react-toastify';

export const producer = {
  CEATE_FARMER: 'CREATE_FARMER',
  GET_ALL_FARMER: 'GET_ALL_FARMER',
  GET_FARMER: 'GET_FARMER',
  EDIT_FARMER: 'EDIT_FARMER',
  DELETE_FARMER: 'DELETE_FARMER',
  CREAT_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  GET_PRODUCT: 'GET_PRODUCT',
  GET_ALL_PRODUCT: 'GET_ALL_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  GET_ALL_PRODUCT_BY_FARMER: 'GET_ALL_PRODUCT_BY_FARMER'
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

//start product
export const createProduct = (product) => async (dispatch) => {
  try {
    let res = await producerService.createProduct(product);
    dispatch({
      type: producer.CREAT_PRODUCT,
      product: res
    });
    toast.success('Product created successfully!');
    dispatch(getAllProduct());
  } catch (error) {
    console.log('create product error' + error);
  }
};

export const editProduct = (productId, product) => async (dispatch) => {
  try {
    let res = await producerService.editProduct(productId, product);
    dispatch({
      type: producer.EDIT_PRODUCT,
      product: res
    });
    toast.success('Product has been edited!');
    dispatch(getAllProduct());
  } catch (error) {
    console.log('edit product error' + error);
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
    let res = await producerService.getAllProduct();

    dispatch({
      type: producer.GET_ALL_PRODUCT,
      productList: res
    });
  } catch (e) {
    console.log('get all product error' + e);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    let res = await producerService.deleteProduct(id);

    dispatch({
      type: producer.DELETE_PRODUCT,
      product: res
    });
    dispatch(getAllProduct());
    toast.success('Farmer has been removed');
  } catch (error) {
    console.log('delete farmer error');
  }
};
export const getProduct = (id) => async (dispatch) => {
  try {
    let res = await producerService.getProduct(id);
    dispatch({
      type: producer.GET_PRODUCT,
      product: res
    });
  } catch (error) {
    console.log('get product error');
  }
};

export const getAllProductByFarmer = (farmerUsername) => async (dispatch) => {
  try {
    let res = await producerService.getAllProductByFarmer(farmerUsername);

    dispatch({
      type: producer.GET_ALL_PRODUCT_BY_FARMER,
      productListOfFarmer: res
    });
  } catch (e) {
    console.log('get all product error' + e);
  }
};
