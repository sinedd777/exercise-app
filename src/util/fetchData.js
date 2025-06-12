export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }    
}
export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

// Fallback body parts data
export const fallbackBodyParts = [
  'all',
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist'
];

// Fallback exercise data
export const fallbackExercises = [
  {
    id: '0001',
    name: 'Push-up',
    bodyPart: 'chest',
    target: 'pectoralis major',
    equipment: 'body weight',
    gifUrl: 'https://example.com/pushup.gif'
  },
  {
    id: '0002',
    name: 'Pull-up',
    bodyPart: 'back',
    target: 'lats',
    equipment: 'body weight',
    gifUrl: 'https://example.com/pullup.gif'
  }
];

export const fetchData = async(url, options) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        // Return fallback data for body parts
        if (url.includes('bodyPartList')) {
            return fallbackBodyParts;
        }
        // Return fallback exercises for exercise-related endpoints
        if (url.includes('exercises')) {
            return fallbackExercises;
        }
        // Return empty array for other endpoints
        return [];
    }
}