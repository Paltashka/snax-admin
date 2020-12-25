import React, { useEffect, useState } from "react";

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [it, setIt] = useState([]);

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()

export const Games = () => {

useEffect(() => {
    fetch("http://18.216.83.82:3000/api/v1/games/", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setIt(result.payload);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}, [])
}

