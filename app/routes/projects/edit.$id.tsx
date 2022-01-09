import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "~/firebase"

import Markdown from "~/components/templates/Markdown"
import { type ProjectContent, type ProjectData } from "~/features/projects"
import Prose from "~/components/templates/Prose"
import { filterPageDraft } from "~/helpers"
import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"
import { Fragment } from "react"
import Section from "~/components/templates/Section"

export const meta: MetaFunction = (props) => {
  const data: ProjectData = props.data.project.data
  const { title, description = "" } = data

  return {
    title,
    description,
  }
}

interface LoaderData {
  project: ProjectContent
  nextProject: ProjectContent | null
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const docRef = doc(firestore, "projects", id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    const project: ProjectContent = {
      id,
      data: data as ProjectData,
      code: data.code,
      path: id,
      content: data.content,
    }
    if (!filterPageDraft(project)) return redirect(`..`)
    return { project }
  } else {
    // doc.data() will be undefined in this case
    throw new Error("Project (" + id + ") not found.")
  }
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request)
  // return redirect(new URL(request.url).pathname)
  return null
}

export default function Project(): JSX.Element {
  const {
    project: { content },
    // nextProject,
  } = useLoaderData<LoaderData>()
  const submit = useSubmit()

  return (
    <Section id="editor" className="flex flex-col">
      <Form method="post" onChange={(e) => submit(e.currentTarget)}>
        <textarea
          name="edit"
          className="w-full min-h-screen bg-depth text-primary whitespace-pre-line"
          defaultValue={JSON.parse(content)}
        />
      </Form>
    </Section>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <h1>{"Error with the project"}</h1>
      <Paragraph>{error.message}</Paragraph>
    </Prose>
  )
}
