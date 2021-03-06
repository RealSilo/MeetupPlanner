class Event < ActiveRecord::Base
  validates :name, presence: { message: "can't be blank" }
  validates :event_type, presence: { message: "can't be blank" }
  validates :host, presence: { message: "can't be blank" }
  validates :start_date, presence: { message: "can't be blank" }
  validates :end_date, presence: { message: "can't be blank" }
  validates :guest_list, presence: { message: "can't be blank" }
  validates :location, presence: { message: "can't be blank" }

  def start_date_string
    start_date.to_datetime.iso8601
  end

  def start_date_string=(start_date_str)
    self.start_date = start_date_str
  end

  def end_date_string
    end_date.to_datetime.iso8601
  end

  def end_date_string=(end_date_str)
    self.end_date = end_date_str
  end

  private

    def start_date_can_not_be_in_the_past
      if deadline.present? && deadline < Time.zone.now
        errors.add(:start_date, "can't be in the past")
      end
    end

    def end_date_can_not_be_in_the_past
      if deadline.present? && deadline < Time.zone.now
        errors.add(:end_date, "can't be earlier than start date")
      end
    end
end
