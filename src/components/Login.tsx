import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'
import {supabase} from '../utils/connectdb'

function Login(props) {
    const router = useRouter()
    console.log("router: ",router)


    supabase?.auth.onAuthStateChange(async (e)=>{
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
            // redirectTo={`${window.location.origin}/success`}
            // redirectTo={"https://main--magical-haupia-2e0644.netlify.app/success"}
            redirectTo={"https://whitelist.depravedscientists.online/"}
        />
    </div>
  )
}



export default Login
