$(document).on('turbolinks:load', function() {

  //$('[data-behavior="event-submit-button"]').prop('disabled', true);

  $('#newEvent').formValidation({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      'event[name]': {
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
      'event[event_type]': {
        validators : {
          notEmpty: {
            message: 'Event type is required'
          },
          stringLength: {
            max: 64,
            message: 'The name must be less than 64 characters long'
          }
        }
      },
      'event[host]': {
        validators: {
          notEmpty: {
            message: 'The username is required'
          },
          stringLength: {
            min: 4,
            max: 32,
            message: 'The username must be more than 4 and less than 32 characters long'
          }
        }
      },
      'event[start_date]': {
        validators: {
          notEmpty: {
            message: 'The start date is required'
          },
          date: {
            format: 'MM/DD/YYYY hh:mm A',
            message: 'The date is not a valid'
          }
        }
      },
      'event[end_date]': {
        validators: {
          notEmpty: {
            message: 'The start date is required'
          },
          date: {
            format: 'MM/DD/YYYY hh:mm A',
            message: 'The date is not a valid'
          }
        }
      },
      'event[guest_list]': {
        validators: {
          notEmpty: {
            message: 'You have to add at least one guest'
          },
          stringLength: {
            max: 32
          }
        }
      },
      'event[location]': {
        validators: {
          notEmpty: {
            message: 'Location is required'
          }
        }
      },
      'event[message]': {
        validators: {
          stringLength: {
            max: 256
          }
        }
      }
    }
  })
  .on('success.validator.fv', function(e, data) {
    if (data.field === 'event[start_date]' && data.validator === 'date' && data.result.date) {
      // The eventDate field passes the date validator
      // We can get the current date as a Javascript Date object
      var formStartDate = moment($('[data-behavior="event-start-date"]').val());
      var momentTime = moment();
      // If the selected date is Sunday
      if (momentTime > formStartDate) {
        // Treat the field as invalid
        data.fv
            .updateStatus(data.field, data.fv.STATUS_INVALID, data.validator)
            .updateMessage(data.field, data.validator, "Event can't start in the past");
      } else {
        // Reset the message
        data.fv.updateMessage(data.field, data.validator, 'The date is not valid');
      }
    }
    else if (data.field === 'event[end_date]' && data.validator === 'date' && data.result.date) {
      // The eventDate field passes the date validator
      // We can get the current date as a Javascript Date object
      var formEndDate = moment($('[data-behavior="event-end-date"]').val());
      var momentTime = moment();
      // If the selected date is Sunday
      if (momentTime > formEndDate) {
        // Treat the field as invalid
        data.fv
            .updateStatus(data.field, data.fv.STATUS_INVALID, data.validator)
            .updateMessage(data.field, data.validator, "Event end date must be after the start date");
      } else {
        // Reset the message
        data.fv.updateMessage(data.field, data.validator, 'The date is not valid');
      }
    }
  });

  $('#start-date-group').on('dp.change dp.show', function(e) {
    $('#newEvent').formValidation('revalidateField', 'event[start_date]');
  });

  $('#end-date-group').on('dp.change dp.show', function(e) {
    $('#newEvent').formValidation('revalidateField', 'event[end_date]');
  });

  $(function () {
    $('[data-behavior="event-start-date"]').datetimepicker({
      sideBySide: true,
      format: 'MM/DD/YYYY hh:mm A',
      stepping: 15,
      widgetPositioning: { vertical: 'bottom' }
    });

    $('[data-behavior="event-end-date"]').datetimepicker({
      sideBySide: true,
      format: 'MM/DD/YYYY hh:mm A',
      stepping: 15,
      widgetPositioning: { vertical: 'bottom' }
    });
  });

  $(document).on('click', '[data-behavior="event-submit-button"]', function (e) {
    e.preventDefault();
    var startDateField = $('[data-behavior="event-start-date"]');
    var endDateField = $('[data-behavior="event-end-date"]');
    var startLocalMoment = moment(startDateField.val());
    var endLocalMoment = moment(endDateField.val());
    var startDateRails = startLocalMoment.toISOString();
    var endDateRails = endLocalMoment.toISOString();
    startDateField.val(startDateRails);
    endDateField.val(endDateRails);
    $('[data-behavior="new-event-form"]').submit();
  });
});