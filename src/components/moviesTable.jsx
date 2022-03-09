import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, onSort } = props;
  if (movies.length === 0) return <h1>There are no movies in the database.</h1>;
  return (
    <React.Fragment>
      <h1>There are {movies.length} movies in the database.</h1>
      <table className="table">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
              Title
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("genre.name")}
            >
              Genre
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("numberInStock")}
            >
              Stock
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => onSort("dailyRentalRate")}
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
};

export default MoviesTable;
