/**
 * Zone.js Konfiguration für iOS Safari Scroll-Performance.
 *
 * Muss BEVOR zone.js geladen werden (siehe angular.json polyfills-Reihenfolge).
 *
 * Problem: Auf iOS Safari blockierte Angular's zone.js den Compositor während
 * Momentum-Scroll. Touch-Events wurden ignoriert, weil zone.js bei jedem rAF
 * (~60x/sec) zwischen iOS Compositor und JavaScript synchronisierte.
 *
 * Fix: Event-Listener werden als passive registriert + zone.js patcht
 * requestAnimationFrame und Observer-APIs nicht mehr.
 */
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['touchstart', 'touchmove', 'wheel', 'scroll'];
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_IntersectionObserver = true;
(window as any).__Zone_disable_MutationObserver = true;
(window as any).__Zone_disable_ResizeObserver = true;
(window as any).__Zone_disable_PerformanceObserver = true;
(window as any).__Zone_disable_geolocation = true;
(window as any).__Zone_disable_canvas = true;
(window as any).__Zone_disable_FileReader = true;
