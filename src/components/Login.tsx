import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")
// const supabase = createClient("https://mzamjqypleiulkflzfxs.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16YW1qcXlwbGVpdWxrZmx6ZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcxNzAzMzksImV4cCI6MTk4Mjc0NjMzOX0.A7TJTU3AJZ8qeJS_vzwdndp4PM6lCjq6mqI6JDqeUpA")

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
            onlyThirdPartyProviders={true}
        />
    </div>
  )
}

export default Login