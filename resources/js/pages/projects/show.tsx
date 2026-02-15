import { Head, Link } from '@inertiajs/react'
import ReactMarkdown from 'react-markdown'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

import SiteLayout from '@/layouts/site-layout'

type Skill = { id: number; name: string; category?: string }

type Project = {
  id: number
  title: string
  slug: string
  tagline?: string | null
  description?: string | null
  case_study?: string | null
  github_url?: string | null
  live_url?: string | null
  skills?: Skill[]
  responsibilities?: string[] | null
  highlights?: string[] | null
}

type Props = {
  project: Project
  thumbnail?: string | null
  gallery?: string[] | null
}

export default function ProjectShow({ project, thumbnail, gallery }: Props) {
  const skills = project.skills ?? []
  const responsibilities = project.responsibilities ?? []
  const highlights = project.highlights ?? []
  const images = [thumbnail, ...(gallery ?? [])].filter(Boolean) as string[]

  return (
    <SiteLayout>
      <Head title={project.title} />

      {/* Top nav */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/projects">← Back to Projects</Link>
        </Button>

        <div className="flex flex-wrap gap-2">
          {project.live_url ? (
            <Button asChild size="sm">
              <a href={project.live_url} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </Button>
          ) : null}

          {project.github_url ? (
            <Button asChild size="sm" variant="secondary">
              <a href={project.github_url} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      {/* Header */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h1>
          {project.tagline ? <p className="mt-2 text-muted-foreground">{project.tagline}</p> : null}

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s.id} variant="secondary" className="rounded-xl">
                {s.name}
              </Badge>
            ))}
          </div>

          {/* Overview */}
          {project.description ? (
            <>
              <Separator className="my-6" />
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
            </>
          ) : null}

          {/* Case Study */}
          {project.case_study ? (
            <>
              <Separator className="my-8" />
              <h2 className="text-lg font-semibold">Case Study</h2>

              <div className="prose prose-neutral mt-3 max-w-none dark:prose-invert">
                <ReactMarkdown>{project.case_study}</ReactMarkdown>
              </div>
            </>
          ) : null}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-5">
          <div className="grid gap-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Highlights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {highlights.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Add highlights in Admin → Projects.</p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {responsibilities.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Add responsibilities in Admin → Projects.</p>
                )}
              </CardContent>
            </Card>

            {/* Screenshots Carousel */}
            {images.length ? (
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">Screenshots</CardTitle>
                </CardHeader>

                <CardContent className="pt-2">
                  <Carousel
                    opts={{ align: 'start' }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {images.map((src, i) => (
                        <CarouselItem key={i} className="basis-full sm:basis-1/2">
                          <a href={src} target="_blank" rel="noreferrer">
                            <img
                              src={src}
                              alt={`Screenshot ${i + 1}`}
                              className="h-44 w-full rounded-xl border object-cover transition hover:opacity-90"
                            />
                          </a>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  <p className="mt-3 text-xs text-muted-foreground">
                    Tip: Use arrow buttons or swipe to navigate.
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
