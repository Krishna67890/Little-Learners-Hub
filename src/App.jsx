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
import FirstStd from "./Pages/FirstStd/FirstStd.jsx";
import SecondStd from "./Pages/SecondStd/SecondStd.jsx";
import ThirdStd from "./Pages/ThirdStd/ThirdStd.jsx";
import AboutUs from "./Pages/About/AboutUs.jsx";
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
        {/* New standard pages */}
        <Route path="/first-std" element={<FirstStd />} />
        <Route path="/second-std" element={<SecondStd />} />
        <Route path="/third-std" element={<ThirdStd />} />
        {/* Add AboutUs route */}
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;