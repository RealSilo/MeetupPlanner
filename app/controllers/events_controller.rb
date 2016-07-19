class EventsController < ApplicationController
  before_action :authenticate_user!

  def index
    @events = Event.all.order(created_at: :desc)
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to events_path, notice: "Event successfully created!"
    else
      render :new
    end
  end

  private

  def event_params
    params.require(:event).permit(:name, :event_type, :host, :start_date, :start_date_string, :end_date, :end_date_string, :guest_list, :location, :message)
  end
end