import React, { useState } from "react";
import "@/pages/supplier/Supplier.css";

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

const SupplierPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie = {
      title,
      description,
      postUrl,
      releaseDate,
      price,
      director,
      tags: selectedTags,
    };
    console.log(newMovie);
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
        <h2>Ajouter un Nouveau Film</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titre:</label>
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
          <label htmlFor="postUrl">Post URL:</label>
          <input
            id="postUrl"
            type="url"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            required
          />
          <label htmlFor="releaseDate">Sorti le:</label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
          <label htmlFor="price">Prix:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="director">Directeur:</label>
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
