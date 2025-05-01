// useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserDetails = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  address: string;
  type: 'program_experience' | 'student';
};

type UserStore = {
  clearUser: () => void;
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
};

const initialState: { user: UserDetails | null } = {
  user: {
    id: '0',
    name: 'Guest',
    avatar: '/avatar.png',
    address: 'Toronto, Canada',
    type: 'program_experience',
    email: 'program_exp@aculty.com',
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...initialState,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // key in localStorage
      partialize: state => ({ user: state.user }), // only persist user
    },
  ),
);
