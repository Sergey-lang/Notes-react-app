import axios from 'axios'
import {NoteType} from '../n-2-Redux/notes-reducer';
import {TagType} from '../n-2-Redux/tags-reducer';

const defaultOptions = {
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
}

const axiosInstance = axios.create(defaultOptions);

export const notesAPI = {
    getNotes() {
        return axiosInstance.get<NoteType[]>(`/notes`)
            .then(res => res)
    },

    addNote(newNote: NoteType) {
        return axiosInstance.post(`/notes`, newNote)
            .then(res => res)
    },

    deleteNote(id: string) {
        return axiosInstance.delete(`/notes/${id}`)
            .then(res => res)
    },

    changeNote(updateNoteObj: NoteType) {
        return axiosInstance.put(`/notes/${updateNoteObj.id}`, updateNoteObj)
            .then(res => res)
    },
}

export const tagsAPI = {
    getTags() {
        return axiosInstance.get(`/tags`)
            .then(res => res)
    },

    addTag(tag: TagType) {
        return axiosInstance.post(`/tags`, tag)
            .then(res => res)
    },

    deleteTag(tagId: string) {
        return axiosInstance.delete(`/tags/${tagId}`)
            .then(res => res)
    },
}
