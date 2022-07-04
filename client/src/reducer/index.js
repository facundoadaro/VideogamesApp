const initialState = {
  games: [],
  allGames: [],
  genres: [],
  platforms: ['Xbox 360', 'Xbox One', 'Xbox', 'PlayStation 5', 'PlayStation 4', 'PlayStation 3', 'PS Vita', 'Nintendo Switch', 'Wii U', 'PC', 'Linux', 'macOS', 'iOS', 'Dreamcast'],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        games: action.payload,
      };

    case "POST_GAME":
      return {
        ...state,
      };

    case "FILTER_BY":
      if (action.payload === "default") {
        let everyGame = state.allGames;
        return {
          ...state,
          games: everyGame,
        };
      }
      if (action.payload === "DB") {
        let allGames = state.allGames;
        let gamesFiltered =
          allGames && allGames.filter((g) => typeof g.id === "string");
        return {
          ...state,
          games: gamesFiltered,
        };
      }
      if (action.payload === "API") {
        let allGames = state.allGames;
        let gamesFiltered =
          allGames && allGames.filter((g) => typeof g.id === "number");
        return {
          ...state,
          games: gamesFiltered,
        };
      }
      let allGames = state.allGames;
      let gamesFiltered =
        allGames && allGames.filter((g) => g.genres.includes(action.payload));
      return {
        ...state,
        games: gamesFiltered,
      };

    case "ORDER_BY":
      if (action.payload === "default") {
        return {
          ...state,
        };
      }
      if (action.payload === "A-Z") {
        let sortedArr = state.games.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
        return {
          ...state,
          games: sortedArr,
        };
      }
      if (action.payload === "Z-A") {
        let sortedArr = state.games.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
        return {
          ...state,
          games: sortedArr,
        };
      }
      if (action.payload === "desc") {
        let sortedArr = state.games.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0;
        });
        return {
          ...state,
          games: sortedArr,
        };
      }
      if (action.payload === "asc") {
        let sortedArr = state.games.sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0;
        });
        return {
          ...state,
          games: sortedArr,
        };
      }
      break;

    default:
      return state;
  }
}
