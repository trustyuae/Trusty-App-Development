import axios from 'axios';
import { baseURL } from '../Utils/API';



const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    // auth: {
    //   username: CONSUMER_KEY,
    //   password: CONSUMER_SECRET,
    // },
});



export const getSignatureSelections = async () => {
    const response = await axios.get('https://trustyuae.com/wp-json/signature-selections-api/v1/products')
    console.log("Y0786754789097867564578908986755e789076546789097654789----------------------------------", response.data)
    return response?.data
};
