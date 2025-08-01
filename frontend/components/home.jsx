import React, { useEffect, useState } from "react";
import axios from "axios";
import WallpaperCard from "./wallpaper";
import "../css/Home.css";

const Home = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchWallpapers = async (pageNumber) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/home?page=${pageNumber}`);
      setWallpapers(res.data);
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
    }
  };

  useEffect(() => {
    fetchWallpapers(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <div className="home-container">
      <div className="wallpaper-grid">
        {Array.isArray(wallpapers) &&
          wallpapers.map((item, index) => (
            <WallpaperCard key={index} thumb={item.thumb} full={item.full} />
          ))}
      </div>
      <div className="pagination-container">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="pagination-button"
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="page-number">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
