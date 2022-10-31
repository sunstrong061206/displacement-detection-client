<template>
  <div id="app">
    <Space />
    <Form />
  </div>
</template>

<script>
import Space from '@/components/Space.vue'
import Form from './components/Form.vue'
export default {
  name: 'App',
  components: {
    Space,
    Form,
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
