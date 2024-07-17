(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpackageA/pages/common/vendor"],{

/***/ 274:
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ 275);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 275:
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 276)))

/***/ }),

/***/ 350:
/*!********************************************!*\
  !*** D:/work/jinliyuan/api/amap-wx.130.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {function AMapWX(a) {
  this.key = a.key;
  this.requestConfig = {
    key: a.key,
    s: "rsx",
    platform: "WXJS",
    appname: a.key,
    sdkversion: "1.2.0",
    logversion: "2.0"
  };
  this.MeRequestConfig = {
    key: a.key,
    serviceName: "https://restapi.amap.com/rest/me"
  };
}
AMapWX.prototype.getWxLocation = function (a, b) {
  wx.getLocation({
    type: "gcj02",
    success: function success(c) {
      c = c.longitude + "," + c.latitude;
      wx.setStorage({
        key: "userLocation",
        data: c
      });
      b(c);
    },
    fail: function fail(c) {
      wx.getStorage({
        key: "userLocation",
        success: function success(d) {
          d.data && b(d.data);
        }
      });
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getMEKeywordsSearch = function (a) {
  if (!a.options) return a.fail({
    errCode: "0",
    errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
  });
  var b = a.options,
    c = this.MeRequestConfig,
    d = {
      key: c.key,
      s: "rsx",
      platform: "WXJS",
      appname: a.key,
      sdkversion: "1.2.0",
      logversion: "2.0"
    };
  b.layerId && (d.layerId = b.layerId);
  b.keywords && (d.keywords = b.keywords);
  b.city && (d.city = b.city);
  b.filter && (d.filter = b.filter);
  b.sortrule && (d.sortrule = b.sortrule);
  b.pageNum && (d.pageNum = b.pageNum);
  b.pageSize && (d.pageSize = b.pageSize);
  b.sig && (d.sig = b.sig);
  wx.request({
    url: c.serviceName + "/cpoint/datasearch/local",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(e) {
      (e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({
        errCode: "0",
        errMsg: e
      });
    },
    fail: function fail(e) {
      a.fail({
        errCode: "0",
        errMsg: e.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getMEIdSearch = function (a) {
  if (!a.options) return a.fail({
    errCode: "0",
    errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
  });
  var b = a.options,
    c = this.MeRequestConfig,
    d = {
      key: c.key,
      s: "rsx",
      platform: "WXJS",
      appname: a.key,
      sdkversion: "1.2.0",
      logversion: "2.0"
    };
  b.layerId && (d.layerId = b.layerId);
  b.id && (d.id = b.id);
  b.sig && (d.sig = b.sig);
  wx.request({
    url: c.serviceName + "/cpoint/datasearch/id",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(e) {
      (e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({
        errCode: "0",
        errMsg: e
      });
    },
    fail: function fail(e) {
      a.fail({
        errCode: "0",
        errMsg: e.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getMEPolygonSearch = function (a) {
  if (!a.options) return a.fail({
    errCode: "0",
    errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
  });
  var b = a.options,
    c = this.MeRequestConfig,
    d = {
      key: c.key,
      s: "rsx",
      platform: "WXJS",
      appname: a.key,
      sdkversion: "1.2.0",
      logversion: "2.0"
    };
  b.layerId && (d.layerId = b.layerId);
  b.keywords && (d.keywords = b.keywords);
  b.polygon && (d.polygon = b.polygon);
  b.filter && (d.filter = b.filter);
  b.sortrule && (d.sortrule = b.sortrule);
  b.pageNum && (d.pageNum = b.pageNum);
  b.pageSize && (d.pageSize = b.pageSize);
  b.sig && (d.sig = b.sig);
  wx.request({
    url: c.serviceName + "/cpoint/datasearch/polygon",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(e) {
      (e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({
        errCode: "0",
        errMsg: e
      });
    },
    fail: function fail(e) {
      a.fail({
        errCode: "0",
        errMsg: e.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getMEaroundSearch = function (a) {
  if (!a.options) return a.fail({
    errCode: "0",
    errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
  });
  var b = a.options,
    c = this.MeRequestConfig,
    d = {
      key: c.key,
      s: "rsx",
      platform: "WXJS",
      appname: a.key,
      sdkversion: "1.2.0",
      logversion: "2.0"
    };
  b.layerId && (d.layerId = b.layerId);
  b.keywords && (d.keywords = b.keywords);
  b.center && (d.center = b.center);
  b.radius && (d.radius = b.radius);
  b.filter && (d.filter = b.filter);
  b.sortrule && (d.sortrule = b.sortrule);
  b.pageNum && (d.pageNum = b.pageNum);
  b.pageSize && (d.pageSize = b.pageSize);
  b.sig && (d.sig = b.sig);
  wx.request({
    url: c.serviceName + "/cpoint/datasearch/around",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(e) {
      (e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({
        errCode: "0",
        errMsg: e
      });
    },
    fail: function fail(e) {
      a.fail({
        errCode: "0",
        errMsg: e.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getGeo = function (a) {
  var b = this.requestConfig,
    c = a.options;
  b = {
    key: this.key,
    extensions: "all",
    s: b.s,
    platform: b.platform,
    appname: this.key,
    sdkversion: b.sdkversion,
    logversion: b.logversion
  };
  c.address && (b.address = c.address);
  c.city && (b.city = c.city);
  c.batch && (b.batch = c.batch);
  c.sig && (b.sig = c.sig);
  wx.request({
    url: "https://restapi.amap.com/v3/geocode/geo",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(d) {
      (d = d.data) && d.status && "1" === d.status ? a.success(d) : a.fail({
        errCode: "0",
        errMsg: d
      });
    },
    fail: function fail(d) {
      a.fail({
        errCode: "0",
        errMsg: d.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getRegeo = function (a) {
  function b(d) {
    var e = c.requestConfig;
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: c.key,
        location: d,
        extensions: "all",
        s: e.s,
        platform: e.platform,
        appname: c.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(g) {
        if (g.data.status && "1" == g.data.status) {
          g = g.data.regeocode;
          var h = g.addressComponent,
            f = [],
            k = g.roads[0].name + "\u9644\u8FD1",
            m = d.split(",")[0],
            n = d.split(",")[1];
          if (g.pois && g.pois[0]) {
            k = g.pois[0].name + "\u9644\u8FD1";
            var l = g.pois[0].location;
            l && (m = parseFloat(l.split(",")[0]), n = parseFloat(l.split(",")[1]));
          }
          h.provice && f.push(h.provice);
          h.city && f.push(h.city);
          h.district && f.push(h.district);
          h.streetNumber && h.streetNumber.street && h.streetNumber.number ? (f.push(h.streetNumber.street), f.push(h.streetNumber.number)) : f.push(g.roads[0].name);
          f = f.join("");
          a.success([{
            iconPath: a.iconPath,
            width: a.iconWidth,
            height: a.iconHeight,
            name: f,
            desc: k,
            longitude: m,
            latitude: n,
            id: 0,
            regeocodeData: g
          }]);
        } else a.fail({
          errCode: g.data.infocode,
          errMsg: g.data.info
        });
      },
      fail: function fail(g) {
        a.fail({
          errCode: "0",
          errMsg: g.errMsg || ""
        });
      }
    });
  }
  var c = this;
  a.location ? b(a.location) : c.getWxLocation(a, function (d) {
    b(d);
  });
};
AMapWX.prototype.getWeather = function (a) {
  function b(g) {
    var h = "base";
    a.type && "forecast" == a.type && (h = "all");
    wx.request({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      data: {
        key: d.key,
        city: g,
        extensions: h,
        s: e.s,
        platform: e.platform,
        appname: d.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(f) {
        if (f.data.status && "1" == f.data.status) {
          if (f.data.lives) {
            if ((f = f.data.lives) && 0 < f.length) {
              f = f[0];
              var k = {
                city: {
                  text: "\u57CE\u5E02",
                  data: f.city
                },
                weather: {
                  text: "\u5929\u6C14",
                  data: f.weather
                },
                temperature: {
                  text: "\u6E29\u5EA6",
                  data: f.temperature
                },
                winddirection: {
                  text: "\u98CE\u5411",
                  data: f.winddirection + "\u98CE"
                },
                windpower: {
                  text: "\u98CE\u529B",
                  data: f.windpower + "\u7EA7"
                },
                humidity: {
                  text: "\u6E7F\u5EA6",
                  data: f.humidity + "%"
                }
              };
              k.liveData = f;
              a.success(k);
            }
          } else f.data.forecasts && f.data.forecasts[0] && a.success({
            forecast: f.data.forecasts[0]
          });
        } else a.fail({
          errCode: f.data.infocode,
          errMsg: f.data.info
        });
      },
      fail: function fail(f) {
        a.fail({
          errCode: "0",
          errMsg: f.errMsg || ""
        });
      }
    });
  }
  function c(g) {
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: d.key,
        location: g,
        extensions: "all",
        s: e.s,
        platform: e.platform,
        appname: d.key,
        sdkversion: e.sdkversion,
        logversion: e.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(h) {
        if (h.data.status && "1" == h.data.status) {
          h = h.data.regeocode;
          if (h.addressComponent) var f = h.addressComponent.adcode;else h.aois && 0 < h.aois.length && (f = h.aois[0].adcode);
          b(f);
        } else a.fail({
          errCode: h.data.infocode,
          errMsg: h.data.info
        });
      },
      fail: function fail(h) {
        a.fail({
          errCode: "0",
          errMsg: h.errMsg || ""
        });
      }
    });
  }
  var d = this,
    e = d.requestConfig;
  a.city ? b(a.city) : d.getWxLocation(a, function (g) {
    c(g);
  });
};
AMapWX.prototype.getPoiAround = function (a) {
  function b(e) {
    e = {
      key: c.key,
      location: e,
      s: d.s,
      platform: d.platform,
      appname: c.key,
      sdkversion: d.sdkversion,
      logversion: d.logversion
    };
    a.querytypes && (e.types = a.querytypes);
    a.querykeywords && (e.keywords = a.querykeywords);
    wx.request({
      url: "https://restapi.amap.com/v3/place/around",
      data: e,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(g) {
        if (g.data.status && "1" == g.data.status) {
          if ((g = g.data) && g.pois) {
            for (var h = [], f = 0; f < g.pois.length; f++) {
              var k = 0 == f ? a.iconPathSelected : a.iconPath;
              h.push({
                latitude: parseFloat(g.pois[f].location.split(",")[1]),
                longitude: parseFloat(g.pois[f].location.split(",")[0]),
                iconPath: k,
                width: 22,
                height: 32,
                id: f,
                name: g.pois[f].name,
                address: g.pois[f].address
              });
            }
            a.success({
              markers: h,
              poisData: g.pois
            });
          }
        } else a.fail({
          errCode: g.data.infocode,
          errMsg: g.data.info
        });
      },
      fail: function fail(g) {
        a.fail({
          errCode: "0",
          errMsg: g.errMsg || ""
        });
      }
    });
  }
  var c = this,
    d = c.requestConfig;
  a.location ? b(a.location) : c.getWxLocation(a, function (e) {
    b(e);
  });
};
AMapWX.prototype.getStaticmap = function (a) {
  function b(e) {
    c.push("location=" + e);
    a.zoom && c.push("zoom=" + a.zoom);
    a.size && c.push("size=" + a.size);
    a.scale && c.push("scale=" + a.scale);
    a.markers && c.push("markers=" + a.markers);
    a.labels && c.push("labels=" + a.labels);
    a.paths && c.push("paths=" + a.paths);
    a.traffic && c.push("traffic=" + a.traffic);
    e = "https://restapi.amap.com/v3/staticmap?" + c.join("&");
    a.success({
      url: e
    });
  }
  var c = [];
  c.push("key=" + this.key);
  var d = this.requestConfig;
  c.push("s=" + d.s);
  c.push("platform=" + d.platform);
  c.push("appname=" + d.appname);
  c.push("sdkversion=" + d.sdkversion);
  c.push("logversion=" + d.logversion);
  a.location ? b(a.location) : this.getWxLocation(a, function (e) {
    b(e);
  });
};
AMapWX.prototype.getInputtips = function (a) {
  var b = Object.assign({}, this.requestConfig);
  a.location && (b.location = a.location);
  a.keywords && (b.keywords = a.keywords);
  a.type && (b.type = a.type);
  a.city && (b.city = a.city);
  a.citylimit && (b.citylimit = a.citylimit);
  wx.request({
    url: "https://restapi.amap.com/v3/assistant/inputtips",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(c) {
      c && c.data && c.data.tips && a.success({
        tips: c.data.tips
      });
    },
    fail: function fail(c) {
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getDrivingRoute = function (a) {
  var b = Object.assign({}, this.requestConfig);
  a.origin && (b.origin = a.origin);
  a.destination && (b.destination = a.destination);
  a.strategy && (b.strategy = a.strategy);
  a.waypoints && (b.waypoints = a.waypoints);
  a.avoidpolygons && (b.avoidpolygons = a.avoidpolygons);
  a.avoidroad && (b.avoidroad = a.avoidroad);
  wx.request({
    url: "https://restapi.amap.com/v3/direction/driving",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(c) {
      c && c.data && c.data.route && a.success({
        paths: c.data.route.paths,
        taxi_cost: c.data.route.taxi_cost || ""
      });
    },
    fail: function fail(c) {
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getWalkingRoute = function (a) {
  var b = Object.assign({}, this.requestConfig);
  a.origin && (b.origin = a.origin);
  a.destination && (b.destination = a.destination);
  wx.request({
    url: "https://restapi.amap.com/v3/direction/walking",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(c) {
      c && c.data && c.data.route && a.success({
        paths: c.data.route.paths
      });
    },
    fail: function fail(c) {
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getTransitRoute = function (a) {
  var b = Object.assign({}, this.requestConfig);
  a.origin && (b.origin = a.origin);
  a.destination && (b.destination = a.destination);
  a.strategy && (b.strategy = a.strategy);
  a.city && (b.city = a.city);
  a.cityd && (b.cityd = a.cityd);
  wx.request({
    url: "https://restapi.amap.com/v3/direction/transit/integrated",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(c) {
      c && c.data && c.data.route && (c = c.data.route, a.success({
        distance: c.distance || "",
        taxi_cost: c.taxi_cost || "",
        transits: c.transits
      }));
    },
    fail: function fail(c) {
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
AMapWX.prototype.getRidingRoute = function (a) {
  var b = Object.assign({}, this.requestConfig);
  a.origin && (b.origin = a.origin);
  a.destination && (b.destination = a.destination);
  wx.request({
    url: "https://restapi.amap.com/v3/direction/riding",
    data: b,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(c) {
      c && c.data && c.data.route && a.success({
        paths: c.data.route.paths
      });
    },
    fail: function fail(c) {
      a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
};
module.exports.AMapWX = AMapWX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 859:
/*!*****************************************************************!*\
  !*** D:/work/jinliyuan/subpackageA/pages/static/kaiqilanya.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAANhQTFRFAAAAAICAIJ+AFaqAIK+AGqaAIKqAJrOOJK2AJK2JIbWMIK+HJLaKI7GHIbGJIKyGI66FIbOIILCGI7GKILKKJLKKIrOJIrCHJLSIIrGIJLKII6+GIrKHI7OHJLOHI7GGJLKJI7KIIrGII7GHJLGJI7GIJLKII7KIJLGIJLKII7KHI7KHI7KII7GIJLGII7KIJLKHI7GHI7KIJLKII7KIJLGIJLKII7GIJLGII7KHJLKHI7KHJLKHJLKII7GIJLGII7KIJLGIJLKII7GII7KII7KHJLKHJLKIpIQqfQAAAEd0Uk5TAAQIDBAUGBscHB8gIyQnKCwvNzs/P0NER0tPUFNXW19jZ29zf4OHi4+Pm5+fp6uvs7u/v8PHx8vP09fb29vf4+fr6+/v9/uDBkpqAAABxElEQVRIx+2VX0OCMBTFzyZaamplVmqk0D9NgcqKQVYk0b7/N+oB0G1OrJ67b27nh5e7wxnwX3+qmu2wmPOPwLVr29Vk4HOhnk1arO/OuVJht0BOp1xT041/suNzbbHqBv0b31BvWoIyUXNFW+7ql6/rSur/BQQ4Wj1iqpmP1MQMfW8PsKJ8YW1WNFQBnowpjFGSLsyJAph8DeA8soD97EkDBXjSAZyzdt6rL+vrmXB8xiTg/Rwn2VZdAuxstQdiRUsguTJgPGRbtgTkM0/GFKVRkgJeA8SK8y4dCQiW3UcW0PJm6IfHQEeYHZOAhWidNtCCQbDniHP4lAB5Rm4NQOkykVcLgNkBgPKoCIhFb54DFZSAfU/ULyRgZbPkkqJ8e48+OwR6goMDCVi+nlMHuYjTsTpVUHtpP1d7cEPgNBQOjqLyqD243BoXzTvJGpGJ42xLiRxfbz6/k5vvWXHrQGvvIUHzNV0x1QCbrwFf1waMm68snujWT/SuATJcbPxElRAIQIDO6hQmupiR3vu61BSsx7Tht/vLIAN2mV7vV38XxpOixO+GqnzeLb4gqCkFjj8g2y+huu0GH5zHzPnJlfVfuvoGlXjv5ZD+JwwAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpackageA/pages/common/vendor.js.map