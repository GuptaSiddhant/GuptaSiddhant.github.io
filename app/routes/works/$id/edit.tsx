import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useOutletContext,
  useSubmit,
  useTransition,
} from "remix"
import { useEffect, useState } from "react"

import Markdown from "~/components/templates/Markdown"
import Prose from "~/components/templates/Prose"
import { getHeadingClassName } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"
import Section from "~/components/templates/Section"
import { WorkContext } from "../$id"
import { setWorkItemById } from "~/features/works"
import { compileMdx } from "~/service/mdx.server"
import Tape from "~/components/atoms/Tape"

export const meta: MetaFunction = ({ parentsData }) => ({
  title: parentsData?.work?.title || "Edit",
})

export const loader: LoaderFunction = async ({ request }) => {
  const editContent = new URL(request.url).searchParams.get("content")
  const code = editContent ? (await compileMdx(editContent)).code : undefined

  return editContent ? code : null
}

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const editContent = (await request.formData()).get("edit") as string

  if (editContent) {
    const content = JSON.stringify(editContent)
    await setWorkItemById(id, { content })
  }

  return null
}

export default function WorkPageEdit(): JSX.Element {
  const submit = useSubmit()
  const { work, code } = useOutletContext<WorkContext>()
  const localCode = useLoaderData<string | null>()
  const { state } = useTransition()

  return (
    <>
      <Section id="editor" className="flex-row !p-0 mt-4">
        <p className="absolute -top-16 right-0 flex gap-2 items-center">
          {localCode ? (
            <button
              className="px-4 py-2 rounded bg-blue-800"
              onClick={() => {
                submit({ content: "" }, { method: "get" })
              }}
            >
              Local - Get Server
            </button>
          ) : (
            "Server"
          )}
          <Link to={".."} className="px-4 py-2 rounded bg-blue-800">
            Done
          </Link>
        </p>
        <Form method="post" replace className="flex-1 relative">
          <button
            disabled={state !== "idle"}
            className="absolute top-0 right-0 px-4 py-2 rounded bg-blue-800"
          >
            {state !== "idle" ? "Submitting" : "Submit"}
          </button>
          <textarea
            name="edit"
            className="w-full h-full min-h-screen bg-depth text-primary whitespace-pre-line text-base"
            defaultValue={JSON.parse(work.content || "")}
            onChange={(e) =>
              submit({ content: e.target.value }, { method: "get" })
            }
          />
        </Form>

        {code ? (
          <Prose className="flex-1 overflow-hidden">
            <Markdown code={localCode || code} />
          </Prose>
        ) : null}
      </Section>
    </>
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
