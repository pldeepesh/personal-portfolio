export type PagePresentationMode = 'immersive' | 'reading' | 'tool';
export type StagePreset = 'home' | 'work' | 'writing' | 'labs' | 'about' | 'contact' | 'reading' | 'tool' | 'default';
export type HeroDensity = 'feature' | 'balanced' | 'calm';

export type PageShellConfig = {
  mode: PagePresentationMode;
  stagePreset: StagePreset;
  heroDensity: HeroDensity;
  enableScene: boolean;
};

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getPageShellConfig(pathname: string): PageShellConfig {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === '/') {
    return { mode: 'immersive', stagePreset: 'home', heroDensity: 'feature', enableScene: true };
  }

  if (normalizedPath === '/work/') {
    return { mode: 'immersive', stagePreset: 'work', heroDensity: 'feature', enableScene: true };
  }

  if (normalizedPath.startsWith('/work/')) {
    return { mode: 'immersive', stagePreset: 'work', heroDensity: 'balanced', enableScene: true };
  }

  if (normalizedPath === '/blog/' || normalizedPath === '/topics/') {
    return { mode: 'immersive', stagePreset: 'writing', heroDensity: 'balanced', enableScene: true };
  }

  if (normalizedPath.startsWith('/blog/') || normalizedPath.startsWith('/topics/')) {
    return { mode: 'reading', stagePreset: 'reading', heroDensity: 'calm', enableScene: false };
  }

  if (normalizedPath === '/products/') {
    return { mode: 'immersive', stagePreset: 'labs', heroDensity: 'feature', enableScene: true };
  }

  if (normalizedPath.startsWith('/products/')) {
    return { mode: 'tool', stagePreset: 'tool', heroDensity: 'calm', enableScene: false };
  }

  if (normalizedPath === '/about/') {
    return { mode: 'immersive', stagePreset: 'about', heroDensity: 'balanced', enableScene: true };
  }

  if (normalizedPath === '/contact/') {
    return { mode: 'immersive', stagePreset: 'contact', heroDensity: 'balanced', enableScene: true };
  }

  return { mode: 'immersive', stagePreset: 'default', heroDensity: 'balanced', enableScene: true };
}
