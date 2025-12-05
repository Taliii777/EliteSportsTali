'use client';

import { useEffect } from 'react';

export default function InstagramPublicFeed() {
  useEffect(() => {
    // Cargar el script de Elfsight de forma asíncrona
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar al desmontar
      const existingScript = document.querySelector('script[src*="elfsightcdn.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Widget de Instagram de Elfsight */}
      <div 
        className="elfsight-app-cd2a0a9a-2e72-484f-962a-850fdca15e12" 
        data-elfsight-app-lazy
      />
    </div>
  );
}

