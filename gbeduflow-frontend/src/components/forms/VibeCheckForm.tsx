import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Video, MessageCircle, Send } from 'lucide-react';
import { useArtistStore } from '../../stores/artistStore';
import { useAuthStore } from '../../stores/authStore';

interface VibeCheckFormProps {
  artist: {
    id: string;
    name: string;
    aehScore: number;
  };
  onSuccess?: () => void;
}

const VibeCheckForm: React.FC<VibeCheckFormProps> = ({ artist, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addVibeCheck } = useArtistStore();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || rating === 0) return;

    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newVibeCheck = {
        id: Date.now().toString(),
        artistId: artist.id,
        studentId: user.id,
        rating,
        videoUrl: videoUrl.trim() || undefined,
        comment: comment.trim() || undefined,
        university: user.university || 'Unknown',
        createdAt: new Date().toISOString(),
      };

      addVibeCheck(newVibeCheck);
      onSuccess?.();
      
      // Reset form
      setRating(0);
      setComment('');
      setVideoUrl('');
    } catch (error) {
      console.error('Error submitting vibe check:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Not feeling it';
      case 2: return 'Meh';
      case 3: return 'It\'s okay';
      case 4: return 'Pretty good';
      case 5: return 'Fire! 🔥';
      default: return 'Rate this artist';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return 'text-red-400';
    if (rating === 3) return 'text-yellow-400';
    return 'text-accent-secondary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Vibe Check
        </h2>
        <p className="text-text-secondary">
          How do you feel about <span className="font-semibold text-accent-primary">{artist.name}</span>?
        </p>
        <div className="mt-2 text-sm text-text-muted">
          Current AEHI Score: <span className="font-semibold text-accent-primary">{artist.aehScore}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-secondary rounded-full p-1"
              >
                <Star
                  className={`w-8 h-8 transition-colors duration-200 ${
                    star <= rating
                      ? 'fill-current text-accent-primary'
                      : 'text-bg-tertiary hover:text-accent-primary/50'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className={`text-lg font-medium ${getRatingColor(rating)}`}>
            {getRatingText(rating)}
          </p>
        </div>

        {/* Comment Section */}
        <div>
          <label className="label block mb-2 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Comment (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this artist..."
            rows={3}
            className="input w-full resize-none"
          />
        </div>

        {/* Video Section */}
        <div>
          <label className="label block mb-2 flex items-center gap-2">
            <Video className="w-4 h-4" />
            Hype Video (Optional)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Link to a video of you vibing to their music"
            className="input w-full"
          />
          <p className="text-xs text-text-muted mt-1">
            Share a TikTok, Instagram Reel, or YouTube Short
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          whileHover={{ scale: rating !== 0 && !isSubmitting ? 1.02 : 1 }}
          whileTap={{ scale: rating !== 0 && !isSubmitting ? 0.98 : 1 }}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Submit Vibe Check
            </div>
          )}
        </motion.button>
      </form>

      {/* Success Message */}
      {rating > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-accent-secondary/10 border border-accent-secondary/20 rounded-lg"
        >
          <p className="text-sm text-accent-secondary text-center">
            Your vibe check will help calculate the artist's Local Demand Score (LDS)!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VibeCheckForm;
