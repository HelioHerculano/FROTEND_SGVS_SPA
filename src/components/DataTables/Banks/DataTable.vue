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
            v-show="this.$props.isLocationExam"
            type="button"
            class="btn btn-flex btn-light-primary me-3"
            id="kt_file_manager_new_folder"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_upload"
          >
            <i class="ki-duotone ki-folder-up fs-2">
              <span class="path1"></span><span class="path2"></span>
            </i>
            Upload Locais
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
        <div class="table-responsive" ref="content">
          <!--begin::Table-->
          <table
            class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
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
                <th class="min-w-100px">Nome</th>
                <th class="min-w-100px">Sigla</th>
                <th class="min-w-100px">Estado</th>
                <th class="min-w-100px text-end">Acções</th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <RowTable
                v-if="this.$props.dataFetched"
                :data="this.$props.banks"
                @enableUpdate="enableUpdate"
                @deleteBank="deleteBank"
                @activeBank="activeBank"
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
// import Api from '../../../ApiRest.js'
// import Utilits from '../../../Utilits.js'
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import { ref } from 'vue'

export default {
  props: {
    banks: {
      type: Array,
    },
    dataFetched: {
      type: Boolean,
    },
    dataLenght: {
      type: null,
    },
    isLocationExam: {
      type: Boolean,
    },
    tableTitle: {
      type: String,
    },
  },

  data() {
    return {
      // banks:ref([]),
      // dataFetched: false
    };
  },

  components: {
    RowTable,
  },

  methods: {
    async enableUpdate(id) {
      this.$emit("enableUpdate", id);
    },

    async deleteBank(id) {
      this.$emit("deleteBank", id);
    },

    async activeBank(id) {
      this.$emit("activeBank", id);
    },

    printPDF() {
      var pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const tabela = this.$refs.content.innerHTML;
      //   console.log("`" + tabela + "`");
      const html = `<table ref="content" border="2">
          <thead border="2">
            <th>Nome</th>
            <th>Contacto</th>
          </thead>
          <tbody border="2">
            <tr border="2">
              <td>Helio</td>
              <td>820912823</td>
            </tr>
          </tbody>
        </table>'`;
      //   pdf.html("`" + tabela + "`", {
      pdf.html(tabela, {
        callback: function (pdf) {
          pdf.save("relatorio.pdf");
        },
        // width: 400,
      });
      //   pdf.autoPrint({ html: tabela });
      //   pdf.text("Hello Word", 10, 10);
      //   pdf.save("teste.pdf");
    },
  },

  created() {
    // alert(this.$props.isLocationExam);
  },
};
</script>
