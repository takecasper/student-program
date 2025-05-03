// useBreadcrumbStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  title: string;
  setTitle: (title: string) => void;
};

const initialState: { title: string } = {
  title: '',
};

export const useBreadcrumbStore = create<UserStore>()(
  persist(
    set => ({
      ...initialState,
      setTitle: (title) => set({ title }),
    }),
    {
      name: 'breadcrumbs', // key in localStorage
    },
  ),
);
