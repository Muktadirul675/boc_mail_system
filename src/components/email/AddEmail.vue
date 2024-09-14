<script setup>
import { supabase } from '@/lib/supabase/client.js';
import { ref } from 'vue';

let isAdding = ref(false)
let message = ref(null)
let email = ref(null)
let name = ref(null)
async function addEmail() {
    isAdding.value = true;
    const { error } = await supabase.from('emails').insert([
        { email: email.value, name: name.value }
    ])
    if(error){
        message.value = {
            type: "error",
            message: error
        }
    }else{
        message.value = {
            type: "success",
            message: email.value + " added successfully!"
        }
    }
    isAdding.value = false;
}

</script>

<template>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
        aria-expanded="false" aria-controls="collapseExample">
        <i class="fi fi-rr-plus"></i>
    </button>
    <div class="collapse" id="collapseExample">
        <div class="card card-body m-1">
            <form @submit.prevent="addEmail" class="form-group">
                <input v-model="email" type="email" class="form-control" placeholder="Email"> <br>
                <input v-model="name" type="text" placeholder="Name" class="form-control"> <br>
                <input v-if="!isAdding" type="submit" value="Add" class="btn btn-primary">
                <div v-else class="spinner-border spinner-border-sm text-primary" role="status">
                    <span class="visually-hidden">Adding...</span>
                </div> <br>
                <div class="message" v-if="message">
                    <div v-if="message.type == 'success'" class="text-success">
                        <i class="fi fi-rr-check-circle"></i> {{ message.message }}
                    </div>
                    <div v-if="message.type == 'error'" class="text-danger">
                        <i class="fi fi-rr-exclamation"></i> {{ message.message }}
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.message{
    font-size: smaller;
}
</style>
