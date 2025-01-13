import React, { useState, useEffect } from 'react';
import EditTemplate from '../components/templates/EditTemplate/EditTemplate';

const EditPage = () => {
  const [cuts, setCuts] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [videos, setVideos] = useState([]); // Inicial vazio, será preenchido com dados do JSON
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Indica se os dados estão sendo carregados

  // Função para buscar todos os vídeos
  const fetchVideos = async () => {
    try {
      const response = await fetch(`/videos/Resultscopy.json`); // Ajuste o caminho do JSON conforme necessário
      if (!response.ok) {
        throw new Error(`Erro ao buscar vídeos: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      const formattedVideos = data.map((video) => ({
        id: video.id,
        name: video.name,
        url: video.url,
        duration: Number(video.duration), // Certifica-se de que a duração seja numérica
      }));

      console.log('Vídeos carregados:', formattedVideos);

      setVideos(formattedVideos);
      if (!selectedVideo && formattedVideos.length > 0) setSelectedVideo(formattedVideos[0]);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // Carrega os vídeos ao montar o componente
  }, []);

  const handleUpdateTime = (time) => {
    console.log('Tempo atualizado:', time);
    setCurrentTime(time);
  };

  return (
    <EditTemplate
      videos={videos}
      currentTime={currentTime}
      onUpdateTime={handleUpdateTime}
    />
  );
};

export default EditPage;
