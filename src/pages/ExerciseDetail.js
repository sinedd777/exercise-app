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
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equimentExercises, setEquimentExercises] = useState([])

  const { id } = useParams();
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      
      const exercisesDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exercisesDetailData.name + ' workout'}`, youtubeOptions);

      setExerciseVideos(exerciseVideosData.contents);
      setExerciseDetail(exercisesDetailData);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exercisesDetailData.target}`, exerciseOptions);
      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exercisesDetailData.equipment}`, exerciseOptions);

      setTargetMuscleExercises(targetMuscleExercisesData);
      setEquimentExercises(equipmentExercisesData);

    }
    fetchExercisesData();
  }, [id])
  

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equimentExercises={ equimentExercises } />
    </Box>
  )
}

export default ExerciseDetail