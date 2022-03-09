import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onLike, onDelete } = this.props;
    if (movies.length === 0)
      return <h1>There are no movies in the database.</h1>;
    return (
      <React.Fragment>
        <h1>There are {movies.length} movies in the database.</h1>
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("title")}
              >
                Title
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("genre.name")}
              >
                Genre
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("numberInStock")}
              >
                Stock
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("dailyRentalRate")}
              >
                Rate
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like like={movie.like} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
