// components/ElfsightWidget.js
import { useEffect } from 'react';

const ElfsightWidget = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <div
      className="elfsight-app-161fd76a-eaa0-4c53-9b6a-76e659f0ed0c"
      data-elfsight-app-lazy
    ></div>
  );
};

export default ElfsightWidget;
