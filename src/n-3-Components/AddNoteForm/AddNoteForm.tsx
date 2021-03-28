import React, {ChangeEvent, useState} from 'react';
import {Button} from '../Button/Button';
import s from './AddNoteForm.module.scss';
import {useSelector} from 'react-redux';
import {selectorAppStatus} from '../../n-3-App/selectors';
import {Input} from '../Input/Input';

type PropsType = {
    callback: (title: string) => void
}

export const AddNoteForm: React.FC<PropsType> = ({callback}) => {
    const appStatus = useSelector(selectorAppStatus)
    const [noteText, setNoteText] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNoteText(e.currentTarget.value)
    }

    const addTag = () => {
        if (noteText.trim() !== '') {
            callback(noteText)
            setNoteText('')
        } else {
            alert('Title is required')
        }
    }

    return (
        <div className={s.adding_form}>
            <Input className={s.adding_form_input}
                   onChange={inputHandler}
                   onEnter={addTag}
                   value={noteText}
                   type="text"
                   placeholder='Enter note title'/>
            <div className={s.none_btn_wrapper}>
                <Button className={s.note_btn}
                        disabled={appStatus === 'loading'}
                        onClick={addTag}>Add</Button>
            </div>
        </div>
    )
}

