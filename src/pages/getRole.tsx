import {useRouter} from 'next/router'
import React, { useEffect, useState } from 'react'
import { supabase } from 'utils/connectdb'

function getRole() {

    const [user,setUser] = useState(null)
    const [discordAvatar,setDisocrdAvatar] = useState("")
    const [discordName,setDiscordName] = useState("")
    const [twitterName,setTwitterName] = useState("");
    const [twitterImg,setTwitterImg] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [whitelisted,setIsWhitelisted] = useState(false)
    const [discordId,setDiscordId] = useState("");
    const [isInserver,setIsInServer] = useState(false)
    const [successMessage,setSuccessMessage] = useState(false)
    const router = useRouter()

    const getRoleRequest = async ()=>{
           if(discordId){
            const isWhiteListedFunction = async () => {
                // console.log(`https://wl-checker.herokuapp.com/${discordId}`)
                // const res = await fetch(`https://wl-checker.herokuapp.com/${discordId}`)
                
                // const res = await fetch(`https://wlapi.onrender.com/${discordId}`)
                const res = await fetch(`https://wl-api.vercel.app/addRole/${discordId}`)
                console.log("res: ",res)
                const body = await res.json()
                if(body){
                    console.log("whitelisteddddd",body)
                    setIsWhitelisted(true)
                    setSuccessMessage(true)
                }
                setIsLoading(false)
                // console.log("RES: ",typeof body);
            }
            isWhiteListedFunction();
        }
    }

    useEffect(()=>{
        const getUser = async () =>{
            const _user = await supabase.auth.getUser();
            console.log("user: user: ",_user)
            let { data,error } = await supabase.from('info').select().eq("discord_name",_user.data.user.user_metadata.name);
            if(data){
                if(!data[0]?.discord_id || !data[0]?.discord_img || !data[0]?.discord_name ){
                    router.push("/")
                }else{
                    console.log("data: ",data)
                    setDisocrdAvatar(data[0].discord_img)
                    setDiscordName(data[0].discord_name)
                    setTwitterImg(data[0].avatar)
                    setTwitterName(data[0].twitter_handle)
                    setDiscordId(data[0].discord_id)
                    console.log("discord id: ",data[0].discord_id)
                    const res = await fetch(`https://wl-api.vercel.app/isinserver/${data[0].discord_id}`)
                    console.log("res: ",res)
                    const body = await res.json()
                    if(body){
                        console.log("in server",body)
                        setIsInServer(true)
                    }else{
                        setIsInServer(false)
                        console.log("not inserver")
                    }
                }
            }else if(error){
                router.push("/")
            }
            if(_user.data.user.user_metadata)
            setUser(_user)
        }
        getUser()
    },[])
  return (
    <div className='flex flex-col items-center justify-center gap-y-18 mt-10'>
        <div className="flex items-center">
            <div className="avatar">
                <div className="w-24 mask mask-squircle">
                    <img src={discordAvatar} />
                </div>
            </div>
            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                <li><a>{discordName}</a></li>
            </ul>
              <div className="divider lg:divider-horizontal"></div> 

            <ul className="menu bg-base-100 w-56 p-2 rounded-box">
                <li><a>{twitterName}</a></li>
            </ul>
            <div className="avatar">
                <div className="w-24 mask mask-squircle">
                    <img src={twitterImg} />
                </div>
            </div>
        </div>
        {
            discordId && !whitelisted ? 
            (
            <div>
                <button className="btn btn-active btn-primary" onClick={()=>{getRoleRequest()}}>Get Role on Discord</button>
            </div>
            )
            :
            (null)
        }

        {
            isInserver ? 
            (null)
            :
            (
            <div>
                <a href="https://discord.gg/86ttwYPXuR" target="_blank">
                    <button className="btn btn-active btn-primary" onClick={()=>{getRoleRequest()}}> join discord </button>
                </a>
            </div>
            )

        }
        {
            successMessage?
            (
                <div className="alert alert-info shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Congratulations you are now whitelisted in discord!</span>
                    </div>
                </div>
            )
            :
            (null)
        }
    </div>
  )
}

export default getRole
