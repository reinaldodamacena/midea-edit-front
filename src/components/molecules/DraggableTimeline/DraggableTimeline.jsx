import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import TimeRuler from '../../molecules/TimeRuler/TimeRuler';
import SortableClip from './SortableClip';

/**
 * DraggableTimeline
 * 
 * Props:
 *  - videos: Array<{ id, name, url, duration }>
 *  - currentTime, zoom
 *  - onScrub(newTime): callback para mover o playhead
 *  - onReorder(newList): callback disparado quando reordenar a lista
 */
const DraggableTimeline = ({
  videos = [],
  currentTime = 0,
  zoom = 50,
  onScrub,
  onReorder,
}) => {
  const theme = useTheme();

  const normalizedZoom = zoom / 100;

  // Duração total da timeline
  const totalDuration = useMemo(() => {
    if (!videos?.length) return 0;
    return videos.reduce((sum, v) => sum + (v.duration || 0), 0);
  }, [videos]);

  // Largura total da timeline
  const totalWidth = useMemo(() => {
    if (totalDuration <= 0) return 0;
    return totalDuration * normalizedZoom * 100;
  }, [totalDuration, normalizedZoom]);

  // Larguras individuais dos vídeos
  const videoWidths = useMemo(() => {
    if (!videos?.length || totalDuration === 0) return [];
    return videos.map((vid) => {
      const frac = vid.duration / totalDuration;
      return frac * totalWidth;
    });
  }, [videos, totalDuration, totalWidth]);

  // IDs para o DnD
  const itemIds = useMemo(() => videos.map((v) => v.id.toString()), [videos]);

  // Handler para reordenação
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = videos.findIndex((v) => v.id.toString() === active.id);
    const newIndex = videos.findIndex((v) => v.id.toString() === over.id);

    const newList = arrayMove(videos, oldIndex, newIndex);
    onReorder?.(newList);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 2,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[2],
      }}
    >
      {/* TimeRuler */}
      <TimeRuler
        duration={totalDuration}
        zoom={zoom}
        currentTime={currentTime}
        boxWidth={totalWidth}
        onScrub={onScrub}
      />

      {/* Lista de vídeos com DnD */}
      {/* <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemIds}
          strategy={horizontalListSortingStrategy}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 0,
              width: `${totalWidth}px`,
              overflow: 'hidden',
              backgroundColor: theme.palette.background.default,
            }}
          >
            {videos.map((video, idx) => (
              
              <SortableClip
              key={`${video.id}-${idx}`} // Combina id com índice para unicidade
              video={video}
              width={videoWidths[idx]} // Calcula largura proporcional
            />
            
            ))}
            
          </Box>
        </SortableContext>
      </DndContext> */}
    </Box>
  );
};

export default DraggableTimeline;
