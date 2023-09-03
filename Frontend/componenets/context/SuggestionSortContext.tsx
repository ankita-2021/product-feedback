import React from 'react';

interface SuggestionsSortContextValue {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const SuggestionsSortContext = React.createContext<SuggestionsSortContextValue>({
  selectedSort: 'Most Upvotes',
  setSelectedSort: (sort: string) => {},
});

interface SuggestionsSortProviderProps {
  children: React.ReactNode;
}

export const SuggestionsSortProvider: React.FC<SuggestionsSortProviderProps> = ({ children }) => {
  const [selectedSort, setSelectedSort] = React.useState<string>('Most Upvotes');

  return (
    <SuggestionsSortContext.Provider value={{ selectedSort, setSelectedSort }}>
      {children}
    </SuggestionsSortContext.Provider>
  );
};

export default SuggestionsSortContext;