import React, {useEffect , useState } from 'react'
import { useParams , useHistory} from 'react-router-dom'
import { getSerieInformation, getSerieSeasons, getSerieEpisodios, getSerieCast} from '../services/consultas'
import 'bootstrap/dist/css/bootstrap.min.css'

const Serie = () => 
{
    const { id } = useParams()
    const [informacion , setInformacion] = useState({})
    const [resumen , setResumen] = useState("")
    const [imagen , setImagen] = useState("")
    const [rating , setRating] = useState("")
    const [network , setNetwork] = useState("")
    const [generos , setGeneros] = useState("")
    const [temporadas , setTemporadas] = useState([])
    const [episodios , setEpisodios] = useState([])
    const [casting , setCasting] = useState([])

    const history = useHistory();

   const removerEtiquetas = (texto) =>
    {
      if(texto === null)
      {
        return "Information not found"
      }
      else{
        let patron = /<[^>]*>/g;
        return texto.replace(patron,'');
      }
    }

    const obtenerGeneros = (gen) =>
    {
      let generos = "";
        for(let i = 0 ; i < gen.length ; i++)
        {
          if(i === gen.length -1)
          {
            generos += gen[i]+"."
          }
          else
          {
            generos += gen[i]+", "
          }
        }
      
      return generos
    }

    useEffect(() => 
    {
        const getData = async () => 
        {
            const info = await getSerieInformation({ id: id })
            if(info === false)
            {
              history.push("/error")
            }
            else
            {
              setInformacion(info)
              console.log(info)
              setImagen(info.image === null ? "https://i.ibb.co/RYYhZms/image-not-found-1.png": info.image.medium)
              setResumen(removerEtiquetas(info.summary))
              setNetwork(info.network === null ? "Information not found" : info.network.name)
              setRating(info.rating.average === null ? "Information not found" : info.rating.average)
              setGeneros(info.genres === null || [] ? "Information not found" : obtenerGeneros(info.genres))
              const seasons = await getSerieSeasons({ id: id })
              console.log(seasons)
              setTemporadas(seasons)
              const episodes = await getSerieEpisodios({ id: id })
              setEpisodios(episodes)
              console.log(episodes)
              const cast = await getSerieCast({ id: id })
              setCasting(cast)
              console.log(cast)
            }
            
        }
        getData()
    }, [id, history])

  

  return (
    <>
      <section className='container my-3'>
        <article className='row'>
          <aside className='col-sm-4 col-xs-12'>
            <figure className='figuraMovie'>
              <img className='imagenSerie'alt={informacion.name} src={imagen}/>
            </figure>
          </aside>
          <aside className='col-sm-8 col-xs-12'>
            <h1 className='my-4'>{informacion.name}</h1>
            <p className='my-4 fw-lighter texto'>{resumen}</p>
            <section className=' row'>
              <aside className='col-auto py-2'>
                <p className='fw-lighter'>🔠 <strong>Genres : </strong>{generos}</p>
                <p className='fw-lighter'>🗣️ <strong>Language : </strong>{informacion.language}</p>
                <p className='fw-lighter'>📺 <strong>Network : </strong>{network}</p>
                <p className='fw-lighter'>⭐ <strong>Rating : </strong>{rating}</p>
              </aside>
            </section>
          </aside>
        </article>
      </section>
      
      <section className='container'>
        <h2>Episodes</h2>
        <hr/>
        {
          temporadas.length === 1 && episodios.length ===0 
          ? <p className='text-center'>Information not found</p> 
          :
          temporadas.map((temp, temIndex) => 
          (
            <table key={temIndex} className='table table-bordered table-striped '>
                <caption className='titulos caption-top'>Season {temp.number}</caption>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Summary</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    episodios.map((epi, epiIndex) => 
                    (
                      epi.season === temp.number ? 
                      <tr key={epiIndex}>
                        <td>{epi.number}</td>
                        <td>{epi.name}</td>
                        <td>{removerEtiquetas(epi.summary)}</td>
                        <td>{epi.rating.average === null ? 'not found' : epi.rating.average}</td>
                      </tr> : null
                    ))
                  }
                </tbody>
              </table>
            ))
          }
      </section>

      <section className='container'>
        <h2>Cast</h2>
        <hr/>
        {
          casting.length === 0 
          ? <p className='text-center'>Information not found</p> 
          : <ul className="casts">
              {
                casting.map((cast, castIndex)=>
                (
                  <li key={castIndex} className='card mb-3'>
                    <div className='row g-0'>
                      <figure className='col-md-4'>
                        <img src={cast.character.image === null ? "https://i.ibb.co/RYYhZms/image-not-found-1.png": cast.character.image.medium} className ='img-fluid rounded-start' alt="imagen"/>
                      </figure>
                      <div className ='col-md-8'>
                        <div className ='card-body'>
                          <p className ='card-text'><strong>{cast.character.name}</strong></p>
                          <p className ='card-text'> <small className ="text-muted">as {cast.person.name}</small></p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
        }
      </section>

    </>
  )
}

export default Serie