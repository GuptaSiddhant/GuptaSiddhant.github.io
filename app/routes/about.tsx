import { type MetaFunction } from "remix"

export let meta: MetaFunction = ({}) => {
  return {
    title: "About",
    description: "Home of Siddhant Gupta!",
  }
}

export default function About(): JSX.Element {
  return (
    <main>
      <h1>About</h1>
      <p>Hi, I am Siddhant and I am a ...</p>
      <ul className="list-disc">
        <li>Frontend developer</li>
        <li>Backend developer</li>
        <li>UI Designer</li>
        <li>Entrepreneur (wannabe)</li>
        <li>Student (of somethings...)</li>
        <li>enjoyer of binging TV and racing games</li>
      </ul>
    </main>
  )
}
