import { createClient } from '@supabase/supabase-js';


const supabaseId = process.env.NEXT_PUBLIC_SID

export const supabase = createClient("https://lrxwwokfikcwzzshrdcp.supabase.co",supabaseId)
// export const supabase = createClient("https://lwiazgnabeowcnimorpj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aWF6Z25hYmVvd2NuaW1vcnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc3Nzc2OTQsImV4cCI6MTk4MzM1MzY5NH0.N-xVww-iMnPAmkf4f_ORUp9Qsa5aRHqk6EqxPipYP5E")

