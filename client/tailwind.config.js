import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ daisyui ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#007A33",       // NSBE Green (represents growth/progress)
          "secondary": "#D22730",     // NSBE Red (represents sacrifice/heritage)
          "accent": "#FDB913",        // NSBE Gold (represents excellence/aspiration)
          "neutral": "#1F2937",       // Dark gray for content contrast
          "base-100": "#FFFFFF",      // White background for clean UI
          "info": "#2563EB",          // Modern blue for links/info
          "success": "#22C55E",       // Light green for success messages
          "warning": "#FACC15",       // Bright gold for warnings
          "error": "#DC2626",         // Deep red for errors
        }
      },
      {
        mytheme_dark: {
          "primary": "#22C55E",      // Bright NSBE green for vibrancy in dark mode
          "secondary": "#EF4444",    // Lighter red for contrast
          "accent": "#FBBF24",       // Golden yellow for highlights
          "neutral": "#1F2937",      // Dark gray for content backgrounds
          "base-100": "#111827",     // Very dark blue-gray as the main background
          "info": "#3B82F6",         // Standard blue for links/info
          "success": "#16A34A",      // Vibrant green for success
          "warning": "#FACC15",      // Bright yellow for alerts
          "error": "#DC2626",        // Strong red for errors
        }
      }
    ],
  },
}

