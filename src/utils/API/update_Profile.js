import axios from "axios"

export const updateUserDetails = async (user_details) => {
    try{
        const data = await axios.post(
          "https://abu-dhabi-eye-1e0d1f21b33f.herokuapp.com/abudhabieye/updateUserDetails",
          { user_details: user_details },
        );  
        return data.data
    }catch(error){
        console.log(error)
    }
}