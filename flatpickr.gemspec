# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'flatpickr/version'

Gem::Specification.new do |spec|
  spec.name          = 'flatpickr'
  spec.version       = Flatpickr::VERSION
  spec.authors       = ['Zoran']
  spec.email         = ['zspesic@gmail.com']

  spec.summary       = %q{Flatpickr packaged for use in Rails projects.}
  spec.homepage      = 'https://github.com/zokioki/flatpickr-rails'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 2.0'
  spec.add_development_dependency 'rake', '~> 13.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
end
