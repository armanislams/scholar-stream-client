import { useEffect } from "react";
import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

export const initAnalytics = () => {
  if (!initialized && POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
    });
    initialized = true;
  }
};

const useAnalytics = () => {
  useEffect(() => {
    initAnalytics();
  }, []);

  const trackEvent = (name, properties = {}) => {
    if (!initialized) return;
    posthog.capture(name, properties);
  };

  return { trackEvent };
};

export default useAnalytics;

