import { useLoaderData, useFetcher, type MetaFunction } from "remix"
import { query, getDocs, collection } from "firebase/firestore"

import { firestore } from "~/firebase"
import FilterForm, { useFilterForm } from "~/components/organisms/FilterForm"
import Section from "~/components/templates/Section"
import { ProjectContent, ProjectData, ProjectGrid } from "~/features/projects"
import type { AwaitedReturn, LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export async function loader({}: LoaderFunctionProps) {
  // return await getAllProjects()
  const queryRef = query(collection(firestore, "projects"))
  const querySnapshot = await getDocs(queryRef)
  const projects = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      data: data as ProjectData,
      content: data.markdown,
      code: data.code,
      path: doc.id,
    }
  })
  return projects
}

export default function Projects(): JSX.Element {
  const projects = useLoaderData<AwaitedReturn<typeof loader>>()
  const { items, filterFormProps } = useFilterForm<ProjectContent>(
    projects,
    ({ id, data }, query) =>
      [id, data.title, data.association].some((field) =>
        field?.includes(query),
      ),
  )
  const sync = useFetcher()

  return (
    <Section id="filter" className="flex-col">
      <FilterForm
        {...filterFormProps}
        searchPlaceholder="Search the projects..."
      />
      <sync.Form action="sync" method="post">
        <button type="submit" className="text-white">
          {sync.state === "idle" ? "Sync" : "Syncing..."}
        </button>
      </sync.Form>
      <ProjectGrid projects={items} />
    </Section>
  )
}
