// src/components/ui/button.js
export function Button({ children, className, ...props }) {
          return (
            <button className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`} {...props}>
              {children}
            </button>
          );
        }
        