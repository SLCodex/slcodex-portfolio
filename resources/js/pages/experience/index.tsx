import { Head } from '@inertiajs/react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import SiteLayout from '@/layouts/site-layout'

type Experience = {
    id: number
    company: string
    role: string
    employment_type?: string | null
    location?: string | null
    is_remote?: boolean
    start_date?: string | null
    end_date?: string | null
    is_current?: boolean
    description?: string | null
    achievements?: string[] | string | null
    tech_used?: string[] | string | null
}

type Props = {
    experiences: Experience[]
}

export default function ExperienceTimeline({ experiences = [] }: Props) {
    return (
        <SiteLayout>
            <Head title="Experience" />

            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Timeline of roles, impact, and the tools I used to ship.
                </p>
            </div>

            <div className="relative">
                {/* vertical line */}
                <div className="absolute left-3 top-0 hidden h-full w-px bg-border md:block" />

                <div className="grid gap-5">
                    {experiences.map((e) => {
                        const tech = normalizeList(e.tech_used)
                        const achievements = normalizeList(e.achievements)

                        return (
                            <div key={e.id} className="grid gap-4 md:grid-cols-[28px_1fr]">
                                {/* dot */}
                                <div className="relative hidden md:block">
                                    <div className="absolute left-0 top-6 h-6 w-6 rounded-full border bg-background shadow-sm" />
                                    <div className="absolute left-[11px] top-[29px] h-2 w-2 rounded-full bg-muted-foreground/60" />
                                </div>

                                <Card className="rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md">
                                    <CardHeader className="space-y-2">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <CardTitle className="text-base">
                                                    {e.role}
                                                    <span className="text-muted-foreground"> — {e.company}</span>
                                                </CardTitle>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {formatDate(e.start_date)} — {e.is_current ? 'Present' : formatDate(e.end_date)}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {e.is_current ? <Badge>Current</Badge> : null}
                                                {e.is_remote ? (
                                                    <Badge variant="secondary">Remote</Badge>
                                                ) : (
                                                    <Badge variant="outline">On-site</Badge>
                                                )}
                                                {e.employment_type ? <Badge variant="outline">{e.employment_type}</Badge> : null}
                                                {e.location ? <Badge variant="outline">{e.location}</Badge> : null}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="grid gap-4 text-sm">
                                        {e.description ? (
                                            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                                                {e.description}
                                            </p>

                                        ) : null}

                                        {/* Achievements */}
                                        {achievements.length ? (
                                            <>
                                                <Separator />
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-foreground/70" />
                                                        <p className="font-medium text-foreground">Key achievements</p>
                                                    </div>

                                                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                                                        {achievements.map((a, idx) => (
                                                            <li key={idx}>{a}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : null}

                                        {/* Tech Stack */}
                                        <Separator />
                                        <div>
                                            <div className="mb-2 flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-foreground/70" />
                                                <p className="font-medium text-foreground">Tech stack</p>
                                            </div>

                                            {tech.length ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {tech.map((t, idx) => (
                                                        <Badge
                                                            key={`${t}-${idx}`}
                                                            variant="secondary"
                                                            className="rounded-xl transition hover:opacity-90"
                                                        >
                                                            {t}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">
                                                    No tech tags yet — add them in Admin → Experiences.
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>

            {!experiences.length ? (
                <p className="mt-8 text-sm text-muted-foreground">Add experience in Admin → Experiences.</p>
            ) : null}
        </SiteLayout>
    )
}

/**
 * Handles:
 * - string[] already
 * - JSON string: '["Laravel","React"]'
 * - comma string: 'Laravel, React'
 */
function normalizeList(value?: string[] | string | null): string[] {
    if (!value) return []
    if (Array.isArray(value)) return value.filter(Boolean)

    const raw = value.trim()
    if (!raw) return []

    // JSON array string
    if (raw.startsWith('[') && raw.endsWith(']')) {
        try {
            const parsed = JSON.parse(raw) as unknown
            if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean)
        } catch {
            // fall through
        }
    }

    // comma-separated
    if (raw.includes(',')) return raw.split(',').map((s) => s.trim()).filter(Boolean)

    return [raw]
}

function formatDate(value?: string | null) {
    if (!value) return '—'
    try {
        const d = new Date(value)
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    } catch {
        return value
    }
}
