import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

interface University {
  id: string;
  name: string;
  location: string;
  country: string;
}

interface UniversitySelectorProps {
  onSelect: (university: University) => void;
  selectedUniversity?: University | null;
  className?: string;
}

const universities: University[] = [
  { id: '1', name: 'University of Lagos', location: 'Lagos', country: 'Nigeria' },
  { id: '2', name: 'University of Ibadan', location: 'Ibadan', country: 'Nigeria' },
  { id: '3', name: 'Covenant University', location: 'Ota', country: 'Nigeria' },
  { id: '4', name: 'Obafemi Awolowo University', location: 'Ile-Ife', country: 'Nigeria' },
  { id: '5', name: 'Ahmadu Bello University', location: 'Zaria', country: 'Nigeria' },
  { id: '6', name: 'University of Nigeria', location: 'Nsukka', country: 'Nigeria' },
  { id: '7', name: 'Federal University of Technology', location: 'Akure', country: 'Nigeria' },
  { id: '8', name: 'University of Port Harcourt', location: 'Port Harcourt', country: 'Nigeria' },
  { id: '9', name: 'Bayero University', location: 'Kano', country: 'Nigeria' },
  { id: '10', name: 'University of Calabar', location: 'Calabar', country: 'Nigeria' },
  { id: '11', name: 'University of Ghana', location: 'Accra', country: 'Ghana' },
  { id: '12', name: 'Kwame Nkrumah University', location: 'Kumasi', country: 'Ghana' },
  { id: '13', name: 'University of Cape Town', location: 'Cape Town', country: 'South Africa' },
  { id: '14', name: 'University of the Witwatersrand', location: 'Johannesburg', country: 'South Africa' },
  { id: '15', name: 'Makerere University', location: 'Kampala', country: 'Uganda' },
];

const UniversitySelector: React.FC<UniversitySelectorProps> = ({
  onSelect,
  selectedUniversity,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (university: University) => {
    onSelect(university);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-bg-tertiary rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors duration-200"
      >
        <span className="text-text-primary">
          {selectedUniversity ? selectedUniversity.name : 'Select your university'}
        </span>
        <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-bg-tertiary rounded-lg shadow-lg z-50 max-h-80 overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-3 border-b border-bg-tertiary">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-bg-tertiary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* University List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
                <button
                  key={university.id}
                  onClick={() => handleSelect(university)}
                  className="w-full px-4 py-3 text-left hover:bg-bg-tertiary transition-colors duration-200 border-b border-bg-tertiary last:border-b-0"
                >
                  <div className="text-text-primary font-medium">
                    {university.name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {university.location}, {university.country}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-text-muted">
                No universities found
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UniversitySelector;
