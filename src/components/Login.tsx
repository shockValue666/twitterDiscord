import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'
import {supabase} from '../utils/connectdb'
import Image from 'next/image'
import { newLogo } from 'assets';

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
    <div className='flex flex-col gap-y-8' >
        <h1 className='text-2xl'>Descientists Lablist</h1>
        <Image src={newLogo} width={360} height={240} />
        <h1>Login</h1>
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
