import { createClient } from '@supabase/supabase-js';


const supabaseId = process.env.NEXT_PUBLIC_SID

export const supabase = createClient("https://ybmhbwgukqfkksysxbca.supabase.co",supabaseId)

