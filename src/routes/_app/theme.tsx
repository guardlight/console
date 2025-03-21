import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/theme')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/theme"!</div>
}
