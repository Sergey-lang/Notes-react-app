import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TagsBlock} from '../TagsBlock/TagsBlock';
import {NoteArea} from '../NoteArea/NoteArea';
import {TagType} from '../../n-2-Redux/tags-reducer';
import {NoteType, removeNoteTC} from '../../n-2-Redux/notes-reducer';
import {Button} from '../Button/Button';
import s from './Note.module.scss'
import {selectorAppStatus} from '../../n-3-App/selectors';
import {AppStateType} from '../../n-2-Redux/store';
import noteIcon from '../../assets/icons/noteIcon.png'

type PropsType = {
    note: NoteType
}

export const Note: React.FC<PropsType> = ({note, ...props}) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const appStatus = useSelector(selectorAppStatus)
    const tags = useSelector<AppStateType, TagType[]>(state => state.tagsState.filter(t => t.noteId === note.id))

    const dispatch = useDispatch()

    const deleteNote = useCallback(() => {
        dispatch(removeNoteTC(note.id))
    }, [note.id])

    return (
        <div className={s.note_block}>
            <div className={s.header}>
                <div className={s.note_icon}>
                    <img src={noteIcon} alt='note'/>
                </div>
                <Button className={s.delete_btn}
                        disabled={appStatus === 'loading'}
                        onClick={deleteNote}>X</Button>
            </div>
            <div className={s.note_headline}>
                <h2>{note.title}</h2>
            </div>
            <NoteArea note={note}
                      tags={tags}
                      editMode={editMode}
                      setEditMode={setEditMode}/>
            <TagsBlock tags={tags}
                       editMode={editMode}
                       noteId={note.id}/>
        </div>
    )
}
