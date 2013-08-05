var Login = function () {

    return {
        //main function to initiate the module
        init: function () {

            $('.login-form').validate({
                errorElement: 'label', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    remember: {
                        required: false
                    }
                },

                messages: {
                    username: {
                        required: "Username is required."
                    },
                    password: {
                        required: "Password is required."
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    $('.alert-error', $('.login-form')).show();
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.control-group').addClass('error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.control-group').removeClass('error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function (form) {
                    var $form = $(form),
                        data = {
                            username: $("#usernameLoginInput").val(),
                            password: $("#passwordLoginInput").val()
                        },
                        url = $form.attr('action'),
                        dispatchResponse = function(jqXhr){
                            var response = jqXhr.responseJSON,
                                status = jqXhr.status;
                            if(!response.hasOwnProperty('redirect_to')) {
                                //alert('An error occurred, please contact your administrator');
                                $("#loginAlertForm".modal('show'));
                                return false;
                            }
                            if(status == 200) {
                                document.location.href = (response.redirect_to == '') ? '/administration/connection' : response.redirect_to;
                                return true;
                            } else {
                                $("#loginAlertForm").modal('show');
                            }
                            return false;
                        };
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        data: data,
                        type: 'post',
                        statusCode: {
                            /**
                             * Handler for 500
                             */
                            400: function (jqXhr, satus, errorThorwn) {
                                console.log(arguments);
                                dispatchResponse(jqXhr);
                            },
                            401: function (jqXhr, satus, errorThorwn) {
                                console.log(arguments);
                                dispatchResponse(jqXhr);
                            },
                            403: function (jqXhr, satus, errorThorwn) {
                                console.log(arguments);
                                dispatchResponse(jqXhr);
                            },
                            404: function (jqXhr, satus, errorThorwn) {
                                console.log(arguments);
                                dispatchResponse(jqXhr);
                            },
                            200: function (data, status, jqXhr) {
                                console.log(arguments);
                                dispatchResponse(jqXhr);
                            }
                        },
                        beforeSend: function () {
                            $(document).trigger('loadinginit');
                        },
                        complete: function () {
                            $(document).trigger('loadingcomplete');
                        },
                        success: function (data, status, xhr) {
                            console.log(data);
                            $(document).trigger('loadingsuccess');
                            //document.location.href = "/administration/index"
                        },
                        error: function (status, xhr, errorThrown) {
                            // ignore this error since we already handle errors in special dedicated function
                        }
                    });
                }
            });

            // init modal without rendering it (for login failure alert
            $("#loginAlertForm").modal({
                show: false
            });

            $('.login-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('.login-form').validate().form()) {
                        window.location.href = "/administration/connection";
                    }
                    return false;
                }
            });

            $('.forget-form').validate({
                errorElement: 'label', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                },

                messages: {
                    email: {
                        required: "Email is required."
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit

                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.control-group').addClass('error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.control-group').removeClass('error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function (form) {
                    window.location.href = "/administration/account/forgot";
                }
            });

            $('.forget-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('.forget-form').validate().form()) {
                        window.location.href = "/administration/connection";
                    }
                    return false;
                }
            });

            jQuery('#forget-password').click(function () {
                jQuery('.login-form').hide();
                jQuery('.forget-form').show();
            });

            jQuery('#back-btn').click(function () {
                jQuery('.login-form').show();
                jQuery('.forget-form').hide();
            });

            $('.register-form').validate({
                errorElement: 'label', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    rpassword: {
                        equalTo: "#register_password"
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    tnc: {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    tnc: {
                        required: "Please accept TNC first."
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit

                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.control-group').addClass('error'); // set error class to the control group
                },

                success: function (label) {
                    label.closest('.control-group').removeClass('error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                        error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
                    } else {
                        error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
                    }
                },

                submitHandler: function (form) {
                    window.location.href = "/administration/account/register";
                }
            });

            jQuery('#register-btn').click(function () {
                jQuery('.login-form').hide();
                jQuery('.register-form').show();
            });

            jQuery('#register-back-btn').click(function () {
                jQuery('.login-form').show();
                jQuery('.register-form').hide();
            });
        }

    };

}();