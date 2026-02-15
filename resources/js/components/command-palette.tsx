import { Link } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type PaletteProject = {
  title: string
  slug: string
  tagline?: string | null
}

type Props = {
  projects: PaletteProject[]
}

export default function CommandPalette({ projects }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      // "/" to open (optional)
      if (!e.ctrlKey && !e.metaKey && e.key === '/') {
        const el = e.target as HTMLElement | null
        const isTyping =
          el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.getAttribute('contenteditable') === 'true'
        if (!isTyping) {
          e.preventDefault()
          setOpen(true)
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const items = useMemo(() => projects ?? [], [projects])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search projects…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Projects">
          {items.map((p) => (
            <CommandItem key={p.slug} value={`${p.title} ${p.tagline ?? ''}`}>
              <Link
                href={`/projects/${p.slug}`}
                className="flex w-full items-center justify-between"
                onClick={() => setOpen(false)}
              >
                <span className="font-medium">{p.title}</span>
                {p.tagline ? <span className="text-xs text-muted-foreground">{p.tagline}</span> : null}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
