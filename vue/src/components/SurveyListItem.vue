<script lang="ts" setup>
import { ClipboardCopyIcon, TrashIcon } from '@heroicons/vue/outline';
import { Survey } from '../types';

interface Props {
    survey: Survey
}

const {survey} = defineProps<Props>()

const emit = defineEmits(['delete'])

</script>

<template>
      <div
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
      >
        <img :src="survey.image_url" alt="" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        
        <div class="flex justify-between items-center">
          <router-link
            :to="{name: 'SurveyView', params: {id: survey.id}}"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indig-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          >
            <PencilIcon class="h-4 w-4 inline-block mr-2"/>
            Edit
          </router-link>
          <div class="flex items-center">
            <a
              :href="`/view/survey/${survey.slug}`"
              target="_blank"
              class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ClipboardCopyIcon class="w-5 h-5 inline-block"/>
            </a>
            <button
              v-if="survey.id"
              type="button"
              @click="emit('delete', survey)"
              class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon class="h-5 w-5 inline-block" />
            </button>
          </div>
        </div>
      </div>
</template>