import type { CommandPaletteAction, CommandPaletteEntry } from "../types"

export { useCommandPaletteDispatch } from "."

export function closePalette(): CommandPaletteAction {
  return { type: "TOGGLE_OPEN", payload: false }
}
export function openPalette(): CommandPaletteAction {
  return { type: "TOGGLE_OPEN", payload: true }
}
export function togglePaletteOpen(): CommandPaletteAction {
  return { type: "TOGGLE_OPEN" }
}

export function addEntry(entry: CommandPaletteEntry): CommandPaletteAction {
  return { type: "ADD_ENTRY", payload: entry }
}
export function updateEntry(
  entry: Partial<CommandPaletteEntry>,
): CommandPaletteAction {
  return { type: "UPDATE_ENTRY", payload: entry }
}
export function removeEntry(
  entry: CommandPaletteEntry | string,
): CommandPaletteAction {
  return {
    type: "REMOVE_ENTRY",
    payload: typeof entry === "string" ? entry : entry.id,
  }
}
