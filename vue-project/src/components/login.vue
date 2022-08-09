<template>
  <div>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="First Name:" class="mt-2">
            <b-form-input
              id="input-1"
              v-model="form.firstName"
              type="text"
              placeholder="Enter First Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Last Name:"
            label-for="input-2"
            class="mt-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.lastName"
              placeholder="Enter Last Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="User Name:"
            label-for="input-3"
            class="mt-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.username"
              placeholder="Enter User Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Password:"
            label-for="input-3"
            class="mt-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              placeholder="Enter Password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" class="mt-2" variant="primary">Submit</b-button>
          <b-button type="reset" class="mt-2" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
      show: true,
      ip: "",
      timestamp: "",
    };
  },
  async mounted() {
    let response = await this.getURL();
    this.ip = response.data.ipAddress;
    this.timestamp = Math.floor(Date.now() / 1000);
    console.log("ip addreess---->", this.ip);
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.form.ip = this.ip;
      this.form.timestamp = this.timestamp;
      console.log("form data---->", this.form);
      const response = await this.postURL(
        "/register",
        JSON.stringify(this.form)
      );
      console.log("response---->", response);
      alert(JSON.stringify(this.form));
      this.$router.push("/users");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
