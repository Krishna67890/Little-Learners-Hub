import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home/Home.jsx";
import Alphabet from "./Pages/Alphabet/Alphabet.jsx";
import Numbers from "./Pages/Numbers/Numbers.jsx";
import ShapesColors from "./Pages/ShapesColours/ShapesColors.jsx";
import Rhymes from "./Pages/Rhymes/Rhymes.jsx";
import GK from "./Pages/GK/GK.jsx";
import Parents from "./Pages/Parents/Parents.jsx";
import Songs from "./Pages/Songs/Songs.jsx";
import Stories from "./Pages/Stories/Stories.jsx";
import Games from "./Pages/Games/Games.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/shapes-colors" element={<ShapesColors />} />
        <Route path="/rhymes" element={<Rhymes />} />
        <Route path="/gk" element={<GK />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/games" element={<Games />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
