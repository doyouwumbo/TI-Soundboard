import { Box } from '@mui/system'
import React from 'react'
import SoundButton from './SoundButton';
import data from './data/sounds.json'

export default function Sounds() {
  let i = -1;
  return (
    <Box sx={{display: 'flex',
    ml: '10px', 
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
        data.music.map((clip) => {
          i++;
          return (<SoundButton clipName={clip.name} key={i} artistName={clip.artist} type='music'/>);
        })
      }
    </Box>
  )
}
