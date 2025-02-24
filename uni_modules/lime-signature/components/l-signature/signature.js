function t(t, e) {
	var i = Object.keys(t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(t);
		e && (n = n.filter((function(e) {
			return Object.getOwnPropertyDescriptor(t, e).enumerable
		}))), i.push.apply(i, n)
	}
	return i
}

function e(e) {
	for (var i = 1; arguments.length > i; i++) {
		var n = null != arguments[i] ? arguments[i] : {};
		i % 2 ? t(Object(n), !0).forEach((function(t) {
				r(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) :
			t(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
	}
	return e
}

function i(t) {
	return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
			typeof t
	}, i(t)
}

function n(t, e) {
	if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function o(t, e) {
	for (var i = 0; e.length > i; i++) {
		var n = e[i];
		n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object
			.defineProperty(t, n.key, n)
	}
}

function a(t, e, i) {
	return e && o(t.prototype, e), i && o(t, i), Object.defineProperty(t, "prototype", {
		writable: !1
	}), t
}

function r(t, e, i) {
	return e in t ? Object.defineProperty(t, e, {
		value: i,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = i, t
}

function s(t, e) {
	if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	t.prototype = Object.create(e && e.prototype, {
		constructor: {
			value: t,
			writable: !0,
			configurable: !0
		}
	}), Object.defineProperty(t, "prototype", {
		writable: !1
	}), e && u(t, e)
}

function h(t) {
	return h = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t)
	}, h(t)
}

function u(t, e) {
	return u = Object.setPrototypeOf || function(t, e) {
		return t.__proto__ = e, t
	}, u(t, e)
}

function c(t, e) {
	if (e && ("object" == typeof e || "function" == typeof e)) return e;
	if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	return function(t) {
		if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t
	}(t)
}

function l(t) {
	var e = function() {
		if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
		if (Reflect.construct.sham) return !1;
		if ("function" == typeof Proxy) return !0;
		try {
			return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
		} catch (t) {
			return !1
		}
	}();
	return function() {
		var i, n = h(t);
		if (e) {
			var o = h(this).constructor;
			i = Reflect.construct(n, arguments, o)
		} else i = n.apply(this, arguments);
		return c(this, i)
	}
}
var v = function(t) {
		var e = i(t);
		return null !== t && "object" === e || "function" === e
	},
	f = {}.toString,
	d = function(t, e) {
		return f.call(t) === "[object " + e + "]"
	},
	p = function(t) {
		return d(t, "String")
	},
	y = function(t) {
		return d(t, "Number")
	},
	g = function(t) {
		return d(t, "Function")
	},
	m = function() {
		function t() {
			n(this, t), this.__events = void 0, this.__events = {}
		}
		return a(t, [{
			key: "on",
			value: function(t, e) {
				if (t && e) {
					var i = this.__events[t] || [];
					i.push(e), this.__events[t] = i
				}
			}
		}, {
			key: "emit",
			value: function(t, e) {
				var i = this;
				if (v(t) && (t = (e = t) && e.type), t) {
					var n = this.__events[t];
					n && n.length && n.forEach((function(t) {
						t.call(i, e)
					}))
				}
			}
		}, {
			key: "off",
			value: function(t, e) {
				var i = this.__events,
					n = i[t];
				if (n && n.length)
					if (e)
						for (var o = 0, a = n.length; a > o; o++) n[o] === e && (n.splice(o, 1), o--);
					else delete i[t]
			}
		}, {
			key: "getEvents",
			value: function() {
				return this.__events
			}
		}]), t
	}(),
	x = function(t) {
		s(i, m);
		var e = l(i);

		function i(t, o) {
			var a;
			return n(this, i), (a = e.call(this)).context = void 0, a.canvas = void 0, a.attrs = void 0, a
				.isCanvasElement = void 0, a.context = t, a.canvas = o.canvas || t.canvas || {
					width: o.width || 0,
					height: o.height || 0
				}, a.attrs = o || {}, a.isCanvasElement = !0, a
		}
		return a(i, [{
			key: "width",
			get: function() {
				return this.canvas.width
			},
			set: function(t) {
				this.canvas.width = t
			}
		}, {
			key: "height",
			get: function() {
				return this.canvas.height
			},
			set: function(t) {
				this.canvas.height = t
			}
		}, {
			key: "getContext",
			value: function() {
				return this.context
			}
		}, {
			key: "getBoundingClientRect",
			value: function() {
				var t = this.attrs || {},
					e = t.top,
					i = t.right,
					n = t.width,
					o = t.height,
					a = t.left,
					r = t.bottom;
				return {
					top: void 0 === e ? 0 : e,
					width: void 0 === n ? 0 : n,
					right: void 0 === i ? 0 : i,
					height: void 0 === o ? 0 : o,
					bottom: void 0 === r ? 0 : r,
					left: void 0 === a ? 0 : a
				}
			}
		}, {
			key: "setAttribute",
			value: function(t, e) {
				this.attrs[t] = e
			}
		}, {
			key: "addEventListener",
			value: function(t, e) {
				this.on(t, e)
			}
		}, {
			key: "removeEventListener",
			value: function(t, e) {
				this.off(t, e)
			}
		}, {
			key: "dispatchEvent",
			value: function(t, e) {
				this.emit(t, e)
			}
		}]), i
	}();
var w = function(t, e) {
	return t ? function(t) {
		if (!t) return !1;
		if (1 !== t.nodeType || !t.nodeName || "canvas" !== t.nodeName.toLowerCase()) return !1;
		var e = !1;
		try {
			t.addEventListener("eventTest", (function() {
				e = !0
			})), t.dispatchEvent(new Event("eventTest"))
		} catch (t) {
			e = !1
		}
		return e
	}(t.canvas) ? t.canvas : new x(t, e) : null
};

function b(t, e) {
	try {
		return t.currentStyle ? t.currentStyle[e] : document.defaultView && document.defaultView.getComputedStyle(t,
			null).getPropertyValue(e)
	} catch (t) {
		return {
			width: 300,
			height: 150
		} [e]
	}
}

function k(t, e) {
	var i = e.get("el");
	if (!i) return t;
	var n = i.getBoundingClientRect(),
		o = n.top,
		a = void 0 === o ? 0 : o,
		r = n.left,
		s = void 0 === r ? 0 : r,
		h = parseFloat(b(i, "padding-left")) || 0,
		u = parseFloat(b(i, "padding-top")) || 0;
	return {
		x: t.x - s - h,
		y: t.y - a - u
	}
}

function _(t, e) {
	var i = e.get("landscape");
	if (!i) return t;
	if (g(i)) return i(t, e);
	var n = e.get("height");
	return {
		x: t.y,
		y: n - t.x
	}
}
var E = function(t, e) {
		var i = t.touches;
		if (!i || !i.length) return [_(k({
			x: t.clientX,
			y: t.clientY
		}, e), e)];
		i.length || (i = t.changedTouches || []);
		for (var n = [], o = 0, a = i.length; a > o; o++) {
			var r = i[o],
				s = r.x,
				h = r.y,
				u = r.clientX,
				c = r.clientY,
				l = void 0;
			l = y(s) || y(h) ? {
				x: s,
				y: h
			} : k({
				x: u,
				y: c
			}, e), n.push(_(l, e))
		}
		return n
	},
	L = function(t, e) {
		var i = e.x - t.x,
			n = e.y - t.y;
		return Math.abs(i) > Math.abs(n) ? i > 0 ? "right" : "left" : n > 0 ? "down" : "up"
	},
	M = function(t, e) {
		var i = Math.abs(e.x - t.x),
			n = Math.abs(e.y - t.y);
		return Math.sqrt(i * i + n * n)
	},
	P = function() {
		function t(e) {
			var i = this,
				o = e.canvas,
				a = e.el;
			n(this, t), this.processEvent = void 0, this.canvas = void 0, this.startTime = 0, this.endTime = 0, this
				.startPoints = null, this.startDistance = 0, this.center = null, this.pressTimeout = void 0, this
				.eventType = null, this.direction = null, this.lastMoveTime = 0, this.prevMovePoints = null, this
				.prevMoveTime = 0, this.lastMovePoints = null, this.pinch = !1, this._click = function(t) {
					var e = E(t, i.canvas);
					t.points = e, i.emitEvent("click", t)
				}, this._start = function(t) {
					var e, n, o = E(t, i.canvas);
					o && (t.points = o, i.emitEvent("touchstart", t), i.reset(), i.startTime = Date.now(), i
						.startPoints = o, o.length > 1 ? (i.startDistance = M(o[0], o[1]), i.center = {
							x: (e = o[0]).x + ((n = o[1]).x - e.x) / 2,
							y: e.y + (n.y - e.y) / 2
						}) : i.pressTimeout = setTimeout((function() {
							var e = "press",
								n = "none";
							t.direction = n, i.emitStart(e, t), i.emitEvent(e, t), i.eventType = e, i
								.direction = n
						}), 250))
				}, this._move = function(t) {
					var e = E(t, i.canvas);
					if (e) {
						t.points = e, i.emitEvent("touchmove", t);
						var n = i.startPoints;
						if (n)
							if (e.length > 1) {
								var o = i.startDistance,
									a = M(e[0], e[1]);
								t.zoom = a / o, t.center = i.center, i.emitStart("pinch", t), i.emitEvent("pinch", t)
							} else {
								var r = e[0].x - n[0].x,
									s = e[0].y - n[0].y,
									h = i.direction || L(n[0], e[0]);
								i.direction = h;
								var u = i.getEventType(e);
								t.direction = h, t.deltaX = r, t.deltaY = s, i.emitStart(u, t), i.emitEvent(u, t);
								var c = i.lastMoveTime,
									l = Date.now();
								l - c > 0 && (i.prevMoveTime = c, i.prevMovePoints = i.lastMovePoints, i.lastMoveTime =
									l, i.lastMovePoints = e)
							}
					}
				}, this._end = function(t) {
					var e = E(t, i.canvas);
					t.points = e, i.emitEnd(t), i.emitEvent("touchend", t);
					var n = i.lastMoveTime;
					if (100 > Date.now() - n) {
						var o = n - (i.prevMoveTime || i.startTime);
						if (o > 0) {
							var a = i.prevMovePoints || i.startPoints,
								r = i.lastMovePoints;
							if (!a || !r) return;
							var s = M(a[0], r[0]) / o;
							s > .3 && (t.velocity = s, t.direction = L(a[0], r[0]), i.emitEvent("swipe", t))
						}
					}
					i.reset();
					var h = t.touches;
					h && h.length > 0 && i._start(t)
				}, this._cancel = function(t) {
					i.emitEvent("touchcancel", t), i.reset()
				}, this.canvas = o, this.delegateEvent(a), this.processEvent = {}
		}
		return a(t, [{
			key: "delegateEvent",
			value: function(t) {
				t.addEventListener("click", this._click), t.addEventListener("touchstart", this._start),
					t.addEventListener("touchmove", this._move), t.addEventListener("touchend", this
						._end), t.addEventListener("touchcancel", this._cancel)
			}
		}, {
			key: "emitEvent",
			value: function(t, e) {
				this.canvas.emit(t, e)
			}
		}, {
			key: "getEventType",
			value: function(t) {
				var e, i = this.eventType,
					n = this.startTime,
					o = this.startPoints;
				if (i) return i;
				var a = this.canvas.__events.pan;
				if (a && a.length) {
					var r = Date.now();
					if (!o) return;
					e = r - n > 250 && 10 > M(o[0], t[0]) ? "press" : "pan"
				} else e = "press";
				return this.eventType = e, e
			}
		}, {
			key: "enable",
			value: function(t) {
				this.processEvent[t] = !0
			}
		}, {
			key: "isProcess",
			value: function(t) {
				return this.processEvent[t]
			}
		}, {
			key: "emitStart",
			value: function(t, e) {
				this.isProcess(t) || (this.enable(t), this.emitEvent("".concat(t, "start"), e))
			}
		}, {
			key: "emitEnd",
			value: function(t) {}
		}, {
			key: "clearPressTimeout",
			value: function() {
				this.pressTimeout && (clearTimeout(this.pressTimeout), this.pressTimeout = null)
			}
		}, {
			key: "reset",
			value: function() {
				this.clearPressTimeout(), this.startTime = 0, this.startPoints = null, this
					.startDistance = 0, this.direction = null, this.eventType = null, this.pinch = !1,
					this.prevMoveTime = 0, this.prevMovePoints = null, this.lastMoveTime = 0, this
					.lastMovePoints = null
			}
		}]), t
	}(),
	T = function(t) {
		s(o, m);
		var e = l(o);

		function o(t) {
			var i;
			n(this, o), (i = e.call(this))._attrs = {}, i._isWindow = void 0, i._attrs = Object.assign({}, t), i
				._isWindow = "undefined" != typeof window, i._initPixelRatio(), i._initCanvas();
			return ["createImage", "toDataURL", "requestAnimationFrame"].forEach((function(e) {
				i._initAttrs(e, t.canvas || i.get("el"))
			})), i
		}
		return a(o, [{
			key: "get",
			value: function(t) {
				return this._attrs[t]
			}
		}, {
			key: "set",
			value: function(t, e) {
				this._attrs[t] = e
			}
		}, {
			key: "_initAttrs",
			value: function(t, e) {
				var i = this;
				if (!this.get(t)) {
					this.set(t, (function() {
						return e[t] ? e[t].apply(e, arguments) : i._isWindow ? window[t] ? (
								n = window)[t].apply(n, arguments) : "createImage" == t ?
							new Image : null : void 0;
						var n
					}))
				}
			}
		}, {
			key: "_initCanvas",
			value: function() {
				var t, e, i = this.get("el"),
					n = this.get("context");
				if (!i && !n) throw Error("请指定 id、el 或 context!");
				t = i ? p(i) ? (e = i) ? document.getElementById(e) : null : i : w(n, this._attrs), n &&
					t && !t.getContext && (t.getContext = function() {
						return n
					});
				var o = this.get("width") || function(t) {
						var e = b(t, "width");
						return "auto" === e && (e = t.offsetWidth), parseFloat(e)
					}(t) || t.width,
					a = this.get("height") || function(t) {
						var e = b(t, "height");
						return "auto" === e && (e = t.offsetHeight), parseFloat(e)
					}(t) || t.height;
				this.set("canvas", this), this.set("el", t), this.set("context", n || t.getContext(
					"2d")), this.changeSize(o, a);
				var r = new P({
					canvas: this,
					el: t,
					parent: this.get("parent")
				});
				this.set("eventController", r)
			}
		}, {
			key: "_initPixelRatio",
			value: function() {
				this.get("pixelRatio") || this.set("pixelRatio", window && window.devicePixelRatio || 1)
			}
		}, {
			key: "changeSize",
			value: function(t, e) {
				var n, o = this.get("pixelRatio"),
					a = this.get("el");
				(a.style && (a.style.width = t + "px", a.style.height = e + "px"), (n = a) &&
					"object" === i(n) && (1 === n.nodeType && n.nodeName || n.isCanvasElement)) && (a
					.width = t * o, a.height = e * o, 1 !== o && this.get("context").scale(o, o));
				this.set("width", t), this.set("height", e)
			}
		}, {
			key: "destroy",
			value: function() {
				if (!this.get("destroyed")) {
					var t = this.get("el");
					t.width = 0, t.height = 0, this.clear(), this._attrs = {}, this.set("destroyed", !0)
				}
			}
		}, {
			key: "clear",
			value: function() {}
		}, {
			key: "isDestroyed",
			value: function() {
				return this.get("destroyed")
			}
		}]), o
	}();
var S = {
		penColor: "black",
		backgroundColor: "",
		openSmooth: !0,
		penSize: 2,
		minLineWidth: 2,
		maxLineWidth: 6,
		minSpeed: 1.5,
		maxWidthDiffRate: 20,
		maxHistoryLength: 20
	},
	D = null,
	O = function() {
		function t(e) {
			var i = this;
			n(this, t), this.canAddHistory = !0, this.points = [], this.historyList = [], this.undoneList = [], this
				.canvas = void 0, this._isEmpty = !0, this.active = !1, this.getLineWidth = function(t) {
					var e = i.get("options"),
						n = e.minSpeed,
						o = e.minLineWidth,
						a = i.getMaxLineWidth();
					return Math.min(Math.max(a - (a - o) * t / Math.max(Math.min(n, 10), 1), o), a)
				}, this.drawTrapezoid = function(t, e, n, o) {
					var a = i.get("context");
					a.beginPath(), a.moveTo(Number(t.x.toFixed(1)), Number(t.y.toFixed(1))), a.lineTo(Number(e.x
						.toFixed(1)), Number(e.y.toFixed(1))), a.lineTo(Number(n.x.toFixed(1)), Number(n.y.toFixed(
						1))), a.lineTo(Number(o.x.toFixed(1)), Number(o.y.toFixed(1))), a.fillStyle = i.get(
						"options").penColor, a.fill(), a.draw && a.draw(!0)
				}, this.drawNoSmoothLine = function(t, e) {
					e.lastX = t.x + .5 * (e.x - t.x), e.lastY = t.y + .5 * (e.y - t.y), "number" == typeof t.lastX && i
						.drawCurveLine(t.lastX, t.lastY, t.x, t.y, e.lastX, e.lastY, i.getMaxLineWidth())
				}, this.drawCurveLine = function(t, e, n, o, a, r, s) {
					s = Number(s.toFixed(1));
					var h = i.get("context");
					h.lineWidth = s, h.beginPath(), h.moveTo(Number(t.toFixed(1)), Number(e.toFixed(1))), h
						.quadraticCurveTo(Number(n.toFixed(1)), Number(o.toFixed(1)), Number(a.toFixed(1)), Number(r
							.toFixed(1))), h.stroke(), h.draw && h.draw(!0)
				}, this.getRadianData = function(t, e, i, n) {
					var o = i - t,
						a = n - e;
					if (0 === o) return {
						val: 0,
						pos: -1
					};
					if (0 === a) return {
						val: 0,
						pos: 1
					};
					var r = Math.abs(Math.atan(a / o));
					return i > t && e > n || t > i && n > e ? {
						val: r,
						pos: 1
					} : {
						val: r,
						pos: -1
					}
				}, this.getRadianPoints = function(t, e, i, n) {
					if (0 === t.val) return 1 === t.pos ? [{
						x: e,
						y: i + n
					}, {
						x: e,
						y: i - n
					}] : [{
						y: i,
						x: e + n
					}, {
						y: i,
						x: e - n
					}];
					var o = Math.sin(t.val) * n,
						a = Math.cos(t.val) * n;
					return 1 === t.pos ? [{
						x: e + o,
						y: i + a
					}, {
						x: e - o,
						y: i - a
					}] : [{
						x: e + o,
						y: i - a
					}, {
						x: e - o,
						y: i + a
					}]
				}, this.drawSmoothLine = function(t, e) {
					var n = e.x - t.x,
						o = e.y - t.y;
					if (Math.abs(n) + Math.abs(o) > 2 ? (e.lastX1 = t.x + .3 * n, e.lastY1 = t.y + .3 * o, e.lastX2 = t
							.x + .7 * n, e.lastY2 = t.y + .7 * o) : (e.lastX1 = e.lastX2 = t.x + .5 * n, e.lastY1 = e
							.lastY2 = t.y + .5 * o), e.perLineWidth = (t.lineWidth + e.lineWidth) / 2, "number" ==
						typeof t.lastX1) {
						if (i.drawCurveLine(t.lastX2, t.lastY2, t.x, t.y, e.lastX1, e.lastY1, e.perLineWidth), t
							.isFirstPoint) return;
						if (t.lastX1 === t.lastX2 && t.lastY1 === t.lastY2) return;
						var a = i.getRadianData(t.lastX1, t.lastY1, t.lastX2, t.lastY2),
							r = i.getRadianPoints(a, t.lastX1, t.lastY1, t.perLineWidth / 2),
							s = i.getRadianPoints(a, t.lastX2, t.lastY2, e.perLineWidth / 2);
						i.drawTrapezoid(r[0], s[0], s[1], r[1])
					} else e.isFirstPoint = !0
				}, this.addHistory = function() {
					var t = i.get("options").maxHistoryLength;
					if (t && i.canAddHistory)
						if (i.canAddHistory = !1, i.get("createImage")) {
							var e = null;
							e = i.get("createImage")();
							var n = i.get("toDataURL") && i.get("toDataURL")();
							p(n) ? e.src = n : n.then((function(t) {
								e.src = t
							})), e.onload = function() {
								var n = D;
								D = e, i.historyList.push(n), i.historyList = i.historyList.slice(-t)
							}
						} else i.historyList.length++
				}, this.drawByImage = function(t) {
					var e = i.get("context"),
						n = i.get("width"),
						o = i.get("height");
					e.clearRect(0, 0, n, o);
					try {
						t && e.drawImage(t, 0, 0, n, o), e.draw && e.draw(!0)
					} catch (t) {
						i.historyList.length = 0
					}
				}, this.isEmpty = function() {
					return i.get("options").maxHistoryLength > 0 ? 0 === i.historyList.length : i._isEmpty
				}, this.clear = function() {
					if (!i.get("options").disabled) {
						var t = i.get("context");
						t.clearRect(0, 0, i.get("width"), i.get("height")), t.draw && t.draw(), i._isEmpty = !0, D =
							null, i.historyList.length = 0
					}
				}, this.undo = function() {
					if (!i.get("options").disabled && (0 === i.get("options").maxHistoryLength && i.clear(), i.get(
							"createImage") && i.historyList.length)) {
						var t = i.historyList.pop();
						i.drawByImage(t), i.undoneList.push(D), D = t, i.historyList.length || i.undoneList.length || i
							.clear()
					}
				}, this.redo = function() {
					if (i.undoneList.length && !i.get("options").disabled) {
						var t = i.undoneList.pop();
						i.historyList.push(D), i.drawByImage(t), D = t, i._isEmpty = !1
					}
				}, this.canvas = e, this.canvas.set("pen", S), this.init()
		}
		return a(t, [{
			key: "getOption",
			value: function() {}
		}, {
			key: "setOption",
			value: function() {
				var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					i = e({}, t),
					n = i.maxLineWidth;
				if (n && t.penSize && n == S.maxLineWidth) {
					var o = Math.max(n, t.penSize);
					i.maxLineWidth = o
				}
				this.canvas.set("pen", Object.assign({}, S, i))
			}
		}, {
			key: "get",
			value: function(t) {
				return this.canvas.get("options" == t ? "pen" : t)
			}
		}, {
			key: "init",
			value: function() {
				var t = this;
				this.get("context").lineCap = "round", this.canvas.on("touchstart", (function(e) {
					return t.onDrawStart(e)
				})), this.canvas.on("touchmove", (function(e) {
					return t.onDrawMove(e)
				})), this.canvas.on("touchend", (function(e) {
					return t.onDrawEnd(e)
				}))
			}
		}, {
			key: "drawBackground",
			value: function() {
				var t = this.get("context"),
					e = this.get("width"),
					i = this.get("height"),
					n = this.get("options"),
					o = n.backgroundColor,
					a = n.backgroundImage;
				o && (t.fillStyle = o, t.fillRect(0, 0, e, i), t.draw && t.draw(!0)), a && this
					.drawByImage(a)
			}
		}, {
			key: "getImageData",
			value: function(t) {
				if (t) {
					var e = this.get("width"),
						i = this.get("height"),
						n = this.get("el"),
						o = "CANVAS" === n.nodeName,
						a = o ? e : n.width,
						r = o ? i : n.height;
					if (o) {
						var s = document.createElement("canvas");
						s.width = e, s.height = i;
						var h = s.getContext("2d");
						h.drawImage(n, 0, 0, e, i);
						var u = h.getImageData(0, 0, e, i).data;
						return t(u)
					}
					var c, l = this.get("context").getImageData(0, 0, a, r);
					return v(c = l) && g(c.then) && g(c.catch) ? (l.then((function(e) {
						return t(e.data)
					})), null) : t(l.data)
				}
			}
		}, {
			key: "getMaskedImageData",
			value: function(t) {
				if (t) return this.getImageData((function(e) {
					for (var i = 0; e.length > i; i += 4) {
						0 === e[i + 3] ? (e[i] = 0, e[i + 1] = 0, e[i + 2] = 0) : (e[
							i] = 255, e[i + 1] = 255, e[i + 2] = 255)
					}
					return t(e)
				}))
			}
		}, {
			key: "getContentBoundingBox",
			value: function(t) {
				var e = this.get("pixelRatio"),
					i = this.get("width"),
					n = this.get("height"),
					o = this.get("el"),
					a = "CANVAS" === o.nodeName,
					r = a ? i : o.width,
					s = a ? n : o.height;
				e = a ? 1 : e;
				return this.getImageData((function(i) {
					for (var n = Math.floor(r), o = n, a = Math.floor(s), h = 0, u = 0, c =
							0; i.length > c; c += 4) {
						if (i[c + 3] > 0) {
							var l = c / 4 % n,
								v = Math.floor(c / 4 / n);
							o = Math.min(o, l), a = Math.min(a, v), h = Math.max(h, l), u =
								Math.max(u, v)
						}
					}
					var f = {
						width: (h - o + 1) / e,
						height: (u - a + 1) / e,
						startX: o / e,
						startY: a / e
					};
					return t && t(f), f
				}))
			}
		}, {
			key: "remove",
			value: function() {
				var t = this;
				this.canvas.off("touchstart", (function(e) {
					return t.onDrawStart(e)
				})), this.canvas.off("touchmove", (function(e) {
					return t.onDrawMove(e)
				})), this.canvas.off("touchend", (function(e) {
					return t.onDrawEnd(e)
				}))
			}
		}, {
			key: "disableScroll",
			value: function(t) {
				t.preventDefault && this.get("options").disableScroll && t.preventDefault()
			}
		}, {
			key: "onDrawStart",
			value: function(t) {
				if (!this.get("options").disabled) {
					this.disableScroll(t), this.undoneList.length = 0;
					var e = t.points;
					if (this.active) {
						this.canAddHistory = !0, this.get("context").strokeStyle = this.get("options")
							.penColor;
						var i = e[0];
						this.initPoint(i.x, i.y)
					}
				}
			}
		}, {
			key: "onDrawMove",
			value: function(t) {
				if (!this.get("options").disabled && (this.disableScroll(t), this.active)) {
					var e = t.points[0];
					this.initPoint(e.x, e.y), this.onDraw()
				}
			}
		}, {
			key: "onDrawEnd",
			value: function(t) {
				this.active && !this.get("options").disabled && (this.addHistory(), this
					.canAddHistory = !0, this.points = [])
			}
		}, {
			key: "onDraw",
			value: function() {
				var t = this,
					e = this.get("context");
				if (this.points.length >= 2) {
					e.lineWidth = this.get("options").penSize || 2;
					var i = this.points.slice(-1)[0],
						n = this.points.slice(-2, -1)[0],
						o = function() {
							t._isEmpty = !1, t.get("options").openSmooth ? t.drawSmoothLine(n, i) : t
								.drawNoSmoothLine(n, i)
						};
					o()
				}
			}
		}, {
			key: "getMaxLineWidth",
			value: function() {
				var t = this.get("options");
				return Math.min(t.penSize, t.maxLineWidth)
			}
		}, {
			key: "initPoint",
			value: function(t, e) {
				var i = {
						x: t,
						y: e,
						t: Date.now()
					},
					n = this.points.slice(-1)[0];
				if (!n || n.t !== i.t && (n.x !== t || n.y !== e)) {
					if (this.get("options").openSmooth && n) {
						var o = this.points.slice(-2, -1)[0];
						if (i.distance = Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2)), i
							.speed = i.distance / (i.t - n.t || .1), i.lineWidth = this.getLineWidth(i
								.speed), o && o.lineWidth && n.lineWidth) {
							var a = (i.lineWidth - n.lineWidth) / n.lineWidth,
								r = this.get("options").maxWidthDiffRate / 100;
							if (r = r > 1 ? 1 : .01 > r ? .01 : r, Math.abs(a) > r) i.lineWidth = n
								.lineWidth * (1 + (a > 0 ? r : -r))
						}
					}
					this.points.push(i), this.points = this.points.slice(-3)
				}
			}
		}]), t
	}(),
	W = function() {
		function t(e) {
			n(this, t), this.canvas = void 0, this._ee = void 0, this.pen = void 0;
			var i = new T(e);
			i.set("parent", this), this.canvas = i, this._ee = new m, this.pen = new O(i), this.init()
		}
		return a(t, [{
			key: "init",
			value: function() {
				this.pen.active = !0
			}
		}, {
			key: "destroy",
			value: function() {
				this.canvas.destroy()
			}
		}, {
			key: "clear",
			value: function() {
				this.pen.clear()
			}
		}, {
			key: "undo",
			value: function() {
				this.pen.undo()
			}
		}, {
			key: "redo",
			value: function() {
				this.pen.redo()
			}
		}, {
			key: "save",
			value: function() {}
		}, {
			key: "getContentBoundingBox",
			value: function(t) {
				return this.pen.getContentBoundingBox(t)
			}
		}, {
			key: "getMaskedImageData",
			value: function(t) {
				return this.pen.getMaskedImageData(t)
			}
		}, {
			key: "isEmpty",
			value: function() {
				return this.pen.isEmpty()
			}
		}, {
			key: "on",
			value: function(t, e) {
				this._ee.on(t, e)
			}
		}, {
			key: "emit",
			value: function(t, e) {
				this._ee.emit(t, e)
			}
		}, {
			key: "off",
			value: function(t, e) {
				this._ee.off(t, e)
			}
		}]), t
	}();
export default W;
export {
	W as Signature
};