# flatpickr

[![Gem Version](https://badge.fury.io/rb/flatpickr.svg)](https://badge.fury.io/rb/flatpickr)

[Flatpickr](https://github.com/chmln/flatpickr) is a lightweight and powerful datetimepicker with no dependencies. This gem packages flatpickr's assets for drop-in use in Rails applications.

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

```sass
*= require flatpickr

/* Optionally, you can include any of the flatpickr themes by adding in their styles, like so: */
*= require flatpickr/themes/dark
```

And in your application.js:

```js
//= require flatpickr
//
// Locales can be included like so:
//= require flatpickr/l10n/da
```

To initialize flatpickr:

```js
flatpickr('.your-selector');

// if using jQuery
$('.your-selector').flatpickr();
```

See [flatpickr's docs](https://chmln.github.io/flatpickr/) for configuration and usage info.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
