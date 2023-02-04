import { Box } from '@mui/system';
import React from 'react';

import PlaybackController from '../components/PlaybackController';
import Sounds from '../components/Sounds';
import Sfx from '../components/Sfx';
import {styled} from '@mui/material/styles';

const SoundContainerBox = styled(Box)(() => ({
  display: 'flex', 
  minHeight: '600px',
  maxHeight: '600px',
  width: '40%',
  minWidth: '500px', 
  backgroundColor: "#2c333d",
  margin: '10px',
  borderRadius: '16px',
}))

export default function Soundboard() {
  return (
    <div className="soundboard">
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
        <PlaybackController/>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-evenly', width: '80%'}}>
          <SoundContainerBox>
            <Sounds />
          </SoundContainerBox>
          <SoundContainerBox >
            <Sfx />
          </SoundContainerBox>
        </Box>
      </Box>
    </div>
  )
}
