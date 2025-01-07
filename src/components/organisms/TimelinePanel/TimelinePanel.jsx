// src/components/organisms/TimelinePanel/TimelinePanel.jsx
import React from 'react';
import { Box } from '@mui/material';
import Timeline from '../../molecules/Timeline/Timeline';
import VideoControlBar from '../../molecules/VideoControlBar/VideoControlBar';

const TimelinePanel = ({ events, videoProps }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Timeline events={events} />
      <VideoControlBar {...videoProps} />
    </Box>
  );
};

export default TimelinePanel;
