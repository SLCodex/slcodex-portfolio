import { Head } from '@inertiajs/react'
import { Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import SiteLayout from '@/layouts/site-layout'

type Skill = {
  id: number
  name: string
  category: string
  is_featured?: boolean
}

type Props = {
  skillsByCategory: Record<string, Skill[]>
}

export default function TechStack({ skillsByCategory = {} }: Props) {
  const categories = Object.keys(skillsByCategory).sort((a, b) => a.localeCompare(b))

  return (
    <SiteLayout>
      <Head title="Tech Stack" />

      {/* <p className='text-2xl font-bold'> Tech Stack</p> */}

      {/* SKILL CATEGORIES */}
      <div className="mt-8 grid gap-4">
        {categories.map((cat) => {
          const skills = (skillsByCategory[cat] ?? []).slice().sort((a, b) => a.name.localeCompare(b.name))
          const featured = skills.filter((s) => s.is_featured)
          const regular = skills.filter((s) => !s.is_featured)

          return (
            <Card
              key={cat}
              className="group relative overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-foreground/5 blur-2xl" />
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-foreground/5 blur-2xl" />
              </div>

              <CardHeader className="relative pb-3">
                <CardTitle className="text-base">{cat}</CardTitle>
              </CardHeader>

              <CardContent className="relative grid gap-4">
                {featured.length ? (
                  <>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      Primary tools I use most
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {featured.map((s) => (
                        <Badge key={s.id} className="rounded-2xl px-3 py-1">
                          {s.name}
                        </Badge>
                      ))}
                    </div>

                    <Separator />
                  </>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {(featured.length ? regular : skills).map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-2 rounded-2xl border bg-background px-3 py-1 text-sm text-foreground/90 transition hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-foreground/60" />
                      {s.name}
                    </span>
                  ))}
                </div>

                {!skills.length ? (
                  <p className="text-sm text-muted-foreground">No skills yet.</p>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {!categories.length ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Add skills in Admin → Skills.
        </p>
      ) : null}
    </SiteLayout>
  )
}
