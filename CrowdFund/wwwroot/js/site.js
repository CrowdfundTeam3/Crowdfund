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


$('#project-list').ready(() => {
    viewProjects()
});

function viewProjects() {
    let title = $('#title').val();
    let description = $('#description').val();

    let requestData = {
        title: title,
        description: description,
    };

    $.ajax(
        {
            url: '/project/getall',
            type: POST,            
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (projects) {
                $('#project-list').html('');

                for (let i = 0; i < projects.length; i++) {
                    $('#project-list').append(`
                        <div class="col-sm-3">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="uploadedimages/@project.Photo" alt="Card image cap" width="286" height="180">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        @project.Title
                                    </h5>
                                    <p class="card-text">
                                        @project.Description
                                    </p>
                                    <a data-toggle="modal" href="#exampleModal" class="btn btn-secondary">Details</a>
                                </div>
                            </div>
                        </div>
                    `);
                }
                alert(JSON.stringify(data))
                window.open("/home", "_self")
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error from server: " + errorThrown);
            }
        }
    );
}





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

$('#login-btn').on('click', function () {
    let userEmail = $('#user-email').val();
    let password = $('#user-password').val();

    let loginOptions = {
        email: userEmail,
        password: password
    };

    $.ajax({
        url: '/home/login',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(loginOptions),
        success: function (data) {
            localStorage.setItem('userId', data.userId);
            $('#logout-btn').show();
        },
        error: function () {
            alert('Login denied');
        }
    });
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId');
    $('#logout-btn').hide();
});