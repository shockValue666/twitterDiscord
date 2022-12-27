import React, { useEffect, useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import Router,{useRouter } from 'next/router'
import { supabase } from 'utils/connectdb'




function success() {

     const [user,setUser] = useState({});
    const router = useRouter(); 
    const [userimgDiscord,setUserImgDiscord] = useState("")
    const [username,setUsername] = useState("")
    const [discord,setDiscord] = useState("")
    const [info,setInfo] = useState({})
    const [userimgTwitter,setUserImgTwitter] = useState("")
    const [discordUsernameFromInput,setDiscordUsernameFromInput] = useState("")
    const [accepted,setAccepted] = useState(false)
    const [discordAuthVisible,setDiscordAuthVisible] = useState(false)
    const [errorNotification,setErrorNotification] = useState("");
    const [formVisible,setFormVisible] = useState(true)
    const [everythingSubmitted,setEverythingSubmitted] = useState(false)



    const [width, setWindowWidth] = useState(0)
    const [mobileView,setMobileView] = useState(false)


    useEffect(()=>{
        async function getUser(){
            const user = await supabase.auth.getUser();
            console.log("user: user: ",user)
            setUser(user)
            if(!user.data.user?.id){
                router.push("/");
            }else{

            
                // console.log(user.data.user.app_metadata.provider)
                checkIfUserHasAlreadySubmittedEverything(user);

                let { data,error } = await supabase.from('info').select().eq("user_id",user.data.user.id);

                if(user.data.user.identities.length == 1 && user.data.user.app_metadata.provider=="twitter"){
                    console.log("twitter")
                    await getUserDataTwitter(data,error)
                    
                }else if(user.data.user.identities.length == 2){
                    console.log("discord data: ",user.data.user)

                    let { data,error } = await supabase.from('info').select().eq("discord_name",user.data.user.user_metadata.name);
                    console.log("search query: ",user.data.user.user_metadata.name)
                    console.log("data from if statement: ",data)
                    await setUserDataDiscord(data,error,user)
        
                }
            }
            
        }
        getUser();
    },[])

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
    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut()
        if(error){
            console.log("error: ",error)
        }
        router.push("/");
    }
 
    const getUserDataTwitter = async (data,error) =>{
        if(data){
            if(data[0]?.discord_name){
                setDiscordAuthVisible(true);   
                setDiscordUsernameFromInput(data[0].discord_name)
            }
            if(data[0]?.accepted == "accepted"){
                setAccepted(true);
            }
            if(data[0]?.accepted !== "accepted"){
                router.push("/")
            }
            console.log("data from twitter: ",data)
        }else{
            console.log("error: ",error)
        }
    }

    const setUserDataDiscord = async(data,error,user) =>{
        let newData=data;
        if(newData[0]){
            if(newData[0]?.discord_name && newData[0]?.discord_img && newData[0]?.discord_id){
                console.log("some shit")
                // router.push('/getRole')
            }
            else{

                const updates = {
                    discord_name:user.data.user.user_metadata.name,
                    discord_img:user.data.user.user_metadata.avatar_url,
                    discord_id:user.data.user.user_metadata.sub
                }
                console.log("discordUsernameFromInput: ",discordUsernameFromInput)
                console.log("updates: ",updates)
                let { data,error } = await supabase.from('info').update(updates).eq("discord_name",user.data.user.user_metadata.name).select();
                if(data[0]){
                    console.log("data from updated discord: ",data)
                    router.push('/getRole')
                }else if(error){
                    console.log("error: ",error)
                }
            }
        }else{
            setErrorNotification("your discord username is wrong! Sign out, refresh and try again")
            const updates = {
                discord_name:null,
                discord_img:null,
                discord_id:null
            }
            console.log("discordUsernameFromInput: ",discordUsernameFromInput)
            console.log("updates: ",updates)
            let { data,error } = await supabase.from('info').update(updates).eq("discord_name",user.data.user.user_metadata.name).select();
            setDiscordUsernameFromInput(null)
            //
            // signOutUser();
            // Router.reload()
            
        }
    }

    const checkIfUserHasAlreadySubmittedEverything = async (user) =>{
        let { data,error } = await supabase.from('info').select().eq("user_id",user.data.user.id);
        if(data[0]?.discord_name && data[0]?.discord_img && data[0]?.discord_id){
            setEverythingSubmitted(true)
            return;
        }
    }

    

    useEffect(()=>{
        if(username && userimgDiscord){
            console.log("username: ",username," userImg: ",userimgDiscord)
        }
    },[username,userimgDiscord])

    useEffect(()=>{
        if(username && userimgTwitter){
            console.log("username: ",username," userImg: ",userimgTwitter)
        }
    },[username,userimgTwitter])

    useEffect(()=>{
        console.log("info: ",info)
    },[info])

    useEffect(()=>{
        console.log("accepted: ",accepted)
    },[accepted])


    const saveDiscordName = async () =>{
        const user = await supabase.auth.getUser();
        const updates = {
            discord_name:discordUsernameFromInput
        }
        let { data,error } = await supabase.from('info').update(updates).eq("user_id",user.data.user.id).select();
              

        if(data){
        console.log("data: ",data)
            if(data[0]?.discord_name){
                setDiscordAuthVisible(true);   
                setFormVisible(false);
            }else{
                setErrorNotification("you need to apply first! Visit https://lablist.depravedscientists.online")
            }
        }
        else{
            console.log("error: ",error)
            // setErrorNotification("you need to apply first! Visit https://lablist.depravedscientists.online")
        }
    }

    useEffect(()=>{
        console.log("everythingsubmitted: ",everythingSubmitted)
    },[everythingSubmitted])

    useEffect(()=>{

    },[errorNotification])

    

  return (
    <div>
        {Object.keys(user).length !== 0 ? 
        (<> 
           <div className='flex flex-col items-center justify-center gap-y-8 mt-10' >
            <h1>discord name</h1>
            {
                !formVisible ?
                (null)
                :
                (
                    <div className='flex justify-center items-center gap-x-5' >
                        <input type="text" placeholder="username#0000" onChange={(e)=>{setDiscordUsernameFromInput(e.target.value)}} className="input input-bordered input-primary w-full max-w-xs" />
                        <button className="btn btn-accent" onClick={()=>{saveDiscordName()}}>Set Discord Name</button>
                    </div>
                )
            }
                {
                    discordAuthVisible ? 
                    (<Auth
                        supabaseClient={supabase}
                        appearance={{theme: ThemeSupa}}
                        theme={"dark"}
                        providers={['discord']}
                        onlyThirdPartyProviders={true}
                        // redirectTo={`${window.location.origin}/success`}
                        // redirectTo={"https://main--magical-haupia-2e0644.netlify.app/success"}
                        // redirectTo={"https://whitelist.depravedscientists.online/"}
                    />)
                    :(
                        null
                    )
                }
                {
                    errorNotification ?
                    (
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Error! {errorNotification}</span>
                            </div>
                            </div>
                    )
                    :
                    (null)

                }
                    
           </div>
           <button className="btn btn-accent" onClick={()=>{signOutUser()}}>Sign out</button>
        </>
        ) : 
        (<div className="w-[100%] flex justify-center items-center">
            <h1>user is not logged in</h1>
        </div>)}
    </div>
  )
}

export default success