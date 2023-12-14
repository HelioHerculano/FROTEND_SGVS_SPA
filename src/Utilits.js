export default {
  showLoader() {
    setTimeout(function () {
      $(".loader-bg").fadeIn();
    }, 500);
  },

  hideLoader() {
    setTimeout(function () {
      $(".loader-bg").fadeOut();
    }, 500);
  },

  initDate() {
    $("#init_date").flatpickr({
      dateFormat: "Y-m-d",
    });
  },

  initTime() {
    flatpickr("#init_date", {
      allowInput: false,
      // altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      // defaultDate: 'today',
    });

    flatpickr("#init_date_filter", {
      allowInput: false,
      // altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      // defaultDate: 'today',
    });

    flatpickr("#init_time", {
      allowInput: false,
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      // clickOpens: true,
    });

    flatpickr("#init_time2", {
      allowInput: false,
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      // clickOpens: false,
    });

    // $("#init_time2").on("click", function () {
    //   $("#init_date").attr("disable");
    // });

    // $("#init_time").on("click", function () {
    //   $("#init_date").removeClass("active");
    // });
  },
};
