<script setup>
import { ref } from 'vue';
import { useTemplateStore } from '@/stores/templateStore.js';
import Template from '@/components/template/Template.vue';

const templateStore = useTemplateStore()
const searchTxt = ref(null)

</script>

<template>
    <div class="p-3" v-if="templateStore.templates">
        <h3>Templates</h3>
        <RouterLink class="btn btn-primary" :to="{name:'addTemplate'}">
            <i class="fi fi-rr-plus"></i>
        </RouterLink>
        <form class="form-group">
            <input type="text" name="" v-model="searchTxt" id="" class="form-control">
        </form>
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-lg-4 col-xl-4 p-2" v-for="template in templateStore.templates" :key="template.id">
                        <Template :template="template"></Template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Templates loading
    </div>
</template>
