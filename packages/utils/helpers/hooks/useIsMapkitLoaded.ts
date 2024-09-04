import { useEffect, useState } from "react";

// A simple flag to ensure MapKit is only initialized once
let mapKitInitialized = false;

export const useIsMapkitLoaded = ({ token }: { token: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setupMapKitJs = async () => {
      // Check if MapKit has already been initialized
      if (window.mapkit && mapKitInitialized) {
        setIsLoaded(true);
        return;
      }

      console.log("loading mapkit");

      // Wait for the MapKit script to finish loading
      await new Promise(resolve => {
        // @ts-ignore
        window.initMapKit = resolve;
      });

      console.log("loaded mapkit woohoo");

      // Clean up the callback after MapKit is loaded
      // @ts-ignore
      delete window.initMapKit;

      // Initialize MapKit if not already initialized
      if (!mapKitInitialized) {
        mapkit.init({
          authorizationCallback: done => {
            done(token);
          },
        });
        mapKitInitialized = true; // Mark MapKit as initialized
      }

      setIsLoaded(true); // Mark as loaded
    };

    setupMapKitJs();
  }, [token]);

  return isLoaded;
};
