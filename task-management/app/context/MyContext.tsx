'use client'

import api from "@/config";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

interface User {
    id: string;
    name: string;
    email: string;
  }

interface MyContextData{
    currentUser: User|null,
    Login: (user: User) => void;
    Logout: () => void;
}

// initial state
const initialState:MyContextData = {
    currentUser:null,
    Login: () => {},
    Logout: () => {},
}

export const MyContext = createContext<MyContextData | undefined>(undefined);

type Action = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };


const reducer = (state: Omit<MyContextData, 'Login' | 'Logout'>, action:Action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, currentUser:action.payload}
        case "LOGOUT":
            return {...state, currentUser:null}
        
        default:
            return state
    }
}


export const MyContextProvider = ({children}:{children:ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const Login = (user:User) => {
        dispatch({
            type:"LOGIN",
            payload:user
        })
    }

    const Logout = () => {

        localStorage.removeItem("Token")
        toast.success("Logout successfull!")
        dispatch({
            type:"LOGOUT"
        })
    }

    useEffect(() => {
        const getCurrentUser = async () => {
          const token = localStorage.getItem("Token");
      
          if (token) {
            try {
              const parsedToken = JSON.parse(token);
              const response = await api.post("/get-current-user", { token: parsedToken });
      
              if (response.data.success) {
                dispatch({
                  type: "LOGIN",
                  payload: response.data.user,
                });
              } else {
                toast.error(response.data.message);
              }
            } catch (error:any) {
              toast.error(error.response.data.message);
            }
          } else {
            console.log("No token found in local storage.");
          }
        };
      
        getCurrentUser();
      }, []);
      
    

    return(
        <>
            <MyContext.Provider value={{currentUser:state.currentUser, Login, Logout}}>{children}</MyContext.Provider>
        </>
    )
}


export const useMyContext = () => {
    const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}

