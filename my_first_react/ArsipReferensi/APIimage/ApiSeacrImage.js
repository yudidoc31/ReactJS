import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css"; // Menghubungkan ke file CSS untuk styling

//https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
//https://unsplash.com/images

const unsplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296"
  },
});

class ImageList extends Component {
  render() {
    const images = this.props.images.map((image, index) => (
      <ImageCard key={index} image={image} />
    ));

    return <div className="image-list">{images}</div>;
  }
}

class SearchBar extends Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };

  render() {
    const { description, urls } = this.props.image;
    return (
      <div className="image-card" style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img ref={this.imageRef} alt={description} src={urls.regular} />
      </div>
    );
  }
}

class App extends Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    try {
      const response = await unsplash.get("/search/photos", {
        params: { query: term },
      });
      this.setState({ images: response.data.results });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div style={{ marginTop: "20px" }}>
          {this.state.images.length > 0 && <ImageList images={this.state.images} />}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
