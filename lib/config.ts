/**
 * Global feature flags for the application.
 */
export const FEATURE_FLAGS = {
  /**
   * Toggle global loading indicator & route transition feedback.
   * Can be overridden by setting NEXT_PUBLIC_ENABLE_GLOBAL_LOADING=false in environment variables.
   */
  ENABLE_GLOBAL_LOADING: process.env.NEXT_PUBLIC_ENABLE_GLOBAL_LOADING !== "false",
};
