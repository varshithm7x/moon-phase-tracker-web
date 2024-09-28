Module.register("MMM-moonphases.co.uk", {
    // Module config defaults.
    defaults: {
        width: "175px",
        height: "260px",
        updateInterval: 60 * 60 * 400, // 4 hours
    },
  
    // Define start sequence.
    start: function() {
      Log.info("Starting module: " + this.name);
      var self = this;
      setInterval(function() {
        self.updateDom();
      }, this.config.updateInterval);
    },
  
    getDom: function() {
      var wrapper = document.createElement("div");
  
      var frame = document.createElement("iframe");
      frame.src = "https://tonymorris-mm.github.io/MMM-moonphases.co.uk/moon-phases.html";
      frame.class = "moon-phases-iframe";
      frame.allowtransparency = "true";
      frame.frameBorder = "0";
      frame.style = "width: " + this.config.width + "; height: " + this.config.height + ";";
  
      wrapper.appendChild(frame);
  
      return wrapper;
    }, 
});