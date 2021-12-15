import axios from "axios";
import {API_URL} from './../app.config'

const myAxios = axios.create({
  baseURL: API_URL
});

export default myAxios;
