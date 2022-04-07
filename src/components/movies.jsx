import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const result = this.getPageData(
      movies,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
      selectedGenre
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={result.items}
            total={movies.length}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={result.count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  getPageData = (
    movies,
    sortColumn,
    currentPage,
    pageSize,
    searchQuery,
    selectedGenre
  ) => {
    let filters = movies;
    console.log("movie", movies);
    if (searchQuery)
      filters = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filters = movies.filter((item) => item.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filters, [sortColumn.path], [sortColumn.order]);
    const items = paginate(sorted, currentPage, pageSize);

    const count = sorted.length;
    return { count, items };
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
    let { movies, currentPage, pageSize } = this.state;
    movies = movies.filter((movie) => movie._id !== id);

    if (movies.length % pageSize === 0) {
      if (movies.length < currentPage * pageSize) currentPage--;
    }
    this.setState({ movies, currentPage });
  };
}

export default Movies;
