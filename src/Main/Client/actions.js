import { push } from 'react-router-redux'

export function resetState() {
    return (dispatch) => {
        const action = {
            type: 'RESET_STATE'
        }
        dispatch(action)
        dispatch(push('/login'))
    }
}
