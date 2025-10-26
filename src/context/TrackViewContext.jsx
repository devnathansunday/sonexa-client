'use client'
import { createContext, useContext } from 'react';
import { trackView } from '@/lib/api/posts';

const TrackViewContext = createContext();

export const TrackViewProvider = ({ children }) => {
  const trackPostViews = async (postId) => {
    await trackView(postId);
  };

  return (
    <TrackViewContext.Provider value={{ trackPostViews }}>
      {children}
    </TrackViewContext.Provider>
  );
};

export const useTrackView = () => useContext(TrackViewContext);