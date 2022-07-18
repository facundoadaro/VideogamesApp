import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions/index.js";
import Loading from "../multimedia/loading.gif"
import styles from "./css/detailscard.module.css";

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
    <div className={styles.homebackground}>
      {Object.keys(gameDetails).length ? (
        <div>
          <Link to="/home">
            <button className={styles.button} onClick={() => handleClick()}>Home</button>
          </Link>
          
          <h1>Game Details</h1>
          <br/>

          <h2>Name</h2>
          <h3>{gameDetails.name}</h3>
          <br/>

          <img id={styles.img}  src={gameDetails.image ?  gameDetails.image : "https://images.pexels.com/photos/8885140/pexels-photo-8885140.jpeg?auto=compress"} alt="img not found"/>

          <h2>Description</h2>
          {gameDetails.description ? <h3 id={styles.descriptiontext}>{gameDetails.description}</h3> : <h3>Not found</h3>}
          <br/>

          <h2>Release Date</h2>
          <h3>{gameDetails.releaseDate}</h3>
          <br/>

          <h2>Rating</h2>
          <h3>{gameDetails.rating}</h3>
          <br/>

          <h2>Platforms</h2>
          {gameDetails.platforms ? <h3>{gameDetails.platforms}</h3> : <h3>Not found</h3>}
          <br/>
          
          <h2>Genres</h2>
          {gameDetails.genres ? <h3>{gameDetails.genres}</h3> : <h3>Not found</h3> }
          <br/>

        </div>
      ) : (
        <div>
          <img className={styles.gifloadeddetails} src={Loading} alt='not found'/>
        </div>
      )}
      <br/>
    </div>
  );
}
