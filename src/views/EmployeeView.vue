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
          datatarget="kt_modal_location"
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
        @getData="getExamRoom"
        v-model:blocoFilter="this.blocoFilter"
        v-model:capacityFilter="this.capacityFilter"
        v-model:numberRoomFilter="this.numberRoomFilter"
        :isExamRoomView="true"
        :locations="this.comboBoxLocations.value"
      />
      <!-- End-FIlters -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.locations"
        :dataFetched="this.dataFetched"
        :isLocationExamView="true"
        buttonText="Upload De Salas"
        tableTitle="Listagem de salas"
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
      />

      <ModalEmployee
        @register="registerEmployee"
        @update="updateEmployee"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        v-model:bloco="this.bloco"
        v-model:capacity="this.capacity"
        v-model:number_room="this.number_room"
        :errors="this.errors"
        placeholderOne="Bloco da sala..."
        placeholderTwo="Número da sala..."
        placeholderThree="Capacidade da sala..."
        :isExamRoomView="true"
        :locations="this.comboBoxLocations.value"
        :typeEmployee="this.comboBoxType.value"
        :banks="this.getAllBank.value"
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
        :data="this.locations"
        @pagination-change-page="getExamRoom"
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
      capacity: "",
      bloco: "",
      number_room: "",
      location_id: "",
      blocoFilter: "",
      numberRoomFilter: "",
      capacityFilter: "",
      availableFilter: "",
      examLocationFilter: "",
      statusFilter: "",
      indicator: "",
      comboBoxLocations: ref([]),
      comboBoxType: ref([]),
      comboBoxBank: ref([]),
      locations: ref([]),
      location: ref([]),
      examRoom: null,
      dataFetched: false,
      errors: ref([]),
      columns: [
        { name: "Local", key: "local" },
        { name: "Bloco", key: "bloco" },
        { name: "Sala Número", key: "number_room" },
        { name: "Capacidade", key: "capacity" },
        { name: "Disponibilidade", key: "available" },
        { name: "Estado", key: "status" },
      ],
    };
  },

  methods: {
    //   changeTextModal(title='',btnText=''){
    //     this.title = title
    //     this.btnText = btnText
    //   },

    async registerEmployee() {
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

      console.log(data);

      const res = await Api.post("/examRoom", data);
      console.log(res);

      if (res.code == 422) {
        this.errors = res.message;
        console.log(this.errors);
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
        this.errors = [];
        this.getExamRoom();
      }
    },
    async updateEmployee() {
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
        this.getExamRoom();
      }
    },

    async getExamRoom(page = 1) {
      this.statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();
      this.availableFilter =
        $("#availableFilter").val() == null ? "" : $("#availableFilter").val();

      this.examLocationFilter =
        $("#examLocationFilter").val() == null
          ? ""
          : $("#examLocationFilter").val();
      this.statusFilter = this.statusFilter == "" ? 1 : this.statusFilter;

      // alert(this.statusFilter)

      Utilits.showLoader();
      const res = await Api.get(
        `/examRoom?page=${page}&bloco=${this.blocoFilter}
          &number_room=${this.numberRoomFilter}
          &capacity=${this.capacityFilter}
          &available=${this.availableFilter}
          &exam_location_id=${this.examLocationFilter}
          &status=${this.statusFilter}`
      );

      this.locations = await res;

      this.locations.data.forEach(function (item) {
        item.local = item.exam_location.designation;
      });
      // console.log(this.locations);

      this.dataFetched = true;

      console.log(this.locations.data.length);

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

    async getAllEmployeeType() {
      Utilits.showLoader();
      const res = await Api.get(`/typeEmployee/allData`);

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
      this.number_room = res.data.number_room;
      this.bloco = res.data.bloco;
      $(`#location_id`).val(res.data.exam_location_id).trigger("change");
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
        this.getExamRoom();
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
        this.getExamRoom();
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
      this.getAllEmployeeType();
      this.getAllBank();
      this.title = "Registar Pessoal";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.capacity = null;
      this.number_room = null;
      this.bloco = null;
      $(`#location_id`).val("").trigger("change");
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
          this.getExamRoom()
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },

  computed: {
    dataLength() {
      if (this.locations.data == undefined) {
        return 0;
      }
      return this.locations.data.length;
    },
  },

  created() {
    this.getExamRoom();
    this.getAllLocation();
    // this.getAllLocation();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
  },
};
</script>
