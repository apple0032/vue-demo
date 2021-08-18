<style>
.login-background{
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('~@/assets/bg-main.png');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
  left: 0;
  background-color: #F8FAF7;
  overflow:hidden;
}
</style>
<template>
  <v-container fill-height>
    <div class="login-background"></div>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <ForgetPasswordForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ForgetPasswordForm from "../components/ForgetPasswordForm";
export default {
  name: "ForgetPassword",
  components: {
    ForgetPasswordForm,
  },
  data() {
    return {
      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: [
        "start",
        "center",
        "end",
        "space-around",
        "space-between",
      ],
      justify: "center",
    };
  },
};
</script>