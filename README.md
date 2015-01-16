# Employee Register POC
I proof-of-concept project built on AngularJS 2.0. I played with the future version of [templating](https://github.com/angular/templating) and [dependency injection](https://github.com/angular/di.js) that is being discussed by the Angular team.

## Setup

1. `git clone`
2. `npm install`
3. `npm install -g gulp`
4. `npm install -g bower`
5. `bower install`

## Build and run

1. `gulp build serve`
2. Go to [http://localhost:8888/employees.html](http://localhost:8888/employees.html)

As all JavaScript files are written in ECMAScript 6, a tool called [Traceur](https://github.com/google/traceur-compiler) is used to compile them to ECMAScript 5 that we can use today. All compiled files are put into the /build/ folder.
