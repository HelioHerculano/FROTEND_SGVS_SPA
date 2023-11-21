
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
        $('#init_date').flatpickr({
            altInput: true,
            altFormat: "d F, Y",
            dateFormat: "Y-m-d",
        });
        },

        initTime(){
            $('#init_time').flatpickr({
              enableTime: true,
              noCalendar:true,
              dateFormat: "H:i",
            });
        }


}