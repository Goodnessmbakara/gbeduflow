import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Star, Plus, Search, BarChart } from 'lucide-react';
import { useArtistStore } from '../stores/artistStore';
import { useAuthStore } from '../stores/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import VibeCheckForm from '../components/forms/VibeCheckForm';

const Dashboard: React.FC = () => {
  const { artists, getTopArtists } = useArtistStore();
  const { user } = useAuthStore();
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [showVibeCheck, setShowVibeCheck] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for demonstration
    const mockArtists = [
      {
        id: '1',
        name: 'Burna Boy',
        aehScore: 95,
        ldsScore: 88,
        aeiScore: 92,
        university: 'University of Lagos',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        name: 'Wizkid',
        aehScore: 92,
        ldsScore: 85,
        aeiScore: 89,
        university: 'University of Ibadan',
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z',
      },
      {
        id: '3',
        name: 'Davido',
        aehScore: 89,
        ldsScore: 82,
        aeiScore: 87,
        university: 'Covenant University',
        createdAt: '2024-01-13T10:00:00Z',
        updatedAt: '2024-01-13T10:00:00Z',
      },
      {
        id: '4',
        name: 'Tems',
        aehScore: 87,
        ldsScore: 79,
        aeiScore: 85,
        university: 'University of Lagos',
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z',
      },
      {
        id: '5',
        name: 'Asake',
        aehScore: 85,
        ldsScore: 88,
        aeiScore: 83,
        university: 'Obafemi Awolowo University',
        createdAt: '2024-01-11T10:00:00Z',
        updatedAt: '2024-01-11T10:00:00Z',
      },
    ];

    // Set mock data if no artists exist
    if (artists.length === 0) {
      useArtistStore.getState().setArtists(mockArtists);
    }
  }, [artists.length]);

  const topArtists = getTopArtists(10);
  const filteredArtists = topArtists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVibeCheck = (artist: any) => {
    setSelectedArtist(artist);
    setShowVibeCheck(true);
  };

  const handleVibeCheckSuccess = () => {
    setShowVibeCheck(false);
    setSelectedArtist(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent-secondary';
    if (score >= 70) return 'text-accent-primary';
    if (score >= 50) return 'text-accent-warning';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-accent-secondary/10';
    if (score >= 70) return 'bg-accent-primary/10';
    if (score >= 50) return 'bg-accent-warning/10';
    return 'bg-red-400/10';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-text-secondary">
            Discover the hottest Afrobeats artists and track their AEHI scores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Total Artists</p>
                <p className="text-2xl font-bold text-text-primary">{artists.length}</p>
              </div>
              <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Campus Partners</p>
                <p className="text-2xl font-bold text-text-primary">25+</p>
              </div>
              <div className="w-12 h-12 bg-accent-secondary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-secondary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Vibe Checks</p>
                <p className="text-2xl font-bold text-text-primary">1,247</p>
              </div>
              <div className="w-12 h-12 bg-accent-warning/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-warning" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">Active Students</p>
                <p className="text-2xl font-bold text-text-primary">500+</p>
              </div>
              <div className="w-12 h-12 bg-chart-line-3/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-line-3" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => window.location.href = '#analytics'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart className="w-4 h-4" />
              Analytics
            </Button>
            <Button
              onClick={() => window.location.href = '#artists/register'}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Artist
            </Button>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover onClick={() => handleVibeCheck(artist)}>
                <div className="space-y-4">
                  {/* Artist Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-text-primary">
                      {artist.name}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(artist.aehScore)} ${getScoreColor(artist.aehScore)}`}>
                      #{index + 1}
                    </div>
                  </div>

                  {/* AEHI Score */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-primary mb-1">
                      {artist.aehScore}
                    </div>
                    <div className="text-sm text-text-muted">AEHI Score</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-accent-secondary">
                        {artist.ldsScore}
                      </div>
                      <div className="text-xs text-text-muted">LDS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-chart-line-3">
                        {artist.aeiScore}
                      </div>
                      <div className="text-xs text-text-muted">AEI</div>
                    </div>
                  </div>

                  {/* University */}
                  <div className="text-center">
                    <div className="text-sm text-text-muted">
                      {artist.university}
                    </div>
                  </div>

                  {/* Vibe Check Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVibeCheck(artist);
                    }}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Vibe Check
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No artists found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search or add a new artist
            </p>
            <Button onClick={() => window.location.href = '/artists/register'}>
              Add Artist
            </Button>
          </div>
        )}
      </div>

      {/* Vibe Check Modal */}
      {showVibeCheck && selectedArtist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <VibeCheckForm
              artist={selectedArtist}
              onSuccess={handleVibeCheckSuccess}
            />
            <button
              onClick={() => setShowVibeCheck(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
