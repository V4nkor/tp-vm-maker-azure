<script lang="ts" setup>
    import vmInput from '../components/molecules/vm-Input.vue';
    import { ref } from 'vue';
    import vmButton from '../components/atoms/vm-Button.vue';
    import users from '../data/users.json';
    import { useRouter } from 'vue-router';
    import { useLoginStore } from '../stores';

    const router = useRouter();
    const loginStore = useLoginStore()

    function handleFormSubmit(event: Event) {
        event.preventDefault();
        console.log('Form Submitted');
        
        validateUsername();
        validatePassword();

        if (usernameErrorText.value === '' && passwordErrorText.value === '') {
            console.log('Form is valid');
            if(checkUserExists()) {
                console.log('User exists');
                const user = users.find(user => user.username === form.username.value);
                if (user && form.password.value === user.password) {
                    loginStore.login(form.username.value, user.authorisedVms);
                    
                    //Get users authorisedVms from the JSON file
                    const authorisedVms = user.authorisedVms;
                    console.log('Authorised VMs : ' + authorisedVms);

                    router.push('/');
                } else {
                    console.log('Password is incorrect');
                    passwordErrorText.value = 'Password is incorrect';
                    password.value.setErrorState(true);
                }
            } else {
                console.log('User does not exist');
                usernameErrorText.value = 'User does not exist';
                username.value.setErrorState(true);
            }

        } else {
            console.log('Form is invalid');
            
        }
    }

    function checkUserExists() {
        const user = users.find(user => user.username === form.username.value);
        if (user) return true; else return false;
    }

    const form = {
        username: ref(''),
        password: ref(''),
    }

    const username = ref();
    const usernameErrorText = ref('');
    const password = ref();
    const passwordErrorText = ref('');

    function validateUsername() {
        if (form.username.value === '') {
            usernameErrorText.value = 'Username is required';
            username.value.setErrorState(true);
        } else {
            usernameErrorText.value = '';
            username.value.setErrorState(false);
        }
    }

    function validatePassword() {
        if (form.password.value === '') {
            passwordErrorText.value = 'Password is required';
            password.value.setErrorState(true);
        } else {
            passwordErrorText.value = '';
            password.value.setErrorState(false);
        }
    }

    const forgotPasswordShown = ref(false);
    const forgotPasswordText = ref('');

    function forgotPassword() {
        console.log('Forgot password');
        forgotPasswordText.value = 'The debug credentials are: \n';
        forgotPasswordText.value += users.map(user => `Username: ${user.username}, Password: ${user.password}`).join(' | \n');
        forgotPasswordShown.value = true;
    }

</script>

<template>
    <div class="login-container">
        <div class="login-modal">
            <h1 class="login-title">Login</h1>
            <form class="login-form" @submit.prevent="handleFormSubmit">
                <vmInput ref="username" type="text" id="username" name="username" placeholder="Username" required label="Username" v-model="form.username.value" :error="usernameErrorText" />
                <vmInput ref="password" type="password" id="password" name="password" placeholder="Password" required label="Password" v-model="form.password.value" :error="passwordErrorText"/>
                <vmButton label="Login" type="submit" name="login-button" />
            </form>
        </div>
        <span class="forgot-password-span" @click="forgotPassword">Forgot your password ?</span>
        <div class="forgot-password-text" v-if="forgotPasswordShown">
            {{ forgotPasswordText }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 20px;
    }

    .login-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 20px;
        background-color: var(--white);
        border-radius: 12px;
        box-shadow: var(--elevation-2);
        outline: solid 4px var(--grey-lighter);
    }

    .login-title { font-size: 32px; font-weight: 700; }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .forgot-password-span {
        cursor: pointer;
        color: var(--primary);
        font-size: 16px;
        font-weight: 700;
        text-decoration: underline;
    
        &:hover { transform: scale(1.05); }
        &:active { transform: scale(1); }
    }

    .forgot-password-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 20px;
        background-color: var(--white);
        outline: solid 4px var(--warning);
        border-radius: 12px;
        text-wrap: wrap;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>
