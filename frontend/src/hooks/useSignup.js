import { useState } from "react"
import { useAuthcontext } from "../comtext/useAuth"
import toast from "react-hot-toast"
const useSignup = () => {
    const {setauthuser} = useAuthcontext()
    const [loading,setloading] = useState(false)
  const signup = async ({fullname,username,password,confirmedpass,gender}) =>{
    const success = handleInputerror({fullname,username,password,confirmedpass,gender})
    if(!success) return;
     setloading(true)
     try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, username, password, confirmedpass, gender }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.setItem("chat-user", JSON.stringify(data));
        setauthuser(data);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setloading(false);
    }
} 
   return {signup , loading}
}

export default useSignup

const handleInputerror = ({fullname,username,password,confirmedpass,gender}) =>{
      if(!fullname || !username || !password || !confirmedpass || !gender){
        toast.error('Please enter all fields')
        return false
      }
      if(password !== confirmedpass){
        toast.error('Password and confirmed password does not match')
        return false
      }
      if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
      }
      return true
}