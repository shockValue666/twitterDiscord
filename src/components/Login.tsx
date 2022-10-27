import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")


function Login() {
    const router = useRouter()

    supabase.auth.onAuthStateChange(async (e)=>{
        if(e !== "SIGNED_OUT"){
            router.push("/success");
        }else{
             router.push("/")
        }
    })
  return (
    <div>Login
        <Auth
            supabaseClient={supabase}
            appearance={{theme: ThemeSupa}}
            theme={"dark"}
            providers={['discord']}
        />
    </div>
  )
}

export default Login