EventApp
=========

Author: Mike Gray

Date: June 6, 2014

Purpose: Demo app based on the following wirefames:
	 
http://app.mockflow.com/view/bd9d29995b2e320c0ac0d1f5edb15a39

URL
--------------
A working sample of this app can be found at:
	http://www.chubtonepickups.com/event_app

Notes:
--------------
- Used CDN for script imports (though you may notice the actual script files in the 'vendor' folder, this was for dev only)
- Data displayed using ng-grid directive:
	https://angular-ui.github.io/ng-grid/
- Uses browser navigator to geolocate user (if available)
- If the user doesn't allow use of current location, feedback is displayed to enter a zip code instead
- Uses Google API to geolocate event instances
- Uses $q.all to batch multiple promises
- Uses Google API to calculate distance from user to events
- Uses Bootstrap for $dialog directive
- You may notice more use of ng-bind than curly braces. This is a way to prevent flickering and intermittent display of curly braces on mobile devices.
- You may also notice use of ng-if over ng-show/ng-hide. I like to use this to prevent adding to the DOM unless something is really needed.
- Uses Angular routing for bookmarking, deep-liking and navigation.
- One partial is re-used for adding and editing events, though a different controller is used for each funcitonality
- On the 'Add New' view, i displayed an example of filtering a list while typing. Though not practical in a desktop browser, it works very well on mobile devices where a combo-box/selector is difficult to use.


Other comments:
--------------
This was a fun exercise. 
I had not used ng-grid much in the past, and had heard not so great things about it.
In all honestly, I was pleasantly surprised that ng-grid was powerful and easy to use!

This was also created in JetBrain's WebStorm8 IDE.
I have checked in the project files for WebStorm so it can be easily imported into the same editor for viewing.

To install Karma support in WebStorm
Make sure you have the following:

npm install -g karma
npm install -g karma-cli
npm install -g karma-jasmine
npm install -g phantom-js
npm install -g karma-chrome-launcher
npm install -g karma-coverage
npm install -g karma-junit-reporter
npm install -g angularjs

Open View > Tool Windows > Terminal

Type:
karma init karma.conf.js

Choose - jasmine, no requirejs, Chrome,  test/**/*Spec,js, no exclusions, and no for watch on change

This creates the karma configuration file in the root of your project

