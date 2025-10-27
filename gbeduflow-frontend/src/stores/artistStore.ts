import { create } from 'zustand';

export interface Artist {
  id: string;
  name: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  aehScore: number;
  ldsScore: number;
  aeiScore: number;
  university?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VibeCheck {
  id: string;
  artistId: string;
  studentId: string;
  rating: number;
  videoUrl?: string;
  comment?: string;
  university: string;
  createdAt: string;
}

export interface AEHICluster {
  id: string;
  name: string;
  keywords: string[];
  artistCount: number;
  description: string;
}

interface ArtistState {
  artists: Artist[];
  vibeChecks: VibeCheck[];
  clusters: AEHICluster[];
  isLoading: boolean;
  error: string | null;
  selectedArtist: Artist | null;
}

interface ArtistActions {
  setArtists: (artists: Artist[]) => void;
  addArtist: (artist: Artist) => void;
  updateArtist: (id: string, updates: Partial<Artist>) => void;
  setVibeChecks: (vibeChecks: VibeCheck[]) => void;
  addVibeCheck: (vibeCheck: VibeCheck) => void;
  setClusters: (clusters: AEHICluster[]) => void;
  setSelectedArtist: (artist: Artist | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTopArtists: (limit?: number) => Artist[];
  getArtistsByUniversity: (university: string) => Artist[];
  getVibeChecksByArtist: (artistId: string) => VibeCheck[];
}

type ArtistStore = ArtistState & ArtistActions;

export const useArtistStore = create<ArtistStore>((set, get) => ({
  // Initial state
  artists: [],
  vibeChecks: [],
  clusters: [],
  isLoading: false,
  error: null,
  selectedArtist: null,

  // Actions
  setArtists: (artists: Artist[]) => {
    set({ artists });
  },

  addArtist: (artist: Artist) => {
    set((state) => ({
      artists: [...state.artists, artist],
    }));
  },

  updateArtist: (id: string, updates: Partial<Artist>) => {
    set((state) => ({
      artists: state.artists.map((artist) =>
        artist.id === id ? { ...artist, ...updates } : artist
      ),
    }));
  },

  setVibeChecks: (vibeChecks: VibeCheck[]) => {
    set({ vibeChecks });
  },

  addVibeCheck: (vibeCheck: VibeCheck) => {
    set((state) => ({
      vibeChecks: [...state.vibeChecks, vibeCheck],
    }));
  },

  setClusters: (clusters: AEHICluster[]) => {
    set({ clusters });
  },

  setSelectedArtist: (artist: Artist | null) => {
    set({ selectedArtist: artist });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  // Computed values
  getTopArtists: (limit = 10) => {
    const { artists } = get();
    return artists
      .sort((a, b) => b.aehScore - a.aehScore)
      .slice(0, limit);
  },

  getArtistsByUniversity: (university: string) => {
    const { artists } = get();
    return artists.filter((artist) => artist.university === university);
  },

  getVibeChecksByArtist: (artistId: string) => {
    const { vibeChecks } = get();
    return vibeChecks.filter((check) => check.artistId === artistId);
  },
}));
