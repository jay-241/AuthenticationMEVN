<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
    <p>
      <router-link to="/forget-password">Forgot Password?</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    ...mapActions({ performLogin: 'login' }),

    async login() {
      try {
        await this.performLogin({ email: this.email, password: this.password });
        this.$router.push('/register');
      } catch (error) {
        this.error = 'Failed to login. Please check your credentials.';
        console.error('Login error:', error);
      }
    }
  }
};
</script>

