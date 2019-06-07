import { useMemo } from 'react';

export const useCarouselItem = <T>(source: T[], ...deps: any[]) => useMemo(
  () => source.slice(0, 10),
  [...deps, source]);
