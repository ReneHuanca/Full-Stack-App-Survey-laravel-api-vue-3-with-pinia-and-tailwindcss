<script setup lang="ts">
import { computed } from 'vue';
import PageComponent from '../components/PageComponent.vue';
import { useSurveyStore } from '../stores/survey';
import { Survey } from '../types';
import SurveyListItem from '../components/SurveyListItem.vue';

const surveyStore = useSurveyStore()

const surveys = computed(() => surveyStore.surveys)

surveyStore.getSurveys()

function deleteSurvey(survey: Survey) {
  if(confirm("Are you sure you want to delete this survey? Operation can't be undone!!")) {
    surveyStore.deleteSurvey(survey.id)
      .then(() => {
        surveyStore.getSurveys()
      })
  }
}

function getForPage(evt: Event, link: any) {
  evt.preventDefault()
  if (!link.url || link.active) {
    return;
  }

  surveyStore.getSurveys({url: link.url})
}

</script>

<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{name: 'SurveyCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new survey
        </router-link>
      </div>
    </template>

    <div v-if="surveys.loading" class="flex justify-center">Loading...</div>
    <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <SurveyListItem
        v-for="survey,ind in surveys.data" 
        :key="survey.id"
        :survey="survey"
        class="opacity-0 animate-fade-in-down"
        :class="{animationDelay: `${ind * .1}s`}"
        @delete="deleteSurvey(survey)"
      />
    </div>
    
    <!-- Pagination -->
    <div class="flex justify-center mt-5">
      <nav aria-label="Pagination" class="relative z-0 inline-flex justify-center rounded-md shadow-sm">
        <a
          v-for="(link, i) in surveys.links"
          :key="i"
          :disable="!link.url"
          v-html="link.label"
          href="#"
          @click="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
            link.active
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hove:bg-gray-50',
              i !== 0 ? 'rounded-l-md': '',
              i !== surveys.links.length - 1 ? 'rounded-r-md': '',
          ]"
        >

        </a>
      </nav>
    </div>
  </PageComponent>
</template>