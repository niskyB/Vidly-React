import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    if (movies.length === 0)
      return <h1>There are no movies in the database.</h1>;
    return (
      <React.Fragment>
        <h1>There are {movies.length} movies in the database.</h1>
        <table className="table">
          <TableHeader
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
