
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
        }


}