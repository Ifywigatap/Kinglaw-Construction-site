import React from "react";
import { Link, useMatches } from "react-router-dom";

export default function Breadcrumbs({ dynamicTitle }) {
  const matches = useMatches();

  // Filter matches that have a breadcrumb handle defined
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.breadcrumb))
    .map((match) => {
      const label = typeof match.handle.breadcrumb === "function"
        ? match.handle.breadcrumb(match)
        : match.handle.breadcrumb;
      
      return {
        label: label,
        path: match.pathname,
      };
    });

  // Always start with Home
  const allCrumbs = [{ label: "Home", path: "/" }, ...crumbs];

  return (
    <>
      {/* Screen Version - Interactive navigation hidden in print */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 no-print transition-colors duration-300">
        {allCrumbs.map((crumb, index) => {
          const isLast = index === allCrumbs.length - 1;
          const label = (isLast && dynamicTitle) ? dynamicTitle : crumb.label;

          return (
            <React.Fragment key={index}>
              {index > 0 && <span className="opacity-40">/</span>}
              {isLast ? (
                <span className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-[150px] sm:max-w-xs">
                  {label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="hover:text-amber-500 transition-colors capitalize whitespace-nowrap"
                >
                  {typeof label === 'string' ? label.replace(/-/g, ' ') : label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Print Version - Simplified text trail visible only on paper/PDF */}
      <div className="hidden print:block text-[10pt] text-slate-600 mb-6 border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-900 mr-2 uppercase text-[8pt] tracking-wider">Property Path:</span>
        {allCrumbs.map((crumb, index) => {
          const isLast = index === allCrumbs.length - 1;
          const label = (isLast && dynamicTitle) ? dynamicTitle : crumb.label;
          const formattedLabel = typeof label === 'string' ? label.replace(/-/g, ' ') : label;
          return (
            <span key={index}>
              {index > 0 && " \u00BB "}
              <span className={isLast ? "font-bold text-slate-900" : ""}>
                {formattedLabel}
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
}