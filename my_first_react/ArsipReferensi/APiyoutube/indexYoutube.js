import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.selectedVideoRef = React.createRef(); // Menyimpan ref untuk video yang diputar
  }

  state = {
    term: "",
    videos: [], // Menyimpan hasil pencarian video
    selectedVideo: null // Menyimpan video yang dipilih untuk diputar
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: this.state.term,
          part: "snippet",
          maxResults: 6, // Sesuaikan dengan jumlah video yang ingin ditampilkan
          key: "AIzaSyDagukz8dXEFrWS1Ffp9stBL63xUT_ARiM" // Ganti dengan kunci API YouTube Anda
        }
      });

      this.setState({ videos: response.data.items, selectedVideo: null }); // Menyimpan hasil pencarian video ke state
    } catch (error) {
      console.error("Error fetching videos:", error.message); // Menampilkan pesan error yang lebih spesifik
    }
  };

  handleOnClick = (selectedVideo) => {
    this.setState({ selectedVideo }); // Set video yang dipilih untuk diputar
  };

  renderVideos() {
    return this.state.videos.map((video) => {
      return (
        <div key={video.id.videoId} className="video-item" onClick={() => this.handleOnClick(video)}>
          <img style={{ margin: "10px" }}
            src={video.snippet.thumbnails.medium.url} // Menampilkan thumbnail medium
            alt={video.snippet.title}
          />
          <div className="video-info">
            <h2>{video.snippet.title}</h2> 
            <p>{video.snippet.description}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onFormSubmit} className="search-form">
          <input
            type="text"
            value={this.state.term}
            onChange={(e) => this.setState({ term: e.target.value })}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>

        <div className="video-container">
          <div className="video-grid">
            {this.state.selectedVideo && (
              <div className="selected-video">
                <iframe
                  ref={this.selectedVideoRef}
                  title={this.state.selectedVideo.snippet.title}
                  src={`https://www.youtube.com/embed/${this.state.selectedVideo.id.videoId}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="video-info">
                  <h2>{this.state.selectedVideo.snippet.title}</h2>
                  <p>{this.state.selectedVideo.snippet.description}</p>
                </div>
              </div>
            )}
          </div>
          <div className="video-list">{this.renderVideos()}</div>
        </div>
      </div>
    );
  }
}

// Mencari elemen dengan id "root" di dalam DOM
const rootElement = document.getElementById("root");

// Memastikan elemen dengan id "root" sudah ada sebelum melakukan render komponen React
if (rootElement) {
  ReactDOM.render(<SearchBar />, rootElement);
} else {
  console.error("Element with id 'root' not found in the DOM.");
}

export default SearchBar;
