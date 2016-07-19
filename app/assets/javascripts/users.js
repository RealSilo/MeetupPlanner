$(document).on('turbolinks:load', function() {

  $('[data-behavior="new-registration-submit"]').prop('disabled', true);
  $('[data-behavior="new-session-submit"]').prop('disabled', true);


  $('#newRegForm').formValidation({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      'user[full_name]': {
        validators: {
          notEmpty: {
              message: 'The name is required'
          },
          stringLength: {
              min: 4,
              max: 32,
              message: 'The name must be more than 4 and less than 32 characters long'
          },
          regexp: {
              regexp: /^[a-zA-Z0-9_ ]+$/,
              message: 'The name can only consist of alphabetical, number, space and underscore'
          }
        }
      },
      'user[email]': {
        validators : {
          notEmpty: {
            message: 'Email is required'
          },
          emailAddress: {
            message: 'This input is not a valid email address'
          }
        }
      },
      'user[password]': {
        validators: {
          notEmpty: {
            message: 'The username is required'
          },
          stringLength: {
            min: 6,
            max: 32,
            message: 'The username must be more than 6 and less than 32 characters long'
          }
        }
      },
      'user[password_confirmation]': {
        validators: {
          identical: {
            field: 'user[password]',
            message: 'The password and its confirm are not the same'
          }
        }
      },
      'user[company]': {
        validators: {
          stringLength: {
            max: 32
          }
        }
      },
      'user[job_title]': {
        validators: {
          stringLength: {
            max: 32
          }
        }
      }
    }
  });

  $('#newSesForm').formValidation({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      'user[email]': {
        validators: {
          notEmpty: {
            message: 'Email is required'
          },
          emailAddress: {
            message: 'This input is not a valid email address'
          }
        }
      },
      'user[password]': {
        validators : {
          notEmpty: {
            message: 'Password is required'
          }
        }
      }
    }
  });
});