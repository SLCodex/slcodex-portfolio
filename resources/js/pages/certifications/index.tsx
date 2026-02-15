import { Head } from '@inertiajs/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import SiteLayout from '@/layouts/site-layout'

type Certification = {
  id: number
  title: string
  issuer?: string | null
  issue_date?: string | null
  credential_url?: string | null
  proof_media_url?: string | null
  is_featured?: boolean
}

type Props = {
  certifications: Certification[]
}

export default function Certifications({ certifications = [] }: Props) {
  return (
    <SiteLayout>
      <Head title="Certifications" />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <p className="text-sm text-muted-foreground">Professional certifications and achievements.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((c) => (
          <Card key={c.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">{c.title}</CardTitle>

              <div className="mt-2 flex flex-wrap gap-2">
                {c.issuer && <Badge variant="secondary">{c.issuer}</Badge>}
                {c.is_featured && <Badge>Featured</Badge>}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Issued: {formatDate(c.issue_date)}
              </p>
            </CardHeader>

            <CardContent className="flex gap-2">
              {c.credential_url && (
                <Button asChild size="sm">
                  <a href={c.credential_url} target="_blank">
                    Credential
                  </a>
                </Button>
              )}

              {c.proof_media_url && (
                <Button asChild size="sm" variant="outline">
                  <a href={c.proof_media_url} target="_blank">
                    Proof
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!certifications.length && (
        <p className="mt-8 text-sm text-muted-foreground">
          Add certifications in Admin → Certifications.
        </p>
      )}
    </SiteLayout>
  )
}

function formatDate(date?: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  })
}
