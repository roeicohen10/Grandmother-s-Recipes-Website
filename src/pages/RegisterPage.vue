<template>
  <div class="container">
    <br />
    <img src="../assets/RegisterHeader.png" />
    <br />
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.checkContainNumericChar"
        >
          Password should have atleast one numeric char
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.checkContainSpecialChar"
        >
          Password should have atleast one special char
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email Address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          E-mail is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Please enter valid email address
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-url"
        label-cols-sm="3"
        label="Image Url:"
        label-for="url"
      >
        <b-form-input
          id="url"
          v-model="$v.form.url.$model"
          type="url"
          :state="validateState('url')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.url.required">
          Image Url is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.url.url">
          Please enter valid url
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="registerButtons">
        <b-button type="reset" variant="danger" style="float:left"
          >Reset</b-button
        >
        <b-button type="submit" variant="primary" style="float:right"
          >Register</b-button
        >
      </div>

      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
const checkContainNumericChar = (password) => {
  const numRegex = new RegExp("(?=.*[0-9])");
  return numRegex.test(password);
};
const checkContainSpecialChar = (password) => {
  const specRegex = new RegExp("(?=.*[!@#$%^&*])");
  return specRegex.test(password);
};

import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined,
        url: "",
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        checkContainNumericChar,
        checkContainSpecialChar,
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      url: {
        required,
      },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "https://assignment3r-r.herokuapp.com/auth/register",
          {
            username: this.form.username,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            passwordConfirmation: this.form.confirmedPassword,
            email: this.form.email,
            userImage: this.form.url,
          }
        );
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
}
.registerButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
