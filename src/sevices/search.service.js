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

  searchTeam15() {
    let query = API_URL + "/team15";
    return axios.get(query);
  }
}

export default new SearchService();
