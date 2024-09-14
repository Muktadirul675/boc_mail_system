<script setup>
import { ref, computed } from 'vue';
import { useEmailStore } from '@/stores/emailStore.js';
import AddEmail from '@/components/email/AddEmail.vue';
import Address from '@/components/email/Address.vue';
const emailStore = useEmailStore();
const searchTxt = ref(null);
const emails = computed(()=>{
    if(searchTxt.value){
        return emailStore.emails.filter((obj)=>{
            return obj.email.toLowerCase().includes(searchTxt.value.toLowerCase()) || obj.name.toLowerCase().includes(searchTxt.value.toLowerCase()) 
        })
    }else{
        return emailStore.emails
    }
})


</script>

<template>
    <div class="container-fluid p-3">
        <div class="row">
            <div class="col-12">
                <div v-if="emailStore.emails != null">
                    <h3>
                        Addresses ({{ emailStore.emails.length }})
                    </h3>
                        <AddEmail></AddEmail>
                    <div class="my-1">
                        <form class="from-group">
                            <div class="input-group">
                                <input v-model="searchTxt" placeholder="Search" type="text" name="" id=""
                                    class="form-control">
                                    <button class="btn btn-primary"><i class="fi fi-rr-search"></i></button>
                            </div>
                        </form>
                    </div>
                    <ol class="row">
                        <li class="col-12 col-lg-4 col-xl-4 p-1" v-for="email in emails" :key="email.id">
                            <Address :address="email"></Address>
                        </li>
                    </ol>
                </div>
                <div v-else>
                    Addresses loading
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
ol {
    padding: 0;
}

ol li {
    list-style: none;
}</style>
