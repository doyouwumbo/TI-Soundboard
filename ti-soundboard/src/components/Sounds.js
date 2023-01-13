import { Box } from '@mui/system'
import React from 'react'
import SoundButton from './SoundButton';

export default function Sounds() {

  const musicNames = ['ANIMA - ReoNa.mp3', 'Overfly - Luna Haruna.mp3'];
  
  return (
    <div className="sounds">
        <Box sx={{display: 'flex'}}>
          {
          musicNames.map((clip) => {
            return(
            <SoundButton clipName={clip} key={clip}/>
          )})
          }
        </Box>
    </div>
  )
}
