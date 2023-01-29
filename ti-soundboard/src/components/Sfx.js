import { Box } from '@mui/system'
import React from 'react'
import SoundButton from './SoundButton';

export default function Sounds() {

  const musicNames = ['Xylophone.mp3'];
  
  return (
    <div className="sounds">
        <Box sx={{display: 'flex'}}>
          {
          musicNames.map((clip) => {
            return(
            <SoundButton clipName={clip} key={clip} type='sfx'/>
          )})
          }
        </Box>
    </div>
  )
}
