import {AppStateType} from '../n-2-Redux/store';

export const selectorNotesList = (state: AppStateType) => state.notesState
export const selectorTagsList = (state: AppStateType) => state.tagsState
export const selectorAppStatus = (state: AppStateType) => state.appState.status
export const selectorAppError = (state: AppStateType) => state.appState.error

