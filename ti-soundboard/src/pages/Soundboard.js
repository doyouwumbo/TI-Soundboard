import { Box } from '@mui/system';
import React from 'react';

import PlaybackController from '../components/PlaybackController';
import Sounds from '../components/Sounds';
import Sfx from '../components/Sfx';
import {styled} from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const SoundContainerBox = styled(Box)(() => ({
  display: 'flex', 
  minHeight: '600px',
  maxHeight: '600px',
  width: '100%',
  backgroundColor: "#2c333d",
  borderRadius: '16px',
  borderColor: 'black',
  borderStyle: 'solid',
  borderWidth: '2px',
  boxShadow: '0px 0px 10px black'
}))

export default function Soundboard() {
  return (
    <div className="soundboard">
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'}}>
        <PlaybackController/>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-evenly', width: '80%'}}>
          <Stack spacing={1} sx={{textAlign: 'center', width: '40%', minWidth: '500px',}}>
            <Typography sx={{color: 'white', fontSize: '30px'}}><b>Music</b></Typography>
            <SoundContainerBox>
              <Sounds />
            </SoundContainerBox>
          </Stack>
          <Stack spacing={1} sx={{textAlign: 'center', width: '40%', minWidth: '500px',}}>
            <Typography sx={{color: 'white', fontSize: '30px'}}><b>Sound Effects</b></Typography>
            <SoundContainerBox>
              <Sfx />
            </SoundContainerBox>
          </Stack>
        </Box>
      </Box>
    </div>
  )
}
