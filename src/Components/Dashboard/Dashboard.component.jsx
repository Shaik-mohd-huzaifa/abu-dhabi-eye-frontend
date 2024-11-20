import { Outlet, useNavigate } from "react-router"
import { SideBar } from "../SideBar/SideBar.component"
import "./Dashboard.styles.scss"
import { useSelector } from "react-redux"
import { userSelector } from "../../store/User/User.selector"
import { useEffect } from "react"

export const Dashboard = () => {
    const user = useSelector(userSelector)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user){
            navigate("/login")
        }
    }, [user])
    
    return (
        <div className="dashboard-layout">
            <SideBar/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}