import React, { useState, useEffect } from "react";
import { FaHeart, FaDownload } from "react-icons/fa";

const WallpaperCard = ({ thumb, full }) => {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorited = storedFavorites.some(item => item.full === full);
    setLiked(isFavorited);
  }, [full]);

  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (liked) {
      storedFavorites = storedFavorites.filter(item => item.full !== full);
    } else {
      storedFavorites.push({ thumb, full });
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setLiked(!liked);
  };

  const handleDownload = async () => {
    const image = await fetch(full);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "wallpaper.jpg";
    link.click();
  };

  return (
    <>
      <div className="wallpaper-card">
        <img
          src={thumb}
          alt="Wallpaper"
          className="wallpaper-image"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
          loading="lazy"
          data-retries="0"
          onError={(e) => {
            const target = e.target;
            const retries = target.getAttribute("data-retries") || 0;

            if (retries < 3) {
              setTimeout(() => {
                target.src = thumb + `?retry=${Date.now()}`;
                target.setAttribute("data-retries", Number(retries) + 1);
              }, 1000);
            } else {
              target.src = "https://placehold.co/300x200?text=Image+Error";
            }
          }}
        />
        <div className="icon-bar">
          <FaHeart
            className={`icon heart ${liked ? "liked" : ""}`}
            onClick={toggleFavorite}
          />
          <FaDownload className="icon" onClick={handleDownload} />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={full} alt="Enlarged" className="modal-img" />
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WallpaperCard;
