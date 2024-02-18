import { create } from "zustand";
// import useBlogStore from "./blog.zustand";
import {persist,devtools} from "zustand/middleware"

const domain = "http://localhost:3004";
// interface AuthState {
//   token: string;
//   user: {};
//   login: (loginData: { email: string; password: string }) => void;

//   signup: (signupData: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//     file?: File | null;
//   }) => void;
//   signout: () => void;
// }

const AuthStore = (set) => ({
  token: "",
  isLoggedin: false,
  user: {},
  login: async (loginData) => {
    try {
      const res = await fetch(`${domain}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Login Failed: ${errorMessage}`);
      }

      const loginToken = await res.json();
      console.log(loginToken);

      set({
        token: loginToken.token,
        user: loginToken.user,
        isLoggedin: true
      });
      return loginToken
    } catch (error) {
      console.log(error);
    }
  },

  signup: async (signupData) => {
    try {
        const res = await fetch(`${domain}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
  
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Sign up Failed: ${errorMessage}`);
        }
  
        const signupToken = await res.json();
        console.log(signupToken);
  
        set({
          token: signupToken.token,
          user: signupToken.user,
          isLoggedin: true
        });

      } catch (error) {
        console.log(error);
        return false
      }
  },

  signout: async () => {

    localStorage.clear();
    set({
      token:'',
      user:{}
    })
  }


});
const useAuthStore = create()(
  devtools(
    persist(
      AuthStore,
      {name:'Auth'}
    )
  )
);
export default useAuthStore;
