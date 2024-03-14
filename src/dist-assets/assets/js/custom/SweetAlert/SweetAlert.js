export default {
  Alert(title, message, icon, modal = "", form_id = "") {
    // Show popup confirmation
    Swal.fire({
      title: `${title}`,
      text: `${message}`,
      icon: `${icon}`,
      buttonsStyling: true,
      showConfirmButton: true,
      // timer: 2000,
    }).then(function (result) {
      if (result.dismiss) {
        let form = document.getElementById(`${form_id}`);
        $(`${modal}`).modal("hide");
        // $('').modal('hide')
        if (form_id != "") form.reset();
      }
    });
  },

  AlertWithoutConfirmation(title, message, icon, modal = "", form_id = "") {
    // Show popup confirmation
    Swal.fire({
      title: `${title}`,
      text: `${message}`,
      icon: `${icon}`,
      buttonsStyling: false,
      showConfirmButton: false,
      timer: 2000,
    }).then(function (result) {
      if (result.dismiss) {
        let form = document.getElementById(`${form_id}`);
        $(`${modal}`).modal("hide");
        // $('').modal('hide')
        if (form_id != "") form.reset();
      }
    });
  },

  AlertOption() {
    Swal.fire({
      icon: "warning",
      title: "Pretende imprimir a carta?",
      showCancelButton: true,
      confirmButtonColor: "#0CC27E",
      cancelButtonColor: "#FF586B",
      confirmButtonText: "Sim, pretendo!",
      cancelButtonText: "Não, cancelar!",
      confirmButtonClass: "btn btn-success mr-5",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
    }).then(function (result) {
      if (result.dismiss == "cancel") {
      } else {
      }
    });
  },
};
