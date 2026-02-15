import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import SiteLayout from '@/layouts/site-layout'

type Project = {
  id: number
  title: string
  slug: string
  tagline?: string
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState('')

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <SiteLayout>
      <Head title="Projects" />

      <h1 className="mb-4 text-2xl font-semibold">Projects</h1>

      <Input
        placeholder="Search projects..."
        className="mb-6 max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
             <p className="mt-2 text-sm text-muted-foreground"> {p.tagline}</p>
            </CardHeader>

            <CardContent>
              <Button asChild>
                <Link href={`/projects/${p.slug}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteLayout>
  )
}
