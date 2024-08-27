import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// import { BASE_URL } from '../utils';

// const authStore = (set: any) => (
//     {
//         userProfile: null,
//         allUser:[],


//         addUser: (user: any) => set({ userProfile: user }),
//         removeUser: () => set({ userProfile: null }),

//         fetchAllUsers: async () => {
//             const { data } = await axios.get(`${BASE_URL}/api/users`);
            

//             set({ allUser: data })
//         }

//     }
// )

// const useAuthStore = create(
//     persist(authStore, {
//         name: 'auth'
//     })
// )

// export default useAuthStore;