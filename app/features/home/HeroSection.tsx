import { Fragment } from "react"

import AnimatedText from "~/components/AnimatedText"
import CodeBlock from "~/components/CodeBlock"
import Heading from "~/components/Heading"
import { Paragraph, Emphasis, Code } from "~/components/Text"
import Section from "~/components/layouts/Section"

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

  return (
    <Heading value={1} className="mb-12">
      I bring designs to life on your screen...{" "}
      <AnimatedText texts={ADJECTIVES} />.
    </Heading>
  )
}

function Description() {
  return (
    <Paragraph>
      I am a <Emphasis>front-end developer</Emphasis> with a drive for creating
      beautiful web and mobile applications.
    </Paragraph>
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
    <Paragraph>
      Stack:{" "}
      {stack.map((text, i, a) => (
        <Fragment key={text}>
          <Code>{text}</Code>
          {i === a.length - 1 ? "" : i === a.length - 2 ? " and " : ", "}
        </Fragment>
      ))}
    </Paragraph>
  )
}

function CurrentStatus() {
  const jobLink =
    "https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"

  return (
    <Paragraph>
      Currently applying my skills at <strong>Accenture Finland</strong> (
      <a href={jobLink} target="_blank" rel="noopener">
        we are hiring
      </a>
      ).
    </Paragraph>
  )
}

function TerminalCode() {
  return (
    <CodeBlock lang="bash" className="my-12">
      {`# An interactive resume for your terminal, made with React and ink. Run:
npx guptasiddhant`}
    </CodeBlock>
  )
}
