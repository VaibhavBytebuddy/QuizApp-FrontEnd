// src/components/ui/card.js
export function Card({ children, className }) {
          return <div className={`p-4 shadow-lg rounded bg-white ${className}`}>{children}</div>;
        }
        
        export function CardContent({ children }) {
          return <div className="p-4">{children}</div>;
        }
        