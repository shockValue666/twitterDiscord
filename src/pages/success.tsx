import React, { useEffect, useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")



function success() {

     const [user,setUser] = useState({});
    const router = useRouter(); 
    const [discordId,setDiscordId] = useState(null)


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
        if(discordId){
            const isWhiteListedFunction = async () => {
                console.log(`https://wl-checker.herokuapp.com/${discordId}`)
                const res = await fetch(`https://wl-checker.herokuapp.com/${discordId}`, {mode: 'no-cors'})
                const body = await res.json()
                console.log("RES: ",res);
            }
            isWhiteListedFunction();
        }
    },[discordId])
  return (
    <div>
        {Object.keys(user).length !== 0 ? (<> success
        <button onClick={()=>signOutUser()}>sign out </button></>) : (<><h1>user is not logged in</h1></>)}
    </div>
  )
}

export default success