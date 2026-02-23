import { Link, usePage } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

import CommandPalette from '@/components/command-palette'
import ThemeToggleIcon from '@/components/theme-toggle-icon'

import { Separator } from '@/components/ui/separator'

type NavItem = { href: string; label: string }

type PaletteProject = { title: string; slug: string; tagline?: string | null }
type SharedProps = {
  palette?: {
    projects?: PaletteProject[]
  }
}

export default function SiteLayout({ children }: PropsWithChildren) {
  const page = usePage<SharedProps>()
  const { url } = page
  const paletteProjects = page.props.palette?.projects ?? []

  const nav: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/tech-stack', label: 'Tech Stack' },
    { href: '/contact', label: 'Contact' },
  ]

  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // Close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [url])

  // Close when clicking outside
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!mobileOpen) return
      const target = e.target as Node
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [mobileOpen])

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img
              src="/slcodex-logo.png"
              alt="SLCodex Logo"
              className="h-8 w-8 rounded-xl border object-contain"
            />
            <span>SLCodex</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = url === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'rounded-lg px-3 py-2 text-sm transition',
                    active ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggleIcon />

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {/* Simple icon (no library needed) */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          ref={mobileMenuRef}
          className={[
            'md:hidden',
            mobileOpen ? 'block' : 'hidden',
          ].join(' ')}
        >
          <Separator />
          <nav className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-1">
              {nav.map((item) => {
                const active = url === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'rounded-lg px-3 py-2 text-sm transition',
                      active ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        <Separator />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} SLCodex — Built with Laravel + Inertia + React
        </div>
      </footer>

      {/* Mount command palette globally (Ctrl/Cmd+K or /) */}
      <CommandPalette projects={paletteProjects} />
    </div>
  )
}