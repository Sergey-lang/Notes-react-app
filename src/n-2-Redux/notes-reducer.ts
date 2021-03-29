import {ThunkDispatch} from 'redux-thunk';
import {notesAPI} from '../n-1-Api/api';
import {v1} from 'uuid';
import {setAppStatus} from './app-reducer';
import {AppStateType} from './store';

export type NoteType = {
    id: string
    title: string
    noteText: string
    created_date: number
    updated_date: number
}

type ActionsType = ReturnType<typeof setNotes>
    | ReturnType<typeof addNote>
    | ReturnType<typeof deleteNote>
    | ReturnType<typeof changeNote>
    | ReturnType<typeof setNodesFilter>
    | ReturnType<typeof setAppStatus>

const initializeState: NoteType[] = []
type InitialStateType = typeof initializeState

const findNotesObject = (idArr: string[], notesArr: NoteType[]) => {
    let arr = []
    for (let i = 0; i < notesArr.length; i++) {
        for (let j = 0; j < idArr.length; j++) {
            if (notesArr[i].id === idArr[j]) {
                arr.push(notesArr[i])
            }
        }
    }
    return arr
}

export const notesReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TE/NOTES/SET_NOTES':
            return [...action.notes]
        case 'TE/NOTES/ADD_NOTE':
            return [action.note, ...state]
        case 'TE/NOTES/DELETE_NOTE':
            return state.filter(tl => tl.id !== action.id)
        case 'TE/NOTES/CHANGE_NOTE':
            return state.map(note => note.id === action.note.id ? action.note : note)
        case 'TE/NOTES/FIND_NOTES':
            return findNotesObject(action.nodesID, [...state])
        default:
            return state;
    }
}

//Actions
export const setNotes = (notes: NoteType[]) => ({type: 'TE/NOTES/SET_NOTES', notes} as const)
export const addNote = (note: NoteType) => ({type: 'TE/NOTES/ADD_NOTE', note} as const)
export const deleteNote = (id: string) => ({type: 'TE/NOTES/DELETE_NOTE', id} as const)
export const changeNote = (note: NoteType) => ({type: 'TE/NOTES/CHANGE_NOTE', note} as const)
export const setNodesFilter = (nodesID: string[]) => ({type: 'TE/NOTES/FIND_NOTES', nodesID} as const)

//Thunks
export const getNotesListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        const res = await notesAPI.getNotes()
        dispatch(setNotes(
            res.data.sort((a: any, b: any) => {
                return b.created_date - a.created_date
            })
            )
        );
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}

export const addNewNoteTC = (title: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        const newNoteObj: NoteType = {
            id: v1(),
            title: title,
            noteText: 'Add notes',
            created_date: new Date().getTime(),
            updated_date: new Date().getTime()
        }
        await notesAPI.addNote(newNoteObj)
        dispatch(addNote(newNoteObj));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}

export const removeNoteTC = (id: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        await notesAPI.deleteNote(id)
        dispatch(deleteNote(id));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}

export const updateNoteTC = (note: NoteType, areaText: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        const noteText = await areaText.replace(/#/g, '')
        const updateNoteObj: NoteType = {
            id: note.id,
            title: note.title,
            noteText: noteText,
            created_date: note.created_date,
            updated_date: new Date().getTime()
        }
        await notesAPI.changeNote(updateNoteObj)
        dispatch(changeNote(updateNoteObj));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}




