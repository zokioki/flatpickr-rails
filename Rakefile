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
      source_dir = 'node_modules/flatpickr'

      sh "npm install flatpickr@#{version}"

      sh "cp #{source_dir}/dist/flatpickr.js vendor/assets/javascripts/flatpickr.js"
      sh "cp -R #{source_dir}/dist/plugins/ vendor/assets/javascripts/flatpickr/plugins/"
      sh "cp -R #{source_dir}/dist/l10n/ vendor/assets/javascripts/flatpickr/l10n/"
      sh 'cd vendor/assets/javascripts/flatpickr/ && find . -not -name "*.js" -type f -delete'

      sh "cp #{source_dir}/dist/flatpickr.css vendor/assets/stylesheets/flatpickr.css"
      sh "cp -R #{source_dir}/dist/plugins/ vendor/assets/stylesheets/flatpickr/plugins/"
      sh "cp -R #{source_dir}/dist/themes/ vendor/assets/stylesheets/flatpickr/themes/"
      sh "cp #{source_dir}/dist/ie.css vendor/assets/stylesheets/flatpickr/ie.css"
      sh 'cd vendor/assets/stylesheets/flatpickr/ && find . -not -name "*.css" -type f -delete'

      puts "\n================================"
      puts "* ASSETS UPDATED to #{version}! 🔧 *"
      puts "================================"
    end

    desc 'Remove previous Flatpickr assets.'
    task :clean do
      sh 'rm -rf vendor'
      sh 'mkdir -p vendor/assets/stylesheets/flatpickr/'
      sh 'mkdir -p vendor/assets/javascripts/flatpickr/'
    end
  end
end
