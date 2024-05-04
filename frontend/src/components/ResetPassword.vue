<template>
  <div>
    <h1>Reset Password</h1>
    <form @submit.prevent="submitResetPassword">
      <div>
        <label for="password">New Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Reset Password</button>
    </form>
    <!-- Display notification message -->
    <p v-if="notification" style="color: green;">{{ notification }}</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    token: String
  },
  data() {
    return {
      password: '',
      error: ''
    };
  },
  computed: {
    ...mapGetters(['notification']),
  },
  methods: {
    ...mapActions({ performResetPassword: 'resetPassword' }),
    
    async submitResetPassword() {
      try {
        // Dispatch the action with the required parameters
        await this.performResetPassword({
          token: this.token,
          password: this.password
        });
      } catch (error) {
        this.error = 'Failed to reset the password. Please try again.';
        console.error('Reset password error:', error);
      }
    }
  }
};
</script>

<style>
/* Add any specific styling for your reset password component here */
</style>
