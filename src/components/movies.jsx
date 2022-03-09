import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  render() {
    const { pageSize, currentPage, movies, genres, selectedItem } = this.state;
    const filters =
      selectedItem && selectedItem._id
        ? movies.filter((item) => item.genre._id === selectedItem._id)
        : movies;
    const items = paginate(filters, currentPage, pageSize);

    const count = filters.length;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedItem}
          />
        </div>
        <div className="col">
          <MoviesTable
            movies={items}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedItem: genre, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleRenderTitle(count) {
    if (count === 0) {
      return;
    }
    return;
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    if (movie.like) movies[index].like = false;
    else movies[index].like = true;
    this.setState({ movies });
  };

  handleDelete = (id) => {
    let movies = this.state.movies;
    movies = movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };
}

export default Movies;
