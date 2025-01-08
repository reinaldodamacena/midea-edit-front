import React, { useState, useEffect } from 'react';
import EditTemplate from '../components/templates/EditTemplate/EditTemplate';

const EditPage = () => {
  const [cuts, setCuts] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [notifications, setNotifications] = useState([{ id: 1, message: 'Bem-vindo à edição!' }]);

  const [videos, setVideos] = useState([
    { id: 1, name: 'Big Buck Bunny', url: '/videos/mov_bbb.mp4', duration: 10 },
    { id: 2, name: 'Sample Video 5s', url: '/videos/sample-5s.mp4', duration: 5 },
    { id: 3, name: 'Sample Video 10s', url: '/videos/sample-10s.mp4', duration: 10 },
    { id: 4, name: 'Sample Video 15s', url: '/videos/sample-15s.mp4', duration: 15 },
    { id: 5, name: 'Sample Video 30s', url: '/videos/sample-30s.mp4', duration: 30 },
  ]);
  

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  useEffect(() => {
    const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0);
    setCuts(videos.map((video, index) => ({ ...video, start: index * 10, end: (index + 1) * 10 })));
    setCurrentTime(0);
  }, [videos]);

  const handlePlayPause = () => console.log('Tocar/Pausar vídeo');
  const handleStop = () => setCurrentTime(0);

  const handleSelectVideo = (video) => setSelectedVideo(video);

  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    if (selectedVideo?.id === id) setSelectedVideo(null);
  };

  const handleCutVideo = (newCut) => setCuts((prevCuts) => [...prevCuts, newCut]);

  const handleMoveClip = (videoId, newIndex) => {
    const updatedVideos = [...videos];
    const index = updatedVideos.findIndex((video) => video.id === videoId);
    const [movedVideo] = updatedVideos.splice(index, 1);
    updatedVideos.splice(newIndex, 0, movedVideo);
    setVideos(updatedVideos);
  };

  const handleResizeClip = (videoId, newStart, newEnd) => {
    setCuts((prevCuts) =>
      prevCuts.map((cut) =>
        cut.id === videoId ? { ...cut, start: newStart, end: newEnd } : cut
      )
    );
  };

  const handleUpdateTime = (time) => setCurrentTime(time);

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
