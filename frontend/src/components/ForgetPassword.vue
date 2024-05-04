<template>
  <div>
    <h1>Forget Password</h1>
    <form @submit.prevent="sendResetLink">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <button type="submit">Send Reset Link</button>
    </form>
    <!-- Display notification message -->
    <p v-if="notification" style="color: green;">{{ notification }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: ''
    };
  },
  computed: {
    ...mapGetters(['notification']),
  },
  methods: {
    ...mapActions(['forgetPassword']),
    async sendResetLink() {
      await this.forgetPassword(this.email);
    }
  }
};
</script>

<style>
/* Style as needed */
</style>
