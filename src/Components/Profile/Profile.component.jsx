import "./Profile.styles.scss"
import { Input } from "../Mini Components/Input/Input.component"
import {useEffect, useState} from "react"
import { Select } from "../Mini Components/Select/Select.component"
import { travelerProfileOptions, interestsPreferencesOptions } from "../../assets/data/profile-options.data" 
import { useDispatch, useSelector } from "react-redux"
import { userDetailsSelector } from "../../store/User/User.selector"
import { updateUserDetails } from "../../utils/API/update_Profile"
import { SetCurrentUserDetails } from "../../store/User/User.actions"

const DEFAULT_VALUES = {
    username: "",
    email: "",
    phone: "",
    age: "",
    language: "",
    nationality: "",
    gender: "",
    travel_preference: "",
    culture: "",
    cuisine: "",
    shopping: "",
    adventure_activities: "",
}

const AWS_CLOUDFRONT_DISTRIBUTION_URL = import.meta.env.VITE_AWS_CLOUDFRONT_DISTRIBUTION_URL

export const Profile = () => {
    const [loginDetails, setLoginDetails] = useState(DEFAULT_VALUES);
    const userDetails = useSelector(userDetailsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userDetails){
            setLoginDetails({
                ...DEFAULT_VALUES,
                ...userDetails
            })
        }
        console.log(loginDetails)
    }, [userDetails])

    const HandleValue = (e) => {
        const { name, value } = e.target;
        setLoginDetails({
          ...loginDetails,
          [name]: value,
        });
        console.log(value)
      };
    
    // const Upload_Image = () => {

    // }

    const HandleSubmit = async () => {
        const update_user_details = await updateUserDetails(loginDetails)
        dispatch(SetCurrentUserDetails(update_user_details.user))
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-image">
                <div className="image">
                    <img src={`${AWS_CLOUDFRONT_DISTRIBUTION_URL}/profile-man.png`} alt="" />
                </div>
                <div className="buttons">
                    <button>Upload Image</button>
                </div>
            </div>
            <div className="user-details">
                <p className="header">Personal Details</p>
                <div className="inputs">
                <Input label="Name" type="text" value={loginDetails.username} name="username" onChange={HandleValue}/>
                <Input label="Phone" type="phone" value={loginDetails.phone} name="phone" onChange={HandleValue}/>
                <Select label="Age" options={travelerProfileOptions.ageGroup} value={loginDetails.age} name="age" onChange={HandleValue}/>
                <Select label="Gender" options={travelerProfileOptions.gender} value={loginDetails.gender} name="gender" onChange={HandleValue} />
                <Input label="Preffered Language" name="language" type="text" value={loginDetails.language} onChange={HandleValue} />
                <Select label="Nationality" name="nationality" options={travelerProfileOptions.nationality} value={loginDetails.nationality} onChange={HandleValue}/>
            </div>
            </div>
            <div className="user-details">
                <p className="header">Preference</p>
                <div className="inputs">
                <Select label="Travel Preference" options={travelerProfileOptions.travelPurpose} value={loginDetails.travel_preference} name="travel_preference" onChange={HandleValue}/>
                <Select label="Culture Preference" type="text" options={interestsPreferencesOptions.culturalInterests} value={loginDetails.culture} name="culture" onChange={HandleValue}/>
                <Select label="Cuisine Preference" options={interestsPreferencesOptions.cuisinePreferences} value={loginDetails.cuisine} name="cuisine" onChange={HandleValue}/>
                <Select label="Shopping Preference" options={interestsPreferencesOptions.shoppingPreferences} value={loginDetails.shopping} name="shopping" onChange={HandleValue} />
                <Select label="Adventure Activites" options={interestsPreferencesOptions.adventureInterests} value={loginDetails.adventure_activities} name="adventure_activities" onChange={HandleValue} />
            </div>
            </div>
            <button className="changes-button" onClick={HandleSubmit}>Save Changes</button>
        </div>
    )
}