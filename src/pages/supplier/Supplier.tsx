import React, { useState, useEffect } from "react";
import "@/pages/supplier/Supplier.css";
import SupplierService from "@/services/SupplierService";

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

interface User {
  exp: number;
  id: string;
  role: string;
  username: string;
}

const getUserDetails = (): User | null => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.log("No token found in local storage.");
    return null;
  }

  console.log("Token found:", token);

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Parsed user details:", payload);
    return payload;
  } catch (e) {
    console.error("Failed to parse token:", e);
    localStorage.removeItem("authToken");
    return null;
  }
};

const SupplierPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [supplierId, setSupplierId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(""); 

  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      setSupplierId(userDetails.id);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supplierId) {
      console.error("Supplier ID not found");
      setMessage("Supplier ID not found");
      setIsError(true);
      return;
    }

    const newMovie = {
      title,
      url, 
      description,
      supplierId: parseInt(supplierId, 10), 
      poster_url: postUrl,
      price: parseFloat(price),
      released_at: releaseDate,
      director,
      labelTag: selectedTags,
    };
    
    try {
      const response = await SupplierService.addNewMovie(newMovie);
      console.log("Movie added successfully:", response);
      setMessage("Movie added successfully");
      setIsError(false);
      setTitle("");
      setDescription("");
      setPostUrl("");
      setReleaseDate("");
      setPrice("");
      setDirector("");
      setSelectedTags([]);
      setUrl("");
    } catch (error) {
      console.error("Failed to add movie:", error);
      setMessage("Failed to add movie");
      setIsError(true);
    }
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="supplier-page">
      <div className="supplier-container">
        <h2>Add a movie</h2>
        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <label htmlFor="postUrl">Post URL:</label>
          <input
            id="postUrl"
            type="url"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            required
          />
          <label htmlFor="releaseDate">Released in:</label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="director">Director:</label>
          <input
            id="director"
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
          <label htmlFor="tags">Tags:</label>
          <div className="dropdown">
            <button type="button" className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {dropdownOpen ? "Close Tags" : "Select Tags"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {tags.map((tag) => (
                  <div key={tag} className="dropdown-item" onClick={() => handleTagChange(tag)}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="selected-tags">
            {selectedTags.map((tag) => (
              <div key={tag} className="selected-tag">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="submit-button">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierPage;
