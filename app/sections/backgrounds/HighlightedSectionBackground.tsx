/**
 * HighlightedSectionBackground
 *
 * Renders a decorative background for highlighted sections with:
 * - A gradient background with blur effect for a glass-like appearance
 * - Subtle highlight lines at the top and bottom edges
 *
 * Used to visually distinguish important sections from the rest of the page
 * while maintaining the overall design language of the application.
 */
export function HighlightedSectionBackground() {
  return (
    <>
      {/* Main background with glass effect - dark gradient with blur for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/90 via-[#0a2535]/85 to-[#121212]/90 backdrop-blur-md -z-10"></div>

      {/* Top edge highlight - creates subtle separation with a thin light line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Bottom edge highlight - mirrors the top highlight for visual balance */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </>
  );
}
