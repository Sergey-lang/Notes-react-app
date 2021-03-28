import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NoteType, updateNoteTC} from '../../n-2-Redux/notes-reducer';
import {addNewTagTC, TagType} from '../../n-2-Redux/tags-reducer';
import {Button} from '../Button/Button';
import s from './NoteArea.module.scss';
import {selectorAppStatus} from '../../n-3-App/selectors';
import {HighlightTextarea} from '../HighlightTextarea/HighlightTextarea';

type PropsType = {
    note: NoteType
    tags: TagType[]
    editMode: boolean
    setEditMode: (value: boolean) => void
}

export const NoteArea: React.FC<PropsType> = ({note, tags, editMode, setEditMode, ...props}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector(selectorAppStatus)
    const [areaText, setAreaText] = useState<string>(note.noteText)
    const tagsNameArray = tags.map(t => t.title.slice(1))

    const changeEditMode = () => {
        setEditMode(true)
    }

    const changeNote = async () => {
        dispatch(updateNoteTC(note, areaText))
        setEditMode(false)
    }

    const hashTagsArray = areaText.match(/#[0-9A-Za-zА-Яа-яё]+/g);

    const addTagOnKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 32 && hashTagsArray && hashTagsArray.length) {
            const tagTitle = hashTagsArray ? hashTagsArray[0] : ''
            setAreaText(areaText.replace(/#/g, ''))
            dispatch(addNewTagTC(tagTitle.slice(1), note.id))
        }
    }

    return (
        <div className={s.area_block}>
            <div className={s.area_control}>
                <Button className={s.note_area_btn}
                        disabled={appStatus === 'loading'}
                        onClick={changeNote}>Save</Button>
                <Button className={s.note_area_btn} onClick={changeEditMode}>Edit</Button>
            </div>
            {
                !editMode
                    ? <div className={s.note_text}>{areaText}</div>
                    : <HighlightTextarea areaText={areaText}
                                           className={s.editable_block}
                                           onKeyPress={addTagOnKeyPress}
                                           setAreaText={setAreaText}
                                           tagsNameArray={tagsNameArray}
                        />
            }
        </div>
    )
}
