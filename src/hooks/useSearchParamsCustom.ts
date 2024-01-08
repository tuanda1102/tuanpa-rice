import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useSearchParamsCustom = <T = any>() => {
  const { search } = useLocation();
  return useMemo(() => {
    const urlParams = new URLSearchParams(search);
    return Object.fromEntries(urlParams) as T;
  }, [search]);
};

export default useSearchParamsCustom;
