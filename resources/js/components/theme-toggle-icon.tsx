import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

// If your starter kit already includes lucide-react (most shadcn setups do)
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  return prefersDark ? 'dark' : 'light'
}

export default function ThemeToggleIcon() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    apply(t)
    setMounted(true)
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
  }

  // prevents hydration flicker
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
