import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Head, useForm, usePage } from '@inertiajs/react'

import { Mail, User, MessageSquare, CheckCircle2, Github, Linkedin } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SiteLayout from '@/layouts/site-layout'
import { Textarea } from '@/components/ui/textarea'


type Flash = {
  success?: string
}

type PageProps = InertiaPageProps & {
  flash: Flash
}

export default function Contact() {
  const { flash } = usePage<PageProps>().props

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    post('/contact', {
      onSuccess: () => reset(),
      preserveScroll: true,
    })
  }

  return (
    <SiteLayout>
      <Head title="Contact" />

      {/* Header / Hero */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border bg-card">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--muted))_0%,transparent_55%),radial-gradient(circle_at_80%_30%,hsl(var(--muted))_0%,transparent_45%)]" />
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Let’s build something</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Have a project, idea, or just want to say hi? Send a message and I’ll get back to you.
          </p>
        </div>
      </div>

      {flash?.success ? (
        <Alert className="mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Message sent!</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      ) : null}

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="lg:col-span-3 rounded-2xl">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>I typically reply within 24–48 hours.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="grid gap-5">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-9"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
              </div>

              {/* Message */}
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    className="min-h-[140px] pl-9"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    placeholder="Tell me about your project (scope, timeline, budget, etc.)"
                    rows={7}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Include as much detail as you can.</span>
                  <span>{data.message.length}/1000</span>
                </div>

                {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={processing} className="rounded-xl">
                  {processing ? 'Sending…' : 'Send Message'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  disabled={processing}
                  className="rounded-xl"
                  onClick={() => reset()}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="lg:col-span-2 grid gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
              <CardDescription>Other ways to reach me.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">tabaldochristian16@email.com</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">Philippines</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-muted-foreground">Timezone</span>
                <span className="font-medium">UTC+8</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>Check my work / profile.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <a
                href="https://github.com/SLCodex"
                className="flex items-center gap-3 rounded-xl border p-3 transition hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                <div className="text-sm">
                  <p className="font-medium leading-none">GitHub</p>
                  <p className="text-muted-foreground">Projects & code</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/christian-tabaldo-b08259218/"
                className="flex items-center gap-3 rounded-xl border p-3 transition hover:bg-muted"
              >
                <Linkedin className="h-4 w-4" />
                <div className="text-sm">
                  <p className="font-medium leading-none">LinkedIn</p>
                  <p className="text-muted-foreground">Experience & work</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  )
}
