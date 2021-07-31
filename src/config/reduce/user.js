const userState = JSON.parse(localStorage.getItem('user')||'{}')
export default (state=userState,action)=>{
    switch(action.type){
        case 'SET_USER':  
            let newState =  {...state,...action.value}
            localStorage.setItem('user',JSON.stringify(newState));
        default:return state;
    }
}