import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PlayerList from "./components/Pages/PlayerList/playerList-component";
import SingleplayerComponent from "./components/Pages/SinglePlayer/singleplayer-component";
import React, { useState } from "react";

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
