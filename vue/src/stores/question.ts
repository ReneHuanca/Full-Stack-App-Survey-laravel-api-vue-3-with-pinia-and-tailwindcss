import { defineStore } from "pinia";

interface State {
    questionTypes: string[]
}

export const useQuestionStore = defineStore('question', {
    state: () => ({
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    })
})