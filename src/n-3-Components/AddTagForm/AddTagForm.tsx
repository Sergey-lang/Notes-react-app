import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNewTagTC} from '../../n-2-Redux/tags-reducer';
import {Button} from '../Button/Button';
import s from './AddTagForm.module.scss';
import {selectorAppStatus} from '../../n-3-App/selectors';
import {Input} from '../Input/Input';
import {setAppStatus} from '../../n-2-Redux/app-reducer';

type PropsType = {
    noteId: string
}

export const AddTagForm: React.FC<PropsType> = React.memo(({noteId}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector(selectorAppStatus)
    const [tagText, setTagText] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.currentTarget.value)
    }

    const addTag = useCallback(() => {
        if (tagText.trim() !== '') {
            dispatch(addNewTagTC(tagText, noteId))
            setTagText('')
        } else {
            dispatch(setAppStatus('failed', 'Title is required'))
        }
    }, [tagText])

    return (
        <div className={s.tag_input_block}>
            <Input className={s.tag_input}
                   onChange={onChangeHandler}
                   onEnter={addTag}
                   value={tagText}
                   type="text" placeholder='Add tag...'/>
            <Button onClick={addTag} disabled={appStatus === 'loading'}>Add Tag</Button>
        </div>
    )
})

