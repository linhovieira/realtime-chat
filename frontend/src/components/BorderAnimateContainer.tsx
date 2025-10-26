import type { CSSProperties, ReactNode } from 'react';

interface BorderAnimateContainerProps {
   children: ReactNode;
}

function BorderAnimateContainer({ children }: BorderAnimateContainerProps) {
   const containerStyle: CSSProperties = {
      '--border-angle': '0deg',
      background: `linear-gradient(45deg, #172033, #1e293b 50%, #172033) padding-box, conic-gradient(from var(--border-angle), rgb(71 85 105 / 0.48) 80%, rgb(6 182 212) 86%, rgb(103 232 249) 90%, rgb(6 182 212) 94%, rgb(71 85 105 / 0.48)) border-box`.trim(),
      animation: 'border-spin 3s linear infinite'
   } as CSSProperties;
   return (
      <div className="w-full h-full rounded-2xl border border-transparent animate-border-spin flex overflow-hidden" style={containerStyle}>
         { children }
      </div>
   );
}

export default BorderAnimateContainer;