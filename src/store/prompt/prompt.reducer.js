const Inital_state = {
    prompt: [{"type":"user", "prompt": "How is your Day"}]
}


export const promptReducer = (state = Inital_state, action) => {
    const {type, payload} = action
    
    if(type == "@update/prompt"){
        return {
            prompt: [...state.prompt, payload]
        }
    } 
    
    return state
}