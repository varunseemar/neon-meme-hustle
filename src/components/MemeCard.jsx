
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

const MemeCard = ({ meme }) => {
  const [bidAmount, setBidAmount] = useState(50);
  const { toast } = useToast();
  const { placeBid, voteMeme } = useGlobalState();
  
  const handleBid = () => {
    if (bidAmount <= 0) {
      toast({
        title: "ERROR::BID_FAILED",
        description: "Bid amount must be positive. Hack rejected.",
        variant: "destructive"
      });
      return;
    }
    
    placeBid(meme.id, bidAmount);
    toast({
      title: "BID_CONFIRMED",
      description: `You bid ${bidAmount} credits on "${meme.title}"`,
    });
    setBidAmount(50);
  };
  
  const handleVote = (type) => {
    voteMeme(meme.id, type);
    toast({
      title: type === 'up' ? "UPVOTED.SYS" : "DOWNVOTED.SYS",
      description: `Vote registered for "${meme.title}"`,
    });
  };
  
  return (
    <div className="meme-card flex flex-col transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)]">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/30 to-cyber-pink/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <img 
          src={meme.image_url} 
          alt={meme.title} 
          className="w-full h-52 object-cover border-b border-cyber-blue/30"
          onError={(e) => {
            e.target.src = "https://picsum.photos/200"; // Fallback image
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-20">
          <h3 className="text-lg font-bold text-white glitch-text" data-text={meme.title}>{meme.title}</h3>
        </div>
        
        <div className="absolute top-2 right-2 bg-black/70 rounded-full px-3 py-1 border border-cyber-yellow/50 z-20">
          <span className="text-xs text-cyber-yellow font-mono">#{meme.vibe || 'cyberpunk'}</span>
        </div>
      </div>
      
      <div className="p-4 bg-cyber-darkgray flex-1 flex flex-col gap-3">
        <div className="bg-black/40 p-3 border-l-2 border-cyber-green rounded-r terminal-text text-sm">
          "{meme.caption || 'Initializing neural caption matrix...'}"
        </div>
        
        <div className="flex flex-wrap gap-2 mt-1">
          {meme.tags?.map((tag, i) => (
            <span key={i} className="bg-cyber-dark/80 text-xs px-2 py-1 rounded text-cyber-blue border border-cyber-blue/20">#{tag}</span>
          ))}
        </div>
        
        <div className="text-xs text-right text-gray-400 mt-1">
          Owner: <span className="text-cyber-blue inline-block bg-cyber-dark/50 px-2 py-1 rounded font-mono">{meme.owner_id}</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-3">
          <div className="flex gap-2">
            <button 
              onClick={() => handleVote('up')} 
              className="bg-cyber-blue/20 hover:bg-cyber-blue/40 px-2 py-1 rounded flex items-center gap-1 border border-cyber-blue/30 transition-all"
            >
              <ArrowUp size={16} className="text-cyber-blue" />
              <span className="text-white">{meme.upvotes || 0}</span>
            </button>
            <button 
              onClick={() => handleVote('down')} 
              className="bg-cyber-pink/20 hover:bg-cyber-pink/40 px-2 py-1 rounded border border-cyber-pink/30 transition-all flex items-center gap-1"
            >
              <ArrowDown size={16} className="text-cyber-pink" />
            </button>
          </div>
          
          <div className="text-sm font-mono bg-black/50 px-2 py-1 rounded border border-cyber-green/30">
            {meme.highest_bid ? (
              <span>Top: <span className="text-cyber-green">{meme.highest_bid}¢</span></span>
            ) : (
              <span className="text-gray-400">No bids</span>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-cyber-purple/20">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-cyber-purple" />
            <span className="text-sm text-gray-300">Place Your Bid:</span>
          </div>
          <div className="flex gap-2 w-full">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
              className="bg-black/70 text-white border border-cyber-blue/40 rounded px-2 py-1 text-sm w-24 text-center focus:border-cyber-purple focus:ring focus:ring-cyber-purple/20"
              min="1"
            />
            <button 
              onClick={handleBid}
              className="bg-cyber-purple text-white px-4 py-1 rounded hover:bg-cyber-purple/80 flex-1 transition-all border border-transparent hover:border-white/30 flex items-center justify-center"
            >
              <span>BID NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
