import React from 'react';
import Marker from '../../atoms/Marker/Marker';

const MarkerList = ({ markers, boxWidth, duration }) => {
  return (
    <div style={{ position: 'relative', height: '100%', width: `${boxWidth}px` }}>
      {markers.map((marker) => {
        const position = (marker / duration) * boxWidth;
        return (
          <Marker key={marker} position={position} label={`${marker}s`} />
        );
      })}
    </div>
  );
};

export default MarkerList;
