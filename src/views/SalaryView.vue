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
          Gestão de Remuneração
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

      <!-- Filtros -->
      <Filters
        @getData="getData"
        v-model:yearFilter="this.yearFilter"
        :employeeTypes="this.employeeTypeCombo.value"
        :isSalaryView="true"
      />
      <!--Fim Filtros -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.employeeType"
        :dataFetched="this.dataFetched"
        tableTitle="Listagem de remunerações"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        :isBankView="true"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <ModalSalary
        @register="registerSalary"
        @update="updateSalary"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        v-model:value="this.value"
        :errors="this.errors"
        placeholderOne="Valor Remunerado..."
        :isExamRoomView="true"
        :employeesType="this.employeeTypeCombo.value"
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
import Filters from "../components/FiltersComponent.vue";
import DataTable from "../components/DataTables/DataTable.vue";
import ModalSalary from "../components/Modals/Salary/ModalFormSalary.vue";
import PrimaryButton from "../components/shared/primaryButton.vue";
import Api from "../ApiRest.js";
import Utilits from "../Utilits.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";
import Select2 from "../dist-assets/assets/js/select2.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ref } from "vue";
import { AppState } from "@/stores/AppState";

export default {
  components: {
    DataTable,
    ModalSalary,
    Bootstrap5Pagination,
    PrimaryButton,
    Filters,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      value: "",
      type_employee_id: "",
      cargo: "",
      indicator: "",
      yearFilter: "",
      employeeTypeFilter: "",
      rules: ref([]),
      rule: ref([]),
      dataFetched: false,
      employeeType: ref([]),
      employeeTypeCombo: ref([]),
      errors: ref([]),
      employeesType: ref([]),
      isInvalidRule: false,
      isValidRule: false,
      appState: AppState(),
      columns: [
        { name: "Remuneração", key: "value" },
        { name: "Função", key: "employeeType" },
        { name: "Ano", key: "year" },
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

    async getAllEmployeesType() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/typeEmployee/allData`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.employeeTypeCombo.value = await res.data;
    },

    async registerSalary() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      this.type_employee_id =
        $("#employeeType_id").val() == null ? "" : $("#employeeType_id").val();

      let data = {
        value: this.value,
        type_employee_id: this.type_employee_id,
      };

      console.log(data);

      const res = await Api.post("/salary", data);

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
    async updateSalary() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      this.type_employee_id =
        $("#employeeType_id").val() == null ? "" : $("#employeeType_id").val();

      let data = {
        value: this.value,
        type_employee_id: this.type_employee_id,
      };

      console.log(data);
      const res = await Api.put(`/salary/${this.salary.data.id}`, data);

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

      if (typeof statusFilter == "undefined") {
        this.statusFilter = 1;
      } else {
        this.statusFilter = statusFilter;
      }

      this.employeeTypeFilter =
        $("#employeeTypeFilter").val() == null
          ? ""
          : $("#employeeTypeFilter").val();

      // alert(this.employeeTypeFilter)

      const res = await Api.get(
        `/salary?page=${page}&status=${this.statusFilter}&year=${this.yearFilter}&type_employee_id=${this.employeeTypeFilter}`
      );

      this.employeeType = await res;

      this.employeeType.data.forEach(function (item) {
        item.employeeType = item.type_employee.description;
      });

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getOneSalary(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/salary/${id}`);

      this.salary = await res;
      console.log(this.salary);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.value = res.data.value;
      this.type_employee_id = res.data.type_employee_id;
      $("#employeeType_id")
        .val(`${res.data.type_employee_id}`)
        .trigger("change");
    },

    async remove(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar o Remuneração?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.delete(`/salary/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Remuneração eliminada com sucesso",
          "success"
        );
        this.getData();
      }
    },

    async active(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar o Remuneração?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.active(`/salary/${id}/active`);
          console.log(res);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Remuneração activada com sucesso",
          "success"
        );
        this.getData();
      }
    },

    enableUpdate(id) {
      // alert(id)
      this.getAllEmployeesType();
      this.getOneSalary(id);

      this.title = "Actualizar Remuneração";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.errors = [];
      this.description = null;
    },

    enableStore() {
      this.getAllEmployeesType();
      this.title = "Registar remuneração";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.value = null;
      $("#employeeType_id").val("").trigger("change");
    },
  },

  computed: {
    dataLength() {
      if (this.employeeType.data == undefined) {
        return 0;
      }
      return this.employeeType.data.length;
    },
  },

  created() {
    // Obter o ano atual
    const dataAtual = new Date();
    this.yearFilter = dataAtual.getFullYear();

    this.getData();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    Utilits.initTime();
    this.appState.setisLogin(false);
    this.getAllEmployeesType();
    // Utilits.initDate()
  },
};
</script>
