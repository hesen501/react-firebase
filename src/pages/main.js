import { getDocs,collection  } from "firebase/firestore"
import { auth, db } from "../config/firebase"
import { useEffect, useState } from "react"
import Post from "../components/post"
import { useAuthState } from "react-firebase-hooks/auth"
const Main = () =>{
    const[posts,SetPosts] = useState(null)
    const postCollection = collection(db, 'posts')
    const [user] = useAuthState(auth);

    const getPosts = async () => {
        const data = await getDocs(postCollection)
        SetPosts( data?.docs?.map((doc)=>({...doc.data(),id:doc.id})))
    }
    
    useEffect(() => {
        getPosts();
    },[])

    return (
        <div>
            <ul>
                {posts && posts?.map((post)=>{
                    if(user)
                    return (
                        <Post 
                            id={post?.id} 
                            title={post?.title} 
                            description={post?.description} 
                            username={post?.username} 
                            key = {post?.id}
                            />
                    )
                     })}
            </ul>
        </div>)
}
export default Main