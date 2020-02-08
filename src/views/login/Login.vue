<template>
  <div class="center-screen">
    <el-row>
      <el-col>
        <h1>DreamGravity</h1>
        <img src="@/assets/images/circle-logo.png" class="login-logo" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs :stretch="true">
          <el-tab-pane label="Sign In">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              auto-complete="on"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  placeholder="Username"
                  v-model="loginForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="Password"
                  v-model="loginForm.password"
                  @keyup.enter.native="handleLogin"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click.native.prevent="handleLogin"
                  class="login-button"
                >
                  Login
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Register">
            <el-form
              ref="registrationForm"
              :model="registrationForm"
              :rules="registrationRules"
              auto-complete="on"
            >
              <el-form-item prop="fullName">
                <el-input
                  type="text"
                  placeholder="Full Name"
                  v-model="registrationForm.fullName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  type="email"
                  placeholder="Email"
                  v-model="registrationForm.email"
                ></el-input>
              </el-form-item>
              <el-form-item prop="username">
                <el-input
                  type="text"
                  placeholder="Username"
                  v-model="registrationForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="Password"
                  v-model="registrationForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                  type="password"
                  placeholder="Confirm Password"
                  v-model="registrationForm.confirmPassword"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click.native.prevent="handleRegister"
                  class="login-button"
                >
                  Register
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      registrationForm: {
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "change"
          },
          {
            min: 5,
            max: 62,
            message: "Minimal 5 to 62 letter",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "password is required",
            trigger: "change"
          }
        ]
      },
      registrationRules: {
        fullName: [
          {
            required: true,
            message: "Full Name is required",
            trigger: "change"
          },
          {
            min: 5,
            max: 62,
            message: "Minimal 5 to 62 letter",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "password is required", trigger: "change" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "email is required",
            trigger: "change"
          }
        ],
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "change"
          },
          {
            min: 5,
            max: 62,
            message: "Minimal 5 to 62 letter",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "confirm password is required",
            trigger: "change"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    ...mapActions([
      "authenticateUser",
      "registerUser",
      "triggerError",
      "triggerInfo"
    ]),
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.authenticateUser(this.loginForm)
            .then(data => {
              this.loading = true;
              this.$router.push("home");
            })
            .catch(({ error }) => {
              this.loading = false;
              this.triggerError(error);
            });
        }
      });
    },
    handleRegister() {
      this.$refs.registrationForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.registerUser(this.registrationForm)
            .then(data => {
              this.loading = false;
              this.triggerInfo("Register instruction here....");
            })
            .catch(({ error }) => {
              this.loading = false;
              this.triggerError(error);
            });
        }
      });
    },
    clearAlert() {
      this.triggerClear();
    }
  }
};
</script>
<style scoped>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
.login-button {
  width: 300px;
  background-color: #006266;
  border-color: #006266;
}
.login-logo {
  width: 100px;
  height: auto;
}
.link-text:visited,
.link-text:link {
  text-decoration: none;
  color: pink;
}
p.logo-text {
  font-weight: bold;
}
</style>
