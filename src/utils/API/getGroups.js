import axios from "axios"

export const getGroups = async () => {
    try{
        const data = await axios.get(
          "https://abu-dhabi-eye-1e0d1f21b33f.herokuapp.com/abudhabieye/groups",
        );  
        return data.data
    }catch(error){
        console.log(error)
    }
}