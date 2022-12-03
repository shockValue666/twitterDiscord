import React, { useState } from 'react'
import { supabase } from 'utils/connectdb'



function SetAddress({setAlreadyAddress}) {

  const [address,setAddress] = useState("")
  const [notification,setNotification] = useState(false)


  const insertAddress = async () =>{
    console.log("address: ",address)
    //       // console.log("userAddress :",userAddress)
          try {
              const user = await supabase.auth.getUser();
              // console.log("id: : : ",user.data.user.id)
              let { data,error } = await supabase.from('addresses').select().eq("user_id",user.data.user.id);
            if(data[0]?.address || data[0]?.email){
              
              let { data,error } = await supabase.from('addresses').update({address:address}).eq("user_id",user.data.user.id).select();
              if (error) {
              throw error;
              }
              console.log("data after inserting: ",data)
              if(data[0].address){
                  setAlreadyAddress(data[0].address)
                  setNotification(true)
                  setTimeout(() => {
                      setNotification(false);
                  }, 3000);
              } 
            }else{
              const updates = {
                user_id: user.data.user.id,
                address:address,
                // created_at: new Date(),
              };

              let { data,error } = await supabase.from('addresses').insert(updates).select();
              if (error) {
              throw error;
              }
              console.log("data after inserting: ",data)
              if(data[0].address){
                  setAlreadyAddress(data[0].address)
                  setNotification(true)
                  setTimeout(() => {
                      setNotification(false);
                  }, 3000);
              } 
            }
          } catch (error) {
              alert(error.message);
          }
  }

  return (
    <div>
      <div className="form-control">
        <label className="input-group input-group-vertical">
          <span>set address</span>
          <div className="input-group input-group-horizontal">
            <input type="text" placeholder="address" className="input input-bordered" onChange={e=>setAddress(e.target.value)}/>
            <button className="btn btn-square" onClick={(e)=>insertAddress()}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> */}
              set
            </button>
          </div>
          {notification ? (
              <div className="alert alert-success shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>address set!</span>
                </div>
              </div>
            ) : (null)}
        </label>
      </div>
    </div>
  )
}

export default SetAddress
