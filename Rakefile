# frozen_string_literal: true

require 'bundler/gem_tasks'
require 'rspec/core/rake_task'
require 'flatpickr/version'

RSpec::Core::RakeTask.new(:spec)

task default: :spec

namespace :flatpickr do
  namespace :assets do
    desc 'Update Flatpickr assets from source.'
    task update: :clean do
      version = ARGV[1] || "v#{Flatpickr::VERSION.sub(/.\d+$/, '')}"

      sh 'git clone git@github.com:flatpickr/flatpickr.git flatpickr_source'
      sh "cd flatpickr_source && git checkout tags/#{version}"
      sh 'cd flatpickr_source && npm install && npm run build:pre && npm run build:build'

      sh 'cp flatpickr_source/dist/flatpickr.js vendor/assets/javascripts/flatpickr.js'
      sh 'cp -R flatpickr_source/dist/plugins/ vendor/assets/javascripts/flatpickr/plugins/'
      sh 'cd vendor/assets/javascripts/flatpickr/plugins/ && find . -name "*.css" -type f -delete'
      sh 'cp -R flatpickr_source/dist/l10n/ vendor/assets/javascripts/flatpickr/l10n/'

      sh 'cp flatpickr_source/dist/flatpickr.css vendor/assets/stylesheets/flatpickr.css'
      sh 'cp -R flatpickr_source/dist/plugins/ vendor/assets/stylesheets/flatpickr/plugins/'
      sh 'cd vendor/assets/stylesheets/flatpickr/plugins/ && find . -name "*.js" -type f -delete'
      sh 'cp -R flatpickr_source/dist/themes/ vendor/assets/stylesheets/flatpickr/themes/'
      sh 'cp flatpickr_source/dist/ie.css vendor/assets/stylesheets/flatpickr/ie.css'

      puts "\n===============================\n"
      puts "ASSETS UPDATED to #{version}! ✨"
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
