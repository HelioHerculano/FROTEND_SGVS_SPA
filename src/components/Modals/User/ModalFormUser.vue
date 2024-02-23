<template>
  <main>
    <!--begin::Modal - New Target-->
    <div
      class="modal fade"
      id="kt_modal_new_data"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-750px">
        <!--begin::Modal content-->
        <div class="modal-content rounded">
          <!--begin::Modal header-->
          <div class="modal-header pb-0 border-0 justify-content-end">
            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <i class="ki-duotone ki-cross fs-1"
                ><span class="path1"></span><span class="path2"></span
              ></i>
            </div>
            <!--end::Close-->
          </div>
          <!--begin::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
            <!--begin:Form-->
            <form
              id="kt_modal_location_form"
              class="form"
              action="#"
              @submit.prevent="registerOrUpdate"
            >
              <!--begin::Heading-->
              <div class="mb-13 text-center">
                <!--begin::Title-->
                <h1 class="mb-3">{{ this.$props.title }}</h1>
                <!--end::Title-->

                <!--begin::Description-->
                <!-- <div class="text-muted fw-semibold fs-5">
                                        If you need more info, please check <a href="#" class="fw-bold link-primary">Project Guidelines</a>.
                                    </div> -->
                <!--end::Description-->
              </div>
              <!--end::Heading-->

              <!--Begin::row-->
              <div class="row" v-show="!this.$props.isUpdatePass">
                <!-- Begin:col -->
                <div class="col">
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label
                      class="d-flex align-items-center fs-6 fw-semibold mb-2"
                    >
                      <span class="required">Nome completo</span>

                      <span
                        class="ms-1"
                        data-bs-toggle="tooltip"
                        title="Specify a target name for future usage and reference"
                      >
                        <i
                          class="ki-duotone ki-information-5 text-gray-500 fs-6"
                          ><span class="path1"></span><span class="path2"></span
                          ><span class="path3"></span></i
                      ></span>
                    </label>
                    <!--end::Label-->

                    <input
                      type="text"
                      class="form-control form-control-solid"
                      :placeholder="this.$props.placeholderOne"
                      name="address"
                      :value="this.name"
                      @input="$emit('update:name', $event.target.value)"
                    />

                    <div class="fv-plugins-message-container invalid-feedback">
                      <div
                        v-show="this.$props.errors.name"
                        data-field="name"
                        data-validator="notEmpty"
                      >
                        {{ this.errorMessageName }}
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
                </div>
                <!-- End:col -->

                <!-- Begin:col -->
                <div class="col">
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label
                      class="d-flex align-items-center fs-6 fw-semibold mb-2"
                    >
                      <span class="required">Nome do usuário</span>

                      <span
                        class="ms-1"
                        data-bs-toggle="tooltip"
                        title="Specify a target name for future usage and reference"
                      >
                        <i
                          class="ki-duotone ki-information-5 text-gray-500 fs-6"
                          ><span class="path1"></span><span class="path2"></span
                          ><span class="path3"></span></i
                      ></span>
                    </label>
                    <!--end::Label-->

                    <input
                      type="text"
                      class="form-control form-control-solid"
                      :placeholder="this.$props.placeholderTwo"
                      name="address"
                      :value="this.username"
                      @input="$emit('update:username', $event.target.value)"
                    />

                    <div class="fv-plugins-message-container invalid-feedback">
                      <div
                        v-show="this.$props.errors.username"
                        data-field="name"
                        data-validator="notEmpty"
                      >
                        {{ this.errorMessageUsername }}
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
                </div>
                <!-- End:col -->
              </div>
              <!--End::row-->

              <!--Begin row-->
              <div class="row" v-show="!this.$props.isUpdatePass">
                <!--Begin::col-->
                <div class="col select2-container">
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label
                      class="d-flex align-items-center fs-6 fw-semibold mb-2"
                    >
                      <span class="required">Nivel de acesso</span>

                      <span
                        class="ms-1"
                        data-bs-toggle="tooltip"
                        title="Specify a target name for future usage and reference"
                      >
                        <i
                          class="ki-duotone ki-information-5 text-gray-500 fs-6"
                          ><span class="path1"></span><span class="path2"></span
                          ><span class="path3"></span></i
                      ></span>
                    </label>
                    <!--end::Label-->

                    <!--begin::Select-->
                    <select
                      id="accessLevel_id"
                      name="currnecy"
                      aria-label="Select a Timezone"
                      data-control="select2"
                      data-dropdown-parent="#kt_modal_new_data"
                      data-placeholder="---Selecione aqui---"
                      class="form-select form-select-solid"
                    >
                      <option value=""></option>

                      <option
                        v-for="(accessLevel, index) in this.$props.accessLevels"
                        :key="index"
                        :value="accessLevel.id"
                      >
                        {{ accessLevel.level }}
                      </option>
                    </select>
                    <!--end::Select-->

                    <div class="fv-plugins-message-container invalid-feedback">
                      <div
                        v-show="this.$props.errors.access_level_id"
                        data-field="name"
                        data-validator="notEmpty"
                      >
                        {{ this.errorMessageAccessLevel }}
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
                </div>
                <!--End::col-->
              </div>
              <!--End row-->

              <!--Begin::row-->
              <!--begin::Main wrapper-->
              <div
                class="row"
                data-kt-password-meter="true"
                v-show="!this.$props.isUpdate"
              >
                <div class="col">
                  <!--begin::Wrapper-->
                  <div class="mb-1">
                    <!--begin::Label-->
                    <label class="form-label fw-semibold fs-6 mb-2">
                      Senha
                    </label>
                    <!--end::Label-->

                    <!--begin::Input wrapper-->
                    <div class="position-relative mb-3">
                      <input
                        class="form-control form-control-lg form-control-solid"
                        type="password"
                        :placeholder="this.placeholderThree"
                        name="senha"
                        autocomplete="off"
                        :value="this.password"
                        @input="$emit('update:password', $event.target.value)"
                      />

                      <!--begin::Visibility toggle-->
                      <span
                        class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <i class="ki-duotone ki-eye-slash fs-1"
                          ><span class="path1"></span><span class="path2"></span
                          ><span class="path3"></span><span class="path4"></span
                        ></i>
                        <i class="ki-duotone ki-eye d-none fs-1"
                          ><span class="path1"></span><span class="path2"></span
                          ><span class="path3"></span
                        ></i>
                      </span>
                      <!--end::Visibility toggle-->
                    </div>
                    <!--end::Input wrapper-->
                    <div class="fv-plugins-message-container invalid-feedback">
                      <div
                        v-show="this.$props.errors.password"
                        data-field="name"
                        data-validator="notEmpty"
                      >
                        {{ this.errorMessagePassword }}
                      </div>
                    </div>
                    <!--begin::Highlight meter-->
                    <div
                      class="d-flex align-items-center mb-3"
                      data-kt-password-meter-control="highlight"
                    >
                      <div
                        class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
                      ></div>
                      <div
                        class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
                      ></div>
                      <div
                        class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
                      ></div>
                      <div
                        class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
                      ></div>
                    </div>
                    <!--end::Highlight meter-->
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Hint-->
                  <div class="text-muted">
                    Use 8 ou mais caracteres com uma combinação de letras,
                    números & simbolos.
                  </div>
                  <!--end::Hint-->
                  <!-- </div> -->
                  <!--end::Main wrapper-->
                </div>
                <!-- Begin:col -->
                <div class="col">
                  <!--begin::Main wrapper-->
                  <div class="fv-row" data-kt-password-meter="true">
                    <!--begin::Wrapper-->
                    <div class="mb-1">
                      <!--begin::Label-->
                      <label class="form-label fw-semibold fs-6 mb-2">
                        Confirme a senha
                      </label>
                      <!--end::Label-->

                      <!--begin::Input wrapper-->
                      <div class="position-relative mb-3">
                        <input
                          class="form-control form-control-lg form-control-solid"
                          type="password"
                          :placeholder="this.placeholderFour"
                          name="c_password"
                          autocomplete="off"
                          :value="this.c_password"
                          @input="
                            $emit('update:c_password', $event.target.value)
                          "
                        />

                        <!--begin::Visibility toggle-->
                        <span
                          class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                          data-kt-password-meter-control="visibility"
                        >
                          <i class="ki-duotone ki-eye-slash fs-1"
                            ><span class="path1"></span
                            ><span class="path2"></span
                            ><span class="path3"></span
                            ><span class="path4"></span
                          ></i>
                          <i class="ki-duotone ki-eye d-none fs-1"
                            ><span class="path1"></span
                            ><span class="path2"></span
                            ><span class="path3"></span
                          ></i>
                        </span>
                        <!--end::Visibility toggle-->
                      </div>
                      <div
                        class="fv-plugins-message-container invalid-feedback"
                      >
                        <div
                          v-show="this.$props.errors.c_password"
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          {{ this.errorMessageConfirmationPassword }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Main wrapper-->
                </div>
                <!-- End:col -->
              </div>
              <!--End::row-->

              <!--begin::Actions-->
              <div class="text-center">
                <button
                  type="reset"
                  data-bs-dismiss="modal"
                  id="kt_modal_new_bank_cancel"
                  class="btn btn-light me-3"
                >
                  Cancelar
                </button>

                <!-- <button type="submit" id="kt_modal_new_bank" class="btn btn-primary" data-kt-indicator="on" disabled> -->
                <button
                  type="submit"
                  id="kt_modal_new_data_submit"
                  class="btn btn-primary"
                  :data-kt-indicator="this.$props.indicatorProps"
                >
                  <span class="indicator-label">
                    {{ this.$props.btnText }}
                  </span>
                  <span class="indicator-progress">
                    Por favor aguader...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
              <!--end::Actions-->
            </form>
            <!--end:Form-->
          </div>
          <!--end::Modal body-->
        </div>
        <!--end::Modal content-->
      </div>
      <!--end::Modal dialog-->
    </div>
    <!--end::Modal - New Target-->
  </main>
</template>

<script>
// import Api from '../../../ApiRest.js'
// import Utilits from '../../../Utilits.js'
// import SweetAlert from '../../../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js'

export default {
  // props:['title','descriptionProps','abbreviationProps','indicatorProps'],
  props: {
    title: {
      type: String,
    },
    btnText: {
      type: String,
    },
    isUpdate: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    c_password: {
      type: String,
    },
    indicatorProps: {
      type: String,
    },
    errors: {
      type: Array,
    },
    placeholderOne: {
      type: String,
    },
    placeholderTwo: {
      type: String,
    },
    placeholderThree: {
      type: String,
    },
    placeholderFour: {
      type: String,
    },
    isLocationExamView: {
      type: Boolean,
    },
    isBankView: {
      type: Boolean,
    },
    isExamRoomView: {
      type: Boolean,
    },
    isUpdatePass: {
      type: Boolean,
    },
    accessLevels: {
      type: Array,
    },
  },

  data() {
    return {
      // description: this.$props.descriptionProps,
      // abbreviation: this.$props.abbreviationProps,
      // indicator: this.indicatorProps
    };
  },

  methods: {
    async registerOrUpdate() {
      if (!this.$props.isUpdate) {
        this.$emit("register");
      } else {
        this.$emit("update");
      }

      if (this.$props.isUpdatePass) {
        this.$emit("updatePassword");
      }
    },
  },
  computed: {
    errorMessageName() {
      if (this.$props.errors.name) return this.$props.errors.name[0];
      return "";
    },
    errorMessageUsername() {
      if (this.$props.errors.username) return this.$props.errors.username[0];
      return "";
    },
    errorMessageAccessLevel() {
      if (this.$props.errors.access_level_id)
        return this.$props.errors.access_level_id[0];
      return "";
    },
    errorMessagePassword() {
      if (this.$props.errors.password) return this.$props.errors.password[0];
      return "";
    },
    errorMessageConfirmationPassword() {
      if (this.$props.errors.c_password)
        return this.$props.errors.c_password[0];
      return "";
    },
  },
  // mounted() {
  //   console.log(this.$props.locations[0].description);
  // },
};
</script>
