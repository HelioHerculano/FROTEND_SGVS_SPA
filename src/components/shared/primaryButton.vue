<template>
    <div>
        <a
          href="#"
          class="btn btn-flex btn-sm fw-bold btn-light-primary btn-border"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_data"
        >
          <i class="ki-duotone ki-archive-tick fs-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          {{ this.$props.textButton }}
        </a>
    </div>
</template>

<script>

export default {
    props: {
        textButton:{
            type: String,
        },
        icon:{
            type: String,
        }
    },
    data(){
        return{

        }
    },
    
}
</script>
