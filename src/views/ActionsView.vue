<script setup>
import Item from '@/components/actions/Item.vue';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase/client.js';

let actions = ref(null)

async function getActions() {
    const { data, error } = await supabase.from('actions').select('*').order('created_at', { ascending: false })
    actions.value = data;
}

getActions()

</script>

<template>
    <div class="container-fluid p-3">
        <div v-if="actions" class="row">
            <template v-for="action in actions">
                <div class="col-12 col-lg-4 col-xl-4 p-3">
                    <Item :action="action"></Item>
                </div>
            </template>
        </div>
        <div v-else>
            Loading
        </div>
    </div>
</template>
