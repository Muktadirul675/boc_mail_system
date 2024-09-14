<script setup>
import { useEmailStore } from '@/stores/emailStore.js';
import { useTemplateStore } from '@/stores/templateStore.js';
import SendMail from '@/components/sendmail/sendmail.vue';
const emailStore = useEmailStore();
const templateStore = useTemplateStore()

</script>

<template>
  <div class="container-fluid p-3">
    <div class="row">
      <div class="col-12">
        <div v-if="emailStore.emails != null">
          <div class="row">
            <div class="col-8 col-lg-2 col-xl-2 rounded shadow-sm p-0 mx-2">
              <div>
                <div class="number p-3">
                  <h3 v-if="emailStore.emails">{{ emailStore.emails.length }}</h3>
                </div>
                <div class="label">
                  Total Emails
                </div>
              </div>
            </div>
            <div class="col-8 col-lg-2 col-xl-2 rounded shadow-sm p-0 mx-2">
              <div>
                <div class="number p-3">
                  <h3 v-if="templateStore.templates">{{ templateStore.templates.length }}</h3>
                </div>
                <div class="label">
                  Total Templates
                </div>
              </div>
            </div>
            <div class="col-8 col-lg-2 col-xl-2 rounded shadow-sm p-0 mx-2">
              <div>
                <div class="number p-3">
                  <h3>0</h3>
                </div>
                <div class="label">
                  Total Emails Sent
                </div>
              </div>
            </div>
          </div> <br> <br>
        <SendMail></SendMail>
        </div>
        <div v-else>
          Emails Loading
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label {
  background-color: whitesmoke;
  font-weight: bold;
  padding: 5px;
}
</style>

