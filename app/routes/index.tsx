import { type MetaFunction } from "remix"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta!",
  }
}

const sectionItemClassName = "w-full md:w-4/6 xl:w-1/2"

export default function Index() {
  return (
    <main>
      <section className="my-10">
        <h1 className={sectionItemClassName}>
          I bring designs to life on your screen.
        </h1>
        <p className={sectionItemClassName}>
          I am a <em>full-stack developer</em> with a drive for creating
          beautiful web and mobile applications.
          <br />
          Stack: React, React Native, TypeScript, Node.js and Figma.
        </p>
        <p className={sectionItemClassName}>
          Currently applying my skills at{" "}
          <a href="https://www.accenture.com/fi-en" target="_blank">
            Accenture Finland
          </a>
          .
        </p>
      </section>
    </main>
  )
}
