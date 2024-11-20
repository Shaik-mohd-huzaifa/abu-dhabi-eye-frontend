import axios from "axios"

export const getCulturalEvents = async () => {
    try{
        const data = await axios.get(
          "https://abu-dhabi-eye-1e0d1f21b33f.herokuapp.com/abudhabieye/culturalEvents",
        );  
        return data.data
    }catch(error){
        console.log(error)
    }
}