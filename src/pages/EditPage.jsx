import React, { useState, useEffect } from 'react';
import EditTemplate from '../components/templates/EditTemplate/EditTemplate';

const EditPage = () => {
  const [cuts, setCuts] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [notifications, setNotifications] = useState([{ id: 1, message: 'Bem-vindo à edição!' }]);
  const [videos, setVideos] = useState([]); // Inicial vazio, será preenchido com dados do JSON
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoBatch, setVideoBatch] = useState(0); // Lote atual
  const BATCH_SIZE = 10; // Quantidade de vídeos por lote

  const fetchVideos = async () => {
    try {
      const response = await fetch(`/videos/Resultscopy.json`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar vídeos: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      const formattedVideos = data.map((video) => ({
        id: video.id,
        name: video.name,
        url: video.url,
        duration: Number(video.duration),
      }));
  
      const nextBatch = formattedVideos.slice(videoBatch * BATCH_SIZE, (videoBatch + 1) * BATCH_SIZE);
  
      console.log('Novo lote carregado:', nextBatch);
  
      setVideos((prev) => [...prev, ...nextBatch]);
      if (!selectedVideo && nextBatch.length > 0) setSelectedVideo(nextBatch[0]);
      setVideoBatch((prev) => prev + 1);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      setNotifications((prev) => [
        ...prev,
        { id: prev.length + 1, message: 'Não foi possível carregar os vídeos.' },
      ]);
    }
  };
  
  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0);
  
      // Corrigindo cálculo dos cortes
      const generatedCuts = videos.map((video, index) => ({
        ...video,
        start: index === 0 ? 0 : videos.slice(0, index).reduce((sum, vid) => sum + vid.duration, 0),
        end: index === 0 ? video.duration : videos.slice(0, index + 1).reduce((sum, vid) => sum + vid.duration, 0),
      }));
  
      console.log('Duração total:', totalDuration);
      console.log('Cortes gerados:', generatedCuts);
  
      setCuts(generatedCuts);
      setCurrentTime(0);
    }
  }, [videos]);
  

  const handlePlayPause = () => {
    console.log('Tocar/Pausar vídeo');
    console.log('Vídeo selecionado:', selectedVideo);
  };

  const handleStop = () => {
    console.log('Parar reprodução');
    setCurrentTime(0);
  };

  const handleSelectVideo = (video) => {
    console.log('Vídeo selecionado:', video);
    setSelectedVideo(video);
  };

  const handleDeleteVideo = (id) => {
    console.log('Deletando vídeo com ID:', id);
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    if (selectedVideo?.id === id) setSelectedVideo(null);
  };

  const handleCutVideo = (newCut) => {
    console.log('Novo corte adicionado:', newCut);
    setCuts((prevCuts) => [...prevCuts, newCut]);
  };

  const handleMoveClip = (videoId, newIndex) => {
    const updatedVideos = [...videos];
    const index = updatedVideos.findIndex((video) => video.id === videoId);
    const [movedVideo] = updatedVideos.splice(index, 1);
    updatedVideos.splice(newIndex, 0, movedVideo);

    console.log(`Vídeo movido: ${movedVideo.name}, Nova posição: ${newIndex}`);
    setVideos(updatedVideos);
  };

  const handleResizeClip = (videoId, newStart, newEnd) => {
    console.log(`Redimensionando corte: ${videoId}, Novo início: ${newStart}, Novo fim: ${newEnd}`);
    setCuts((prevCuts) =>
      prevCuts.map((cut) =>
        cut.id === videoId ? { ...cut, start: newStart, end: newEnd } : cut
      )
    );
  };

  const handleUpdateTime = (time) => {
    console.log('Tempo atualizado:', time);
    setCurrentTime(time);
  };

  console.log('Estado atual de vídeos:', videos);
  console.log('Vídeo atualmente selecionado:', selectedVideo);
  console.log('Cortes:', cuts);

  return (
    <EditTemplate
      cuts={cuts}
      currentTime={currentTime}
      notifications={notifications}
      videos={videos}
      selectedVideo={selectedVideo}
      onPlayPause={handlePlayPause}
      onStop={handleStop}
      onSelectVideo={handleSelectVideo}
      onDeleteVideo={handleDeleteVideo}
      onCutVideo={handleCutVideo}
      onMoveClip={handleMoveClip}
      onResizeClip={handleResizeClip}
      onUpdateTime={handleUpdateTime}
    />
  );
};

export default EditPage;
