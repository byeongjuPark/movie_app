import React from "react";
import axios from "axios";
import Movie from "./Movie";
import './Movie.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovie = async () => {
    // 구조 분해 할당
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    // 영화 데이터 로딩!
    this.getMovie();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading...</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
export default App;
