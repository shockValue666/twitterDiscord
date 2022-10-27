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


import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from "@supabase/auth-ui-react"
import {useRouter} from 'next/router'


const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWhid2d1a3Fma2tzeXN4YmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzMDgzOTksImV4cCI6MTk4MTg4NDM5OX0.ycx2LyEVJ-i3SjQ-ffIAFBhdsNky1TMYzPaja1gdoAA")



export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])



   const [user,setUser] = useState({});
    const router = useRouter();

    useEffect(()=>{
        async function getUserData(){
            const user = await supabase.auth.getUser()
            if(user.data?.user){
                console.log(user.data.user)
                setUser(user.data.user)
            }
        }
        getUserData();
    },[]) // runs once

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        {/* <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Scaffold Lite <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>Simply the fastest way to get started.</p>
          Next.js, tailwind, wallet, web3.js, and more.
        </h4> */}
        {/* <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Start building on Solana  </code>
          </pre>
        </div>         */}
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
