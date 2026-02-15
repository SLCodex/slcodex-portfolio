import { Head, Link } from '@inertiajs/react'
import { Github, Linkedin, Mail, Facebook, Youtube, Twitter, ArrowRight, CheckCircle2 } from 'lucide-react'

import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import SiteLayout from '@/layouts/site-layout'

type Skill = { id: number; name: string; level?: number }
type Project = { id: number; title: string; slug: string; tagline?: string; skills?: Skill[] }

type Socials = {
  github?: string | null
  linkedin?: string | null
  facebook?: string | null
  youtube?: string | null
  x?: string | null
  email?: string | null
}

type Profile = {
  name?: string | null
  headline?: string | null
  summary?: string | null
  resume_url?: string | null
  avatar_url?: string | null
  socials?: Socials | null
}

type Props = {
  profile: Profile | null
  featuredProjects: Project[]
  featuredSkills: Skill[]
}

export default function Home({ profile, featuredProjects = [], featuredSkills = [] }: Props) {
  const name = profile?.name ?? 'SLCodex'
  const headline = profile?.headline ?? 'Full Stack Developer'
  const summary =
    profile?.summary ??
    'I build reliable web apps and systems that help teams move faster—clean UI, stable backend, and production-ready code.'

  const socials = profile?.socials ?? null
  const emailHref = socials?.email ? `mailto:${socials.email}` : null
  const topSkills = useMemo(() => featuredSkills.slice(0, 12), [featuredSkills])

  return (
    <SiteLayout>
      <Head title="Welcome">
        <meta name="description" content={`${name} — ${headline}. ${summary}`} />
        <meta property="og:title" content={`${name} | Portfolio`} />
        <meta property="og:description" content={summary} />
      </Head>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-sm md:p-10">
        {/* subtle modern background */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        {/* soft glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-muted/40 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border bg-background/70 p-6 shadow-sm">
              {/* top tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Available for Hire</Badge>
                <Badge variant="outline">Laravel</Badge>
                <Badge variant="outline">React + Inertia</Badge>
                <Badge variant="outline">API + Admin Panels</Badge>
              </div>

              {/* identity + socials */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={profile?.avatar_url ?? ''} alt={name} />
                    <AvatarFallback>{(name || 'S').slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">Remote-ready • Philippines</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <SocialIcon href={socials?.github ?? undefined} label="GitHub">
                    <Github className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials?.linkedin ?? undefined} label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials?.facebook ?? undefined} label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials?.youtube ?? undefined} label="YouTube">
                    <Youtube className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials?.x ?? undefined} label="X">
                    <Twitter className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={emailHref ?? undefined} label="Email">
                    <Mail className="h-4 w-4" />
                  </SocialIcon>
                </div>
              </div>

              {/* value prop */}
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {headline}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{summary}</p>

              {/* impact highlights */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ImpactItem title="Ship fast, safely" desc="Clean architecture, predictable releases, fewer regressions." />
                <ImpactItem title="Performance-focused" desc="Optimize pages, queries, and UX for real users." />
                <ImpactItem title="Production-ready" desc="Auth, roles, validation, error handling, logging." />
                <ImpactItem title="Clear communication" desc="Async updates, reliable estimates, proactive fixes." />
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/projects" className="inline-flex items-center gap-2">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/contact">Contact</Link>
                </Button>
                {profile?.resume_url ? (
                  <Button asChild variant="secondary" className="rounded-xl">
                    <a href={profile.resume_url} target="_blank" rel="noreferrer">
                      Download CV
                    </a>
                  </Button>
                ) : null}
              </div>

              <Separator className="my-7" />

              {/* credibility stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <Stat label="Projects" value={featuredProjects.length} />
                <Stat label="Core Skills" value={featuredSkills.length} />
                <Stat label="Experience" value="3+" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <Card className="rounded-3xl border bg-background/70 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Core Stack</CardTitle>
                <p className="text-sm text-muted-foreground">Tools I use to build maintainable systems.</p>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2">
                {topSkills.length ? (
                  topSkills.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-2 rounded-2xl border bg-background px-3 py-1 text-sm transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-foreground/60" />
                      <span className="font-medium">{s.name}</span>
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Add featured skills in Admin → Skills.</p>
                )}
              </CardContent>

              <CardContent className="pt-0">
                <Separator className="my-5" />

                <div className="grid gap-3 text-sm text-muted-foreground">
                  <div className="rounded-2xl border bg-background p-4">
                    <p className="font-medium text-foreground">What I build</p>
                    <p className="mt-1">SaaS dashboards, admin panels, APIs, booking / forms systems, modern websites.</p>
                  </div>
                  <div className="rounded-2xl border bg-background p-4">
                    <p className="font-medium text-foreground">How I work</p>
                    <p className="mt-1">Plan → implement → test → ship. I prioritize stability, clarity, and speed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <div className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">View all</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <Card key={p.id} className="group rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{p.title}</CardTitle>
                {p.tagline ? <p className="text-sm text-muted-foreground">{p.tagline}</p> : null}
              </CardHeader>

              <CardContent className="grid gap-3">
                <div className="flex flex-wrap gap-2">
                  {(p.skills ?? []).slice(0, 4).map((s) => (
                    <Badge key={s.id} variant="outline" className="rounded-xl">
                      {s.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="rounded-xl">
                    <Link href={`/projects/${p.slug}`}>Open</Link>
                  </Button>

                  <Button asChild size="sm" variant="outline" className="rounded-xl">
                    <Link href={`/projects/${p.slug}`}>Case Study</Link>
                  </Button>
                </div>

                <div className="h-px w-full bg-border opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Built with production standards: UI, API, security, and maintainability.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {!featuredProjects.length ? (
          <p className="mt-8 text-sm text-muted-foreground">Mark projects as featured in Admin → Projects.</p>
        ) : null}
      </div>
    </SiteLayout>
  )
}

function ImpactItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl border bg-background">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string
  label: string
  children: ReactNode
}) {
  if (!href) return null

  const isMail = href.startsWith('mailto:')

  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-background/70 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm"
    >
      {children}
    </a>
  )
}
