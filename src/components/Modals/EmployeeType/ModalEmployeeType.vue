<template>
  <main>
    <!--begin::Modal - Add task-->
    <div
      class="modal fade"
      id="kt_modal_new_data"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_user_header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">{{ this.$props.title }}</h2>
            <!--end::Modal title-->

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
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <!--begin::Form-->
            <!--begin:Form-->
            <form
              id="kt_modal_new_bank_form"
              class="form"
              action="#"
              @submit.prevent="registerOrUpdate"
            >
              <!--end::Heading-->
              <div class="row mb-5">
                <!--begin::Input group-->
                <div class="col">
                  <!--begin::Label-->
                  <label
                    class="d-flex align-items-center fs-6 fw-semibold mb-2"
                  >
                    <span class="required">Cargo</span>

                    <span
                      class="ms-1"
                      data-bs-toggle="tooltip"
                      title="Specify a target name for future usage and reference"
                    >
                      <i class="ki-duotone ki-information-5 text-gray-500 fs-6"
                        ><span class="path1"></span><span class="path2"></span
                        ><span class="path3"></span></i
                    ></span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div class="position-relative d-flex align-items-center">
                    

                    <input
                      id=""
                      :placeholder="this.$props.placeholderOne"
                      class="form-control form-control-solid "
                      :class="{
                        'is-invalid': this.$props.isInvalidRule,
                        'is-valid': this.$props.isValidRule,
                      }"
                      name="date"
                      :value="this.cargo"
                      @input="$emit('update:date', $event.target.value)"
                    />
                  </div>
                  <!--end::Input-->

                  <div class="fv-plugins-message-container invalid-feedback">
                    <div
                      v-show="this.$props.errors.date"
                      data-field="name"
                      data-validator="notEmpty"
                    >
                      {{ this.errorMessageDate }}
                    </div>
                  </div>
                </div>
                <!--end::Input group-->
              </div>

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
            <!--end::Form-->
          </div>
          <!--end::Modal body-->
        </div>
        <!--end::Modal content-->
      </div>
      <!--end::Modal dialog-->
    </div>
    <!--end::Modal - Add task-->
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
    cargo: {
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
    isInvalidRule: {
      type: Boolean,
    },
    isValidRule: {
      type: Boolean,
    }
  },

  data() {
    return {
      // isInvalidDate: false,
      // isInvalidStartTime: false,
      // isInvalidEndTime: false
    };
  },

  methods: {
    async registerOrUpdate() {
      if (!this.$props.isUpdate) {
        this.$emit("register");
      } else {
        this.$emit("update");
      }
    },
  },
  computed: {
    errorMessageStartTime() {
      if (this.$props.errors.start_time)
        return this.$props.errors.start_time[0];
      return "";
    },

    errorMessageEndTime() {
      if (this.$props.errors.end_time) return this.$props.errors.end_time[0];
      return "";
    },

    errorMessageDate() {
      if (this.$props.errors.date) {
        return this.$props.errors.date[0];
      }
      return "";
    },
  },
};
</script>
