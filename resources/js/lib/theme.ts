export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

export function getStoredTheme(): ThemeMode {
  const t = localStorage.getItem(STORAGE_KEY)
  if (t === 'light' || t === 'dark' || t === 'system') return t
  return 'system'
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

  const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
  root.classList.toggle('dark', isDark)
}

export function setTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}
