<template>
  <!-- <div class="spinner spinner-danger"></div> -->

  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container container-xxl d-flex flex-stack"
    >
      <!--begin::Page title-->
      <div
        class="page-title d-flex flex-column justify-content-center flex-wrap me-3"
      >
        <!--begin::Title-->
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
        >
          Locais de exames
        </h1>
        <!--end::Title-->

        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <span class="text-muted text-hover-primary">
              Todas operações devem ser feitas com cuidado
            </span>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <!-- <li class="breadcrumb-item">
                        <span class="bullet bg-gray-400 w-5px h-2px"></span>
                    </li> -->
          <!--end::Item-->

          <!--begin::Item-->
          <!-- <li class="breadcrumb-item text-muted">
                                                    Widgets                                            </li> -->
          <!--end::Item-->
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->
      <!--begin::Actions-->
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <!--begin::Secondary button-->
        <!--end::Secondary button-->

        <!--begin::Primary button-->
        <a
          href="#"
          class="btn btn-sm fw-bold btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_bank"
          v-on:click="enableStore"
        >
          Registar
        </a>
        <!--end::Primary button-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->

  <!--begin::Content-->
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <!--begin::Content container-->
    <div id="kt_app_content_container" class="app-container container-xxl">
      <!--begin::Row-->

      <!--begin::Row-->
      <div class="row g-5 g-xl-8">
        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="row g-5 g-xl-8">
        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="row g-5 g-xl-8">
        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6"></div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <form @submit.prevent="getBanks">
        <!--begin::Tables Widget 13-->
        <div class="card mb-5 mb-xl-8">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold fs-3 mb-1">Filtros</span>
            </h3>
          </div>

          <!--begin::Body-->
          <div class="card-body py-3">
            <div class="row">
              <div class="col-4">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-8 fv-row">
                  <label class="form-label fw-bold fs-6 text-gray-700"
                    >Nome</label
                  >

                  <input
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Nome do banco..."
                    name="description"
                    v-model="this.descriptionFilter"
                  />
                </div>
                <!--end::Input group-->
              </div>

              <div class="col-4">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-8 fv-row">
                  <label class="form-label fw-bold fs-6 text-gray-700"
                    >Sigla</label
                  >

                  <input
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Sigla do banco..."
                    name="description"
                    v-model="this.abbreviationFilter"
                  />
                </div>
                <!--end::Input group-->
              </div>

              <div class="col-4">
                <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fw-bold fs-6 text-gray-700"
                    >Estado</label
                  >
                  <!--end::Label-->

                  <!--begin::Select-->
                  <select
                    id="statusFilter"
                    v-model="this.statusFilter"
                    name="currnecy"
                    aria-label="Select a Timezone"
                    data-control="select2"
                    data-placeholder="---Selecione aqui---"
                    class="form-select form-select-solid"
                  >
                    <!-- <option value=""></option> -->

                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                  <!--end::Select-->
                </div>
                <!--end::Input group-->
              </div>
            </div>

            <div class="col-md-12 mb-5" style="text-align: right">
              <button type="submit" class="btn btn-sm fw-bold btn-dark">
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      </form>

      <DataTable
        :dataLenght="this.dataLength"
        :banks="this.banks"
        :dataFetched="this.dataFetched"
        :isLocationExam="true"
        tableTitle="Lista de locais"
        @enableUpdate="enableUpdate"
        @deleteBank="deleteBank"
        @activeBank="activeBank"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <UploadLocationModal @imporExcelData="imporExcelData" />

      <Bootstrap5Pagination
        :data="this.banks"
        @pagination-change-page="getBanks"
        limit="2"
        show-disabled
      >
        <span slot="prev-nav">&lt; Previous</span>
        <span slot="next-nav"> Next &gt;</span>
      </Bootstrap5Pagination>
    </div>
    <!--end::Content container-->
  </div>
  <!--end::Content-->
</template>

<!-- ../ApiRest.js -->

<script>
import DataTable from "../components/DataTables/Banks/DataTable.vue";
import UploadLocationModal from "../components/Modals/LocationExam/UploadLocationModal.vue";
import Api from "../ApiRest.js";
import Utilits from "../Utilits.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";
import Select2 from "../dist-assets/assets/js/select2.js";
import FileDropZone from "../dist-assets/assets/js/fileDropZone.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ref } from "vue";

export default {
  components: {
    DataTable,
    UploadLocationModal,
    Bootstrap5Pagination,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      description: "",
      abbreviation: "",
      descriptionFilter: "",
      abbreviationFilter: "",
      statusFilter: "",
      indicator: "",
      banks: ref([]),
      bank: ref([]),
      dataFetched: false,
      errors: ref([]),
    };
  },

  methods: {
    //   changeTextModal(title='',btnText=''){
    //     this.title = title
    //     this.btnText = btnText
    //   },

    async registerBank() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_bank_submit")
        .setAttribute("disabled", "true");

      let data = {
        description: this.description,
        abbreviation: this.abbreviation,
      };

      console.log(data);

      const res = await Api.post("/bank", data);

      if (res.code == 422) {
        this.errors = res.message;
        console.log(this.errors);
        this.indicator = "";
        SweetAlert.Alert("Erro", "Preecha os campos obrigatorios", "error", "");
        document
          .getElementById("kt_modal_new_bank_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Banco registado com sucesso",
          "success",
          "#kt_modal_new_bank",
          "kt_modal_new_bank_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_new_bank_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.description = "";
        this.errors = [];
        this.getBanks();
      }
    },
    async updateBank() {
      // console.log(this.bank.data.id)
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_bank_submit")
        .setAttribute("disabled", "true");

      let data = {
        description: this.description,
        abbreviation: this.abbreviation,
      };

      console.log(data);
      const res = await Api.put(`/bank/${this.bank.data.id}`, data);

      console.log(res);
      if (res.code == 422) {
        // this.errors = res.message;
        console.log(res.message);

        console.log(typeof res.message);

        if (typeof res.message === "string") {
          this.indicator = "";
          SweetAlert.Alert("Erro", `${res.message}`, "warning", "", true);
        } else {
          this.errors = res.message;
          this.indicator = "";
          SweetAlert.Alert(
            "Erro",
            "Preecha os campos obrigatorios",
            "error",
            ""
          );
          document
            .getElementById("kt_modal_new_bank_submit")
            .removeAttribute("disabled");
        }

        document
          .getElementById("kt_modal_new_bank_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Banco actualizado com sucesso",
          "success",
          "#kt_modal_new_bank",
          "kt_modal_new_bank_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_new_bank_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.description = "";
        this.errors = [];
        this.getBanks();
      }
    },

    async getBanks(page = 1) {
      this.statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();

      // alert(this.statusFilter)

      Utilits.showLoader();
      const res = await Api.get(
        `/bank?page=${page}&description=${this.descriptionFilter}&abbreviation=${this.abbreviationFilter}&status=${this.statusFilter}`
      );

      this.banks = await res;

      this.dataFetched = true;

      console.log(this.banks.data.length);

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    // async getBanks(page = 1){
    //         Utilits.showLoader()
    //         const res = await Api.get(`/bank?page=${page}`);

    //         this.banks = await res

    //         this.dataFetched = true

    //         console.log(this.banks.data.length)

    //         if(this.dataFetched){
    //             Utilits.hideLoader()
    //         }
    // },

    async getOneBank(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/bank/${id}`);

      this.bank = await res;
      console.log(this.bank);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.description = res.data.description;
      this.abbreviation = res.data.abbreviation;
    },

    async deleteBank(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar o banco?",
        showCancelButton: true,
        // confirmButtonColor: '#0CC27E',
        // cancelButtonColor: '#FF586B',
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.delete(`/bank/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Banco eliminado com sucesso", "success");
        this.getBanks();
      }
    },

    async activeBank(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar o banco?",
        showCancelButton: true,
        // confirmButtonColor: '#0CC27E',
        // cancelButtonColor: '#FF586B',
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.active(`/bank/${id}/active`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Banco eliminado com sucesso", "success");
        this.getBanks();
      }
    },

    enableUpdate(id) {
      // alert(id)
      this.getOneBank(id);

      this.title = "Actualizar Banco";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.errors = [];
      this.description = null;
      this.abbreviation = null;
    },

    enableStore() {
      this.title = "Registar Banco";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.description = null;
      this.abbreviation = null;
    },

    async imporExcelData(data) {
      console.log(data);
      const res = await Api.post("/examLocation/import", FileDropZone.file());
      console.log(FileDropZone.file());
    },
  },

  computed: {
    dataLength() {
      if (this.banks.data == undefined) {
        return 0;
      }
      return this.banks.data.length;
    },
  },

  created() {
    this.getBanks();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
  },
};
</script>
