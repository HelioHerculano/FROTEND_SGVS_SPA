<template>
  <main>
    <!--begin::Modal - New Target-->
    <div
      class="modal fade"
      id="kt_modal_time_table"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
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
              id="kt_time_table_form"
              class="form"
              action="#"
              @submit.prevent="alocacaoTimeExam"
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
              <div class="row">
                <!--Begin::col-->
                <div class="col select2-container">
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label
                      class="d-flex align-items-center fs-6 fw-semibold mb-2"
                    >
                      <span class="required">Data e Hora</span>

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
                      id="exame_date_id"
                      name="currnecy"
                      aria-label="Select a Timezone"
                      data-control="select2"
                      data-dropdown-parent="#kt_modal_time_table"
                      data-placeholder="---Selecione aqui---"
                      class="form-select form-select-solid"
                    >
                      <option value=""></option>

                        <option
                          v-for="(timetable, index) in this.$props.timetables"
                          :key="index"
                          :value="timetable.id"
                        >
                          {{ "Data:"+timetable.date +"   "+ "Hora:"+timetable.start_time +"-"+ timetable.end_time }}
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

                <!-- Begin:col -->
                <div class="col" hidden>
                  <!--begin::Input group-->
                  <div class="d-flex flex-column mb-8 fv-row">
                    <!--begin::Label-->
                    <label
                      class="d-flex align-items-center fs-6 fw-semibold mb-2"
                    >
                      <span class="required">Hora</span>

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
                      id="exame_time_id"
                      name="currnecy"
                      aria-label="Select a Timezone"
                      data-control="select2"
                      data-dropdown-parent="#kt_modal_time_table"
                      data-placeholder="---Selecione aqui---"
                      class="form-select form-select-solid"
                    >
                      <option value=""></option>
                    </select>
                    <!--end::Select-->

                    <div class="fv-plugins-message-container invalid-feedback">
                      <div
                        v-show="this.$props.errors.bloco"
                        data-field="name"
                        data-validator="notEmpty"
                      >
                        {{ this.errorMessageBloco }}
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
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
    bloco: {
      type: String,
    },
    capacity: {
      type: String,
    },
    number_room: {
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
    isLocationExamView: {
      type: Boolean,
    },
    isBankView: {
      type: Boolean,
    },
    isExamRoomView: {
      type: Boolean,
    },

    timetables: {
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
    // async getTimeExam(value){
    //   alert(value)
    // },
    async enableAlocacaoExam() {
        this.$emit("enableAlocacaoExam");
    },

    async alocacaoTimeExam() {
        this.$emit("alocacaoTimeExam");
    },
  },
  computed: {
    errorMessageLocation() {
      if (this.$props.errors.exam_location_id)
        return this.$props.errors.exam_location_id[0];
      return "";
    },
    errorMessageBloco() {
      if (this.$props.errors.bloco)
        return this.$props.errors.bloco[0];
      return "";
    },

    errorMessageNumber_room() {
      if (this.$props.errors.number_room)
        return this.$props.errors.number_room[0];
      return "";
    },
    errorMessageCapacity() {
      if (this.$props.errors.capacity) return this.$props.errors.capacity[0];
      return "";
    },
  },
};
</script>
