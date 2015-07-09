  /**
   * Call a jQuery method after some time.
   * -- Because $.fn.delay doesn't touch sync methods.
   *
   * @param {string} methodName
   *   jQuery method name to call
   * @param {…} arguments
   *   Optional, any number of arguments to pass to jQuery method
   * @param …{int}
   *   Amount of milliseconds to wait after previously queued time
   */
  jQuery.fn.delayed = function (methodName) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var timeout = args.pop();
    return this.delay(timeout).queue(function (next) {
      self[methodName].apply(self, args);
      next();
    });
  };
  
