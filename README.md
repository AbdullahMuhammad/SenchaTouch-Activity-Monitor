# SenchaTouch-Activity-Monitor

A sencha touch activity monitor inspired by arthurakay 
https://github.com/arthurakay/ExtJS-Activity-Monitor


Usage:

=====

Ext.ux.TouchActivityMonitor.init({ verbose : true });
Ext.ux.TouchActivityMonitor.start();

=====

Configs:

  - verbose (Boolean): Whether or not the ActivityMonitor() should output messages to the JavaScript console.
  - interval (Integer): How often (in millseconds) the monitorUI() method is executed after calling start()
  - maxInactive (Integer): The longest amount of time to consider the user "active" without regestering new mouse movement or keystrokes

  - isActive (Function): Called each time monitorUI() detects the user is currently active (defaults to Ext.emptyFn)
  - isInactive (Funtion): Called when monitorUI() detects the user is inactive (defaults to Ext.emptyFn)
