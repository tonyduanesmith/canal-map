import { useEffect, useState } from "react";

let mapkitLoaded = false;
let mapkitLoadPromise: Promise<void> | null = null;

declare global {
  interface Window {
    mapkit: any;
  }
}

type UseIsMapkitLoadedProps = {
  token: string;
};

export const useIsMapkitLoaded = ({ token }: UseIsMapkitLoadedProps): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setupMapKitJs = async () => {
      if (mapkitLoaded) {
        setIsLoaded(true);
        return;
      }

      if (mapkitLoadPromise) {
        await mapkitLoadPromise;
        setIsLoaded(true);
        return;
      }

      mapkitLoadPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
        script.async = true;

        script.onload = () => {
          try {
            window.mapkit.init({
              authorizationCallback: (done: (token: string) => void) => {
                done(token);
              },
            });

            mapkitLoaded = true;
          } catch (error) {
            reject(error);
          }
        };

        script.onerror = error => {
          reject(new Error(`Failed to load MapKit script: ${error}`));
        };

        document.head.appendChild(script);
      });

      try {
        await mapkitLoadPromise;
        setIsLoaded(true);
      } catch (error) {
        console.error("Error initializing MapKit:", error);
      }
    };

    setupMapKitJs();
  }, [token]);

  return isLoaded;
};
