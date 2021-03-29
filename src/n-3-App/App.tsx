import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectorAppError, selectorAppStatus, selectorNotesList, selectorTagsList} from './selectors';
import {AddNoteForm} from '../n-3-Components/AddNoteForm/AddNoteForm';
import {Note} from '../n-3-Components/Note/Note';
import {getTagsListTC} from '../n-2-Redux/tags-reducer';
import {addNewNoteTC, getNotesListTC, setNodesFilter} from '../n-2-Redux/notes-reducer';
import {SearchField} from '../n-3-Components/SearchField/SearchField';
import s from './App.module.scss'
import {ErrorBar} from '../n-3-Components/ErrorBar/ErrorBar';
import {Preloader} from '../n-3-Components/Loader/Preloader';

export const App: React.FC = () => {
    const dispatch = useDispatch()
    const notesArr = useSelector(selectorNotesList)
    const tagsArr = useSelector(selectorTagsList)
    const appError = useSelector(selectorAppError)
    const appStatus = useSelector(selectorAppStatus)


    const addNote = (title: string) => {
        dispatch(addNewNoteTC(title))
    }

    useEffect(() => {
        dispatch(getNotesListTC())
        dispatch(getTagsListTC())
    }, [dispatch])

    useEffect(() => {

    }, [])

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
            {appError && <ErrorBar errorMessage={appError}/>}
            {appStatus === 'loading' && <Preloader/>}
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
