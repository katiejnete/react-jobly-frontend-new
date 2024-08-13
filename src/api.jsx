import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

  static setToken(token) {
    this.token = token;
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async loginUser(formData) {
    let res = await this.request("auth/token", formData, "post");
    this.setToken(res["token"]);
    return res["token"];
  }

  static async registerUser(formData) {
    let res = await this.request("auth/register", formData, "post");
    this.setToken(res["token"]);
    return res["token"];
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res["user"];
  }

  static async patchUser(username, formData, token) {
    this.setToken(token);
    console.log(this.token);
    let res = await this.request(`users/${username}`,formData,"patch");
    return res["user"];
  }

  static async applyJob(username, jobId, token) {
    this.setToken(token);
    await this.request(`users/${username}/jobs/${jobId}`,{},"post");
    return;
  }

  static async getCompanyJobs(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company["jobs"];
  }

  static async getItems(itemType, data = {}) {
    let res = await this.request(`${itemType}/`, data);
    if (res[itemType]) return res[itemType];
    return;
  }
}

export default JoblyApi;
