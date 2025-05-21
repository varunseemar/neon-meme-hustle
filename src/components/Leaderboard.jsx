
import React, { useState } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';

const Leaderboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { memes } = useGlobalState();
  
  const topMemes = [...memes]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 5);
    
  return (
    <div className="border border-cyber-blue/40 rounded-lg overflow-hidden bg-cyber-darkgray/70 backdrop-blur-sm shadow-lg">
      <div 
        className="bg-gradient-to-r from-cyber-blue/20 to-cyber-darkgray p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold text-cyber-blue flex items-center">
          <span className="mr-2 text-lg">▲</span> TRENDING MEMES
        </h3>
        <span className="bg-black/50 px-2 py-1 rounded text-xs border border-cyber-blue/30">{isExpanded ? '[-]' : '[+]'}</span>
      </div>
      
      {isExpanded && (
        <div className="bg-black/40 p-4">
          {topMemes.length > 0 ? (
            <ul className="space-y-3">
              {topMemes.map((meme, index) => (
                <li key={meme.id} className="flex justify-between items-center p-2 rounded bg-cyber-darkgray/50 border-l-2 hover:bg-cyber-darkgray/80 transition-colors"
                    style={{ borderLeftColor: index === 0 ? '#FAFF00' : index === 1 ? '#1EAEDB' : index === 2 ? '#00FF41' : '#444' }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold text-xs px-2 py-1 rounded ${
                      index === 0 ? 'bg-cyber-yellow/20 text-cyber-yellow' : 
                        index === 1 ? 'bg-cyber-blue/20 text-cyber-blue' : 
                        index === 2 ? 'bg-cyber-green/20 text-cyber-green' : 'bg-gray-800 text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className="text-sm truncate max-w-[150px]">{meme.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-cyber-pink">{meme.upvotes}</span>
                    <span className="text-xs text-cyber-pink">▲</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400 text-sm p-4 text-center border border-dashed border-gray-700 rounded">
              <div className="mb-2">No trending memes yet</div>
              <div className="text-xs">Create a meme to start the trend</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
