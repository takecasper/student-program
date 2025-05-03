// useProgram.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProgramData } from '@/types/program';

type UserStore = {
  program: null | ProgramData;
  setData: (ProgramData: null | ProgramData) => void;
};

const initialState: { program: UserStore['program'] } = {
  program: null,
};

export const useProgram = create<UserStore>()(
  persist(
    set => ({
      ...initialState,
      setData: ProgramData => set({ program: ProgramData }),
    }),
    {
      name: 'program-store', // key in localStorage
    },
  ),
);
