import axios from "axios";

//const baseUrl = "https://brawlmeta.com:28080";
const baseUrl = "http://127.0.0.1:8080";
//const baseUrl = "http://172.23.64.1:8080";

let getData = (paramUrl) => {
    let url = baseUrl + paramUrl;

    return axios.get(url);
}
let postData = (paramUrl, data) => {
    let url = baseUrl + paramUrl;

    return axios.post(url, data);
}
export { getData, postData };