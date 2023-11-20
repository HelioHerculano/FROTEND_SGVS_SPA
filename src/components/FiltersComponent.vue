<template>
  <form @submit.prevent="getData">
    <!--begin::Tables Widget 13-->
    <div class="card mb-5 mb-xl-12">
      <!--begin::Header-->
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-3 mb-1">Filtros</span>
        </h3>
      </div>

      <!--begin::Body-->
      <div class="card-body py-3">
        <div class="row">
          <div
            class="col-4"
            v-show="this.$props.isLocationExamView || this.$props.isBankView"
          >
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Nome</label>

              <input
                v-show="this.$props.isBankView"
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo nome..."
                name="description"
                @input="$emit('update:descriptionFilter', $event.target.value)"
              />

              <input
                v-show="this.$props.isLocationExamView"
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo nome..."
                name="designation"
                @input="$emit('update:designationFilter', $event.target.value)"
              />
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isExamRoomView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Locais</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="examLocationFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>

                <option
                  v-for="(local, index) in this.$props.locations"
                  :key="index"
                  :value="local.id"
                >
                  {{ local.designation }}
                </option>

                <!-- <option value="1">Disponivel</option> -->
                <!-- <option value="0">Indisponivel</option> -->
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isExamRoomView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Bloco</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo bloco..."
                name="bloco"
                @input="$emit('update:blocoFilter', $event.target.value)"
              />
              <!--end::Input group-->
            </div>
          </div>

          <div class="col-4" v-show="this.$props.isExamRoomView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Capacidade</label
              >

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pela capacidade..."
                name="capacity"
                @input="$emit('update:capacityFilter', $event.target.value)"
              />
              <!--end::Input group-->
            </div>
          </div>

          <div class="col-4" v-show="this.$props.isExamRoomView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Número da sala</label
              >

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo número da sala..."
                name="numberRoom"
                @input="$emit('update:numberRoomFilter', $event.target.value)"
              />
              <!--end::Input group-->
            </div>
          </div>

          <div class="col-4" v-show="!this.$props.isExamRoomView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Sigla</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pela sigla..."
                name="abbreviation"
                @input="$emit('update:abbreviationFilter', $event.target.value)"
              />
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isExamRoomView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Disponibilidade</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="availableFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>
                <option
                  v-for="(available, index) in this.available"
                  :key="index"
                  :value="available.key"
                  :selected="available.key == 1"
                >
                  {{ available.description }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Estado</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="statusFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <!-- <option value=""></option> -->

                <option
                  v-for="(status, index) in this.status"
                  :key="index"
                  :value="status.key"
                  :selected="status.key == 1"
                >
                  {{ status.description }}
                </option>

              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>
        </div>

        <div class="col-md-12 mb-5" style="text-align: right">
          <button type="submit" class="btn btn-sm fw-bold btn-dark">
            <i class="ki-duotone ki-magnifier fs-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>

            Pesquisar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isBankView: {
      type: Boolean,
    },
    isLocationExamView: {
      type: Boolean,
    },
    isExamRoomView: {
      type: Boolean,
    },

    locations: {
      type: Array,
    },
  },
  data() {
    return {
      comboBoxLocations: "",
      available: [
        { key: 1, description: "Disponivel" },
        { key: 2, description: "Indisponivel" },
      ],
      status: [
        { key: 1, description: "Activo" },
        { key: 2, description: "Inactivo" },
      ],
    };
  },

  methods: {
    async getData() {
      var statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();
      var page = 1;
      this.$emit("getData", page, statusFilter);
    },
  },
};
</script>
