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

          <div
            class="col-4"
            v-show="this.$props.isExamRoomView || this.$props.isEmployeeView"
          >
            <div class="mb-10">
              <!--begin::Label-->
              <label
                v-show="this.$props.isExamRoomView"
                class="form-label fw-bold fs-6 text-gray-700"
                >Locais</label
              >
              <label
                v-show="this.$props.isEmployeeView"
                class="form-label fw-bold fs-6 text-gray-700"
                >Proveniêcia</label
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

              <select
                id="blockFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>

                <option
                  v-for="(block, index) in this.$props.blocks"
                  :key="index"
                  :value="block.id"
                >
                  {{ block.block }}
                </option>
              </select>
              <!--end::Select-->

              <!-- <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo bloco..."
                name="bloco"
                @input="$emit('update:blocoFilter', $event.target.value)"
              /> -->
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

          <div
            class="col-4"
            v-show="
              !this.$props.isExamRoomView &&
              !this.$props.isTimeTableView &&
              !this.$props.isEmployeeView &&
              !this.$props.isRoleView &&
              !this.$props.isSalaryView &&
              !this.isUserView &&
              !this.$props.isAllocationEmployeeView
            "
          >
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

          <div
            class="col-4"
            v-show="
              this.$props.isEmployeeView ||
              this.$props.isUserView ||
              this.$props.isAllocationEmployeeView
            "
          >
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Nome</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo nome..."
                name="name"
                @input="$emit('update:nameFilter', $event.target.value)"
              />
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isAllocationEmployeeView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Função</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="typeEmployeeFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>
                <option
                  v-for="(typeEmployee, index) in this.$props.employeeType"
                  :key="index"
                  :value="typeEmployee.id"
                  :selected="typeEmployee.id == 1"
                >
                  {{ typeEmployee.description }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isAllocationEmployeeView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700">Exame</label>
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="exameFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>
                <option
                  v-for="(exams, index) in this.$props.exams"
                  :key="index"
                  :value="exams.id"
                >
                  {{ exams.subject }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isAllocationEmployeeView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Confirmação</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="confirmationFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>
                <option
                  v-for="(confir, index) in this.confirmation"
                  :key="index"
                  :value="confir.key"
                  :selected="confir.key == 2"
                >
                  {{ confir.description }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isEmployeeView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Nuit</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo NUIT..."
                name="nuit"
                @input="$emit('update:nuitFilter', $event.target.value)"
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

          <div
            v-show="this.$props.isTimeTableView"
            :class="{
              'col-4': !isTimeTableView,
              'col-6': isTimeTableView,
            }"
          >
            <!--begin::Label-->
            <label class="form-label fw-bold fs-6 text-gray-700"> Data </label>
            <!--end::Label-->

            <!--begin::Input-->
            <div class="position-relative d-flex align-items-center">
              <!--begin::Icon-->
              <i class="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span><span class="path4"></span
                ><span class="path5"></span><span class="path6"></span
              ></i>
              <!--end::Icon-->

              <input
                id="init_date_filter"
                :placeholder="this.$props.placeholderDate"
                class="form-control form-control-solid ps-12"
                name="dateExame"
                @input="$emit('update:dateFilter', $event.target.value)"
              />
            </div>
            <!--end::Input-->
          </div>

          <div class="col-6" v-show="this.$props.isRoleView">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="form-label fw-bold fs-6 text-gray-700">Cargo</label>

              <input
                type="text"
                class="form-control form-control-solid"
                placeholder="Pesquise pelo cargo..."
                name="role"
                @input="$emit('update:roleFilter', $event.target.value)"
              />
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isUserView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Nivel de acesso</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="accessLevelFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>

                <option
                  v-for="(accessLevel, index) in this.accessLevels"
                  :key="index"
                  :value="accessLevel.id"
                >
                  {{ accessLevel.level }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div class="col-4" v-show="this.$props.isSalaryView">
            <div class="mb-10">
              <!--begin::Label-->
              <label class="form-label fw-bold fs-6 text-gray-700"
                >Função</label
              >
              <!--end::Label-->

              <!--begin::Select-->
              <select
                id="employeeTypeFilter"
                name="currnecy"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="---Selecione aqui---"
                class="form-select form-select-solid"
              >
                <option value=""></option>

                <option
                  v-for="(employeeType, index) in this.employeeTypes"
                  :key="index"
                  :value="employeeType.id"
                >
                  {{ employeeType.description }}
                </option>
              </select>
              <!--end::Select-->
            </div>
            <!--end::Input group-->
          </div>

          <div
            class="col-4"
            v-show="
              this.$props.isSalaryView || this.$props.isAllocationEmployeeView
            "
          >
            <!--begin::Label-->
            <label class="form-label fw-bold fs-6 text-gray-700"> Ano </label>
            <!--end::Label-->

            <!--begin::Input-->
            <div class="position-relative d-flex align-items-center">
              <!--begin::Icon-->
              <i class="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span><span class="path4"></span
                ><span class="path5"></span><span class="path6"></span
              ></i>
              <!--end::Icon-->

              <input
                id="init_year_filter"
                class="form-control form-control-solid ps-12"
                name="yearFilter"
                @input="$emit('update:yearFilter', $event.target.value)"
              />
            </div>
            <!--end::Input-->
          </div>

          <div
            :class="{
              'col-4': !isTimeTableView || !isRoleView,
              'col-6': isTimeTableView || isRoleView,
            }"
          >
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
    isTimeTableView: {
      type: Boolean,
    },
    locations: {
      type: Array,
    },
    blocks: {
      type: Array,
    },
    employeeType: {
      type: Array,
    },
    exams: {
      type: Array,
    },
    placeholderDate: {
      type: String,
    },
    isEmployeeView: {
      type: Boolean,
    },
    isRoleView: {
      type: Boolean,
    },
    isSalaryView: {
      type: Boolean,
    },
    employeeTypes: {
      type: Boolean,
    },
    accessLevels: {
      type: Boolean,
    },
    isUserView: {
      type: Boolean,
    },
    isAllocationEmployeeView: {
      type: Boolean,
    },
  },
  data() {
    return {
      comboBoxLocations: "",
      available: [
        { key: 1, description: "Disponivel" },
        { key: 2, description: "Indisponivel" },
      ],
      confirmation: [
        { key: 1, description: "Confirmada" },
        { key: 2, description: "Pendente" },
        { key: 3, description: "Não confirmado" },
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
