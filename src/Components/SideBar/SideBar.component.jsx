import { Link, useNavigate } from "react-router-dom"
import "./SideBar.styles.scss"
import { TbSpeakerphone } from "react-icons/tb";
import { RiMapPinUserFill } from "react-icons/ri";
import { SiTeamspeak } from "react-icons/si";
import { FaPeoplePulling } from "react-icons/fa6";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { userSignOut } from "../../utils/firebase/config";
import { FaSignOutAlt } from "react-icons/fa";



export const SideBar = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {
        userSignOut();
        navigate("/login")
      };
    return (
        <div className="sidebar">
            <div className="header">
            <img src="/logo.png" alt="" />
<h2>Abu Dhabi Eye</h2>
            </div>
            <ul>
                <li><RiMapPinUserFill className="icon"/>
<Link to="profile">Profile</Link></li>
                <li><SiTeamspeak  className="icon" />
<Link to="cultural-events">Cultural Meetups</Link>
</li>
                <li><FaPeoplePulling  className="icon"/>
<Link to="travel-groups">Groups</Link>
</li>
                <li><RiCompassDiscoverLine  className="icon"/>
<Link to="chat">Chat</Link></li>
            </ul>
            <div className="buttons">
                <button onClick={handleSignOut}><FaSignOutAlt/> Logout</button>
            </div>
        </div>
    )
} 
