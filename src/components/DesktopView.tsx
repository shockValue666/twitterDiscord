import React from 'react'
import SetAddress from './SetAddress'
import SetEmail from './SetEmail'
import UpdateAddress from './UpdateAddress'
import UpdateEmail from './updateEmail'

function DesktopView({alreadyAddress,alreadyEmail,setAlreadyAddress,setAlreadyEmail}) {
  return (

      <div className='flex flex-row justify-around items-center w-[60%]  ' style={{margin:"0 auto"}}>
                            {
                                alreadyAddress ?
                                (
                                        <UpdateAddress setAlreadyAddress={setAlreadyAddress}/>
                                ) 
                                : 
                                (
                                        <SetAddress setAlreadyAddress={setAlreadyAddress}/>
                                )
                                }

                                {
                                    alreadyEmail ?
                                    (
                                            <UpdateEmail setAlreadyEmail={setAlreadyEmail}/>
                                    ) 
                                    : 
                                    (
                                            <SetEmail setAlreadyEmail={setAlreadyEmail}/>
                                    )

                                }
                        </div>

  )
}

export default DesktopView
