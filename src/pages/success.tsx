import React, { useEffect, useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")

const userId = "957874443433160766";
const guildId = "1017916656242130954";
const bot_token =
  "MTAzMjk0NzU4OTAzOTAxODAzNQ.G-nfAD.gGfXE4yPp7esevaH12IdpS3uyxyTAB0jeMqkMM";

  const guildMemberURL = `https://discord.com/api/guilds/${guildId}/members/${userId}`;
const guidlRolesURL = `https://discord.com/api/guilds/${guildId}/roles`;

const headers = {
  authorization: `Bot ${bot_token}`,
};



function success() {

     const [user,setUser] = useState({});
    const router = useRouter(); 

    // if(client){
    //     console.log("client: ",client)
    // }else{
    //     console.log("no client")
    // }

    useEffect(()=>{
        fetch(guidlRolesURL,{method:"GET",headers})
        .then((response) => response.json())
          .then((data) => console.log(data));
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
                console.log(user.data.user)
                setUser(user.data.user)
            }
        }
        getUserData();
    },[]) // runs once
  return (
    <div>
        {Object.keys(user).length !== 0 ? (<> success
        <button onClick={()=>signOutUser()}>sign out </button></>) : (<><h1>user is not logged in</h1></>)}
    </div>
  )
}

export default success