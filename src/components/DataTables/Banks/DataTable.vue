<template>
    <main>
        <!--begin::Tables Widget 13-->
        <div class="card mb-5 mb-xl-8">
                <!--begin::Header-->
                <div class="card-header border-0 pt-5">
                    <h3 class="card-title align-items-start flex-column">
                        <span class="card-label fw-bold fs-3 mb-1">Listagem dos bancos</span>

                        <!-- <span class="text-muted mt-1 fw-semibold fs-7">Over 500 orders</span> -->
                    </h3>
                    <div class="card-toolbar">
                        <!--begin::Menu-->
                        <button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                            <i class="ki-duotone ki-category fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></i>            </button>
                        
            <!--begin::Menu 2-->
            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">Quick Actions</div>
                </div>
                <!--end::Menu item-->

                <!--begin::Menu separator-->
                <div class="separator mb-3 opacity-75"></div>
                <!--end::Menu separator-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <a href="#" class="menu-link px-3">
                        New Ticket
                    </a>
                </div>
                <!--end::Menu item-->
                
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <a href="#" class="menu-link px-3">
                        New Customer
                    </a>
                </div>
                <!--end::Menu item-->

                <!--begin::Menu item-->
                <div class="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start">
                    <!--begin::Menu item-->
                    <a href="#" class="menu-link px-3">
                        <span class="menu-title">New Group</span>
                        <span class="menu-arrow"></span>
                    </a>
                    <!--end::Menu item-->

                    <!--begin::Menu sub-->
                    <div class="menu-sub menu-sub-dropdown w-175px py-4">
                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <a href="#" class="menu-link px-3">
                                Admin Group
                            </a>
                        </div>
                        <!--end::Menu item-->

                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <a href="#" class="menu-link px-3">
                                Staff Group
                            </a>
                        </div>
                        <!--end::Menu item-->

                        <!--begin::Menu item-->            
                        <div class="menu-item px-3">
                            <a href="#" class="menu-link px-3">
                                Member Group
                            </a>
                        </div>
                        <!--end::Menu item-->
                    </div>
                    <!--end::Menu sub-->
                </div>
                <!--end::Menu item-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <a href="#" class="menu-link px-3">
                        New Contact
                    </a>
                </div>
                <!--end::Menu item-->

                <!--begin::Menu separator-->
                <div class="separator mt-3 opacity-75"></div>
                <!--end::Menu separator-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <div class="menu-content px-3 py-3">
                        <a class="btn btn-primary  btn-sm px-4" href="#">
                            Generate Reports
                        </a>
                    </div>
                </div>
                <!--end::Menu item-->
            </div>
            <!--end::Menu 2-->
                        <!--end::Menu-->
                    </div>
                </div>
                <!--end::Header-->

                <!--begin::Body-->
                <div class="card-body py-3">
                    <!--begin::Table container-->
                    <div class="table-responsive">
                        <!--begin::Table-->
                        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <!--begin::Table head-->
                            <thead>
                                <tr class="fw-bold text-muted">
                                    <th class="w-25px">
                                        <div class="form-check form-check-sm form-check-custom form-check-solid">
                                            <input class="form-check-input" type="checkbox" value="1" data-kt-check="true" data-kt-check-target=".widget-13-check"/>
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
                                    :data = "this.$props.banks" 
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

    import RowTable from './RowTable.vue'
    // import Api from '../../../ApiRest.js'
    // import Utilits from '../../../Utilits.js'
    // import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    // import { ref } from 'vue'


    export default{

        props:{
            banks:{
                type: Array
            },
            dataFetched:{
                type: Boolean
            }
        },


        data(){
            return{
                // banks:ref([]),
                // dataFetched: false
            }
        },

        components:{   
            RowTable,
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
            }
        },



    }

</script>