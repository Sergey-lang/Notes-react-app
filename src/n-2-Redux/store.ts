import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {notesReducer} from './notes-reducer';
import {tagsReducer} from './tags-reducer';
import {appReducer} from './app-reducer';

export const rootReducer = combineReducers({
    notesState: notesReducer,
    tagsState: tagsReducer,
    appState: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
