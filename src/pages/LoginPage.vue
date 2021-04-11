<template>
  <div class="container">
    <br />
    <img v-if="header" src="../assets/LoginPageHeader.png" />
    <br />
    <div>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          style="font-weight:bold"
          id="username"
          label="Username:"
          label-for="userInput"
        >
          <b-form-input
            id="userInput"
            v-model="$v.form.username.$model"
            type="text"
            placeholder="Enter Username"
            :state="validate('username')"
          />
          <b-form-invalid-feedback>
            Username can't be empty
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          style="font-weight:bold"
          id="password"
          label="Password:"
          label-for="passInput"
        >
          <b-form-input
            id="passInput"
            v-model="$v.form.password.$model"
            type="password"
            placeholder="Enter Username"
            :state="validate('password')"
          />
          <b-form-invalid-feedback>
            Password can't be empty
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="formButtons">
          <b-button type="submit" variant="primary">Login</b-button>
          <b-button type="button" variant="success" @click="onRegister"
            >Register</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  props: {
    header: {
      type: Boolean,
      required: false,
      default: () => true,
    },
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validate(input) {
      const { $dirty, $error } = this.$v.form[input];
      return $dirty ? !$error : null;
    },
    onLogin() {
      this.Login();
    },
    onRegister() {
      this.$router.replace("/register");
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "https://assignment3r-r.herokuapp.com/auth/login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        if (response.status == 200) {
          this.$root.store.login(this.form.username);
          this.$router.push({ name: "main" });
        }
      } catch (err) {
        if (err.response.status == 401) {
          this.$root.toast(
            "Unauthorized",
            "Wrong Username Or Password",
            "danger"
          );
        } else {
          this.$root.toast("Error", "Could Not Log In", "danger");
        }
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.formButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
