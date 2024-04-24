import axios from "axios"
import { useNavigate } from "react-router-dom"
import Base_Url from "../baseUrl";
axios.defaults.withCredentials=true
const verifyUser = async ()=>{
    let result;
    try {
        const res = await axios.get(`http://${Base_Url}/verifyUser`)
        result = res.data.user
    } catch (error) {
        const navigate = useNavigate()
        console.log(error)
        navigate('/login')
    }
    console.log(result , 'this is result')
    return result
}

export default verifyUser;