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
          Gestão de cargos
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
        <PrimaryButton
          v-on:click="enableStore"
          textButton="Registar"
          datatarget="kt_modal_new_data"
        ></PrimaryButton>
        <!-- <a
          href="#"
          class="btn btn-flex btn-sm fw-bold btn-light-primary btn-border"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_data"
          v-on:click="enableStore"
        >
          <i class="ki-duotone ki-archive-tick fs-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          Registar
        </a> -->
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


      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.employeeType"
        :dataFetched="this.dataFetched"
        tableTitle="Listagem de cargos"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        :isBankView="true"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <ModalEmployeeType
        @register="registerRole"
        @update="updateTimeTable"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        :isInvalidRule="this.isInvalidRule"
        :isValidRule="this.isValidRule"
        v-model:cargo="this.cargo"
        :errors="this.errors"
        placeholderOne="Informe o cargo..."
        :isBankView="true"
      />

      <Bootstrap5Pagination
        :data="this.employeeType"
        @pagination-change-page="getData"
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
import DataTable from "../components/DataTables/DataTable.vue";
import ModalEmployeeType from "../components/Modals/EmployeeType/ModalEmployeeType.vue";
import PrimaryButton from "../components/shared/primaryButton.vue";
import Api from "../ApiRest.js";
import Utilits from "../Utilits.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";
import Select2 from "../dist-assets/assets/js/select2.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ref } from "vue";

export default {
  components: {
    DataTable,
    ModalEmployeeType,
    Bootstrap5Pagination,
    PrimaryButton,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      cargo: "",
      indicator: "",
      rules: ref([]),
      rule: ref([]),
      dataFetched: false,
      errors: ref([]),
      employeeType:ref([]),
      isInvalidRule: false,
      isValidRule: false,
      columns: [
        { name: "Descrição", key: "description" },
        { name: "Estado", key: "status" },
      ],
    };
  },

  methods: {
    //   changeTextModal(title='',btnText=''){
    //     this.title = title
    //     this.btnText = btnText
    //   },

    validateInput(errors) {
      if (errors.description)
        this.isInvalidRule = errors.description.length > 0 ? true : false;
      else {
        this.isInvalidRule = false;
        this.isValidRule = true;
      }
    },

    async registerRole() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      let data = {
        description: this.cargo
      }

      console.log(data)

      const res = await Api.post("/typeEmployee", data);

      if (res.code == 422) {
        this.errors = res.message;
        console.log(this.errors);
        this.validateInput(this.errors);
        this.indicator = "";
        SweetAlert.Alert("Erro", "Preecha os campos obrigatorios", "error", "");
        document
          .getElementById("kt_modal_new_data_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          `${res.message}`,
          "success",
          "#kt_modal_new_data",
          "kt_modal_new_data"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_new_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        
        this.description = "";
        this.errors = [];
        this.getData();
      }
    },
    async updateTimeTable() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      let data = {
        date: this.date,
        start_time: this.start_time,
        end_time: this.end_time,
      };

      console.log(data);
      const res = await Api.put(`/timetable/${this.timetable.data.id}`, data);

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
            .getElementById("kt_modal_new_data_submit")
            .removeAttribute("disabled");
        }

        document
          .getElementById("kt_modal_new_data_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Banco actualizado com sucesso",
          "success",
          "#kt_modal_new_data",
          "kt_modal_new_data"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_new_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        
        this.description = "";
        this.errors = [];
        this.getData();
      }
    },

    async getData(page = 1, statusFilter) {

      Utilits.showLoader();
      const res = await Api.get(
        `/typeEmployee?page=${page}`
      );

      this.employeeType = await res;

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getOneTimeTable(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/timetable/${id}`);

      this.timetable = await res;
      console.log(this.bank);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.date = res.data.date;
      this.start_time = res.data.start_time;
      this.end_time = res.data.end_time;
    },

    async remove(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar o horário?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.delete(`/timetable/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Horário eliminado com sucesso", "success");
        this.getData();
      }
    },

    async active(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar o horário?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.active(`/timetable/${id}/active`);
          console.log(res)
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Horário activado com sucesso", "success");
        this.getData();
      }
    },

    enableUpdate(id) {
      // alert(id)
      this.getOneTimeTable(id);

      this.title = "Actualizar Horário";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.errors = [];
      this.description = null;
      ;
    },

    enableStore() {
      this.title = "Registar Horário";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.date = null;
      this.start_time = null;
      this.end_time = null;
      this.isInvalidDate = false;
      this.isInvalidStartTime = false;
      this.isInvalidEndTime = false;
      this.isValidDate = false;
      this.isValidStartTime = false;
      this.isValidEndTime = false;
    },
  },

  computed: {
    // dataLength() {
    //   if (this.employeeType.data == undefined) {
    //     return 0;
    //   }
    //   return this.employeeType.data.length;
    // },
  },

  created() {
    this.getData();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    Utilits.initTime();
    // Utilits.initDate()
  },
};
</script>
