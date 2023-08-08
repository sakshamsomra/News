const reducer = (state=0, action) =>{
    if(action.type === 'add'){
        return state + action.payload;
    }else{
        return state;
    }
}


export default reducer;