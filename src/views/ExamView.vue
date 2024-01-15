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
          Salas de exames
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
          datatarget="kt_modal_exam"
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
        @getData="getExam"
        v-model:blocoFilter="this.blocoFilter"
        v-model:capacityFilter="this.capacityFilter"
        v-model:numberRoomFilter="this.numberRoomFilter"
        :isExamView="true"
        :locations="this.comboBoxTimetable.value"
      />
      <!-- End-FIlters -->

      <DataTable
        :dataLenght="this.dataLength"
        :columns="this.columns"
        :data="this.exams"
        :dataFetched="this.dataFetched"
        :isExamView="true"
        buttonText="Upload De Salas"
        tableTitle="Listagem de exames" 
        @enableUpdate="enableUpdate"
        @remove="remove"
        @active="active"
        @enableAlocacaoTimeExam="enableAlocacaoTimeExam"
      />

      <ModalExamTimeTable
        @alocacaoTimeExam="alocacaoTimeExam"
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
        :timetables="this.comboBoxTimetable.value"
      />

      <ModalExam
        @register="registerExam"
        @update="updateExamRoom"
        @enableStore="enableStore"
        :title="this.title"
        :btnText="this.btnText"
        :isUpdate="this.isUpdate"
        :indicatorProps="this.indicator"
        v-model:subject="this.subject"
        :isInvalidSubject="this.isInvalidSubject"
        :isValidSubject="this.isValidSubject"
        :errors="this.errors"
        placeholderOne="Nome da disciplina..."

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
        :data="this.exams"
        @pagination-change-page="getExam"
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
import ModalExam from "../components/Modals/Exam/ModalExam.vue";
import ModalExamTimeTable from "../components/Modals/ExamTimeTable/ModalExamTimeTable.vue";
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
    ModalExamTimeTable,
    ModalExam,
    PrimaryButton,
  },

  data() {
    return {
      title: "",
      btnText: "",
      isUpdate: false,
      subject:"",
      isInvalidSubject:false,
      isValidSubject:false,
      idSubject:null,
      blocoFilter: "",
      numberRoomFilter: "",
      capacityFilter: "",
      availableFilter: "",
      examLocationFilter: "",
      statusFilter: "",
      indicator: "",
      comboBoxTimetable: ref([]),
      exams: ref([]),
      location: ref([]),
      examRoom: null,
      dataFetched: false,
      errors: ref([]),
      columns: [
        { name: "Disciplina", key: "subject" },
        { name: "Data do exame", key: "date" },
        { name: "Hora de inicio", key: "start_time" },
        { name: "Hora do termino", key: "end_time" },
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


    async registerExam() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

      let data = {
        subject: this.subject,
      };

      console.log(data);

      const res = await Api.post("/exam", data);
      console.log(res);

      if (res.code == 422) {
        this.errors = res.message;
        // console.log(this.errors);
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
          `${res.message}`,
          "success",
          "#kt_modal_exam",
          "kt_modal_new_exam_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.subject = "";
        this.errors = [];
        this.getExam();
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
        this.subject = "";
        this.address = "";
        this.errors = [];
        this.getExam();
      }
    },

    async alocacaoTimeExam() {
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

      let timetable_id = $("#exame_date_id").val()

      let data = {
        exam_id: this.idSubject,
        timetable_id: timetable_id
      };

      console.log(data);

      const res = await Api.post("/examtimetable", data);
      console.log(res);

      if (res.code == 422) {
        this.errors = res.message;
        // console.log(this.errors);
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
          `${res.message}`,
          "success",
          "#kt_modal_time_table",
          "kt_time_table_form"
        );
        this.indicator = "";
        document
          .getElementById("kt_modal_data_submit")
          .removeAttribute("disabled");
        // Utilits.showLoader()
        this.abbreviation = "";
        this.subject = "";
        this.errors = [];
        this.getExam();

        $("#exame_date_id").val("").trigger('change')
      }
    },

    async getExam(page = 1) {
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
        `/exam?page=${page}
          &status=${this.statusFilter}`
      );

      this.exams = await res;

      this.exams.data.forEach(function (item) {
        if (item.time_table.length > 0){
          item.end_time = item.time_table[0].end_time;
          item.date = item.time_table[0].date;
          item.start_time = item.time_table[0].start_time;
        }else{
          item.end_time = null;
          item.date = null;
          item.start_time = null;
        }
      });
      console.log(this.exams);

      this.dataFetched = true;

      console.log(this.exams.data.length);

      if (this.dataFetched) {
        Utilits.hideLoader();
      }
    },

    async getAllTimeTable() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/timetable/allData`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxTimetable.value = await res.data;
    },

    async getTimeByDate(id) {
      Utilits.showLoader();

      const res = await Api.getOne(`/timetable/${id}`);

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
        this.getExam();
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
        this.getExam();
      }
    },

    enableAlocacaoTimeExam(id) {
      // alert(id)
      // this.getTimeByDate(id);
      this.idSubject = id
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

    enableStore() {
      this.getAllTimeTable();
      this.title = "Registar Exame";
      this.btnText = "Registar";
      this.isUpdate = false;
      this.errors = [];
      this.subject = null;
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
          this.getExam()
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
  },

  computed: {
    dataLength() {
      if (this.exams.data == undefined) {
        return 0;
      }
      return this.exams.data.length;
    },
  },

  created() {
    this.getExam();
    this.getAllTimeTable();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
  },
};

  // $(document).on("change","#exame_date_id",function(){
  //     let date = $(this).find(":selected").text();
  //     getTimeByDate(date)
      
  // })

  // async function getTimeByDate(date){

  //   Utilits.showLoader();

  //   const res = await Api.get(
  //       `/timetable/${date}`
  //     );

  //     console.log(res)
  //     let option = "<option>---Selecione aqui---</option>";

  //     res.forEach(function(element){
  //       console.log(element)
  //       option += `<option>${element.start_time}-${element.end_time}</option>`
  //       console.log(option) 
  //     })

  //     $("#exame_time_id").html(option)

  //   Utilits.hideLoader();

  // }
</script>
