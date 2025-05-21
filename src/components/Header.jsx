
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleConnect = () => {
    toast({
      title: "WALLET_CONNECT.EXE",
      description: "Cyberdeck authentication pending... Connection simulated!",
    });
  };

  return (
    <header className="border-b border-cyber-purple/30 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-cyber-pink neon-glow"></div>
        <h1 className="text-2xl font-bold">
          <span className="glitch-text" data-text="MemeHustle">MemeHustle</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="terminal px-3 py-1 hidden md:block">
          <span className="terminal-text text-xs">CREDS: 1337</span>
        </div>
        
        <button 
          onClick={handleConnect}
          className="cyber-button text-sm py-2"
        >
          {isMobile ? 'CONNECT' : 'CONNECT WALLET'}
        </button>
      </div>
    </header>
  );
};

export default Header;
