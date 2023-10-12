<template>
  <!--begin::Sidebar-->
  <div
    id="kt_app_sidebar"
    class="app-sidebar flex-column"
    data-kt-drawer="true"
    data-kt-drawer-name="app-sidebar"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
    style="background-color: rgb(87, 87, 195)"
  >
    <!--begin::Logo-->
    <div
      class="app-sidebar-logo px-6"
      id="kt_app_sidebar_logo"
      style="border-bottom: 1px dashed #ffffff"
    >
      <!--begin::Logo image-->
      <a href="index.html">
        <img
          alt="Logo"
          src="assets/media/logos/default-dark.svg"
          class="h-25px app-sidebar-logo-default"
        />

        <img
          alt="Logo"
          src="assets/media/logos/default-small.svg"
          class="h-20px app-sidebar-logo-minimize"
        />
      </a>
      <!--end::Logo image-->

      <!--begin::Sidebar toggle-->
      <!--begin::Minimized sidebar setup:
            if (isset($_COOKIE["sidebar_minimize_state"]) && $_COOKIE["sidebar_minimize_state"] === "on") { 
                1. "src/js/layout/sidebar.js" adds "sidebar_minimize_state" cookie value to save the sidebar minimize state.
                2. Set data-kt-app-sidebar-minimize="on" attribute for body tag.
                3. Set data-kt-toggle-state="active" attribute to the toggle element with "kt_app_sidebar_toggle" id.
                4. Add "active" class to to sidebar toggle element with "kt_app_sidebar_toggle" id.
            }
        -->
      <div
        id="kt_app_sidebar_toggle"
        class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="app-sidebar-minimize"
      >
        <i class="ki-duotone ki-double-left fs-2 rotate-180"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </div>
      <!--end::Sidebar toggle-->
    </div>
    <!--end::Logo-->
    <!--begin::sidebar menu-->
    <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
      <!--begin::Menu wrapper-->
      <div
        id="kt_app_sidebar_menu_wrapper"
        class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
        data-kt-scroll="true"
        data-kt-scroll-activate="true"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
        data-kt-scroll-wrappers="#kt_app_sidebar_menu"
        data-kt-scroll-offset="5px"
        data-kt-scroll-save-state="true"
      >
        <!--begin::Menu-->
        <div
          class="menu menu-column menu-rounded menu-sub-indention px-3"
          id="#kt_app_sidebar_menu"
          data-kt-menu="true"
          data-kt-menu-expand="false"
        >
          <!--begin:Menu item-->
          <div
            data-kt-menu-trigger="click"
            class="menu-item here show menu-accordion"
          >
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-element-11 fs-2"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                  ><span class="path4"></span></i></span
              ><span class="menu-title">Dashboards</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link-->
                <a class="menu-link active" href="index.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Exames</span>
                </a>
                <!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="dashboards/ecommerce.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Pessoal( V&S )</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item-->
              <div class="menu-item">
                <div class="menu-content">
                  <a
                    class="btn btn-flex btn-color-primary d-flex flex-stack fs-base p-0 ms-2 mb-2 toggle collapsible collapsed"
                    data-bs-toggle="collapse"
                    href="#kt_app_sidebar_menu_dashboards_collapse"
                    data-kt-toggle-text="Mostrar alguns"
                  >
                    <span data-kt-toggle-text-target="true"
                      >Mostrar mais de 12</span
                    >
                    <i class="ki-duotone ki-minus-square toggle-on fs-2 me-0"
                      ><span class="path1"></span><span class="path2"></span></i
                    ><i class="ki-duotone ki-plus-square toggle-off fs-2 me-0"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->
          <div class="menu-item pt-5">
            <!--begin:Menu content-->
            <div class="menu-content">
              <span
                class="menu-heading fw-bold text-uppercase fs-7"
                style="color: #ffffff !important"
                >Pages</span
              >
            </div>
            <!--end:Menu content-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-gear fs-2x"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span></i></span
              ><span class="menu-title">Gestão</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link-->
                <RouterLink class="menu-link" to="/bancos">
                  <span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Bancos </span>
                </RouterLink>
                <!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="pages/user-profile/projects.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Horários</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="pages/user-profile/campaigns.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Categorias</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="pages/user-profile/documents.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Salarios</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="pages/user-profile/followers.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Usuários</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->

              <!--end:Menu item-->
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-geolocation-home fs-2x">
                  <span class="path1"></span>
                  <span class="path2"></span> </i></span
              ><span class="menu-title">Locais de exames</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link-->
                <RouterLink class="menu-link" to="/LocaisExames"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Escolas</span>
                </RouterLink>
                <!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Salas</span></a
                ><!--end:Menu link-->
              </div>
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->

          <!--end:Menu item--><!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-people fs-2x"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span><span class="path4"></span
                  ><span class="path5"></span></i></span
              ><span class="menu-title">Pessoal(V&S)</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/overview.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Registar</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Visualizar</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Alocar</span></a
                ><!--end:Menu link-->
              </div>
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->

          <!--end:Menu item--><!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-document fs-2x"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span><span class="path4"></span
                  ><span class="path5"></span></i></span
              ><span class="menu-title">Exames</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/overview.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Registar</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Visualizar</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Alocar</span></a
                ><!--end:Menu link-->
              </div>
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->

          <!--end:Menu item--><!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
            <!--begin:Menu link--><span class="menu-link"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-tablet-book fs-2x"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span><span class="path4"></span
                  ><span class="path5"></span></i></span
              ><span class="menu-title">Relatorios</span
              ><span class="menu-arrow"></span></span
            ><!--end:Menu link--><!--begin:Menu sub-->
            <div class="menu-sub menu-sub-accordion">
              <!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/overview.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Pessoal</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
              <div class="menu-item">
                <!--begin:Menu link--><a
                  class="menu-link"
                  href="account/settings.html"
                  ><span class="menu-bullet"
                    ><span class="bullet bullet-dot"></span></span
                  ><span class="menu-title">Exames</span></a
                ><!--end:Menu link-->
              </div>
              <!--end:Menu item--><!--begin:Menu item-->
            </div>
            <!--end:Menu sub-->
          </div>
          <!--end:Menu item--><!--begin:Menu item-->

          <!--end:Menu item--><!--begin:Menu item-->
          <div class="menu-item">
            <!--begin:Menu link--><a
              class="menu-link"
              href="https://preview.keenthemes.com/html/metronic/docs"
              target="_blank"
              ><span class="menu-icon"
                ><i class="ki-duotone ki-user-tick fs-2x"
                  ><span class="path1"></span
                  ><span class="path2"></span></i></span
              ><span class="menu-title">Confirmações</span></a
            ><!--end:Menu link-->
          </div>
        </div>
        <!--end::Menu-->
      </div>
      <!--end::Menu wrapper-->
    </div>
    <!--end::sidebar menu-->
    <!--begin::Footer-->
    <div
      class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
      id="kt_app_sidebar_footer"
    >
      <a
        href="https://preview.keenthemes.com/html/metronic/docs"
        class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-dismiss-="click"
        title="200+ in-house components and 3rd-party plugins"
      >
        <span class="btn-label"> Docs & Components </span>

        <i class="ki-duotone ki-document btn-icon fs-2 m-0"
          ><span class="path1"></span><span class="path2"></span
        ></i>
      </a>
    </div>
    <!--end::Footer-->
  </div>
  <!--end::Sidebar-->
</template>
