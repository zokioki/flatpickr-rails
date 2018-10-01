# flatpickr

[![Gem Version](https://badge.fury.io/rb/flatpickr.svg)](https://badge.fury.io/rb/flatpickr)

[Flatpickr](https://github.com/flatpickr/flatpickr) is a lightweight and powerful datetimepicker with no dependencies. This gem packages flatpickr's assets for drop-in use in Rails applications.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'flatpickr'
```

And then execute:

```bash
$ bundle
```

In your application.css, add the following:

```
*= require flatpickr

/* Optionally, you can include any of the flatpickr themes by adding in their styles, like so: */
*= require flatpickr/themes/dark
```

And in your application.js:

```js
//= require flatpickr

document.addEventListener('DOMContentLoaded', function() {
  flatpickr('.your-selector');
})
```

#### Using Plugins

Flatpickr provides plugins which expand the library's functionality. To include the `confirmDate` plugin, for example, you must require the necessary assets and specify the plugin during initialization:

In your application.css:
```
*= require flatpickr
*= require flatpickr/plugins/confirmDate/confirmDate
```

In application.js:
```js
//= require flatpickr
//= require flatpickr/plugins/confirmDate/confirmDate

document.addEventListener('DOMContentLoaded', function() {
  flatpickr('.your-selector', {
    enableTime: true,
    plugins: [
      new confirmDatePlugin({})
    ]
  })
})
```

See [flatpickr's official docs](https://flatpickr.js.org/) for more configuration and usage details.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
