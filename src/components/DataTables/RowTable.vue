<template>
  <tr v-if="data" v-for="(item, index) in data.data" :key="item.id">
    <td>
      <div class="form-check form-check-sm form-check-custom form-check-solid">
        <input
          class="form-check-input widget-13-check"
          type="checkbox"
          value="1"
        />
      </div>
    </td>

    <td>
      <a href="#" class="text-dark fw-bold text-hover-primary fs-6">{{
        ++index
      }}</a>
    </td>

    <td v-for="(column, index) in this.$props.columns" :key="index">
      <span
        v-if="column.key != 'status' && column.key != 'available'"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
        >{{ item[column.key] }}</span
      >

      <span
        v-if="column.key == 'date' && item[column.key] == null || column.key == 'start_time' && item[column.key] == null || column.key == 'end_time' && item[column.key] == null"
        class="badge badge-info"
        >-----</span
      >

      <span
        v-if="column.key == 'available' && item.available == 1"
        class="badge badge-light-info"
        >Disponivel</span
      >
      <span
        v-if="column.key == 'available' && item.available == 2"
        class="badge badge-light-danger"
        >Acupado(a)</span
      >

      <span
        v-if="column.key == 'status' && item.status == 1"
        class="badge badge-light-success"
        >Activo</span
      >
      <span
        v-if="column.key == 'status' && item.status == 2"
        class="badge badge-light-danger"
        >Inactivo</span
      >

      <!-- <span class="text-muted fw-semibold text-muted d-block fs-7">Code: PH</span> -->
    </td>

    <!-- <td>
      <a
        href="#"
        class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
        >{{ item.abbreviation }}</a
      >
    </td>

    <td>
      <span v-if="item.status == 1" class="badge badge-light-success"
        >Activo</span
      >
      <span v-if="item.status == 0" class="badge badge-light-danger"
        >Inactivo</span
      >
    </td> -->

    <td class="text-center">
      <button
        v-if="item.status == 2"
        href="#"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
        @click="active(item.id)"
      >
        <i class="ki-duotone ki-switch fs-2"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </button>

      <button
        v-show=" (item.time_table != null && item.time_table.length == 0) && this.$props.isExamView"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_time_table"
        @click="enableAlocacaoTimeExam(item.id)"
        id="alocacao"
        :value="item.id"
      >
        <i
          class="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span><span class="path6"></span
        ></i>
      </button>

      <button
        v-if="item.status == 1"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_new_data"
        @click="enableUpdate(item.id)"
        id="btnEdit"
        :value="item.id"
        v-show="this.$props.isBankView"
      >
        <i class="ki-duotone ki-pencil fs-2"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </button>

      <button
        v-if="item.status == 1"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_location"
        @click="enableUpdate(item.id)"
        id="btnEdit"
        :value="item.id"
        v-show="this.$props.isLocationExamView"
      >
        <i class="ki-duotone ki-pencil fs-2"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </button>

      <button
        v-if="item.status == 1"
        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm mb-1"
        @click="remove(item.id)"
      >
        <i class="ki-duotone ki-trash fs-2"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span
        ></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    isLocationExamView: {
      type: Boolean,
    },
    isBankView: {
      type: Boolean,
    },
    isExamView: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    async enableAlocacaoTimeExam(id) {
      this.$emit("enableAlocacaoTimeExam", id);
    },
    async enableUpdate(id) {
      this.$emit("enableUpdate", id);
    },
    async remove(id) {
      this.$emit("remove", id);
    },
    async active(id) {
      this.$emit("active", id);
    },
    counter() {
      console.log(this.$props.data.data);

      let couter = 0;
      for (let i = 0; i < this.$props.data.data.length; i++) {
        couter++;
      }

      return couter;
    },
  },
  // mounted(){
  //     this.show()
  // }
};
</script>
