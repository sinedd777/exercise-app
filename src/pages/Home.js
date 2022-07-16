import React, {useState} from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'

const Home = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);


  console.log(bodyPart);

  return (
    <Box 
    sx={{
        backgroundColor: 'text.disabled',
        '&:hover': {
        backgroundColor: 'warning.main',
        opacity: [0.9, 0.8, 0.7],
      }}
    }
    >
      <HeroBanner/>
      <SearchExercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  )
}

export default Home