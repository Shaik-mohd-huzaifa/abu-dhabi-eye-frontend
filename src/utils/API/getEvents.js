import axios from "axios"

export const getCulturalEvents = async () => {
    try{
        const data = await axios.get("http://127.0.0.1:8000/abudhabieye/culturalEvents")  
        return data.data
    }catch(error){
        console.log(error)
    }
}