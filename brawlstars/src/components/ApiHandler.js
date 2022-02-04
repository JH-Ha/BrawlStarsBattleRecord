import axios from "axios";

const baseUrl = "https://brawlstat.xyz";
//const baseUrl = "http://localhost:8080";

let getData = (paramUrl) => {
    let url = baseUrl + paramUrl;

    return axios.get(url);
}
let postData = (paramUrl, data) => {
    let url = baseUrl + paramUrl;

    return axios.post(url, data);
}
export { getData, postData };