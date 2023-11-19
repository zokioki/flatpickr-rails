# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'flatpickr/version'

Gem::Specification.new do |spec|
  spec.name          = 'flatpickr'
  spec.version       = Flatpickr::VERSION
  spec.authors       = ['Zoran']

  spec.summary       = %q{Flatpickr packaged for use in Rails projects.}
  spec.homepage      = 'https://github.com/zokioki/flatpickr-rails'
  spec.license       = 'MIT'

  spec.files         = Dir['*.{md,txt}', '{lib,vendor}/**/*']
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 2.0'
  spec.add_development_dependency 'rake', '~> 13.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
end
