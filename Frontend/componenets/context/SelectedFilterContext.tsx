import React from 'react'

interface SelectedFilterContextValue {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const SelectedFilterContext = React.createContext<SelectedFilterContextValue>({
  selectedFilter: 'All',
  setSelectedFilter: (filter: string) => {}
});

interface SelectedFilterProviderProps {
  children: React.ReactNode;
}

export const SelectedFilterProvider: React.FC<SelectedFilterProviderProps> = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('All');

  return (
    <SelectedFilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </SelectedFilterContext.Provider>
  );
};

export default SelectedFilterContext;