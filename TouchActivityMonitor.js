Ext.define('Ext.ux.TouchActivityMonitor', {
    singleton   : true,

    ui          : null,
    runner      : null,
    task        : null,
    lastActive  : null,

    ready       : false,
    verbose     : false,
    interval    : (1000 * 60 * 1), //1 minute
    maxInactive : (1000 * 60 * 5), //5 minutes

    init : function(config) {
        if (!config) { config = {}; }

        Ext.apply(this, config, {
            runner     : new Ext.util.TaskRunner(),
            ui         : Ext.getBody(),
            task       : {
                run      : this.monitorUI,
                interval : config.interval || this.interval,
                maxInactive : config.maxInactive || this.maxInactive,
                scope    : this
            }
        });

        this.ready = true;
    },

    isReady : function() {
        return this.ready;
    },

    isActive   : Ext.emptyFn,
    isInactive : Ext.emptyFn,

    start : function() {
        if (!this.isReady()) {
            this.log('Please run TouchActivityMonitor.init()');
            return false;
        }

        this.ui.on(['touchstart', 'touchend', 'touchmove', 'swipe', 'dragstart', 'drag', 'dragend', 'tap', 'singletap', 'doubletap', 'longpress', 'pinch', 'rotate'], this.captureActivity, this);


        this.lastActive = new Date();
        this.log('ActivityMonitor has been started.');
        this.log('Max inactivity time is as follows');
        this.log(this.maxInactive)

        this.runner.start(this.task);
    },

    stop : function() {
        if (!this.isReady()) {
            this.log('Please run TouchActivityMonitor.init()');
            return false;
        }

        this.runner.stop(this.task);
        this.lastActive = null;


        this.ui.un(['touchstart', 'touchend', 'touchmove', 'swipe', 'dragstart', 'drag', 'dragend', 'tap', 'singletap', 'doubletap', 'longpress', 'pinch', 'rotate'], this.captureActivity, this);

        this.log('TouchActivityMonitor has been stopped.');
    },

    captureActivity : function(eventObj, el, eventOptions) {
        this.lastActive = new Date();
    },

    monitorUI : function() {
        var now      = new Date(),
            inactive = (now - this.lastActive);

        if (inactive >= this.maxInactive) {
            this.log(this.maxInactive);
            this.log('MAXIMUM INACTIVE TIME HAS BEEN REACHED');
            this.stop(); //remove event listeners
            this.isInactive();
        }
        else {
            this.log('CURRENTLY INACTIVE FOR ' + inactive + ' (ms)');
            this.isActive();
        }
    },

    log : function(msg) {
        if (this.verbose) {
            window.console.log(msg);
        }
    }

});
