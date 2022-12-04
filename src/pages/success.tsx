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
        ) : (
            <div className="w-[100%] flex justify-center items-center">
                <div className='flex flex-col justify-center items-center gap-y-12'>
                    <div className="alert alert-info shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>You aren't whitelisted yet! join discord or twitter to grind!</span>
                        </div>
                    </div>
                    <div className="flex w-[30%] justify-around">
                        <button className="btn btn-primary">
                            <a href="https://discord.gg/86ttwYPXuR" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                                </svg>
                            </a>
                        </button>
                        <button className="btn btn-primary">
                            <a href="https://twitter.com/DeScientistz" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
        ) : 
        (<div className="w-[100%] flex justify-center items-center">
            <h1>user is not logged in</h1>
        </div>)}
    </div>
  )
}

export default success