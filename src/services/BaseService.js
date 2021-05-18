/* eslint-disable no-prototype-builtins */
import axios from "axios";

export default class BaseService {

  constructor(responseTypeFile = false) {
    this.baseURL = process.env.BASE_URL;

    this.api = axios.create({
      baseURL: this.baseURL,
      responseType: responseTypeFile ? "arraybuffer" : "json",
    });
  }


  async get(url) {
    try {
      const results = await this.api.get(url);
      return this.handleResponse < T > (results);
    } catch (error) {
      this.handleRequestError(error.response);
      return new Promise((_, rej) => {
        rej(error.response);
      });
    }
  }

  async getPaginated(url) {
    try {
      const results = await this.api.get(url);
      const APIResponse = this.handleResponse(results);
      const headers = this.handleHeaders(results);
      const pagination = JSON.parse(headers.pagination || "");

      return {
        items: APIResponse,
        pagination,
      };


    } catch (error) {
      this.handleRequestError(error.response);
      return new Promise((_, rej) => {
        rej(error.response);
      });
    }
  }

  async delete(url, params) {
    try {
      const results = await this.api.delete(url, { data: params });
      return this.handleResponse(results);
    } catch (error) {
      this.handleRequestError(error.response);
      return new Promise((_, rej) => {
        rej(error.response);
      });
    }
  }

  async put(url, params) {
    try {
      const results = await this.api.put(url, params);
      return this.handleResponse(results);
    } catch (error) {
      this.handleRequestError(error.response);
      return new Promise((_, rej) => {
        rej(error.response);
      });
    }
  }

  async post(url, params) {
    try {
      const results = await this.api.post(url, params);

      return this.handleResponse(results);
    } catch (error) {
      this.handleRequestError(error.response);
      return new Promise((_, rej) => {
        rej(error.response);
      });
    }
  }

  handleResponse(APIResponse) {
    return APIResponse.data;
  }

  handleHeaders(APIResponse) {
    return APIResponse.headers;
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequestError(APIResponse) {
    // eslint-disable-next-line no-console
    console.warn("BaseService -> handleRequestError ->", APIResponse);


    return Promise.reject(APIResponse);
  }
}
