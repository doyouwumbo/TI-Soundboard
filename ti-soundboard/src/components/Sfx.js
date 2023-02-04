import { Box } from '@mui/system';
import React from 'react';
import SoundButton from './SoundButton';
import data from './data/sounds.json';

export default function Sounds() {  
  return (
    <Box sx={{display: 'flex', 
    flexWrap: 'wrap', 
    width: '100%',
    mt: '10px',
    mb: '10px', 
    justifyContent: 'space-evenly', 
    maxHeight: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      width: '10px',
      backgroundColor: 'white',
      borderRadius: 16
    }
    }}>
    {
        data.sounds.map((clip) => {
          return (<SoundButton clipName={clip.name} key={clip.name} type='sfx'/>);
        })
      }
    </Box>
  )
}
