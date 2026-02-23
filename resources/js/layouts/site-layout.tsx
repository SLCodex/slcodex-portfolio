import { Link, usePage } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'

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
                        {/* <Button asChild size="sm" variant="outline">
                            <Link href="/projects">View Projects</Link>
                        </Button> */}
                    </div>
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
