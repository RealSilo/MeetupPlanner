module ApplicationHelper
  def bootstrap_alert_class_for(flash_type)
    {
      success: 'alert-success',
      error: 'alert-danger',
      danger: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-success'
    }[flash_type.to_sym] || flash_type.to_s
  end
end
