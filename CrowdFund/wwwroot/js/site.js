// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if (getUserId()) {
    $('#logout-btn').show();
}


function getUserId() {
    return localStorage.getItem('userId');
}


// Events


$('#create-user').on('click', () => {
    addUser()
});

function addUser() {
    
    let actionUrl = '/api/user';
    let formData = {
        FirstName: $('#firstname').val(),
        LastName: $('#lastname').val(),
        Email: $('#email').val(),
        Password: $('#password').val(),
    };

    $.ajax(
        {
            url: actionUrl,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            type: "POST",
            success: function (data) {
                alert(JSON.stringify(data))
                window.open("/home", "_self")              
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
}

$('#login-user').on('click', function () {

    let actionUrl = '/api/user/login';
    let LoginOptions = {
        Email: $('#email2').val(),
        Password: $('#password2').val()
    };

    $.ajax({
        url: actionUrl,
        contentType: 'application/json',
        type: "POST",
        data: JSON.stringify(LoginOptions),
        success: function (data) {
            localStorage.setItem('userId', data.userId)
            $('#logout-btn').show();
            localStorage.setItem('userId', data.userId)
            $('#login-user').hide();
            window.open("/Home/Index", "_self");
        },
        error: function () {
            alert('Login denied');
        }
    });
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId')
    $('#logout-btn').hide();
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId')
    $('#login-user').show();

});
