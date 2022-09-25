Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000' #TODO: Fix security!!!!
    resource '*', headers: :any, methods: [:get, :post, :patch, :delete]
  end
end
