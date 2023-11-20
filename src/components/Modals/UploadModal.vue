<template>
  <!--begin::Modal - Upload File-->
  <div class="modal fade" id="kt_modal_upload" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <form
          class="form"
          action="https://preview.keenthemes.com/metronic8/demo1/apps/file-manager/none"
          id="modal_upload_excel"
          @submit.prevent="imporExcelData"
        >
          <!--begin::Modal header-->
          <div class="modal-header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">{{ this.title }}</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              class="btn btn-icon btn-sm btn-active-icon-primary"
              data-bs-dismiss="modal"
            >
              <i class="ki-duotone ki-cross fs-1"
                ><span class="path1"></span><span class="path2"></span
              ></i>
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->

          <!--begin::Modal body-->
          <div class="modal-body pt-10 pb-15 px-lg-17">
            <!--begin::Input group-->
            <div class="form-group">
              <!--begin::Dropzone-->
              <div
                class="dropzone dropzone-queue mb-2"
                id="kt_modal_upload_dropzone"
              >
                <!--begin::Controls-->
                <div class="dropzone-panel mb-4">
                  <a class="dropzone-select btn btn-sm btn-primary me-2"
                    >Anexar o ficheiro</a
                  >
                  <button
                    type="submit"
                    class="dropzone-upload btn btn-sm btn-light-primary me-2"
                    :data-kt-indicator="this.$props.indicatorProps"
                    id="upload_excel_locais"
                  >
                    <span class="indicator-label"> Upload </span>
                    <span class="indicator-progress">
                      Por favor aguader...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
                  <a class="dropzone-remove-all btn btn-sm btn-light-primary"
                    >Remover</a
                  >
                </div>
                <!--end::Controls-->

                <!--begin::Items-->
                <div class="dropzone-items wm-200px">
                  <div class="dropzone-item p-5" style="display: none">
                    <!--begin::File-->
                    <div class="dropzone-file">
                      <div
                        class="dropzone-filename text-dark"
                        title="some_image_file_name.jpg"
                      >
                        <span data-dz-name>some_image_file_name.jpg</span>
                        <strong>(<span data-dz-size>340kb</span>)</strong>
                      </div>

                      <div
                        class="dropzone-error mt-0"
                        data-dz-errormessage
                      ></div>
                    </div>
                    <!--end::File-->

                    <!--begin::Progress-->
                    <div class="dropzone-progress">
                      <div class="progress bg-gray-300">
                        <div
                          class="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-valuenow="0"
                          data-dz-uploadprogress
                        ></div>
                      </div>
                    </div>
                    <!--end::Progress-->

                    <!--begin::Toolbar-->
                    <div class="dropzone-toolbar">
                      <span class="dropzone-start">
                        <!-- <i class="ki-duotone ki-to-right fs-1"></i> -->
                      </span>
                      <span
                        class="dropzone-cancel"
                        data-dz-remove
                        style="display: none"
                      >
                        <i class="ki-duotone ki-cross fs-2"
                          ><span class="path1"></span><span class="path2"></span
                        ></i>
                      </span>
                      <span class="dropzone-delete" data-dz-remove>
                        <i class="ki-duotone ki-cross fs-2"
                          ><span class="path1"></span><span class="path2"></span
                        ></i>
                      </span>
                    </div>
                    <!--end::Toolbar-->
                  </div>
                </div>
                <!--end::Items-->
              </div>
              <!--end::Dropzone-->

              <!--begin::Hint-->
              <span class="form-text fs-6 text-muted"
                >Max file size is 1MB per file.</span
              >
              <!--end::Hint-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Modal body-->
        </form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - Upload File-->
</template>

<script>
export default {
  props: {
    indicatorProps: {
      type: String,
    },
    errors: {
      type: Array,
    },
    title:{
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    imporExcelData() {
      this.$emit("imporExcelData");
    },
  },
};
</script>
