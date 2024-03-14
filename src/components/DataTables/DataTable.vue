<template>
  <main>
    <!--begin::Tables Widget 13-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Header-->
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-3 mb-1">{{
            this.$props.tableTitle
          }}</span>

          <!-- <span class="text-muted mt-1 fw-semibold fs-7">Over 500 orders</span> -->
        </h3>
        <div class="card-toolbar">
          <!--begin::Menu-->
          <!-- <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            <i class="ki-duotone ki-category fs-6"
              ><span class="path1"></span><span class="path2"></span
              ><span class="path3"></span><span class="path4"></span
            ></i>
          </button> -->

          <button
            v-show="
              this.$props.isLocationExamView || this.$props.isEmployeeView
            "
            type="button"
            class="btn btn-flex btn-light-primary me-3"
            id="kt_file_manager_new_folder"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_upload"
          >
            <i class="ki-duotone ki-folder-up fs-2">
              <span class="path1"></span><span class="path2"></span>
            </i>
            {{ this.buttonText }}
          </button>

          <button
            type="button"
            class="btn btn-flex btn-light-danger me-3"
            id="kt_file_manager_new_folder"
            @click="printPDF"
          >
            <i class="ki-duotone ki-printer fs-2">
              <span class="path1"></span><span class="path2"></span>
              <span class="path3"></span><span class="path4"></span>
              <span class="path5"></span>
            </i>
            Imprimir PDF
          </button>

          <!--end::Menu-->
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Body-->
      <div class="card-body py-3">
        <!--begin::Table container-->
        <div class="table-responsive">
          <!--begin::Table-->
          <table
            class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
            ref="content"
            id="main-table"
          >
            <!--begin::Table head-->
            <thead v-if="this.$props.dataLenght > 0">
              <tr class="fw-bold text-muted">
                <th class="w-25px">
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-13-check"
                    />
                  </div>
                </th>
                <th class="min-w-100px">#</th>
                <th
                  class="min-w-100px"
                  v-for="(column, index) in this.$props.columns"
                  :key="index"
                >
                  {{ column.name }}
                </th>
                <th class="text-center">Acções</th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <RowTable
                v-if="this.$props.dataFetched"
                :data="this.$props.data"
                :columns="this.$props.columns"
                @enableUpdate="enableUpdate"
                @enableUpdatePass="enableUpdatePass"
                @remove="remove"
                @active="active"
                @enableAlocacaoTimeExam="enableAlocacaoTimeExam"
                :isLocationExamView="this.$props.isLocationExamView"
                :isBankView="this.$props.isBankView"
                :isExamView="this.$props.isExamView"
                :isRoleView="this.$props.isRoleView"
                :isSalaryView="this.$props.isSalaryView"
                :isUserView="this.$props.isUserView"
              />
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
        <!--end::Table container-->
      </div>
      <!--begin::Body-->
    </div>
    <!--end::Tables Widget 13-->
  </main>
</template>

<script>
import RowTable from "./RowTable.vue";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import Api from '../../../ApiRest.js'
// import Utilits from '../../../Utilits.js'
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import { ref } from 'vue'

export default {
  props: {
    data: {
      type: Array,
    },
    dataFetched: {
      type: Boolean,
    },
    dataLenght: {
      type: null,
    },
    isLocationExamView: {
      type: Boolean,
    },
    isBankView: {
      type: Boolean,
    },
    tableTitle: {
      type: String,
    },
    columns: {
      type: Array,
    },
    buttonText: {
      type: String,
    },
    isEmployeeView: {
      type: Boolean,
    },
    isExamView: {
      type: Boolean,
    },
    isRoleView: {
      type: Boolean,
    },
    isSalaryView: {
      type: Boolean,
    },
    isUserView: {
      type: Boolean,
    },
  },

  data() {
    return {
      // data:ref([]),
      // dataFetched: false
    };
  },

  components: {
    RowTable,
  },

  methods: {
    async enableAlocacaoTimeExam(id) {
      this.$emit("enableAlocacaoTimeExam", id);
    },
    async enableUpdate(id) {
      this.$emit("enableUpdate", id);
    },

    async enableUpdatePass(id) {
      this.$emit("enableUpdatePass", id);
    },

    async remove(id) {
      this.$emit("remove", id);
    },

    async active(id) {
      this.$emit("active", id);
    },
    printPDF() {
      var pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      pdf.setFontSize(16).text("Meu documento", 0.5, 1.0);

      pdf.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);

      // var imgData = 'src/dist-assets/assets/media/logos/custom-1.png'; // Coloque aqui os dados da imagem

      // Adicionar a imagem ao PDF
      // pdf.addImage(imgData, 'PNG', 10, 10, 50, 50);

      autoTable(pdf, { html: "#main-table", startY: 2 });
      pdf.save("documento.pdf");
    },
  },

  created() {
    console.log(this.$props.columns);
  },
};
</script>
