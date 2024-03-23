<script lang="ts" setup>
//import { useRouter } from 'vue-router';
import { useLoginStore } from "../../stores";
import vmImage from "../atoms/vm-Image.vue";

//const router = useRouter();
const loginStore = useLoginStore();
</script>

<template>
  <div class="navbar-container">
    <router-link :to="'/'">
      <vmImage
        :class="{ active: $route.name === 'Home' }"
        class="navbar-logo"
        src="logo.svg"
        :alt="'logo'"
        :width="30"
        :height="30"
      />
    </router-link>
    <div class="navbar-menu">
      <ul>
        <li class="navbar-element">
          <router-link class="navbar-link" :to="'/'">Accueil</router-link>
        </li>
        <li class="navbar-element" v-if="loginStore.loggedIn">
          <router-link class="navbar-link" :to="'/vms'"
            >Virtual machines</router-link
          >
        </li>
        <li
          class="navbar-element"
          v-if="loginStore.loggedIn && $route.name === 'Create VM'"
        >
          <span
            class="navbar-link"
            :class="{ 'router-link-active': $route.name === 'Create VM' }"
            >Create VM</span
          >
        </li>
      </ul>
    </div>
    <div class="navbar-menu flex-end">
      <ul>
        <li class="navbar-element" v-if="!loginStore.loggedIn">
          <router-link class="navbar-link" :to="'/login'">
            <vmImage
              :class="{ 'router-link-active': $route.name === 'Login' }"
              src="login.svg"
              :width="30"
              :height="30"
            />
          </router-link>
        </li>
        <li v-if="loginStore.loggedIn">
          <span>User : {{ loginStore.user }}</span>
        </li>
        <li class="navbar-element" v-if="loginStore.loggedIn">
          <router-link class="navbar-link navbar-logout" :to="'/logout'">
            <vmImage src="logout.svg" :width="30" :height="30" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
  background-color: var(--grey-lighter);
  box-shadow: var(--elevation-1);
}

.navbar-logo {
  width: 30px;
  height: 30px;
  &:hover:not(.active) {
    transform: scale(1.1);
    filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 0.4));
  }
  &.active {
    cursor: default;
  }
  &.active:hover {
    transform: none;
  }
}

.navbar-menu {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    gap: 20px;
  }
}

.navbar-element {
  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }
  &:hover .navbar-link {
    color: var(--primary);
    text-shadow: 1px 1px 1px var(--grey-lighter);
  }
  &:has(.router-link-active) .navbar-link {
    text-decoration: underline;
    color: var(--primary);
    text-shadow: 1px 1px 1px var(--grey-lighter);
    cursor: default;
  }
  &:has(.router-link-active):hover,
  &:has(.router-link-active) .navbar-link:hover {
    transform: none;
  }
  &:has(.router-link-active) img {
    filter: invert(36%) sepia(93%) saturate(3810%) hue-rotate(199deg)
      brightness(101%) contrast(105%);
  }
  &:not(:has(.router-link-active)):hover img {
    transform: scale(1.05);
    filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 0.4));
    filter: invert(36%) sepia(93%) saturate(3810%) hue-rotate(199deg)
      brightness(101%) contrast(105%);
  }
  &:hover .navbar-logout img {
    filter: invert(29%) sepia(96%) saturate(3227%) hue-rotate(338deg)
      brightness(91%) contrast(88%);
  }
}

.navbar-link {
  text-decoration: none;
  color: black;
}
.flex-end {
  margin-left: auto;
}
</style>
