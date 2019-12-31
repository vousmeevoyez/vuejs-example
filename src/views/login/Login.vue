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
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true">
          <el-tab-pane label="Sign In">
            <el-form status-icon>
              <el-form-item prop="email">
                <el-input type="email" placeholder="Email"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" placeholder="Password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  @click="$router.push('home')"
                  class="login-button"
                >
                  Login
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Register">
            <el-form status-icon>
              <el-form-item prop="name">
                <el-input type="text" placeholder="Full Name"></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input type="email" placeholder="Email"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" placeholder="Password"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input
                  type="password"
                  placeholder="Confirm Password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  @click="$router.push('about')"
                  class="login-button"
                >
                  Login
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
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
