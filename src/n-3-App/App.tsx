import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectorNotesList, selectorTagsList} from './selectors';
import {AddNoteForm} from '../n-3-Components/AddNoteForm/AddNoteForm';
import {Note} from '../n-3-Components/Note/Note';
import {getTagsListTC} from '../n-2-Redux/tags-reducer';
import {addNewNoteTC, getNotesListTC, setNodesFilter} from '../n-2-Redux/notes-reducer';
import {SearchField} from '../n-3-Components/SearchField/SearchField';
import s from './App.module.scss'

export const App: React.FC = () => {
    const dispatch = useDispatch()
    const notesArr = useSelector(selectorNotesList)
    const tagsArr = useSelector(selectorTagsList)

    const addNote = (title: string) => {
        dispatch(addNewNoteTC(title))
    }

    useEffect(() => {
        dispatch(getNotesListTC())
        dispatch(getTagsListTC())
    }, [dispatch])

    const findNote = (value: string) => {
        const notesId = tagsArr.filter(t => t.title === value).map(t => t.noteId)
        dispatch(setNodesFilter(notesId))
    }

    const mappedNotes = useCallback(() => {
        return notesArr && notesArr.map((note, index) => {
            return <Note key={note.id}
                         note={note}
            />
        })
    }, [notesArr])

    return (
        <div className={s.app}>
            <h1 className={s.app_name}>notes app</h1>
            <div className={s.form_wrapper}>
                <SearchField callback={findNote}/>
                <AddNoteForm callback={addNote}/>
            </div>
            <div className={s.notes_wrapper}>
                {
                    mappedNotes()
                }
            </div>
        </div>
    );
}
