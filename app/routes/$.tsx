import Section from "~/ui/Section"
import { H1 } from "~/ui/typography"

export default function Error404(): JSX.Element {
  return (
    <Section.Hero>
      <H1>{"Error 404 - Page not found"}</H1>
      <p>{"Oops! Looks like you tried to visit a page that does not exist."}</p>
      <button
        className="text-left"
        onClick={() => typeof window !== "undefined" && window.history.go(-1)}
      >
        Go back.
      </button>
    </Section.Hero>
  )
}
