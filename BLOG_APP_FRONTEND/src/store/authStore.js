import { create } from 'zustand'
import axios from 'axios'
import { useState } from 'react'
import BASE_URL from '../components/config/BaseApi'

export const useAuth = create((set) => ({

    currentUser: null,
    loading: false,
    error: null,
    isAuthenticate: false,

    login: async (userCredWithRole) => {

        const { role, ...userCredObj } = userCredWithRole;

        try {

            //set loading to false
            set({
                loading: true,
                error: null
            })

            //make api call
            let res = await axios.post(
                `${BASE_URL}/common-api/login`,
                userCredObj,
                { withCredentials: true }
            )

            console.log("res is", res)

            set({
                loading: false,
                isAuthenticate: true,
                currentUser: res.data.payload
            });

        } catch (err) {

            console.log("err is", err);

            set({
                loading: false,
                isAuthenticate: false,
                currentUser: null,
                error: err.response?.data.error || 'Login Failed'
            })
        }
    },

    logout: async (userCredWithRole) => {

        try {

            //set loading state
            set({
                loading: true,
                error: null
            })

            //make logout api req
            await axios.get(
                `${BASE_URL}/common-api/logout`,
                { withCredentials: true }
            )

            //update state
            set({
                loading: false,
                isAuthenticate: false,
                currentUser: null
            })

        } catch (err) {

            //set loading state
            set({
                loading: false,
                error: err.response?.data?.error || "Logout Failed",
                isAuthenticate: false,
                currentUser: null,
            });
        }
    },

    // restore login
    checkAuth: async () => {

        try {

            set({ loading: true });

            const res = await axios.get(
                `${BASE_URL}/common-api/check-auth`,
                { withCredentials: true }
            );

            set({
                currentUser: res.data.payload,
                isAuthenticate: true,
                loading: false,
            });

        } catch (err) {

            // user not logged in
            if (err.response?.status === 401) {

                set({
                    currentUser: null,
                    isAuthenticate: false,
                    loading: false,
                });

                return;
            }

            // other unexpected errors
            console.error("Auth check failed:", err);

            set({
                loading: false,
            });
        }
    }

}))
