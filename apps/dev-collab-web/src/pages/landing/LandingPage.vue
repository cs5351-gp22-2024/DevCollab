<script>
import IconGithub from '@/assets/icons/Icon_github.svg'
import Logo from '../../../public/logo-gray.png'

export default {
  data() {
    return {
      IconGithub: IconGithub,
      Logo: Logo
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(90deg);
}

.logo-text {
  font-size: 6rem;
  line-height: 4.5rem;
  text-align: center;
}
.icon-btn {
  width: 32px;
  height: 32px;
}
.large-text {
  font-size: 6rem;
}
.logo-div-sm {
  display: none;
}
.bg-red-1 {
  background-color: $red-1;
}

.color-white {
  color: $vt-c-white;
}

.bg-pink-red-1 {
  background-color: $pink-red-1;
}
.bg-red-1 {
  background-color: $red-1;
}

.color-white {
  color: $vt-c-white;
}
.red-text-1 {
  color: $red-1;
}

.pink-red-text-1 {
  color: $pink-red-1;
}
.color-gray-2 {
  color: $gray-2;
}
@media (max-width: 1440px) {
  .large-text {
    font-size: 2rem;
  }
  .logo-div {
    display: none;
  }
  .logo-div-sm {
    display: block;
  }
}
</style>

<template>
  <v-app class="bg-image">
    <v-container class="vh-100 position-relative z-3 text-center flex-column d-flex">
      <div class="start-0 w-100 text-start d-flex">
        <div class="color-gray-2">
          <img :src="IconGithub" alt="GitHub Icon" class="icon-btn" />
          <div>Open Source in GitHub</div>
        </div>
        <div class="ms-auto align-self-center logo-div-sm">
          <span><img :src="Logo" alt="LOGO" style="width: 1rem" />DEVCOLLAB </span>
        </div>
      </div>
      <div class="container-sm">
        <div class="h1 p-4 color-gray-2">Keeping Your Projects on Track</div>
        <div class="h2 p-2 color-gray-2">Synchronize Your Team's Efforts</div>
        <div class="h6 p-2 red-text-1">DEVCOLLAB</div>
      </div>
      <div class="my-auto">
        <button @click="goLogin" class="large-text my-auto bg-red-1 color-white p-6 rounded-5">
          CONNECT
        </button>

        <div class="fs-1 red-text-1 fw-bolder mt-6">EVERY</div>
        <div class="fs-3 red-text-1 fw-bolder">
          <span> #Team </span>
          <span> #Task </span>
          <span> #Project </span>
        </div>
      </div>
      <div class="footer position-absolute bottom-0 start-0 p-4 fs-6 text-start color-gray-2">
        <div>Security | Terms and Privacy | Privacy Policy</div>
        <div>CS5351 @ CODE MONKEY</div>
      </div>
    </v-container>

    <div class="p-4 bg-gray-2 color-white position-fixed top-0 end-0 mx-6 z-0 logo-div">
      <div class="text-center vh-100">
        <div class="pb-3">
          <img :src="Logo" alt="LOGO" style="height: 11.5rem" />
        </div>
        <div class="logo-text p-2 d-flex flex-sm-column color-gray-2">
          <span class="rotate fw-bolder red-text-1">D</span>
          <span class="rotate fw-bolder">E</span>
          <span class="rotate fw-bolder">V</span>
          <span class="rotate fw-bolder red-text-1">C</span>
          <span class="rotate fw-bolder">O</span>
          <span class="rotate fw-bolder">L</span>
          <span class="rotate fw-bolder">L</span>
          <span class="rotate fw-bolder">A</span>
          <span class="rotate fw-bolder">B</span>
        </div>
      </div>
    </div>
  </v-app>
</template>
