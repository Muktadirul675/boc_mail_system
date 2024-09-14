import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase/client.js';

export const useEmailStore = defineStore('emailStore', () => {
    const emails = ref(null);
    async function getEmails() {
        let { data, error } = await supabase
            .from('emails')
            .select('*')
            .order('created_at', { ascending: false })
        emails.value = data;
    }
    getEmails();
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }


    const channels = supabase.channel('emails-insert')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'emails' },
            (payload) => {
                emails.value.unshift(payload.new)
            }
        )
        .subscribe()


    const updateChannels = supabase.channel('emails-update')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'emails' },
            (payload) => {
                for (var i in emails.value) {
                    if (emails.value[i].id == payload.new.id) {
                        emails.value[i] = payload.new
                        break;
                    }
                }
            }
        )
        .subscribe()


    const delChannels = supabase.channel('custom-delete-channel')
        .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'emails' },
            (payload) => {
                for(var i in emails.value){
                    if(emails.value[i].id == payload.old.id){
                        emails.value.splice(i,1)
                        break;
                    }
                }
            }
        )
        .subscribe()

    return { count, doubleCount, increment, emails }
})