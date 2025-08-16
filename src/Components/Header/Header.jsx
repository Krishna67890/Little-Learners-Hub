// src/components/Header/Header.jsx
import Navigation from "../../Navigation/Navigation.jsx";
import AgeGroupSelector from "../AgeGroupSelector/AgeGroupSelector.jsx";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Little Learners</div>
      <Navigation />
      <AgeGroupSelector />
    </header>
  );
};

export default Header;