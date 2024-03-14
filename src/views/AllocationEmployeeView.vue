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
          Alocação do pessoal
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
          textButton="Alocar"
          datatarget="kt_modal_allocation_exam"
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
        @getData="getAllocationEmployee"
        v-model:nameFilter="this.nameFilter"
        v-model:yearFilter="this.yearFilter"
        :isAllocationEmployeeView="true"
        :employeeType="this.comboBoxEmployeeType.value"
        :exams="this.comboBoxExam.value"
      />
      <!-- End-FIlters -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.allocations"
        :dataFetched="this.dataFetched"
        :isExamView="true"
        buttonText="Upload De Salas"
        tableTitle="Listagem de alocações"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        @enableAlocacaoTimeExam="enableAlocacaoTimeExam"
      />

      <ModalAllocationEmployee
        @register="makeAllocation"
        @update="updateExamRoom"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        v-model:subject="this.subject"
        v-model:all_tobe_examined="this.all_tobe_examined"
        :isInvalidSubject="this.isInvalidSubject"
        :isValidSubject="this.isValidSubject"
        :errors="this.errors"
        placeholderOne="Total por serem examinados..."
        :locations="this.comboBoxLocations.value"
        :exams="this.comboBoxExam.value"
        :employeeType="this.comboBoxEmployeeType.value"
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
        :data="this.allocations"
        @pagination-change-page="getAllocationEmployee"
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
import PrimaryButton from "../components/shared/primaryButton.vue";
import ModalAllocationEmployee from "../components/Modals/AllocationEmployee/ModalAllocationEmployee.vue";
import Filters from "../components/FiltersComponent.vue";
import Api from "../ApiRest.js";
import Utilits from "../Utilits.js";
import SweetAlert from "../dist-assets/assets/js/custom/SweetAlert/SweetAlert.js";
import Select2 from "../dist-assets/assets/js/select2.js";
import FileDropZone from "../dist-assets/assets/js/fileDropZone.js";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ref } from "vue";
import { AppState } from "@/stores/AppState";

export default {
  components: {
    DataTable,
    UploadLocationModal,
    Filters,
    Bootstrap5Pagination,
    ModalAllocationEmployee,
    PrimaryButton,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      subject: "",
      isInvalidSubject: false,
      isValidSubject: false,
      idSubject: null,
      nameFilter: "",
      yearFilter:"",
      statusFilter: "",
      indicator: "",
      all_tobe_examined: null,
      allocationType: null,
      employeeType_id: "",
      exam_location_id: null,
      employee_id: null,
      second_employee: null,
      first_employee: null,
      dupla_pessoal: null,
      exam_room_id: null,
      bloco: null,
      exam_id: "",
      comboBoxLocations: ref([]),
      comboBoxEmployeeType: ref([]),
      comboBoxExam: ref([]),
      comboBoxExamRoom: ref([]),
      allocations: ref([]),
      location: ref([]),
      examRoom: null,
      dataFetched: false,
      checkAllRoom: false,
      errors: ref([]),
      appState: AppState(),
      columns: [
        { name: "Nome", key: "employee" },
        { name: "Disciplina", key: "subject" },
        { name: "Local", key: "designation" },
        { name: "Bloco", key: "bloco" },
        { name: "Nr. da sala", key: "number_room" },
        { name: "Função", key: "employee_type" },
        { name: "Confirmação", key: "confirmation" },
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
      if (errors.subject)
        this.isInvalidSubject = errors.subject.length > 0 ? true : false;
      else {
        this.isInvalidSubject = false;
        this.isValidSubject = true;
      }
    },

    async makeAllocation() {
      this.errors = [];
      // let dupla_pessoal = null;
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

      this.exame_id = $("#exame_id").val() == null ? "" : $("#exame_id").val();

      this.employeeType_id =
        $("#employeeType_id").val() == null ? "" : $("#employeeType_id").val();

      this.exam_location_id =
        $("#location_id").val() == null ? "" : $("#location_id").val();

      this.exam_room_id =
        $("#room_id").val() == null ? "" : $("#room_id").val();

      this.employee_id =
        $("#pessaol_id").val() == null ? "" : $("#pessaol_id").val();

      this.block_id = $("#bloco_id").val() == null ? "" : $("#bloco_id").val();

      this.dupla_pessoal = this.employee_id.toString().split(",");

      if (this.dupla_pessoal == "") {
        this.dupla_pessoal = [];
      }

      console.log(this.dupla_pessoal);

      // this.checkAllRoom = $("#checkAllRoom").val();

      this.allocationType = $('input[name="allocationType"]:checked').val();

      let data = {
        type_employee_id: this.employeeType_id,
        exam_id: this.exame_id,
        exam_room_id: this.exam_room_id,
        exam_location_id: this.exam_location_id,
        // second_employee: this.second_employee,
        dupla_pessoal: this.dupla_pessoal,
        allocationType: this.allocationType,
        block_id: this.block_id,
        // all_tobe_examined: this.all_tobe_examined,
        // checkAllRoom: this.checkAllRoom == "true" ? true : false,
      };

      console.log(data);

      const res = await Api.post("/allocationEmployeeExam", data);
      console.log(res);

      if (res.code == 422) {
        this.errors = res.message;
        // console.log(this.errors);
        this.validateInput(this.errors);
        this.indicator = "";
        SweetAlert.Alert("Erro", "Preecha os campos obrigatorios", "error", "");
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
      }

      if (!res.success && res.code != 422) {
        this.indicator = "";
        SweetAlert.Alert("Erro", `${res.data}`, "warning", "");
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
      }

      if (res.success) {
        SweetAlert.AlertWithoutConfirmation(
          "Sucesso",
          `${res.data}`,
          "success",
          "#kt_modal_allocation_exam",
          "kt_modal_allocation_exam_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.subject = "";
        this.errors = [];
        this.getAllocationEmployee();
        this.resetFilds();
      }
    },
    async updateExamRoom() {
      // console.log(this.location.data.id)
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

      this.location_id =
        $("#location_id").val() == null ? "" : $("#location_id").val();

      let data = {
        bloco: this.bloco,
        capacity: this.capacity,
        number_room: this.number_room,
        exam_location_id: this.location_id,
      };

      console.log(this.examRoom.data);

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
        this.subject = "";
        this.address = "";
        this.errors = [];
        this.getAllocationEmployee();
      }
    },

    async getAllocationEmployee(page = 1) {
      this.statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();
      this.availableFilter =
        $("#availableFilter").val() == null ? "" : $("#availableFilter").val();

      this.examLocationFilter =
        $("#examLocationFilter").val() == null
          ? ""
          : $("#examLocationFilter").val();

      this.typeEmployeeFilter =
        $("#typeEmployeeFilter").val() == null
          ? 1
          : $("#typeEmployeeFilter").val();

      this.confirmationFilter =
        $("#confirmationFilter").val() == null
          ? 2
          : $("#confirmationFilter").val();

      this.exameFilter =
        $("#exameFilter").val() == null
          ? ""
          : $("#exameFilter").val();

      // alert(this.statusFilter)

      Utilits.showLoader();
      const res = await Api.get(
        `/allocationEmployeeExam?page=${page}
          &status=${this.statusFilter}
          &name=${this.nameFilter}
          &type_employee_id=${this.typeEmployeeFilter}
          &confirmation=${this.confirmationFilter}
          &exam_id=${this.exameFilter}
          &year=${this.yearFilter}`
      );

      this.allocations = await res;

      this.allocations.data.forEach(function (item) {
        item.employee = item.employee.name;
      });

      this.allocations.data.forEach(function (item) {
        item.employee_type = item.type_employee.description;
      });

      this.allocations.data.forEach(function (item) {
        item.subject = item.exam.subject;
      });

      this.allocations.data.forEach(function (item) {
        if (item.exam_room != null) {
          item.designation = item.exam_room.block.exam_location.designation;
        } else {
          item.designation = item.exam_location.designation;
        }
      });

      this.allocations.data.forEach(function (item) {
        if (item.exam_room != null) {
          item.bloco = item.exam_room.block.block;
        } else {
          item.bloco = item.block.block;
        }
      });

      this.allocations.data.forEach(function (item) {
        if (item.exam_room != null) {
          item.number_room = item.exam_room.number_room;
        } else {
          item.number_room = null;
        }
      });

      console.log(this.allocations);

      this.dataFetched = true;

      console.log(this.allocations.data.length);

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

    // async getAllT() {
    //   let data = ref([]);
    //   Utilits.showLoader();
    //   const res = await Api.get(`/examLocations/all`);

    //   this.dataFetched = true;

    //   if (this.dataFetched) {
    //     Utilits.hideLoader();
    //   }

    //   this.comboBoxLocations.value = await res.data;
    // },

    async getAllEmployeeType() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/typeEmployee/allData`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxEmployeeType.value = await res.data;
      console.log(this.comboBoxEmployeeType.value);
    },

    async getAllExams() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/exam/all`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxExam.value = await res.data;
      console.log(this.comboBoxExam.value);
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
        this.getAllocationEmployee();
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
        this.getAllocationEmployee();
      }
    },

    enableAlocacaoTimeExam(id) {
      // alert(id)
      // this.getTimeByDate(id);
      this.idSubject = id;
      this.title = "Alocação do horario";
      this.btnText = "Alocar";
      this.isUpdate = true;
      this.errors = [];
      this.capacity = null;
      this.number_room = null;
      this.bloco = null;
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

    handleLocationSelectChange(event) {
      this.getBlocoByLocation(event.target.value);

      let id = $("#location_id").find(":selected").val();
      let location = $("#location_id").find(":selected").text();
      if (id == "") {
        id = NaN;
      } else {
        id = Number(id);
      }
      console.log(id);
      console.log(!isNaN(id));
      if (!isNaN(id)) {
        this.getRoomsByLocation(id);
        this.getAllEmployee(location, id);
      }
    },

    async getBlocoByLocation(id) {
      // alert(id)
      Utilits.showLoader();

      const res = await Api.get(`/examRoom/${id}/blocos`);

      console.log(res);
      let option = '<option value=""></option>';

      res.data.forEach(function (element, index) {
        // console.log(element)
        option += `<option value="${element.id}">${element.block}</option>`;
        // console.log(option)
      });

      $("#bloco_id").html(option);

      Utilits.hideLoader();
    },

    async getRoomsByLocation(id) {
      Utilits.showLoader();

      const res = await Api.get(`/examRoom/${id}/location`);

      console.log(res);
      let option = '<option value=""></option>';

      res.data.forEach(function (element) {
        // console.log(element)
        option += `<option value="${element.id}">${element.number_room}</option>`;
        // console.log(option)
      });

      $("#room_id").html(option);

      Utilits.hideLoader();
    },

    async getAllEmployee(location, id) {
      // alert(location);
      var exam_id = $("#exame_id").find(":selected").val();
      Utilits.showLoader();

      const res = await Api.get(
        `/employeeWhereDoesntHaveExam?exam_id=${exam_id}`
      );

      console.log(res);
      let activeOption = "";
      let otherOption = "";
      let options = '<option value=""></option>';

      res.data.forEach(function (element) {
        // console.log(element)
        if (element.origin_id == id) {
          activeOption += `<option value="${element.id}"
            data-kt-rich-content-subcontent="${element.role.description}"
            data-kt-rich-content-icon="src/dist-assets/assets/media/svg/avatars/blank.svg"
      >${element.name}</option>`;
        } else {
          otherOption += `<option value="${element.id}"
            data-kt-rich-content-subcontent="${element.role.description}"
            data-kt-rich-content-icon="src/dist-assets/assets/media/svg/avatars/blank.svg"
      >${element.name}</option>`;
        }
      });

      options +=
        `<optgroup id="active_group_id" label="${location}">
            ${activeOption}
    </optgroup>` +
        `<optgroup id="other_group_id" label="Pessoal com outra proviniencia">
            ${otherOption}
  </optgroup>`;

      $("#pessaol_id").html("");
      $("#pessaol_id").html(options);

      $("#pessaol_id").select2().trigger("change");

      $("#pessaol_id").select2({
        placeholder: "Select an option",
        minimumResultsForSearch: Infinity,
        templateSelection: optionFormat,
        templateResult: optionFormat,
      });

      Utilits.hideLoader();
    },

    resetFilds() {
      this.comboBoxExam = ref([]);
      this.comboBoxLocations = ref([]);
      this.comboBoxExamRoom = ref([]);
      this.all_tobe_examined = null;
      $("#room_id").html("");

      if ($("#checkAllRoom").prop("checked")) {
        $("#checkAllRoom").attr("checked", false);
        $("#room_id").attr("disabled", false);
        $("#checkAllRoom").val("false");
      }
    },
    enableStore() {
      this.getAllLocation();
      this.getAllExams();
      this.getAllEmployeeType();
      this.title = "Alocar Pessoal";
      this.btnText = "Finalizar";
      this.isUpdate = false;
      this.errors = [];
      this.subject = null;
      $("#pessaol_id").html("");
      $("#pessaol_id").select2().trigger("change");
      $("#exame_id").val("").trigger("change");
      $("#employeeType_id").val("").trigger("change");
      $("#location_id").val("").trigger("change");
      $(".local_field").prop("hidden", true);
      $("#location_id").prop("disabled", true);
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
          this.getAllocationEmployee();
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },

  computed: {
    dataLength() {
      if (this.allocations.data == undefined) {
        return 0;
      }
      return this.allocations.data.length;
    },
  },

  created() {
    this.getAllocationEmployee();
    this.getAllEmployeeType();
    this.getAllLocation();
    this.getAllExams();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
    this.appState.setisLogin(false);
    Utilits.initTime();

    $("#location_id").on("change", this.handleLocationSelectChange);

    // Init Select2 --- more info: https://select2.org/
    $("#kt_docs_select2_rich_content").select2({
      placeholder: "Select an option",
      minimumResultsForSearch: Infinity,
      templateSelection: optionFormat,
      templateResult: optionFormat,
    });

    $("#pessaol_id").select2({
      placeholder: "Select an option",
      minimumResultsForSearch: Infinity,
      templateSelection: optionFormat,
      templateResult: optionFormat,
    });
  },
};

// var exam_id;
$(document).on("change", "#exame_id", function () {
  // exam_id = $(this).find(":selected").val();
  let option = '<option value=""></option>';
  $("#pessaol_id").html(option);
  $("#pessaol_id").select2().trigger("change");

  $("#room_id").html("");
  if ($(this).val() != "") {
    $("#location_id").prop("disabled", false);
  }
  // $("#location_id").val("").trigger("change");
});

// $(document).on("change", "#location_id", function () {
//   let id = $(this).find(":selected").val();
//   let location = $(this).find(":selected").text();
//   if (id == "") {
//     id = NaN;
//   } else {
//     id = Number(id);
//   }
//   console.log(id);
//   console.log(!isNaN(id));
//   if (!isNaN(id)) {
//     getRoomsByLocation(id);
//     getAllEmployee(location, id);
//   }
// });

// async function getRoomsByLocation(id) {
//   Utilits.showLoader();

//   const res = await Api.get(`/examRoom/${id}/location`);

//   console.log(res);
//   let option = '<option value=""></option>';

//   res.data.forEach(function (element) {
//     // console.log(element)
//     option += `<option value="${element.id}">Bloco: ${element.bloco}- Nr: ${element.number_room}</option>`;
//     // console.log(option)
//   });

//   $("#room_id").html(option);

//   Utilits.hideLoader();
// }

// async function getAllEmployee(location, id) {
//   // alert(location);
//   Utilits.showLoader();

//   const res = await Api.get(`/employeeWhereDoesntHaveExam?exam_id=${exam_id}`);

//   console.log(res);
//   let activeOption = "";
//   let otherOption = "";
//   let options = '<option value=""></option>';

//   res.data.forEach(function (element) {
//     // console.log(element)
//     if (element.origin_id == id) {
//       activeOption += `<option value="${element.id}"
//             data-kt-rich-content-subcontent="${element.role.description}"
//             data-kt-rich-content-icon="src/dist-assets/assets/media/svg/avatars/blank.svg"
//       >${element.name}</option>`;
//     } else {
//       otherOption += `<option value="${element.id}"
//             data-kt-rich-content-subcontent="${element.role.description}"
//             data-kt-rich-content-icon="src/dist-assets/assets/media/svg/avatars/blank.svg"
//       >${element.name}</option>`;
//     }
//   });

//   options +=
//     `<optgroup id="active_group_id" label="${location}">
//             ${activeOption}
//     </optgroup>` +
//     `<optgroup id="other_group_id" label="Pessoal com outra proviniencia">
//             ${otherOption}
//   </optgroup>`;

//   $("#pessaol_id").html("");
//   $("#pessaol_id").html(options);

//   $("#pessaol_id").select2().trigger("change");

//   $("#pessaol_id").select2({
//     placeholder: "Select an option",
//     minimumResultsForSearch: Infinity,
//     templateSelection: optionFormat,
//     templateResult: optionFormat,
//   });

//   Utilits.hideLoader();
// }

$(document).on("change", "#checkAllRoom", function () {
  if ($("#checkAllRoom").prop("checked")) {
    $("#room_id").attr("disabled", true);
    $("#checkAllRoom").val("true");

    $("#room_id").val([]).change();
  } else {
    $("#room_id").attr("disabled", false);
    $("#checkAllRoom").val("false");
  }
});

// $(document).on("change", "#location_id", function () {
//   getBlocoByLocation($(this).val());
// });

// async function getBlocoByLocation(id) {
//   // alert(id)
//   Utilits.showLoader();

//   const res = await Api.get(`/examRoom/${id}/blocos`);

//   console.log(res);
//   let option = '<option value=""></option>';

//   res.data.forEach(function (element, index) {
//     // console.log(element)
//     option += `<option value="${element.bloco}">${element.bloco}</option>`;
//     // console.log(option)
//   });

//   $("#bloco_id").html(option);

//   Utilits.hideLoader();
// }

// $(document).on("change", "#employeeType_id", function () {
//   // alert($(this).val());
//   if ($(this).val() == 1) {
//     $("#pessoal_field").prop("hidden", false);
//   } else {
//     $("#pessoal_field").prop("hidden", true);
//   }
// });

$(document).ready(function () {
  $("#pessaol_id").select2();
});

// Format options
const optionFormat = (item) => {
  if (!item.id) {
    return item.text;
  }

  var span = document.createElement("span");
  var template = "";

  template += '<div class="d-flex align-items-center">';
  template +=
    '<img src="' +
    item.element.getAttribute("data-kt-rich-content-icon") +
    '" class="rounded-circle h-40px me-3" alt="' +
    item.text +
    '"/>';
  template += '<div class="d-flex flex-column">';
  template += '<span class="fs-4 fw-bold lh-1">' + item.text + "</span>";
  template +=
    '<span class="text-muted fs-5">' +
    item.element.getAttribute("data-kt-rich-content-subcontent") +
    "</span>";
  template += "</div>";
  template += "</div>";

  span.innerHTML = template;

  return $(span);
};

// optionFormat()
</script>
