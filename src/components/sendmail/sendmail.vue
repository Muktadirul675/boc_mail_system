<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { useEmailStore } from '@/stores/emailStore.js';
import { useTemplateStore } from '@/stores/templateStore.js';
import { supabase } from '@/lib/supabase/client';

const templateStore = useTemplateStore()
const emailStore = useEmailStore()

let logging = ref(false)
let searchTxt = ref(null)
const selectedTemplate = ref(null)
const dropdownText = computed(() => {
    if (selectedTemplate.value) {
        return selectedTemplate.value.title
    } else {
        return "Select Template"
    }
})

const emails = reactive([])
const emailsChecked = computed(() => {
    if (emails) {
        let count = 0;
        for (var i of emails) {
            if (i.model) count++;
        }
        return count;
    } else {
        return null
    }
})

for (var i of emailStore.emails) {
    emails.push(
        { model: false, data: i, show: true }
    )
}

watch(searchTxt, (oldVal, newVal) => {
    if (newVal == '') {
        for (var i in emails) {
            emails[i].show == true
        }
    } else {
        for (var i in emails) {
            if (emails[i].data.email.toLowerCase().includes(searchTxt.value.toLowerCase()) || emails[i].data.name.toLowerCase().includes(searchTxt.value.toLowerCase())) {
                emails[i].show = true;
            } else {
                emails[i].show = false
            }
        }
    }
})

function selectTemplate(id) {
    selectedTemplate.value = templateStore.getTemplate(id)
}

function selectAll() {
    for (var i in emails) {
        emails[i].model = true
    }
}

function disSelectAll() {
    for (var i in emails) {
        emails[i].model = false
    }
}

function send() {
    const prompt = new bootstrap.Modal('#prompt')
    prompt.show()
}

let actionName = ref(null)
let message = ref(null)
let subject = ref(null)

async function proceed() {
    logging.value = true
    const { data: action, error: actionInsertError } = await supabase.from('actions').insert({
        title: actionName.value
    }).select().limit(1).single()
    let data = []
    for (var i of emails) {
        if (i.model) {
            let obj = { template: selectedTemplate.value.id }
            obj.email = i.data.id
            obj.status = 'pending'
            obj.subject = subject.value
            obj.action = action.id
            data.push(obj)
        }
    }
    const { error: logInsertError } = await supabase.from('log').insert(data)
    logging.value = false
    if(logInsertError){
        console.log(logInsertError)
        message.value = {
            type: "error",
            message: "An error occured\n" + logInsertError.message
        }
    }else{
        message.value = {
            type: "success",
            message: "Server is sending emails. See logs in actions section."
        }
    }
}

</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h5>Send Mail</h5>
                <div class="btn-group">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        data-bs-auto-close="true" aria-expanded="false">
                        {{ dropdownText }}
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="template in templateStore.templates">
                            <button @click="selectTemplate(template.id)" class="dropdown-item">{{ template.title }}</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row" v-if="selectedTemplate">
            <div>
                <div class="row">
                    <div class="col-12 my-1">
                        <b>Select emails to send mail. (Selected: {{ emailsChecked }})</b> <br>
                        <button @click="selectAll" class="btn btn-secondary-outline"> <u>Select All</u> </button>
                        <span class="mx-2"></span>
                        <button @click="disSelectAll" class="btn btn-secondary-outline"> <u>Disselect All</u> </button>
                        <span class="mx-2"></span>
                        <button @click="send" class="btn btn-success"> Send </button> <br>
                        <form class="form-group">
                            <div class="input-group">
                                <input v-model="searchTxt" type="text" placeholder="Search" id="" class="form-control">
                                <button class="btn btn-primary">
                                    <i class="fi fi-rr-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <template v-for="email in emails" :keys="email.data.id">
                        <div class="col-12 col-lg-4 col-xl-4" v-show="email.show">
                            <input type="checkbox" v-model="email.model" id=""> {{ email.data.email }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="prompt" tabindex="-1" aria-labelledby="promptlabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Mail Action</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>{{ emailsChecked }} mails checked</h6>
                    <form @submit.prevent="proceed">
                        <input type="text" name="" v-model="actionName" placeholder="Name this action" id=""
                            class="form-control" required> <br> 
                        <input type="text" name="" v-model="subject" placeholder="Subject" id=""
                            class="form-control" required> <br>
                        <button v-if="!logging" class="btn btn-success">Proceed</button>
                        <div v-else>
                            <div class="spinner-border spinner-border-sm text-success" role="status">
                                <span class="visually-hidden">Adding...</span>
                            </div> Please wait for server response
                        </div>
                        <div v-if="message !== null">
                            <div v-if="message.type == 'success'" class="text-success">
                                {{ message.message }}
                            </div>
                            <div v-if="message.type == 'error'" class="text-danger">
                                {{ message.message }}
                            </div>
                        </div>
                    </form> <br>
                    <b>Selected emails:</b>
                    <ol>
                        <template v-for="email in emails">
                            <li v-if="email.model">{{ email.data.email }}</li>
                        </template>
                    </ol>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
