import { INFOMATION, PACKAGE_INFO } from './enum';

export const Producer = {
    id: String,
    infomation: INFOMATION
}

export const Farmer = {
    id: String,
    infomation: INFOMATION
}

export const Employee = {
    id: String,
    infomation: INFOMATION
}

export const Deliver = {
    id: String,
    infomation: INFOMATION
}

export const Manufacturer = {
    id: String,
    infomation: INFOMATION,
    phytosanitaryNumber: String // mã kiểm dịch
}

export const Retailer = {
    id: String,
    infomation: INFOMATION,
}

export const Storage = {
    id: String,
    infomation: INFOMATION
}
export const Certificate = {
    id: String,
    infomation: INFOMATION
}

export const Package = {
    id: String,
    productID: String,
    farmerID: String,
    producerID: String,
    package_Producer: PACKAGE_INFO,
    manufacturerID: String,
    package_Manufacturer: PACKAGE_INFO,
    storageID: String,
    package_Storage: PACKAGE_INFO,
    deliverID: String,
    package_Deliver: PACKAGE_INFO,
    certificateID: Array,
}

export const Product = {
    id: String,
    name: String,
    type: String,
    packType: String, // loại đóng gói
    weight: String,
    mfgDate: Number, //ngày xs
    expDate: Number, // hạn sử dụng
    origin: String,
    description: String
}