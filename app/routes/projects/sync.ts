import { json, type LoaderFunction, type ActionFunction, redirect } from "remix"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { firestore } from "~/firebase"
import { getAllProjects } from "~/features/projects"

export const loader: LoaderFunction = async () => {
  return json(
    "Make a POST request to the /projects/sync endpoint to sync your projects with Firebase.",
  )
}

export const action: ActionFunction = async () => {
  const projects = await getAllProjects()
  try {
    projects.forEach(({ id, data, content, code }) => {
      const projectRef = doc(firestore, `projects`, id)
      setDoc(
        projectRef,
        {
          ...data,
          dateStart: Timestamp.fromDate(new Date(data.dateStart)),
          dateEnd: data.dateEnd
            ? Timestamp.fromDate(new Date(data.dateEnd))
            : null,
          content: JSON.stringify(content),
          code,
        },
        { merge: true },
      )
    })
  } catch (e) {
    console.error("Error", e)
  }

  return redirect("/projects")
}

export function CatchBoundary() {}
