import { defineStore } from 'pinia'
import axiosClient from '../axios'
import { Survey } from '../types'

interface State {
    surveys: {
        loading: boolean
        data: Survey[]
        links: any
    }
    currentSurvey: {
        loading: boolean
        data: Object
    }
}

export const useSurveyStore = defineStore('survey', {
    state: (): State => ({
        surveys: {
            loading: false,
            data: [],
            links: '',
        },
        currentSurvey: {
            loading: false,
            data: {},
        },
    }),
    actions: {
        getSurveyBySlug(slug: any) {
            this.currentSurvey.loading = true
            return axiosClient.get(`/survey-by-slug/${slug}`)
                .then(res => {
                    this.currentSurvey = res.data
                    console.log(res.data)
                    this.currentSurvey.loading = false
                    return res
                })
                .catch(err => {
                    this.currentSurvey.loading = false
                    throw err
                })
        },
        getSurveys({url = null}: any = {}) {
            url = url || '/survey'
            this.surveys.loading = true
            return axiosClient.get(url)
                .then(res => {
                    this.surveys.loading = false
                    this.surveys.links = res.data.meta.links
                    this.surveys.data = res.data.data

                    return res
                })
        },
        getSurvey(id: any){
            this.currentSurvey.loading = true
            return axiosClient.get(`/survey/${id}`)
                .then(res => {
                    this.currentSurvey.data = res.data.data
                    this.currentSurvey.loading = false

                    return res
                })
                .catch(err => {
                    this.currentSurvey.loading = false
                    throw err
                })
        },
        saveSurvey(survey: any) {
            delete survey.image_url
            console.log("here ",survey)
            let response;
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then(res => {
                        // save survey
                        this.currentSurvey.data = res.data.data

                        return res
                    })
            } else {
                response = axiosClient.post('/survey', survey)
                    .then(res => {
                        // update survey
                        this.currentSurvey.data = res.data.data

                        return res
                    })
            }

            return response
        },
        deleteSurvey(id: any) {
            return axiosClient.delete(`/survey/${id}`)
        },
    }
})
