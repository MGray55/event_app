event_app
=========

EventApp
--------------

Author: Mike Gray

Date: June 6, 2014

Purpose: Demo app based on the following wirefames:
	 http://app.mockflow.com/view/bd9d29995b2e320c0ac0d1f5edb15a39


Notes:
--------------
- Used CDN for script imports (though you may notice the actual script files in the 'vendor' folder, this was for dev only)
- Uses browser navigator to geolocate user (if available)
- Uses Google API to geolocate event instances
- Uses $q.all to batch multiple promises
- Uses Google API to calculate distance from user to events
- Uses Bootstrap for $dialog directive
- You may notice more use of ng-bind than curly braces. This is a way to prevent flickering and intermittent display of curly braces on mobile devices.
- Uses Angular routing for bookmarking, deep-liking and navigation.

URL
--------------
A working sample of this app can be found at:
	http://www.chubtonepickups.com/event_app