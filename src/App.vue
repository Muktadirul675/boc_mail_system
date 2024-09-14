<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">BOC Mail Service</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active"  :to="{name:'home'}">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active"  :to="{name:'addresses'}">Addresses</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active"  :to="{name:'templates'}">Templates</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active"  :to="{name:'actions'}">Actions</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
*{padding: 0;}
a{text-decoration: none;}
form{max-width: 500px}
@media(max-width:998px){
  form{width: 100%;}
}
</style>


