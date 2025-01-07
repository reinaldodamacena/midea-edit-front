// src/pages/ProjectDetailsPage.jsx
import React, { useState } from 'react';
import ProjectDetailsTemplate from '../components/templates/ProjectDetailsTemplate/ProjectDetailsTemplate';

const ProjectDetailsPage = () => {
  const [events, setEvents] = useState([
    { icon: '🔴', title: 'Corte 1', actionLabel: 'Assistir', onAction: () => {} },
    { icon: '🟢', title: 'Corte 2', actionLabel: 'Editar', onAction: () => {} },
  ]);

  const videoProps = {
    currentTime: 0,
    duration: 120,
    onPlayPause: () => console.log('Play/Pause'),
    onSeek: (time) => console.log('Seeking to:', time),
  };

  return <ProjectDetailsTemplate events={events} videoProps={videoProps} notifications={[]} />;
};

export default ProjectDetailsPage;
