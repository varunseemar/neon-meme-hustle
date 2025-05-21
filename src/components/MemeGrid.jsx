
import React from 'react';
import MemeCard from './MemeCard';
import { useGlobalState } from '@/context/GlobalStateContext';

const MemeGrid = () => {
  const { memes, loading } = useGlobalState();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-cyber-dark/50 rounded-lg border border-cyber-blue/20 shadow-inner">
        <div className="text-cyber-green terminal-text animate-pulse text-lg">
          <span className="inline-block animate-bounce mr-2">›</span>
          Loading memes from the mainframe...
        </div>
      </div>
    );
  }

  if (memes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-cyber-dark/50 rounded-lg border border-cyber-pink/20 shadow-inner">
        <div className="text-cyber-pink text-lg flex flex-col items-center gap-3">
          <div className="terminal-text">ERROR::EMPTY_DATABASE</div>
          <div>No memes found in the mainframe. Upload one to begin.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-cyber-purple mb-6 border-b border-cyber-purple/30 pb-2">
        TRENDING_MEMES.SYS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default MemeGrid;
