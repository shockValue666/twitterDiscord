import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'
import {supabase} from '../utils/connectdb'

function Login(props) {
    const router = useRouter()


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
        />
    </div>
  )
}



export default Login
