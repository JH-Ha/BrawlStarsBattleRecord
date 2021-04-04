import axios from "axios";

const baseUrl = "http://brawlstat.xyz";
//const baseUrl = "http://localhost:8080";

let getData = (paramUrl) => {
    let url = baseUrl + paramUrl;

    return axios.get(url);
}

export { getData };