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
          Gestão de Usuários
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
        v-model:nameFilter="this.nameFilter"
        :accessLevels="this.AccessLevelCombo.value"
        :isUserView="true"
      />
      <!--Fim Filtros -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.users"
        :dataFetched="this.dataFetched"
        tableTitle="Listagem de Usuários"
        @enableUpdate="enableUpdate"
        @enableUpdatePass="enableUpdatePass"
        @remove="remove"
        @active="active"
        :isUserView="true"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <ModalUser
        @register="registerUser"
        @update="updateUser"
        @updatePassword="updatePassword"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :isUpdatePass="this.isUpdatePass"
        :indicatorProps="this.indicator"
        v-model:name="this.name"
        v-model:username="this.username"
        v-model:password="this.password"
        v-model:c_password="this.c_password"
        :errors="this.errors"
        placeholderOne="Informe o nome..."
        placeholderTwo="Informe o nome do usuário..."
        placeholderThree="Informe a senha..."
        placeholderFour="Informe a mesma senha..."
        :isExamRoomView="true"
        :accessLevels="this.AccessLevelCombo.value"
      />

      <Bootstrap5Pagination
        :data="this.users"
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
import ModalUser from "../components/Modals/User/ModalFormUser.vue";
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
    ModalUser,
    Bootstrap5Pagination,
    PrimaryButton,
    Filters,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      isUpdatePass: false,
      name: "",
      username: "",
      password: "",
      c_password: "",
      accessLevel: "",
      access_level_id: "",
      cargo: "",
      indicator: "",
      nameFilter: "",
      accessLevelFilter: "",
      rules: ref([]),
      rule: ref([]),
      dataFetched: false,
      users: ref([]),
      user: "",
      AccessLevelCombo: ref([]),
      errors: ref([]),
      employeesType: ref([]),
      isInvalidRule: false,
      isValidRule: false,
      appState: AppState(),
      columns: [
        { name: "Nome", key: "name" },
        { name: "Nome do usuário", key: "username" },
        { name: "Nivel de acesso", key: "access_level" },
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

    async getAllAccessLevel() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/accesslevel/all`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.AccessLevelCombo.value = await res.data;
    },

    async registerUser() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      this.accessLevel =
        $("#accessLevel_id").val() == null ? "" : $("#accessLevel_id").val();

      let data = {
        name: this.name,
        username: this.username,
        password: this.password,
        c_password: this.c_password,
        access_level_id: this.accessLevel,
      };

      console.log(data);

      const res = await Api.post("/user", data);

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

    async updatePassword() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      let data = {
        password: this.password,
        c_password: this.c_password,
      };

      console.log(data);
      const res = await Api.put(
        `/user/${this.user.data.id}/updatePassword`,
        data
      );

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

    async updateUser() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_new_data_submit")
        .setAttribute("disabled", "true");

      this.access_level_id =
        $("#accessLevel_id").val() == null ? "" : $("#accessLevel_id").val();

      let data = {
        name: this.name,
        username: this.username,
        access_level_id: this.access_level_id,
      };

      console.log(data);
      const res = await Api.put(`/user/${this.user.data.id}`, data);

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

    async getData(page = 1, statusFilter) {
      Utilits.showLoader();

      if (typeof statusFilter == "undefined") {
        this.statusFilter = 1;
      } else {
        this.statusFilter = statusFilter;
      }

      this.accessLevelFilter =
        $("#accessLevelFilter").val() == null
          ? ""
          : $("#accessLevelFilter").val();

      // alert(this.accessLevelFilter)

      const res = await Api.get(
        `/user?page=${page}&status=${this.statusFilter}&name=${this.nameFilter}&access_level_id=${this.accessLevelFilter}`
      );

      this.users = await res;

      console.log(this.users);

      this.users.data.forEach(function (item) {
        item.access_level = item.access_level.level;
      });

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getOneUser(id) {
      Utilits.showLoader();
      const res = await Api.getOne(`/user/${id}`);

      this.user = await res;
      console.log(this.user);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.name = res.data.name;
      this.username = res.data.username;
      $("#accessLevel_id").val(`${res.data.access_level_id}`).trigger("change");
    },

    async remove(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar o usuário?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.delete(`/user/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Usuário eliminado com sucesso", "success");
        this.getData();
      }
    },

    async active(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar o usuário?",
        showCancelButton: true,
        confirmButtonText: "Sim, pretendo!",
        cancelButtonText: "Não, cancelar!",
        confirmButtonClass: "btn btn-sm fw-bold btn-primary mr-5",
        cancelButtonClass: "btn btn-sm fw-bold btn-danger",
        buttonsStyling: false,
      }).then(async function (result) {
        console.log(result.dismiss);
        if (result.dismiss == undefined) {
          res = await Api.active(`/user/${id}/active`);
          console.log(res);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "usuário activada com sucesso",
          "success"
        );
        this.getData();
      }
    },

    enableUpdate(id) {
      // alert(id)
      this.getAllAccessLevel();
      this.getOneUser(id);

      this.title = "Actualizar usuário";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.isUpdatePass = false;
      this.errors = [];
      this.description = null;
    },

    enableUpdatePass(id) {
      // alert(id);
      this.getOneUser(id);

      this.title = "Actualizar senha";
      this.btnText = "Actualizar";
      this.isUpdatePass = true;
      this.isUpdate = false;
      this.errors = [];
      this.description = null;
    },

    enableStore() {
      this.getAllAccessLevel();
      this.title = "Registar usuário";
      this.btnText = "Registar";
      this.isUpdatePass = false;
      this.isUpdate = false;
      this.errors = [];
      this.name = null;
      this.username = null;
      this.password = null;
      this.c_password = null;
      $("#accessLevel_id").val("").trigger("change");
    },
  },

  computed: {
    dataLength() {
      if (this.users.data == undefined) {
        return 0;
      }
      return this.users.data.length;
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
    this.getAllAccessLevel();
    // Utilits.initDate()
  },
};
</script>
