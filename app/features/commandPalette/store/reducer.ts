import type { CommandPaletteState, CommandPaletteAction } from "../types"

export default function reducer(
  state: CommandPaletteState,
  action: CommandPaletteAction,
): CommandPaletteState {
  switch (action.type) {
    case "TOGGLE_OPEN": {
      const open = action.payload ?? !state.open
      return { ...state, open }
    }
    case "ADD_ENTRY": {
      const entry = action.payload
      return {
        ...state,
        entries: [...state.entries, entry],
      }
    }
    case "REMOVE_ENTRY": {
      const id = action.payload
      return {
        ...state,
        entries: state.entries.filter((e) => e.id === id),
      }
    }
    case "UPDATE_ENTRY": {
      const entry = action.payload
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === entry.id ? { ...e, ...entry } : e,
        ),
      }
    }
    default:
      return state
  }
}
