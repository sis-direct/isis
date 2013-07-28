$(".btn-login","#loginModalForm").on('click', function() {
    var password = $(this).closest('form').find('input[type=password]').val();
    if(null == password || undefined == password) {
        return false;
    }
    if(password == '') {
        bootbox.alert("You must enter a password");
        return false;
    }
    bootbox.alert("Trying to re open session");
    return false;
});
$(".btn-disconnect","#loginModalForm").on('click', function() {
    bootbox.confirm('Do you really want to quit the application', function(e) {
        if(e) {
            document.location.href = '/administration/connection';
        }
    });
    return false;
});