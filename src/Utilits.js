
export default {

         showLoader() {
            setTimeout(function() {
                $('.loader-bg').fadeIn();
            }, 500);
        },
        
         hideLoader() {
            setTimeout(function() {
                $('.loader-bg').fadeOut();
            }, 500);
        },

        initDate(){
        $("#init_date").flatpickr({
          enableTime: false,
          altFormat: "d F, Y",
          dateFormat: "Y-m-d",
          locale: "pt"
        });
        },

        initTime(){
            $("#init_time").flatpickr({
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              time_24hr: true,
            });

            $("#init_time2").flatpickr({
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              time_24hr: true,
            });
        }


}