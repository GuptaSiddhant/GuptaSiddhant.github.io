import Heading from "~/components/Heading"
import { Paragraph } from "~/components/text"

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <main className="container-mx">
      <Heading>{"There was an error"}</Heading>
      <Paragraph>{error.message}</Paragraph>
    </main>
  )
}
