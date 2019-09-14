<template>
  <div>
    <h1>{{ texto }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  
</style>
