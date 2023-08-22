import { auth,provider } from "../config/firebase"
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from "react-router-dom"

const Login = () =>{
    const navigate = useNavigate()

    const signInWithGoogle = async () =>{
        const result = await signInWithPopup(auth,provider)
        console.log(result);
        navigate('/')
    }

    return (
    <div>
        <label></label>
        <button onClick={signInWithGoogle}> Google sign in</button>
    </div>
    )
}
export default Login