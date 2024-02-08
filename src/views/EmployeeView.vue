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
          Gestão do pessoal
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
          datatarget="kt_modal_employee"
        ></PrimaryButton>

        <!-- <a
          href="#"
          class="btn btn-sm fw-bold btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_location"
          v-on:click="enableStore"
        >
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
        @getData="getEmployee"
        v-model:nameFilter="this.nameFilter"
        v-model:nuitFilter="this.nuitFilter"
        :isEmployeeView="true"
        :locations="this.comboBoxLocations.value"
      />
      <!-- End-FIlters -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.employees"
        :dataFetched="this.dataFetched"
        buttonText="Upload Do Pessoal"
        tableTitle="Listagem do pessoal"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        :isEmployeeView="true"
      />

      <ModalEmployee
        @register="registerEmployee"
        @update="updateEmployee"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        v-model:name="this.name"
        v-model:surname="this.surname"
        v-model:first_phone_number="this.first_phone_number"
        v-model:second_phone_number="this.second_phone_number"
        v-model:other_provenance="this.other_provenance"
        v-model:nuit="this.nuit"
        v-model:bank_account="this.bank_account"
        :errors="this.errors"
        placeholderOne="Bloco da sala..."
        placeholderTwo="Número da sala..."
        placeholderThree="Capacidade da sala..."
        :isExamRoomView="true"
        :locations="this.comboBoxLocations.value"
        :typeEmployee="this.comboBoxType.value"
        :banks="this.comboBoxBank.value"
        :isValidName="this.isValidName"
        :isInvalidName="this.isInvalidName"
        :isValidSurname="this.isValidSurname"
        :isInvalidSurname="this.isInvalidSurname"
        :isValidPhoneNumber="this.isValidPhoneNumber"
        :isInvalidPhoneNumber="this.isInvalidPhoneNumber"
        :isValidProvenance="this.isValidProvenance"
        :isInvalidProvenance="this.isInvalidProvenance"
        :isValidNuit="this.isValidNuit"
        :isInvalidNuit="this.isInvalidNuit"
        :isValidBankAccount="this.isValidBankAccount"
        :isInvalidBankAccount="this.isInvalidBankAccount"
      />

      <div v-if="this.dataLength == 0" class="alert alert-info" role="alert">
        <strong class="text-capitalize">Alerta!</strong>
        Nenhum registo encontrado.
      </div>

      <UploadLocationModal
        @imporExcelData="imporExcelData"
        title="Upload de salas"
        :indicatorProps="this.indicator"
      />

      <Bootstrap5Pagination
        :data="this.employees"
        @pagination-change-page="getEmployee"
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
import UploadLocationModal from "../components/Modals/UploadModal.vue";
import ModalEmployee from "../components/Modals/Employee/ModalEmployee.vue";
import PrimaryButton from "../components/shared/primaryButton.vue";
// import ModalLocationsRoom from "../components/Modals/RoomExam/ModalFormRoom.vue";
import Filters from "../components/FiltersComponent.vue";
import Api from "../ApiRest.js";
import Utilits from "../Utilits.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";
import Select2 from "../dist-assets/assets/js/select2.js";
import FileDropZone from "../dist-assets/assets/js/fileDropZone.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ref } from "vue";
import { AppState } from '@/stores/AppState';


export default {
  components: {
    DataTable,
    UploadLocationModal,
    Filters,
    Bootstrap5Pagination,
    ModalEmployee,
    // ModalLocationsRoom,
    PrimaryButton,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      provenance_id: "",
      bank_name_id: "",
      categoria_id: "",
      name:"",
      surname:"",
      nuit:"",
      bank_account:"",
      phone_number:"",
      first_phone_number:"",
      second_phone_number:"",
      other_provenance:"",
      indicator: "",
      comboBoxLocations: ref([]),
      comboBoxType: ref([]),
      comboBoxBank: ref([]),
      employees: ref([]),
      location: ref([]),
      examRoom: null,
      dataFetched: false,
      isValidName: false,
      isInvalidName: false,
      isValidSurname: false,
      isInvalidSurname: false,
      isValidPhoneNumber: false,
      isInvalidPhoneNumber: false,
      isValidProvenance: false,
      isInvalidProvenance: false,
      isValidNuit: false,
      isInvalidNuit: false,
      isValidBankAccount: false,
      isInvalidBankAccount: false,
      statusFilter:"",
      nuitFilter:"",
      nameFilter:"",
      locationFilter:"",
      errors: ref([]),
      appState: AppState(),
      columns: [
        { name: "Nome", key: "name" },
        { name: "Nuit", key: "nuit" },
        { name: "Telefone", key: "phone_number" },
        { name: "Proveniêcia", key: "origin" },
        { name: "Categoria", key: "role" },
        { name: "Alocações", key: "alocacoes" },
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
      if (errors.name)
        this.isInvalidName = errors.name.length > 0 ? true : false;
      else {
        this.isInvalidName = false;
        this.isValidName = true;
      }

      if (errors.surname)
        this.isInvalidSurname = errors.surname.length > 0 ? true : false;
      else {
        this.isInvalidSurname = false;
        this.isValidSurname = true;
      }

      if (errors.phone_number)
        this.isInvalidPhoneNumber = errors.phone_number.length > 0 ? true : false;
      else {
        this.isInvalidPhoneNumber = false;
        this.isValidPhoneNumber = true;
      }

      if (errors.origin_id)
        this.isInvalidProvenance = errors.origin_id.length > 0 ? true : false;
      else {
        this.isInvalidProvenance = false;
        this.isValidProvenance = true;
      }

      if (errors.nuit)
        this.isInvalidNuit = errors.nuit.length > 0 ? true : false;
      else {
        this.isInvalidNuit = false;
        this.isValidNuit = true;
      }

      if (errors.bank_account)
        this.isInvalidBankAccount = errors.bank_account.length > 0 ? true : false;
      else {
        this.isInvalidBankAccount = false;
        this.isValidBankAccount = true;
      }
    },

    async registerEmployee() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

      this.provenance_id =
        $("#provenance_id").val() == null ? "" : $("#provenance_id").val();

      this.bank_name_id =
        $("#bank_name").val() == null ? "" : $("#bank_name").val();

      this.categoria_id =
        $("#categoria_id").val() == null ? "" : $("#categoria_id").val();

      // alert(this.provenance_id)
      // alert(this.bank_name_id)
      // alert(this.categoria_id)

      let data = {
        name: this.name,
        surname: this.surname,
        phone_number: this.first_phone_number,
        alt_phone_number: this.second_phone_number,
        other_origin: this.other_provenance,
        nuit: this.nuit,
        bank_account: this.bank_account,
        bank_id: this.bank_name_id,
        role_id: this.categoria_id,
        origin_id: this.provenance_id,
        user_id: 1
      };

      console.log(data);

      const res = await Api.post("/employee", data);
      console.log(res);

      if (res.code == 422) {
        this.errors = res.message;
        console.log(this.errors);
        this.validateInput(this.errors)
        this.indicator = "";
        SweetAlert.Alert("Erro", "Preecha os campos obrigatorios", "error", "");
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Banco registado com sucesso",
          "success",
          "#kt_modal_employee",
          "kt_modal_employee_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.designation = "";
        this.errors = [];
        this.getEmployee();
      }
    },
    async updateEmployee() {
      // console.log(this.location.data.id)
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

            this.provenance_id =
        $("#provenance_id").val() == null ? "" : $("#provenance_id").val();

      let data = {
        bloco: this.bloco,
        capacity: this.capacity,
        number_room: this.number_room,
        exam_provenance_id: this.provenance_id,
      };

      console.log(this.examRoom.data)

      console.log(data);
      const res = await Api.put(`/examRoom/${this.examRoom.data.id}`, data);

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
            .getElementById("kt_modal_data_submit")
            .removeAttribute("disabled");
        }

        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.Alert(
          "Sucesso",
          "Banco actualizado com sucesso",
          "success",
          "#kt_modal_location",
          "kt_modal_location_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.designation = "";
        this.address = "";
        this.errors = [];
        this.getEmployee();
      }
    },

    async getEmployee(page = 1) {
      this.statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();

        this.locationFilter =
        $("#examLocationFilter").val() == null
          ? ""
          : $("#examLocationFilter").val();

      // alert(this.locationFilter)

      Utilits.showLoader();
      const res = await Api.get(
        `/employee?page=${page}&name=${this.nameFilter}
          &nuit=${this.nuitFilter}
          &origin_id=${this.locationFilter}
          &status=${this.statusFilter}`
      );

      this.employees = await res;

      this.employees.data.forEach(function (item) {
        item.origin = item.origin.designation;
      });

      this.employees.data.forEach(function (item) {
        item.role = item.role.description;
      });

      this.employees.data.forEach(function (item) {
        item.alocacoes = item.exam.length;
      });

      this.dataFetched = true;

      console.log(this.employees.data.length);

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getAllLocation() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/examLocations/all`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxLocations.value = await res.data;
    },

    async getAllRoles() {
      Utilits.showLoader();
      const res = await Api.get(`/role`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxType.value = await res.data;
      console.log(this.comboBoxType.value)
    },

    async getAllBank() {
      Utilits.showLoader();
      const res = await Api.get(`/bank/allData`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxBank.value = await res.data;
      console.log(await res.data)
      console.log(this.comboBoxBank.value)
    },

    async getOneLocation(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/examRoom/${id}`);

      this.examRoom = await res;
      console.log(this.examRoom.value);

      this.dataFetched = true;
      if (this.dataFetched) {
        Utilits.hideLoader();
      }
      this.capacity = res.data.capacity;
      this.nuiFilter = res.data.number_room;
      this.bloco = res.data.bloco;
      $(`#provenance_id`).val(res.data.exam_provenance_id).trigger("change");
      // this.abbreviation = res.data.abbreviation;
      // this.address = res.data.address;
    },

    async remove(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende eliminar a sala?",
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
          res = await Api.delete(`/examRoom/${id}`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Banco eliminado com sucesso", "success");
        this.getEmployee();
      }
    },

    async active(id) {
      let res;

      await Swal.fire({
        icon: "warning",
        title: "Pretende activar a sala?",
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
          res = await Api.active(`/examRoom/${id}/active`);
        }
      });

      if (res != undefined && res.success) {
        SweetAlert.Alert("Sucesso", "Banco eliminado com sucesso", "success");
        this.getEmployee();
      }
    },

    enableUpdate(id) {
      // alert(id);
      this.getOneLocation(id);

      this.title = "Actualizar Sala";
      this.btnText = "Actualizar";
      this.isUpdate = true;
      this.errors = [];
      this.capacity = null;
      this.number_room = null;
      this.bloco = null;
    },

    enableStore() {
      this.getAllLocation();
      this.getAllRoles();
      this.getAllBank();
      this.title = "Registar Pessoal";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.capacity = null;
      this.number_room = null;
      this.bloco = null;
      $(`#provenance_id`).val("").trigger("change");
    },

    async imporExcelData() {
      console.log("uehrheirieu");
      this.indicator = "on";
      document
        .getElementById("upload_excel_locais")
        .setAttribute("disabled", "true");

      let file = FileDropZone.file();
      // console.log(file);

      // Crie um formulário virtual
      const virtualForm = new FormData();

      // Adicione o arquivo simulado ao formulário virtual
      virtualForm.append("excel_file", file, file.name);

      // console.log(file);

      try {
        const res = await Api.postFile("/examRoom/import", virtualForm);
        console.log(res);
        if (res.success) {
          // const id = "#kt_modal_upload_dropzone";
          // const dropzone = document.querySelector(id);
          // const progressBars = dropzone.querySelectorAll(".dz-complete");

          // progressBars.forEach((progressBar) => {
          //   progressBar.querySelector(".progress-bar").style.opacity = "0";
          //   progressBar.querySelector(".progress").style.opacity = "0";
          //   progressBar.querySelector(".dropzone-start").style.opacity = "0";
          // });

          FileDropZone.dropzone().removeAllFiles(true);

          SweetAlert.Alert(
            "Sucesso",
            "Carregamento feito com sucesso",
            "success",
            "#kt_modal_upload",
            "modal_upload_excel"
          );
          this.indicator = "";
          document
            .getElementById("upload_excel_locais")
            .removeAttribute("disabled");
          this.errors = [];
          this.getEmployee()
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },

  computed: {
    dataLength() {
      if (this.employees.data == undefined) {
        return 0;
      }
      return this.employees.data.length;
    },
  },

  created() {
    this.getEmployee();
    this.getAllLocation();
    // this.getAllLocation();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
    this.appState.setisLogin(false)
  },
};


</script>
