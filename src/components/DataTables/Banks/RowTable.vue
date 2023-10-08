<template>
        <tr v-if="data" v-for="(item,index) in data.data" :key="item.id">
            <td>
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input widget-13-check" type="checkbox" value="1"/>
                </div>
            </td>
            
            <td>
                <a href="#" class="text-dark fw-bold text-hover-primary fs-6">{{ ++index }}</a>
            </td>
            
            <td>
                <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.description }}</a>
                <!-- <span class="text-muted fw-semibold text-muted d-block fs-7">Code: PH</span> -->
            </td>

            <td>
                <a href="#" class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">{{ item.abbreviation }}</a>
                <!-- <span class="text-muted fw-semibold text-muted d-block fs-7">Code: Paid</span> -->
            </td>


            <td>
                <span v-if="item.status == 1" class="badge badge-light-success">Activo</span>
                <span v-if="item.status == 0" class="badge badge-light-danger">Inactivo</span>
            </td>             
            
            <td class="text-end">
                <button v-if="item.status == 0" href="#" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" @click="activeBank(item.id)">
                    <i class="ki-duotone ki-switch fs-2"><span class="path1"></span><span class="path2"></span></i>                                
                </button>
                
                <button v-if="item.status == 1" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#kt_modal_new_bank" @click="enableUpdate(item.id)" id="btnEdit" :value="item.id">
                    <i class="ki-duotone ki-pencil fs-2"><span class="path1"></span><span class="path2"></span></i>                                
                </button>

                <button v-if="item.status == 1" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" @click="deleteBank(item.id)">
                    <i class="ki-duotone ki-trash fs-2"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i>                                
                </button>
            </td>
        </tr>  
</template>

<script>
export default {
    props: {
        data:{
            type: Array
        }
    },
    data(){
        return {

        }
    },
    methods: {
        async enableUpdate(id){
            this.$emit('enableUpdate',id);
        },
        async deleteBank(id){
            this.$emit('deleteBank',id);
        },
        async activeBank(id){
            this.$emit('activeBank',id);
        },
        counter(){

            console.log(this.$props.data.data)

            let couter = 0;
            for( let i = 0 ; i < this.$props.data.data.length ; i++ ){
                couter++;
            }

            return couter;
        }
    },
    // mounted(){
    //     this.show()
    // }
}
</script>