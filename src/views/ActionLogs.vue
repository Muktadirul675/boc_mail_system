<script setup>
import { useLogStore } from '@/stores/logStore.js';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue'
import { supabase } from '@/lib/supabase/client';

const logStore = useLogStore()

let route = useRoute()
let id = route.params.id

let action = ref(null)
async function getAction() {
    const { data, error } = await supabase.from('actions').select('*').eq('id', id).limit(1).single()
    action.value = data;
}
getAction()

let logs = computed(() => {
    if (logStore.logs) {
        return logStore.logs.filter((obj) => {
            return obj.action == id
        })
    } else {
        return null;
    }
})

let attempts = computed(() => {
    if (logs.value) {
        return logs.value.length
    } else {
        return null
    }
})

let success = computed(() => {
    if (logs.value) {
        let count = 0;
        for (var i of logs.value) {
            if (i.status == 'success') count++;
        }
        return count;
    } else { return null; }
})

let failed = computed(() => {
    if (logs.value) {
        let count = 0;
        for (var i of logs.value) {
            if (i.status == 'failed') count++;
        }
        return count;
    } else { return null; }
})

</script>

<template>
    <template v-if="logs">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 p-3">
                    <h5 v-if="action">{{ action.title }}</h5>
                    <p>
                        <b>Attempts: </b> {{ attempts }} <br>
                        <b>Success: </b> {{ success }} <br>
                        <b>Failed: </b> {{ failed }}
                    </p>
                </div>
            </div>
            <div class="row">
                <template v-for="log in logs">
                    <div class="col-12 col-lg-4 col-xl-4 p-3 shadow-sm rounded">
                        <template v-if="log.status == 'pending'">
                            <div  class="spinner-border spinner-border-sm text-secondary" role="status">
                                <span class="visually-hidden">Adding...</span>
                            </div> <span class="mx-1"></span> {{ log.email.email }}
                        </template>
                        <template v-if="log.status == 'success'">
                            <div class="text-success">
                                <i class="fi fi-rr-check-circle"></i><span class="mx-1"></span> {{ log.email.email }}
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </template>
    <template v-else>
        Loading
    </template>
</template>
