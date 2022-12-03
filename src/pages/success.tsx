import React, { useEffect, useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'
import { supabase } from 'utils/connectdb'
import Image from 'next/image'
import SetEmail from '../components/SetEmail'
import UpdateEmail from 'components/updateEmail'
import SetAddress from 'components/SetAddress'
import UpdateAddress from 'components/UpdateAddress'
import DesktopView from 'components/DesktopView'
import MobileView from 'components/MobileView'





function success() {

     const [user,setUser] = useState({});
    const router = useRouter(); 
    const [discordId,setDiscordId] = useState(null)
    const [isWhitelisted,setIsWhitelisted] = useState(false)
    const [userAddress,setUserAddress] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const [update,setUpdate] = useState(false)
    const [alreadyAddress,setAlreadyAddress] = useState("");
    const [alreadyEmail,setAlreadyEmail] = useState("");
    const [userAddressToBeUpdated,setUserAddressToBeUpdated] = useState("");
    const [userimg,setUserImg] = useState("")
    const [username,setUsername] = useState("")



    const [width, setWindowWidth] = useState(0)
    const [mobileView,setMobileView] = useState(false)

    useEffect(() => { 

     updateDimensions();
     console.log("width: ",width)
     if(width<620){
        console.log("mobile view is smaller than 480 ")
        console.log("width<480: ", width<480)
        setMobileView(true)
     }else{
        setMobileView(false)
     }

     window.addEventListener("resize", updateDimensions);
     return () => 
       window.removeEventListener("resize",updateDimensions);
    })

    useEffect(()=>{
        console.log("mobileview: : : ",mobileView)
    },[mobileView])


    const updateDimensions = () => {
      const width = window.innerWidth
      setWindowWidth(width)
    }

    useEffect(()=>{
    },[])

    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut()
        if(error){
            console.log("error: ",error)
        }
        router.push("/");
    }

    


    

    useEffect(()=>{
        async function getUserData(){
            const user = await supabase.auth.getUser()
            if(user.data?.user){
                console.log(user.data.user.user_metadata.provider_id)
                setDiscordId(user.data.user.user_metadata.provider_id)
                setUser(user.data.user)
            }
        }
        getUserData();
    },[]) // runs once


    useEffect(()=>{
        console.log("discordiddddddd: ",discordId)
        if(discordId){
            const isWhiteListedFunction = async () => {
                // console.log(`https://wl-checker.herokuapp.com/${discordId}`)
                // const res = await fetch(`https://wl-checker.herokuapp.com/${discordId}`)
                
                // const res = await fetch(`https://wlapi.onrender.com/${discordId}`)
                const res = await fetch(`https://wl-api.vercel.app/${discordId}`)
                console.log("res: ",res)
                const body = await res.json()
                if(body){
                    console.log("whitelisteddddd")
                    setIsWhitelisted(true)
                }
                setIsLoading(false)
                // console.log("RES: ",typeof body);
            }
            isWhiteListedFunction();
        }
    },[discordId])

    useEffect(()=>{
        const getUserAddress = async () =>{
            const user = await supabase.auth.getUser()
            const id = user.data.user?.id
            const { data, error } = await supabase
                .from('addresses')
                .select()
                .eq('user_id', `${id}`)

            if(error){
                // console.log("error: ",error)
            }else{
                // console.log("data: ",data);
                if(data[0]?.address){
                    setAlreadyAddress(data[0].address)
                }
                if(data[0]?.email){
                    setAlreadyEmail(data[0].email)
                }
            }
        }
        getUserAddress();
    },[])

    useEffect(()=>{
        async function getUser(){
        const user = await supabase.auth.getUser();
        console.log("user: user: ",user)
        if(!user.data.user?.id){
            router.push("/");
        }
        setUserImg(user.data.user.user_metadata.avatar_url)
        setUsername(user.data.user.user_metadata.full_name)
        }
        getUser();
    },[])

    useEffect(()=>{
        if(username && userimg){
            console.log("username: ",username," userImg: ",userimg)
        }
    },[username,userimg])

  return (
    <div>
        {Object.keys(user).length !== 0 ? 
        (<> 
            {isLoading ? (<>
                
                <div role="status">
                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            </>) : (null)}
        <button onClick={()=>signOutUser()} className="group w-30 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... ">sign out </button>
        {isWhitelisted && user ? (
        <div className='flex flex-col items-center gap-y-12 justify-around w-[100%] '>
            
                <h2 className='text-2xl' >Congratulations {username} you are whitelisted</h2>
                {alreadyAddress ? <h1> address you have submitted: {alreadyAddress}</h1> : (null)}
                {alreadyEmail ? <h1> email you have submitted: {alreadyEmail}</h1> : (null)}
                {userimg ? (<Image
                    src={userimg}
                    height={200}
                    width={200}
                />) : (null)}

                {
                    mobileView ?
                    (
                        <div className='w-[100%]'>
                            <MobileView alreadyAddress={alreadyAddress} alreadyEmail={alreadyEmail} setAlreadyAddress={setAlreadyAddress} setAlreadyEmail={setAlreadyEmail}/>
                        </div>
                    )
                    :
                    
                    (
                        <div className='w-[100%]'>
                            <DesktopView alreadyAddress={alreadyAddress} alreadyEmail={alreadyEmail} setAlreadyAddress={setAlreadyAddress} setAlreadyEmail={setAlreadyEmail}/>
                        </div>
                    )
                }


                    
        </div>
        ) : (null)}
        </>
        ) : 
        (<><h1>user is not logged in</h1></>)}
    </div>
  )
}

export default success