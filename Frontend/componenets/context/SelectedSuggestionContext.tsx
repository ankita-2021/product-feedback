import React from 'react'

interface SelectedSuggestionContextValue {
  selectedSuggestionId: string | null;
  setSelectedSuggestionId: (id: string) => void;
}

const SelectedSuggestionContext = React.createContext<SelectedSuggestionContextValue>({
  selectedSuggestionId: null,
  setSelectedSuggestionId: (id: string) => {}
});

interface SelectedSuggestionProviderProps {
  children: React.ReactNode;
}

export const SelectedSuggestionProvider: React.FC<SelectedSuggestionProviderProps> = ({ children }) => {
  const [selectedSuggestionId, setSelectedSuggestionId] = React.useState<string | null>(null);

  return (
    <SelectedSuggestionContext.Provider value={{ selectedSuggestionId, setSelectedSuggestionId }}>
      {children}
    </SelectedSuggestionContext.Provider>
  );
};

export default SelectedSuggestionContext;