<script>
export default {
  methods: {
    goLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.red-text-1 {
  color: $red-1;
}
.large-text {
  font-size: 6rem;
}
.bg-red-1 {
  background-color: $red-1;
}
.color-white {
  color: $vt-c-white;
}
</style>
<template>
  <div>
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
</template>
