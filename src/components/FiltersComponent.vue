<template>
  <form @submit.prevent="getBanks">
    <!--begin::Tables Widget 13-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Header-->
      <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-3 mb-1">Filtros</span>
        </h3>
      </div>

      <!--begin::Body-->
      <div class="card-body py-3">
        <div class="row">
          <div class="col-4">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Nome</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Nome do banco..."
                name="description"
                @input="$emit('update:descriptionFilter', $event.target.value)"
              />
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Sigla</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Sigla do banco..."
                name="abbreviation"
                @input="$emit('update:abbreviationFilter', $event.target.value)"
              />
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

                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>
        </div>

        <div class="col-md-12 mb-5" style="text-align: right">
          <button type="submit" class="btn btn-sm fw-bold btn-dark">
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      // statusFilter: "",
      // descriptionFilter: "",
      // abbreviationFilter: "",
    };
  },

  methods: {
    async getBanks() {
      var statusFilter =
        $("#statusFilter").val() == null ? "" : $("#statusFilter").val();
      var page = 1;
      this.$emit("getBanks", page, statusFilter);
    },
  },
};
</script>
