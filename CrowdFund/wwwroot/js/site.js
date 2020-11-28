// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if (getUserId()) {
    $('#logout-btn').show();
    $('#user-log-in').hide();
    $('#user-sign-up').hide();
}


function getUserId() {
    return localStorage.getItem('userId');
}


// Events

function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}



$('#clicked-category-button a').on('click', (e) => {
    let element = $(e.currentTarget);
    let category = element.html();
    categoryUrl = 'api/project/bycategory/' + category;
    viewProjects(categoryUrl);
});

$('#search-button').on('click', () => {

    let searchterm = $('#search-input').val();
    if (isNullOrWhitespace(searchterm)) {
        searchtermUrl = 'api/project/getall';
    }
    else {
        searchtermUrl = 'api/project/search/' + searchterm;
    }
    viewProjects(searchtermUrl);
});


function viewProjects(input) {
    let title = $('#title').val();
    let description = $('#description').val();
    let photo = $('#photo').val();    
    
    actionUrl = input;    
    console.log(actionUrl)

    let requestData = {
        title: title,
        description: description,
        photo: photo
    };
    $.ajax(
        {
            url: actionUrl,
            type: 'GET',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (projects) {
                $('#project-list').html('');

                $('#project-list').append(`
                    <div class="row" style="margin-top: 2%;">
                    </div>
                `);

                for (let i = 0; i < projects.length; i++) {
                    $('#project-list .row').append(`
                    <div class="col-md-3">
                        <div class="card d-inline-block" style="width: 18rem;">
                            <img class="card-img-top" src="uploadedimages/${projects[i].photo}" alt="Card image cap" width="286" height="180">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${projects[i].title}
                                </h5>
                                <p class="card-text">
                                    ${projects[i].description}
                                </p>
                                <a class="btn btn-secondary">Details</a>
                            </div>
                        </div>
                    </div>
                `);
                }
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
                localStorage.setItem('userId', data.id)
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
            localStorage.setItem('userId', data.id)
            $('#logout-btn').show();
            $('#login-user').hide();
            window.open("/Home/Index", "_self");
        },
        error: function () {
            alert('Login denied');
        }
    });
});

$('#logout-btn').on('click', function () {
    localStorage.removeItem('userId');
    window.open("/Home/Index", "_self");




});
