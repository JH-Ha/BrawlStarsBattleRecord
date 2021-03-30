import axios from "axios";

const baseUrl = "http://brawlstat.xyz:8080";
//const baseUrl = "http://localhost:8080";

let getData = (paramUrl) => {
    let url = baseUrl + paramUrl;

    return axios.get(url);
}

export { getData };