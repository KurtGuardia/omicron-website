'use client';
import {createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction} from 'react';
const MenuContext = createContext<{menuOpen: boolean; setMenuOpen: Dispatch<SetStateAction<boolean>>} | null>(null);
export function MobileMenuState({children}: {children: ReactNode}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <MenuContext.Provider value={{menuOpen, setMenuOpen}}>{children}</MenuContext.Provider>;
}
export function useMobileMenuState() {
  const state = useContext(MenuContext);
  if (!state) throw new Error('Mobile menu requires its shared state provider');
  return state;
}
