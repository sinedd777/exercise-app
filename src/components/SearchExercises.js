import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData, fallbackBodyParts } from '../util/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
    
    const [search,setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState(fallbackBodyParts);

    useEffect(() => {
      const fetchExercisesData = async () => {
        try {
          const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
          setBodyParts(['all', ...bodyPartsData]);
        } catch (error) {
          console.log('Error fetching body parts:', error);
          // Already initialized with fallback data, so no need to do anything here
        }
      }

      fetchExercisesData();
    }, [])
    

    const handleSearch = async () => {
        if(search){
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        
            const searchedExercises = exercisesData.filter((exercise) => {
                return exercise.name.toLowerCase().includes(search)
                ||  exercise.target.toLowerCase().includes(search)
                ||  exercise.equipment.toLowerCase().includes(search)
                ||  exercise.bodyPart.toLowerCase().includes(search)
                
            })
            console.log(exercisesData);
            setSearch('');
            setExercises(searchedExercises);
        }
    }

  return (
    <Stack
        alignItems="center"
        justifyContent="center"
        mt="37px"
        p="20px"
        >
        <Typography 
            fontWeight={700}
            sx={{
                fontSize: { lg: '44px', xs: '30px'}
            }}
            mb="50px"
            textAlign="center"
        >
            Awesome Exercises You <br/> Should Know
        </Typography>
        <Box position="relative" mb="72px">
            <TextField
                sx={{
                    input: { 
                        fontWeight: '700',
                        border: 'none',
                        borderRadius: '4px'
                    },
                    width: {
                        lg: '800px',
                        xs: '350px'
                    },
                    backgroundColor: '#fff',
                    borderRadius: '40px'
                }}
                height="76px"
                value={search}
                onChange={(e)=> setSearch(e.target.value.toLowerCase())}
                placeholder="Search Exercises"
                type="Text"
            />
            <Button 
                className='search-btn'
                sx={{
                    bgcolor: '#ff2625',
                    color: '#fff',
                    textTransform: 'none',
                    width: { lg: '176px', xs: '80px'},
                    fontSize:  { lg: '20px', xs: '14px'},
                    height: '56px',
                    position: 'absolute',
                    right:'0'
                }}
                onClick={handleSearch}
                >
                Search
            </Button>
        </Box>
        <Box sx={{ position: 'relative', width:'100%', p:'20px'}}>
            <HorizontalScrollbar 
                data={bodyParts} 
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                isBodyParts
            />
        </Box>

    </Stack>
  )
}

export default SearchExercises