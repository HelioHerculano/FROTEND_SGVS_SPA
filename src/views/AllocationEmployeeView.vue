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
        @getData="getAllocationExam"
        v-model:blocoFilter="this.blocoFilter"
        v-model:capacityFilter="this.capacityFilter"
        v-model:numberRoomFilter="this.numberRoomFilter"
        :isExamView="true"
        :locations="this.comboBoxLocations.value"
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
        v-model:all_tobe_examined = "this.all_tobe_examined"
        :isInvalidSubject="this.isInvalidSubject"
        :isValidSubject="this.isValidSubject"
        :errors="this.errors"
        placeholderOne="Total por serem examinados..."
        :locations="this.comboBoxLocations.value"
        :exams="this.comboBoxExam.value"
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
        @pagination-change-page="getAllocationExam"
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
      all_tobe_examined:null,
      allocationType:null,
      comboBoxLocations: ref([]),
      comboBoxExam: ref([]),
      comboBoxExamRoom: ref([]),
      allocations: ref([]),
      location: ref([]),
      examRoom: null,
      dataFetched: false,
      checkAllRoom: false,
      errors: ref([]),
      columns: [
        { name: "Disciplina", key: "subject" },
        { name: "Local", key: "designation" },
        { name: "Bloco", key: "bloco" },
        { name: "Nr. da sala", key: "number_room" },
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
      this.indicator = "on";
      document
        .getElementById("kt_modal_data_submit")
        .setAttribute("disabled", "true");

        
            this.exame_id =
        $("#exame_id").val() == null ? "" : $("#exame_id").val();
            this.location_id =
        $("#location_id").val() == null ? "" : $("#location_id").val();

        this.room_id =
        $("#room_id").val() == null ? "" : $("#room_id").val();

        this.checkAllRoom = $("#checkAllRoom").val();

        this.allocationType = $('input[name="allocationType"]:checked').val()

      let data = {
        exam_location_id: this.location_id,
        exam_room_id: this.room_id,
        exam_id: this.exame_id,
        all_tobe_examined: this.all_tobe_examined,
        checkAllRoom: this.checkAllRoom == "true" ? true : false,
        allocationType: this.allocationType
      };    

      console.log(data);

      const res = await Api.post("/allocationExamLocation", data);
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
        this.getAllocationExam()
        this.resetFilds()
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
        this.getAllocationExam();
      }
    },

    async getAllocationExam(page = 1) {
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
        `/allocationExamLocation?page=${page}
          &status=${this.statusFilter}`
      );

      this.allocations = await res;

      this.allocations.data.forEach(function (item) {
        item.subject = item.exam.subject;
      });

      this.allocations.data.forEach(function (item) {
        item.designation = item.exam_room.exam_location.designation;
      });

      this.allocations.data.forEach(function (item) {
        item.bloco = item.exam_room.bloco;
      });

      this.allocations.data.forEach(function (item) {
        item.number_room = item.exam_room.number_room;
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

    async getAllExams() {
      let data = ref([]);
      Utilits.showLoader();
      const res = await Api.get(`/exam/all`);

      this.dataFetched = true;

      if (this.dataFetched) {
        Utilits.hideLoader();
      }

      this.comboBoxExam.value = await res.data;
      console.log(this.comboBoxExam.value)
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
        this.getAllocationExam();
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
        this.getAllocationExam();
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

    resetFilds(){
      this.comboBoxExam = ref([])
      this.comboBoxLocations = ref([])
      this.comboBoxExamRoom = ref([])
      this.all_tobe_examined = null
      $("#room_id").html("")
      
      if($("#checkAllRoom").prop("checked")){
        $("#checkAllRoom").attr("checked",false)
        $("#room_id").attr("disabled",false)
        $("#checkAllRoom").val('false')
      }
    },
    enableStore() {
      this.getAllLocation();
      this.getAllExams();
      this.title = "Alocar Pessoal";
      this.btnText = "Finalizar";
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
          this.getAllocationExam()
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
    this.getAllocationExam();
    this.getAllLocation();
    // $(document).ready(function() {
  },
  mounted() {
    Select2.createSelect2();
    FileDropZone.initDropzone();
  },
};

  $(document).on("change","#location_id",function(){
      let id = $(this).find(":selected").val()
      getRoomsByLocation(id)
  })

  async function getRoomsByLocation(id){

    Utilits.showLoader();

    const res = await Api.get(
        `/examRoom/${id}/location`
      );

      console.log(res)
      let option = "";

      res.data.forEach(function(element){
        // console.log(element)
        option += `<option value="${element.id}">Bloco: ${element.bloco}- Nr: ${element.number_room}</option>`
        // console.log(option) 
      })

      $("#room_id").html(option)

    Utilits.hideLoader();

  }

  $(document).on("change","#checkAllRoom",function(){
    if($("#checkAllRoom").prop("checked")){
      $("#room_id").attr("disabled",true)
      $("#checkAllRoom").val('true')
      
      $("#room_id").val([]).change();
    }else{
      $("#room_id").attr("disabled",false)
      $("#checkAllRoom").val('false')
    }
  })
</script>
