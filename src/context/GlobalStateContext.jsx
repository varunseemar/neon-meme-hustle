
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Sample data - in a real app, this would come from Supabase
const SAMPLE_MEMES = [
  {
    id: '1',
    title: 'Doge HODL',
    image_url: 'https://picsum.photos/seed/doge1/400/300',
    tags: ['crypto', 'funny'],
    upvotes: 69,
    owner_id: 'user_420',
    highest_bid: 500,
    created_at: '2025-05-20T12:00:00Z',
    caption: 'Such gains, much profit, very HODL',
    vibe: 'Diamond Paws Vibes'
  },
  {
    id: '2',
    title: 'Stonks Only Go Up',
    image_url: 'https://picsum.photos/seed/stonks1/400/300',
    tags: ['stonks', 'crypto'],
    upvotes: 42,
    owner_id: 'user_169',
    highest_bid: 300,
    created_at: '2025-05-20T10:30:00Z',
    caption: 'When the line keeps going up and your brain is smooth',
    vibe: 'Moon Mission Madness'
  },
  {
    id: '3',
    title: 'AI Generated My Portfolio',
    image_url: 'https://picsum.photos/seed/ai1/400/300',
    tags: ['ai', 'crypto', 'funny'],
    upvotes: 21,
    owner_id: 'user_314',
    highest_bid: null,
    created_at: '2025-05-20T09:15:00Z',
    caption: "I asked AI to manage my crypto and now I'm living in a box",
    vibe: 'Digital Dystopia'
  }
];

// Mock AI captions - would normally come from Gemini API
const AI_CAPTIONS = [
  "When your crypto goes to the moon but your brain stays on Earth",
  "This is what happens when you YOLO your life savings into memecoins",
  "POV: You just discovered what NFTs are in 2025",
  "Explaining blockchain to your grandma be like",
  "When the dip keeps dipping but you keep buying",
  "Plot twist: The real Web3 was the memes we made along the way"
];

// Mock vibes - would normally come from Gemini API
const AI_VIBES = [
  "Neon Crypto Chaos",
  "Retro Stonks Vibes",
  "Digital Dystopia",
  "Pixel Punk Paradise",
  "Binary Baller",
  "Quantum Meme-tum",
  "Cyber Doge Dreams"
];

// Create context
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial memes
  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setMemes(SAMPLE_MEMES);
      setLoading(false);
    }, 1500);
    
    // Set up fake WebSocket for real-time updates
    const interval = setInterval(() => {
      // Randomly update a meme's upvotes to simulate real-time activity
      if (memes.length > 0) {
        const randomIndex = Math.floor(Math.random() * memes.length);
        const randomChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
        
        setMemes(prevMemes => prevMemes.map((meme, idx) => {
          if (idx === randomIndex) {
            return {
              ...meme,
              upvotes: Math.max(0, meme.upvotes + randomChange)
            };
          }
          return meme;
        }));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Generate a random AI caption and vibe
  const generateAIContent = async () => {
    // In a real app, this would call the Gemini API
    return {
      caption: AI_CAPTIONS[Math.floor(Math.random() * AI_CAPTIONS.length)],
      vibe: AI_VIBES[Math.floor(Math.random() * AI_VIBES.length)]
    };
  };

  // Create a new meme
  const createMeme = async (meme) => {
    try {
      // Simulate API delay
      setLoading(true);
      
      // Generate AI caption and vibe
      const aiContent = await generateAIContent();
      
      const newMeme = {
        ...meme,
        id: Date.now().toString(),
        caption: aiContent.caption,
        vibe: aiContent.vibe,
        upvotes: 0,
        highest_bid: null
      };
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMemes(prevMemes => [newMeme, ...prevMemes]);
      setLoading(false);
      
      return newMeme;
    } catch (error) {
      setLoading(false);
      throw new Error('Failed to create meme');
    }
  };

  // Place a bid on a meme
  const placeBid = (memeId, amount) => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id === memeId) {
        const currentHighest = meme.highest_bid || 0;
        const newHighest = Math.max(currentHighest, amount);
        
        return {
          ...meme,
          highest_bid: newHighest
        };
      }
      return meme;
    }));
  };

  // Vote on a meme
  const voteMeme = (memeId, voteType) => {
    setMemes(prevMemes => prevMemes.map(meme => {
      if (meme.id === memeId) {
        return {
          ...meme,
          upvotes: voteType === 'up' 
            ? meme.upvotes + 1 
            : Math.max(0, meme.upvotes - 1)
        };
      }
      return meme;
    }));
  };

  const value = {
    memes,
    loading,
    createMeme,
    placeBid,
    voteMeme
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
