import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark mode as per plan
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update the HTML class for Tailwind dark mode
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) =>
        set(() => {
          // Update the HTML class for Tailwind dark mode
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme };
        }),
    }),
    {
      name: 'emergency-master-theme',
    }
  )
);

// Initialize theme on app load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('emergency-master-theme');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      if (state?.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // Default to dark mode
      document.documentElement.classList.add('dark');
    }
  } else {
    // Default to dark mode
    document.documentElement.classList.add('dark');
  }
}
