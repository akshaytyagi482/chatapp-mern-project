import { createContext, useContext, useState } from "react";

export const Authuser = createContext()
export const useAuthcontext = () =>{
      return useContext(Authuser)
}
export const AuthContextProvider = ({children}) =>{
     const [authuser,setauthuser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null)
     return <Authuser.Provider value={{authuser,setauthuser}}>
        {children}  
     </Authuser.Provider>
}