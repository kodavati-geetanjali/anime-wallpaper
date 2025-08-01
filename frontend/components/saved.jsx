// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import WallpaperCard from "../components/wallpaper";
import "../css/saved.css";

const Favorites = () => {
  const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Loaded favorites:", storedFavorites); 
    setFavoriteWallpapers(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
      <h1 className="favorites-heading">Your Favorite Wallpapers</h1>
      <div className="wallpapers-container">
        {favoriteWallpapers.length > 0 ? (
          favoriteWallpapers.map((item, index) => (
            <WallpaperCard key={index} thumb={item.thumb} full={item.full} />
          ))
        ) : (
          <p>No favorites yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
