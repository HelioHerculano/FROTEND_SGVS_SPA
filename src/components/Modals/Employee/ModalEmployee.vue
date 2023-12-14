<template>
  <main>
    <!--begin::Modal - New Target-->
    <div
      class="modal fade"
      id="kt_modal_location"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-fullscreen p-5 p-lg-10">
        <!--begin::Modal content-->
        <div class="modal-content rounded-4">
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
            <!--begin::Basic info-->
            <div class="card mb-5 mb-xl-10">
              <!--begin::Card header-->
              <div
                class="card-header border-0 cursor-pointer"
                role="button"
                data-bs-toggle="collapse"
                data-bs-target="#kt_account_profile_details"
                aria-expanded="true"
                aria-controls="kt_account_profile_details"
              >
                <!--begin::Card title-->
                <div class="card-title m-0">
                  <h3 class="fw-bold m-0">Registar Pessoal</h3>
                </div>
                <!--end::Card title-->
              </div>
              <!--begin::Card header-->

              <!--begin::Content-->
              <div
                id="kt_account_settings_profile_details"
                class="collapse show"
              >
                <!--begin::Form-->
                <form id="kt_account_profile_details_form" class="form" @submit.prevent="registerOrUpdate">
                  <!--begin::Card body-->
                  <div class="card-body border-top p-9">
                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label class="col-lg-4 col-form-label fw-semibold fs-6"
                        >Imagem</label
                      >
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8">
                        <!--begin::Image input-->
                        <div
                          class="image-input image-input-outline image-input-empty"
                          data-kt-image-input="true"
                          style="
                            background-image: url('src/dist-assets/assets/media/svg/avatars/blank.svg');
                          "
                        >
                          <!--begin::Preview existing avatar-->
                          <div
                            class="image-input-wrapper w-125px h-125px"
                            style="
                              background-image: none;
                            "
                          ></div>
                          <!--end::Preview existing avatar-->

                          <!--begin::Label-->
                          <label
                            class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="change"
                            data-bs-toggle="tooltip"
                            title="Change avatar"
                          >
                            <i class="ki-duotone ki-pencil fs-7"
                              ><span class="path1"></span
                              ><span class="path2"></span
                            ></i>
                            <!--begin::Inputs-->
                            <input
                              type="file"
                              name="avatar"
                              accept=".png, .jpg, .jpeg"
                            />
                            <input type="hidden" name="avatar_remove" />
                            <!--end::Inputs-->
                          </label>
                          <!--end::Label-->

                          <!--begin::Cancel-->
                          <span
                            class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="cancel"
                            data-bs-toggle="tooltip"
                            title="Cancel avatar"
                          >
                            <i class="ki-duotone ki-cross fs-2"
                              ><span class="path1"></span
                              ><span class="path2"></span
                            ></i>
                          </span>
                          <!--end::Cancel-->

                          <!--begin::Remove-->
                          <span
                            class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="remove"
                            data-bs-toggle="tooltip"
                            title="Remove avatar"
                          >
                            <i class="ki-duotone ki-cross fs-2"
                              ><span class="path1"></span
                              ><span class="path2"></span
                            ></i>
                          </span>
                          <!--end::Remove-->
                        </div>
                        <!--end::Image input-->

                        <!--begin::Hint-->
                        <div class="form-text">
                          Tipos de imagens permetidas: png, jpg, jpeg.
                        </div>
                        <!--end::Hint-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label
                        class="col-lg-4 col-form-label required fw-semibold fs-6"
                        >Nome completo</label
                      >
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8">
                        <!--begin::Row-->
                        <div class="row">
                          <!--begin::Col-->
                          <div class="col-lg-6 fv-row">
                            <input
                              type="text"
                              class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              placeholder="Nome proprio"
                              name="name"
                              :value="this.name"
                              @input="$emit('update:name', $event.target.value)"
                            />
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
                          <div class="col-lg-6 fv-row">
                            <input
                              type="text"
                              name="lname"
                              class="form-control form-control-lg form-control-solid"
                              placeholder="Apelido"
                              :value="this.surname"
                              @input="$emit('update:surname', $event.target.value)"
                            />
                          </div>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label class="col-lg-4 col-form-label fw-semibold fs-6">
                        <span class="required">Telefone</span>

                        <span
                          class="ms-1"
                          data-bs-toggle="tooltip"
                          title="Phone number must be active"
                        >
                          <i
                            class="ki-duotone ki-information-5 text-gray-500 fs-6"
                            ><span class="path1"></span
                            ><span class="path2"></span
                            ><span class="path3"></span></i
                        ></span>
                      </label>
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8">
                        <!--begin::Row-->
                        <div class="row">
                          <!--begin::Col-->
                          <div class="col-lg-6 fv-row">
                            <input
                              type="tel"
                              name="phone"
                              class="form-control form-control-lg form-control-solid"
                              placeholder="Principal"
                              :value="this.first_phone_number"
                              @input="$emit('update:first_phone_number', $event.target.value)"
                            />
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
                          <div class="col-lg-6 fv-row">
                            <input
                              type="tel"
                              name="phone"
                              class="form-control form-control-lg form-control-solid"
                              placeholder="Alternativo"
                              :value="this.second_phone_number"
                              @input="$emit('update:second_phone_number', $event.target.value)"
                            />
                          </div>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label class="col-lg-4 col-form-label fw-semibold fs-6">
                        <span class="required">Proviniencia</span>

                        <span
                          class="ms-1"
                          data-bs-toggle="tooltip"
                          title="Country of origination"
                        >
                          <i
                            class="ki-duotone ki-information-5 text-gray-500 fs-6"
                            ><span class="path1"></span
                            ><span class="path2"></span
                            ><span class="path3"></span></i
                        ></span>
                      </label>
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8 fv-row">
                        <!--begin::Select-->
                        <select
                          id="location_id"
                          name="currnecy"
                          aria-label="Select a Timezone"
                          data-control="select2"
                          data-placeholder="---Selecione aqui---"
                          class="form-select form-select-solid"
                          :value="this.provenance"
                          @input="$emit('update:provenance', $event.target.value)"
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
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                                        <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label class="col-lg-4 col-form-label fw-semibold fs-6">
                        <span class="required">Outras</span>

                        <span
                          class="ms-1"
                          data-bs-toggle="tooltip"
                          title="Phone number must be active"
                        >
                          <i
                            class="ki-duotone ki-information-5 text-gray-500 fs-6"
                            ><span class="path1"></span
                            ><span class="path2"></span
                            ><span class="path3"></span></i
                        ></span>
                      </label>
                      <!--end::Label-->
                          <!--begin::Col-->
                          <div class="col-lg-8 fv-row">
                            <input
                              type="tel"
                              name="phone"
                              class="form-control form-control-lg form-control-solid"
                              placeholder="Informe a tua proviniencia"
                              :value="this.other_provenance"
                              @input="$emit('update:other_provenance', $event.target.value)"
                            />
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label
                        class="col-lg-4 col-form-label required fw-semibold fs-6"
                        >Dados bancarios</label
                      >
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8 fv-row">
                        <div class="row">
                          <div class="col-lg-6 fv-row">
                            <!--begin::Input-->
                            <select
                              name="language"
                              aria-label="Select a Language"
                              data-control="select2"
                              data-placeholder="--Selecione aque--"
                              class="form-select form-select-solid form-select-lg"
                              :value="this.bank"
                              @input="$emit('update:bank', $event.target.value)"
                            >
                              <option value="">Selecione o banco...</option>
                              <option value="1">Selecione a categoria...</option>
                              <option value="2">Selecione a categoria...</option>
                              <option value="3">Selecione a categoria...</option>
                              <option value="4">Selecione a categoria...</option>
                              <option value="5">Selecione a categoria...</option>
                            </select>
                            <!--end::Input-->
                          </div>
                          <div class="col-lg-6 fv-row">
                            <input
                              type="tel"
                              name="phone"
                              class="form-control form-control-lg form-control-solid"
                              placeholder="Número da conta"
                              :value="this.bank_account"
                              @input="$emit('update:bank_account', $event.target.value)"
                            />
                          </div>
                        </div>

                        <!--begin::Hint-->
                        <!-- <div class="form-text">
                          Please select a preferred language, including date,
                          time, and number formatting.
                        </div> -->
                        <!--end::Hint-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-6">
                      <!--begin::Label-->
                      <label
                        class="col-lg-4 col-form-label required fw-semibold fs-6"
                        >Categoria</label
                      >
                      <!--end::Label-->

                      <!--begin::Col-->
                      <div class="col-lg-8 fv-row">
                        <select
                          name="timezone"
                          aria-label="Select a Timezone"
                          data-control="select2"
                          data-placeholder="--Selecione aque--"
                          class="form-select form-select-solid form-select-lg"
                          :value="this.employee_type"
                          @input="$emit('update:employee_type', $event.target.value)"
                        >
                            <option
                            v-for="(type, index) in this.$props.typeEmployee"
                            :key="index"
                            :value="type.id"
                          >
                            {{ type.description }}
                          </option>
                          
                        </select>
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->


                  </div>
                  <!--end::Card body-->

                  <!--begin::Actions-->
                  <div class="card-footer d-flex justify-content-end py-6 px-9">
                    <button
                      type="reset"
                      class="btn btn-light btn-active-light-primary me-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      id="kt_account_profile_details_submit"
                    >
                      Registar
                    </button>
                  </div>
                  <!--end::Actions-->
                </form>
                <!--end::Form-->
              </div>
              <!--end::Content-->
            </div>
            <!--end::Basic info-->
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
    surname: {
      type: String,
    },
    first_phone_number: {
      type: String,
    },
    second_phone_number: {
      type: String,
    },
    provenance: {
      type: String,
    },

    other_provenance: {
      type: String,
    },

    bank: {
      type: String,
    },

    bank_account: {
      type: String,
    },

    employee_type: {
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

    locations: {
      type: Array,
    },

    typeEmployee: {
      type: Array,
    },
    banks: {
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
    },
  },
  computed: {
    errorMessageLocation() {
      if (this.$props.errors.exam_location_id)
        return this.$props.errors.exam_location_id[0];
      return "";
    },
    errorMessageBloco() {
      if (this.$props.errors.bloco) return this.$props.errors.bloco[0];
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
