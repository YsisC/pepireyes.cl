// components/useProducts.tsx
import { useState,  useEffect } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { pepireyesApi } from '../axiosApi';



export const useOpenLocal = () => {
    const[openLocal , setOpenLocal] = useState(false)

    function verificarEstadoDeTienda() {
        const ahora = new Date();
        const horaActual = ahora.getHours();
        const minutosActuales = ahora.getMinutes();
      
        // Si la hora actual es mayor o igual a 15:00 (3:00 PM)
        // y menor que 00:00 (medianoche) o igual a 00:00
        if ((horaActual > 15 || (horaActual === 15 && minutosActuales >= 0)) && (horaActual < 24 || (horaActual === 0 && minutosActuales === 0))) {
          setOpenLocal(true);
          return openLocal;
        } 
        return openLocal
      }

  return {
   openLocal,
   verificarEstadoDeTienda,
  };
};
