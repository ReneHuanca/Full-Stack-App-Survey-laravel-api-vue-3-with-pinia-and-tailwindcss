<script lang="ts" setup>
import QuestionViewer from '../components/viewer/QuestionViewer.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSurveyStore } from '../stores/survey';

const route = useRoute()
const surveyStore = useSurveyStore()

const loading = computed(() => surveyStore.currentSurvey.loading)
const survey = computed(() => surveyStore.currentSurvey.data)

const surveyFinished = ref(false)

const answer = ref({})

surveyStore.getSurveyBySlug(route.params.slug)

function submitSurvey() {
    console.log(JSON.stringify(answer.value, undefined, 2))
    surveyStore.saveSurveyAnswer({
        surveyId: survey.value.id,
        answer: answer.value
    })
    .then((response: any) => {
        if (response.status === 201) {
            surveyFinished.value = true
        }
    })
}

function submitAnotherResponse() {
    answer.value = {}
    surveyFinished.value = false
}

</script>

<template>
    <div class="py-5 px-8">
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <form @submit.prevent="submitSurvey" v-else class="container mx-auto">
            <div class="grid grid-cols-6 items-center">
                <div class="mr-4">
                    <img :src="survey.image_url" alt="survey image">
                </div>
                <div class="col-span-5">
                    <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
                    <p class="text-gray-500 text-sm" v-html="survey.description"></p>
                </div>
                <pre>{{ survey }}</pre>

                <div
                    v-if="surveyFinished"
                    class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto"
                >
                    <div class="text-xl mb-3 font-semibold">
                        Thank you for participating in this survey.
                    </div>
                    <button
                        @click="submitAnotherResponse"
                        type="button"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit another response
                    </button>
                </div>
                <div v-else>
                    <hr class="my-3">
                    <div v-for="(question, ind) in survey.questions" :key="question.id">
                        <QuestionViewer
                            v-mode="answer[question.id]"
                            :question="question"
                            :index="ind"
                        />
                    </div>
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
