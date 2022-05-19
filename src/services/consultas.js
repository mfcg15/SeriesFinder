import axios from 'axios'

export const getSerieInformation = async ({ id = '' }) => 
{
  const req = await axios.get(`https://api.tvmaze.com/shows/${id}`).catch(err => {return err.name})
  if(req === 'AxiosError')
  {
    return false
  }
  else
  {
    const res = req.status === 200 && req.data
    return res
  }
}

export const getSerieSeasons = async ({ id = '' }) => {
  const req = await axios.get(`https://api.tvmaze.com/shows/${id}/seasons`)
  const res = req.status === 200 && req.data
  return res
}

export const getSerieEpisodios = async ({ id = '' }) => {
  const req = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
  const res = req.status === 200 && req.data
  return res
}

export const getSerieCast = async ({ id = '' }) => {
    const req = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`)
    const res = req.status === 200 && req.data
    return res
  }