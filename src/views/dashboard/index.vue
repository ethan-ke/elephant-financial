<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello Elephant</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    margin-top: 30vh;
    text-align: center;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
