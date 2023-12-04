# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "powershop"
set :repo_url, "git@github.com:honest-fox/powershop.git"

set :composer_working_dir, -> { fetch(:release_path) + "bedrock"}

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, "bedrock/.env", "bedrock/web/robots.txt"

# Default value for linked_dirs is []
append :linked_dirs, "bedrock/web/app/uploads", "bedrock/web/app/plugins/all-in-one-wp-migration/storage"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute :sudo, 'service php7.0-fpm reload'
      info "php7.0-fpm reloaded"
    end
  end

  after 'deploy:publishing', 'deploy:restart'
end