import React, { useEffect, useState } from "react";
import teams from "./teams.json";
import SearchService from "../../../sevices/search.service";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import magnifier from "../../../images/magnifier.png";
import { useNavigate } from "react-router-dom";
import Chart from "../../Chart/chart-component";
import "./playerList-component.css";

const PlayerListComponent = ({ currentPlayer, setcurrentPlayer }) => {
  const [selectedTeam, setSelectedTeam] = useState("ALL"); // 用於儲存選取中的隊伍
  const [playerName, setPlayerName] = useState(""); // 儲存輸入的球員名稱
  const [searchResult, setSearchRseult] = useState([]); //存放搜尋結果
  const [players, setPlayers] = useState([]); // 存放目前顯示的球員資料
  const [page, setPage] = useState(1); //儲存頁數

  const [show, setShow] = useState(false); //設定目前 Show charts 按鈕狀態

  const [totalItems, setTotalItems] = useState("0"); //取得當前搜尋結果的數量，用於生成page bar

  const [sortConfig, setSortConfig] = useState({
    key: "points_per_game",
    direction: "desc",
  }); // 設定當前排序參數， 預設是根據分數由大到小排列

  const navigate = useNavigate();

  //紀錄當前儲存隊伍
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  //紀錄當前儲存隊員名稱
  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  //處理搜尋
  const handleSearch = () => {
    SearchService.searchData(selectedTeam, playerName, page)
      .then((data) => {
        // 處理返回的搜尋結果
        console.log("搜尋結果:", data.data);
        if (data.data.length > 0) {
          setSearchRseult(data.data);
        } else {
          setSearchRseult([]);
        }
      })
      .catch((error) => {
        console.error("搜尋時發生錯誤:", error);
      });
  };

  //回傳當前搜尋結果的總數量
  const handleTotalItemSearch = () => {
    console.log("執行Total item search");
    SearchService.searchTotalItem(selectedTeam, playerName)
      .then((data) => {
        // 處理返回的搜尋結果
        console.log("搜尋總數量結果:", data.data[0].TotalItems);
        setTotalItems(Number(data.data[0].TotalItems));
      })
      .catch((error) => {
        console.error("搜尋時發生錯誤:", error);
      });
  };

  //當playerlist-component第一次render時會自動按照預設方式搜尋
  useEffect(() => {
    handleSearch();
    handleTotalItemSearch();
  }, []);

  //change page時候重新搜尋
  useEffect(() => {
    handleSearch();
  }, [page]);

  // 當 players 或 sortConfig 改變時，自動執行排序
  useEffect(() => {
    if (searchResult.length > 0) {
      const sortedPlayers = [...searchResult].sort((a, b) => {
        if (Number(a[sortConfig.key]) < Number(b[sortConfig.key]))
          return sortConfig.direction === "asc" ? -1 : 1;
        if (Number(a[sortConfig.key]) > Number(b[sortConfig.key]))
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      setPlayers(sortedPlayers); // 排序後再更新 players 狀態
    } else {
      setPlayers([]);
    }
  }, [searchResult, sortConfig]); // 監聽 players 和 sortConfig 的變化

  // 排序資料
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction }); // 更新排序條件
  };

  return (
    <div className="playerlist">
      <div className="upperarea">
        <div className="searchTable">
          <div className="searchTable-upper">
            <div
              className="form-group"
              style={{
                flex: "1 1 0",
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <label htmlFor="Teamname" style={{ paddingRight: "1rem" }}>
                Team:
              </label>
              <select
                className="form-control"
                id="Teamname"
                value={selectedTeam}
                onChange={handleTeamChange}
              >
                <option value="">ALL</option>
                {teams.map((team, index) => (
                  <option key={index} value={team.team_name}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="form-group"
              style={{
                flex: "5 1 0",
                display: "flex",
                flexWrap: "nowrap",
                paddingLeft: "2rem",
              }}
            >
              <label htmlFor="playername" className="form-label">
                Keywords:
              </label>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control mb-2"
                  id="playername"
                  onChange={handlePlayerNameChange}
                />
              </div>
            </div>
          </div>
          <div className="searchTable-lower">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                if (page !== 1) {
                  setPage(1);
                } else {
                  handleSearch();
                }
                handleTotalItemSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="showcharts-container">
          <div className="showcharts-item">
            <Chart show={show} setShow={setShow} />
          </div>
        </div>
      </div>
      <div className="sortTable">
        <table className="table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Name</th>
              <th
                className={
                  sortConfig.key === "games_played"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("games_played")}
              >
                Games
              </th>
              <th
                className={
                  sortConfig.key === "points_per_game"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("points_per_game")}
              >
                Points
              </th>
              <th
                className={
                  sortConfig.key === "rebounds_per_game"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("rebounds_per_game")}
              >
                Rebounds
              </th>
              <th
                className={
                  sortConfig.key === "assists_per_game"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("assists_per_game")}
              >
                Assists
              </th>
              <th
                className={
                  sortConfig.key === "steals_per_game"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("steals_per_game")}
              >
                Steals
              </th>
              <th
                className={
                  sortConfig.key === "blocks_per_game"
                    ? sortConfig.direction === "asc"
                      ? "up"
                      : "down"
                    : "default"
                }
                onClick={() => sortData("blocks_per_game")}
              >
                Blocks
              </th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.team_name}</td>
                <td>{player.name}</td>
                <td>{player.games_played}</td>
                <td>{player.points_per_game}</td>
                <td>{player.rebounds_per_game}</td>
                <td>{player.assists_per_game}</td>
                <td>{player.steals_per_game}</td>
                <td>{player.blocks_per_game}</td>
                <td
                  onClick={() => {
                    setcurrentPlayer(player);
                    navigate("/playerdata");
                  }}
                >
                  <img
                    width="50%"
                    height="50%"
                    src={magnifier}
                    alt="magnifier.png"
                  />
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {players.length !== 0 && (
        <div className="pagebar-container">
          <div className="pagebar-item">
            <Pagination
              totalItems={totalItems}
              currentPage={page}
              itemsPerPage={15}
              onPageChange={(pageNumber) => setPage(pageNumber)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerListComponent;
