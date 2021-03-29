import {ThunkDispatch} from 'redux-thunk';
import {tagsAPI} from '../n-1-Api/api';
import {v1} from 'uuid';
import {setAppStatus} from './app-reducer';
import {deleteNote} from './notes-reducer';
import {AppStateType} from './store';

export type TagType = {
    id: string
    title: string
    noteId: string
}

type ActionsType = ReturnType<typeof setTags>
    | ReturnType<typeof addTag>
    | ReturnType<typeof deleteNote>
    | ReturnType<typeof removeTag>
    | ReturnType<typeof setAppStatus>

const initializeState: TagType[] = []
type InitialStateType = typeof initializeState

export const tagsReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TE/TAGS/SET_TAGS':
            return [...action.tags]
        case 'TE/TAGS/ADD_TAG':
            return [...state, action.tag]
        case 'TE/TAGS/REMOVE_TAG':
            return state.filter(t => t.id !== action.tagId)
        default:
            return state;
    }
}

//Actions
export const setTags = (tags: TagType[]) => ({type: 'TE/TAGS/SET_TAGS', tags} as const)
export const addTag = (tag: TagType) => ({type: 'TE/TAGS/ADD_TAG', tag} as const)
export const removeTag = (tagId: string) => ({type: 'TE/TAGS/REMOVE_TAG', tagId} as const)

///Thunks
export const getTagsListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        const res = await tagsAPI.getTags()
        dispatch(setTags(res.data));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}

export const addNewTagTC = (tagText: string, noteId: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        const newTagObj: TagType = {
            id: v1(),
            title: `#${tagText}`,
            noteId: noteId
        }
        await tagsAPI.addTag(newTagObj)
        dispatch(addTag(newTagObj));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}

export const deleteTagTC = (tagId: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading', null))
    try {
        await tagsAPI.deleteTag(tagId)
        await dispatch(removeTag(tagId));
        dispatch(setAppStatus('succeeded', null))
    } catch (error) {
        dispatch(setAppStatus('failed', 'Some error occurred'))
    }
}





