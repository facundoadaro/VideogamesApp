import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {

  return (
    <div>
      <h1>Welcome to the Videogames App!</h1>
      <Link to="/home">
        <button>Access</button>
      </Link>
    </div>
  );
}
