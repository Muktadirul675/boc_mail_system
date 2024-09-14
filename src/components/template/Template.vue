<script setup>
import { supabase } from '@/lib/supabase/client';
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
const props = defineProps({
    template: Object
})

let isDeleting = ref(false)
async function del() {
    isDeleting.value = true
    const { error } = await supabase.from('templates').delete().eq('id', props.template.id)
    isDeleting.value = false
}

</script>

<template>
    <div class="container-fluid rounded shadow-sm">
        <div class="row">
            <div class="col-12 p-3">
                <h5>{{ template.title }}</h5>
                <span>
                    Template ID : {{ template.id }}
                </span> <br>
                <div class="tools">
                    <RouterLink :to="{name:'readTemplate',params:{id:template.id}}" class="btn btn-primary">View</RouterLink>
                    <button v-if="!isDeleting" @click="del" class="btn btn-danger">Delete</button>
                    <div v-else class="spinner-border spinner-border-sm text-danger" role="status">
                        <span class="visually-hidden">Adding...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tools > * {
    margin-right: 5px;
}
</style>
