import logo from './logo.svg';
import './App.css';
import Soundboard from './pages/Soundboard';
import AudioContextProvider from './components/AudioContextProvider';

function App() {

  return (
    <div className="App">
      <AudioContextProvider>
        <Soundboard />
      </AudioContextProvider>
    </div>
  );
}

export default App;
