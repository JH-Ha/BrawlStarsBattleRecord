import axios, { AxiosResponse } from "axios";

//const baseUrl = "https://brawlmeta.com:28080";
const baseUrl = "http://127.0.0.1:8080";
//const baseUrl = "http://172.26.16.1:8080";

const getData = (paramUrl: string): Promise<AxiosResponse<any>> => {
    const url = baseUrl + paramUrl;
    return axios.get(url);
}

const postData = (paramUrl: string, data: any): Promise<AxiosResponse<any>> => {
    const url = baseUrl + paramUrl;
    return axios.post(url, data);
}

export { getData, postData };