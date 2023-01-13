import { Box } from '@mui/system';
import React from 'react';

import PlaybackController from '../components/PlaybackController';
import Sounds from '../components/Sounds';

export default function Soundboard() {
  return (
    <div className="soundboard">
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
        <PlaybackController/>
        <Box sx={{display: 'flex', height: '600px', width: '500px', backgroundColor: "#2c333d"}}>
          <Sounds />
        </Box>
        
      </Box>
    </div>
  )
}
