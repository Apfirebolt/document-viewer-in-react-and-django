import axios from 'axios';

let baseURL = 'http://localhost:8000/api/';

const httpClient = axios.create({ baseURL });

export default httpClient;