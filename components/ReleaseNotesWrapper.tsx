'use client';

import { useState, useEffect } from 'react';
import ReleaseNotesModal from './ReleaseNotesModal';

const CURRENT_VERSION = 'v2.0.0'; // Update this when you have new features
const STORAGE_KEY = 'cyberride-release-notes-seen';

export default function ReleaseNotesWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has seen the current version's release notes
    const seenVersion = localStorage.getItem(STORAGE_KEY);
    
    if (seenVersion !== CURRENT_VERSION) {
      // User hasn't seen this version's notes, show modal after a brief delay
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000); // 1 second delay so the app loads first

      return () => clearTimeout(timer);
    }
    
    setIsLoaded(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
  };

  return <ReleaseNotesModal isOpen={showModal} onClose={handleClose} />;
}
