import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { exerciseOptions, fetchData , youtubeOptions} from '../util/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])

  const { id } = useParams();
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      
      const exercisesDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?q=${exercisesDetailData.name}`, youtubeOptions);

      setExerciseDetail(exercisesDetailData);
    }
    fetchExercisesData();
  }, [id])
  

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} />
      <SimilarExercises/>
    </Box>
  )
}

export default ExerciseDetail