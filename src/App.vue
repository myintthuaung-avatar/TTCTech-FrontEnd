<script setup>
</script>

<template>
  <v-app>
    <v-app-bar color="primary" flat density="comfortable">
      <v-app-bar-title class="font-weight-medium">
        Online Exam
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" style="max-width: 720px">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
