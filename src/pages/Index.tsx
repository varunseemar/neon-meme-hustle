
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MemeForm from '@/components/MemeForm';
import MemeGrid from '@/components/MemeGrid';
import Leaderboard from '@/components/Leaderboard';
import TerminalText from '@/components/TerminalText';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Hide intro after 5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyber-dark to-black">
      <Header />
      
      <main className="flex-1 container py-8 px-4 sm:px-6">
        {showIntro && (
          <div className="mb-8 terminal p-4">
            <TerminalText text=">> INITIALIZING MEMEHUSTLE MARKETPLACE v1.0... WELCOME TO THE NEON UNDERGROUND" />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-cyber-darkgray/70 backdrop-blur-sm rounded-lg shadow-lg border border-cyber-purple/30 p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span className="text-cyber-blue">MEME</span>
                <span className="text-cyber-pink">HUSTLE</span>
                <span className="text-gray-400 text-sm ml-2">v1.0</span>
              </h1>
              <MemeForm />
            </div>
            
            <MemeGrid />
          </div>
          
          <div className="space-y-8">
            <div className="sticky top-4">
              <Leaderboard />
              
              <div className="mt-6 border border-cyber-pink/30 rounded-lg overflow-hidden bg-cyber-darkgray/70 backdrop-blur-sm shadow-lg">
                <h3 className="font-bold text-cyber-pink p-4 border-b border-cyber-pink/30">MARKET STATS</h3>
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Traders:</span>
                    <span className="terminal-text">1337</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Memes Traded:</span>
                    <span className="terminal-text">42,069</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Volume:</span>
                    <span className="terminal-text">9,000,000 C</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-black/40 text-xs text-gray-400 border-t border-white/5">
                  <p>NOTE: This is a hackathon project with mock data. No real transactions are taking place.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-cyber-purple/30 py-4 px-6 text-center text-sm text-gray-500 bg-cyber-darkgray/50 backdrop-blur-sm">
        <p>MemeHustle - A Cyberpunk Meme Marketplace - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
