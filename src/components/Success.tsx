import React,{useEffect,useState} from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")



function Success() {
    const [user,setUser] = useState({});
    const router = useRouter();

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
    <div>Success</div>
  )
}

export default Success