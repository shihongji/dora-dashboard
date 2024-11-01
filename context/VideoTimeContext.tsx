import { createContext, useContext, ReactNode, useState } from 'react';

interface VideoTimeContextType {
  currentSecond: number;
  setCurrentSecond: (second: number) => void;
}

const VideoTimeContext = createContext<VideoTimeContextType | undefined>(undefined);

export const VideoTimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentSecond, setCurrentSecond] = useState<number>(0);

  return (
    <VideoTimeContext.Provider value={{ currentSecond, setCurrentSecond }}>
      {children}
    </VideoTimeContext.Provider>
  );
};

export const useVideoTime = () => {
  const context = useContext(VideoTimeContext);
  if (!context) throw new Error('useVideoTime must be used within a VideoTimeProvider');
  return context;
};