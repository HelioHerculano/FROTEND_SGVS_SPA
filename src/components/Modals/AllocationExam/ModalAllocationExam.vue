<template>
  <main>
    <!--begin::Modal - New Target-->
    <div
      class="modal fade"
      id="kt_modal_allocation_exam"
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
              id="kt_modal_allocation_exam_form"
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

              <!--begin::Input group-->
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  Tipo de alocação

                  <span
                    class="ms-1"
                    data-bs-toggle="tooltip"
                    title="Select a discount type that will be applied to this product"
                  >
                    <i class="ki-duotone ki-information-5 text-gray-500 fs-6"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span></i
                  ></span>
                </label>
                <!--End::Label-->

                <!--begin::Row-->
                <div
                  class="row"
                  data-kt-buttons="true"
                  data-kt-buttons-target="[data-kt-button='true']"
                >
                  <!--begin::Col-->
                  <div class="col-6">
                    <!--begin::Option-->
                    <label
                      class="btn btn-outline btn-outline-dashed btn-active-light-primary active d-flex text-start p-6"
                      data-kt-button="true"
                    >
                      <!--begin::Radio-->
                      <span
                        class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"
                      >
                        <input
                          class="form-check-input allocation_type"
                          type="radio"
                          name="allocationType"
                          checked="checked"
                          :value="1"
                          @click="changeForm(1)"
                        />
                      </span>
                      <!--end::Radio-->

                      <!--begin::Info-->
                      <span class="ms-5">
                        <span class="fs-4 fw-bold text-gray-800 d-block"
                          >Alocação Manual</span
                        >
                      </span>
                      <!--end::Info-->
                    </label>
                    <!--end::Option-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col">
                    <!--begin::Option-->
                    <label
                      class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6"
                      data-kt-button="true"
                    >
                      <!--begin::Radio-->
                      <span
                        class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"
                      >
                        <input
                          class="form-check-input allocation_type"
                          type="radio"
                          name="allocationType"
                          :value="2"
                          @click="changeForm(2)"
                        />
                      </span>
                      <!--end::Radio-->

                      <!--begin::Info-->
                      <span class="ms-5">
                        <span class="fs-4 fw-bold text-gray-800 d-block"
                          >Alocação Automatica</span
                        >
                      </span>
                      <!--end::Info-->
                    </label>
                    <!--end::Option-->
                  </div>
                  <!--end::Col-->

                </div>
                <!--end::Row-->
              </div>
              <!--end::Input group-->

              <div class="typeManualDive">

                <!--Begin::row-->
                <div class="row">
                  <!--Begin::col-->
                  <div class="col select2-container" 
                  :class="{
                    'col-6': this.allocationTypeAutomatic,
                  }"
                  >
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-8 fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-6 fw-semibold mb-2"
                      >
                        <span class="required">Selecione o exame</span>

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
                        id="exame_id"
                        name="currnecy"
                        aria-label="Select a Timezone"
                        data-control="select2"
                        data-dropdown-parent="#kt_modal_allocation_exam"
                        data-placeholder="---Selecione aqui---"
                        class="form-select form-select-solid"
                      >
                        <option value=""></option>

                        <option
                          v-for="(exam, index) in this.$props.exams"
                          :key="index"
                          :value="exam.id"
                        >
                          {{ exam.subject }}
                        </option>
                      </select>
                      <!--end::Select-->

                      <div class="fv-plugins-message-container invalid-feedback">
                        <div
                          v-show="this.$props.errors.exam_id"
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          {{ this.errorMessageExam }}
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->
                  </div>
                  <!--End::col-->

                  <div class="col" v-show="this.allocationTypeAutomatic">
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-8 fv-row">
                      <!--begin::Label-->
                      <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                        <span class="required">Número de examinandos</span>

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

                      <input
                        type="number"
                        class="form-control form-control-solid"
                        :placeholder="this.$props.placeholderOne"
                        name="tobe_examined"
                        :value="this.all_tobe_examined"
                        @input="$emit('update:all_tobe_examined', $event.target.value)"
                      />

                      <div class="fv-plugins-message-container invalid-feedback">
                        <div
                          v-show="this.$props.errors.all_tobe_examined"
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          {{ this.errorMessageAllTobeExamined }}
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--End::row-->


                <!--Begin::row-->
                <div class="row" v-show="this.allocationTypeManual">
                  <!--Begin::col-->
                  <div class="col select2-container">
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-8 fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-6 fw-semibold mb-2"
                      >
                        <span class="required">Selecione o local</span>

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
                        id="location_id"
                        name="currnecy"
                        aria-label="Select a Timezone"
                        data-control="select2"
                        data-dropdown-parent="#kt_modal_allocation_exam"
                        data-placeholder="---Selecione aqui---"
                        class="form-select form-select-solid"
                      >
                        <option value=""></option>

                        <option
                          v-for="(local, index) in this.$props.locations"
                          :key="index"
                          :value="local.id"
                        >
                          {{ local.designation }}
                        </option>
                      </select>
                      <!--end::Select-->

                      <div class="fv-plugins-message-container invalid-feedback">
                        <div
                          v-show="this.$props.errors.exam_location_id"
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          {{ this.errorMessageLocation }}
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->
                  </div>
                  <!--End::col-->

                                  <!--Begin::col-->
                  <div class="col select2-container">
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-8 fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-6 fw-semibold mb-2"
                      >
                        <span class="required">Selecione a sala</span>

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
                        id="room_id"
                        name="currnecy"
                        aria-label="Select a Timezone"
                        data-control="select2"
                        multiple="multiple"
                        data-dropdown-parent="#kt_modal_allocation_exam"
                        data-placeholder="---Selecione aqui---"
                        data-allow-clear="true"
                        class="form-select form-select-solid"
                      >
                        <option value=""></option>

                      </select>
                      <!--end::Select-->
                      
                      <div class="fv-plugins-message-container">
                        <div
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          <div class="form-check form-check-sm form-check-custom form-check-solid mt-1">
                              <input class="form-check-input widget-13-check" id="checkAllRoom"  type="checkbox" value="false"/>
                              &nbsp; Alocar em todas salas
                          </div>
                        </div>
                      </div>

                      <div class="fv-plugins-message-container invalid-feedback">
                        <div
                          v-show="this.$props.errors.exam_room_id"
                          data-field="name"
                          data-validator="notEmpty"
                        >
                          {{ this.errorMessageRoom }}
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->
                  </div>
                  <!--End::col-->
                </div>
                <!--End::row-->

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
                  id="kt_modal_data_submit"
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
    isLocationExamView: {
      type: Boolean,
    },
    
    locations: {
      type: Array,
    },

    exams: {
      type: Array,
    },    
    all_tobe_examined: {
      type: String,
    },
  },

  data() {
    return {
      allocationTypeManual:true,
      allocationTypeAutomatic:false,
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
    changeForm(value){
      if(value == 1){
        this.allocationTypeManual = true
        this.allocationTypeAutomatic = false
      }else if(value == 2){
        this.allocationTypeAutomatic = true
        this.allocationTypeManual = false
      }
    }
  },
  computed: {
    errorMessageLocation() {
      if (this.$props.errors.exam_location_id)
        return this.$props.errors.exam_location_id[0];
      return "";
    },
    errorMessageExam() {
      if (this.$props.errors.exam_id) return this.$props.errors.exam_id[0];
      return "";
    },

    errorMessageRoom() {
      if (this.$props.errors.exam_room_id)
        return this.$props.errors.exam_room_id[0];
      return "";
    },
    errorMessageAllTobeExamined() {
      if (this.$props.errors.all_tobe_examined) return this.$props.errors.all_tobe_examined[0];
      return "";
    },
  },
};
</script>
