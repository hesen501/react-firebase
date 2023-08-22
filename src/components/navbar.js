import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
const Navbar = () =>{
    const [user] = useAuthState(auth);
    const logout = async ()=>{
        signOut(auth)
    }

    return (
    <div className="nav">
        <Link className="nav-link" to='/'><i className="fa fa-fw fa-home"></i>Home</Link>
        <Link className="nav-link" to='/post'><i className="fa fa-fw fa-book"></i>Post</Link>
        {!user && <Link className="nav-link" to='/login'><i className="fa fa-fw fa-user"></i>Login</Link>}
        {/* <Link to='/'></Link>
        <Link to='/'></Link> */}
        <div className="profile">
            {user && <button className="profile-button btn btn-danger" onClick={logout}>Logout</button>}
            <div>
                <img height={"60px"} src={user?.photoURL || "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}/>
                <p>{user?.displayName  }</p>
            </div>
        </div>
    </div>
    )
} 
export default Navbar