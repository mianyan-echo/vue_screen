<template>
<div class="login">
  <el-card>
    <h2>用户登录</h2>
    <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form">
      <el-form-item prop="username">
        <el-input
            v-model="model.username"
            placeholder="用户名"
            prefix-icon="fa-user"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            v-model="model.password"
            placeholder="密码"
            type="password"
            prefix-icon="fa-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            @click.prevent="login"
            block>登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
name: "user_login",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {required: true, message: "用户名不能为空", trigger: "blur"},
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$rest_api.api_user_login_token(this.model.username, this.model.password)
          .then(data => {
            this.$message.success("登陆成功");
            localStorage.setItem('username', this.model.username);
            localStorage.setItem('token', data.token);
            this.$emit('auth_pass', this.model.username);
          })
          .catch(err => {
            if (err.status === 400){
              this.$message.error("用户名或密码不正确");
            }
          })
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
</style>