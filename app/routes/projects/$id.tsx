import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "~/firebase"

import Markdown from "~/components/templates/Markdown"
import ShowcaseImage from "~/components/molecules/ShowcaseImage"
import {
  ProjectTitle,
  ProjectInfo,
  ProjectFooter,
  type ProjectContent,
  type ProjectData,
} from "~/features/projects"
import Prose from "~/components/templates/Prose"
import { filterPageDraft } from "~/helpers"
import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"

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

export default function Project(): JSX.Element {
  const {
    project: { data, code },
    // nextProject,
  } = useLoaderData<LoaderData>()
  const { title, gallery } = data

  return (
    <Prose>
      <ProjectTitle {...data} />
      <ProjectInfo data={data} />
      <ShowcaseImage src={gallery?.[0]?.url} alt={title} />
      <Markdown code={code} />
      {/* <ProjectFooter project={nextProject} /> */}
    </Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <H1>{"Error with the project"}</H1>
      <Paragraph>{error.message}</Paragraph>
    </Prose>
  )
}
