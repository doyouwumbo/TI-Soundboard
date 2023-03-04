import { Stack, Typography, Slider, } from '@mui/material';
import {styled} from '@mui/material/styles';
import { AudioContext } from './AudioContextProvider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Box } from '@mui/system';
import '../App.css';
import React, {useEffect, useRef, useState} from 'react';

const PlaybackSlider = styled(Slider)(() => ({
  width: '40%',
  ml: '10px',  
  color: 'white',
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: '0px',
    width: '0px',
    transition: '0.2s cubic-bezier(.47,1.64,.41,.9)',
    '&.Mui-active': {
      width: '15px',
      height: '15px',
      border: '3px solid lightgreen',
    },
    '&:hover': {
      boxShadow: 'none'
    },
  },

  '&:hover': {
    '& .MuiSlider-track': {
      color: 'lightgreen'
    }, 
  },

  '& .Mui-focusVisible': {
    boxShadow: 'none'
  }
}))


export default function PlaybackController() {

  // Context
  const {audio, audioName, artistName, setArtistName, setAudioName, isPlaying, setIsPlaying} = React.useContext(AudioContext);

  // Refs
  const musicRef = useRef(audio); // reference for audio playback
  // States
  const [volume, setVolume] = useState(50);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  // Event Listeners
  useEffect(() => {
    musicRef.current.addEventListener('ended', (event) => {
      setAudioName("");
      setArtistName("");
      setIsPlaying(false);
      setDuration(0);
      setElapsed(0);
    });
  
    musicRef.current.addEventListener('loadedmetadata', (event) => {
      const duration = musicRef.current.duration;
      const _elapsed = musicRef.current.currentTime;
      setDuration(duration);
      setElapsed(_elapsed);
    });
  
    musicRef.current.addEventListener('timeupdate', (event) => {
      setElapsed(musicRef.current.currentTime);
    });
  }, []);


  // Pausing and playing
  function handlePausePlay() {
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(false);
    } else {
      musicRef.current.play();
      setIsPlaying(true);
    }
  }

  // Handle change volume
  function changeVolume(event) {
    setVolume(event.target.value);
    musicRef.current.volume = event.target.value / 100;
  }

  // Make sure audio stays the same between audio clips
  useEffect(() => {
    musicRef.current.volume = volume / 100;
  }, [audioName, volume])

  // Format the time
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const mins = Math.floor( time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor( time / 60);
      const secs = Math.floor( time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor( time % 60);
      return `${mins}:${secs}`;
    }
    return '00:00';
  }

  // If progressbar updates then we need to change the time of the audio
  function updateProgressBar(event) {
    musicRef.current.currentTime = event.target.value;
    setElapsed(event.target.value);
  }

  return (
    <div className="playbackController">
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'nowrap', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2c333d", 
        margin: '60px',
        mb: '30px',
        height: '166px',
        minWidth: '400px',
        borderRadius: '16px',
        border: 1,
        borderWidth: '2px',
        boxShadow: '0px 0px 10px black'
          }}>
        <Stack sx={{width: '90%'}}>
          <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', width: '60px', mr: '12px', cursor: 'pointer', ml: '-16px'}}> 
              {
                audioName === "" && 
                <PlayArrowIcon sx={{fontSize: '50px', color: 'white'}}></PlayArrowIcon>
              }

              {
                !isPlaying && audioName !== "" &&
                <PlayArrowIcon sx={{display: 'flex', fontSize: '50px', color: 'white', "&:hover": {color: 'lightgreen'}}} onClick={handlePausePlay}></PlayArrowIcon>
              }

              {
                isPlaying && audioName !== "" && <PauseIcon sx={{fontSize: '50px',  color: 'white', "&:hover": {color: 'lightgreen'}}} onClick={handlePausePlay}></PauseIcon>
              }
            </Box> 
            <Stack spacing={-0.5} sx={{justifyContent: 'center'}}>
              <Typography variant='h5' sx={{color: 'white'}} >
                <b>{audioName}</b>
              </Typography>
              <Typography sx={{color: '#a3a3a3', fontSize: '14px'}} >
                {artistName}
              </Typography>
            </Stack>
          </Box>

          <Stack direction='row' spacing={1} sx={{alignItems: 'center'}}>
            <div style={{cursor: 'pointer'}} onClick={(e) => {setVolume(0); musicRef.current.volume = 0; }}>
              {volume === 0 && <VolumeOffIcon sx={{color: '#a3a3a3'}}/>}
              {volume > 0 && volume <= 24 && <VolumeMuteIcon sx={{color: '#a3a3a3'}}/>}
              {volume >= 25 && volume <= 49 && <VolumeDownIcon sx={{color: '#a3a3a3'}}/>}
              {volume >= 50 && volume <= 99 && <VolumeUpIcon sx={{color: '#a3a3a3'}}/>}
              {volume === 100 && <CampaignIcon sx={{color: '#a3a3a3'}}/>}
            </div>
            <PlaybackSlider value={volume} defaultValue={50} onChange={changeVolume} />
          </Stack>  


          <Stack direction='row' spacing={1} sx={{alignItems: 'center', }}>
            <Typography sx={{color: 'white'}}>
              {formatTime(elapsed)}
            </Typography>
            <PlaybackSlider disabled={duration === 0 ? true : false} sx={{width: '100%'}} value={elapsed} max={duration} onChange={updateProgressBar} />
            <Typography sx={{color: 'white'}}>
              {formatTime(duration)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}
