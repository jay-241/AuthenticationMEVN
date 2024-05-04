<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <!-- Display error message if registration fails -->
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null  // Error handling state
    };
  },
  methods: {
    ...mapActions({ performRegister: 'register' }), // Use performRegister to avoid naming conflict

    async register() {
      try {
        const userData = {
          name: this.username,
          email: this.email,
          password: this.password
        };
        // Dispatch Vuex action with username, email, and password
        await this.performRegister(userData);
        // Navigate to the login page on successful registration
        this.$router.push('/login');
      } catch (error) {
        // Handle errors, such as showing an error message on the UI
        this.error = 'Failed to register. Please check your information and try again.';
        console.error('Register error:', error);
      }
    }
  }
};
</script>

<style>
/* Add any specific styling for your register component here */
</style>
