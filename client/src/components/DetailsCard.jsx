import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions/index.js";
import Loading from "../multimedia/loading.gif"

export default function DetailsCard({id}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const gameDetails = useSelector((state) => state.detail);
  
  function handleClick() {
    dispatch({
      type: "CLEAR_DETAILS",
    })
  }

  return (
    <div>
      {Object.keys(gameDetails).length ? (
        <div>
          <br/>
          <Link to="/home">
            <button onClick={() => handleClick()}>Home</button>
          </Link>
          <h1>Game Details</h1>
          <h2>Name:<br/>{gameDetails.name}</h2>
          <img src={gameDetails.image ?  gameDetails.image : "https://images.pexels.com/photos/8885140/pexels-photo-8885140.jpeg?auto=compress"} alt="img not found" width='700px' height='500px'/>
          <h3>Description:<br/>{gameDetails.description ? gameDetails.description : <p>Not found</p>}</h3>
          <h3>Release Date:<br/>{gameDetails.releaseDate}</h3>
          <h3>Rating:<br/>{gameDetails.rating}</h3>
          <h3>Platforms:<br/>{gameDetails.platforms ? gameDetails.platforms : <p>Not found</p>}</h3>
          <h3>Genres<br/>{gameDetails.genres ? gameDetails.genres : <p>Not found</p> }</h3>
        </div>
      ) : (
        <img src={Loading} alt='not found'/>
      )}
      <br/>
    </div>
  );
}
