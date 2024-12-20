<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { User } from '../types';

const user: User = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const userStore = useUserStore()

const router = useRouter()

const errorMessage = ref('')

function register(evt: Event) {
  evt.preventDefault()
  userStore.register(user)
    .then((res) => {
      router.push({name: 'Dashboard'})
    })
    .catch(err => {
      errorMessage.value = err.response.data.message
    })
}

</script>

<template>
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for free</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <router-link :to="{name: 'Login'}" href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
           login to your account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" @submit="register">
        <div v-if="errorMessage" class="flex item-center justify-between py-3 px-5 bg-red-500 text-white rounded">
          {{ errorMessage }}
          <span @click="errorMessage = ''" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="fullname" class="sr-only">Full name</label>
            <input id="fullname" name="fullname" type="text" autocomplete="name" required="true" v-model="user.name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full name" />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="true" v-model="user.email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="true" v-model="user.password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <label for="password_confirmation" class="sr-only">Password confirmation</label>
            <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required="true" v-model="user.password_confirmation" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password confirmation" />
          </div>
        </div>
         
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign up
          </button>
        </div>
      </form>
</template>
