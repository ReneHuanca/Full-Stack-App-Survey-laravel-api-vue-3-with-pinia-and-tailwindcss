import { defineStore } from 'pinia';
import axiosClient from '../axios';
import { User } from '../types';

interface State {
    data: User | null 
    token: string | null
}

export const useUserStore = defineStore('user', {
    state: () => ({
        data: null,
        token: sessionStorage.getItem('token'),
    }),
    actions: {
        register(user: User) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    this.token = data.token
                    this.data = data.user
                    sessionStorage.setItem('token', data.token)

                    return data
                })
        },
        login(user: User) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    this.token = data.token
                    this.data = data.user
                    sessionStorage.setItem('token', data.token)

                    return data
                })
        },
        logout() {
            return axiosClient.post('/logout')
                .then(response => {
                    this.data = null
                    this.token = null
                    sessionStorage.removeItem('token')
                    
                    return response;
                })
        },
    }    
})
