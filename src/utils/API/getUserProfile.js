import axios from "axios"

export const getUserProfile = async (email, username = "") => {
    try{
        const data = await axios.post(
          "https://abu-dhabi-eye-1e0d1f21b33f.herokuapp.com/abudhabieye/getUserDetails",
          { email: email, username: username },
        );  
        return data.data
    }catch(error){
        console.log(error)
    }
}