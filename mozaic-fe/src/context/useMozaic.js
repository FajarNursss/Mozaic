import { useContext } from 'react';
import { MozaicContext } from './mozaicContextDef';

export function useMozaic() {
  const context = useContext(MozaicContext);
  if (!context) {
    throw new Error('useMozaic harus digunakan di dalam MozaicProvider');
  }
  return context;
}
