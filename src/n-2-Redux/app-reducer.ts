type ActionsType = ReturnType<typeof setAppStatus>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppState = {
    status: RequestStatusType,
    error: null | string
}

const initializeState = {
    status: 'idle',
    error: null as string | null
} as AppState

type InitialStateType = typeof initializeState

export const appReducer = (state: InitialStateType = initializeState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'TE/APP/SET-APP-STATUS':
            return {...state, status: actions.payloadType.status, error: actions.payloadType.error}
        default:
            return state
    }
}

//Actions
export const setAppStatus = (status: RequestStatusType, error: null | string) => ({
    type: 'TE/APP/SET-APP-STATUS',
    payloadType: {
        status,
        error
    }
} as const)



