import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase/client.js'

export const useLogStore = defineStore('logs', () => {
    const logs = ref(null)
    async function getLogs() {
        const { data, error } = await supabase.from('log').select('*, email(*)').order('created_at', { ascending: false })
        console.log(error)
        logs.value = data
    }
    getLogs()

    return { logs }
})