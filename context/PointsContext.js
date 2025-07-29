import React, { createContext, useState } from 'react';
import { currentUser } from '../constants/mockUsers';

export const PointsContext = createContext({
  points: 0,
  addPoints: () => {},
  deductPoints: () => {},
  taskProgress: 0,
  incrementProgress: () => {},
});

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(currentUser.dailyPoints || 0);
  const [taskProgress, setTaskProgress] = useState(0);

  const addPoints = (p = 0) => setPoints((v) => v + p);
  const deductPoints = (p = 0) => setPoints((v) => Math.max(0, v - p));
  const incrementProgress = () =>
    setTaskProgress((p) => Math.min(p + 1, 2));

  return (
    <PointsContext.Provider
      value={{ points, addPoints, deductPoints, taskProgress, incrementProgress }}
    >
      {children}
    </PointsContext.Provider>
  );
};
