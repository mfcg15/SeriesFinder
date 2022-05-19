import React, {useState, useEffect, useRef } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/Home.css'
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => 
{
  const [query, setQuery] = useState("")
  const [seriesDefaul, setSeriesDefault] = useState([])
  const [series, setSeries] = useState([])
  const buscarRef = useRef()
 

  useEffect(() => 
  {
    axios.get("https://api.tvmaze.com/shows?page=1")
    .then(response =>  
      {
        setSeriesDefault(response.data)
      })
     .catch((err) =>  console.log(err));
    }, [])


  const BuscarSerie = (e) =>
  {
    e.preventDefault();
    const { value } = buscarRef.current
    setQuery(value)
    axios.get(`https://api.tvmaze.com/search/shows?q=${value.replace(/\s/g, '+').toLowerCase()}`)
         .then(response =>  
          {
            console.log(response.data)
            setSeries(response.data)
          })
         .catch((err) =>  console.log(err));
  }
  return (
    <div className='contenSeriesMovies'>
      <h1 className='text-center'>Series Finder</h1>
      <form className='buscador py-4'onSubmit={BuscarSerie}>
        <div className='d3'>
          <input type='search' name="text" className="search-field" placeholder="Search for series name" ref={buscarRef} onChange={BuscarSerie}/>
          <label className="search-btn">
            <input type="submit" className='search-input'/>
            <svg className="srchicon" viewBox="0 0 24 24" width="100%" height="100%" role="img" stroke="#000000">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </label>
        </div>
      </form>
      {
        query === "" ? 
        <div className='SeriesMovies'>
          <ul className="movies">
          {seriesDefaul.map((seried,index) => (
              <li className='liMovie' key ={index}>
                <Link to={`/serie/${seried.id}`} className='enlace'>
                <div className="movie">
                  <figure>
                    {seried.image === null ? <img src="https://i.ibb.co/RYYhZms/image-not-found-1.png" alt={seried.name} className='imgSeriesMovies'/>: <img src={seried.image.medium} alt='imagen' className='imgSeriesMovies'/>}
                    <figcaption>
                      <h2 className="movie__title">{seried.name}</h2>
                    </figcaption>
                  </figure>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        : 
        series.length === 0 ?
        <section className='container noResultados'>
        <p> No results found for your search (<strong>{query}</strong>)</p>
        <main>
          <p>Suggestions :</p>
        <ul>
          <li className='fw-lighter'>Make sure all the words are spelled correctly.</li>
          <li className='fw-lighter'>Try different keywords.</li>
        </ul>
        <figure className='contfigure'>
          <img src='https://i.ibb.co/1vyzZdw/robt.png'alt="Imagen No resultados" className='img-fluid'/>
        </figure>
        </main>
      </section>
        :
        <div className='SeriesMovies'>
            <ul className="movies">
              {
                series.map((serie,index) => (
                  <li className='liMovie' key ={index}>
                    <Link to={`/serie/${serie.show.id}`} className='enlace'>
                    <div className="movie">
                      <figure>
                        {serie.show.image === null ? <img src="https://i.ibb.co/RYYhZms/image-not-found-1.png" alt={serie.name} className='imgSeriesMovies'/>: <img src={serie.show.image.medium} alt='imagen' className='imgSeriesMovies'/>}
                        <figcaption>
                          <h2 className="movie__title">{serie.show.name}</h2>
                        </figcaption>
                      </figure>
                    </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
            </div>
      }
    </div>
  )
}

export default Home