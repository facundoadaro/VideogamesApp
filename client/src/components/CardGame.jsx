import React from 'react';

export default function CardGame ({name, image, genres }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='325px' height='200px'/>
            <h5>{genres}</h5>
            <hr/>
        </div>
    )
}