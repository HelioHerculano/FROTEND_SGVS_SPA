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

      <!-- Filtros -->
      <Filters
        @getData="getData"
        v-model:roleFilter="this.roleFilter"
        :isRoleView="true"
      />

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.roles"
        :dataFetched="this.dataFetched"
        tableTitle="Listagem de cargos"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        :isRoleView="true"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <ModalRoles
        @register="registerRole"
        @update="updateRole"
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
        :data="this.roles"
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
import ModalRoles from "../components/Modals/ModalRoles/ModalRoles.vue";
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
    ModalRoles,
    Bootstrap5Pagination,
    PrimaryButton,
    Filters,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      cargo: "",
      indicator: "",
      roleFilter: "",
      rules: ref([]),
      role: ref([]),
      dataFetched: false,
      errors: ref([]),
      roles: ref([]),
      isInvalidRule: false,
      isValidRule: false,
      appState: AppState(),
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
        description: this.cargo,
      };

      console.log(data);

      const res = await Api.post("/role", data);

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
    async updateRole() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      let data = {
        description: this.cargo,
      };

      console.log(data);
      const res = await Api.put(`/role/${this.role.data.id}`, data);

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
      // alert(statusFilter);

      if (typeof statusFilter == "undefined") {
        this.statusFilter = 1;
      } else {
        this.statusFilter = statusFilter;
      }

      const res = await Api.get(
        `/role?page=${page}&description=${this.roleFilter}&status=${this.statusFilter}`
      );

      this.roles = await res;

      console.log(this.roles);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getOneRole(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/role/${id}`);

      this.role = await res;
      console.log(this.role);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.cargo = res.data.description;
    },

    async remove(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar o cargo?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.delete(`/role/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Cargo eliminado com sucesso", "success");
        this.getData();
      }
    },

    async active(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar o cargo?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.active(`/role/${id}/active`);
          console.log(res);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Horário activado com sucesso", "success");
        this.getData();
      }
    },

    enableUpdate(id) {
      // alert(id)
      this.getOneRole(id);

      this.title = "Actualizar Horário";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.errors = [];
      // this.description = null;
    },

    enableStore() {
      this.title = "Registar Horário";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.cargo = null;
      this.isInvalidEndRule = false;
      this.isValidEndRule = false;
    },
  },

  computed: {
    dataLength() {
      if (this.roles.data == undefined) {
        return 0;
      }
      return this.roles.data.length;
    },
  },

  created() {
    this.getData();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    Utilits.initTime();
    this.appState.setisLogin(false);
    // Utilits.initDate()
  },
};
</script>
