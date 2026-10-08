import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGI0MzgxMDM1MmI4YWI1MGY5YTAyZjliYTFlM2Q1ZSIsIm5iZiI6MTc2ODQ2Njk5My4xNDIwMDAyLCJzdWIiOiI2OTY4YWEzMWY0NmFkMjM4ZDVmNDA5MDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y-uDp9C7FoBzVkJxeSKlXNNrltqQQs3DADHBsNyTzJ4'
  }
};

const handleWheel= (Event)=>{
  Event.preventDefault;
  cardsRef.current.scrollLeft += Event.DeltaY;
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('Wheel', handleWheel)},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="cards-list" ref={cardsRef}>
      {apiData.map((card, index)=>{
        return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
          </Link>
      })}
      </div>
    </div>
  )
}



export default TitleCards;
