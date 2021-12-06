import { type MetaFunction } from "remix"
import heroImage from "~/assets/images/hero.png"
import Code from "~/components/Code"
import Section from "~/layouts/Section"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta!",
  }
}

export default function Index() {
  return (
    <main>
      <Section>
        <div className="w-full md:w-2/3 xl:w-1/2">
          <h1 className="mb-10">I bring designs to life on your screen...</h1>
          <p>
            I am a <em>full-stack developer</em> with a drive for creating
            beautiful web and mobile applications.
            <br />
            Stack: React, React Native, TypeScript, Node.js and Figma.
          </p>
          <p>
            Currently applying my skills at <strong>Accenture Finland</strong> (
            <a
              href="https://www.accenture.com/fi-en/careers/jobdetails?id=R00008034_en&title=Senior+React+Developer"
              target="_blank"
            >
              we are hiring
            </a>
            ).
          </p>
          <div className="flex-auto my-12">
            <Code>
              <Code.Comment>
                An interactive resume for your terminal, made with React and
                ink. Run:
              </Code.Comment>
              <Code.Command>npx guptasiddhant</Code.Command>
            </Code>
          </div>
        </div>
        <div className="hidden xl:block">
          <img
            src={heroImage}
            alt={"Screen with design"}
            className="object-fill"
          />
        </div>
      </Section>
    </main>
  )
}
