import React, { useState } from 'react'
import { supabase } from 'utils/connectdb'



function UpdateEmail({setAlreadyEmail}) {

  const [email,setEmail] = useState("")
  const [notification,setNotification] = useState(false)


  const updateEmail = async () =>{
     try {
            const user = await supabase.auth.getUser();
            console.log("id: : : ",user.data.user.id)
            const updates = {
            // user_id: user.data.user.id,
            email:email,
            // created_at: new Date(),
            };

            let { data,error } = await supabase.from('addresses').update({email:email}).eq("user_id",user.data.user.id).select();
            if (error) {
            throw error;
            }else{
              console.log(data)
              setNotification(true)
              setTimeout(() => {
                setNotification(false);
            }, 3000);
            }
            // console.log("data after inserting: ",data)
            if(data[0].address){
                setAlreadyEmail(data[0].address)
            }
        } catch (error) {
            alert(error.message);
            console.log(error.message)
        }
  }

  return (
    <div>
      <div className="form-control">
        <label className="input-group input-group-vertical">
          <span>Udpate Email</span>
          <div className="input-group input-group-horizontal">
            <input type="text" placeholder="info@site.com" className="input input-bordered" onChange={e=>setEmail(e.target.value)}/>
            <button className="btn btn-square" onClick={(e)=>updateEmail()}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
              update
            </button>
          </div>
          {notification ? (
              <div className="alert alert-success shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>email updated!</span>
                </div>
              </div>
            ) : (null)}
        </label>
      </div>
    </div>
  )
}

export default UpdateEmail
