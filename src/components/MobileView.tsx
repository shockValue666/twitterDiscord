import React from 'react'
import SetAddress from './SetAddress'
import SetEmail from './SetEmail'
import UpdateAddress from './UpdateAddress'
import UpdateEmail from './updateEmail'

function MobileView({alreadyAddress,setAlreadyAddress,alreadyEmail,setAlreadyEmail}) {
  return (
    <div>
        <div className='flex flex-col justify-around items-center w-[60%] gap-y-8 ' style={{margin:"0 auto"}}>
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
    </div>
  )
}

export default MobileView
