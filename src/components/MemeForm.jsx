
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useGlobalState } from '@/context/GlobalStateContext';

const DEFAULT_TAGS = ['crypto', 'funny', 'doge', 'stonks', 'nft', 'cat', 'ai'];

const MemeForm = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const { createMeme } = useGlobalState();

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "ERROR::MISSING_TITLE",
        description: "Your meme needs a title to exist in cyberspace.",
        variant: "destructive"
      });
      return;
    }
    
    const finalImageUrl = imageUrl.trim() || `https://picsum.photos/seed/${Math.random()}/400/300`;
    
    const newMeme = {
      title,
      image_url: finalImageUrl,
      tags: selectedTags.length > 0 ? selectedTags : ['random'],
      upvotes: 0,
      owner_id: 'user_' + Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString()
    };
    
    try {
      await createMeme(newMeme);
      
      setTitle('');
      setImageUrl('');
      setSelectedTags([]);
      setIsVisible(false);
      
      toast({
        title: "MEME_DEPLOYED.EXE",
        description: "Your meme has been uploaded to the cyberweb!"
      });
    } catch (err) {
      toast({
        title: "ERROR::UPLOAD_FAILED",
        description: "Failed to upload meme to the mainframe.",
        variant: "destructive"
      });
    }
  };

  if (!isVisible) {
    return (
      <div className="flex justify-center mb-6">
        <button 
          onClick={() => setIsVisible(true)}
          className="cyber-button relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-cyber-pink/20 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          <span className="relative z-10 flex items-center">
            <span className="mr-2">+</span> CREATE MEME
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="border border-cyber-purple/50 rounded-lg overflow-hidden bg-gradient-to-br from-cyber-darkgray to-cyber-dark/90 shadow-lg shadow-cyber-purple/10">
      <div className="bg-cyber-darkgray border-b border-cyber-purple/30">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-bold text-cyber-pink flex items-center">
            <span className="text-xl mr-2">+</span> CREATE NEW MEME
          </h2>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white bg-black/30 px-3 py-1 rounded"
          >
            [ CLOSE ]
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-cyber-blue mb-1 font-mono">TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter meme title"
              className="w-full bg-cyber-dark/80 border border-cyber-blue/40 rounded p-2 focus:border-cyber-blue focus:outline-none focus:ring-1 focus:ring-cyber-blue/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm text-cyber-blue mb-1 font-mono">IMAGE URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg (will use random if empty)"
              className="w-full bg-cyber-dark/80 border border-cyber-blue/40 rounded p-2 focus:border-cyber-blue focus:outline-none focus:ring-1 focus:ring-cyber-blue/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm text-cyber-blue mb-2 font-mono">TAGS</label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-cyber-purple text-white border border-white/30'
                      : 'bg-cyber-dark/80 text-gray-400 hover:bg-cyber-purple/20 border border-cyber-purple/30'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-cyber-purple/20">
            <button
              type="submit"
              className="cyber-button relative overflow-hidden group px-10"
            >
              <span className="absolute inset-0 bg-cyber-pink/20 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <span className="relative z-10">DEPLOY MEME</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemeForm;
