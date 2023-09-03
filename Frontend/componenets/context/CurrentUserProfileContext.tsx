import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

interface UserProfile {
  id: string;
  full_name: string;
  tag: string;
}

interface CurrentUserProfileContextProps {
  userProfile: UserProfile | null;
  // You can add more functions here if needed
}

const CurrentUserProfileContext = createContext<CurrentUserProfileContextProps>({
  userProfile: null,
});

export const useCurrentUserProfile = () => useContext(CurrentUserProfileContext);

interface CurrentUserProfileProviderProps {
  children: ReactNode;
}

export const CurrentUserProfileProvider: React.FC<CurrentUserProfileProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  // Fetch the user profile by user ID
  useEffect(() => {
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', userId);

        if (error) {
          console.error("An error occurred:", error);
          return;
        }

        if (data && data.length > 0) {
          setUserProfile(data[0]);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    // Check if user ID is defined
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [supabase, user?.id]); // Include user?.id in the dependency array

  return (
    <CurrentUserProfileContext.Provider value={{ userProfile }}>
      {children}
    </CurrentUserProfileContext.Provider>
  );
};