import { addDoc, collection ,getDocs,query, where,deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";


const Post = (props) =>{
    const [like ,setLike] = useState(null)
    const likeCollection = collection(db,"likes")
    const [user] = useAuthState(auth);

    useEffect(() => {
        getLikes()
    },[])

    console.log(like, "LIKE STATE")

    const addLike = async ()=>{
        if(user){
        try{
        const newDoc = await addDoc(likeCollection,{
            userId:user?.uid,
            postId:props?.id
        })
        setLike((prev)=> [...prev, {userId:user.uid,likeId:newDoc.id}])        
        }catch{
            console.log('error');
        }
        }
    }
    const removeLike = async ()=>{
        if(user){
            try{
            const LikeToDeleteQuery = query(
                likeCollection,
                where("postId","==",props.id),
                where('userId','==',user.uid)
            )
            const LikeToDeleteData = await getDocs(LikeToDeleteQuery)
            const LikeToDelete = doc(db,"likes",LikeToDeleteData.docs[0].id)
            deleteDoc(LikeToDelete)   
            setLike((prev)=>prev.filter((item)=>item.likeId !== LikeToDeleteData.docs[0].id))  
            }catch(error){
                console.error('Error:', error);
            }
        }
    }
    
    const likedocs = query(likeCollection, where("postId","==",props.id))

    const getLikes = async ()=> {
        const data = await getDocs(likedocs)
        setLike(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
    }

    
    const isLiked= like?.find((item)=>item.userId === user.uid)
    return(
        <div>
            <div className="">
                <h1>{props.title}</h1>
            </div>
            <div className="">
                <p>{props.description}</p>
            </div>
            <div className="">
                <p>@{props.username}</p>
                <button onClick={isLiked ? removeLike : addLike}>{ isLiked ? <>&#128078;</>:<>&#128077;</>}</button>
                {like && <p>Likes:{like.length}</p>}
            </div>
        </div>
    )
}
export default Post