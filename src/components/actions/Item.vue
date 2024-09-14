<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    action: Object
})
</script>

<template>
    <div class="container-fluid p-3 shadow-sm">
        <div class="row">
            <div class="col-12">
                <h5>{{ action.title }}</h5>
                <RouterLink :to="{name:'actionLogs',params:{id:action.id}}">View</RouterLink>
            </div>
        </div>
    </div>
</template>
