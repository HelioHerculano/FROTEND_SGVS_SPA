<template>
  <!--begin::Root-->
  <div class="d-flex flex-column flex-root" id="kt_app_root">
    <!--begin::Authentication - Sign-in -->
    <div class="d-flex flex-column flex-lg-row flex-column-fluid">
      <!--begin::Body-->
      <div
        class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        style="background-color: #fff"
      >
        <!--begin::Form-->
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <!--begin::Wrapper-->
          <div class="w-lg-500px p-10">
            <!--begin::Form-->
            <form
              @submit.prevent="login"
              class="form w-100"
              novalidate="novalidate"
              id="kt_sign_in_form"
              data-kt-redirect-url="/metronic8/demo1/../demo1/index.html"
              action="#"
            >
              <!--begin::Heading-->
              <div class="text-center mb-11">
                <!--begin::Title-->
                <h1 class="text-dark fw-bolder mb-3">Autenticação</h1>
                <!--end::Title-->

                <!--begin::Subtitle-->
                <div class="text-gray-500 fw-semibold fs-6" hidden>
                  Your Social Campaigns
                </div>
                <!--end::Subtitle--->
              </div>
              <!--begin::Heading-->

              <!--begin::Input group--->
              <div class="fv-row mb-8">
                <!--begin::Email-->
                <input
                  type="text"
                  placeholder="Email"
                  v-model="form.email"
                  name="email"
                  autocomplete="off"
                  class="form-control form-control-lg form-control-solid"
                  :class="{
                    'is-invalid': this.isInvalidEmail,
                    'is-valid': this.isValidEmail,
                  }"
                />
                <div class="fv-plugins-message-container invalid-feedback">
                  <div
                    v-show="this.errors.email"
                    data-field="name"
                    data-validator="notEmpty"
                  >
                    {{ this.errorMessageEmail }}
                  </div>
                </div>
                <!--end::Email-->
              </div>

              <!--end::Input group--->
              <div class="fv-row mb-3">
                <!--begin::Password-->
                <input
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                  name="password"
                  autocomplete="off"
                  class="form-control form-control-lg form-control-solid"
                  :class="{
                    'is-invalid': this.isInvalidPassword,
                    'is-valid': this.isValidPassword,
                  }"
                />
                <div class="fv-plugins-message-container invalid-feedback">
                  <div
                    v-show="this.errors.password"
                    data-field="name"
                    data-validator="notEmpty"
                  >
                    {{ this.errorMessagePassword }}
                  </div>
                </div>
                <!--end::Password-->
              </div>
              <!--end::Input group--->

              <!--begin::Wrapper-->
              <div
                class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8"
              >
                <div></div>

                <!--begin::Link-->
                <a href="reset-password.html" class="link-primary">
                  Forgot Password ?
                </a>
                <!--end::Link-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Submit button-->
              <div class="d-grid mb-10">
                <button
                  type="submit"
                  id="kt_sign_in_submit"
                  class="btn btn-primary"
                  :data-kt-indicator="this.indicator"
                >
                  <!--begin::Indicator label-->
                  <span class="indicator-label"> Entrar</span>
                  <!--end::Indicator label-->

                  <!--begin::Indicator progress-->
                  <span class="indicator-progress">
                    Porfavor aguarde...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                  <!--end::Indicator progress-->
                </button>
              </div>
              <!--end::Submit button-->

              <!--begin::Sign up-->
              <div class="text-gray-500 text-center fw-semibold fs-6">
                Not a Member yet?

                <a href="sign-up.html" class="link-primary"> Entrar </a>
              </div>
              <!--end::Sign up-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Form-->

        <!--begin::Footer-->
        <div class="w-lg-500px d-flex flex-stack px-10 mx-auto">
          <!--begin::Links-->
          <div class="d-flex fw-semibold text-primary fs-base gap-5">
            <a href="../../../pages/team.html" target="_blank">Terms</a>

            <a href="../../../pages/pricing/column.html" target="_blank"
              >Plans</a
            >

            <a href="../../../pages/contact.html" target="_blank">Contact Us</a>
          </div>
          <!--end::Links-->
        </div>
        <!--end::Footer-->
      </div>
      <!--end::Body-->

      <!--begin::Aside-->
      <div
        class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
        style="
          background-image: url(src/dist-assets/assets/media/misc/auth-bg.png);
        "
      >
        <!--begin::Content-->
        <div
          class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
        >
          <!--begin::Logo-->
          <a href="../../../index.html" class="mb-0 mb-lg-12">
            <img
              alt="Logo"
              src="src/dist-assets/assets/media/logos/custom-1.png"
              class="h-60px h-lg-75px"
            />
          </a>
          <!--end::Logo-->

          <!--begin::Image-->
          <img
            class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
            src="src/dist-assets/assets/media/misc/Certification-amico.png"
            alt=""
          />
          <!--end::Image-->

          <!--begin::Title-->
          <!-- <h1
            class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
          >
            Fast, Efficient and Productive
          </h1> -->
          <!--end::Title-->

          <!--begin::Text-->
          <!-- <div class="d-none d-lg-block text-white fs-base text-center">
            In this kind of post,
            <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
              >the blogger</a
            >

            introduces a person they’ve interviewed <br />
            and provides some background information about

            <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
              >the interviewee</a
            >
            and their <br />
            work following this is a transcript of the interview.
          </div> -->
          <!--end::Text-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Aside-->
    </div>
    <!--end::Authentication - Sign-in-->
  </div>
  <!--end::Root-->
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "@/stores/AppState";
import { UserStore } from "@/stores/UserStore";
import { mapState } from "pinia";
import Api from "../ApiRest.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";

export default {
  data() {
    return {
      appState: AppState(),
      router: useRouter(),
      userStore: UserStore(),
      form: reactive({
        email: "",
        password: "",
      }),
      indicator: "",
      errors: ref([]),
      isValidEmail: "",
      isInvalidEmail: "",
      isValidPassword: "",
      isInvalidPassword: "",
    };
  },
  computed: {
    ...mapState(UserStore, ["token"]),
    errorMessageEmail() {
      if (this.errors.email) return this.errors.email[0];
      return "";
    },
    errorMessagePassword() {
      if (this.errors.password) return this.errors.password[0];
      return "";
    },
  },

  methods: {
    validateInput(errors) {
      if (errors.email)
        this.isInvalidEmail = errors.email.length > 0 ? true : false;
      else {
        this.isInvalidEmail = false;
        this.isValidEmail = true;
      }

      if (errors.password)
        this.isInvalidPassword = errors.password.length > 0 ? true : false;
      else {
        this.isInvalidPassword = false;
        this.isValidPassword = true;
      }
    },

    async login() {
      this.indicator = "on";
      let data = {
        email: this.form.email,
        password: this.form.password,
      };

      console.log(data);

      const res = await Api.post("/login", data);

      console.log(res);

      if (res.code == 422 || !res.success) {
        this.errors = res.message;
        // console.log(this.errors);
        this.validateInput(this.errors);
        this.indicator = "";
        SweetAlert.Alert(
          "Erro",
          "Preecha correctamente os campos obrigatorios",
          "error",
          ""
        );
      }

      if (res.success) {
        this.indicator = "";
        // Utilits.showLoader()
        this.userStore.setToken(res.data.token);
        this.userStore.setUser(JSON.stringify(res.data.user));
        this.appState.setisLogin(false);
        // this.router.push({name:'Home'})
        // Navegue para outra rota e recarregue a página
        this.$router.replace("/home").then(() => {
          window.location.reload();
        });

        this.form.email = "";
        this.form.password = "";
        this.errors = [];
      }
    },
  },
  mounted() {
    // alert(this.isLogin)
  },
};
</script>
