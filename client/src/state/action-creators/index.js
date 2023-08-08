export const addMoney = (amount) => {
    return(dispatch) => {
        dispatch({
            type: 'add',
            payload: amount
        })
    }
}