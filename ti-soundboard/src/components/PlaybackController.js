import { Stack, Typography, Slider } from '@mui/material';
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

export default function PlaybackController() {


  const {audio, audioName, setAudioName, isPlaying, setIsPlaying} = React.useContext(AudioContext);
  const musicRef = useRef(audio);

  const [info, setInfo] = useState([]);
  const [volume, setVolume] = useState(50);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);

  // Handle playing audio
  function playSound() {
    musicRef.current.play();
    setIsPlaying(true);
  }

  // Handle pausing audio
  function pauseSound() {
    musicRef.current.pause();
    setIsPlaying(false);
  }

  function changeVolume(event) {
    setVolume(event.target.value);
    musicRef.current.volume = event.target.value / 100;
  }

  musicRef.current.addEventListener('ended', (event) => {
    setAudioName("");
    setIsPlaying(false);
  })

  // Sets up the current audio information to a readable format
  useEffect(() => {
    setInfo(audioName.split('-'));
    musicRef.current.volume = volume / 100;
  }, [audioName, volume])

  useEffect(() => {
    setCurrentAudioTime(Math.floor(musicRef.current.currentTime));
  }, [musicRef.current.currentTime])

  return (


    <div className="playbackController">
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap', 
        justifyContent: 'center',
        backgroundColor: "#2c333d", 
        margin: '60px',
        height: '166px',
        minWidth: '400px',
          }}>
        <Box sx={{display: 'flex', flexgrow: 1, width: '100%', justifyContent: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', width: '60px', mr: '10px', cursor: 'pointer'}}> 
            {
              audioName === "" && 
              <PlayArrowIcon sx={{fontSize: '60px', color: 'white'}}></PlayArrowIcon>
            }

            {
              !isPlaying && audioName !== "" &&
              <PlayArrowIcon sx={{display: 'flex', fontSize: '60px', color: 'white', textAlign: 'left'}} onClick={playSound}></PlayArrowIcon>
            }

            {
              isPlaying && audioName !== "" && <PauseIcon sx={{fontSize: '40px',  color: 'white'}} onClick={pauseSound}></PauseIcon>
            }
          </Box> 
          <Stack spacing={-0.5} sx={{flexGrow: 1, justifyContent: 'center'}}>
            <Typography variant='h5' sx={{color: 'white'}} >
              <b>{info[0]}</b>
            </Typography>
            <Typography sx={{color: '#a3a3a3', fontSize: '14px'}} >
              {info.length > 1 && <>{info[1].substring(0, info[1].length - 4)}</>}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{display: 'flex', ml: '17px', alignItems: 'center'}}>
          <div style={{cursor: 'pointer'}} onClick={(e) => {setVolume(0); musicRef.current.volume = 0; }}>
            {volume === 0 && <VolumeOffIcon sx={{color: '#a3a3a3'}}/>}
            {volume > 0 && volume <= 24 && <VolumeMuteIcon sx={{color: '#a3a3a3'}}/>}
            {volume >= 25 && volume <= 49 && <VolumeDownIcon sx={{color: '#a3a3a3'}}/>}
            {volume >= 50 && volume <= 99 && <VolumeUpIcon sx={{color: '#a3a3a3'}}/>}
            {volume === 100 && <CampaignIcon sx={{color: '#a3a3a3'}}/>}
          </div>
          <Slider value={volume} defaultValue={50} onChange={changeVolume} sx={{
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
                border: 3,
                borderColor: 'lightgreen',
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
          
            }}
            
          />
        </Box>  


        <Box sx={{display: 'flex', ml: '20px', alignItems: 'center'}}>
          <Typography sx={{color: 'white', mr: '5px'}}>
            {currentAudioTime}
          </Typography>
          <Slider sx={{
            width: '80%',
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
                border: 3,
                borderColor: 'lightgreen',
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
          
            }}
        
          />
          
        </Box>
      </Box>
    </div>
  )
}
