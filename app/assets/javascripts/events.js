$(document).on('turbolinks:load', function() {
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
            min: 6,
            max: 32,
            message: 'The username must be more than 6 and less than 32 characters long'
          }
        }
      },
      'event[start_date]': {
        validators: {
          notEmpty: {
            message: 'The start date is required'
          }
        }
      },
      'event[end_date]': {
        validators: {
          notEmpty: {
            message: 'The start date is required'
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

  $(document).on('click', '[data-behavior="event-submit-button"]', function (e){
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