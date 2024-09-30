import React from "react";

const SingleplayerComponent = ({ currentPlayer, setcurrentPlayer }) => {
  const fieldMapping = [
    { key: "name", label: "Name" },
    { key: "team_acronym", label: "Team" },
    { key: "team_name", label: "TeamName" },
    { key: "games_played", label: "Games" },
    { key: "minutes_per_game", label: "MPG" },
    { key: "field_goals_attempted_per_game", label: "FGA" },
    { key: "field_goals_made_per_game", label: "FGM" },
    { key: "field_goal_percentage", label: "FG%" },
    { key: "free_throw_percentage", label: "FT%" },
    { key: "three_point_attempted_per_game", label: "3PA" },
    { key: "three_point_made_per_game", label: "3PM" },
    { key: "three_point_percentage", label: "3PT%" },
    { key: "points_per_game", label: "Points" },
    { key: "offensive_rebounds_per_game", label: "ORebounds" },
    { key: "defensive_rebounds_per_game", label: "DRebounds" },
    { key: "rebounds_per_game", label: "Rebounds" },
    { key: "assists_per_game", label: "Assists" },
    { key: "steals_per_game", label: "Steals" },
    { key: "blocks_per_game", label: "Blocks" },
    { key: "turnovers_per_game", label: "Turnovers" },
    { key: "player_efficiency_rating", label: "Efficiency" },
  ];

  const formatMPG = (mpg) => {
    const [minutes, seconds] = mpg.split(":"); // 使用冒號分隔分鐘和秒
    return `${minutes}:${seconds}`; // 返回正確的 "分鐘:秒" 格式
  };

  return (
    <div style={{ width: "50%" }}>
      <div className="head" style={{ display: "flex" }}>
        <div className="imageContainer">
          <img
            width="100%"
            height="100%"
            src="https://img.icons8.com/material-sharp/48/user-male-circle.png"
            alt="avatar_img"
          />
        </div>
        <h1 style={{ fontWeight: "normal" }}>{currentPlayer.name}</h1>
      </div>
      <hr style={{ border: "1px solid black", marginTop: "0px" }}></hr>
      {fieldMapping.map(({ key, label }) => (
        <p key={key}>
          {label}:{" "}
          {key === "minutes_per_game"
            ? formatMPG(currentPlayer[key])
            : currentPlayer[key]}
        </p>
      ))}
    </div>
  );
};

export default SingleplayerComponent;
