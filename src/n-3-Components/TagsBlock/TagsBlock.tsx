import React, {useCallback} from 'react';
import {Tag} from '../Tag/Tag';
import {TagType} from '../../n-2-Redux/tags-reducer';
import s from './TagsBlock.module.scss';
import {AddTagForm} from '../AddTagForm/AddTagForm';

type PropsType = {
    tags: TagType[]
    noteId: string
    editMode: boolean
}

export const TagsBlock: React.FC<PropsType> = ({tags, noteId, editMode}) => {
    const mappedTags = useCallback(() => {
        return tags && tags.map(tag => <Tag key={tag.id}
                                            tag={tag}
                                            editMode={editMode}/>
        )
    }, [tags])

    return (
        <>
            <div className={s.tags_block}>
                {
                    mappedTags()
                }
                {!tags.length && <div style={{color: '#ef7070'}}>No tags</div>}
            </div>
            <AddTagForm noteId={noteId}/>
        </>
    )
}

