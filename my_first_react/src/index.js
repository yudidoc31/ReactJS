import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const selectedVideoRef = useRef(null);
  const [error, setError] = useState("");

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!term) {
      setError("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: term,
          part: "snippet",
          maxResults: 5,
          key: "AIzaSyDagukz8dXEFrWS1Ffp9stBL63xUT_ARiM"
        }
      });

      setVideos(response.data.items);
      setSelectedVideo(null);
      setError("");
    } catch (error) {
      console.error("Error fetching videos:", error.message);
      setError("An error occurred while fetching videos. Please try again later.");
    }
  };

  const handleOnClick = (selectedVideo) => {
    setSelectedVideo(selectedVideo);
  };

  const renderVideos = () => {
    if (videos.length === 0) {
      return <p>No videos found.</p>;
    }
    return videos.map((video) => {
      return (
        <div key={video.id.videoId} className="video-item" onClick={() => handleOnClick(video)}>
          <img style={{ margin: "10px" }}
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <div className="video-info">
            <h2>{video.snippet.title}</h2> 
            <p>{video.snippet.description}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit} className="search-form">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="video-container">
        <div className="video-grid">
          {selectedVideo && (
            <div className="selected-video">
              <iframe
                ref={selectedVideoRef}
                title={selectedVideo.snippet.title}
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="video-info">
                <h2>{selectedVideo.snippet.title}</h2>
                <p>{selectedVideo.snippet.description}</p>
              </div>
            </div>
          )}
        </div>
        <div className="video-list">{renderVideos()}</div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<SearchBar />, rootElement);
} else {
  console.error("Element with id 'root' not found in the DOM.");
}

export default SearchBar;
