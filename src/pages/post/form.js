import { useForm } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../config/firebase"
import { addDoc ,collection} from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const Form = ()=>{
const schema = yup.object().shape({
    title:yup.string().required('enter a title'),
    description:yup.string().required('enter a description'),
})
const { register , handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
})
const postCollection = collection(db,'posts')
const [user] = useAuthState(auth);
const navigate = useNavigate()
const FormSubmit = async (data)=>{
    await addDoc(postCollection,{
        ...data,
        username:user?.displayName,
        userId:user?.uid
    })
    navigate('/')
}
    return(
    <form className="post-form form-group" onSubmit={handleSubmit(FormSubmit)}>
        <input className="form-control input" placeholder="Title" {...register('title')}/>
        <p style={{color:'red'}}>{errors.title?.message}</p>
        <textarea className="form-control input" placeholder="Description" {...register("description")}/>
        <p style={{color:'red'}}>{errors.description?.message}</p>
        <input className="form-control post-submit" type="submit"/>
    </form>
    )
}
export default Form