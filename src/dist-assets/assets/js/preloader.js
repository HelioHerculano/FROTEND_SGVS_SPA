function showLoader() {
    setTimeout(function() {
        $('.loader-bg').fadeIn();
    }, 500);
}

function hideLoader() {
    setTimeout(function() {
        $('.loader-bg').fadeOut();
    }, 500);
}