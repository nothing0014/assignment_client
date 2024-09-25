import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PlayerList from "./components/playerList-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlayerList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
