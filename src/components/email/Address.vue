<script setup>
import { supabase } from '@/lib/supabase/client';
import { ref } from 'vue';
const props = defineProps({
    address: Object
})
let emailId = "email" + props.address.id
let email = ref(props.address.email)
let isUpdating = ref(false)
let isDeleting = ref(false)

async function update() {
    isUpdating.value = true
    const { error } = await supabase.from('emails').update({
        email: email.value
    }).eq('id', props.address.id)
    isUpdating.value = false
}

async function del() {
    isDeleting.value = true
    const { error } = await supabase.from('emails').delete().eq('id', props.address.id)
    isDeleting.value = false
}

</script>

<template>
    <div class="p-3 shadow-sm rounded container-fluid my-2">
        <div class="row">
            <div class="col-6">
                {{ address.email }}
            </div>
            <div class="col-2">
                {{ address.name }}
            </div>
            <div class="col-4">
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + emailId"
                    aria-expanded="false" :aria-controls="emailId">
                    <i class="fi fi-rr-pencil"></i>
                </button>
                <span class="mx-1"></span>
                <button v-if="!isDeleting" @click="del" class="btn btn-danger">
                    <i class="fi fi-rr-trash-can-clock"></i>
                </button>
                <div v-else class="spinner-border spinner-border-sm text-danger" role="status">
                    <span class="visually-hidden">Adding...</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="collapse" :id="emailId">
                <div class="card card-body">
                    <form @submit.prevent="update" class="form-group">
                        <div class="input-group">
                            <input type="text" name="" v-model="email" id="" class="form-control">
                            <button v-if="!isUpdating" class="btn btn-success">
                                <i class="fi fi-rr-inbox-out"></i>
                            </button>
                            <div v-else class="spinner-border spinner-border-sm text-success" role="status">
                                <span class="visually-hidden">Adding...</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
