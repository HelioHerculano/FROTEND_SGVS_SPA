
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
          enableTime: true,
          altFormat: "d F, Y",
          dateFormat: "Y-m-d H:i",
          locale: "pt"
        });
        },

        // initTime(){
        //     $('#init_time').flatpickr({
        //       enableTime: true,
        //       dateFormat: "H:i",
        //     });
        // }


}