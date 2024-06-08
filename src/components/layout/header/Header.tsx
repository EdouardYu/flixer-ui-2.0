import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/flixer_logo.jpg";
import userImage from "@/assets/user.png";
import AuthService from "@/services/AuthService";

const tags = [
  "THRILLER",
  "ACTION",
  "CRIME",
  "DRAMA",
  "ROMANCE",
  "WAR",
  "ANIMATION",
  "ADVENTURE",
  "MYSTERY",
  "SCIENCE_FICTION",
  "TV_MOVIE",
  "HORROR",
  "HISTORY",
  "COMEDY",
  "DOCUMENTARY",
  "FANTASY",
  "WESTERN",
  "FAMILY",
  "MUSIC",
];

const getUserDetails = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (e) {
    localStorage.removeItem("authToken");
    return null;
  }
};

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserDetails();
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      navigate("/");
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  const handleTagChange = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
  };

  const handleApplyTags = () => {
    setShowTagDropdown(false);
    if (selectedTags.length > 0) {
      navigate(`/tags?tag=${selectedTags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await AuthService.signout();
    localStorage.removeItem("authToken");
    setShowDropdown(false);
    navigate("/authentication/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
      <div className="tag-dropdown">
        <button onClick={() => setShowTagDropdown(!showTagDropdown)}>
          {selectedTags.length > 0
            ? `${selectedTags[0]}${selectedTags.length > 1 ? ` +${selectedTags.length - 1}` : ""}`
            : "FIND MOVIES BY GENRES"}
        </button>
        {showTagDropdown && (
          <div className="dropdown-menu">
            <ul>
              <li key="all" onClick={() => setSelectedTags([])}>
                <input
                  type="checkbox"
                  checked={selectedTags.length === 0}
                  onChange={() => setSelectedTags([])}
                />
                All Movies
              </li>
              {tags.map((tag) => (
                <li key={tag}>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </li>
              ))}
            </ul>
            <button onClick={handleApplyTags}>Apply</button>
          </div>
        )}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/films">Films</Link>
          </li>
          <li>
            <Link to="/documentary">Documentary</Link>
          </li>
          <li>
            <Link to="/anime">Anime</Link>
          </li>
        </ul>
      </nav>
      <div className="buttons">
        {userRole === "SUPPLIER" && (
          <button
            className="supplier-button"
            onClick={() => navigate("/supplier")}
          >
            ADD A MOVIE
          </button>
        )}
        <button
          className="account-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={userImage} alt="Account" />
        </button>
        {showDropdown && (
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to="/profile">Your user profile</Link>
              </li>
              <li>
                <Link to="/movie-history">Your Movies</Link>
              </li>
              <li>
                <Link to="/authentication/login" onClick={handleLogout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
