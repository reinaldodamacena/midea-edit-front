import React, { useState } from 'react';
import EditTemplate from '../components/templates/EditTemplate/EditTemplate';

const EditPage = () => {
  const [cuts, setCuts] = useState([
    { id: 1, name: 'Corte 1', duration: '0:00 - 1:00' },
    { id: 2, name: 'Corte 2', duration: '1:00 - 2:00' },
  ]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [transcription, setTranscription] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handlePlayPause = () => {
    console.log('Tocar/Pausar vídeo');
  };

  const handleStop = () => {
    console.log('Parar vídeo');
  };

  const handleSave = () => {
    console.log('Salvar transcrição:', transcription);
    setNotifications([...notifications, { id: Date.now(), message: 'Transcrição salva!' }]);
  };

  const handleEditCut = (id) => {
    console.log('Editar corte:', id);
  };

  const handleWatchCut = (id) => {
    console.log('Assistir corte:', id);
  };

  return (
    <EditTemplate
      cuts={cuts}
      currentTime={currentTime}
      duration={duration}
      transcription={transcription}
      notifications={notifications}
      onPlayPause={handlePlayPause}
      onStop={handleStop}
      onSave={handleSave}
      onChangeTranscription={setTranscription}
      onEditCut={handleEditCut}
      onWatchCut={handleWatchCut}
    />
  );
};

export default EditPage;
