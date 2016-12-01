require 'bundler/gem_tasks'
require 'rspec/core/rake_task'
require 'flatpickr/version'

RSpec::Core::RakeTask.new(:spec)

task :default => :spec

namespace :flatpickr do
  namespace :assets do
    desc 'Update Flatpickr\'s assets.'
    task update: :clean do
      version = ARGV[1] || "v#{Flatpickr::VERSION.sub(/.\d+$/, '')}"

      sh 'git clone git@github.com:chmln/flatpickr.git flatpickr_source'
      sh "cd flatpickr_source && git checkout tags/#{version}"

      sh 'cp flatpickr_source/dist/flatpickr.js vendor/assets/javascripts/flatpickr.js'
      sh 'cp -R flatpickr_source/dist/l10n/ vendor/assets/javascripts/flatpickr/l10n/'

      sh 'cp flatpickr_source/dist/flatpickr.min.css vendor/assets/stylesheets/flatpickr.css'
      sh 'cp -R flatpickr_source/dist/rtl/ vendor/assets/stylesheets/flatpickr/rtl/'
      sh 'cp -R flatpickr_source/dist/themes/ vendor/assets/stylesheets/flatpickr/themes/'

      puts "\n=*=*=*=*=*=*=*=*=*=*\n=* ASSETS UPDATED! *=\n=*=*=*=*=*=*=*=*=*=*\n"
    end

    desc 'Remove previous Flatpickr assets.'
    task :clean do
      sh 'rm -rf vendor'
      sh 'rm -rf flatpickr_source'
      sh 'mkdir -p vendor/assets/stylesheets/flatpickr/'
      sh 'mkdir -p vendor/assets/javascripts/flatpickr/'
    end
  end
end
