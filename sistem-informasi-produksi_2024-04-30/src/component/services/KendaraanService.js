import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:5255/api/kendaraan';

export const getKendaraan = () => axios.get(REST_API_BASE_URL + '/getDataKendaraan');