import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://burger-builder-93afc.firebaseio.com/'
});

export default instance;