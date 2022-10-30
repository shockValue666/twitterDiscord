import React, { useEffect, useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")



function success() {

     const [user,setUser] = useState({});
    const router = useRouter(); 
    const [discordId,setDiscordId] = useState(null)
    const [isWhitelisted,setIsWhitelisted] = useState(false)
    const [userAddress,setUserAddress] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const [update,setUpdate] = useState(false)
    const [alreadyAddress,setAlreadyAddress] = useState("");
    const [userAddressToBeUpdated,setUserAddressToBeUpdated] = useState("");


    useEffect(()=>{
    },[])

    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut()
        if(error){
            console.log("error: ",error)
        }
        router.push("/");
    }

    const setAddress = async () => {
        console.log("userAddress :",userAddress)
        try {
            const user = await supabase.auth.getUser();
            console.log("id: : : ",user.data.user.id)
            const updates = {
            user_id: user.data.user.id,
            address:userAddress,
            // created_at: new Date(),
            };

            let { data,error } = await supabase.from('addresses').insert(updates).select();
            if (error) {
            throw error;
            }
            console.log("data after inserting: ",data)
            if(data[0].address){
                setAlreadyAddress(data[0].address)
            }
        } catch (error) {
            alert(error.message);
        }
    }


    const updateAddress = async () => {
        console.log("userAddress :",userAddressToBeUpdated)
        try {
            const user = await supabase.auth.getUser();
            console.log("id: : : ",user.data.user.id)
            const updates = {
            user_id: user.data.user.id,
            address:userAddress,
            // created_at: new Date(),
            };

            let { data,error } = await supabase.from('addresses').insert(updates).select();
            if (error) {
            throw error;
            }
            console.log("data after inserting: ",data)
        } catch (error) {
            alert(error.message);
        }
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
        if(discordId){
            const isWhiteListedFunction = async () => {
                console.log(`https://wl-checker.herokuapp.com/${discordId}`)
                const res = await fetch(`https://wl-checker.herokuapp.com/${discordId}`)
                const body = await res.json()
                if(body){
                    setIsWhitelisted(true)
                }
                setIsLoading(false)
                console.log("RES: ",typeof body);
            }
            isWhiteListedFunction();
        }
    },[discordId])

    useEffect(()=>{
        const getUserAddress = async () =>{
            const user = await supabase.auth.getUser()
            const id = user.data.user.id
            const { data, error } = await supabase
                .from('addresses')
                .select()
                .eq('user_id', `${id}`)

            if(error){
                console.log("error: ",error)
            }else{
                console.log("data: ",data);
                if(data[0]?.address){
                    setAlreadyAddress(data[0].address)
                }
            }
        }
        getUserAddress();
    },[])

    useEffect(()=>{
        if(alreadyAddress){
            console.log("alreadyaddress: ",alreadyAddress)
        }
    },[alreadyAddress])

    useEffect(()=>{
        console.log("USER SET: ",user)
    },[user])
  return (
    <div>
        {Object.keys(user).length !== 0 ? 
        (<> <h1>
            success
            </h1>
            {isLoading ? (<>
                
                <div role="status">
                    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            </>) : (null)}
        <button onClick={()=>signOutUser()}>sign out </button>
        {isWhitelisted ? (
        <div className='flex flex-col gap-y-24 items-center justify-center w-screen border border-white-700'>
            <h2 className='text-2xl' >user is whitelisted</h2>
            {alreadyAddress ?
            (<>
                <h1> address you have submitted: {alreadyAddress}</h1>
                <form onSubmit={e=>{e.preventDefault();updateAddress();}} className={"flex flex-col gap-y-8"}>
                    <div>
                        <input type="text" placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" value={userAddressToBeUpdated} onChange={(e) => setUserAddressToBeUpdated(e.target.value)}/>

                    </div>
                    <div>
                        <button type="submit" className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... ">
                            <span>update address</span>
                        </button>
                    </div>
                </form>
            </>) 
            : 
            (<form onSubmit={e=>{e.preventDefault();setAddress();}} className={"flex flex-col gap-y-8"}>
                <div>
                    <input type="text" placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" value={userAddress} onChange={(e) => setUserAddress(e.target.value)}/>

                </div>
                <div>
                    <button type="submit" className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... ">
                        <span>set address</span>
                    </button>
                </div>
            </form>)}
        </div>
        ) : (null)}
        </>
        ) : 
        (<><h1>user is not logged in</h1></>)}
    </div>
  )
}

export default success