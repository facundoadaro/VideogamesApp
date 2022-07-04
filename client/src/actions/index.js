import axios from "axios";

export function getGames() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/videogames");

      return dispatch({
        type: "GET_GAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/genres`);

      return dispatch({
        type: "GET_GENRES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGamesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postGame(game) {
  return async function (dispatch) {
    let gameSent = await axios.post("http://localhost:3001/videogames", game);
    return gameSent;
  };
}

export function filterBy(order) {
  return function (dispatch) {
    dispatch({
      type: "FILTER_BY",
      payload: order,
    });
  };
}

export function orderBy(order) {
  return function (dispatch) {
    dispatch({
      type: "ORDER_BY",
      payload: order,
    });
  };
}
