import { createApp, watch } from 'vue'
import './styles/index.scss'
import App from './App.vue'

//Initialise pinia
import { createPinia } from 'pinia'

//Create pinia
const pinia = createPinia()

//Initialise vue-router
import { setupRouter } from './router'

//Create router
const router = setupRouter()

//Make app use router
createApp(App).use(pinia).use(router).mount('#app')

console.log("Pinia State : ", pinia.state);

watch(
    pinia.state,
    (state) => {
        if(state.login.loggedIn === false) {
            localStorage.removeItem("user");
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("authVms");
            console.log("Local storage cleared");
        }
        else {
            console.log("Local storage not cleared");
            localStorage.setItem("user", JSON.stringify(state.login.user));
            localStorage.setItem("loggedIn", JSON.stringify(state.login.loggedIn));
            localStorage.setItem("authVms", JSON.stringify(state.login.authVms));
        }
    },
    { deep: true }
);
