import { Outlet, type MetaFunction } from "remix"

import AnimatedTitle from "~/components/AnimatedTitle"
import { Paragraph } from "~/components/atoms/Text"

export let meta: MetaFunction = ({}) => {
  return {
    title: "About",
    description: "Home of Siddhant Gupta!",
  }
}

export default function About(): JSX.Element {
  return (
    <main className="flex-1">
      <AnimatedTitle backAriaLabel="Back to about.">About [WIP]</AnimatedTitle>

      <div className="container-mx">
        <Paragraph>Hi, I am Siddhant and </Paragraph>
        <ul className="list-disc">
          <li>a Frontend developer</li>
          <li>a Backend developer</li>
          <li>a UI Designer</li>
          <li>an Entrepreneur (wannabe)</li>
          <li>a Student (of somethings...)</li>
          <li>an enjoyer of binging TV and racing games</li>
        </ul>
      </div>

      <Outlet />
    </main>
  )
}
