import { useIsSSR } from "@react-aria/ssr"
import { Fragment } from "react"
import TextTransition from "react-text-transition"
import CodeBlock from "~/components/CodeBlock"
import useTextTransition from "~/helpers/useTextTransition"
import Section from "~/layouts/Section"

/** Hero component */
export function HeroSection(): JSX.Element | null {
  return (
    <Section className="items-center py-16">
      <div className="w-full md:w-2/3">
        <Title />
        <Description />
        <TechStack />
        <CurrentStatus />
        <TerminalCode />
      </div>
    </Section>
  )
}

function Title() {
  const ADJECTIVES = [
    "Accessibly",
    "Beautifully",
    "Responsibly",
    "Sensibly",
    "Efficiently",
  ]

  const textTransitionProps = useTextTransition(...ADJECTIVES)
  const isSSR = useIsSSR()

  return (
    <h1 className="mb-12">
      I bring designs to life on your screen...{" "}
      {isSSR ? ADJECTIVES[0] : <TextTransition {...textTransitionProps} />}.
    </h1>
  )
}

function Description() {
  return (
    <p>
      I am a <em>front-end developer</em> with a drive for creating beautiful
      web and mobile applications.
    </p>
  )
}

function TechStack() {
  const stack = [
    "React",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Figma",
  ]
  return (
    <p>
      Stack:{" "}
      {stack.map((text, i, a) => (
        <Fragment key={text}>
          <code key={text}>{text}</code>
          {i === a.length - 1 ? "" : i === a.length - 2 ? " and " : ", "}
        </Fragment>
      ))}
    </p>
  )
}

function CurrentStatus() {
  const jobLink =
    "https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"

  return (
    <p>
      Currently applying my skills at <strong>Accenture Finland</strong> (
      <a href={jobLink} target="_blank">
        we are hiring
      </a>
      ).
    </p>
  )
}

function TerminalCode() {
  const NPX_CODE = `# An interactive resume for your terminal, made with React and ink. Run:
npx guptasiddhant`

  return (
    <div className="flex-auto my-12">
      <CodeBlock lang="bash">{NPX_CODE}</CodeBlock>
    </div>
  )
}
