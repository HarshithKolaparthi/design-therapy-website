import { useState, useRef, useEffect } from 'react';
import { HeroLanding } from './components/HeroLanding';
import { TeamForm } from './components/TeamForm';
import { ProblemStatementGrid } from './components/ProblemStatementGrid';
import { SubmitSection } from './components/SubmitSection';
import { ConfirmationPage } from './components/ConfirmationPage';
import { AdminModal } from './components/AdminModal';
import type { AppState, TeamData } from './types';
import { problemStatements as initialStatements } from './data/problemStatements';
import { motion, AnimatePresence } from 'framer-motion';
import { GOOGLE_SCRIPT_URL } from './config';
import { RefreshCcw } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [selectedStatementId, setSelectedStatementId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statements = initialStatements;
  const [takenStatements, setTakenStatements] = useState<string[]>([]);
  
  // Admin State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchTakenStatements = async () => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      if (data && Array.isArray(data.taken)) {
        setTakenStatements(data.taken);
      }
    } catch (error) {
      console.error("Failed to fetch taken statements", error);
    }
  };

  useEffect(() => {
    fetchTakenStatements();
    // Poll every 10 seconds to keep all devices globally synced
    const interval = setInterval(() => {
      fetchTakenStatements();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminReset = async () => {
    if (window.confirm("Are you sure you want to completely RESET the Google Sheet? All selected problems will become available again.")) {
      try {
        if (GOOGLE_SCRIPT_URL) {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: "reset" })
          });
        }
        setTakenStatements([]);
        alert("Statements have been reset and are available for new teams.");
      } catch (error) {
        console.error("Failed to reset", error);
        alert("An error occurred trying to reset the Google Sheet.");
      }
    }
  };

  // Filter out already taken statements (Mocking backend validation/storage)
  const availableStatements = statements.filter(stmt => !takenStatements.includes(stmt.id));

  const handleGetStarted = () => {
    setAppState('FORM');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTeamSubmit = (data: TeamData) => {
    setTeamData(data);
    setAppState('SELECTION');
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSelectStatement = (id: string) => {
    if (appState === 'SELECTION') {
      setSelectedStatementId(prev => prev === id ? null : id);
    }
  };

  const handleFinalSubmit = async () => {
    if (!teamData || !selectedStatementId) return;
    
    setIsSubmitting(true);
    
    // Format data for Google Sheets
    const googleSheetsPayload = {
      teamNumber: teamData.teamNumber,
      participant1Name: teamData.p1.name,
      participant1RegisterNumber: teamData.p1.registerNumber,
      participant2Name: teamData.p2.name,
      participant2RegisterNumber: teamData.p2.registerNumber,
      participant3Name: teamData.p3?.name || '',
      participant3RegisterNumber: teamData.p3?.registerNumber || '',
      participant4Name: teamData.p4?.name || '',
      participant4RegisterNumber: teamData.p4?.registerNumber || '',
      selectedProblemStatement: selectedStatementId
    };

    try {
      if (GOOGLE_SCRIPT_URL) {
        // Send actual request to the Google Apps Script Web App
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Standard bypass for Google Apps Script CORS
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(googleSheetsPayload)
        });
      } else {
        // Mock if URL not yet provided
        console.log("Mocking Google Sheets Submission (No URL provided):", googleSheetsPayload);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } catch (error) {
      console.error("Failed to submit to Google Sheets", error);
    }
    
    // Lock the selected problem statement by adding it to taken (first-come first-serve mechanism)
    setTakenStatements(prev => [...prev, selectedStatementId]);
    
    setIsSubmitting(false);
    setAppState('SUCCESS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    // Reset state for next team registration
    setAppState('LANDING');
    setTeamData(null);
    setSelectedStatementId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get selected problem statement details
  const selectedProblem = statements.find(s => s.id === selectedStatementId);

  if (appState === 'SUCCESS' && teamData && selectedProblem) {
    return (
      <ConfirmationPage 
        teamData={teamData} 
        problem={selectedProblem} 
        onHome={handleBackToHome} 
      />
    );
  }

  return (
    <div className="min-h-screen pb-32 relative">
      <HeroLanding onGetStarted={handleGetStarted} onAdminClick={() => setShowAdminModal(true)} />
      
      <AdminModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)}
        onLogin={() => {
          setIsAdmin(true);
          setShowAdminModal(false);
        }}
      />
      
      {/* Admin Floating Reset Button */}
      {isAdmin && (
        <button
          onClick={handleAdminReset}
          className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg shadow-red-500/20 transition-transform hover:scale-110 flex items-center justify-center group"
          title="Reset All Statements"
        >
          <RefreshCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      )}

      <AnimatePresence>
        {(appState === 'FORM' || appState === 'SELECTION') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-10 pb-20"
            ref={formRef}
          >
            <TeamForm 
              onSubmit={handleTeamSubmit} 
              initialData={teamData || undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === 'SELECTION' && teamData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            ref={gridRef}
            className="pt-10 relative"
          >
            <ProblemStatementGrid 
              statements={availableStatements}
              selectedId={selectedStatementId}
              onSelect={handleSelectStatement}
            />

            <SubmitSection 
              selectedId={selectedStatementId}
              onSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
