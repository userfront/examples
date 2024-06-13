class Api::DataController < ApplicationController
  before_action :authorized

  def index
    render json: {
      current_user: current_user
    }
  end
end
