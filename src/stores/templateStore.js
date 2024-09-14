import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase/client.js'

export const useTemplateStore = defineStore('templateStore', () => {
    const templates = ref(null)

    async function getTemplates() {
        const { data, error } = await supabase.from('templates').select('*').order('created_at', { ascending: false })
        templates.value = data
    }

    getTemplates()


    const channels = supabase.channel('templates-insert')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'templates' },
            (payload) => {
                templates.value.unshift(payload.new)

            }
        )
        .subscribe()


    const delChannels = supabase.channel('custom-delete-channel')
        .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'templates' },
            (payload) => {
                let index;
                for (var i in templates.value) {
                    if (templates.value[i].id == payload.old.id) {
                        templates.value.splice(i, 1);
                        break;
                    }
                }
            }
        )
        .subscribe()

    function getTemplate(id) {
        for (var i of templates.value) {
            if (i.id == id) return i;
        }
    }

    return { templates, getTemplate }
})