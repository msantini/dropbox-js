# Client Library for the Dropbox API

This is a JavaScript client library for the Dropbox API,
[written in CoffeeScript](https://github.com/dropbox/dropbox-js/blob/master/doc/coffee_faq.md),
suitable for use in both modern browsers and in server-side code running under
[node.js](http://nodejs.org/).


## Supported Platforms

This library is tested against the following JavaScript platforms

* [node.js](http://nodejs.org/) 0.6 and 0.8
* [Chrome](https://www.google.com/chrome) 23
* [Firefox](www.mozilla.org/firefox) 17
* Internet Explorer 9

Keep in mind that the versions above are not hard requirements.


## Installation and Usage

The
[getting started guide](https://github.com/dropbox/dropbox-js/blob/master/doc/getting_started.md)
will help you get your first dropbox.js application up and running.

Peruse the source code of the
[sample apps](https://github.com/dropbox/dropbox-js/tree/master/samples),
and borrow as much as you need.

The
[dropbox.js API reference](http://coffeedoc.info/github/dropbox/dropbox-js/master/class_index.html)
can be a good place to bookmark while building your application.

If you run into a problem, take a look at
[the dropbox.js GitHub issue list](https://github.com/dropbox/dropbox-js/issues).
Please [open a new issue](https://github.com/dropbox/dropbox-js/issues/new)
if your problem wasn't already reported.


## Versioning

This project mostly follows semantic versioning.

Until the library reaches version 1.0, changes to the public API will always
carry a minor version bump, such as going from 0.7.2 to 0.8.0. Patch releases
(e.g. 0.8.0 -> 0.8.1) may introduce new features that don't break the public
API.


## Development

This library is written in CoffeeScript.
[This document](https://github.com/dropbox/dropbox-js/blob/master/doc/coffee_faq.md)
can help you understand if that matters to you.

The
[development guide](https://github.com/dropbox/dropbox-js/blob/master/doc/development.md)
will make your life easier if you need to change the source code.


## Platform-Specific Issues

This lists the most serious problems that you might run into while using
`dropbox.js`. See
[the GitHub issue list](https://github.com/dropbox/dropbox-js/issues) for a
full list of outstanding problems.

### node.js

Reading and writing binary files is currently broken.
[This issue](https://github.com/dropbox/dropbox-js/issues/28) will be fixed in
a future release.

### Chrome Applications

The current version of the built-in Chrome authentication driver doesn't work
on new-style Chrome Applications.
[This issue](https://github.com/dropbox/dropbox-js/issues/38) will be fixed in
a future release.

### Internet Explorer 9

The library only works when used from `https://` pages, due to
[these issues](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx).

Reading and writing binary files is unsupported.

At the moment, there are no plans for fixing these issues.


## Copyright and License

The library is Copyright (c) 2012 Dropbox Inc., and distributed under the MIT
License.
