import "./CulturalEventsCreation.styles.scss";
import { Input } from "../Mini Components/Input/Input.component";
import { useState } from "react";
import Select from "react-select"; // Import React-Select
import { IoIosAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import uploadToS3 from "../../utils/aws/uploadToS3";
import createEvent from "../../utils/API/createEvent";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/User/User.selector";

const event_creation_fields = {
    event_name: "",
    event_tags: [],
    event_description: "",
    event_cover_image: "",
    event_attendees: [],
    event_total_activities: 0,
    event_host: "",
    event_start: "", // New field for start date and time
    event_end: "", // New field for end date and time
  };
  


const tagOptions = [
  { value: "Adventure", label: "Adventure" },
  { value: "Culture", label: "Culture" },
  { value: "Family", label: "Family" },
  { value: "Food", label: "Food" },
  { value: "Nature", label: "Nature" }
];

export const CulturalEventCreation = () => {
  const [Inputs, setInputs] = useState(event_creation_fields);
  const [SelectedFile, setSelectedFile] = useState("");
  const user = useSelector(userSelector)
  const navigate = useNavigate()

  const HandleValue = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };

//   Formats the normal date into SQL storable date
  const formatDateTimeForMySQL = (datetime) => {
    return new Date(datetime).toISOString().slice(0, 19).replace("T", " ");
  };

  const FileHandling = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const HandleTagsChange = (selectedOptions) => {
    setInputs({
      ...Inputs,
      event_tags: selectedOptions.map(option => option.value), // Store only values
    });
  };

  const HandleSubmit = async () => {
    try{
        await uploadToS3(SelectedFile, SelectedFile.name)
        Inputs.event_cover_image = SelectedFile.name
        Inputs.event_host = user.email
        console.log(Inputs.event_cover_image)
        Inputs.event_start = formatDateTimeForMySQL(Inputs.event_start);
        Inputs.event_end = formatDateTimeForMySQL(Inputs.event_end);
        await createEvent(Inputs)
        alert("Event Created Successfully")
        navigate("/dashboard/cultural-events")
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className="event-creation-container">
      <h2>Create Event</h2>
      <div className="file-upload">
      <p>Event Cover Image</p>
      <div className="file-upload-container">
          <div className="file-upload flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={FileHandling}
              />
            </label>
          </div>
        </div>
        </div>
      <div className="inputs-container">
        <Input 
          name="event_name" 
          label="Event Name" 
          onChange={HandleValue} 
          value={Inputs.event_name} 
        />
        <div className="multi-select-container">
          <label htmlFor="event_tags">Event Tags</label>
          <Select
            isMulti
            className="multi-select"
            options={tagOptions}
            name="event_tags"
            onChange={HandleTagsChange}
            value={tagOptions.filter(option => Inputs.event_tags.includes(option.value))} // Match selected values
          />
        </div>
        <div className="input-group">
            <label htmlFor="event_description">Event Description</label>
        <textarea name="event_description" onChange={HandleValue} value={Inputs.event_description} type="text"/>
        </div>
        <Input label="Total Activites" name="event_total_activities" type="number" value={Inputs.event_total_activities} onChange={HandleValue}/>
      </div>
      <div className="input-group">
  <label htmlFor="event_start">Event Start</label>
  <input
    type="datetime-local"
    name="event_start"
    onChange={HandleValue}
    value={Inputs.event_start}
  />
</div>
<div className="input-group">
  <label htmlFor="event_end">Event End</label>
  <input
    type="datetime-local"
    name="event_end"
    onChange={HandleValue}
    value={Inputs.event_end}
  />
</div>

              <div className="button">
        <Link to="/dashboard/cultural-events"><button>Back</button></Link>
        <button onClick={HandleSubmit}>Create Event <IoIosAdd/></button>
        
      </div>
    </div>
  );
};
