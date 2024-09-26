import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PlayerList from "./components/playerList-component";
import SingleplayerComponent from "./components/singleplayer-component";
import React, { useEffect, useState } from "react";

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(""); // 用於儲存要聚焦的球員
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PlayerList
                currentPlayer={currentPlayer}
                setcurrentPlayer={setcurrentPlayer}
              />
            }
          />
          <Route
            path="playerdata"
            element={
              <SingleplayerComponent
                currentPlayer={currentPlayer}
                setcurrentPlayer={setcurrentPlayer}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
