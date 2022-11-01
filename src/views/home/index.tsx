// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

import Login from '../../components/Login'
import { useRouter } from 'next/router';
import { supabase } from 'utils/connectdb';






export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const router = useRouter()

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])



    useEffect(()=>{
    //   supabase?.auth.onAuthStateChange(async (e)=>{
    //     if(e !== "SIGNED_OUT"){
    //         router.push("/success");
    //     }else{
    //          router.push("/")
    //     }
    // })
    async function getUser(){
      const user = await supabase.auth.getUser();
      console.log("user: user: ",user)
      if(user.data.user?.id){
        router.push("/success");
      }
    }
    getUser();
    },[])



  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
          <div className="text-center">
            <Login/>
          {/* <RequestAirdrop /> */}
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
};

