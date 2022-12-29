import { useEffect, useState } from "react";

export const useIsMapkitLoaded = ({ token }: { token: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const setupMapKitJs = async () => {
      //@ts-ignore
      if (!window.mapkit || window.mapkit.loadedLibraries.length === 0) {
        // mapkit.core.js or the libraries are not isLoaded yet.
        // Set up the callback and wait for it to be called.
        await new Promise(resolve => {
          //@ts-ignore
          window.initMapKit = resolve;
        });

        // Clean up
        //@ts-ignore
        delete window.initMapKit;
      }

      mapkit.init({
        authorizationCallback: done => {
          done(token);
        },
      });
    };

    const main = async () => {
      await setupMapKitJs();
      setIsLoaded(true);
    };

    main();
  }, [isLoaded]);

  return isLoaded;
};
