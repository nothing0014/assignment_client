import axios from "axios";
const API_URL = "http://localhost:9999/playerdata";

class SearchService {
  searchData(teamname, playername, page) {
    let query = API_URL;

    query += `?page=${page}`;

    if (teamname && teamname !== "ALL") {
      query += `&teamname=${teamname}`;
    }
    if (playername) {
      query += `&playername=${playername}`;
    }

    return axios.get(query);
  }

  searchTotalItem(teamname, playername) {
    let query = API_URL + "/totalItems";

    if (teamname || playername) {
      query += "?1=1";
    }

    if (teamname && teamname !== "ALL") {
      query += `&teamname=${teamname}`;
    }
    if (playername) {
      query += `&playername=${playername}`;
    }

    return axios.get(query);
  }
  // login(email, password) {
  //   return axios.post(API_URL + "/login", {
  //     email,
  //     password,
  //   });
  // }
  // logout() {
  //   localStorage.removeItem("user");
  // }
  // register(username, email, password, role) {
  //   return axios.post(API_URL + "/register", {
  //     username,
  //     email,
  //     password,
  //     role,
  //   });
  // }

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }
}

export default new SearchService();
