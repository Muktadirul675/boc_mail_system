<script setup>
import { ref, computed } from 'vue';
import Handlebars from "handlebars";
import { supabase } from '@/lib/supabase/client.js';
import { useRoute } from 'vue-router';

let route = useRoute();
let id = route.params.id;

let template = ref(null)
let templateText = ref(null)
let templateTitle = ref(null)

async function getTemplate() {
    const { data, error } = await supabase.from('templates').select('*').eq('id', id).limit(1).single()
    template.value = data;
    templateText.value = template.value.html
    templateTitle.value = template.value.title
}

getTemplate()

let templateCompiled = ref(null)
let context = ref({
    name: "BOC"
})
let isAdding = ref(false)
let message = ref(null)

function compile() {
    let template = Handlebars.compile(templateText.value);
    templateCompiled.value = template(context.value)
}

function clear() {
    templateText.value = null;
}

async function update() {
    isAdding.value = true;
    const { error } = await supabase.from('templates').update(
        { html: templateText.value, title: templateTitle.value }
    ).eq('id',template.value.id)
    isAdding.value = false
    if (error) {
        message.value = {
            type: "error",
            message: "An error occured\n" + error
        }
    } else {
        message.value = {
            type: "success",
            message: "Template Updated"
        }
    }
}

</script>

<template>
    <div class="container-fluid py-3">
        <div v-if="message != null" class="row">
            <div class="col-12">
                <div v-if="message.type == 'success'" class="alert alert-success" role="alert">
                    {{ message.message }}
                </div>
                <div v-if="message.type == 'error'" class="alert alert-danger" role="alert">
                    {{ message.message }}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form class="form-group">
                    <input type="text" name="" placeholder="Title" v-model="templateTitle" id="" class="form-control">
                </form> <br>
            </div>
            <div class="col-12 col-lg-5 col-xl-5">
                <textarea style="width: 100%;" v-model="templateText" name="" id="" rows="10"></textarea>
            </div>
            <div class="col-12 col-xl-1 col-lg-1 tools">
                <button @click="clear" class="btn btn-danger">
                    <i class="fi fi-rr-cross-circle"></i>
                </button>
                <button @click="compile" class="btn btn-primary">
                    <i class="fi fi-rr-arrow-to-right"></i>
                </button>
                <button v-if="!isAdding" @click="update" class="btn btn-success">
                    <i class="fi fi-rr-inbox-out"></i>
                </button>
                <div v-else class="spinner-border spinner-border-sm text-success" role="status">
                    <span class="visually-hidden">Adding...</span>
                </div>
            </div>
            <div v-html="templateCompiled" class="col-12 col-lg-6 col-xl-6 border">

            </div>
        </div>
    </div>
</template>

<style scoped>
.tools button {
    display: block;
    margin: 5px;
}

@media(max-width:998px) {
    .tools button {
        display: inline;
    }
}
</style>