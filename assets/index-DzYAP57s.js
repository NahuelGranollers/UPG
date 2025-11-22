(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const p of document.querySelectorAll('link[rel="modulepreload"]')) l(p);
  new MutationObserver(p => {
    for (const b of p)
      if (b.type === 'childList')
        for (const R of b.addedNodes) R.tagName === 'LINK' && R.rel === 'modulepreload' && l(R);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(p) {
    const b = {};
    return (
      p.integrity && (b.integrity = p.integrity),
      p.referrerPolicy && (b.referrerPolicy = p.referrerPolicy),
      p.crossOrigin === 'use-credentials'
        ? (b.credentials = 'include')
        : p.crossOrigin === 'anonymous'
          ? (b.credentials = 'omit')
          : (b.credentials = 'same-origin'),
      b
    );
  }
  function l(p) {
    if (p.ep) return;
    p.ep = !0;
    const b = i(p);
    fetch(p.href, b);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver(l => {
    for (const p of l)
      if (p.type === 'childList')
        for (const b of p.addedNodes) b.tagName === 'LINK' && b.rel === 'modulepreload' && i(b);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const p = {};
    return (
      l.integrity && (p.integrity = l.integrity),
      l.referrerPolicy && (p.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (p.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (p.credentials = 'omit')
          : (p.credentials = 'same-origin'),
      p
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const p = o(l);
    fetch(l.href, p);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver(l => {
    for (const p of l)
      if (p.type === 'childList')
        for (const b of p.addedNodes) b.tagName === 'LINK' && b.rel === 'modulepreload' && i(b);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const p = {};
    return (
      l.integrity && (p.integrity = l.integrity),
      l.referrerPolicy && (p.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (p.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (p.credentials = 'omit')
          : (p.credentials = 'same-origin'),
      p
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const p = o(l);
    fetch(l.href, p);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver(l => {
    for (const p of l)
      if (p.type === 'childList')
        for (const b of p.addedNodes) b.tagName === 'LINK' && b.rel === 'modulepreload' && i(b);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const p = {};
    return (
      l.integrity && (p.integrity = l.integrity),
      l.referrerPolicy && (p.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (p.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (p.credentials = 'omit')
          : (p.credentials = 'same-origin'),
      p
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const p = o(l);
    fetch(l.href, p);
  }
})();
function Rh(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var rh = { exports: {} },
  Oa = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ah;
function _g() {
  if (ah) return Oa;
  ah = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.fragment');
  function i(l, p, b) {
    var R = null;
    if ((b !== void 0 && (R = '' + b), p.key !== void 0 && (R = '' + p.key), 'key' in p)) {
      b = {};
      for (var M in p) M !== 'key' && (b[M] = p[M]);
    } else b = p;
    return ((p = b.ref), { $$typeof: c, type: l, key: R, ref: p !== void 0 ? p : null, props: b });
  }
  return ((Oa.Fragment = o), (Oa.jsx = i), (Oa.jsxs = i), Oa);
}
var sh;
function Eg() {
  return (sh || ((sh = 1), (rh.exports = _g())), rh.exports);
}
var f = Eg(),
  oh = { exports: {} },
  K = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ih;
function Cg() {
  if (ih) return K;
  ih = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.portal'),
    i = Symbol.for('react.fragment'),
    l = Symbol.for('react.strict_mode'),
    p = Symbol.for('react.profiler'),
    b = Symbol.for('react.consumer'),
    R = Symbol.for('react.context'),
    M = Symbol.for('react.forward_ref'),
    _ = Symbol.for('react.suspense'),
    S = Symbol.for('react.memo'),
    A = Symbol.for('react.lazy'),
    L = Symbol.for('react.activity'),
    H = Symbol.iterator;
  function q(h) {
    return h === null || typeof h != 'object'
      ? null
      : ((h = (H && h[H]) || h['@@iterator']), typeof h == 'function' ? h : null);
  }
  var oe = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Q = Object.assign,
    se = {};
  function qe(h, y, P) {
    ((this.props = h), (this.context = y), (this.refs = se), (this.updater = P || oe));
  }
  ((qe.prototype.isReactComponent = {}),
    (qe.prototype.setState = function (h, y) {
      if (typeof h != 'object' && typeof h != 'function' && h != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, h, y, 'setState');
    }),
    (qe.prototype.forceUpdate = function (h) {
      this.updater.enqueueForceUpdate(this, h, 'forceUpdate');
    }));
  function Pt() {}
  Pt.prototype = qe.prototype;
  function je(h, y, P) {
    ((this.props = h), (this.context = y), (this.refs = se), (this.updater = P || oe));
  }
  var _e = (je.prototype = new Pt());
  ((_e.constructor = je), Q(_e, qe.prototype), (_e.isPureReactComponent = !0));
  var Pe = Array.isArray;
  function Ve() {}
  var J = { H: null, A: null, T: null, S: null },
    ke = Object.prototype.hasOwnProperty;
  function lt(h, y, P) {
    var O = P.ref;
    return { $$typeof: c, type: h, key: y, ref: O !== void 0 ? O : null, props: P };
  }
  function Me(h, y) {
    return lt(h.type, y, h.props);
  }
  function Je(h) {
    return typeof h == 'object' && h !== null && h.$$typeof === c;
  }
  function Ge(h) {
    var y = { '=': '=0', ':': '=2' };
    return (
      '$' +
      h.replace(/[=:]/g, function (P) {
        return y[P];
      })
    );
  }
  var Ye = /\/+/g;
  function xt(h, y) {
    return typeof h == 'object' && h !== null && h.key != null ? Ge('' + h.key) : y.toString(36);
  }
  function et(h) {
    switch (h.status) {
      case 'fulfilled':
        return h.value;
      case 'rejected':
        throw h.reason;
      default:
        switch (
          (typeof h.status == 'string'
            ? h.then(Ve, Ve)
            : ((h.status = 'pending'),
              h.then(
                function (y) {
                  h.status === 'pending' && ((h.status = 'fulfilled'), (h.value = y));
                },
                function (y) {
                  h.status === 'pending' && ((h.status = 'rejected'), (h.reason = y));
                }
              )),
          h.status)
        ) {
          case 'fulfilled':
            return h.value;
          case 'rejected':
            throw h.reason;
        }
    }
    throw h;
  }
  function C(h, y, P, O, I) {
    var $ = typeof h;
    ($ === 'undefined' || $ === 'boolean') && (h = null);
    var Z = !1;
    if (h === null) Z = !0;
    else
      switch ($) {
        case 'bigint':
        case 'string':
        case 'number':
          Z = !0;
          break;
        case 'object':
          switch (h.$$typeof) {
            case c:
            case o:
              Z = !0;
              break;
            case A:
              return ((Z = h._init), C(Z(h._payload), y, P, O, I));
          }
      }
    if (Z)
      return (
        (I = I(h)),
        (Z = O === '' ? '.' + xt(h, 0) : O),
        Pe(I)
          ? ((P = ''),
            Z != null && (P = Z.replace(Ye, '$&/') + '/'),
            C(I, y, P, '', function (Fr) {
              return Fr;
            }))
          : I != null &&
            (Je(I) &&
              (I = Me(
                I,
                P +
                  (I.key == null || (h && h.key === I.key)
                    ? ''
                    : ('' + I.key).replace(Ye, '$&/') + '/') +
                  Z
              )),
            y.push(I)),
        1
      );
    Z = 0;
    var Ie = O === '' ? '.' : O + ':';
    if (Pe(h))
      for (var Ee = 0; Ee < h.length; Ee++)
        ((O = h[Ee]), ($ = Ie + xt(O, Ee)), (Z += C(O, y, P, $, I)));
    else if (((Ee = q(h)), typeof Ee == 'function'))
      for (h = Ee.call(h), Ee = 0; !(O = h.next()).done; )
        ((O = O.value), ($ = Ie + xt(O, Ee++)), (Z += C(O, y, P, $, I)));
    else if ($ === 'object') {
      if (typeof h.then == 'function') return C(et(h), y, P, O, I);
      throw (
        (y = String(h)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (y === '[object Object]' ? 'object with keys {' + Object.keys(h).join(', ') + '}' : y) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Z;
  }
  function z(h, y, P) {
    if (h == null) return h;
    var O = [],
      I = 0;
    return (
      C(h, O, '', '', function ($) {
        return y.call(P, $, I++);
      }),
      O
    );
  }
  function V(h) {
    if (h._status === -1) {
      var y = h._result;
      ((y = y()),
        y.then(
          function (P) {
            (h._status === 0 || h._status === -1) && ((h._status = 1), (h._result = P));
          },
          function (P) {
            (h._status === 0 || h._status === -1) && ((h._status = 2), (h._result = P));
          }
        ),
        h._status === -1 && ((h._status = 0), (h._result = y)));
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var ce =
      typeof reportError == 'function'
        ? reportError
        : function (h) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var y = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof h == 'object' && h !== null && typeof h.message == 'string'
                    ? String(h.message)
                    : String(h),
                error: h,
              });
              if (!window.dispatchEvent(y)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', h);
              return;
            }
            console.error(h);
          },
    de = {
      map: z,
      forEach: function (h, y, P) {
        z(
          h,
          function () {
            y.apply(this, arguments);
          },
          P
        );
      },
      count: function (h) {
        var y = 0;
        return (
          z(h, function () {
            y++;
          }),
          y
        );
      },
      toArray: function (h) {
        return (
          z(h, function (y) {
            return y;
          }) || []
        );
      },
      only: function (h) {
        if (!Je(h))
          throw Error('React.Children.only expected to receive a single React element child.');
        return h;
      },
    };
  return (
    (K.Activity = L),
    (K.Children = de),
    (K.Component = qe),
    (K.Fragment = i),
    (K.Profiler = p),
    (K.PureComponent = je),
    (K.StrictMode = l),
    (K.Suspense = _),
    (K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (K.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (h) {
        return J.H.useMemoCache(h);
      },
    }),
    (K.cache = function (h) {
      return function () {
        return h.apply(null, arguments);
      };
    }),
    (K.cacheSignal = function () {
      return null;
    }),
    (K.cloneElement = function (h, y, P) {
      if (h == null) throw Error('The argument must be a React element, but you passed ' + h + '.');
      var O = Q({}, h.props),
        I = h.key;
      if (y != null)
        for ($ in (y.key !== void 0 && (I = '' + y.key), y))
          !ke.call(y, $) ||
            $ === 'key' ||
            $ === '__self' ||
            $ === '__source' ||
            ($ === 'ref' && y.ref === void 0) ||
            (O[$] = y[$]);
      var $ = arguments.length - 2;
      if ($ === 1) O.children = P;
      else if (1 < $) {
        for (var Z = Array($), Ie = 0; Ie < $; Ie++) Z[Ie] = arguments[Ie + 2];
        O.children = Z;
      }
      return lt(h.type, I, O);
    }),
    (K.createContext = function (h) {
      return (
        (h = {
          $$typeof: R,
          _currentValue: h,
          _currentValue2: h,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (h.Provider = h),
        (h.Consumer = { $$typeof: b, _context: h }),
        h
      );
    }),
    (K.createElement = function (h, y, P) {
      var O,
        I = {},
        $ = null;
      if (y != null)
        for (O in (y.key !== void 0 && ($ = '' + y.key), y))
          ke.call(y, O) && O !== 'key' && O !== '__self' && O !== '__source' && (I[O] = y[O]);
      var Z = arguments.length - 2;
      if (Z === 1) I.children = P;
      else if (1 < Z) {
        for (var Ie = Array(Z), Ee = 0; Ee < Z; Ee++) Ie[Ee] = arguments[Ee + 2];
        I.children = Ie;
      }
      if (h && h.defaultProps)
        for (O in ((Z = h.defaultProps), Z)) I[O] === void 0 && (I[O] = Z[O]);
      return lt(h, $, I);
    }),
    (K.createRef = function () {
      return { current: null };
    }),
    (K.forwardRef = function (h) {
      return { $$typeof: M, render: h };
    }),
    (K.isValidElement = Je),
    (K.lazy = function (h) {
      return { $$typeof: A, _payload: { _status: -1, _result: h }, _init: V };
    }),
    (K.memo = function (h, y) {
      return { $$typeof: S, type: h, compare: y === void 0 ? null : y };
    }),
    (K.startTransition = function (h) {
      var y = J.T,
        P = {};
      J.T = P;
      try {
        var O = h(),
          I = J.S;
        (I !== null && I(P, O),
          typeof O == 'object' && O !== null && typeof O.then == 'function' && O.then(Ve, ce));
      } catch ($) {
        ce($);
      } finally {
        (y !== null && P.types !== null && (y.types = P.types), (J.T = y));
      }
    }),
    (K.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (K.use = function (h) {
      return J.H.use(h);
    }),
    (K.useActionState = function (h, y, P) {
      return J.H.useActionState(h, y, P);
    }),
    (K.useCallback = function (h, y) {
      return J.H.useCallback(h, y);
    }),
    (K.useContext = function (h) {
      return J.H.useContext(h);
    }),
    (K.useDebugValue = function () {}),
    (K.useDeferredValue = function (h, y) {
      return J.H.useDeferredValue(h, y);
    }),
    (K.useEffect = function (h, y) {
      return J.H.useEffect(h, y);
    }),
    (K.useEffectEvent = function (h) {
      return J.H.useEffectEvent(h);
    }),
    (K.useId = function () {
      return J.H.useId();
    }),
    (K.useImperativeHandle = function (h, y, P) {
      return J.H.useImperativeHandle(h, y, P);
    }),
    (K.useInsertionEffect = function (h, y) {
      return J.H.useInsertionEffect(h, y);
    }),
    (K.useLayoutEffect = function (h, y) {
      return J.H.useLayoutEffect(h, y);
    }),
    (K.useMemo = function (h, y) {
      return J.H.useMemo(h, y);
    }),
    (K.useOptimistic = function (h, y) {
      return J.H.useOptimistic(h, y);
    }),
    (K.useReducer = function (h, y, P) {
      return J.H.useReducer(h, y, P);
    }),
    (K.useRef = function (h) {
      return J.H.useRef(h);
    }),
    (K.useState = function (h) {
      return J.H.useState(h);
    }),
    (K.useSyncExternalStore = function (h, y, P) {
      return J.H.useSyncExternalStore(h, y, P);
    }),
    (K.useTransition = function () {
      return J.H.useTransition();
    }),
    (K.version = '19.2.0'),
    K
  );
}
var lh;
function Kl() {
  return (lh || ((lh = 1), (oh.exports = Cg())), oh.exports);
}
var D = Kl();
const Tg = Rh(D);
var Ol = { exports: {} },
  La = {},
  uh = { exports: {} },
  ch = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dh;
function jg() {
  return (
    dh ||
      ((dh = 1),
      (function (c) {
        function o(C, z) {
          var V = C.length;
          C.push(z);
          e: for (; 0 < V; ) {
            var ce = (V - 1) >>> 1,
              de = C[ce];
            if (0 < p(de, z)) ((C[ce] = z), (C[V] = de), (V = ce));
            else break e;
          }
        }
        function i(C) {
          return C.length === 0 ? null : C[0];
        }
        function l(C) {
          if (C.length === 0) return null;
          var z = C[0],
            V = C.pop();
          if (V !== z) {
            C[0] = V;
            e: for (var ce = 0, de = C.length, h = de >>> 1; ce < h; ) {
              var y = 2 * (ce + 1) - 1,
                P = C[y],
                O = y + 1,
                I = C[O];
              if (0 > p(P, V))
                O < de && 0 > p(I, P)
                  ? ((C[ce] = I), (C[O] = V), (ce = O))
                  : ((C[ce] = P), (C[y] = V), (ce = y));
              else if (O < de && 0 > p(I, V)) ((C[ce] = I), (C[O] = V), (ce = O));
              else break e;
            }
          }
          return z;
        }
        function p(C, z) {
          var V = C.sortIndex - z.sortIndex;
          return V !== 0 ? V : C.id - z.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var b = performance;
          c.unstable_now = function () {
            return b.now();
          };
        } else {
          var R = Date,
            M = R.now();
          c.unstable_now = function () {
            return R.now() - M;
          };
        }
        var _ = [],
          S = [],
          A = 1,
          L = null,
          H = 3,
          q = !1,
          oe = !1,
          Q = !1,
          se = !1,
          qe = typeof setTimeout == 'function' ? setTimeout : null,
          Pt = typeof clearTimeout == 'function' ? clearTimeout : null,
          je = typeof setImmediate < 'u' ? setImmediate : null;
        function _e(C) {
          for (var z = i(S); z !== null; ) {
            if (z.callback === null) l(S);
            else if (z.startTime <= C) (l(S), (z.sortIndex = z.expirationTime), o(_, z));
            else break;
            z = i(S);
          }
        }
        function Pe(C) {
          if (((Q = !1), _e(C), !oe))
            if (i(_) !== null) ((oe = !0), Ve || ((Ve = !0), Ge()));
            else {
              var z = i(S);
              z !== null && et(Pe, z.startTime - C);
            }
        }
        var Ve = !1,
          J = -1,
          ke = 5,
          lt = -1;
        function Me() {
          return se ? !0 : !(c.unstable_now() - lt < ke);
        }
        function Je() {
          if (((se = !1), Ve)) {
            var C = c.unstable_now();
            lt = C;
            var z = !0;
            try {
              e: {
                ((oe = !1), Q && ((Q = !1), Pt(J), (J = -1)), (q = !0));
                var V = H;
                try {
                  t: {
                    for (_e(C), L = i(_); L !== null && !(L.expirationTime > C && Me()); ) {
                      var ce = L.callback;
                      if (typeof ce == 'function') {
                        ((L.callback = null), (H = L.priorityLevel));
                        var de = ce(L.expirationTime <= C);
                        if (((C = c.unstable_now()), typeof de == 'function')) {
                          ((L.callback = de), _e(C), (z = !0));
                          break t;
                        }
                        (L === i(_) && l(_), _e(C));
                      } else l(_);
                      L = i(_);
                    }
                    if (L !== null) z = !0;
                    else {
                      var h = i(S);
                      (h !== null && et(Pe, h.startTime - C), (z = !1));
                    }
                  }
                  break e;
                } finally {
                  ((L = null), (H = V), (q = !1));
                }
                z = void 0;
              }
            } finally {
              z ? Ge() : (Ve = !1);
            }
          }
        }
        var Ge;
        if (typeof je == 'function')
          Ge = function () {
            je(Je);
          };
        else if (typeof MessageChannel < 'u') {
          var Ye = new MessageChannel(),
            xt = Ye.port2;
          ((Ye.port1.onmessage = Je),
            (Ge = function () {
              xt.postMessage(null);
            }));
        } else
          Ge = function () {
            qe(Je, 0);
          };
        function et(C, z) {
          J = qe(function () {
            C(c.unstable_now());
          }, z);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (C) {
            C.callback = null;
          }),
          (c.unstable_forceFrameRate = function (C) {
            0 > C || 125 < C
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ke = 0 < C ? Math.floor(1e3 / C) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return H;
          }),
          (c.unstable_next = function (C) {
            switch (H) {
              case 1:
              case 2:
              case 3:
                var z = 3;
                break;
              default:
                z = H;
            }
            var V = H;
            H = z;
            try {
              return C();
            } finally {
              H = V;
            }
          }),
          (c.unstable_requestPaint = function () {
            se = !0;
          }),
          (c.unstable_runWithPriority = function (C, z) {
            switch (C) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                C = 3;
            }
            var V = H;
            H = C;
            try {
              return z();
            } finally {
              H = V;
            }
          }),
          (c.unstable_scheduleCallback = function (C, z, V) {
            var ce = c.unstable_now();
            switch (
              (typeof V == 'object' && V !== null
                ? ((V = V.delay), (V = typeof V == 'number' && 0 < V ? ce + V : ce))
                : (V = ce),
              C)
            ) {
              case 1:
                var de = -1;
                break;
              case 2:
                de = 250;
                break;
              case 5:
                de = 1073741823;
                break;
              case 4:
                de = 1e4;
                break;
              default:
                de = 5e3;
            }
            return (
              (de = V + de),
              (C = {
                id: A++,
                callback: z,
                priorityLevel: C,
                startTime: V,
                expirationTime: de,
                sortIndex: -1,
              }),
              V > ce
                ? ((C.sortIndex = V),
                  o(S, C),
                  i(_) === null && C === i(S) && (Q ? (Pt(J), (J = -1)) : (Q = !0), et(Pe, V - ce)))
                : ((C.sortIndex = de), o(_, C), oe || q || ((oe = !0), Ve || ((Ve = !0), Ge()))),
              C
            );
          }),
          (c.unstable_shouldYield = Me),
          (c.unstable_wrapCallback = function (C) {
            var z = H;
            return function () {
              var V = H;
              H = z;
              try {
                return C.apply(this, arguments);
              } finally {
                H = V;
              }
            };
          }));
      })(ch)),
    ch
  );
}
var fh;
function Pg() {
  return (fh || ((fh = 1), (uh.exports = jg())), uh.exports);
}
var Ll = { exports: {} },
  Xe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hh;
function Ag() {
  if (hh) return Xe;
  hh = 1;
  var c = Kl();
  function o(_) {
    var S = 'https://react.dev/errors/' + _;
    if (1 < arguments.length) {
      S += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++) S += '&args[]=' + encodeURIComponent(arguments[A]);
    }
    return (
      'Minified React error #' +
      _ +
      '; visit ' +
      S +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function i() {}
  var l = {
      d: {
        f: i,
        r: function () {
          throw Error(o(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    p = Symbol.for('react.portal');
  function b(_, S, A) {
    var L = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: L == null ? null : '' + L,
      children: _,
      containerInfo: S,
      implementation: A,
    };
  }
  var R = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(_, S) {
    if (_ === 'font') return '';
    if (typeof S == 'string') return S === 'use-credentials' ? S : '';
  }
  return (
    (Xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
    (Xe.createPortal = function (_, S) {
      var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)) throw Error(o(299));
      return b(_, S, null, A);
    }),
    (Xe.flushSync = function (_) {
      var S = R.T,
        A = l.p;
      try {
        if (((R.T = null), (l.p = 2), _)) return _();
      } finally {
        ((R.T = S), (l.p = A), l.d.f());
      }
    }),
    (Xe.preconnect = function (_, S) {
      typeof _ == 'string' &&
        (S
          ? ((S = S.crossOrigin),
            (S = typeof S == 'string' ? (S === 'use-credentials' ? S : '') : void 0))
          : (S = null),
        l.d.C(_, S));
    }),
    (Xe.prefetchDNS = function (_) {
      typeof _ == 'string' && l.d.D(_);
    }),
    (Xe.preinit = function (_, S) {
      if (typeof _ == 'string' && S && typeof S.as == 'string') {
        var A = S.as,
          L = M(A, S.crossOrigin),
          H = typeof S.integrity == 'string' ? S.integrity : void 0,
          q = typeof S.fetchPriority == 'string' ? S.fetchPriority : void 0;
        A === 'style'
          ? l.d.S(_, typeof S.precedence == 'string' ? S.precedence : void 0, {
              crossOrigin: L,
              integrity: H,
              fetchPriority: q,
            })
          : A === 'script' &&
            l.d.X(_, {
              crossOrigin: L,
              integrity: H,
              fetchPriority: q,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
      }
    }),
    (Xe.preinitModule = function (_, S) {
      if (typeof _ == 'string')
        if (typeof S == 'object' && S !== null) {
          if (S.as == null || S.as === 'script') {
            var A = M(S.as, S.crossOrigin);
            l.d.M(_, {
              crossOrigin: A,
              integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
          }
        } else S == null && l.d.M(_);
    }),
    (Xe.preload = function (_, S) {
      if (typeof _ == 'string' && typeof S == 'object' && S !== null && typeof S.as == 'string') {
        var A = S.as,
          L = M(A, S.crossOrigin);
        l.d.L(_, A, {
          crossOrigin: L,
          integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
          nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
          type: typeof S.type == 'string' ? S.type : void 0,
          fetchPriority: typeof S.fetchPriority == 'string' ? S.fetchPriority : void 0,
          referrerPolicy: typeof S.referrerPolicy == 'string' ? S.referrerPolicy : void 0,
          imageSrcSet: typeof S.imageSrcSet == 'string' ? S.imageSrcSet : void 0,
          imageSizes: typeof S.imageSizes == 'string' ? S.imageSizes : void 0,
          media: typeof S.media == 'string' ? S.media : void 0,
        });
      }
    }),
    (Xe.preloadModule = function (_, S) {
      if (typeof _ == 'string')
        if (S) {
          var A = M(S.as, S.crossOrigin);
          l.d.m(_, {
            as: typeof S.as == 'string' && S.as !== 'script' ? S.as : void 0,
            crossOrigin: A,
            integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
          });
        } else l.d.m(_);
    }),
    (Xe.requestFormReset = function (_) {
      l.d.r(_);
    }),
    (Xe.unstable_batchedUpdates = function (_, S) {
      return _(S);
    }),
    (Xe.useFormState = function (_, S, A) {
      return R.H.useFormState(_, S, A);
    }),
    (Xe.useFormStatus = function () {
      return R.H.useHostTransitionStatus();
    }),
    (Xe.version = '19.2.0'),
    Xe
  );
}
var ph;
function Rg() {
  if (ph) return Ll.exports;
  ph = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return (c(), (Ll.exports = Ag()), Ll.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mh;
function Og() {
  if (mh) return La;
  mh = 1;
  var c = Pg(),
    o = Kl(),
    i = Rg();
  function l(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++) t += '&args[]=' + encodeURIComponent(arguments[n]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function p(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function b(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function R(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function M(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function _(e) {
    if (b(e) !== e) throw Error(l(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = b(e)), t === null)) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var s = a.alternate;
      if (s === null) {
        if (((r = a.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (a.child === s.child) {
        for (s = a.child; s; ) {
          if (s === n) return (_(a), e);
          if (s === r) return (_(a), t);
          s = s.sibling;
        }
        throw Error(l(188));
      }
      if (n.return !== r.return) ((n = a), (r = s));
      else {
        for (var u = !1, d = a.child; d; ) {
          if (d === n) {
            ((u = !0), (n = a), (r = s));
            break;
          }
          if (d === r) {
            ((u = !0), (r = a), (n = s));
            break;
          }
          d = d.sibling;
        }
        if (!u) {
          for (d = s.child; d; ) {
            if (d === n) {
              ((u = !0), (n = s), (r = a));
              break;
            }
            if (d === r) {
              ((u = !0), (r = s), (n = a));
              break;
            }
            d = d.sibling;
          }
          if (!u) throw Error(l(189));
        }
      }
      if (n.alternate !== r) throw Error(l(190));
    }
    if (n.tag !== 3) throw Error(l(188));
    return n.stateNode.current === n ? e : t;
  }
  function A(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = A(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var L = Object.assign,
    H = Symbol.for('react.element'),
    q = Symbol.for('react.transitional.element'),
    oe = Symbol.for('react.portal'),
    Q = Symbol.for('react.fragment'),
    se = Symbol.for('react.strict_mode'),
    qe = Symbol.for('react.profiler'),
    Pt = Symbol.for('react.consumer'),
    je = Symbol.for('react.context'),
    _e = Symbol.for('react.forward_ref'),
    Pe = Symbol.for('react.suspense'),
    Ve = Symbol.for('react.suspense_list'),
    J = Symbol.for('react.memo'),
    ke = Symbol.for('react.lazy'),
    lt = Symbol.for('react.activity'),
    Me = Symbol.for('react.memo_cache_sentinel'),
    Je = Symbol.iterator;
  function Ge(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Je && e[Je]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Ye = Symbol.for('react.client.reference');
  function xt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Ye ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Q:
        return 'Fragment';
      case qe:
        return 'Profiler';
      case se:
        return 'StrictMode';
      case Pe:
        return 'Suspense';
      case Ve:
        return 'SuspenseList';
      case lt:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case oe:
          return 'Portal';
        case je:
          return e.displayName || 'Context';
        case Pt:
          return (e._context.displayName || 'Context') + '.Consumer';
        case _e:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case J:
          return ((t = e.displayName || null), t !== null ? t : xt(e.type) || 'Memo');
        case ke:
          ((t = e._payload), (e = e._init));
          try {
            return xt(e(t));
          } catch {}
      }
    return null;
  }
  var et = Array.isArray,
    C = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    z = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = { pending: !1, data: null, method: null, action: null },
    ce = [],
    de = -1;
  function h(e) {
    return { current: e };
  }
  function y(e) {
    0 > de || ((e.current = ce[de]), (ce[de] = null), de--);
  }
  function P(e, t) {
    (de++, (ce[de] = e.current), (e.current = t));
  }
  var O = h(null),
    I = h(null),
    $ = h(null),
    Z = h(null);
  function Ie(e, t) {
    switch ((P($, t), P(I, e), P(O, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Ef(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Ef(t)), (e = Cf(t, e)));
        else
          switch (e) {
            case 'svg':
              e = 1;
              break;
            case 'math':
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (y(O), P(O, e));
  }
  function Ee() {
    (y(O), y(I), y($));
  }
  function Fr(e) {
    e.memoizedState !== null && P(Z, e);
    var t = O.current,
      n = Cf(t, e.type);
    t !== n && (P(I, e), P(O, n));
  }
  function Da(e) {
    (I.current === e && (y(O), y(I)), Z.current === e && (y(Z), (ja._currentValue = V)));
  }
  var mo, tu;
  function zn(e) {
    if (mo === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((mo = (t && t[1]) || ''),
          (tu =
            -1 <
            n.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < n.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      mo +
      e +
      tu
    );
  }
  var go = !1;
  function yo(e, t) {
    if (!e || go) return '';
    go = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var j = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(j.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(j, []);
                } catch (N) {
                  var k = N;
                }
                Reflect.construct(e, [], j);
              } else {
                try {
                  j.call();
                } catch (N) {
                  k = N;
                }
                e.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                k = N;
              }
              (j = e()) && typeof j.catch == 'function' && j.catch(function () {});
            }
          } catch (N) {
            if (N && k && typeof N.stack == 'string') return [N.stack, k.stack];
          }
          return [null, null];
        },
      };
      r.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var a = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, 'name');
      a &&
        a.configurable &&
        Object.defineProperty(r.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var s = r.DetermineComponentFrameRoot(),
        u = s[0],
        d = s[1];
      if (u && d) {
        var m = u.split(`
`),
          w = d.split(`
`);
        for (a = r = 0; r < m.length && !m[r].includes('DetermineComponentFrameRoot'); ) r++;
        for (; a < w.length && !w[a].includes('DetermineComponentFrameRoot'); ) a++;
        if (r === m.length || a === w.length)
          for (r = m.length - 1, a = w.length - 1; 1 <= r && 0 <= a && m[r] !== w[a]; ) a--;
        for (; 1 <= r && 0 <= a; r--, a--)
          if (m[r] !== w[a]) {
            if (r !== 1 || a !== 1)
              do
                if ((r--, a--, 0 > a || m[r] !== w[a])) {
                  var E =
                    `
` + m[r].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      E.includes('<anonymous>') &&
                      (E = E.replace('<anonymous>', e.displayName)),
                    E
                  );
                }
              while (1 <= r && 0 <= a);
            break;
          }
      }
    } finally {
      ((go = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : '') ? zn(n) : '';
  }
  function np(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return zn(e.type);
      case 16:
        return zn('Lazy');
      case 13:
        return e.child !== t && t !== null ? zn('Suspense Fallback') : zn('Suspense');
      case 19:
        return zn('SuspenseList');
      case 0:
      case 15:
        return yo(e.type, !1);
      case 11:
        return yo(e.type.render, !1);
      case 1:
        return yo(e.type, !0);
      case 31:
        return zn('Activity');
      default:
        return '';
    }
  }
  function nu(e) {
    try {
      var t = '',
        n = null;
      do ((t += np(e, n)), (n = e), (e = e.return));
      while (e);
      return t;
    } catch (r) {
      return (
        `
Error generating stack: ` +
        r.message +
        `
` +
        r.stack
      );
    }
  }
  var vo = Object.prototype.hasOwnProperty,
    bo = c.unstable_scheduleCallback,
    xo = c.unstable_cancelCallback,
    rp = c.unstable_shouldYield,
    ap = c.unstable_requestPaint,
    ut = c.unstable_now,
    sp = c.unstable_getCurrentPriorityLevel,
    ru = c.unstable_ImmediatePriority,
    au = c.unstable_UserBlockingPriority,
    Fa = c.unstable_NormalPriority,
    op = c.unstable_LowPriority,
    su = c.unstable_IdlePriority,
    ip = c.log,
    lp = c.unstable_setDisableYieldValue,
    Br = null,
    ct = null;
  function un(e) {
    if ((typeof ip == 'function' && lp(e), ct && typeof ct.setStrictMode == 'function'))
      try {
        ct.setStrictMode(Br, e);
      } catch {}
  }
  var dt = Math.clz32 ? Math.clz32 : dp,
    up = Math.log,
    cp = Math.LN2;
  function dp(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((up(e) / cp) | 0)) | 0);
  }
  var Ba = 256,
    qa = 262144,
    Va = 4194304;
  function Mn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Ha(e, t, n) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var a = 0,
      s = e.suspendedLanes,
      u = e.pingedLanes;
    e = e.warmLanes;
    var d = r & 134217727;
    return (
      d !== 0
        ? ((r = d & ~s),
          r !== 0
            ? (a = Mn(r))
            : ((u &= d), u !== 0 ? (a = Mn(u)) : n || ((n = d & ~e), n !== 0 && (a = Mn(n)))))
        : ((d = r & ~s),
          d !== 0
            ? (a = Mn(d))
            : u !== 0
              ? (a = Mn(u))
              : n || ((n = r & ~e), n !== 0 && (a = Mn(n)))),
      a === 0
        ? 0
        : t !== 0 &&
            t !== a &&
            (t & s) === 0 &&
            ((s = a & -a), (n = t & -t), s >= n || (s === 32 && (n & 4194048) !== 0))
          ? t
          : a
    );
  }
  function qr(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function fp(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ou() {
    var e = Va;
    return ((Va <<= 1), (Va & 62914560) === 0 && (Va = 4194304), e);
  }
  function wo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Vr(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function hp(e, t, n, r, a, s) {
    var u = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var d = e.entanglements,
      m = e.expirationTimes,
      w = e.hiddenUpdates;
    for (n = u & ~n; 0 < n; ) {
      var E = 31 - dt(n),
        j = 1 << E;
      ((d[E] = 0), (m[E] = -1));
      var k = w[E];
      if (k !== null)
        for (w[E] = null, E = 0; E < k.length; E++) {
          var N = k[E];
          N !== null && (N.lane &= -536870913);
        }
      n &= ~j;
    }
    (r !== 0 && iu(e, r, 0),
      s !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(u & ~t)));
  }
  function iu(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var r = 31 - dt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930)));
  }
  function lu(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - dt(n),
        a = 1 << r;
      ((a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a));
    }
  }
  function uu(e, t) {
    var n = t & -t;
    return ((n = (n & 42) !== 0 ? 1 : ko(n)), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n);
  }
  function ko(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function So(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function cu() {
    var e = z.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Xf(e.type));
  }
  function du(e, t) {
    var n = z.p;
    try {
      return ((z.p = e), t());
    } finally {
      z.p = n;
    }
  }
  var cn = Math.random().toString(36).slice(2),
    He = '__reactFiber$' + cn,
    tt = '__reactProps$' + cn,
    er = '__reactContainer$' + cn,
    No = '__reactEvents$' + cn,
    pp = '__reactListeners$' + cn,
    mp = '__reactHandles$' + cn,
    fu = '__reactResources$' + cn,
    Hr = '__reactMarker$' + cn;
  function _o(e) {
    (delete e[He], delete e[tt], delete e[No], delete e[pp], delete e[mp]);
  }
  function tr(e) {
    var t = e[He];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[er] || n[He])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Lf(e); e !== null; ) {
            if ((n = e[He])) return n;
            e = Lf(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function nr(e) {
    if ((e = e[He] || e[er])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function $r(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(l(33));
  }
  function rr(e) {
    var t = e[fu];
    return (t || (t = e[fu] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Fe(e) {
    e[Hr] = !0;
  }
  var hu = new Set(),
    pu = {};
  function In(e, t) {
    (ar(e, t), ar(e + 'Capture', t));
  }
  function ar(e, t) {
    for (pu[e] = t, e = 0; e < t.length; e++) hu.add(t[e]);
  }
  var gp = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    mu = {},
    gu = {};
  function yp(e) {
    return vo.call(gu, e)
      ? !0
      : vo.call(mu, e)
        ? !1
        : gp.test(e)
          ? (gu[e] = !0)
          : ((mu[e] = !0), !1);
  }
  function $a(e, t, n) {
    if (yp(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(t);
            return;
          case 'boolean':
            var r = t.toLowerCase().slice(0, 5);
            if (r !== 'data-' && r !== 'aria-') {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, '' + n);
      }
  }
  function Wa(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + n);
    }
  }
  function Ht(e, t, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, '' + r);
    }
  }
  function wt(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function yu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function vp(e, t, n) {
    var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof r < 'u' &&
      typeof r.get == 'function' &&
      typeof r.set == 'function'
    ) {
      var a = r.get,
        s = r.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (u) {
            ((n = '' + u), s.call(this, u));
          },
        }),
        Object.defineProperty(e, t, { enumerable: r.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (u) {
            n = '' + u;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Eo(e) {
    if (!e._valueTracker) {
      var t = yu(e) ? 'checked' : 'value';
      e._valueTracker = vp(e, t, '' + e[t]);
    }
  }
  function vu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = '';
    return (
      e && (r = yu(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Qa(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var bp = /[\n"\\]/g;
  function At(e) {
    return e.replace(bp, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Co(e, t, n, r, a, s, u, d) {
    ((e.name = ''),
      u != null && typeof u != 'function' && typeof u != 'symbol' && typeof u != 'boolean'
        ? (e.type = u)
        : e.removeAttribute('type'),
      t != null
        ? u === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + wt(t))
          : e.value !== '' + wt(t) && (e.value = '' + wt(t))
        : (u !== 'submit' && u !== 'reset') || e.removeAttribute('value'),
      t != null
        ? To(e, u, wt(t))
        : n != null
          ? To(e, u, wt(n))
          : r != null && e.removeAttribute('value'),
      a == null && s != null && (e.defaultChecked = !!s),
      a != null && (e.checked = a && typeof a != 'function' && typeof a != 'symbol'),
      d != null && typeof d != 'function' && typeof d != 'symbol' && typeof d != 'boolean'
        ? (e.name = '' + wt(d))
        : e.removeAttribute('name'));
  }
  function bu(e, t, n, r, a, s, u, d) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || n != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        Eo(e);
        return;
      }
      ((n = n != null ? '' + wt(n) : ''),
        (t = t != null ? '' + wt(t) : n),
        d || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((r = r ?? a),
      (r = typeof r != 'function' && typeof r != 'symbol' && !!r),
      (e.checked = d ? e.checked : !!r),
      (e.defaultChecked = !!r),
      u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.name = u),
      Eo(e));
  }
  function To(e, t, n) {
    (t === 'number' && Qa(e.ownerDocument) === e) ||
      e.defaultValue === '' + n ||
      (e.defaultValue = '' + n);
  }
  function sr(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < n.length; a++) t['$' + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        ((a = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== a && (e[n].selected = a),
          a && r && (e[n].defaultSelected = !0));
    } else {
      for (n = '' + wt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          ((e[a].selected = !0), r && (e[a].defaultSelected = !0));
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function xu(e, t, n) {
    if (t != null && ((t = '' + wt(t)), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? '' + wt(n) : '';
  }
  function wu(e, t, n, r) {
    if (t == null) {
      if (r != null) {
        if (n != null) throw Error(l(92));
        if (et(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        n = r;
      }
      (n == null && (n = ''), (t = n));
    }
    ((n = wt(t)),
      (e.defaultValue = n),
      (r = e.textContent),
      r === n && r !== '' && r !== null && (e.value = r),
      Eo(e));
  }
  function or(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var xp = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function ku(e, t, n) {
    var r = t.indexOf('--') === 0;
    n == null || typeof n == 'boolean' || n === ''
      ? r
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : r
        ? e.setProperty(t, n)
        : typeof n != 'number' || n === 0 || xp.has(t)
          ? t === 'float'
            ? (e.cssFloat = n)
            : (e[t] = ('' + n).trim())
          : (e[t] = n + 'px');
  }
  function Su(e, t, n) {
    if (t != null && typeof t != 'object') throw Error(l(62));
    if (((e = e.style), n != null)) {
      for (var r in n)
        !n.hasOwnProperty(r) ||
          (t != null && t.hasOwnProperty(r)) ||
          (r.indexOf('--') === 0
            ? e.setProperty(r, '')
            : r === 'float'
              ? (e.cssFloat = '')
              : (e[r] = ''));
      for (var a in t) ((r = t[a]), t.hasOwnProperty(a) && n[a] !== r && ku(e, a, r));
    } else for (var s in t) t.hasOwnProperty(s) && ku(e, s, t[s]);
  }
  function jo(e) {
    if (e.indexOf('-') === -1) return !1;
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var wp = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    kp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ka(e) {
    return kp.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function $t() {}
  var Po = null;
  function Ao(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ir = null,
    lr = null;
  function Nu(e) {
    var t = nr(e);
    if (t && (e = t.stateNode)) {
      var n = e[tt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Co(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === 'radio' && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll('input[name="' + At('' + t) + '"][type="radio"]'), t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var a = r[tt] || null;
                if (!a) throw Error(l(90));
                Co(
                  r,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++) ((r = n[t]), r.form === e.form && vu(r));
          }
          break e;
        case 'textarea':
          xu(e, n.value, n.defaultValue);
          break e;
        case 'select':
          ((t = n.value), t != null && sr(e, !!n.multiple, t, !1));
      }
    }
  }
  var Ro = !1;
  function _u(e, t, n) {
    if (Ro) return e(t, n);
    Ro = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((Ro = !1),
        (ir !== null || lr !== null) &&
          (zs(), ir && ((t = ir), (e = lr), (lr = ir = null), Nu(t), e)))
      )
        for (t = 0; t < e.length; t++) Nu(e[t]);
    }
  }
  function Wr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = n[tt] || null;
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(l(231, t, typeof n));
    return n;
  }
  var Wt = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Oo = !1;
  if (Wt)
    try {
      var Qr = {};
      (Object.defineProperty(Qr, 'passive', {
        get: function () {
          Oo = !0;
        },
      }),
        window.addEventListener('test', Qr, Qr),
        window.removeEventListener('test', Qr, Qr));
    } catch {
      Oo = !1;
    }
  var dn = null,
    Lo = null,
    Ga = null;
  function Eu() {
    if (Ga) return Ga;
    var e,
      t = Lo,
      n = t.length,
      r,
      a = 'value' in dn ? dn.value : dn.textContent,
      s = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === a[s - r]; r++);
    return (Ga = a.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Xa(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ja() {
    return !0;
  }
  function Cu() {
    return !1;
  }
  function nt(e) {
    function t(n, r, a, s, u) {
      ((this._reactName = n),
        (this._targetInst = a),
        (this.type = r),
        (this.nativeEvent = s),
        (this.target = u),
        (this.currentTarget = null));
      for (var d in e) e.hasOwnProperty(d) && ((n = e[d]), (this[d] = n ? n(s) : s[d]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Ja
          : Cu),
        (this.isPropagationStopped = Cu),
        this
      );
    }
    return (
      L(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = Ja));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = Ja));
        },
        persist: function () {},
        isPersistent: Ja,
      }),
      t
    );
  }
  var Un = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Za = nt(Un),
    Kr = L({}, Un, { view: 0, detail: 0 }),
    Sp = nt(Kr),
    zo,
    Mo,
    Gr,
    Ya = L({}, Kr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Uo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Gr &&
              (Gr && e.type === 'mousemove'
                ? ((zo = e.screenX - Gr.screenX), (Mo = e.screenY - Gr.screenY))
                : (Mo = zo = 0),
              (Gr = e)),
            zo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Mo;
      },
    }),
    Tu = nt(Ya),
    Np = L({}, Ya, { dataTransfer: 0 }),
    _p = nt(Np),
    Ep = L({}, Kr, { relatedTarget: 0 }),
    Io = nt(Ep),
    Cp = L({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Tp = nt(Cp),
    jp = L({}, Un, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Pp = nt(jp),
    Ap = L({}, Un, { data: 0 }),
    ju = nt(Ap),
    Rp = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Op = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Lp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function zp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Lp[e]) ? !!t[e] : !1;
  }
  function Uo() {
    return zp;
  }
  var Mp = L({}, Kr, {
      key: function (e) {
        if (e.key) {
          var t = Rp[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Xa(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Op[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Uo,
      charCode: function (e) {
        return e.type === 'keypress' ? Xa(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Xa(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Ip = nt(Mp),
    Up = L({}, Ya, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Pu = nt(Up),
    Dp = L({}, Kr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Uo,
    }),
    Fp = nt(Dp),
    Bp = L({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qp = nt(Bp),
    Vp = L({}, Ya, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Hp = nt(Vp),
    $p = L({}, Un, { newState: 0, oldState: 0 }),
    Wp = nt($p),
    Qp = [9, 13, 27, 32],
    Do = Wt && 'CompositionEvent' in window,
    Xr = null;
  Wt && 'documentMode' in document && (Xr = document.documentMode);
  var Kp = Wt && 'TextEvent' in window && !Xr,
    Au = Wt && (!Do || (Xr && 8 < Xr && 11 >= Xr)),
    Ru = ' ',
    Ou = !1;
  function Lu(e, t) {
    switch (e) {
      case 'keyup':
        return Qp.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function zu(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var ur = !1;
  function Gp(e, t) {
    switch (e) {
      case 'compositionend':
        return zu(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Ou = !0), Ru);
      case 'textInput':
        return ((e = t.data), e === Ru && Ou ? null : e);
      default:
        return null;
    }
  }
  function Xp(e, t) {
    if (ur)
      return e === 'compositionend' || (!Do && Lu(e, t))
        ? ((e = Eu()), (Ga = Lo = dn = null), (ur = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return Au && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Jp = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Mu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Jp[e.type] : t === 'textarea';
  }
  function Iu(e, t, n, r) {
    (ir ? (lr ? lr.push(r) : (lr = [r])) : (ir = r),
      (t = qs(t, 'onChange')),
      0 < t.length &&
        ((n = new Za('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
  }
  var Jr = null,
    Zr = null;
  function Zp(e) {
    xf(e, 0);
  }
  function es(e) {
    var t = $r(e);
    if (vu(t)) return e;
  }
  function Uu(e, t) {
    if (e === 'change') return t;
  }
  var Du = !1;
  if (Wt) {
    var Fo;
    if (Wt) {
      var Bo = 'oninput' in document;
      if (!Bo) {
        var Fu = document.createElement('div');
        (Fu.setAttribute('oninput', 'return;'), (Bo = typeof Fu.oninput == 'function'));
      }
      Fo = Bo;
    } else Fo = !1;
    Du = Fo && (!document.documentMode || 9 < document.documentMode);
  }
  function Bu() {
    Jr && (Jr.detachEvent('onpropertychange', qu), (Zr = Jr = null));
  }
  function qu(e) {
    if (e.propertyName === 'value' && es(Zr)) {
      var t = [];
      (Iu(t, Zr, e, Ao(e)), _u(Zp, t));
    }
  }
  function Yp(e, t, n) {
    e === 'focusin'
      ? (Bu(), (Jr = t), (Zr = n), Jr.attachEvent('onpropertychange', qu))
      : e === 'focusout' && Bu();
  }
  function em(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return es(Zr);
  }
  function tm(e, t) {
    if (e === 'click') return es(t);
  }
  function nm(e, t) {
    if (e === 'input' || e === 'change') return es(t);
  }
  function rm(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ft = typeof Object.is == 'function' ? Object.is : rm;
  function Yr(e, t) {
    if (ft(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var a = n[r];
      if (!vo.call(t, a) || !ft(e[a], t[a])) return !1;
    }
    return !0;
  }
  function Vu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Hu(e, t) {
    var n = Vu(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Vu(n);
    }
  }
  function $u(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? $u(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Wu(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Qa(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == 'string';
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Qa(e.document);
    }
    return t;
  }
  function qo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  var am = Wt && 'documentMode' in document && 11 >= document.documentMode,
    cr = null,
    Vo = null,
    ea = null,
    Ho = !1;
  function Qu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ho ||
      cr == null ||
      cr !== Qa(r) ||
      ((r = cr),
      'selectionStart' in r && qo(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (ea && Yr(ea, r)) ||
        ((ea = r),
        (r = qs(Vo, 'onSelect')),
        0 < r.length &&
          ((t = new Za('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = cr))));
  }
  function Dn(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var dr = {
      animationend: Dn('Animation', 'AnimationEnd'),
      animationiteration: Dn('Animation', 'AnimationIteration'),
      animationstart: Dn('Animation', 'AnimationStart'),
      transitionrun: Dn('Transition', 'TransitionRun'),
      transitionstart: Dn('Transition', 'TransitionStart'),
      transitioncancel: Dn('Transition', 'TransitionCancel'),
      transitionend: Dn('Transition', 'TransitionEnd'),
    },
    $o = {},
    Ku = {};
  Wt &&
    ((Ku = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete dr.animationend.animation,
      delete dr.animationiteration.animation,
      delete dr.animationstart.animation),
    'TransitionEvent' in window || delete dr.transitionend.transition);
  function Fn(e) {
    if ($o[e]) return $o[e];
    if (!dr[e]) return e;
    var t = dr[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ku) return ($o[e] = t[n]);
    return e;
  }
  var Gu = Fn('animationend'),
    Xu = Fn('animationiteration'),
    Ju = Fn('animationstart'),
    sm = Fn('transitionrun'),
    om = Fn('transitionstart'),
    im = Fn('transitioncancel'),
    Zu = Fn('transitionend'),
    Yu = new Map(),
    Wo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Wo.push('scrollEnd');
  function Rt(e, t) {
    (Yu.set(e, t), In(t, [e]));
  }
  var ts =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == 'object' && e !== null && typeof e.message == 'string'
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', e);
              return;
            }
            console.error(e);
          },
    kt = [],
    fr = 0,
    Qo = 0;
  function ns() {
    for (var e = fr, t = (Qo = fr = 0); t < e; ) {
      var n = kt[t];
      kt[t++] = null;
      var r = kt[t];
      kt[t++] = null;
      var a = kt[t];
      kt[t++] = null;
      var s = kt[t];
      if (((kt[t++] = null), r !== null && a !== null)) {
        var u = r.pending;
        (u === null ? (a.next = a) : ((a.next = u.next), (u.next = a)), (r.pending = a));
      }
      s !== 0 && ec(n, a, s);
    }
  }
  function rs(e, t, n, r) {
    ((kt[fr++] = e),
      (kt[fr++] = t),
      (kt[fr++] = n),
      (kt[fr++] = r),
      (Qo |= r),
      (e.lanes |= r),
      (e = e.alternate),
      e !== null && (e.lanes |= r));
  }
  function Ko(e, t, n, r) {
    return (rs(e, t, n, r), as(e));
  }
  function Bn(e, t) {
    return (rs(e, null, null, t), as(e));
  }
  function ec(e, t, n) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n);
    for (var a = !1, s = e.return; s !== null; )
      ((s.childLanes |= n),
        (r = s.alternate),
        r !== null && (r.childLanes |= n),
        s.tag === 22 && ((e = s.stateNode), e === null || e._visibility & 1 || (a = !0)),
        (e = s),
        (s = s.return));
    return e.tag === 3
      ? ((s = e.stateNode),
        a &&
          t !== null &&
          ((a = 31 - dt(n)),
          (e = s.hiddenUpdates),
          (r = e[a]),
          r === null ? (e[a] = [t]) : r.push(t),
          (t.lane = n | 536870912)),
        s)
      : null;
  }
  function as(e) {
    if (50 < ka) throw ((ka = 0), (rl = null), Error(l(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var hr = {};
  function lm(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ht(e, t, n, r) {
    return new lm(e, t, n, r);
  }
  function Go(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Qt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ht(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function tc(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ss(e, t, n, r, a, s) {
    var u = 0;
    if (((r = e), typeof e == 'function')) Go(e) && (u = 1);
    else if (typeof e == 'string')
      u = hg(e, n, O.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case lt:
          return ((e = ht(31, n, t, a)), (e.elementType = lt), (e.lanes = s), e);
        case Q:
          return qn(n.children, a, s, t);
        case se:
          ((u = 8), (a |= 24));
          break;
        case qe:
          return ((e = ht(12, n, t, a | 2)), (e.elementType = qe), (e.lanes = s), e);
        case Pe:
          return ((e = ht(13, n, t, a)), (e.elementType = Pe), (e.lanes = s), e);
        case Ve:
          return ((e = ht(19, n, t, a)), (e.elementType = Ve), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case je:
                u = 10;
                break e;
              case Pt:
                u = 9;
                break e;
              case _e:
                u = 11;
                break e;
              case J:
                u = 14;
                break e;
              case ke:
                ((u = 16), (r = null));
                break e;
            }
          ((u = 29), (n = Error(l(130, e === null ? 'null' : typeof e, ''))), (r = null));
      }
    return ((t = ht(u, n, t, a)), (t.elementType = e), (t.type = r), (t.lanes = s), t);
  }
  function qn(e, t, n, r) {
    return ((e = ht(7, e, r, t)), (e.lanes = n), e);
  }
  function Xo(e, t, n) {
    return ((e = ht(6, e, null, t)), (e.lanes = n), e);
  }
  function nc(e) {
    var t = ht(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Jo(e, t, n) {
    return (
      (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var rc = new WeakMap();
  function St(e, t) {
    if (typeof e == 'object' && e !== null) {
      var n = rc.get(e);
      return n !== void 0 ? n : ((t = { value: e, source: t, stack: nu(t) }), rc.set(e, t), t);
    }
    return { value: e, source: t, stack: nu(t) };
  }
  var pr = [],
    mr = 0,
    os = null,
    ta = 0,
    Nt = [],
    _t = 0,
    fn = null,
    It = 1,
    Ut = '';
  function Kt(e, t) {
    ((pr[mr++] = ta), (pr[mr++] = os), (os = e), (ta = t));
  }
  function ac(e, t, n) {
    ((Nt[_t++] = It), (Nt[_t++] = Ut), (Nt[_t++] = fn), (fn = e));
    var r = It;
    e = Ut;
    var a = 32 - dt(r) - 1;
    ((r &= ~(1 << a)), (n += 1));
    var s = 32 - dt(t) + a;
    if (30 < s) {
      var u = a - (a % 5);
      ((s = (r & ((1 << u) - 1)).toString(32)),
        (r >>= u),
        (a -= u),
        (It = (1 << (32 - dt(t) + a)) | (n << a) | r),
        (Ut = s + e));
    } else ((It = (1 << s) | (n << a) | r), (Ut = e));
  }
  function Zo(e) {
    e.return !== null && (Kt(e, 1), ac(e, 1, 0));
  }
  function Yo(e) {
    for (; e === os; ) ((os = pr[--mr]), (pr[mr] = null), (ta = pr[--mr]), (pr[mr] = null));
    for (; e === fn; )
      ((fn = Nt[--_t]),
        (Nt[_t] = null),
        (Ut = Nt[--_t]),
        (Nt[_t] = null),
        (It = Nt[--_t]),
        (Nt[_t] = null));
  }
  function sc(e, t) {
    ((Nt[_t++] = It), (Nt[_t++] = Ut), (Nt[_t++] = fn), (It = t.id), (Ut = t.overflow), (fn = e));
  }
  var $e = null,
    ve = null,
    re = !1,
    hn = null,
    Et = !1,
    ei = Error(l(519));
  function pn(e) {
    var t = Error(
      l(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (na(St(t, e)), ei);
  }
  function oc(e) {
    var t = e.stateNode,
      n = e.type,
      r = e.memoizedProps;
    switch (((t[He] = e), (t[tt] = r), n)) {
      case 'dialog':
        (ee('cancel', t), ee('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ee('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Na.length; n++) ee(Na[n], t);
        break;
      case 'source':
        ee('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ee('error', t), ee('load', t));
        break;
      case 'details':
        ee('toggle', t);
        break;
      case 'input':
        (ee('invalid', t),
          bu(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0));
        break;
      case 'select':
        ee('invalid', t);
        break;
      case 'textarea':
        (ee('invalid', t), wu(t, r.value, r.defaultValue, r.children));
    }
    ((n = r.children),
      (typeof n != 'string' && typeof n != 'number' && typeof n != 'bigint') ||
      t.textContent === '' + n ||
      r.suppressHydrationWarning === !0 ||
      Nf(t.textContent, n)
        ? (r.popover != null && (ee('beforetoggle', t), ee('toggle', t)),
          r.onScroll != null && ee('scroll', t),
          r.onScrollEnd != null && ee('scrollend', t),
          r.onClick != null && (t.onclick = $t),
          (t = !0))
        : (t = !1),
      t || pn(e, !0));
  }
  function ic(e) {
    for ($e = e.return; $e; )
      switch ($e.tag) {
        case 5:
        case 31:
        case 13:
          Et = !1;
          return;
        case 27:
        case 3:
          Et = !0;
          return;
        default:
          $e = $e.return;
      }
  }
  function gr(e) {
    if (e !== $e) return !1;
    if (!re) return (ic(e), (re = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type), (n = !(n !== 'form' && n !== 'button') || vl(e.type, e.memoizedProps))),
        (n = !n)),
      n && ve && pn(e),
      ic(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(l(317));
      ve = Of(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(l(317));
      ve = Of(e);
    } else
      t === 27
        ? ((t = ve), Tn(e.type) ? ((e = Sl), (Sl = null), (ve = e)) : (ve = t))
        : (ve = $e ? Ct(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Vn() {
    ((ve = $e = null), (re = !1));
  }
  function ti() {
    var e = hn;
    return (e !== null && (ot === null ? (ot = e) : ot.push.apply(ot, e), (hn = null)), e);
  }
  function na(e) {
    hn === null ? (hn = [e]) : hn.push(e);
  }
  var ni = h(null),
    Hn = null,
    Gt = null;
  function mn(e, t, n) {
    (P(ni, t._currentValue), (t._currentValue = n));
  }
  function Xt(e) {
    ((e._currentValue = ni.current), y(ni));
  }
  function ri(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function ai(e, t, n, r) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var s = a.dependencies;
      if (s !== null) {
        var u = a.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var d = s;
          s = a;
          for (var m = 0; m < t.length; m++)
            if (d.context === t[m]) {
              ((s.lanes |= n),
                (d = s.alternate),
                d !== null && (d.lanes |= n),
                ri(s.return, n, e),
                r || (u = null));
              break e;
            }
          s = d.next;
        }
      } else if (a.tag === 18) {
        if (((u = a.return), u === null)) throw Error(l(341));
        ((u.lanes |= n), (s = u.alternate), s !== null && (s.lanes |= n), ri(u, n, e), (u = null));
      } else u = a.child;
      if (u !== null) u.return = a;
      else
        for (u = a; u !== null; ) {
          if (u === e) {
            u = null;
            break;
          }
          if (((a = u.sibling), a !== null)) {
            ((a.return = u.return), (u = a));
            break;
          }
          u = u.return;
        }
      a = u;
    }
  }
  function yr(e, t, n, r) {
    e = null;
    for (var a = t, s = !1; a !== null; ) {
      if (!s) {
        if ((a.flags & 524288) !== 0) s = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var u = a.alternate;
        if (u === null) throw Error(l(387));
        if (((u = u.memoizedProps), u !== null)) {
          var d = a.type;
          ft(a.pendingProps.value, u.value) || (e !== null ? e.push(d) : (e = [d]));
        }
      } else if (a === Z.current) {
        if (((u = a.alternate), u === null)) throw Error(l(387));
        u.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
          (e !== null ? e.push(ja) : (e = [ja]));
      }
      a = a.return;
    }
    (e !== null && ai(t, e, n, r), (t.flags |= 262144));
  }
  function is(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ft(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function $n(e) {
    ((Hn = e), (Gt = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function We(e) {
    return lc(Hn, e);
  }
  function ls(e, t) {
    return (Hn === null && $n(e), lc(e, t));
  }
  function lc(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Gt === null)) {
      if (e === null) throw Error(l(308));
      ((Gt = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Gt = Gt.next = t;
    return n;
  }
  var um =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, r) {
                  e.push(r);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                }));
            };
          },
    cm = c.unstable_scheduleCallback,
    dm = c.unstable_NormalPriority,
    Ae = {
      $$typeof: je,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function si() {
    return { controller: new um(), data: new Map(), refCount: 0 };
  }
  function ra(e) {
    (e.refCount--,
      e.refCount === 0 &&
        cm(dm, function () {
          e.controller.abort();
        }));
  }
  var aa = null,
    oi = 0,
    vr = 0,
    br = null;
  function fm(e, t) {
    if (aa === null) {
      var n = (aa = []);
      ((oi = 0),
        (vr = ul()),
        (br = {
          status: 'pending',
          value: void 0,
          then: function (r) {
            n.push(r);
          },
        }));
    }
    return (oi++, t.then(uc, uc), t);
  }
  function uc() {
    if (--oi === 0 && aa !== null) {
      br !== null && (br.status = 'fulfilled');
      var e = aa;
      ((aa = null), (vr = 0), (br = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function hm(e, t) {
    var n = [],
      r = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (a) {
          n.push(a);
        },
      };
    return (
      e.then(
        function () {
          ((r.status = 'fulfilled'), (r.value = t));
          for (var a = 0; a < n.length; a++) (0, n[a])(t);
        },
        function (a) {
          for (r.status = 'rejected', r.reason = a, a = 0; a < n.length; a++) (0, n[a])(void 0);
        }
      ),
      r
    );
  }
  var cc = C.S;
  C.S = function (e, t) {
    ((Qd = ut()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && fm(e, t),
      cc !== null && cc(e, t));
  };
  var Wn = h(null);
  function ii() {
    var e = Wn.current;
    return e !== null ? e : ye.pooledCache;
  }
  function us(e, t) {
    t === null ? P(Wn, Wn.current) : P(Wn, t.pool);
  }
  function dc() {
    var e = ii();
    return e === null ? null : { parent: Ae._currentValue, pool: e };
  }
  var xr = Error(l(460)),
    li = Error(l(474)),
    cs = Error(l(542)),
    ds = { then: function () {} };
  function fc(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function hc(e, t, n) {
    switch (
      ((n = e[n]), n === void 0 ? e.push(t) : n !== t && (t.then($t, $t), (t = n)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), mc(e), e);
      default:
        if (typeof t.status == 'string') t.then($t, $t);
        else {
          if (((e = ye), e !== null && 100 < e.shellSuspendCounter)) throw Error(l(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (r) {
                if (t.status === 'pending') {
                  var a = t;
                  ((a.status = 'fulfilled'), (a.value = r));
                }
              },
              function (r) {
                if (t.status === 'pending') {
                  var a = t;
                  ((a.status = 'rejected'), (a.reason = r));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), mc(e), e);
        }
        throw ((Kn = t), xr);
    }
  }
  function Qn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == 'object' && typeof n.then == 'function' ? ((Kn = n), xr) : n;
    }
  }
  var Kn = null;
  function pc() {
    if (Kn === null) throw Error(l(459));
    var e = Kn;
    return ((Kn = null), e);
  }
  function mc(e) {
    if (e === xr || e === cs) throw Error(l(483));
  }
  var wr = null,
    sa = 0;
  function fs(e) {
    var t = sa;
    return ((sa += 1), wr === null && (wr = []), hc(wr, e, t));
  }
  function oa(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function hs(e, t) {
    throw t.$$typeof === H
      ? Error(l(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          l(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function gc(e) {
    function t(v, g) {
      if (e) {
        var x = v.deletions;
        x === null ? ((v.deletions = [g]), (v.flags |= 16)) : x.push(g);
      }
    }
    function n(v, g) {
      if (!e) return null;
      for (; g !== null; ) (t(v, g), (g = g.sibling));
      return null;
    }
    function r(v) {
      for (var g = new Map(); v !== null; )
        (v.key !== null ? g.set(v.key, v) : g.set(v.index, v), (v = v.sibling));
      return g;
    }
    function a(v, g) {
      return ((v = Qt(v, g)), (v.index = 0), (v.sibling = null), v);
    }
    function s(v, g, x) {
      return (
        (v.index = x),
        e
          ? ((x = v.alternate),
            x !== null
              ? ((x = x.index), x < g ? ((v.flags |= 67108866), g) : x)
              : ((v.flags |= 67108866), g))
          : ((v.flags |= 1048576), g)
      );
    }
    function u(v) {
      return (e && v.alternate === null && (v.flags |= 67108866), v);
    }
    function d(v, g, x, T) {
      return g === null || g.tag !== 6
        ? ((g = Xo(x, v.mode, T)), (g.return = v), g)
        : ((g = a(g, x)), (g.return = v), g);
    }
    function m(v, g, x, T) {
      var B = x.type;
      return B === Q
        ? E(v, g, x.props.children, T, x.key)
        : g !== null &&
            (g.elementType === B ||
              (typeof B == 'object' && B !== null && B.$$typeof === ke && Qn(B) === g.type))
          ? ((g = a(g, x.props)), oa(g, x), (g.return = v), g)
          : ((g = ss(x.type, x.key, x.props, null, v.mode, T)), oa(g, x), (g.return = v), g);
    }
    function w(v, g, x, T) {
      return g === null ||
        g.tag !== 4 ||
        g.stateNode.containerInfo !== x.containerInfo ||
        g.stateNode.implementation !== x.implementation
        ? ((g = Jo(x, v.mode, T)), (g.return = v), g)
        : ((g = a(g, x.children || [])), (g.return = v), g);
    }
    function E(v, g, x, T, B) {
      return g === null || g.tag !== 7
        ? ((g = qn(x, v.mode, T, B)), (g.return = v), g)
        : ((g = a(g, x)), (g.return = v), g);
    }
    function j(v, g, x) {
      if ((typeof g == 'string' && g !== '') || typeof g == 'number' || typeof g == 'bigint')
        return ((g = Xo('' + g, v.mode, x)), (g.return = v), g);
      if (typeof g == 'object' && g !== null) {
        switch (g.$$typeof) {
          case q:
            return ((x = ss(g.type, g.key, g.props, null, v.mode, x)), oa(x, g), (x.return = v), x);
          case oe:
            return ((g = Jo(g, v.mode, x)), (g.return = v), g);
          case ke:
            return ((g = Qn(g)), j(v, g, x));
        }
        if (et(g) || Ge(g)) return ((g = qn(g, v.mode, x, null)), (g.return = v), g);
        if (typeof g.then == 'function') return j(v, fs(g), x);
        if (g.$$typeof === je) return j(v, ls(v, g), x);
        hs(v, g);
      }
      return null;
    }
    function k(v, g, x, T) {
      var B = g !== null ? g.key : null;
      if ((typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint')
        return B !== null ? null : d(v, g, '' + x, T);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case q:
            return x.key === B ? m(v, g, x, T) : null;
          case oe:
            return x.key === B ? w(v, g, x, T) : null;
          case ke:
            return ((x = Qn(x)), k(v, g, x, T));
        }
        if (et(x) || Ge(x)) return B !== null ? null : E(v, g, x, T, null);
        if (typeof x.then == 'function') return k(v, g, fs(x), T);
        if (x.$$typeof === je) return k(v, g, ls(v, x), T);
        hs(v, x);
      }
      return null;
    }
    function N(v, g, x, T, B) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((v = v.get(x) || null), d(g, v, '' + T, B));
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case q:
            return ((v = v.get(T.key === null ? x : T.key) || null), m(g, v, T, B));
          case oe:
            return ((v = v.get(T.key === null ? x : T.key) || null), w(g, v, T, B));
          case ke:
            return ((T = Qn(T)), N(v, g, x, T, B));
        }
        if (et(T) || Ge(T)) return ((v = v.get(x) || null), E(g, v, T, B, null));
        if (typeof T.then == 'function') return N(v, g, x, fs(T), B);
        if (T.$$typeof === je) return N(v, g, x, ls(g, T), B);
        hs(g, T);
      }
      return null;
    }
    function U(v, g, x, T) {
      for (
        var B = null, ie = null, F = g, X = (g = 0), ne = null;
        F !== null && X < x.length;
        X++
      ) {
        F.index > X ? ((ne = F), (F = null)) : (ne = F.sibling);
        var le = k(v, F, x[X], T);
        if (le === null) {
          F === null && (F = ne);
          break;
        }
        (e && F && le.alternate === null && t(v, F),
          (g = s(le, g, X)),
          ie === null ? (B = le) : (ie.sibling = le),
          (ie = le),
          (F = ne));
      }
      if (X === x.length) return (n(v, F), re && Kt(v, X), B);
      if (F === null) {
        for (; X < x.length; X++)
          ((F = j(v, x[X], T)),
            F !== null && ((g = s(F, g, X)), ie === null ? (B = F) : (ie.sibling = F), (ie = F)));
        return (re && Kt(v, X), B);
      }
      for (F = r(F); X < x.length; X++)
        ((ne = N(F, v, X, x[X], T)),
          ne !== null &&
            (e && ne.alternate !== null && F.delete(ne.key === null ? X : ne.key),
            (g = s(ne, g, X)),
            ie === null ? (B = ne) : (ie.sibling = ne),
            (ie = ne)));
      return (
        e &&
          F.forEach(function (On) {
            return t(v, On);
          }),
        re && Kt(v, X),
        B
      );
    }
    function W(v, g, x, T) {
      if (x == null) throw Error(l(151));
      for (
        var B = null, ie = null, F = g, X = (g = 0), ne = null, le = x.next();
        F !== null && !le.done;
        X++, le = x.next()
      ) {
        F.index > X ? ((ne = F), (F = null)) : (ne = F.sibling);
        var On = k(v, F, le.value, T);
        if (On === null) {
          F === null && (F = ne);
          break;
        }
        (e && F && On.alternate === null && t(v, F),
          (g = s(On, g, X)),
          ie === null ? (B = On) : (ie.sibling = On),
          (ie = On),
          (F = ne));
      }
      if (le.done) return (n(v, F), re && Kt(v, X), B);
      if (F === null) {
        for (; !le.done; X++, le = x.next())
          ((le = j(v, le.value, T)),
            le !== null &&
              ((g = s(le, g, X)), ie === null ? (B = le) : (ie.sibling = le), (ie = le)));
        return (re && Kt(v, X), B);
      }
      for (F = r(F); !le.done; X++, le = x.next())
        ((le = N(F, v, X, le.value, T)),
          le !== null &&
            (e && le.alternate !== null && F.delete(le.key === null ? X : le.key),
            (g = s(le, g, X)),
            ie === null ? (B = le) : (ie.sibling = le),
            (ie = le)));
      return (
        e &&
          F.forEach(function (Ng) {
            return t(v, Ng);
          }),
        re && Kt(v, X),
        B
      );
    }
    function ge(v, g, x, T) {
      if (
        (typeof x == 'object' &&
          x !== null &&
          x.type === Q &&
          x.key === null &&
          (x = x.props.children),
        typeof x == 'object' && x !== null)
      ) {
        switch (x.$$typeof) {
          case q:
            e: {
              for (var B = x.key; g !== null; ) {
                if (g.key === B) {
                  if (((B = x.type), B === Q)) {
                    if (g.tag === 7) {
                      (n(v, g.sibling), (T = a(g, x.props.children)), (T.return = v), (v = T));
                      break e;
                    }
                  } else if (
                    g.elementType === B ||
                    (typeof B == 'object' && B !== null && B.$$typeof === ke && Qn(B) === g.type)
                  ) {
                    (n(v, g.sibling), (T = a(g, x.props)), oa(T, x), (T.return = v), (v = T));
                    break e;
                  }
                  n(v, g);
                  break;
                } else t(v, g);
                g = g.sibling;
              }
              x.type === Q
                ? ((T = qn(x.props.children, v.mode, T, x.key)), (T.return = v), (v = T))
                : ((T = ss(x.type, x.key, x.props, null, v.mode, T)),
                  oa(T, x),
                  (T.return = v),
                  (v = T));
            }
            return u(v);
          case oe:
            e: {
              for (B = x.key; g !== null; ) {
                if (g.key === B)
                  if (
                    g.tag === 4 &&
                    g.stateNode.containerInfo === x.containerInfo &&
                    g.stateNode.implementation === x.implementation
                  ) {
                    (n(v, g.sibling), (T = a(g, x.children || [])), (T.return = v), (v = T));
                    break e;
                  } else {
                    n(v, g);
                    break;
                  }
                else t(v, g);
                g = g.sibling;
              }
              ((T = Jo(x, v.mode, T)), (T.return = v), (v = T));
            }
            return u(v);
          case ke:
            return ((x = Qn(x)), ge(v, g, x, T));
        }
        if (et(x)) return U(v, g, x, T);
        if (Ge(x)) {
          if (((B = Ge(x)), typeof B != 'function')) throw Error(l(150));
          return ((x = B.call(x)), W(v, g, x, T));
        }
        if (typeof x.then == 'function') return ge(v, g, fs(x), T);
        if (x.$$typeof === je) return ge(v, g, ls(v, x), T);
        hs(v, x);
      }
      return (typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint'
        ? ((x = '' + x),
          g !== null && g.tag === 6
            ? (n(v, g.sibling), (T = a(g, x)), (T.return = v), (v = T))
            : (n(v, g), (T = Xo(x, v.mode, T)), (T.return = v), (v = T)),
          u(v))
        : n(v, g);
    }
    return function (v, g, x, T) {
      try {
        sa = 0;
        var B = ge(v, g, x, T);
        return ((wr = null), B);
      } catch (F) {
        if (F === xr || F === cs) throw F;
        var ie = ht(29, F, null, v.mode);
        return ((ie.lanes = T), (ie.return = v), ie);
      } finally {
      }
    };
  }
  var Gn = gc(!0),
    yc = gc(!1),
    gn = !1;
  function ui(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ci(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function yn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function vn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (ue & 2) !== 0)) {
      var a = r.pending;
      return (
        a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
        (r.pending = t),
        (t = as(e)),
        ec(e, null, n),
        t
      );
    }
    return (rs(e, r, t, n), as(e));
  }
  function ia(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), lu(e, n));
    }
  }
  function di(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var a = null,
        s = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var u = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
          (s === null ? (a = s = u) : (s = s.next = u), (n = n.next));
        } while (n !== null);
        s === null ? (a = s = t) : (s = s.next = t);
      } else a = s = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: s,
        shared: r.shared,
        callbacks: r.callbacks,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  var fi = !1;
  function la() {
    if (fi) {
      var e = br;
      if (e !== null) throw e;
    }
  }
  function ua(e, t, n, r) {
    fi = !1;
    var a = e.updateQueue;
    gn = !1;
    var s = a.firstBaseUpdate,
      u = a.lastBaseUpdate,
      d = a.shared.pending;
    if (d !== null) {
      a.shared.pending = null;
      var m = d,
        w = m.next;
      ((m.next = null), u === null ? (s = w) : (u.next = w), (u = m));
      var E = e.alternate;
      E !== null &&
        ((E = E.updateQueue),
        (d = E.lastBaseUpdate),
        d !== u && (d === null ? (E.firstBaseUpdate = w) : (d.next = w), (E.lastBaseUpdate = m)));
    }
    if (s !== null) {
      var j = a.baseState;
      ((u = 0), (E = w = m = null), (d = s));
      do {
        var k = d.lane & -536870913,
          N = k !== d.lane;
        if (N ? (te & k) === k : (r & k) === k) {
          (k !== 0 && k === vr && (fi = !0),
            E !== null &&
              (E = E.next =
                { lane: 0, tag: d.tag, payload: d.payload, callback: null, next: null }));
          e: {
            var U = e,
              W = d;
            k = t;
            var ge = n;
            switch (W.tag) {
              case 1:
                if (((U = W.payload), typeof U == 'function')) {
                  j = U.call(ge, j, k);
                  break e;
                }
                j = U;
                break e;
              case 3:
                U.flags = (U.flags & -65537) | 128;
              case 0:
                if (
                  ((U = W.payload), (k = typeof U == 'function' ? U.call(ge, j, k) : U), k == null)
                )
                  break e;
                j = L({}, j, k);
                break e;
              case 2:
                gn = !0;
            }
          }
          ((k = d.callback),
            k !== null &&
              ((e.flags |= 64),
              N && (e.flags |= 8192),
              (N = a.callbacks),
              N === null ? (a.callbacks = [k]) : N.push(k)));
        } else
          ((N = { lane: k, tag: d.tag, payload: d.payload, callback: d.callback, next: null }),
            E === null ? ((w = E = N), (m = j)) : (E = E.next = N),
            (u |= k));
        if (((d = d.next), d === null)) {
          if (((d = a.shared.pending), d === null)) break;
          ((N = d),
            (d = N.next),
            (N.next = null),
            (a.lastBaseUpdate = N),
            (a.shared.pending = null));
        }
      } while (!0);
      (E === null && (m = j),
        (a.baseState = m),
        (a.firstBaseUpdate = w),
        (a.lastBaseUpdate = E),
        s === null && (a.shared.lanes = 0),
        (Sn |= u),
        (e.lanes = u),
        (e.memoizedState = j));
    }
  }
  function vc(e, t) {
    if (typeof e != 'function') throw Error(l(191, e));
    e.call(t);
  }
  function bc(e, t) {
    var n = e.callbacks;
    if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) vc(n[e], t);
  }
  var kr = h(null),
    ps = h(0);
  function xc(e, t) {
    ((e = sn), P(ps, e), P(kr, t), (sn = e | t.baseLanes));
  }
  function hi() {
    (P(ps, sn), P(kr, kr.current));
  }
  function pi() {
    ((sn = ps.current), y(kr), y(ps));
  }
  var pt = h(null),
    Ot = null;
  function bn(e) {
    var t = e.alternate;
    (P(Ce, Ce.current & 1),
      P(pt, e),
      Ot === null && (t === null || kr.current !== null || t.memoizedState !== null) && (Ot = e));
  }
  function mi(e) {
    (P(Ce, Ce.current), P(pt, e), Ot === null && (Ot = e));
  }
  function wc(e) {
    e.tag === 22 ? (P(Ce, Ce.current), P(pt, e), Ot === null && (Ot = e)) : xn();
  }
  function xn() {
    (P(Ce, Ce.current), P(pt, pt.current));
  }
  function mt(e) {
    (y(pt), Ot === e && (Ot = null), y(Ce));
  }
  var Ce = h(0);
  function ms(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || wl(n) || kl(n))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === 'forwards' ||
          t.memoizedProps.revealOrder === 'backwards' ||
          t.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          t.memoizedProps.revealOrder === 'together')
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Jt = 0,
    G = null,
    pe = null,
    Re = null,
    gs = !1,
    Sr = !1,
    Xn = !1,
    ys = 0,
    ca = 0,
    Nr = null,
    pm = 0;
  function Se() {
    throw Error(l(321));
  }
  function gi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!ft(e[n], t[n])) return !1;
    return !0;
  }
  function yi(e, t, n, r, a, s) {
    return (
      (Jt = s),
      (G = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (C.H = e === null || e.memoizedState === null ? ad : Ri),
      (Xn = !1),
      (s = n(r, a)),
      (Xn = !1),
      Sr && (s = Sc(t, n, r, a)),
      kc(e),
      s
    );
  }
  function kc(e) {
    C.H = ha;
    var t = pe !== null && pe.next !== null;
    if (((Jt = 0), (Re = pe = G = null), (gs = !1), (ca = 0), (Nr = null), t)) throw Error(l(300));
    e === null || Oe || ((e = e.dependencies), e !== null && is(e) && (Oe = !0));
  }
  function Sc(e, t, n, r) {
    G = e;
    var a = 0;
    do {
      if ((Sr && (Nr = null), (ca = 0), (Sr = !1), 25 <= a)) throw Error(l(301));
      if (((a += 1), (Re = pe = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((C.H = sd), (s = t(n, r)));
    } while (Sr);
    return s;
  }
  function mm() {
    var e = C.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? da(t) : t),
      (e = e.useState()[0]),
      (pe !== null ? pe.memoizedState : null) !== e && (G.flags |= 1024),
      t
    );
  }
  function vi() {
    var e = ys !== 0;
    return ((ys = 0), e);
  }
  function bi(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function xi(e) {
    if (gs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      gs = !1;
    }
    ((Jt = 0), (Re = pe = G = null), (Sr = !1), (ca = ys = 0), (Nr = null));
  }
  function Ze() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Re === null ? (G.memoizedState = Re = e) : (Re = Re.next = e), Re);
  }
  function Te() {
    if (pe === null) {
      var e = G.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = pe.next;
    var t = Re === null ? G.memoizedState : Re.next;
    if (t !== null) ((Re = t), (pe = e));
    else {
      if (e === null) throw G.alternate === null ? Error(l(467)) : Error(l(310));
      ((pe = e),
        (e = {
          memoizedState: pe.memoizedState,
          baseState: pe.baseState,
          baseQueue: pe.baseQueue,
          queue: pe.queue,
          next: null,
        }),
        Re === null ? (G.memoizedState = Re = e) : (Re = Re.next = e));
    }
    return Re;
  }
  function vs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function da(e) {
    var t = ca;
    return (
      (ca += 1),
      Nr === null && (Nr = []),
      (e = hc(Nr, e, t)),
      (t = G),
      (Re === null ? t.memoizedState : Re.next) === null &&
        ((t = t.alternate), (C.H = t === null || t.memoizedState === null ? ad : Ri)),
      e
    );
  }
  function bs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return da(e);
      if (e.$$typeof === je) return We(e);
    }
    throw Error(l(438, String(e)));
  }
  function wi(e) {
    var t = null,
      n = G.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var r = G.alternate;
      r !== null &&
        ((r = r.updateQueue),
        r !== null &&
          ((r = r.memoCache),
          r != null &&
            (t = {
              data: r.data.map(function (a) {
                return a.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = vs()), (G.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Me;
    return (t.index++, n);
  }
  function Zt(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function xs(e) {
    var t = Te();
    return ki(t, pe, e);
  }
  function ki(e, t, n) {
    var r = e.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = n;
    var a = e.baseQueue,
      s = r.pending;
    if (s !== null) {
      if (a !== null) {
        var u = a.next;
        ((a.next = s.next), (s.next = u));
      }
      ((t.baseQueue = a = s), (r.pending = null));
    }
    if (((s = e.baseState), a === null)) e.memoizedState = s;
    else {
      t = a.next;
      var d = (u = null),
        m = null,
        w = t,
        E = !1;
      do {
        var j = w.lane & -536870913;
        if (j !== w.lane ? (te & j) === j : (Jt & j) === j) {
          var k = w.revertLane;
          if (k === 0)
            (m !== null &&
              (m = m.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: w.action,
                  hasEagerState: w.hasEagerState,
                  eagerState: w.eagerState,
                  next: null,
                }),
              j === vr && (E = !0));
          else if ((Jt & k) === k) {
            ((w = w.next), k === vr && (E = !0));
            continue;
          } else
            ((j = {
              lane: 0,
              revertLane: w.revertLane,
              gesture: null,
              action: w.action,
              hasEagerState: w.hasEagerState,
              eagerState: w.eagerState,
              next: null,
            }),
              m === null ? ((d = m = j), (u = s)) : (m = m.next = j),
              (G.lanes |= k),
              (Sn |= k));
          ((j = w.action), Xn && n(s, j), (s = w.hasEagerState ? w.eagerState : n(s, j)));
        } else
          ((k = {
            lane: j,
            revertLane: w.revertLane,
            gesture: w.gesture,
            action: w.action,
            hasEagerState: w.hasEagerState,
            eagerState: w.eagerState,
            next: null,
          }),
            m === null ? ((d = m = k), (u = s)) : (m = m.next = k),
            (G.lanes |= j),
            (Sn |= j));
        w = w.next;
      } while (w !== null && w !== t);
      if (
        (m === null ? (u = s) : (m.next = d),
        !ft(s, e.memoizedState) && ((Oe = !0), E && ((n = br), n !== null)))
      )
        throw n;
      ((e.memoizedState = s), (e.baseState = u), (e.baseQueue = m), (r.lastRenderedState = s));
    }
    return (a === null && (r.lanes = 0), [e.memoizedState, r.dispatch]);
  }
  function Si(e) {
    var t = Te(),
      n = t.queue;
    if (n === null) throw Error(l(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      a = n.pending,
      s = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var u = (a = a.next);
      do ((s = e(s, u.action)), (u = u.next));
      while (u !== a);
      (ft(s, t.memoizedState) || (Oe = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (n.lastRenderedState = s));
    }
    return [s, r];
  }
  function Nc(e, t, n) {
    var r = G,
      a = Te(),
      s = re;
    if (s) {
      if (n === void 0) throw Error(l(407));
      n = n();
    } else n = t();
    var u = !ft((pe || a).memoizedState, n);
    if (
      (u && ((a.memoizedState = n), (Oe = !0)),
      (a = a.queue),
      Ei(Cc.bind(null, r, a, e), [e]),
      a.getSnapshot !== t || u || (Re !== null && Re.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        _r(9, { destroy: void 0 }, Ec.bind(null, r, a, n, t), null),
        ye === null)
      )
        throw Error(l(349));
      s || (Jt & 127) !== 0 || _c(r, t, n);
    }
    return n;
  }
  function _c(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = G.updateQueue),
      t === null
        ? ((t = vs()), (G.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Ec(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), Tc(t) && jc(e));
  }
  function Cc(e, t, n) {
    return n(function () {
      Tc(t) && jc(e);
    });
  }
  function Tc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ft(e, n);
    } catch {
      return !0;
    }
  }
  function jc(e) {
    var t = Bn(e, 2);
    t !== null && it(t, e, 2);
  }
  function Ni(e) {
    var t = Ze();
    if (typeof e == 'function') {
      var n = e;
      if (((e = n()), Xn)) {
        un(!0);
        try {
          n();
        } finally {
          un(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Pc(e, t, n, r) {
    return ((e.baseState = n), ki(e, pe, typeof r == 'function' ? r : Zt));
  }
  function gm(e, t, n, r, a) {
    if (Ss(e)) throw Error(l(485));
    if (((e = t.action), e !== null)) {
      var s = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (u) {
          s.listeners.push(u);
        },
      };
      (C.T !== null ? n(!0) : (s.isTransition = !1),
        r(s),
        (n = t.pending),
        n === null
          ? ((s.next = t.pending = s), Ac(t, s))
          : ((s.next = n.next), (t.pending = n.next = s)));
    }
  }
  function Ac(e, t) {
    var n = t.action,
      r = t.payload,
      a = e.state;
    if (t.isTransition) {
      var s = C.T,
        u = {};
      C.T = u;
      try {
        var d = n(a, r),
          m = C.S;
        (m !== null && m(u, d), Rc(e, t, d));
      } catch (w) {
        _i(e, t, w);
      } finally {
        (s !== null && u.types !== null && (s.types = u.types), (C.T = s));
      }
    } else
      try {
        ((s = n(a, r)), Rc(e, t, s));
      } catch (w) {
        _i(e, t, w);
      }
  }
  function Rc(e, t, n) {
    n !== null && typeof n == 'object' && typeof n.then == 'function'
      ? n.then(
          function (r) {
            Oc(e, t, r);
          },
          function (r) {
            return _i(e, t, r);
          }
        )
      : Oc(e, t, n);
  }
  function Oc(e, t, n) {
    ((t.status = 'fulfilled'),
      (t.value = n),
      Lc(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next), n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Ac(e, n))));
  }
  function _i(e, t, n) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do ((t.status = 'rejected'), (t.reason = n), Lc(t), (t = t.next));
      while (t !== r);
    }
    e.action = null;
  }
  function Lc(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function zc(e, t) {
    return t;
  }
  function Mc(e, t) {
    if (re) {
      var n = ye.formState;
      if (n !== null) {
        e: {
          var r = G;
          if (re) {
            if (ve) {
              t: {
                for (var a = ve, s = Et; a.nodeType !== 8; ) {
                  if (!s) {
                    a = null;
                    break t;
                  }
                  if (((a = Ct(a.nextSibling)), a === null)) {
                    a = null;
                    break t;
                  }
                }
                ((s = a.data), (a = s === 'F!' || s === 'F' ? a : null));
              }
              if (a) {
                ((ve = Ct(a.nextSibling)), (r = a.data === 'F!'));
                break e;
              }
            }
            pn(r);
          }
          r = !1;
        }
        r && (t = n[0]);
      }
    }
    return (
      (n = Ze()),
      (n.memoizedState = n.baseState = t),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zc,
        lastRenderedState: t,
      }),
      (n.queue = r),
      (n = td.bind(null, G, r)),
      (r.dispatch = n),
      (r = Ni(!1)),
      (s = Ai.bind(null, G, !1, r.queue)),
      (r = Ze()),
      (a = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = a),
      (n = gm.bind(null, G, a, s, n)),
      (a.dispatch = n),
      (r.memoizedState = e),
      [t, n, !1]
    );
  }
  function Ic(e) {
    var t = Te();
    return Uc(t, pe, e);
  }
  function Uc(e, t, n) {
    if (
      ((t = ki(e, t, zc)[0]),
      (e = xs(Zt)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var r = da(t);
      } catch (u) {
        throw u === xr ? cs : u;
      }
    else r = t;
    t = Te();
    var a = t.queue,
      s = a.dispatch;
    return (
      n !== t.memoizedState &&
        ((G.flags |= 2048), _r(9, { destroy: void 0 }, ym.bind(null, a, n), null)),
      [r, s, e]
    );
  }
  function ym(e, t) {
    e.action = t;
  }
  function Dc(e) {
    var t = Te(),
      n = pe;
    if (n !== null) return Uc(t, n, e);
    (Te(), (t = t.memoizedState), (n = Te()));
    var r = n.queue.dispatch;
    return ((n.memoizedState = e), [t, r, !1]);
  }
  function _r(e, t, n, r) {
    return (
      (e = { tag: e, create: n, deps: r, inst: t, next: null }),
      (t = G.updateQueue),
      t === null && ((t = vs()), (G.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Fc() {
    return Te().memoizedState;
  }
  function ws(e, t, n, r) {
    var a = Ze();
    ((G.flags |= e),
      (a.memoizedState = _r(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r)));
  }
  function ks(e, t, n, r) {
    var a = Te();
    r = r === void 0 ? null : r;
    var s = a.memoizedState.inst;
    pe !== null && r !== null && gi(r, pe.memoizedState.deps)
      ? (a.memoizedState = _r(t, s, n, r))
      : ((G.flags |= e), (a.memoizedState = _r(1 | t, s, n, r)));
  }
  function Bc(e, t) {
    ws(8390656, 8, e, t);
  }
  function Ei(e, t) {
    ks(2048, 8, e, t);
  }
  function vm(e) {
    G.flags |= 4;
    var t = G.updateQueue;
    if (t === null) ((t = vs()), (G.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function qc(e) {
    var t = Te().memoizedState;
    return (
      vm({ ref: t, nextImpl: e }),
      function () {
        if ((ue & 2) !== 0) throw Error(l(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Vc(e, t) {
    return ks(4, 2, e, t);
  }
  function Hc(e, t) {
    return ks(4, 4, e, t);
  }
  function $c(e, t) {
    if (typeof t == 'function') {
      e = e();
      var n = t(e);
      return function () {
        typeof n == 'function' ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Wc(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), ks(4, 4, $c.bind(null, t, e), n));
  }
  function Ci() {}
  function Qc(e, t) {
    var n = Te();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return t !== null && gi(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Kc(e, t) {
    var n = Te();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    if (t !== null && gi(t, r[1])) return r[0];
    if (((r = e()), Xn)) {
      un(!0);
      try {
        e();
      } finally {
        un(!1);
      }
    }
    return ((n.memoizedState = [r, t]), r);
  }
  function Ti(e, t, n) {
    return n === void 0 || ((Jt & 1073741824) !== 0 && (te & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Gd()), (G.lanes |= e), (Sn |= e), n);
  }
  function Gc(e, t, n, r) {
    return ft(n, t)
      ? n
      : kr.current !== null
        ? ((e = Ti(e, n, r)), ft(e, t) || (Oe = !0), e)
        : (Jt & 42) === 0 || ((Jt & 1073741824) !== 0 && (te & 261930) === 0)
          ? ((Oe = !0), (e.memoizedState = n))
          : ((e = Gd()), (G.lanes |= e), (Sn |= e), t);
  }
  function Xc(e, t, n, r, a) {
    var s = z.p;
    z.p = s !== 0 && 8 > s ? s : 8;
    var u = C.T,
      d = {};
    ((C.T = d), Ai(e, !1, t, n));
    try {
      var m = a(),
        w = C.S;
      if (
        (w !== null && w(d, m), m !== null && typeof m == 'object' && typeof m.then == 'function')
      ) {
        var E = hm(m, r);
        fa(e, t, E, vt(e));
      } else fa(e, t, r, vt(e));
    } catch (j) {
      fa(e, t, { then: function () {}, status: 'rejected', reason: j }, vt());
    } finally {
      ((z.p = s), u !== null && d.types !== null && (u.types = d.types), (C.T = u));
    }
  }
  function bm() {}
  function ji(e, t, n, r) {
    if (e.tag !== 5) throw Error(l(476));
    var a = Jc(e).queue;
    Xc(
      e,
      a,
      t,
      V,
      n === null
        ? bm
        : function () {
            return (Zc(e), n(r));
          }
    );
  }
  function Jc(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: V,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Zt,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Zc(e) {
    var t = Jc(e);
    (t.next === null && (t = e.alternate.memoizedState), fa(e, t.next.queue, {}, vt()));
  }
  function Pi() {
    return We(ja);
  }
  function Yc() {
    return Te().memoizedState;
  }
  function ed() {
    return Te().memoizedState;
  }
  function xm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = vt();
          e = yn(n);
          var r = vn(t, e, n);
          (r !== null && (it(r, t, n), ia(r, t, n)), (t = { cache: si() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function wm(e, t, n) {
    var r = vt();
    ((n = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ss(e) ? nd(t, n) : ((n = Ko(e, t, n, r)), n !== null && (it(n, e, r), rd(n, t, r))));
  }
  function td(e, t, n) {
    var r = vt();
    fa(e, t, n, r);
  }
  function fa(e, t, n, r) {
    var a = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ss(e)) nd(t, a);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var u = t.lastRenderedState,
            d = s(u, n);
          if (((a.hasEagerState = !0), (a.eagerState = d), ft(d, u)))
            return (rs(e, t, a, 0), ye === null && ns(), !1);
        } catch {
        } finally {
        }
      if (((n = Ko(e, t, a, r)), n !== null)) return (it(n, e, r), rd(n, t, r), !0);
    }
    return !1;
  }
  function Ai(e, t, n, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: ul(),
        gesture: null,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ss(e))
    ) {
      if (t) throw Error(l(479));
    } else ((t = Ko(e, n, r, 2)), t !== null && it(t, e, 2));
  }
  function Ss(e) {
    var t = e.alternate;
    return e === G || (t !== null && t === G);
  }
  function nd(e, t) {
    Sr = gs = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
  }
  function rd(e, t, n) {
    if ((n & 4194048) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), lu(e, n));
    }
  }
  var ha = {
    readContext: We,
    use: bs,
    useCallback: Se,
    useContext: Se,
    useEffect: Se,
    useImperativeHandle: Se,
    useLayoutEffect: Se,
    useInsertionEffect: Se,
    useMemo: Se,
    useReducer: Se,
    useRef: Se,
    useState: Se,
    useDebugValue: Se,
    useDeferredValue: Se,
    useTransition: Se,
    useSyncExternalStore: Se,
    useId: Se,
    useHostTransitionStatus: Se,
    useFormState: Se,
    useActionState: Se,
    useOptimistic: Se,
    useMemoCache: Se,
    useCacheRefresh: Se,
  };
  ha.useEffectEvent = Se;
  var ad = {
      readContext: We,
      use: bs,
      useCallback: function (e, t) {
        return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: We,
      useEffect: Bc,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null), ws(4194308, 4, $c.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return ws(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ws(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Ze();
        t = t === void 0 ? null : t;
        var r = e();
        if (Xn) {
          un(!0);
          try {
            e();
          } finally {
            un(!1);
          }
        }
        return ((n.memoizedState = [r, t]), r);
      },
      useReducer: function (e, t, n) {
        var r = Ze();
        if (n !== void 0) {
          var a = n(t);
          if (Xn) {
            un(!0);
            try {
              n(t);
            } finally {
              un(!1);
            }
          }
        } else a = t;
        return (
          (r.memoizedState = r.baseState = a),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: a,
          }),
          (r.queue = e),
          (e = e.dispatch = wm.bind(null, G, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ze();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ni(e);
        var t = e.queue,
          n = td.bind(null, G, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: Ci,
      useDeferredValue: function (e, t) {
        var n = Ze();
        return Ti(n, e, t);
      },
      useTransition: function () {
        var e = Ni(!1);
        return ((e = Xc.bind(null, G, e.queue, !0, !1)), (Ze().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, n) {
        var r = G,
          a = Ze();
        if (re) {
          if (n === void 0) throw Error(l(407));
          n = n();
        } else {
          if (((n = t()), ye === null)) throw Error(l(349));
          (te & 127) !== 0 || _c(r, t, n);
        }
        a.memoizedState = n;
        var s = { value: n, getSnapshot: t };
        return (
          (a.queue = s),
          Bc(Cc.bind(null, r, s, e), [e]),
          (r.flags |= 2048),
          _r(9, { destroy: void 0 }, Ec.bind(null, r, s, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Ze(),
          t = ye.identifierPrefix;
        if (re) {
          var n = Ut,
            r = It;
          ((n = (r & ~(1 << (32 - dt(r) - 1))).toString(32) + n),
            (t = '_' + t + 'R_' + n),
            (n = ys++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += '_'));
        } else ((n = pm++), (t = '_' + t + 'r_' + n.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Pi,
      useFormState: Mc,
      useActionState: Mc,
      useOptimistic: function (e) {
        var t = Ze();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = n), (t = Ai.bind(null, G, !0, n)), (n.dispatch = t), [e, t]);
      },
      useMemoCache: wi,
      useCacheRefresh: function () {
        return (Ze().memoizedState = xm.bind(null, G));
      },
      useEffectEvent: function (e) {
        var t = Ze(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((ue & 2) !== 0) throw Error(l(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ri = {
      readContext: We,
      use: bs,
      useCallback: Qc,
      useContext: We,
      useEffect: Ei,
      useImperativeHandle: Wc,
      useInsertionEffect: Vc,
      useLayoutEffect: Hc,
      useMemo: Kc,
      useReducer: xs,
      useRef: Fc,
      useState: function () {
        return xs(Zt);
      },
      useDebugValue: Ci,
      useDeferredValue: function (e, t) {
        var n = Te();
        return Gc(n, pe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = xs(Zt)[0],
          t = Te().memoizedState;
        return [typeof e == 'boolean' ? e : da(e), t];
      },
      useSyncExternalStore: Nc,
      useId: Yc,
      useHostTransitionStatus: Pi,
      useFormState: Ic,
      useActionState: Ic,
      useOptimistic: function (e, t) {
        var n = Te();
        return Pc(n, pe, e, t);
      },
      useMemoCache: wi,
      useCacheRefresh: ed,
    };
  Ri.useEffectEvent = qc;
  var sd = {
    readContext: We,
    use: bs,
    useCallback: Qc,
    useContext: We,
    useEffect: Ei,
    useImperativeHandle: Wc,
    useInsertionEffect: Vc,
    useLayoutEffect: Hc,
    useMemo: Kc,
    useReducer: Si,
    useRef: Fc,
    useState: function () {
      return Si(Zt);
    },
    useDebugValue: Ci,
    useDeferredValue: function (e, t) {
      var n = Te();
      return pe === null ? Ti(n, e, t) : Gc(n, pe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Si(Zt)[0],
        t = Te().memoizedState;
      return [typeof e == 'boolean' ? e : da(e), t];
    },
    useSyncExternalStore: Nc,
    useId: Yc,
    useHostTransitionStatus: Pi,
    useFormState: Dc,
    useActionState: Dc,
    useOptimistic: function (e, t) {
      var n = Te();
      return pe !== null ? Pc(n, pe, e, t) : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: wi,
    useCacheRefresh: ed,
  };
  sd.useEffectEvent = qc;
  function Oi(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : L({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Li = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = vt(),
        a = yn(r);
      ((a.payload = t),
        n != null && (a.callback = n),
        (t = vn(e, a, r)),
        t !== null && (it(t, e, r), ia(t, e, r)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = vt(),
        a = yn(r);
      ((a.tag = 1),
        (a.payload = t),
        n != null && (a.callback = n),
        (t = vn(e, a, r)),
        t !== null && (it(t, e, r), ia(t, e, r)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = vt(),
        r = yn(n);
      ((r.tag = 2),
        t != null && (r.callback = t),
        (t = vn(e, r, n)),
        t !== null && (it(t, e, n), ia(t, e, n)));
    },
  };
  function od(e, t, n, r, a, s, u) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, s, u)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Yr(n, r) || !Yr(a, s)
          : !0
    );
  }
  function id(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Li.enqueueReplaceState(t, t.state, null));
  }
  function Jn(e, t) {
    var n = t;
    if ('ref' in t) {
      n = {};
      for (var r in t) r !== 'ref' && (n[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = L({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function ld(e) {
    ts(e);
  }
  function ud(e) {
    console.error(e);
  }
  function cd(e) {
    ts(e);
  }
  function Ns(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function dd(e, t, n) {
    try {
      var r = e.onCaughtError;
      r(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function zi(e, t, n) {
    return (
      (n = yn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Ns(e, t);
      }),
      n
    );
  }
  function fd(e) {
    return ((e = yn(e)), (e.tag = 3), e);
  }
  function hd(e, t, n, r) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == 'function') {
      var s = r.value;
      ((e.payload = function () {
        return a(s);
      }),
        (e.callback = function () {
          dd(t, n, r);
        }));
    }
    var u = n.stateNode;
    u !== null &&
      typeof u.componentDidCatch == 'function' &&
      (e.callback = function () {
        (dd(t, n, r),
          typeof a != 'function' && (Nn === null ? (Nn = new Set([this])) : Nn.add(this)));
        var d = r.stack;
        this.componentDidCatch(r.value, { componentStack: d !== null ? d : '' });
      });
  }
  function km(e, t, n, r, a) {
    if (((n.flags |= 32768), r !== null && typeof r == 'object' && typeof r.then == 'function')) {
      if (((t = n.alternate), t !== null && yr(t, n, a, !0), (n = pt.current), n !== null)) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Ot === null ? Ms() : n.alternate === null && Ne === 0 && (Ne = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = a),
              r === ds
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                  ol(e, r, a)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              r === ds
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([r]) }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue), n === null ? (t.retryQueue = new Set([r])) : n.add(r)),
                  ol(e, r, a)),
              !1
            );
        }
        throw Error(l(435, n.tag));
      }
      return (ol(e, r, a), Ms(), !1);
    }
    if (re)
      return (
        (t = pt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = a),
            r !== ei && ((e = Error(l(422), { cause: r })), na(St(e, n))))
          : (r !== ei && ((t = Error(l(423), { cause: r })), na(St(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (a &= -a),
            (e.lanes |= a),
            (r = St(r, n)),
            (a = zi(e.stateNode, r, a)),
            di(e, a),
            Ne !== 4 && (Ne = 2)),
        !1
      );
    var s = Error(l(520), { cause: r });
    if (((s = St(s, n)), wa === null ? (wa = [s]) : wa.push(s), Ne !== 4 && (Ne = 2), t === null))
      return !0;
    ((r = St(r, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = a & -a),
            (n.lanes |= e),
            (e = zi(n.stateNode, r, e)),
            di(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (s = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (s !== null &&
                  typeof s.componentDidCatch == 'function' &&
                  (Nn === null || !Nn.has(s)))))
          )
            return (
              (n.flags |= 65536),
              (a &= -a),
              (n.lanes |= a),
              (a = fd(a)),
              hd(a, e, n, r),
              di(n, a),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Mi = Error(l(461)),
    Oe = !1;
  function Qe(e, t, n, r) {
    t.child = e === null ? yc(t, null, n, r) : Gn(t, e.child, n, r);
  }
  function pd(e, t, n, r, a) {
    n = n.render;
    var s = t.ref;
    if ('ref' in r) {
      var u = {};
      for (var d in r) d !== 'ref' && (u[d] = r[d]);
    } else u = r;
    return (
      $n(t),
      (r = yi(e, t, n, u, s, a)),
      (d = vi()),
      e !== null && !Oe
        ? (bi(e, t, a), Yt(e, t, a))
        : (re && d && Zo(t), (t.flags |= 1), Qe(e, t, r, a), t.child)
    );
  }
  function md(e, t, n, r, a) {
    if (e === null) {
      var s = n.type;
      return typeof s == 'function' && !Go(s) && s.defaultProps === void 0 && n.compare === null
        ? ((t.tag = 15), (t.type = s), gd(e, t, s, r, a))
        : ((e = ss(n.type, null, r, t, t.mode, a)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !Hi(e, a))) {
      var u = s.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : Yr), n(u, r) && e.ref === t.ref))
        return Yt(e, t, a);
    }
    return ((t.flags |= 1), (e = Qt(s, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function gd(e, t, n, r, a) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Yr(s, r) && e.ref === t.ref)
        if (((Oe = !1), (t.pendingProps = r = s), Hi(e, a))) (e.flags & 131072) !== 0 && (Oe = !0);
        else return ((t.lanes = e.lanes), Yt(e, t, a));
    }
    return Ii(e, t, n, r, a);
  }
  function yd(e, t, n, r) {
    var a = r.children,
      s = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      r.mode === 'hidden')
    ) {
      if ((t.flags & 128) !== 0) {
        if (((s = s !== null ? s.baseLanes | n : n), e !== null)) {
          for (r = t.child = e.child, a = 0; r !== null; )
            ((a = a | r.lanes | r.childLanes), (r = r.sibling));
          r = a & ~s;
        } else ((r = 0), (t.child = null));
        return vd(e, t, s, n, r);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && us(t, s !== null ? s.cachePool : null),
          s !== null ? xc(t, s) : hi(),
          wc(t));
      else return ((r = t.lanes = 536870912), vd(e, t, s !== null ? s.baseLanes | n : n, n, r));
    } else
      s !== null
        ? (us(t, s.cachePool), xc(t, s), xn(), (t.memoizedState = null))
        : (e !== null && us(t, null), hi(), xn());
    return (Qe(e, t, a, n), t.child);
  }
  function pa(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function vd(e, t, n, r, a) {
    var s = ii();
    return (
      (s = s === null ? null : { parent: Ae._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: n, cachePool: s }),
      e !== null && us(t, null),
      hi(),
      wc(t),
      e !== null && yr(e, t, r, !0),
      (t.childLanes = a),
      null
    );
  }
  function _s(e, t) {
    return (
      (t = Cs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function bd(e, t, n) {
    return (
      Gn(t, e.child, null, n),
      (e = _s(t, t.pendingProps)),
      (e.flags |= 2),
      mt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Sm(e, t, n) {
    var r = t.pendingProps,
      a = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (re) {
        if (r.mode === 'hidden') return ((e = _s(t, r)), (t.lanes = 536870912), pa(null, e));
        if (
          (mi(t),
          (e = ve)
            ? ((e = Rf(e, Et)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: It, overflow: Ut } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                ($e = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw pn(t);
        return ((t.lanes = 536870912), null);
      }
      return _s(t, r);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var u = s.dehydrated;
      if ((mi(t), a))
        if (t.flags & 256) ((t.flags &= -257), (t = bd(e, t, n)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(l(558));
      else if ((Oe || yr(e, t, n, !1), (a = (n & e.childLanes) !== 0), Oe || a)) {
        if (((r = ye), r !== null && ((u = uu(r, n)), u !== 0 && u !== s.retryLane)))
          throw ((s.retryLane = u), Bn(e, u), it(r, e, u), Mi);
        (Ms(), (t = bd(e, t, n)));
      } else
        ((e = s.treeContext),
          (ve = Ct(u.nextSibling)),
          ($e = t),
          (re = !0),
          (hn = null),
          (Et = !1),
          e !== null && sc(t, e),
          (t = _s(t, r)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Qt(e.child, { mode: r.mode, children: r.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Es(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != 'function' && typeof n != 'object') throw Error(l(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Ii(e, t, n, r, a) {
    return (
      $n(t),
      (n = yi(e, t, n, r, void 0, a)),
      (r = vi()),
      e !== null && !Oe
        ? (bi(e, t, a), Yt(e, t, a))
        : (re && r && Zo(t), (t.flags |= 1), Qe(e, t, n, a), t.child)
    );
  }
  function xd(e, t, n, r, a, s) {
    return (
      $n(t),
      (t.updateQueue = null),
      (n = Sc(t, r, n, a)),
      kc(e),
      (r = vi()),
      e !== null && !Oe
        ? (bi(e, t, s), Yt(e, t, s))
        : (re && r && Zo(t), (t.flags |= 1), Qe(e, t, n, s), t.child)
    );
  }
  function wd(e, t, n, r, a) {
    if (($n(t), t.stateNode === null)) {
      var s = hr,
        u = n.contextType;
      (typeof u == 'object' && u !== null && (s = We(u)),
        (s = new n(r, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = Li),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = r),
        (s.state = t.memoizedState),
        (s.refs = {}),
        ui(t),
        (u = n.contextType),
        (s.context = typeof u == 'object' && u !== null ? We(u) : hr),
        (s.state = t.memoizedState),
        (u = n.getDerivedStateFromProps),
        typeof u == 'function' && (Oi(t, n, u, r), (s.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((u = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          u !== s.state && Li.enqueueReplaceState(s, s.state, null),
          ua(t, r, s, a),
          la(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (r = !0));
    } else if (e === null) {
      s = t.stateNode;
      var d = t.memoizedProps,
        m = Jn(n, d);
      s.props = m;
      var w = s.context,
        E = n.contextType;
      ((u = hr), typeof E == 'object' && E !== null && (u = We(E)));
      var j = n.getDerivedStateFromProps;
      ((E = typeof j == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (d = t.pendingProps !== d),
        E ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((d || w !== u) && id(t, s, r, u)),
        (gn = !1));
      var k = t.memoizedState;
      ((s.state = k),
        ua(t, r, s, a),
        la(),
        (w = t.memoizedState),
        d || k !== w || gn
          ? (typeof j == 'function' && (Oi(t, n, j, r), (w = t.memoizedState)),
            (m = gn || od(t, n, m, r, k, w, u))
              ? (E ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = w)),
            (s.props = r),
            (s.state = w),
            (s.context = u),
            (r = m))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
      ((s = t.stateNode),
        ci(e, t),
        (u = t.memoizedProps),
        (E = Jn(n, u)),
        (s.props = E),
        (j = t.pendingProps),
        (k = s.context),
        (w = n.contextType),
        (m = hr),
        typeof w == 'object' && w !== null && (m = We(w)),
        (d = n.getDerivedStateFromProps),
        (w = typeof d == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((u !== j || k !== m) && id(t, s, r, m)),
        (gn = !1),
        (k = t.memoizedState),
        (s.state = k),
        ua(t, r, s, a),
        la());
      var N = t.memoizedState;
      u !== j || k !== N || gn || (e !== null && e.dependencies !== null && is(e.dependencies))
        ? (typeof d == 'function' && (Oi(t, n, d, r), (N = t.memoizedState)),
          (E =
            gn ||
            od(t, n, E, r, k, N, m) ||
            (e !== null && e.dependencies !== null && is(e.dependencies)))
            ? (w ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(r, N, m),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(r, N, m)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (u === e.memoizedProps && k === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (u === e.memoizedProps && k === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = N)),
          (s.props = r),
          (s.state = N),
          (s.context = m),
          (r = E))
        : (typeof s.componentDidUpdate != 'function' ||
            (u === e.memoizedProps && k === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (u === e.memoizedProps && k === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (s = r),
      Es(e, t),
      (r = (t.flags & 128) !== 0),
      s || r
        ? ((s = t.stateNode),
          (n = r && typeof n.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = Gn(t, e.child, null, a)), (t.child = Gn(t, null, n, a)))
            : Qe(e, t, n, a),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = Yt(e, t, a)),
      e
    );
  }
  function kd(e, t, n, r) {
    return (Vn(), (t.flags |= 256), Qe(e, t, n, r), t.child);
  }
  var Ui = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Di(e) {
    return { baseLanes: e, cachePool: dc() };
  }
  function Fi(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= yt), e);
  }
  function Sd(e, t, n) {
    var r = t.pendingProps,
      a = !1,
      s = (t.flags & 128) !== 0,
      u;
    if (
      ((u = s) || (u = e !== null && e.memoizedState === null ? !1 : (Ce.current & 2) !== 0),
      u && ((a = !0), (t.flags &= -129)),
      (u = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (re) {
        if (
          (a ? bn(t) : xn(),
          (e = ve)
            ? ((e = Rf(e, Et)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: It, overflow: Ut } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                ($e = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw pn(t);
        return (kl(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var d = r.children;
      return (
        (r = r.fallback),
        a
          ? (xn(),
            (a = t.mode),
            (d = Cs({ mode: 'hidden', children: d }, a)),
            (r = qn(r, a, n, null)),
            (d.return = t),
            (r.return = t),
            (d.sibling = r),
            (t.child = d),
            (r = t.child),
            (r.memoizedState = Di(n)),
            (r.childLanes = Fi(e, u, n)),
            (t.memoizedState = Ui),
            pa(null, r))
          : (bn(t), Bi(t, d))
      );
    }
    var m = e.memoizedState;
    if (m !== null && ((d = m.dehydrated), d !== null)) {
      if (s)
        t.flags & 256
          ? (bn(t), (t.flags &= -257), (t = qi(e, t, n)))
          : t.memoizedState !== null
            ? (xn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (xn(),
              (d = r.fallback),
              (a = t.mode),
              (r = Cs({ mode: 'visible', children: r.children }, a)),
              (d = qn(d, a, n, null)),
              (d.flags |= 2),
              (r.return = t),
              (d.return = t),
              (r.sibling = d),
              (t.child = r),
              Gn(t, e.child, null, n),
              (r = t.child),
              (r.memoizedState = Di(n)),
              (r.childLanes = Fi(e, u, n)),
              (t.memoizedState = Ui),
              (t = pa(null, r)));
      else if ((bn(t), kl(d))) {
        if (((u = d.nextSibling && d.nextSibling.dataset), u)) var w = u.dgst;
        ((u = w),
          (r = Error(l(419))),
          (r.stack = ''),
          (r.digest = u),
          na({ value: r, source: null, stack: null }),
          (t = qi(e, t, n)));
      } else if ((Oe || yr(e, t, n, !1), (u = (n & e.childLanes) !== 0), Oe || u)) {
        if (((u = ye), u !== null && ((r = uu(u, n)), r !== 0 && r !== m.retryLane)))
          throw ((m.retryLane = r), Bn(e, r), it(u, e, r), Mi);
        (wl(d) || Ms(), (t = qi(e, t, n)));
      } else
        wl(d)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = m.treeContext),
            (ve = Ct(d.nextSibling)),
            ($e = t),
            (re = !0),
            (hn = null),
            (Et = !1),
            e !== null && sc(t, e),
            (t = Bi(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return a
      ? (xn(),
        (d = r.fallback),
        (a = t.mode),
        (m = e.child),
        (w = m.sibling),
        (r = Qt(m, { mode: 'hidden', children: r.children })),
        (r.subtreeFlags = m.subtreeFlags & 65011712),
        w !== null ? (d = Qt(w, d)) : ((d = qn(d, a, n, null)), (d.flags |= 2)),
        (d.return = t),
        (r.return = t),
        (r.sibling = d),
        (t.child = r),
        pa(null, r),
        (r = t.child),
        (d = e.child.memoizedState),
        d === null
          ? (d = Di(n))
          : ((a = d.cachePool),
            a !== null
              ? ((m = Ae._currentValue), (a = a.parent !== m ? { parent: m, pool: m } : a))
              : (a = dc()),
            (d = { baseLanes: d.baseLanes | n, cachePool: a })),
        (r.memoizedState = d),
        (r.childLanes = Fi(e, u, n)),
        (t.memoizedState = Ui),
        pa(e.child, r))
      : (bn(t),
        (n = e.child),
        (e = n.sibling),
        (n = Qt(n, { mode: 'visible', children: r.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((u = t.deletions), u === null ? ((t.deletions = [e]), (t.flags |= 16)) : u.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Bi(e, t) {
    return ((t = Cs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Cs(e, t) {
    return ((e = ht(22, e, null, t)), (e.lanes = 0), e);
  }
  function qi(e, t, n) {
    return (
      Gn(t, e.child, null, n),
      (e = Bi(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Nd(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), ri(e.return, t, n));
  }
  function Vi(e, t, n, r, a, s) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: a,
          treeForkCount: s,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = r),
        (u.tail = n),
        (u.tailMode = a),
        (u.treeForkCount = s));
  }
  function _d(e, t, n) {
    var r = t.pendingProps,
      a = r.revealOrder,
      s = r.tail;
    r = r.children;
    var u = Ce.current,
      d = (u & 2) !== 0;
    if (
      (d ? ((u = (u & 1) | 2), (t.flags |= 128)) : (u &= 1),
      P(Ce, u),
      Qe(e, t, r, n),
      (r = re ? ta : 0),
      !d && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Nd(e, n, t);
        else if (e.tag === 19) Nd(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (a) {
      case 'forwards':
        for (n = t.child, a = null; n !== null; )
          ((e = n.alternate), e !== null && ms(e) === null && (a = n), (n = n.sibling));
        ((n = a),
          n === null ? ((a = t.child), (t.child = null)) : ((a = n.sibling), (n.sibling = null)),
          Vi(t, !1, a, n, s, r));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (((e = a.alternate), e !== null && ms(e) === null)) {
            t.child = a;
            break;
          }
          ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
        }
        Vi(t, !0, n, null, s, r);
        break;
      case 'together':
        Vi(t, !1, null, null, void 0, r);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Yt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Sn |= t.lanes), (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((yr(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, n = Qt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        ((e = e.sibling), (n = n.sibling = Qt(e, e.pendingProps)), (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Hi(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && is(e)));
  }
  function Nm(e, t, n) {
    switch (t.tag) {
      case 3:
        (Ie(t, t.stateNode.containerInfo), mn(t, Ae, e.memoizedState.cache), Vn());
        break;
      case 27:
      case 5:
        Fr(t);
        break;
      case 4:
        Ie(t, t.stateNode.containerInfo);
        break;
      case 10:
        mn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), mi(t), null);
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null
            ? (bn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Sd(e, t, n)
              : (bn(t), (e = Yt(e, t, n)), e !== null ? e.sibling : null);
        bn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (
          ((r = (n & t.childLanes) !== 0),
          r || (yr(e, t, n, !1), (r = (n & t.childLanes) !== 0)),
          a)
        ) {
          if (r) return _d(e, t, n);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null && ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          P(Ce, Ce.current),
          r)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), yd(e, t, n, t.pendingProps));
      case 24:
        mn(t, Ae, e.memoizedState.cache);
    }
    return Yt(e, t, n);
  }
  function Ed(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Oe = !0;
      else {
        if (!Hi(e, n) && (t.flags & 128) === 0) return ((Oe = !1), Nm(e, t, n));
        Oe = (e.flags & 131072) !== 0;
      }
    else ((Oe = !1), re && (t.flags & 1048576) !== 0 && ac(t, ta, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (((e = Qn(t.elementType)), (t.type = e), typeof e == 'function'))
            Go(e)
              ? ((r = Jn(e, r)), (t.tag = 1), (t = wd(null, t, e, r, n)))
              : ((t.tag = 0), (t = Ii(null, t, e, r, n)));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === _e) {
                ((t.tag = 11), (t = pd(null, t, e, r, n)));
                break e;
              } else if (a === J) {
                ((t.tag = 14), (t = md(null, t, e, r, n)));
                break e;
              }
            }
            throw ((t = xt(e) || e), Error(l(306, t, '')));
          }
        }
        return t;
      case 0:
        return Ii(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((r = t.type), (a = Jn(r, t.pendingProps)), wd(e, t, r, a, n));
      case 3:
        e: {
          if ((Ie(t, t.stateNode.containerInfo), e === null)) throw Error(l(387));
          r = t.pendingProps;
          var s = t.memoizedState;
          ((a = s.element), ci(e, t), ua(t, r, null, n));
          var u = t.memoizedState;
          if (
            ((r = u.cache),
            mn(t, Ae, r),
            r !== s.cache && ai(t, [Ae], n, !0),
            la(),
            (r = u.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: r, isDehydrated: !1, cache: u.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = kd(e, t, r, n);
              break e;
            } else if (r !== a) {
              ((a = St(Error(l(424)), t)), na(a), (t = kd(e, t, r, n)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e;
              }
              for (
                ve = Ct(e.firstChild),
                  $e = t,
                  re = !0,
                  hn = null,
                  Et = !0,
                  n = yc(t, null, r, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((Vn(), r === a)) {
              t = Yt(e, t, n);
              break e;
            }
            Qe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Es(e, t),
          e === null
            ? (n = Uf(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : re ||
                ((n = t.type),
                (e = t.pendingProps),
                (r = Vs($.current).createElement(n)),
                (r[He] = t),
                (r[tt] = e),
                Ke(r, n, e),
                Fe(r),
                (t.stateNode = r))
            : (t.memoizedState = Uf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Fr(t),
          e === null &&
            re &&
            ((r = t.stateNode = zf(t.type, t.pendingProps, $.current)),
            ($e = t),
            (Et = !0),
            (a = ve),
            Tn(t.type) ? ((Sl = a), (ve = Ct(r.firstChild))) : (ve = a)),
          Qe(e, t, t.pendingProps.children, n),
          Es(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            re &&
            ((a = r = ve) &&
              ((r = eg(r, t.type, t.pendingProps, Et)),
              r !== null
                ? ((t.stateNode = r), ($e = t), (ve = Ct(r.firstChild)), (Et = !1), (a = !0))
                : (a = !1)),
            a || pn(t)),
          Fr(t),
          (a = t.type),
          (s = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (r = s.children),
          vl(a, s) ? (r = null) : u !== null && vl(a, u) && (t.flags |= 32),
          t.memoizedState !== null && ((a = yi(e, t, mm, null, null, n)), (ja._currentValue = a)),
          Es(e, t),
          Qe(e, t, r, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            re &&
            ((e = n = ve) &&
              ((n = tg(n, t.pendingProps, Et)),
              n !== null ? ((t.stateNode = n), ($e = t), (ve = null), (e = !0)) : (e = !1)),
            e || pn(t)),
          null
        );
      case 13:
        return Sd(e, t, n);
      case 4:
        return (
          Ie(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Gn(t, null, r, n)) : Qe(e, t, r, n),
          t.child
        );
      case 11:
        return pd(e, t, t.type, t.pendingProps, n);
      case 7:
        return (Qe(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Qe(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Qe(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return ((r = t.pendingProps), mn(t, t.type, r.value), Qe(e, t, r.children, n), t.child);
      case 9:
        return (
          (a = t.type._context),
          (r = t.pendingProps.children),
          $n(t),
          (a = We(a)),
          (r = r(a)),
          (t.flags |= 1),
          Qe(e, t, r, n),
          t.child
        );
      case 14:
        return md(e, t, t.type, t.pendingProps, n);
      case 15:
        return gd(e, t, t.type, t.pendingProps, n);
      case 19:
        return _d(e, t, n);
      case 31:
        return Sm(e, t, n);
      case 22:
        return yd(e, t, n, t.pendingProps);
      case 24:
        return (
          $n(t),
          (r = We(Ae)),
          e === null
            ? ((a = ii()),
              a === null &&
                ((a = ye),
                (s = si()),
                (a.pooledCache = s),
                s.refCount++,
                s !== null && (a.pooledCacheLanes |= n),
                (a = s)),
              (t.memoizedState = { parent: r, cache: a }),
              ui(t),
              mn(t, Ae, a))
            : ((e.lanes & n) !== 0 && (ci(e, t), ua(t, null, null, n), la()),
              (a = e.memoizedState),
              (s = t.memoizedState),
              a.parent !== r
                ? ((a = { parent: r, cache: r }),
                  (t.memoizedState = a),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a),
                  mn(t, Ae, r))
                : ((r = s.cache), mn(t, Ae, r), r !== a.cache && ai(t, [Ae], n, !0))),
          Qe(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(l(156, t.tag));
  }
  function en(e) {
    e.flags |= 4;
  }
  function $i(e, t, n, r, a) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (a & 335544128) === a))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Yd()) e.flags |= 8192;
        else throw ((Kn = ds), li);
    } else e.flags &= -16777217;
  }
  function Cd(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Vf(t)))
      if (Yd()) e.flags |= 8192;
      else throw ((Kn = ds), li);
  }
  function Ts(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? ou() : 536870912), (e.lanes |= t), (jr |= t)));
  }
  function ma(e, t) {
    if (!re)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case 'collapsed':
          n = e.tail;
          for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var a = e.child; a !== null; )
        ((n |= a.lanes | a.childLanes),
          (r |= a.subtreeFlags & 65011712),
          (r |= a.flags & 65011712),
          (a.return = e),
          (a = a.sibling));
    else
      for (a = e.child; a !== null; )
        ((n |= a.lanes | a.childLanes),
          (r |= a.subtreeFlags),
          (r |= a.flags),
          (a.return = e),
          (a = a.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function _m(e, t, n) {
    var r = t.pendingProps;
    switch ((Yo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (be(t), null);
      case 1:
        return (be(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (r = null),
          e !== null && (r = e.memoizedState.cache),
          t.memoizedState.cache !== r && (t.flags |= 2048),
          Xt(Ae),
          Ee(),
          n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (gr(t)
              ? en(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ti())),
          be(t),
          null
        );
      case 26:
        var a = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (en(t), s !== null ? (be(t), Cd(t, s)) : (be(t), $i(t, a, null, r, n)))
            : s
              ? s !== e.memoizedState
                ? (en(t), be(t), Cd(t, s))
                : (be(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== r && en(t), be(t), $i(t, a, e, r, n)),
          null
        );
      case 27:
        if ((Da(t), (n = $.current), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(l(166));
            return (be(t), null);
          }
          ((e = O.current), gr(t) ? oc(t) : ((e = zf(a, r, n)), (t.stateNode = e), en(t)));
        }
        return (be(t), null);
      case 5:
        if ((Da(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(l(166));
            return (be(t), null);
          }
          if (((s = O.current), gr(t))) oc(t);
          else {
            var u = Vs($.current);
            switch (s) {
              case 1:
                s = u.createElementNS('http://www.w3.org/2000/svg', a);
                break;
              case 2:
                s = u.createElementNS('http://www.w3.org/1998/Math/MathML', a);
                break;
              default:
                switch (a) {
                  case 'svg':
                    s = u.createElementNS('http://www.w3.org/2000/svg', a);
                    break;
                  case 'math':
                    s = u.createElementNS('http://www.w3.org/1998/Math/MathML', a);
                    break;
                  case 'script':
                    ((s = u.createElement('div')),
                      (s.innerHTML = '<script><\/script>'),
                      (s = s.removeChild(s.firstChild)));
                    break;
                  case 'select':
                    ((s =
                      typeof r.is == 'string'
                        ? u.createElement('select', { is: r.is })
                        : u.createElement('select')),
                      r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size));
                    break;
                  default:
                    s =
                      typeof r.is == 'string'
                        ? u.createElement(a, { is: r.is })
                        : u.createElement(a);
                }
            }
            ((s[He] = t), (s[tt] = r));
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) s.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                ((u.child.return = u), (u = u.child));
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              ((u.sibling.return = u.return), (u = u.sibling));
            }
            t.stateNode = s;
            e: switch ((Ke(s, a, r), a)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
            r && en(t);
          }
        }
        return (be(t), $i(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && en(t);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(l(166));
          if (((e = $.current), gr(t))) {
            if (((e = t.stateNode), (n = t.memoizedProps), (r = null), (a = $e), a !== null))
              switch (a.tag) {
                case 27:
                case 5:
                  r = a.memoizedProps;
              }
            ((e[He] = t),
              (e = !!(
                e.nodeValue === n ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                Nf(e.nodeValue, n)
              )),
              e || pn(t, !0));
          } else ((e = Vs(e).createTextNode(r)), (e[He] = t), (t.stateNode = e));
        }
        return (be(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((r = gr(t)), n !== null)) {
            if (e === null) {
              if (!r) throw Error(l(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(l(557));
              e[He] = t;
            } else (Vn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (be(t), (e = !1));
          } else
            ((n = ti()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (mt(t), t) : (mt(t), null);
          if ((t.flags & 128) !== 0) throw Error(l(558));
        }
        return (be(t), null);
      case 13:
        if (
          ((r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((a = gr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(l(318));
              if (((a = t.memoizedState), (a = a !== null ? a.dehydrated : null), !a))
                throw Error(l(317));
              a[He] = t;
            } else (Vn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (be(t), (a = !1));
          } else
            ((a = ti()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (a = !0));
          if (!a) return t.flags & 256 ? (mt(t), t) : (mt(t), null);
        }
        return (
          mt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = r !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((r = t.child),
                (a = null),
                r.alternate !== null &&
                  r.alternate.memoizedState !== null &&
                  r.alternate.memoizedState.cachePool !== null &&
                  (a = r.alternate.memoizedState.cachePool.pool),
                (s = null),
                r.memoizedState !== null &&
                  r.memoizedState.cachePool !== null &&
                  (s = r.memoizedState.cachePool.pool),
                s !== a && (r.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              Ts(t, t.updateQueue),
              be(t),
              null)
        );
      case 4:
        return (Ee(), e === null && hl(t.stateNode.containerInfo), be(t), null);
      case 10:
        return (Xt(t.type), be(t), null);
      case 19:
        if ((y(Ce), (r = t.memoizedState), r === null)) return (be(t), null);
        if (((a = (t.flags & 128) !== 0), (s = r.rendering), s === null))
          if (a) ma(r, !1);
          else {
            if (Ne !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = ms(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      ma(r, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      Ts(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    (tc(n, e), (n = n.sibling));
                  return (P(Ce, (Ce.current & 1) | 2), re && Kt(t, r.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            r.tail !== null &&
              ut() > Os &&
              ((t.flags |= 128), (a = !0), ma(r, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = ms(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ts(t, e),
                ma(r, !0),
                r.tail === null && r.tailMode === 'hidden' && !s.alternate && !re)
              )
                return (be(t), null);
            } else
              2 * ut() - r.renderingStartTime > Os &&
                n !== 536870912 &&
                ((t.flags |= 128), (a = !0), ma(r, !1), (t.lanes = 4194304));
          r.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = r.last), e !== null ? (e.sibling = s) : (t.child = s), (r.last = s));
        }
        return r.tail !== null
          ? ((e = r.tail),
            (r.rendering = e),
            (r.tail = e.sibling),
            (r.renderingStartTime = ut()),
            (e.sibling = null),
            (n = Ce.current),
            P(Ce, a ? (n & 1) | 2 : n & 1),
            re && Kt(t, r.treeForkCount),
            e)
          : (be(t), null);
      case 22:
      case 23:
        return (
          mt(t),
          pi(),
          (r = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== r && (t.flags |= 8192)
            : r && (t.flags |= 8192),
          r
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : be(t),
          (n = t.updateQueue),
          n !== null && Ts(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (r = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (r = t.memoizedState.cachePool.pool),
          r !== n && (t.flags |= 2048),
          e !== null && y(Wn),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Xt(Ae),
          be(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function Em(e, t) {
    switch ((Yo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Xt(Ae),
          Ee(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Da(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((mt(t), t.alternate === null)) throw Error(l(340));
          Vn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((mt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(l(340));
          Vn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (y(Ce), null);
      case 4:
        return (Ee(), null);
      case 10:
        return (Xt(t.type), null);
      case 22:
      case 23:
        return (
          mt(t),
          pi(),
          e !== null && y(Wn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Xt(Ae), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Td(e, t) {
    switch ((Yo(t), t.tag)) {
      case 3:
        (Xt(Ae), Ee());
        break;
      case 26:
      case 27:
      case 5:
        Da(t);
        break;
      case 4:
        Ee();
        break;
      case 31:
        t.memoizedState !== null && mt(t);
        break;
      case 13:
        mt(t);
        break;
      case 19:
        y(Ce);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        (mt(t), pi(), e !== null && y(Wn));
        break;
      case 24:
        Xt(Ae);
    }
  }
  function ga(e, t) {
    try {
      var n = t.updateQueue,
        r = n !== null ? n.lastEffect : null;
      if (r !== null) {
        var a = r.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            r = void 0;
            var s = n.create,
              u = n.inst;
            ((r = s()), (u.destroy = r));
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (d) {
      he(t, t.return, d);
    }
  }
  function wn(e, t, n) {
    try {
      var r = t.updateQueue,
        a = r !== null ? r.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        r = s;
        do {
          if ((r.tag & e) === e) {
            var u = r.inst,
              d = u.destroy;
            if (d !== void 0) {
              ((u.destroy = void 0), (a = t));
              var m = n,
                w = d;
              try {
                w();
              } catch (E) {
                he(a, m, E);
              }
            }
          }
          r = r.next;
        } while (r !== s);
      }
    } catch (E) {
      he(t, t.return, E);
    }
  }
  function jd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        bc(t, n);
      } catch (r) {
        he(e, e.return, r);
      }
    }
  }
  function Pd(e, t, n) {
    ((n.props = Jn(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (r) {
      he(e, t, r);
    }
  }
  function ya(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof n == 'function' ? (e.refCleanup = n(r)) : (n.current = r);
      }
    } catch (a) {
      he(e, t, a);
    }
  }
  function Dt(e, t) {
    var n = e.ref,
      r = e.refCleanup;
    if (n !== null)
      if (typeof r == 'function')
        try {
          r();
        } catch (a) {
          he(e, t, a);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof n == 'function')
        try {
          n(null);
        } catch (a) {
          he(e, t, a);
        }
      else n.current = null;
  }
  function Ad(e) {
    var t = e.type,
      n = e.memoizedProps,
      r = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          n.autoFocus && r.focus();
          break e;
        case 'img':
          n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
      }
    } catch (a) {
      he(e, e.return, a);
    }
  }
  function Wi(e, t, n) {
    try {
      var r = e.stateNode;
      (Km(r, e.type, n, t), (r[tt] = t));
    } catch (a) {
      he(e, e.return, a);
    }
  }
  function Rd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Tn(e.type)) || e.tag === 4
    );
  }
  function Qi(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Rd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if ((e.tag === 27 && Tn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ki(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === 'HTML'
                ? n.ownerDocument.body
                : n
            ).insertBefore(e, t)
          : ((t = n.nodeType === 9 ? n.body : n.nodeName === 'HTML' ? n.ownerDocument.body : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = $t)));
    else if (
      r !== 4 &&
      (r === 27 && Tn(e.type) && ((n = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Ki(e, t, n), e = e.sibling; e !== null; ) (Ki(e, t, n), (e = e.sibling));
  }
  function js(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && (r === 27 && Tn(e.type) && (n = e.stateNode), (e = e.child), e !== null))
      for (js(e, t, n), e = e.sibling; e !== null; ) (js(e, t, n), (e = e.sibling));
  }
  function Od(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var r = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
      (Ke(t, r, n), (t[He] = e), (t[tt] = n));
    } catch (s) {
      he(e, e.return, s);
    }
  }
  var tn = !1,
    Le = !1,
    Gi = !1,
    Ld = typeof WeakSet == 'function' ? WeakSet : Set,
    Be = null;
  function Cm(e, t) {
    if (((e = e.containerInfo), (gl = Xs), (e = Wu(e)), qo(e))) {
      if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var a = r.anchorOffset,
              s = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, s.nodeType);
            } catch {
              n = null;
              break e;
            }
            var u = 0,
              d = -1,
              m = -1,
              w = 0,
              E = 0,
              j = e,
              k = null;
            t: for (;;) {
              for (
                var N;
                j !== n || (a !== 0 && j.nodeType !== 3) || (d = u + a),
                  j !== s || (r !== 0 && j.nodeType !== 3) || (m = u + r),
                  j.nodeType === 3 && (u += j.nodeValue.length),
                  (N = j.firstChild) !== null;

              )
                ((k = j), (j = N));
              for (;;) {
                if (j === e) break t;
                if (
                  (k === n && ++w === a && (d = u),
                  k === s && ++E === r && (m = u),
                  (N = j.nextSibling) !== null)
                )
                  break;
                ((j = k), (k = j.parentNode));
              }
              j = N;
            }
            n = d === -1 || m === -1 ? null : { start: d, end: m };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (yl = { focusedElem: e, selectionRange: n }, Xs = !1, Be = t; Be !== null; )
      if (((t = Be), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (Be = e));
      else
        for (; Be !== null; ) {
          switch (((t = Be), (s = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (n = 0; n < e.length; n++) ((a = e[n]), (a.ref.impl = a.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                ((e = void 0),
                  (n = t),
                  (a = s.memoizedProps),
                  (s = s.memoizedState),
                  (r = n.stateNode));
                try {
                  var U = Jn(n.type, a);
                  ((e = r.getSnapshotBeforeUpdate(U, s)),
                    (r.__reactInternalSnapshotBeforeUpdate = e));
                } catch (W) {
                  he(n, n.return, W);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)) xl(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      xl(e);
                      break;
                    default:
                      e.textContent = '';
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Be = e));
            break;
          }
          Be = t.return;
        }
  }
  function zd(e, t, n) {
    var r = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (rn(e, n), r & 4 && ga(5, n));
        break;
      case 1:
        if ((rn(e, n), r & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (u) {
              he(n, n.return, u);
            }
          else {
            var a = Jn(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (u) {
              he(n, n.return, u);
            }
          }
        (r & 64 && jd(n), r & 512 && ya(n, n.return));
        break;
      case 3:
        if ((rn(e, n), r & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            bc(e, t);
          } catch (u) {
            he(n, n.return, u);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Od(n);
      case 26:
      case 5:
        (rn(e, n), t === null && r & 4 && Ad(n), r & 512 && ya(n, n.return));
        break;
      case 12:
        rn(e, n);
        break;
      case 31:
        (rn(e, n), r & 4 && Ud(e, n));
        break;
      case 13:
        (rn(e, n),
          r & 4 && Dd(e, n),
          r & 64 &&
            ((e = n.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((n = Mm.bind(null, n)), ng(e, n)))));
        break;
      case 22:
        if (((r = n.memoizedState !== null || tn), !r)) {
          ((t = (t !== null && t.memoizedState !== null) || Le), (a = tn));
          var s = Le;
          ((tn = r),
            (Le = t) && !s ? an(e, n, (n.subtreeFlags & 8772) !== 0) : rn(e, n),
            (tn = a),
            (Le = s));
        }
        break;
      case 30:
        break;
      default:
        rn(e, n);
    }
  }
  function Md(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Md(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && _o(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var we = null,
    rt = !1;
  function nn(e, t, n) {
    for (n = n.child; n !== null; ) (Id(e, t, n), (n = n.sibling));
  }
  function Id(e, t, n) {
    if (ct && typeof ct.onCommitFiberUnmount == 'function')
      try {
        ct.onCommitFiberUnmount(Br, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Le || Dt(n, t),
          nn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Le || Dt(n, t);
        var r = we,
          a = rt;
        (Tn(n.type) && ((we = n.stateNode), (rt = !1)),
          nn(e, t, n),
          Ea(n.stateNode),
          (we = r),
          (rt = a));
        break;
      case 5:
        Le || Dt(n, t);
      case 6:
        if (((r = we), (a = rt), (we = null), nn(e, t, n), (we = r), (rt = a), we !== null))
          if (rt)
            try {
              (we.nodeType === 9
                ? we.body
                : we.nodeName === 'HTML'
                  ? we.ownerDocument.body
                  : we
              ).removeChild(n.stateNode);
            } catch (s) {
              he(n, t, s);
            }
          else
            try {
              we.removeChild(n.stateNode);
            } catch (s) {
              he(n, t, s);
            }
        break;
      case 18:
        we !== null &&
          (rt
            ? ((e = we),
              Pf(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                n.stateNode
              ),
              Ir(e))
            : Pf(we, n.stateNode));
        break;
      case 4:
        ((r = we),
          (a = rt),
          (we = n.stateNode.containerInfo),
          (rt = !0),
          nn(e, t, n),
          (we = r),
          (rt = a));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (wn(2, n, t), Le || wn(4, n, t), nn(e, t, n));
        break;
      case 1:
        (Le ||
          (Dt(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function' && Pd(n, t, r)),
          nn(e, t, n));
        break;
      case 21:
        nn(e, t, n);
        break;
      case 22:
        ((Le = (r = Le) || n.memoizedState !== null), nn(e, t, n), (Le = r));
        break;
      default:
        nn(e, t, n);
    }
  }
  function Ud(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Ir(e);
      } catch (n) {
        he(t, t.return, n);
      }
    }
  }
  function Dd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ir(e);
      } catch (n) {
        he(t, t.return, n);
      }
  }
  function Tm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Ld()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Ld()),
          t
        );
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Ps(e, t) {
    var n = Tm(e);
    t.forEach(function (r) {
      if (!n.has(r)) {
        n.add(r);
        var a = Im.bind(null, e, r);
        r.then(a, a);
      }
    });
  }
  function at(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var a = n[r],
          s = e,
          u = t,
          d = u;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Tn(d.type)) {
                ((we = d.stateNode), (rt = !1));
                break e;
              }
              break;
            case 5:
              ((we = d.stateNode), (rt = !1));
              break e;
            case 3:
            case 4:
              ((we = d.stateNode.containerInfo), (rt = !0));
              break e;
          }
          d = d.return;
        }
        if (we === null) throw Error(l(160));
        (Id(s, u, a),
          (we = null),
          (rt = !1),
          (s = a.alternate),
          s !== null && (s.return = null),
          (a.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Fd(t, e), (t = t.sibling));
  }
  var Lt = null;
  function Fd(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (at(t, e), st(e), r & 4 && (wn(3, e, e.return), ga(3, e), wn(5, e, e.return)));
        break;
      case 1:
        (at(t, e),
          st(e),
          r & 512 && (Le || n === null || Dt(n, n.return)),
          r & 64 &&
            tn &&
            ((e = e.updateQueue),
            e !== null &&
              ((r = e.callbacks),
              r !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? r : n.concat(r))))));
        break;
      case 26:
        var a = Lt;
        if ((at(t, e), st(e), r & 512 && (Le || n === null || Dt(n, n.return)), r & 4)) {
          var s = n !== null ? n.memoizedState : null;
          if (((r = e.memoizedState), n === null))
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  ((r = e.type), (n = e.memoizedProps), (a = a.ownerDocument || a));
                  t: switch (r) {
                    case 'title':
                      ((s = a.getElementsByTagName('title')[0]),
                        (!s ||
                          s[Hr] ||
                          s[He] ||
                          s.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          s.hasAttribute('itemprop')) &&
                          ((s = a.createElement(r)),
                          a.head.insertBefore(s, a.querySelector('head > title'))),
                        Ke(s, r, n),
                        (s[He] = e),
                        Fe(s),
                        (r = s));
                      break e;
                    case 'link':
                      var u = Bf('link', 'href', a).get(r + (n.href || ''));
                      if (u) {
                        for (var d = 0; d < u.length; d++)
                          if (
                            ((s = u[d]),
                            s.getAttribute('href') ===
                              (n.href == null || n.href === '' ? null : n.href) &&
                              s.getAttribute('rel') === (n.rel == null ? null : n.rel) &&
                              s.getAttribute('title') === (n.title == null ? null : n.title) &&
                              s.getAttribute('crossorigin') ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            u.splice(d, 1);
                            break t;
                          }
                      }
                      ((s = a.createElement(r)), Ke(s, r, n), a.head.appendChild(s));
                      break;
                    case 'meta':
                      if ((u = Bf('meta', 'content', a).get(r + (n.content || '')))) {
                        for (d = 0; d < u.length; d++)
                          if (
                            ((s = u[d]),
                            s.getAttribute('content') ===
                              (n.content == null ? null : '' + n.content) &&
                              s.getAttribute('name') === (n.name == null ? null : n.name) &&
                              s.getAttribute('property') ===
                                (n.property == null ? null : n.property) &&
                              s.getAttribute('http-equiv') ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              s.getAttribute('charset') === (n.charSet == null ? null : n.charSet))
                          ) {
                            u.splice(d, 1);
                            break t;
                          }
                      }
                      ((s = a.createElement(r)), Ke(s, r, n), a.head.appendChild(s));
                      break;
                    default:
                      throw Error(l(468, r));
                  }
                  ((s[He] = e), Fe(s), (r = s));
                }
                e.stateNode = r;
              } else qf(a, e.type, e.stateNode);
            else e.stateNode = Ff(a, r, e.memoizedProps);
          else
            s !== r
              ? (s === null
                  ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                  : s.count--,
                r === null ? qf(a, e.type, e.stateNode) : Ff(a, r, e.memoizedProps))
              : r === null && e.stateNode !== null && Wi(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (at(t, e),
          st(e),
          r & 512 && (Le || n === null || Dt(n, n.return)),
          n !== null && r & 4 && Wi(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if ((at(t, e), st(e), r & 512 && (Le || n === null || Dt(n, n.return)), e.flags & 32)) {
          a = e.stateNode;
          try {
            or(a, '');
          } catch (U) {
            he(e, e.return, U);
          }
        }
        (r & 4 &&
          e.stateNode != null &&
          ((a = e.memoizedProps), Wi(e, a, n !== null ? n.memoizedProps : a)),
          r & 1024 && (Gi = !0));
        break;
      case 6:
        if ((at(t, e), st(e), r & 4)) {
          if (e.stateNode === null) throw Error(l(162));
          ((r = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = r;
          } catch (U) {
            he(e, e.return, U);
          }
        }
        break;
      case 3:
        if (
          ((Ws = null),
          (a = Lt),
          (Lt = Hs(t.containerInfo)),
          at(t, e),
          (Lt = a),
          st(e),
          r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ir(t.containerInfo);
          } catch (U) {
            he(e, e.return, U);
          }
        Gi && ((Gi = !1), Bd(e));
        break;
      case 4:
        ((r = Lt), (Lt = Hs(e.stateNode.containerInfo)), at(t, e), st(e), (Lt = r));
        break;
      case 12:
        (at(t, e), st(e));
        break;
      case 31:
        (at(t, e),
          st(e),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Ps(e, r))));
        break;
      case 13:
        (at(t, e),
          st(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
            (Rs = ut()),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Ps(e, r))));
        break;
      case 22:
        a = e.memoizedState !== null;
        var m = n !== null && n.memoizedState !== null,
          w = tn,
          E = Le;
        if (((tn = w || a), (Le = E || m), at(t, e), (Le = E), (tn = w), st(e), r & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = a ? t._visibility & -2 : t._visibility | 1,
              a && (n === null || m || tn || Le || Zn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                m = n = t;
                try {
                  if (((s = m.stateNode), a))
                    ((u = s.style),
                      typeof u.setProperty == 'function'
                        ? u.setProperty('display', 'none', 'important')
                        : (u.display = 'none'));
                  else {
                    d = m.stateNode;
                    var j = m.memoizedProps.style,
                      k = j != null && j.hasOwnProperty('display') ? j.display : null;
                    d.style.display = k == null || typeof k == 'boolean' ? '' : ('' + k).trim();
                  }
                } catch (U) {
                  he(m, m.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                m = t;
                try {
                  m.stateNode.nodeValue = a ? '' : m.memoizedProps;
                } catch (U) {
                  he(m, m.return, U);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                m = t;
                try {
                  var N = m.stateNode;
                  a ? Af(N, !0) : Af(m.stateNode, !1);
                } catch (U) {
                  he(m, m.return, U);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (n === t && (n = null), (t = t.return));
            }
            (n === t && (n = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        r & 4 &&
          ((r = e.updateQueue),
          r !== null && ((n = r.retryQueue), n !== null && ((r.retryQueue = null), Ps(e, n))));
        break;
      case 19:
        (at(t, e),
          st(e),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Ps(e, r))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (at(t, e), st(e));
    }
  }
  function st(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, r = e.return; r !== null; ) {
          if (Rd(r)) {
            n = r;
            break;
          }
          r = r.return;
        }
        if (n == null) throw Error(l(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode,
              s = Qi(e);
            js(e, s, a);
            break;
          case 5:
            var u = n.stateNode;
            n.flags & 32 && (or(u, ''), (n.flags &= -33));
            var d = Qi(e);
            js(e, d, u);
            break;
          case 3:
          case 4:
            var m = n.stateNode.containerInfo,
              w = Qi(e);
            Ki(e, w, m);
            break;
          default:
            throw Error(l(161));
        }
      } catch (E) {
        he(e, e.return, E);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Bd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Bd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function rn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (zd(e, t.alternate, t), (t = t.sibling));
  }
  function Zn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (wn(4, t, t.return), Zn(t));
          break;
        case 1:
          Dt(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == 'function' && Pd(t, t.return, n), Zn(t));
          break;
        case 27:
          Ea(t.stateNode);
        case 26:
        case 5:
          (Dt(t, t.return), Zn(t));
          break;
        case 22:
          t.memoizedState === null && Zn(t);
          break;
        case 30:
          Zn(t);
          break;
        default:
          Zn(t);
      }
      e = e.sibling;
    }
  }
  function an(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate,
        a = e,
        s = t,
        u = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (an(a, s, n), ga(4, s));
          break;
        case 1:
          if ((an(a, s, n), (r = s), (a = r.stateNode), typeof a.componentDidMount == 'function'))
            try {
              a.componentDidMount();
            } catch (w) {
              he(r, r.return, w);
            }
          if (((r = s), (a = r.updateQueue), a !== null)) {
            var d = r.stateNode;
            try {
              var m = a.shared.hiddenCallbacks;
              if (m !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < m.length; a++) vc(m[a], d);
            } catch (w) {
              he(r, r.return, w);
            }
          }
          (n && u & 64 && jd(s), ya(s, s.return));
          break;
        case 27:
          Od(s);
        case 26:
        case 5:
          (an(a, s, n), n && r === null && u & 4 && Ad(s), ya(s, s.return));
          break;
        case 12:
          an(a, s, n);
          break;
        case 31:
          (an(a, s, n), n && u & 4 && Ud(a, s));
          break;
        case 13:
          (an(a, s, n), n && u & 4 && Dd(a, s));
          break;
        case 22:
          (s.memoizedState === null && an(a, s, n), ya(s, s.return));
          break;
        case 30:
          break;
        default:
          an(a, s, n);
      }
      t = t.sibling;
    }
  }
  function Xi(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && ra(n)));
  }
  function Ji(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ra(e)));
  }
  function zt(e, t, n, r) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (qd(e, t, n, r), (t = t.sibling));
  }
  function qd(e, t, n, r) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (zt(e, t, n, r), a & 2048 && ga(9, t));
        break;
      case 1:
        zt(e, t, n, r);
        break;
      case 3:
        (zt(e, t, n, r),
          a & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ra(e))));
        break;
      case 12:
        if (a & 2048) {
          (zt(e, t, n, r), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              u = s.id,
              d = s.onPostCommit;
            typeof d == 'function' &&
              d(u, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (m) {
            he(t, t.return, m);
          }
        } else zt(e, t, n, r);
        break;
      case 31:
        zt(e, t, n, r);
        break;
      case 13:
        zt(e, t, n, r);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (u = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? zt(e, t, n, r)
              : va(e, t)
            : s._visibility & 2
              ? zt(e, t, n, r)
              : ((s._visibility |= 2), Er(e, t, n, r, (t.subtreeFlags & 10256) !== 0 || !1)),
          a & 2048 && Xi(u, t));
        break;
      case 24:
        (zt(e, t, n, r), a & 2048 && Ji(t.alternate, t));
        break;
      default:
        zt(e, t, n, r);
    }
  }
  function Er(e, t, n, r, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e,
        u = t,
        d = n,
        m = r,
        w = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Er(s, u, d, m, a), ga(8, u));
          break;
        case 23:
          break;
        case 22:
          var E = u.stateNode;
          (u.memoizedState !== null
            ? E._visibility & 2
              ? Er(s, u, d, m, a)
              : va(s, u)
            : ((E._visibility |= 2), Er(s, u, d, m, a)),
            a && w & 2048 && Xi(u.alternate, u));
          break;
        case 24:
          (Er(s, u, d, m, a), a && w & 2048 && Ji(u.alternate, u));
          break;
        default:
          Er(s, u, d, m, a);
      }
      t = t.sibling;
    }
  }
  function va(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          r = t,
          a = r.flags;
        switch (r.tag) {
          case 22:
            (va(n, r), a & 2048 && Xi(r.alternate, r));
            break;
          case 24:
            (va(n, r), a & 2048 && Ji(r.alternate, r));
            break;
          default:
            va(n, r);
        }
        t = t.sibling;
      }
  }
  var ba = 8192;
  function Cr(e, t, n) {
    if (e.subtreeFlags & ba) for (e = e.child; e !== null; ) (Vd(e, t, n), (e = e.sibling));
  }
  function Vd(e, t, n) {
    switch (e.tag) {
      case 26:
        (Cr(e, t, n),
          e.flags & ba && e.memoizedState !== null && pg(n, Lt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Cr(e, t, n);
        break;
      case 3:
      case 4:
        var r = Lt;
        ((Lt = Hs(e.stateNode.containerInfo)), Cr(e, t, n), (Lt = r));
        break;
      case 22:
        e.memoizedState === null &&
          ((r = e.alternate),
          r !== null && r.memoizedState !== null
            ? ((r = ba), (ba = 16777216), Cr(e, t, n), (ba = r))
            : Cr(e, t, n));
        break;
      default:
        Cr(e, t, n);
    }
  }
  function Hd(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function xa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          ((Be = r), Wd(r, e));
        }
      Hd(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) ($d(e), (e = e.sibling));
  }
  function $d(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (xa(e), e.flags & 2048 && wn(9, e, e.return));
        break;
      case 3:
        xa(e);
        break;
      case 12:
        xa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), As(e))
          : xa(e);
        break;
      default:
        xa(e);
    }
  }
  function As(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          ((Be = r), Wd(r, e));
        }
      Hd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (wn(8, t, t.return), As(t));
          break;
        case 22:
          ((n = t.stateNode), n._visibility & 2 && ((n._visibility &= -3), As(t)));
          break;
        default:
          As(t);
      }
      e = e.sibling;
    }
  }
  function Wd(e, t) {
    for (; Be !== null; ) {
      var n = Be;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          wn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var r = n.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          ra(n.memoizedState.cache);
      }
      if (((r = n.child), r !== null)) ((r.return = n), (Be = r));
      else
        e: for (n = e; Be !== null; ) {
          r = Be;
          var a = r.sibling,
            s = r.return;
          if ((Md(r), r === n)) {
            Be = null;
            break e;
          }
          if (a !== null) {
            ((a.return = s), (Be = a));
            break e;
          }
          Be = s;
        }
    }
  }
  var jm = {
      getCacheForType: function (e) {
        var t = We(Ae),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return We(Ae).controller.signal;
      },
    },
    Pm = typeof WeakMap == 'function' ? WeakMap : Map,
    ue = 0,
    ye = null,
    Y = null,
    te = 0,
    fe = 0,
    gt = null,
    kn = !1,
    Tr = !1,
    Zi = !1,
    sn = 0,
    Ne = 0,
    Sn = 0,
    Yn = 0,
    Yi = 0,
    yt = 0,
    jr = 0,
    wa = null,
    ot = null,
    el = !1,
    Rs = 0,
    Qd = 0,
    Os = 1 / 0,
    Ls = null,
    Nn = null,
    Ue = 0,
    _n = null,
    Pr = null,
    on = 0,
    tl = 0,
    nl = null,
    Kd = null,
    ka = 0,
    rl = null;
  function vt() {
    return (ue & 2) !== 0 && te !== 0 ? te & -te : C.T !== null ? ul() : cu();
  }
  function Gd() {
    if (yt === 0)
      if ((te & 536870912) === 0 || re) {
        var e = qa;
        ((qa <<= 1), (qa & 3932160) === 0 && (qa = 262144), (yt = e));
      } else yt = 536870912;
    return ((e = pt.current), e !== null && (e.flags |= 32), yt);
  }
  function it(e, t, n) {
    (((e === ye && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null) &&
      (Ar(e, 0), En(e, te, yt, !1)),
      Vr(e, n),
      ((ue & 2) === 0 || e !== ye) &&
        (e === ye && ((ue & 2) === 0 && (Yn |= n), Ne === 4 && En(e, te, yt, !1)), Ft(e)));
  }
  function Xd(e, t, n) {
    if ((ue & 6) !== 0) throw Error(l(327));
    var r = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || qr(e, t),
      a = r ? Om(e, t) : sl(e, t, !0),
      s = r;
    do {
      if (a === 0) {
        Tr && !r && En(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), s && !Am(n))) {
          ((a = sl(e, t, !1)), (s = !1));
          continue;
        }
        if (a === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var u = 0;
          else
            ((u = e.pendingLanes & -536870913), (u = u !== 0 ? u : u & 536870912 ? 536870912 : 0));
          if (u !== 0) {
            t = u;
            e: {
              var d = e;
              a = wa;
              var m = d.current.memoizedState.isDehydrated;
              if ((m && (Ar(d, u).flags |= 256), (u = sl(d, u, !1)), u !== 2)) {
                if (Zi && !m) {
                  ((d.errorRecoveryDisabledLanes |= s), (Yn |= s), (a = 4));
                  break e;
                }
                ((s = ot), (ot = a), s !== null && (ot === null ? (ot = s) : ot.push.apply(ot, s)));
              }
              a = u;
            }
            if (((s = !1), a !== 2)) continue;
          }
        }
        if (a === 1) {
          (Ar(e, 0), En(e, t, 0, !0));
          break;
        }
        e: {
          switch (((r = e), (s = a), s)) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              En(r, t, yt, !kn);
              break e;
            case 2:
              ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((t & 62914560) === t && ((a = Rs + 300 - ut()), 10 < a)) {
            if ((En(r, t, yt, !kn), Ha(r, 0, !0) !== 0)) break e;
            ((on = t),
              (r.timeoutHandle = Tf(
                Jd.bind(null, r, n, ot, Ls, el, t, yt, Yn, jr, kn, s, 'Throttled', -0, 0),
                a
              )));
            break e;
          }
          Jd(r, n, ot, Ls, el, t, yt, Yn, jr, kn, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ft(e);
  }
  function Jd(e, t, n, r, a, s, u, d, m, w, E, j, k, N) {
    if (((e.timeoutHandle = -1), (j = t.subtreeFlags), j & 8192 || (j & 16785408) === 16785408)) {
      ((j = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $t,
      }),
        Vd(t, s, j));
      var U = (s & 62914560) === s ? Rs - ut() : (s & 4194048) === s ? Qd - ut() : 0;
      if (((U = mg(j, U)), U !== null)) {
        ((on = s),
          (e.cancelPendingCommit = U(sf.bind(null, e, t, s, n, r, a, u, d, m, E, j, null, k, N))),
          En(e, s, u, !w));
        return;
      }
    }
    sf(e, t, s, n, r, a, u, d, m);
  }
  function Am(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var r = 0; r < n.length; r++) {
          var a = n[r],
            s = a.getSnapshot;
          a = a.value;
          try {
            if (!ft(s(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function En(e, t, n, r) {
    ((t &= ~Yi),
      (t &= ~Yn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      r && (e.warmLanes |= t),
      (r = e.expirationTimes));
    for (var a = t; 0 < a; ) {
      var s = 31 - dt(a),
        u = 1 << s;
      ((r[s] = -1), (a &= ~u));
    }
    n !== 0 && iu(e, n, t);
  }
  function zs() {
    return (ue & 6) === 0 ? (Sa(0), !1) : !0;
  }
  function al() {
    if (Y !== null) {
      if (fe === 0) var e = Y.return;
      else ((e = Y), (Gt = Hn = null), xi(e), (wr = null), (sa = 0), (e = Y));
      for (; e !== null; ) (Td(e.alternate, e), (e = e.return));
      Y = null;
    }
  }
  function Ar(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), Jm(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (on = 0),
      al(),
      (ye = e),
      (Y = n = Qt(e.current, null)),
      (te = t),
      (fe = 0),
      (gt = null),
      (kn = !1),
      (Tr = qr(e, t)),
      (Zi = !1),
      (jr = yt = Yi = Yn = Sn = Ne = 0),
      (ot = wa = null),
      (el = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var a = 31 - dt(r),
          s = 1 << a;
        ((t |= e[a]), (r &= ~s));
      }
    return ((sn = t), ns(), n);
  }
  function Zd(e, t) {
    ((G = null),
      (C.H = ha),
      t === xr || t === cs
        ? ((t = pc()), (fe = 3))
        : t === li
          ? ((t = pc()), (fe = 4))
          : (fe =
              t === Mi
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (gt = t),
      Y === null && ((Ne = 1), Ns(e, St(t, e.current))));
  }
  function Yd() {
    var e = pt.current;
    return e === null
      ? !0
      : (te & 4194048) === te
        ? Ot === null
        : (te & 62914560) === te || (te & 536870912) !== 0
          ? e === Ot
          : !1;
  }
  function ef() {
    var e = C.H;
    return ((C.H = ha), e === null ? ha : e);
  }
  function tf() {
    var e = C.A;
    return ((C.A = jm), e);
  }
  function Ms() {
    ((Ne = 4),
      kn || ((te & 4194048) !== te && pt.current !== null) || (Tr = !0),
      ((Sn & 134217727) === 0 && (Yn & 134217727) === 0) || ye === null || En(ye, te, yt, !1));
  }
  function sl(e, t, n) {
    var r = ue;
    ue |= 2;
    var a = ef(),
      s = tf();
    ((ye !== e || te !== t) && ((Ls = null), Ar(e, t)), (t = !1));
    var u = Ne;
    e: do
      try {
        if (fe !== 0 && Y !== null) {
          var d = Y,
            m = gt;
          switch (fe) {
            case 8:
              (al(), (u = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              pt.current === null && (t = !0);
              var w = fe;
              if (((fe = 0), (gt = null), Rr(e, d, m, w), n && Tr)) {
                u = 0;
                break e;
              }
              break;
            default:
              ((w = fe), (fe = 0), (gt = null), Rr(e, d, m, w));
          }
        }
        (Rm(), (u = Ne));
        break;
      } catch (E) {
        Zd(e, E);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Gt = Hn = null),
      (ue = r),
      (C.H = a),
      (C.A = s),
      Y === null && ((ye = null), (te = 0), ns()),
      u
    );
  }
  function Rm() {
    for (; Y !== null; ) nf(Y);
  }
  function Om(e, t) {
    var n = ue;
    ue |= 2;
    var r = ef(),
      a = tf();
    ye !== e || te !== t ? ((Ls = null), (Os = ut() + 500), Ar(e, t)) : (Tr = qr(e, t));
    e: do
      try {
        if (fe !== 0 && Y !== null) {
          t = Y;
          var s = gt;
          t: switch (fe) {
            case 1:
              ((fe = 0), (gt = null), Rr(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (fc(s)) {
                ((fe = 0), (gt = null), rf(t));
                break;
              }
              ((t = function () {
                ((fe !== 2 && fe !== 9) || ye !== e || (fe = 7), Ft(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              fe = 7;
              break e;
            case 4:
              fe = 5;
              break e;
            case 7:
              fc(s) ? ((fe = 0), (gt = null), rf(t)) : ((fe = 0), (gt = null), Rr(e, t, s, 7));
              break;
            case 5:
              var u = null;
              switch (Y.tag) {
                case 26:
                  u = Y.memoizedState;
                case 5:
                case 27:
                  var d = Y;
                  if (u ? Vf(u) : d.stateNode.complete) {
                    ((fe = 0), (gt = null));
                    var m = d.sibling;
                    if (m !== null) Y = m;
                    else {
                      var w = d.return;
                      w !== null ? ((Y = w), Is(w)) : (Y = null);
                    }
                    break t;
                  }
              }
              ((fe = 0), (gt = null), Rr(e, t, s, 5));
              break;
            case 6:
              ((fe = 0), (gt = null), Rr(e, t, s, 6));
              break;
            case 8:
              (al(), (Ne = 6));
              break e;
            default:
              throw Error(l(462));
          }
        }
        Lm();
        break;
      } catch (E) {
        Zd(e, E);
      }
    while (!0);
    return (
      (Gt = Hn = null),
      (C.H = r),
      (C.A = a),
      (ue = n),
      Y !== null ? 0 : ((ye = null), (te = 0), ns(), Ne)
    );
  }
  function Lm() {
    for (; Y !== null && !rp(); ) nf(Y);
  }
  function nf(e) {
    var t = Ed(e.alternate, e, sn);
    ((e.memoizedProps = e.pendingProps), t === null ? Is(e) : (Y = t));
  }
  function rf(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = xd(n, t, t.pendingProps, t.type, void 0, te);
        break;
      case 11:
        t = xd(n, t, t.pendingProps, t.type.render, t.ref, te);
        break;
      case 5:
        xi(t);
      default:
        (Td(n, t), (t = Y = tc(t, sn)), (t = Ed(n, t, sn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Is(e) : (Y = t));
  }
  function Rr(e, t, n, r) {
    ((Gt = Hn = null), xi(t), (wr = null), (sa = 0));
    var a = t.return;
    try {
      if (km(e, a, t, n, te)) {
        ((Ne = 1), Ns(e, St(n, e.current)), (Y = null));
        return;
      }
    } catch (s) {
      if (a !== null) throw ((Y = a), s);
      ((Ne = 1), Ns(e, St(n, e.current)), (Y = null));
      return;
    }
    t.flags & 32768
      ? (re || r === 1
          ? (e = !0)
          : Tr || (te & 536870912) !== 0
            ? (e = !1)
            : ((kn = e = !0),
              (r === 2 || r === 9 || r === 3 || r === 6) &&
                ((r = pt.current), r !== null && r.tag === 13 && (r.flags |= 16384))),
        af(t, e))
      : Is(t);
  }
  function Is(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        af(t, kn);
        return;
      }
      e = t.return;
      var n = _m(t.alternate, t, sn);
      if (n !== null) {
        Y = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Y = t;
        return;
      }
      Y = t = e;
    } while (t !== null);
    Ne === 0 && (Ne = 5);
  }
  function af(e, t) {
    do {
      var n = Em(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (Y = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Y = e;
        return;
      }
      Y = e = n;
    } while (e !== null);
    ((Ne = 6), (Y = null));
  }
  function sf(e, t, n, r, a, s, u, d, m) {
    e.cancelPendingCommit = null;
    do Us();
    while (Ue !== 0);
    if ((ue & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= Qo),
        hp(e, n, s, u, d, m),
        e === ye && ((Y = ye = null), (te = 0)),
        (Pr = t),
        (_n = e),
        (on = n),
        (tl = s),
        (nl = a),
        (Kd = r),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Um(Fa, function () {
              return (df(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (r = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || r)
      ) {
        ((r = C.T), (C.T = null), (a = z.p), (z.p = 2), (u = ue), (ue |= 4));
        try {
          Cm(e, t, n);
        } finally {
          ((ue = u), (z.p = a), (C.T = r));
        }
      }
      ((Ue = 1), of(), lf(), uf());
    }
  }
  function of() {
    if (Ue === 1) {
      Ue = 0;
      var e = _n,
        t = Pr,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = C.T), (C.T = null));
        var r = z.p;
        z.p = 2;
        var a = ue;
        ue |= 4;
        try {
          Fd(t, e);
          var s = yl,
            u = Wu(e.containerInfo),
            d = s.focusedElem,
            m = s.selectionRange;
          if (u !== d && d && d.ownerDocument && $u(d.ownerDocument.documentElement, d)) {
            if (m !== null && qo(d)) {
              var w = m.start,
                E = m.end;
              if ((E === void 0 && (E = w), 'selectionStart' in d))
                ((d.selectionStart = w), (d.selectionEnd = Math.min(E, d.value.length)));
              else {
                var j = d.ownerDocument || document,
                  k = (j && j.defaultView) || window;
                if (k.getSelection) {
                  var N = k.getSelection(),
                    U = d.textContent.length,
                    W = Math.min(m.start, U),
                    ge = m.end === void 0 ? W : Math.min(m.end, U);
                  !N.extend && W > ge && ((u = ge), (ge = W), (W = u));
                  var v = Hu(d, W),
                    g = Hu(d, ge);
                  if (
                    v &&
                    g &&
                    (N.rangeCount !== 1 ||
                      N.anchorNode !== v.node ||
                      N.anchorOffset !== v.offset ||
                      N.focusNode !== g.node ||
                      N.focusOffset !== g.offset)
                  ) {
                    var x = j.createRange();
                    (x.setStart(v.node, v.offset),
                      N.removeAllRanges(),
                      W > ge
                        ? (N.addRange(x), N.extend(g.node, g.offset))
                        : (x.setEnd(g.node, g.offset), N.addRange(x)));
                  }
                }
              }
            }
            for (j = [], N = d; (N = N.parentNode); )
              N.nodeType === 1 && j.push({ element: N, left: N.scrollLeft, top: N.scrollTop });
            for (typeof d.focus == 'function' && d.focus(), d = 0; d < j.length; d++) {
              var T = j[d];
              ((T.element.scrollLeft = T.left), (T.element.scrollTop = T.top));
            }
          }
          ((Xs = !!gl), (yl = gl = null));
        } finally {
          ((ue = a), (z.p = r), (C.T = n));
        }
      }
      ((e.current = t), (Ue = 2));
    }
  }
  function lf() {
    if (Ue === 2) {
      Ue = 0;
      var e = _n,
        t = Pr,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = C.T), (C.T = null));
        var r = z.p;
        z.p = 2;
        var a = ue;
        ue |= 4;
        try {
          zd(e, t.alternate, t);
        } finally {
          ((ue = a), (z.p = r), (C.T = n));
        }
      }
      Ue = 3;
    }
  }
  function uf() {
    if (Ue === 4 || Ue === 3) {
      ((Ue = 0), ap());
      var e = _n,
        t = Pr,
        n = on,
        r = Kd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ue = 5)
        : ((Ue = 0), (Pr = _n = null), cf(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (
        (a === 0 && (Nn = null),
        So(n),
        (t = t.stateNode),
        ct && typeof ct.onCommitFiberRoot == 'function')
      )
        try {
          ct.onCommitFiberRoot(Br, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        ((t = C.T), (a = z.p), (z.p = 2), (C.T = null));
        try {
          for (var s = e.onRecoverableError, u = 0; u < r.length; u++) {
            var d = r[u];
            s(d.value, { componentStack: d.stack });
          }
        } finally {
          ((C.T = t), (z.p = a));
        }
      }
      ((on & 3) !== 0 && Us(),
        Ft(e),
        (a = e.pendingLanes),
        (n & 261930) !== 0 && (a & 42) !== 0 ? (e === rl ? ka++ : ((ka = 0), (rl = e))) : (ka = 0),
        Sa(0));
    }
  }
  function cf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ra(t)));
  }
  function Us() {
    return (of(), lf(), uf(), df());
  }
  function df() {
    if (Ue !== 5) return !1;
    var e = _n,
      t = tl;
    tl = 0;
    var n = So(on),
      r = C.T,
      a = z.p;
    try {
      ((z.p = 32 > n ? 32 : n), (C.T = null), (n = nl), (nl = null));
      var s = _n,
        u = on;
      if (((Ue = 0), (Pr = _n = null), (on = 0), (ue & 6) !== 0)) throw Error(l(331));
      var d = ue;
      if (
        ((ue |= 4),
        $d(s.current),
        qd(s, s.current, u, n),
        (ue = d),
        Sa(0, !1),
        ct && typeof ct.onPostCommitFiberRoot == 'function')
      )
        try {
          ct.onPostCommitFiberRoot(Br, s);
        } catch {}
      return !0;
    } finally {
      ((z.p = a), (C.T = r), cf(e, t));
    }
  }
  function ff(e, t, n) {
    ((t = St(n, t)),
      (t = zi(e.stateNode, t, 2)),
      (e = vn(e, t, 2)),
      e !== null && (Vr(e, 2), Ft(e)));
  }
  function he(e, t, n) {
    if (e.tag === 3) ff(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          ff(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof r.componentDidCatch == 'function' && (Nn === null || !Nn.has(r)))
          ) {
            ((e = St(n, e)),
              (n = fd(2)),
              (r = vn(t, n, 2)),
              r !== null && (hd(n, r, t, e), Vr(r, 2), Ft(r)));
            break;
          }
        }
        t = t.return;
      }
  }
  function ol(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Pm();
      var a = new Set();
      r.set(t, a);
    } else ((a = r.get(t)), a === void 0 && ((a = new Set()), r.set(t, a)));
    a.has(n) || ((Zi = !0), a.add(n), (e = zm.bind(null, e, t, n)), t.then(e, e));
  }
  function zm(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      ye === e &&
        (te & n) === n &&
        (Ne === 4 || (Ne === 3 && (te & 62914560) === te && 300 > ut() - Rs)
          ? (ue & 2) === 0 && Ar(e, 0)
          : (Yi |= n),
        jr === te && (jr = 0)),
      Ft(e));
  }
  function hf(e, t) {
    (t === 0 && (t = ou()), (e = Bn(e, t)), e !== null && (Vr(e, t), Ft(e)));
  }
  function Mm(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), hf(e, n));
  }
  function Im(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode,
          a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    (r !== null && r.delete(t), hf(e, n));
  }
  function Um(e, t) {
    return bo(e, t);
  }
  var Ds = null,
    Or = null,
    il = !1,
    Fs = !1,
    ll = !1,
    Cn = 0;
  function Ft(e) {
    (e !== Or && e.next === null && (Or === null ? (Ds = Or = e) : (Or = Or.next = e)),
      (Fs = !0),
      il || ((il = !0), Fm()));
  }
  function Sa(e, t) {
    if (!ll && Fs) {
      ll = !0;
      do
        for (var n = !1, r = Ds; r !== null; ) {
          if (e !== 0) {
            var a = r.pendingLanes;
            if (a === 0) var s = 0;
            else {
              var u = r.suspendedLanes,
                d = r.pingedLanes;
              ((s = (1 << (31 - dt(42 | e) + 1)) - 1),
                (s &= a & ~(u & ~d)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((n = !0), yf(r, s));
          } else
            ((s = te),
              (s = Ha(
                r,
                r === ye ? s : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (s & 3) === 0 || qr(r, s) || ((n = !0), yf(r, s)));
          r = r.next;
        }
      while (n);
      ll = !1;
    }
  }
  function Dm() {
    pf();
  }
  function pf() {
    Fs = il = !1;
    var e = 0;
    Cn !== 0 && Xm() && (e = Cn);
    for (var t = ut(), n = null, r = Ds; r !== null; ) {
      var a = r.next,
        s = mf(r, t);
      (s === 0
        ? ((r.next = null), n === null ? (Ds = a) : (n.next = a), a === null && (Or = n))
        : ((n = r), (e !== 0 || (s & 3) !== 0) && (Fs = !0)),
        (r = a));
    }
    ((Ue !== 0 && Ue !== 5) || Sa(e), Cn !== 0 && (Cn = 0));
  }
  function mf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        a = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;

    ) {
      var u = 31 - dt(s),
        d = 1 << u,
        m = a[u];
      (m === -1
        ? ((d & n) === 0 || (d & r) !== 0) && (a[u] = fp(d, t))
        : m <= t && (e.expiredLanes |= d),
        (s &= ~d));
    }
    if (
      ((t = ye),
      (n = te),
      (n = Ha(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (r = e.callbackNode),
      n === 0 || (e === t && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null)
    )
      return (r !== null && r !== null && xo(r), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((n & 3) === 0 || qr(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((r !== null && xo(r), So(n))) {
        case 2:
        case 8:
          n = au;
          break;
        case 32:
          n = Fa;
          break;
        case 268435456:
          n = su;
          break;
        default:
          n = Fa;
      }
      return (
        (r = gf.bind(null, e)),
        (n = bo(n, r)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      r !== null && r !== null && xo(r),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function gf(e, t) {
    if (Ue !== 0 && Ue !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Us() && e.callbackNode !== n) return null;
    var r = te;
    return (
      (r = Ha(e, e === ye ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      r === 0
        ? null
        : (Xd(e, r, t),
          mf(e, ut()),
          e.callbackNode != null && e.callbackNode === n ? gf.bind(null, e) : null)
    );
  }
  function yf(e, t) {
    if (Us()) return null;
    Xd(e, t, !0);
  }
  function Fm() {
    Zm(function () {
      (ue & 6) !== 0 ? bo(ru, Dm) : pf();
    });
  }
  function ul() {
    if (Cn === 0) {
      var e = vr;
      (e === 0 && ((e = Ba), (Ba <<= 1), (Ba & 261888) === 0 && (Ba = 256)), (Cn = e));
    }
    return Cn;
  }
  function vf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Ka('' + e);
  }
  function bf(e, t) {
    var n = t.ownerDocument.createElement('input');
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute('form', e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function Bm(e, t, n, r, a) {
    if (t === 'submit' && n && n.stateNode === a) {
      var s = vf((a[tt] || null).action),
        u = r.submitter;
      u &&
        ((t = (t = u[tt] || null) ? vf(t.formAction) : u.getAttribute('formAction')),
        t !== null && ((s = t), (u = null)));
      var d = new Za('action', 'action', null, r, a);
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (Cn !== 0) {
                  var m = u ? bf(a, u) : new FormData(a);
                  ji(n, { pending: !0, data: m, method: a.method, action: s }, null, m);
                }
              } else
                typeof s == 'function' &&
                  (d.preventDefault(),
                  (m = u ? bf(a, u) : new FormData(a)),
                  ji(n, { pending: !0, data: m, method: a.method, action: s }, s, m));
            },
            currentTarget: a,
          },
        ],
      });
    }
  }
  for (var cl = 0; cl < Wo.length; cl++) {
    var dl = Wo[cl],
      qm = dl.toLowerCase(),
      Vm = dl[0].toUpperCase() + dl.slice(1);
    Rt(qm, 'on' + Vm);
  }
  (Rt(Gu, 'onAnimationEnd'),
    Rt(Xu, 'onAnimationIteration'),
    Rt(Ju, 'onAnimationStart'),
    Rt('dblclick', 'onDoubleClick'),
    Rt('focusin', 'onFocus'),
    Rt('focusout', 'onBlur'),
    Rt(sm, 'onTransitionRun'),
    Rt(om, 'onTransitionStart'),
    Rt(im, 'onTransitionCancel'),
    Rt(Zu, 'onTransitionEnd'),
    ar('onMouseEnter', ['mouseout', 'mouseover']),
    ar('onMouseLeave', ['mouseout', 'mouseover']),
    ar('onPointerEnter', ['pointerout', 'pointerover']),
    ar('onPointerLeave', ['pointerout', 'pointerover']),
    In('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    In(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    In('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    In('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    In(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    In(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Na =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Hm = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Na)
    );
  function xf(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        a = r.event;
      r = r.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var u = r.length - 1; 0 <= u; u--) {
            var d = r[u],
              m = d.instance,
              w = d.currentTarget;
            if (((d = d.listener), m !== s && a.isPropagationStopped())) break e;
            ((s = d), (a.currentTarget = w));
            try {
              s(a);
            } catch (E) {
              ts(E);
            }
            ((a.currentTarget = null), (s = m));
          }
        else
          for (u = 0; u < r.length; u++) {
            if (
              ((d = r[u]),
              (m = d.instance),
              (w = d.currentTarget),
              (d = d.listener),
              m !== s && a.isPropagationStopped())
            )
              break e;
            ((s = d), (a.currentTarget = w));
            try {
              s(a);
            } catch (E) {
              ts(E);
            }
            ((a.currentTarget = null), (s = m));
          }
      }
    }
  }
  function ee(e, t) {
    var n = t[No];
    n === void 0 && (n = t[No] = new Set());
    var r = e + '__bubble';
    n.has(r) || (wf(t, e, 2, !1), n.add(r));
  }
  function fl(e, t, n) {
    var r = 0;
    (t && (r |= 4), wf(n, e, r, t));
  }
  var Bs = '_reactListening' + Math.random().toString(36).slice(2);
  function hl(e) {
    if (!e[Bs]) {
      ((e[Bs] = !0),
        hu.forEach(function (n) {
          n !== 'selectionchange' && (Hm.has(n) || fl(n, !1, e), fl(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Bs] || ((t[Bs] = !0), fl('selectionchange', !1, t));
    }
  }
  function wf(e, t, n, r) {
    switch (Xf(t)) {
      case 2:
        var a = vg;
        break;
      case 8:
        a = bg;
        break;
      default:
        a = Tl;
    }
    ((n = a.bind(null, t, n, e)),
      (a = void 0),
      !Oo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (a = !0),
      r
        ? a !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : a !== void 0
          ? e.addEventListener(t, n, { passive: a })
          : e.addEventListener(t, n, !1));
  }
  function pl(e, t, n, r, a) {
    var s = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var u = r.tag;
        if (u === 3 || u === 4) {
          var d = r.stateNode.containerInfo;
          if (d === a) break;
          if (u === 4)
            for (u = r.return; u !== null; ) {
              var m = u.tag;
              if ((m === 3 || m === 4) && u.stateNode.containerInfo === a) return;
              u = u.return;
            }
          for (; d !== null; ) {
            if (((u = tr(d)), u === null)) return;
            if (((m = u.tag), m === 5 || m === 6 || m === 26 || m === 27)) {
              r = s = u;
              continue e;
            }
            d = d.parentNode;
          }
        }
        r = r.return;
      }
    _u(function () {
      var w = s,
        E = Ao(n),
        j = [];
      e: {
        var k = Yu.get(e);
        if (k !== void 0) {
          var N = Za,
            U = e;
          switch (e) {
            case 'keypress':
              if (Xa(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              N = Ip;
              break;
            case 'focusin':
              ((U = 'focus'), (N = Io));
              break;
            case 'focusout':
              ((U = 'blur'), (N = Io));
              break;
            case 'beforeblur':
            case 'afterblur':
              N = Io;
              break;
            case 'click':
              if (n.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              N = Tu;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              N = _p;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              N = Fp;
              break;
            case Gu:
            case Xu:
            case Ju:
              N = Tp;
              break;
            case Zu:
              N = qp;
              break;
            case 'scroll':
            case 'scrollend':
              N = Sp;
              break;
            case 'wheel':
              N = Hp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              N = Pp;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              N = Pu;
              break;
            case 'toggle':
            case 'beforetoggle':
              N = Wp;
          }
          var W = (t & 4) !== 0,
            ge = !W && (e === 'scroll' || e === 'scrollend'),
            v = W ? (k !== null ? k + 'Capture' : null) : k;
          W = [];
          for (var g = w, x; g !== null; ) {
            var T = g;
            if (
              ((x = T.stateNode),
              (T = T.tag),
              (T !== 5 && T !== 26 && T !== 27) ||
                x === null ||
                v === null ||
                ((T = Wr(g, v)), T != null && W.push(_a(g, T, x))),
              ge)
            )
              break;
            g = g.return;
          }
          0 < W.length && ((k = new N(k, U, null, n, E)), j.push({ event: k, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((k = e === 'mouseover' || e === 'pointerover'),
            (N = e === 'mouseout' || e === 'pointerout'),
            k && n !== Po && (U = n.relatedTarget || n.fromElement) && (tr(U) || U[er]))
          )
            break e;
          if (
            (N || k) &&
            ((k =
              E.window === E
                ? E
                : (k = E.ownerDocument)
                  ? k.defaultView || k.parentWindow
                  : window),
            N
              ? ((U = n.relatedTarget || n.toElement),
                (N = w),
                (U = U ? tr(U) : null),
                U !== null &&
                  ((ge = b(U)), (W = U.tag), U !== ge || (W !== 5 && W !== 27 && W !== 6)) &&
                  (U = null))
              : ((N = null), (U = w)),
            N !== U)
          ) {
            if (
              ((W = Tu),
              (T = 'onMouseLeave'),
              (v = 'onMouseEnter'),
              (g = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((W = Pu), (T = 'onPointerLeave'), (v = 'onPointerEnter'), (g = 'pointer')),
              (ge = N == null ? k : $r(N)),
              (x = U == null ? k : $r(U)),
              (k = new W(T, g + 'leave', N, n, E)),
              (k.target = ge),
              (k.relatedTarget = x),
              (T = null),
              tr(E) === w &&
                ((W = new W(v, g + 'enter', U, n, E)),
                (W.target = x),
                (W.relatedTarget = ge),
                (T = W)),
              (ge = T),
              N && U)
            )
              t: {
                for (W = $m, v = N, g = U, x = 0, T = v; T; T = W(T)) x++;
                T = 0;
                for (var B = g; B; B = W(B)) T++;
                for (; 0 < x - T; ) ((v = W(v)), x--);
                for (; 0 < T - x; ) ((g = W(g)), T--);
                for (; x--; ) {
                  if (v === g || (g !== null && v === g.alternate)) {
                    W = v;
                    break t;
                  }
                  ((v = W(v)), (g = W(g)));
                }
                W = null;
              }
            else W = null;
            (N !== null && kf(j, k, N, W, !1), U !== null && ge !== null && kf(j, ge, U, W, !0));
          }
        }
        e: {
          if (
            ((k = w ? $r(w) : window),
            (N = k.nodeName && k.nodeName.toLowerCase()),
            N === 'select' || (N === 'input' && k.type === 'file'))
          )
            var ie = Uu;
          else if (Mu(k))
            if (Du) ie = nm;
            else {
              ie = em;
              var F = Yp;
            }
          else
            ((N = k.nodeName),
              !N || N.toLowerCase() !== 'input' || (k.type !== 'checkbox' && k.type !== 'radio')
                ? w && jo(w.elementType) && (ie = Uu)
                : (ie = tm));
          if (ie && (ie = ie(e, w))) {
            Iu(j, ie, n, E);
            break e;
          }
          (F && F(e, k, w),
            e === 'focusout' &&
              w &&
              k.type === 'number' &&
              w.memoizedProps.value != null &&
              To(k, 'number', k.value));
        }
        switch (((F = w ? $r(w) : window), e)) {
          case 'focusin':
            (Mu(F) || F.contentEditable === 'true') && ((cr = F), (Vo = w), (ea = null));
            break;
          case 'focusout':
            ea = Vo = cr = null;
            break;
          case 'mousedown':
            Ho = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ho = !1), Qu(j, n, E));
            break;
          case 'selectionchange':
            if (am) break;
          case 'keydown':
          case 'keyup':
            Qu(j, n, E);
        }
        var X;
        if (Do)
          e: {
            switch (e) {
              case 'compositionstart':
                var ne = 'onCompositionStart';
                break e;
              case 'compositionend':
                ne = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ne = 'onCompositionUpdate';
                break e;
            }
            ne = void 0;
          }
        else
          ur
            ? Lu(e, n) && (ne = 'onCompositionEnd')
            : e === 'keydown' && n.keyCode === 229 && (ne = 'onCompositionStart');
        (ne &&
          (Au &&
            n.locale !== 'ko' &&
            (ur || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && ur && (X = Eu())
              : ((dn = E), (Lo = 'value' in dn ? dn.value : dn.textContent), (ur = !0))),
          (F = qs(w, ne)),
          0 < F.length &&
            ((ne = new ju(ne, e, null, n, E)),
            j.push({ event: ne, listeners: F }),
            X ? (ne.data = X) : ((X = zu(n)), X !== null && (ne.data = X)))),
          (X = Kp ? Gp(e, n) : Xp(e, n)) &&
            ((ne = qs(w, 'onBeforeInput')),
            0 < ne.length &&
              ((F = new ju('onBeforeInput', 'beforeinput', null, n, E)),
              j.push({ event: F, listeners: ne }),
              (F.data = X))),
          Bm(j, e, w, n, E));
      }
      xf(j, t);
    });
  }
  function _a(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function qs(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var a = e,
        s = a.stateNode;
      if (
        ((a = a.tag),
        (a !== 5 && a !== 26 && a !== 27) ||
          s === null ||
          ((a = Wr(e, n)),
          a != null && r.unshift(_a(e, a, s)),
          (a = Wr(e, t)),
          a != null && r.push(_a(e, a, s))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function $m(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function kf(e, t, n, r, a) {
    for (var s = t._reactName, u = []; n !== null && n !== r; ) {
      var d = n,
        m = d.alternate,
        w = d.stateNode;
      if (((d = d.tag), m !== null && m === r)) break;
      ((d !== 5 && d !== 26 && d !== 27) ||
        w === null ||
        ((m = w),
        a
          ? ((w = Wr(n, s)), w != null && u.unshift(_a(n, w, m)))
          : a || ((w = Wr(n, s)), w != null && u.push(_a(n, w, m)))),
        (n = n.return));
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var Wm = /\r\n?/g,
    Qm = /\u0000|\uFFFD/g;
  function Sf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Wm,
        `
`
      )
      .replace(Qm, '');
  }
  function Nf(e, t) {
    return ((t = Sf(t)), Sf(e) === t);
  }
  function me(e, t, n, r, a, s) {
    switch (n) {
      case 'children':
        typeof r == 'string'
          ? t === 'body' || (t === 'textarea' && r === '') || or(e, r)
          : (typeof r == 'number' || typeof r == 'bigint') && t !== 'body' && or(e, '' + r);
        break;
      case 'className':
        Wa(e, 'class', r);
        break;
      case 'tabIndex':
        Wa(e, 'tabindex', r);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Wa(e, n, r);
        break;
      case 'style':
        Su(e, r, s);
        break;
      case 'data':
        if (t !== 'object') {
          Wa(e, 'data', r);
          break;
        }
      case 'src':
      case 'href':
        if (r === '' && (t !== 'a' || n !== 'href')) {
          e.removeAttribute(n);
          break;
        }
        if (r == null || typeof r == 'function' || typeof r == 'symbol' || typeof r == 'boolean') {
          e.removeAttribute(n);
          break;
        }
        ((r = Ka('' + r)), e.setAttribute(n, r));
        break;
      case 'action':
      case 'formAction':
        if (typeof r == 'function') {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == 'function' &&
            (n === 'formAction'
              ? (t !== 'input' && me(e, t, 'name', a.name, a, null),
                me(e, t, 'formEncType', a.formEncType, a, null),
                me(e, t, 'formMethod', a.formMethod, a, null),
                me(e, t, 'formTarget', a.formTarget, a, null))
              : (me(e, t, 'encType', a.encType, a, null),
                me(e, t, 'method', a.method, a, null),
                me(e, t, 'target', a.target, a, null)));
        if (r == null || typeof r == 'symbol' || typeof r == 'boolean') {
          e.removeAttribute(n);
          break;
        }
        ((r = Ka('' + r)), e.setAttribute(n, r));
        break;
      case 'onClick':
        r != null && (e.onclick = $t);
        break;
      case 'onScroll':
        r != null && ee('scroll', e);
        break;
      case 'onScrollEnd':
        r != null && ee('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(l(61));
          if (((n = r.__html), n != null)) {
            if (a.children != null) throw Error(l(60));
            e.innerHTML = n;
          }
        }
        break;
      case 'multiple':
        e.multiple = r && typeof r != 'function' && typeof r != 'symbol';
        break;
      case 'muted':
        e.muted = r && typeof r != 'function' && typeof r != 'symbol';
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break;
      case 'autoFocus':
        break;
      case 'xlinkHref':
        if (r == null || typeof r == 'function' || typeof r == 'boolean' || typeof r == 'symbol') {
          e.removeAttribute('xlink:href');
          break;
        }
        ((n = Ka('' + r)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', n));
        break;
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        r != null && typeof r != 'function' && typeof r != 'symbol'
          ? e.setAttribute(n, '' + r)
          : e.removeAttribute(n);
        break;
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        r && typeof r != 'function' && typeof r != 'symbol'
          ? e.setAttribute(n, '')
          : e.removeAttribute(n);
        break;
      case 'capture':
      case 'download':
        r === !0
          ? e.setAttribute(n, '')
          : r !== !1 && r != null && typeof r != 'function' && typeof r != 'symbol'
            ? e.setAttribute(n, r)
            : e.removeAttribute(n);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        r != null && typeof r != 'function' && typeof r != 'symbol' && !isNaN(r) && 1 <= r
          ? e.setAttribute(n, r)
          : e.removeAttribute(n);
        break;
      case 'rowSpan':
      case 'start':
        r == null || typeof r == 'function' || typeof r == 'symbol' || isNaN(r)
          ? e.removeAttribute(n)
          : e.setAttribute(n, r);
        break;
      case 'popover':
        (ee('beforetoggle', e), ee('toggle', e), $a(e, 'popover', r));
        break;
      case 'xlinkActuate':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', r);
        break;
      case 'xlinkArcrole':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', r);
        break;
      case 'xlinkRole':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:role', r);
        break;
      case 'xlinkShow':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:show', r);
        break;
      case 'xlinkTitle':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:title', r);
        break;
      case 'xlinkType':
        Ht(e, 'http://www.w3.org/1999/xlink', 'xlink:type', r);
        break;
      case 'xmlBase':
        Ht(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', r);
        break;
      case 'xmlLang':
        Ht(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', r);
        break;
      case 'xmlSpace':
        Ht(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', r);
        break;
      case 'is':
        $a(e, 'is', r);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < n.length) || (n[0] !== 'o' && n[0] !== 'O') || (n[1] !== 'n' && n[1] !== 'N')) &&
          ((n = wp.get(n) || n), $a(e, n, r));
    }
  }
  function ml(e, t, n, r, a, s) {
    switch (n) {
      case 'style':
        Su(e, r, s);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(l(61));
          if (((n = r.__html), n != null)) {
            if (a.children != null) throw Error(l(60));
            e.innerHTML = n;
          }
        }
        break;
      case 'children':
        typeof r == 'string'
          ? or(e, r)
          : (typeof r == 'number' || typeof r == 'bigint') && or(e, '' + r);
        break;
      case 'onScroll':
        r != null && ee('scroll', e);
        break;
      case 'onScrollEnd':
        r != null && ee('scrollend', e);
        break;
      case 'onClick':
        r != null && (e.onclick = $t);
        break;
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        if (!pu.hasOwnProperty(n))
          e: {
            if (
              n[0] === 'o' &&
              n[1] === 'n' &&
              ((a = n.endsWith('Capture')),
              (t = n.slice(2, a ? n.length - 7 : void 0)),
              (s = e[tt] || null),
              (s = s != null ? s[n] : null),
              typeof s == 'function' && e.removeEventListener(t, s, a),
              typeof r == 'function')
            ) {
              (typeof s != 'function' &&
                s !== null &&
                (n in e ? (e[n] = null) : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, r, a));
              break e;
            }
            n in e ? (e[n] = r) : r === !0 ? e.setAttribute(n, '') : $a(e, n, r);
          }
    }
  }
  function Ke(e, t, n) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'img':
        (ee('error', e), ee('load', e));
        var r = !1,
          a = !1,
          s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var u = n[s];
            if (u != null)
              switch (s) {
                case 'src':
                  r = !0;
                  break;
                case 'srcSet':
                  a = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(l(137, t));
                default:
                  me(e, t, s, u, n, null);
              }
          }
        (a && me(e, t, 'srcSet', n.srcSet, n, null), r && me(e, t, 'src', n.src, n, null));
        return;
      case 'input':
        ee('invalid', e);
        var d = (s = u = a = null),
          m = null,
          w = null;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var E = n[r];
            if (E != null)
              switch (r) {
                case 'name':
                  a = E;
                  break;
                case 'type':
                  u = E;
                  break;
                case 'checked':
                  m = E;
                  break;
                case 'defaultChecked':
                  w = E;
                  break;
                case 'value':
                  s = E;
                  break;
                case 'defaultValue':
                  d = E;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (E != null) throw Error(l(137, t));
                  break;
                default:
                  me(e, t, r, E, n, null);
              }
          }
        bu(e, s, d, m, w, u, a, !1);
        return;
      case 'select':
        (ee('invalid', e), (r = u = s = null));
        for (a in n)
          if (n.hasOwnProperty(a) && ((d = n[a]), d != null))
            switch (a) {
              case 'value':
                s = d;
                break;
              case 'defaultValue':
                u = d;
                break;
              case 'multiple':
                r = d;
              default:
                me(e, t, a, d, n, null);
            }
        ((t = s),
          (n = u),
          (e.multiple = !!r),
          t != null ? sr(e, !!r, t, !1) : n != null && sr(e, !!r, n, !0));
        return;
      case 'textarea':
        (ee('invalid', e), (s = a = r = null));
        for (u in n)
          if (n.hasOwnProperty(u) && ((d = n[u]), d != null))
            switch (u) {
              case 'value':
                r = d;
                break;
              case 'defaultValue':
                a = d;
                break;
              case 'children':
                s = d;
                break;
              case 'dangerouslySetInnerHTML':
                if (d != null) throw Error(l(91));
                break;
              default:
                me(e, t, u, d, n, null);
            }
        wu(e, r, a, s);
        return;
      case 'option':
        for (m in n)
          if (n.hasOwnProperty(m) && ((r = n[m]), r != null))
            switch (m) {
              case 'selected':
                e.selected = r && typeof r != 'function' && typeof r != 'symbol';
                break;
              default:
                me(e, t, m, r, n, null);
            }
        return;
      case 'dialog':
        (ee('beforetoggle', e), ee('toggle', e), ee('cancel', e), ee('close', e));
        break;
      case 'iframe':
      case 'object':
        ee('load', e);
        break;
      case 'video':
      case 'audio':
        for (r = 0; r < Na.length; r++) ee(Na[r], e);
        break;
      case 'image':
        (ee('error', e), ee('load', e));
        break;
      case 'details':
        ee('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ee('error', e), ee('load', e));
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (w in n)
          if (n.hasOwnProperty(w) && ((r = n[w]), r != null))
            switch (w) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(l(137, t));
              default:
                me(e, t, w, r, n, null);
            }
        return;
      default:
        if (jo(t)) {
          for (E in n)
            n.hasOwnProperty(E) && ((r = n[E]), r !== void 0 && ml(e, t, E, r, n, void 0));
          return;
        }
    }
    for (d in n) n.hasOwnProperty(d) && ((r = n[d]), r != null && me(e, t, d, r, n, null));
  }
  function Km(e, t, n, r) {
    switch (t) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break;
      case 'input':
        var a = null,
          s = null,
          u = null,
          d = null,
          m = null,
          w = null,
          E = null;
        for (N in n) {
          var j = n[N];
          if (n.hasOwnProperty(N) && j != null)
            switch (N) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                m = j;
              default:
                r.hasOwnProperty(N) || me(e, t, N, null, r, j);
            }
        }
        for (var k in r) {
          var N = r[k];
          if (((j = n[k]), r.hasOwnProperty(k) && (N != null || j != null)))
            switch (k) {
              case 'type':
                s = N;
                break;
              case 'name':
                a = N;
                break;
              case 'checked':
                w = N;
                break;
              case 'defaultChecked':
                E = N;
                break;
              case 'value':
                u = N;
                break;
              case 'defaultValue':
                d = N;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (N != null) throw Error(l(137, t));
                break;
              default:
                N !== j && me(e, t, k, N, r, j);
            }
        }
        Co(e, u, d, m, w, E, s, a);
        return;
      case 'select':
        N = u = d = k = null;
        for (s in n)
          if (((m = n[s]), n.hasOwnProperty(s) && m != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                N = m;
              default:
                r.hasOwnProperty(s) || me(e, t, s, null, r, m);
            }
        for (a in r)
          if (((s = r[a]), (m = n[a]), r.hasOwnProperty(a) && (s != null || m != null)))
            switch (a) {
              case 'value':
                k = s;
                break;
              case 'defaultValue':
                d = s;
                break;
              case 'multiple':
                u = s;
              default:
                s !== m && me(e, t, a, s, r, m);
            }
        ((t = d),
          (n = u),
          (r = N),
          k != null
            ? sr(e, !!n, k, !1)
            : !!r != !!n && (t != null ? sr(e, !!n, t, !0) : sr(e, !!n, n ? [] : '', !1)));
        return;
      case 'textarea':
        N = k = null;
        for (d in n)
          if (((a = n[d]), n.hasOwnProperty(d) && a != null && !r.hasOwnProperty(d)))
            switch (d) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                me(e, t, d, null, r, a);
            }
        for (u in r)
          if (((a = r[u]), (s = n[u]), r.hasOwnProperty(u) && (a != null || s != null)))
            switch (u) {
              case 'value':
                k = a;
                break;
              case 'defaultValue':
                N = a;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (a != null) throw Error(l(91));
                break;
              default:
                a !== s && me(e, t, u, a, r, s);
            }
        xu(e, k, N);
        return;
      case 'option':
        for (var U in n)
          if (((k = n[U]), n.hasOwnProperty(U) && k != null && !r.hasOwnProperty(U)))
            switch (U) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                me(e, t, U, null, r, k);
            }
        for (m in r)
          if (((k = r[m]), (N = n[m]), r.hasOwnProperty(m) && k !== N && (k != null || N != null)))
            switch (m) {
              case 'selected':
                e.selected = k && typeof k != 'function' && typeof k != 'symbol';
                break;
              default:
                me(e, t, m, k, r, N);
            }
        return;
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var W in n)
          ((k = n[W]),
            n.hasOwnProperty(W) && k != null && !r.hasOwnProperty(W) && me(e, t, W, null, r, k));
        for (w in r)
          if (((k = r[w]), (N = n[w]), r.hasOwnProperty(w) && k !== N && (k != null || N != null)))
            switch (w) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (k != null) throw Error(l(137, t));
                break;
              default:
                me(e, t, w, k, r, N);
            }
        return;
      default:
        if (jo(t)) {
          for (var ge in n)
            ((k = n[ge]),
              n.hasOwnProperty(ge) &&
                k !== void 0 &&
                !r.hasOwnProperty(ge) &&
                ml(e, t, ge, void 0, r, k));
          for (E in r)
            ((k = r[E]),
              (N = n[E]),
              !r.hasOwnProperty(E) ||
                k === N ||
                (k === void 0 && N === void 0) ||
                ml(e, t, E, k, r, N));
          return;
        }
    }
    for (var v in n)
      ((k = n[v]),
        n.hasOwnProperty(v) && k != null && !r.hasOwnProperty(v) && me(e, t, v, null, r, k));
    for (j in r)
      ((k = r[j]),
        (N = n[j]),
        !r.hasOwnProperty(j) || k === N || (k == null && N == null) || me(e, t, j, k, r, N));
  }
  function _f(e) {
    switch (e) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0;
      default:
        return !1;
    }
  }
  function Gm() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType('resource'), r = 0;
        r < n.length;
        r++
      ) {
        var a = n[r],
          s = a.transferSize,
          u = a.initiatorType,
          d = a.duration;
        if (s && d && _f(u)) {
          for (u = 0, d = a.responseEnd, r += 1; r < n.length; r++) {
            var m = n[r],
              w = m.startTime;
            if (w > d) break;
            var E = m.transferSize,
              j = m.initiatorType;
            E && _f(j) && ((m = m.responseEnd), (u += E * (m < d ? 1 : (d - w) / (m - w))));
          }
          if ((--r, (t += (8 * (s + u)) / (a.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var gl = null,
    yl = null;
  function Vs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ef(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Cf(e, t) {
    if (e === 0)
      switch (t) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === 'foreignObject' ? 0 : e;
  }
  function vl(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      typeof t.children == 'bigint' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var bl = null;
  function Xm() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === bl ? !1 : ((bl = e), !0)) : ((bl = null), !1);
  }
  var Tf = typeof setTimeout == 'function' ? setTimeout : void 0,
    Jm = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    jf = typeof Promise == 'function' ? Promise : void 0,
    Zm =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof jf < 'u'
          ? function (e) {
              return jf.resolve(null).then(e).catch(Ym);
            }
          : Tf;
  function Ym(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Tn(e) {
    return e === 'head';
  }
  function Pf(e, t) {
    var n = t,
      r = 0;
    do {
      var a = n.nextSibling;
      if ((e.removeChild(n), a && a.nodeType === 8))
        if (((n = a.data), n === '/$' || n === '/&')) {
          if (r === 0) {
            (e.removeChild(a), Ir(t));
            return;
          }
          r--;
        } else if (n === '$' || n === '$?' || n === '$~' || n === '$!' || n === '&') r++;
        else if (n === 'html') Ea(e.ownerDocument.documentElement);
        else if (n === 'head') {
          ((n = e.ownerDocument.head), Ea(n));
          for (var s = n.firstChild; s; ) {
            var u = s.nextSibling,
              d = s.nodeName;
            (s[Hr] ||
              d === 'SCRIPT' ||
              d === 'STYLE' ||
              (d === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              n.removeChild(s),
              (s = u));
          }
        } else n === 'body' && Ea(e.ownerDocument.body);
      n = a;
    } while (n);
    Ir(t);
  }
  function Af(e, t) {
    var n = e;
    e = 0;
    do {
      var r = n.nextSibling;
      if (
        (n.nodeType === 1
          ? t
            ? ((n._stashedDisplay = n.style.display), (n.style.display = 'none'))
            : ((n.style.display = n._stashedDisplay || ''),
              n.getAttribute('style') === '' && n.removeAttribute('style'))
          : n.nodeType === 3 &&
            (t
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ''))
              : (n.nodeValue = n._stashedText || '')),
        r && r.nodeType === 8)
      )
        if (((n = r.data), n === '/$')) {
          if (e === 0) break;
          e--;
        } else (n !== '$' && n !== '$?' && n !== '$~' && n !== '$!') || e++;
      n = r;
    } while (n);
  }
  function xl(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (xl(n), _o(n));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (n.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(n);
    }
  }
  function eg(e, t, n, r) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (r) {
        if (!e[Hr])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((s = e.getAttribute('rel')),
                (s === 'stylesheet' && e.hasAttribute('data-precedence')) ||
                  s !== a.rel ||
                  e.getAttribute('href') !== (a.href == null || a.href === '' ? null : a.href) ||
                  e.getAttribute('crossorigin') !==
                    (a.crossOrigin == null ? null : a.crossOrigin) ||
                  e.getAttribute('title') !== (a.title == null ? null : a.title))
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((s = e.getAttribute('src')),
                (s !== (a.src == null ? null : a.src) ||
                  e.getAttribute('type') !== (a.type == null ? null : a.type) ||
                  e.getAttribute('crossorigin') !==
                    (a.crossOrigin == null ? null : a.crossOrigin)) &&
                  s &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var s = a.name == null ? null : '' + a.name;
        if (a.type === 'hidden' && e.getAttribute('name') === s) return e;
      } else return e;
      if (((e = Ct(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function tg(e, t, n) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !n) ||
        ((e = Ct(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Rf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Ct(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function wl(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function kl(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function ng(e, t) {
    var n = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || n.readyState !== 'loading') t();
    else {
      var r = function () {
        (t(), n.removeEventListener('DOMContentLoaded', r));
      };
      (n.addEventListener('DOMContentLoaded', r), (e._reactRetry = r));
    }
  }
  function Ct(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === '$' ||
            t === '$!' ||
            t === '$?' ||
            t === '$~' ||
            t === '&' ||
            t === 'F!' ||
            t === 'F')
        )
          break;
        if (t === '/$' || t === '/&') return null;
      }
    }
    return e;
  }
  var Sl = null;
  function Of(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '/$' || n === '/&') {
          if (t === 0) return Ct(e.nextSibling);
          t--;
        } else (n !== '$' && n !== '$!' && n !== '$?' && n !== '$~' && n !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Lf(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '$' || n === '$!' || n === '$?' || n === '$~' || n === '&') {
          if (t === 0) return e;
          t--;
        } else (n !== '/$' && n !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function zf(e, t, n) {
    switch (((t = Vs(n)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(l(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(l(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function Ea(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    _o(e);
  }
  var Tt = new Map(),
    Mf = new Set();
  function Hs(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ln = z.d;
  z.d = { f: rg, r: ag, D: sg, C: og, L: ig, m: lg, X: cg, S: ug, M: dg };
  function rg() {
    var e = ln.f(),
      t = zs();
    return e || t;
  }
  function ag(e) {
    var t = nr(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Zc(t) : ln.r(e);
  }
  var Lr = typeof document > 'u' ? null : document;
  function If(e, t, n) {
    var r = Lr;
    if (r && typeof t == 'string' && t) {
      var a = At(t);
      ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
        typeof n == 'string' && (a += '[crossorigin="' + n + '"]'),
        Mf.has(a) ||
          (Mf.add(a),
          (e = { rel: e, crossOrigin: n, href: t }),
          r.querySelector(a) === null &&
            ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t))));
    }
  }
  function sg(e) {
    (ln.D(e), If('dns-prefetch', e, null));
  }
  function og(e, t) {
    (ln.C(e, t), If('preconnect', e, t));
  }
  function ig(e, t, n) {
    ln.L(e, t, n);
    var r = Lr;
    if (r && e && t) {
      var a = 'link[rel="preload"][as="' + At(t) + '"]';
      t === 'image' && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + At(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == 'string' && (a += '[imagesizes="' + At(n.imageSizes) + '"]'))
        : (a += '[href="' + At(e) + '"]');
      var s = a;
      switch (t) {
        case 'style':
          s = zr(e);
          break;
        case 'script':
          s = Mr(e);
      }
      Tt.has(s) ||
        ((e = L(
          { rel: 'preload', href: t === 'image' && n && n.imageSrcSet ? void 0 : e, as: t },
          n
        )),
        Tt.set(s, e),
        r.querySelector(a) !== null ||
          (t === 'style' && r.querySelector(Ca(s))) ||
          (t === 'script' && r.querySelector(Ta(s))) ||
          ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t)));
    }
  }
  function lg(e, t) {
    ln.m(e, t);
    var n = Lr;
    if (n && e) {
      var r = t && typeof t.as == 'string' ? t.as : 'script',
        a = 'link[rel="modulepreload"][as="' + At(r) + '"][href="' + At(e) + '"]',
        s = a;
      switch (r) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          s = Mr(e);
      }
      if (
        !Tt.has(s) &&
        ((e = L({ rel: 'modulepreload', href: e }, t)), Tt.set(s, e), n.querySelector(a) === null)
      ) {
        switch (r) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (n.querySelector(Ta(s))) return;
        }
        ((r = n.createElement('link')), Ke(r, 'link', e), Fe(r), n.head.appendChild(r));
      }
    }
  }
  function ug(e, t, n) {
    ln.S(e, t, n);
    var r = Lr;
    if (r && e) {
      var a = rr(r).hoistableStyles,
        s = zr(e);
      t = t || 'default';
      var u = a.get(s);
      if (!u) {
        var d = { loading: 0, preload: null };
        if ((u = r.querySelector(Ca(s)))) d.loading = 5;
        else {
          ((e = L({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
            (n = Tt.get(s)) && Nl(e, n));
          var m = (u = r.createElement('link'));
          (Fe(m),
            Ke(m, 'link', e),
            (m._p = new Promise(function (w, E) {
              ((m.onload = w), (m.onerror = E));
            })),
            m.addEventListener('load', function () {
              d.loading |= 1;
            }),
            m.addEventListener('error', function () {
              d.loading |= 2;
            }),
            (d.loading |= 4),
            $s(u, t, r));
        }
        ((u = { type: 'stylesheet', instance: u, count: 1, state: d }), a.set(s, u));
      }
    }
  }
  function cg(e, t) {
    ln.X(e, t);
    var n = Lr;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Mr(e),
        s = r.get(a);
      s ||
        ((s = n.querySelector(Ta(a))),
        s ||
          ((e = L({ src: e, async: !0 }, t)),
          (t = Tt.get(a)) && _l(e, t),
          (s = n.createElement('script')),
          Fe(s),
          Ke(s, 'link', e),
          n.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        r.set(a, s));
    }
  }
  function dg(e, t) {
    ln.M(e, t);
    var n = Lr;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Mr(e),
        s = r.get(a);
      s ||
        ((s = n.querySelector(Ta(a))),
        s ||
          ((e = L({ src: e, async: !0, type: 'module' }, t)),
          (t = Tt.get(a)) && _l(e, t),
          (s = n.createElement('script')),
          Fe(s),
          Ke(s, 'link', e),
          n.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        r.set(a, s));
    }
  }
  function Uf(e, t, n, r) {
    var a = (a = $.current) ? Hs(a) : null;
    if (!a) throw Error(l(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof n.precedence == 'string' && typeof n.href == 'string'
          ? ((t = zr(n.href)),
            (n = rr(a).hoistableStyles),
            (r = n.get(t)),
            r || ((r = { type: 'style', instance: null, count: 0, state: null }), n.set(t, r)),
            r)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          n.rel === 'stylesheet' &&
          typeof n.href == 'string' &&
          typeof n.precedence == 'string'
        ) {
          e = zr(n.href);
          var s = rr(a).hoistableStyles,
            u = s.get(e);
          if (
            (u ||
              ((a = a.ownerDocument || a),
              (u = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              s.set(e, u),
              (s = a.querySelector(Ca(e))) && !s._p && ((u.instance = s), (u.state.loading = 5)),
              Tt.has(e) ||
                ((n = {
                  rel: 'preload',
                  as: 'style',
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                Tt.set(e, n),
                s || fg(a, e, n, u.state))),
            t && r === null)
          )
            throw Error(l(528, ''));
          return u;
        }
        if (t && r !== null) throw Error(l(529, ''));
        return null;
      case 'script':
        return (
          (t = n.async),
          (n = n.src),
          typeof n == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Mr(n)),
              (n = rr(a).hoistableScripts),
              (r = n.get(t)),
              r || ((r = { type: 'script', instance: null, count: 0, state: null }), n.set(t, r)),
              r)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(l(444, e));
    }
  }
  function zr(e) {
    return 'href="' + At(e) + '"';
  }
  function Ca(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Df(e) {
    return L({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function fg(e, t, n, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + ']')
      ? (r.loading = 1)
      : ((t = e.createElement('link')),
        (r.preload = t),
        t.addEventListener('load', function () {
          return (r.loading |= 1);
        }),
        t.addEventListener('error', function () {
          return (r.loading |= 2);
        }),
        Ke(t, 'link', n),
        Fe(t),
        e.head.appendChild(t));
  }
  function Mr(e) {
    return '[src="' + At(e) + '"]';
  }
  function Ta(e) {
    return 'script[async]' + e;
  }
  function Ff(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var r = e.querySelector('style[data-href~="' + At(n.href) + '"]');
          if (r) return ((t.instance = r), Fe(r), r);
          var a = L({}, n, {
            'data-href': n.href,
            'data-precedence': n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement('style')),
            Fe(r),
            Ke(r, 'style', a),
            $s(r, n.precedence, e),
            (t.instance = r)
          );
        case 'stylesheet':
          a = zr(n.href);
          var s = e.querySelector(Ca(a));
          if (s) return ((t.state.loading |= 4), (t.instance = s), Fe(s), s);
          ((r = Df(n)),
            (a = Tt.get(a)) && Nl(r, a),
            (s = (e.ownerDocument || e).createElement('link')),
            Fe(s));
          var u = s;
          return (
            (u._p = new Promise(function (d, m) {
              ((u.onload = d), (u.onerror = m));
            })),
            Ke(s, 'link', r),
            (t.state.loading |= 4),
            $s(s, n.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = Mr(n.src)),
            (a = e.querySelector(Ta(s)))
              ? ((t.instance = a), Fe(a), a)
              : ((r = n),
                (a = Tt.get(s)) && ((r = L({}, n)), _l(r, a)),
                (e = e.ownerDocument || e),
                (a = e.createElement('script')),
                Fe(a),
                Ke(a, 'link', r),
                e.head.appendChild(a),
                (t.instance = a))
          );
        case 'void':
          return null;
        default:
          throw Error(l(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((r = t.instance), (t.state.loading |= 4), $s(r, n.precedence, e));
    return t.instance;
  }
  function $s(e, t, n) {
    for (
      var r = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        a = r.length ? r[r.length - 1] : null,
        s = a,
        u = 0;
      u < r.length;
      u++
    ) {
      var d = r[u];
      if (d.dataset.precedence === t) s = d;
      else if (s !== a) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Nl(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function _l(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Ws = null;
  function Bf(e, t, n) {
    if (Ws === null) {
      var r = new Map(),
        a = (Ws = new Map());
      a.set(n, r);
    } else ((a = Ws), (r = a.get(n)), r || ((r = new Map()), a.set(n, r)));
    if (r.has(e)) return r;
    for (r.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var s = n[a];
      if (
        !(s[Hr] || s[He] || (e === 'link' && s.getAttribute('rel') === 'stylesheet')) &&
        s.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var u = s.getAttribute(t) || '';
        u = e + u;
        var d = r.get(u);
        d ? d.push(s) : r.set(u, [s]);
      }
    }
    return r;
  }
  function qf(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(n, t === 'title' ? e.querySelector('head > title') : null));
  }
  function hg(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof t.precedence != 'string' || typeof t.href != 'string' || t.href === '') break;
        return !0;
      case 'link':
        if (
          typeof t.rel != 'string' ||
          typeof t.href != 'string' ||
          t.href === '' ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case 'stylesheet':
            return ((e = t.disabled), typeof t.precedence == 'string' && e == null);
          default:
            return !0;
        }
      case 'script':
        if (
          t.async &&
          typeof t.async != 'function' &&
          typeof t.async != 'symbol' &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function Vf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function pg(e, t, n, r) {
    if (
      n.type === 'stylesheet' &&
      (typeof r.media != 'string' || matchMedia(r.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var a = zr(r.href),
          s = t.querySelector(Ca(a));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Qs.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = s),
            Fe(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (r = Df(r)),
          (a = Tt.get(a)) && Nl(r, a),
          (s = s.createElement('link')),
          Fe(s));
        var u = s;
        ((u._p = new Promise(function (d, m) {
          ((u.onload = d), (u.onerror = m));
        })),
          Ke(s, 'link', r),
          (n.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = Qs.bind(e)),
          t.addEventListener('load', n),
          t.addEventListener('error', n)));
    }
  }
  var El = 0;
  function mg(e, t) {
    return (
      e.stylesheets && e.count === 0 && Gs(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var r = setTimeout(function () {
              if ((e.stylesheets && Gs(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && El === 0 && (El = 62500 * Gm());
            var a = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Gs(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > El ? 50 : 800) + t
            );
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(r), clearTimeout(a));
              }
            );
          }
        : null
    );
  }
  function Qs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ks = null;
  function Gs(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Ks = new Map()), t.forEach(gg, e), (Ks = null), Qs.call(e)));
  }
  function gg(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Ks.get(e);
      if (n) var r = n.get(null);
      else {
        ((n = new Map()), Ks.set(e, n));
        for (
          var a = e.querySelectorAll('link[data-precedence],style[data-precedence]'), s = 0;
          s < a.length;
          s++
        ) {
          var u = a[s];
          (u.nodeName === 'LINK' || u.getAttribute('media') !== 'not all') &&
            (n.set(u.dataset.precedence, u), (r = u));
        }
        r && n.set(null, r);
      }
      ((a = t.instance),
        (u = a.getAttribute('data-precedence')),
        (s = n.get(u) || r),
        s === r && n.set(null, a),
        n.set(u, a),
        this.count++,
        (r = Qs.bind(this)),
        a.addEventListener('load', r),
        a.addEventListener('error', r),
        s
          ? s.parentNode.insertBefore(a, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(a, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var ja = {
    $$typeof: je,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0,
  };
  function yg(e, t, n, r, a, s, u, d, m) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = wo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = wo(0)),
      (this.hiddenUpdates = wo(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = a),
      (this.onCaughtError = s),
      (this.onRecoverableError = u),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = m),
      (this.incompleteTransitions = new Map()));
  }
  function Hf(e, t, n, r, a, s, u, d, m, w, E, j) {
    return (
      (e = new yg(e, t, n, u, m, w, E, j, d)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = ht(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = si()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: r, isDehydrated: n, cache: t }),
      ui(s),
      e
    );
  }
  function $f(e) {
    return e ? ((e = hr), e) : hr;
  }
  function Wf(e, t, n, r, a, s) {
    ((a = $f(a)),
      r.context === null ? (r.context = a) : (r.pendingContext = a),
      (r = yn(t)),
      (r.payload = { element: n }),
      (s = s === void 0 ? null : s),
      s !== null && (r.callback = s),
      (n = vn(e, r, t)),
      n !== null && (it(n, e, t), ia(n, e, t)));
  }
  function Qf(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Cl(e, t) {
    (Qf(e, t), (e = e.alternate) && Qf(e, t));
  }
  function Kf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bn(e, 67108864);
      (t !== null && it(t, e, 67108864), Cl(e, 67108864));
    }
  }
  function Gf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = vt();
      t = ko(t);
      var n = Bn(e, t);
      (n !== null && it(n, e, t), Cl(e, t));
    }
  }
  var Xs = !0;
  function vg(e, t, n, r) {
    var a = C.T;
    C.T = null;
    var s = z.p;
    try {
      ((z.p = 2), Tl(e, t, n, r));
    } finally {
      ((z.p = s), (C.T = a));
    }
  }
  function bg(e, t, n, r) {
    var a = C.T;
    C.T = null;
    var s = z.p;
    try {
      ((z.p = 8), Tl(e, t, n, r));
    } finally {
      ((z.p = s), (C.T = a));
    }
  }
  function Tl(e, t, n, r) {
    if (Xs) {
      var a = jl(r);
      if (a === null) (pl(e, t, r, Js, n), Jf(e, r));
      else if (wg(a, e, t, n, r)) r.stopPropagation();
      else if ((Jf(e, r), t & 4 && -1 < xg.indexOf(e))) {
        for (; a !== null; ) {
          var s = nr(a);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var u = Mn(s.pendingLanes);
                  if (u !== 0) {
                    var d = s;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; u; ) {
                      var m = 1 << (31 - dt(u));
                      ((d.entanglements[1] |= m), (u &= ~m));
                    }
                    (Ft(s), (ue & 6) === 0 && ((Os = ut() + 500), Sa(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((d = Bn(s, 2)), d !== null && it(d, s, 2), zs(), Cl(s, 2));
            }
          if (((s = jl(r)), s === null && pl(e, t, r, Js, n), s === a)) break;
          a = s;
        }
        a !== null && r.stopPropagation();
      } else pl(e, t, r, null, n);
    }
  }
  function jl(e) {
    return ((e = Ao(e)), Pl(e));
  }
  var Js = null;
  function Pl(e) {
    if (((Js = null), (e = tr(e)), e !== null)) {
      var t = b(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = R(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = M(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Js = e), null);
  }
  function Xf(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8;
      case 'message':
        switch (sp()) {
          case ru:
            return 2;
          case au:
            return 8;
          case Fa:
          case op:
            return 32;
          case su:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Al = !1,
    jn = null,
    Pn = null,
    An = null,
    Pa = new Map(),
    Aa = new Map(),
    Rn = [],
    xg =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Jf(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        jn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Pn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        An = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Pa.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Aa.delete(t.pointerId);
    }
  }
  function Ra(e, t, n, r, a, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: s,
          targetContainers: [a],
        }),
        t !== null && ((t = nr(t)), t !== null && Kf(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e);
  }
  function wg(e, t, n, r, a) {
    switch (t) {
      case 'focusin':
        return ((jn = Ra(jn, e, t, n, r, a)), !0);
      case 'dragenter':
        return ((Pn = Ra(Pn, e, t, n, r, a)), !0);
      case 'mouseover':
        return ((An = Ra(An, e, t, n, r, a)), !0);
      case 'pointerover':
        var s = a.pointerId;
        return (Pa.set(s, Ra(Pa.get(s) || null, e, t, n, r, a)), !0);
      case 'gotpointercapture':
        return ((s = a.pointerId), Aa.set(s, Ra(Aa.get(s) || null, e, t, n, r, a)), !0);
    }
    return !1;
  }
  function Zf(e) {
    var t = tr(e.target);
    if (t !== null) {
      var n = b(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = R(n)), t !== null)) {
            ((e.blockedOn = t),
              du(e.priority, function () {
                Gf(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = M(n)), t !== null)) {
            ((e.blockedOn = t),
              du(e.priority, function () {
                Gf(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Zs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = jl(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Po = r), n.target.dispatchEvent(r), (Po = null));
      } else return ((t = nr(n)), t !== null && Kf(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Yf(e, t, n) {
    Zs(e) && n.delete(t);
  }
  function kg() {
    ((Al = !1),
      jn !== null && Zs(jn) && (jn = null),
      Pn !== null && Zs(Pn) && (Pn = null),
      An !== null && Zs(An) && (An = null),
      Pa.forEach(Yf),
      Aa.forEach(Yf));
  }
  function Ys(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Al || ((Al = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, kg)));
  }
  var eo = null;
  function eh(e) {
    eo !== e &&
      ((eo = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        eo === e && (eo = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            r = e[t + 1],
            a = e[t + 2];
          if (typeof r != 'function') {
            if (Pl(r || n) === null) continue;
            break;
          }
          var s = nr(n);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            ji(s, { pending: !0, data: a, method: n.method, action: r }, r, a));
        }
      }));
  }
  function Ir(e) {
    function t(m) {
      return Ys(m, e);
    }
    (jn !== null && Ys(jn, e),
      Pn !== null && Ys(Pn, e),
      An !== null && Ys(An, e),
      Pa.forEach(t),
      Aa.forEach(t));
    for (var n = 0; n < Rn.length; n++) {
      var r = Rn[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Rn.length && ((n = Rn[0]), n.blockedOn === null); )
      (Zf(n), n.blockedOn === null && Rn.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (r = 0; r < n.length; r += 3) {
        var a = n[r],
          s = n[r + 1],
          u = a[tt] || null;
        if (typeof s == 'function') u || eh(n);
        else if (u) {
          var d = null;
          if (s && s.hasAttribute('formAction')) {
            if (((a = s), (u = s[tt] || null))) d = u.formAction;
            else if (Pl(a) !== null) continue;
          } else d = u.action;
          (typeof d == 'function' ? (n[r + 1] = d) : (n.splice(r, 3), (r -= 3)), eh(n));
        }
      }
  }
  function th() {
    function e(s) {
      s.canIntercept &&
        s.info === 'react-transition' &&
        s.intercept({
          handler: function () {
            return new Promise(function (u) {
              return (a = u);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (a !== null && (a(), (a = null)), r || setTimeout(n, 20));
    }
    function n() {
      if (!r && !navigation.transition) {
        var s = navigation.currentEntry;
        s &&
          s.url != null &&
          navigation.navigate(s.url, {
            state: s.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var r = !1,
        a = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(n, 100),
        function () {
          ((r = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            a !== null && (a(), (a = null)));
        }
      );
    }
  }
  function Rl(e) {
    this._internalRoot = e;
  }
  ((to.prototype.render = Rl.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      var n = t.current,
        r = vt();
      Wf(n, r, e, t, null, null);
    }),
    (to.prototype.unmount = Rl.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Wf(e.current, 2, null, e, null, null), zs(), (t[er] = null));
        }
      }));
  function to(e) {
    this._internalRoot = e;
  }
  to.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = cu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Rn.length && t !== 0 && t < Rn[n].priority; n++);
      (Rn.splice(n, 0, e), n === 0 && Zf(e));
    }
  };
  var nh = o.version;
  if (nh !== '19.2.0') throw Error(l(527, nh, '19.2.0'));
  z.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(l(188))
        : ((e = Object.keys(e).join(',')), Error(l(268, e)));
    return ((e = S(t)), (e = e !== null ? A(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Sg = {
    bundleType: 0,
    version: '19.2.0',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: C,
    reconcilerVersion: '19.2.0',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var no = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!no.isDisabled && no.supportsFiber)
      try {
        ((Br = no.inject(Sg)), (ct = no));
      } catch {}
  }
  return (
    (La.createRoot = function (e, t) {
      if (!p(e)) throw Error(l(299));
      var n = !1,
        r = '',
        a = ld,
        s = ud,
        u = cd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (a = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = Hf(e, 1, !1, null, null, n, r, null, a, s, u, th)),
        (e[er] = t.current),
        hl(e),
        new Rl(t)
      );
    }),
    (La.hydrateRoot = function (e, t, n) {
      if (!p(e)) throw Error(l(299));
      var r = !1,
        a = '',
        s = ld,
        u = ud,
        d = cd,
        m = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
          n.onCaughtError !== void 0 && (u = n.onCaughtError),
          n.onRecoverableError !== void 0 && (d = n.onRecoverableError),
          n.formState !== void 0 && (m = n.formState)),
        (t = Hf(e, 1, !0, t, n ?? null, r, a, m, s, u, d, th)),
        (t.context = $f(null)),
        (n = t.current),
        (r = vt()),
        (r = ko(r)),
        (a = yn(r)),
        (a.callback = null),
        vn(n, a, r),
        (n = r),
        (t.current.lanes = n),
        Vr(t, n),
        Ft(t),
        (e[er] = t.current),
        hl(e),
        new to(t)
      );
    }),
    (La.version = '19.2.0'),
    La
  );
}
var gh;
function Lg() {
  if (gh) return Ol.exports;
  gh = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return (c(), (Ol.exports = Og()), Ol.exports);
}
var zg = Lg();
const Mg = Rh(zg),
  qt = Object.create(null);
qt.open = '0';
qt.close = '1';
qt.ping = '2';
qt.pong = '3';
qt.message = '4';
qt.upgrade = '5';
qt.noop = '6';
const oo = Object.create(null);
Object.keys(qt).forEach(c => {
  oo[qt[c]] = c;
});
const Ul = { type: 'error', data: 'parser error' },
  Oh =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Object.prototype.toString.call(Blob) === '[object BlobConstructor]'),
  Lh = typeof ArrayBuffer == 'function',
  zh = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c && c.buffer instanceof ArrayBuffer,
  Gl = ({ type: c, data: o }, i, l) =>
    Oh && o instanceof Blob
      ? i
        ? l(o)
        : yh(o, l)
      : Lh && (o instanceof ArrayBuffer || zh(o))
        ? i
          ? l(o)
          : yh(new Blob([o]), l)
        : l(qt[c] + (o || '')),
  yh = (c, o) => {
    const i = new FileReader();
    return (
      (i.onload = function () {
        const l = i.result.split(',')[1];
        o('b' + (l || ''));
      }),
      i.readAsDataURL(c)
    );
  };
function vh(c) {
  return c instanceof Uint8Array
    ? c
    : c instanceof ArrayBuffer
      ? new Uint8Array(c)
      : new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
}
let zl;
function Ig(c, o) {
  if (Oh && c.data instanceof Blob) return c.data.arrayBuffer().then(vh).then(o);
  if (Lh && (c.data instanceof ArrayBuffer || zh(c.data))) return o(vh(c.data));
  Gl(c, !1, i => {
    (zl || (zl = new TextEncoder()), o(zl.encode(i)));
  });
}
const bh = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  Ia = typeof Uint8Array > 'u' ? [] : new Uint8Array(256);
for (let c = 0; c < bh.length; c++) Ia[bh.charCodeAt(c)] = c;
const Ug = c => {
    let o = c.length * 0.75,
      i = c.length,
      l,
      p = 0,
      b,
      R,
      M,
      _;
    c[c.length - 1] === '=' && (o--, c[c.length - 2] === '=' && o--);
    const S = new ArrayBuffer(o),
      A = new Uint8Array(S);
    for (l = 0; l < i; l += 4)
      ((b = Ia[c.charCodeAt(l)]),
        (R = Ia[c.charCodeAt(l + 1)]),
        (M = Ia[c.charCodeAt(l + 2)]),
        (_ = Ia[c.charCodeAt(l + 3)]),
        (A[p++] = (b << 2) | (R >> 4)),
        (A[p++] = ((R & 15) << 4) | (M >> 2)),
        (A[p++] = ((M & 3) << 6) | (_ & 63)));
    return S;
  },
  Dg = typeof ArrayBuffer == 'function',
  Xl = (c, o) => {
    if (typeof c != 'string') return { type: 'message', data: Mh(c, o) };
    const i = c.charAt(0);
    return i === 'b'
      ? { type: 'message', data: Fg(c.substring(1), o) }
      : oo[i]
        ? c.length > 1
          ? { type: oo[i], data: c.substring(1) }
          : { type: oo[i] }
        : Ul;
  },
  Fg = (c, o) => {
    if (Dg) {
      const i = Ug(c);
      return Mh(i, o);
    } else return { base64: !0, data: c };
  },
  Mh = (c, o) => {
    switch (o) {
      case 'blob':
        return c instanceof Blob ? c : new Blob([c]);
      case 'arraybuffer':
      default:
        return c instanceof ArrayBuffer ? c : c.buffer;
    }
  },
  Ih = '',
  Bg = (c, o) => {
    const i = c.length,
      l = new Array(i);
    let p = 0;
    c.forEach((b, R) => {
      Gl(b, !1, M => {
        ((l[R] = M), ++p === i && o(l.join(Ih)));
      });
    });
  },
  qg = (c, o) => {
    const i = c.split(Ih),
      l = [];
    for (let p = 0; p < i.length; p++) {
      const b = Xl(i[p], o);
      if ((l.push(b), b.type === 'error')) break;
    }
    return l;
  };
function Vg() {
  return new TransformStream({
    transform(c, o) {
      Ig(c, i => {
        const l = i.length;
        let p;
        if (l < 126) ((p = new Uint8Array(1)), new DataView(p.buffer).setUint8(0, l));
        else if (l < 65536) {
          p = new Uint8Array(3);
          const b = new DataView(p.buffer);
          (b.setUint8(0, 126), b.setUint16(1, l));
        } else {
          p = new Uint8Array(9);
          const b = new DataView(p.buffer);
          (b.setUint8(0, 127), b.setBigUint64(1, BigInt(l)));
        }
        (c.data && typeof c.data != 'string' && (p[0] |= 128), o.enqueue(p), o.enqueue(i));
      });
    },
  });
}
let Ml;
function ro(c) {
  return c.reduce((o, i) => o + i.length, 0);
}
function ao(c, o) {
  if (c[0].length === o) return c.shift();
  const i = new Uint8Array(o);
  let l = 0;
  for (let p = 0; p < o; p++) ((i[p] = c[0][l++]), l === c[0].length && (c.shift(), (l = 0)));
  return (c.length && l < c[0].length && (c[0] = c[0].slice(l)), i);
}
function Hg(c, o) {
  Ml || (Ml = new TextDecoder());
  const i = [];
  let l = 0,
    p = -1,
    b = !1;
  return new TransformStream({
    transform(R, M) {
      for (i.push(R); ; ) {
        if (l === 0) {
          if (ro(i) < 1) break;
          const _ = ao(i, 1);
          ((b = (_[0] & 128) === 128),
            (p = _[0] & 127),
            p < 126 ? (l = 3) : p === 126 ? (l = 1) : (l = 2));
        } else if (l === 1) {
          if (ro(i) < 2) break;
          const _ = ao(i, 2);
          ((p = new DataView(_.buffer, _.byteOffset, _.length).getUint16(0)), (l = 3));
        } else if (l === 2) {
          if (ro(i) < 8) break;
          const _ = ao(i, 8),
            S = new DataView(_.buffer, _.byteOffset, _.length),
            A = S.getUint32(0);
          if (A > Math.pow(2, 21) - 1) {
            M.enqueue(Ul);
            break;
          }
          ((p = A * Math.pow(2, 32) + S.getUint32(4)), (l = 3));
        } else {
          if (ro(i) < p) break;
          const _ = ao(i, p);
          (M.enqueue(Xl(b ? _ : Ml.decode(_), o)), (l = 0));
        }
        if (p === 0 || p > c) {
          M.enqueue(Ul);
          break;
        }
      }
    },
  });
}
const Uh = 4;
function ze(c) {
  if (c) return $g(c);
}
function $g(c) {
  for (var o in ze.prototype) c[o] = ze.prototype[o];
  return c;
}
ze.prototype.on = ze.prototype.addEventListener = function (c, o) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks['$' + c] = this._callbacks['$' + c] || []).push(o),
    this
  );
};
ze.prototype.once = function (c, o) {
  function i() {
    (this.off(c, i), o.apply(this, arguments));
  }
  return ((i.fn = o), this.on(c, i), this);
};
ze.prototype.off =
  ze.prototype.removeListener =
  ze.prototype.removeAllListeners =
  ze.prototype.removeEventListener =
    function (c, o) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var i = this._callbacks['$' + c];
      if (!i) return this;
      if (arguments.length == 1) return (delete this._callbacks['$' + c], this);
      for (var l, p = 0; p < i.length; p++)
        if (((l = i[p]), l === o || l.fn === o)) {
          i.splice(p, 1);
          break;
        }
      return (i.length === 0 && delete this._callbacks['$' + c], this);
    };
ze.prototype.emit = function (c) {
  this._callbacks = this._callbacks || {};
  for (
    var o = new Array(arguments.length - 1), i = this._callbacks['$' + c], l = 1;
    l < arguments.length;
    l++
  )
    o[l - 1] = arguments[l];
  if (i) {
    i = i.slice(0);
    for (var l = 0, p = i.length; l < p; ++l) i[l].apply(this, o);
  }
  return this;
};
ze.prototype.emitReserved = ze.prototype.emit;
ze.prototype.listeners = function (c) {
  return ((this._callbacks = this._callbacks || {}), this._callbacks['$' + c] || []);
};
ze.prototype.hasListeners = function (c) {
  return !!this.listeners(c).length;
};
const fo =
    typeof Promise == 'function' && typeof Promise.resolve == 'function'
      ? c => Promise.resolve().then(c)
      : (c, o) => o(c, 0),
  jt = typeof self < 'u' ? self : typeof window < 'u' ? window : Function('return this')(),
  Wg = 'arraybuffer';
function Dh(c, ...o) {
  return o.reduce((i, l) => (c.hasOwnProperty(l) && (i[l] = c[l]), i), {});
}
const Qg = jt.setTimeout,
  Kg = jt.clearTimeout;
function ho(c, o) {
  o.useNativeTimers
    ? ((c.setTimeoutFn = Qg.bind(jt)), (c.clearTimeoutFn = Kg.bind(jt)))
    : ((c.setTimeoutFn = jt.setTimeout.bind(jt)), (c.clearTimeoutFn = jt.clearTimeout.bind(jt)));
}
const Gg = 1.33;
function Xg(c) {
  return typeof c == 'string' ? Jg(c) : Math.ceil((c.byteLength || c.size) * Gg);
}
function Jg(c) {
  let o = 0,
    i = 0;
  for (let l = 0, p = c.length; l < p; l++)
    ((o = c.charCodeAt(l)),
      o < 128
        ? (i += 1)
        : o < 2048
          ? (i += 2)
          : o < 55296 || o >= 57344
            ? (i += 3)
            : (l++, (i += 4)));
  return i;
}
function Fh() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Zg(c) {
  let o = '';
  for (let i in c)
    c.hasOwnProperty(i) &&
      (o.length && (o += '&'), (o += encodeURIComponent(i) + '=' + encodeURIComponent(c[i])));
  return o;
}
function Yg(c) {
  let o = {},
    i = c.split('&');
  for (let l = 0, p = i.length; l < p; l++) {
    let b = i[l].split('=');
    o[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
  }
  return o;
}
class ey extends Error {
  constructor(o, i, l) {
    (super(o), (this.description = i), (this.context = l), (this.type = 'TransportError'));
  }
}
class Jl extends ze {
  constructor(o) {
    (super(),
      (this.writable = !1),
      ho(this, o),
      (this.opts = o),
      (this.query = o.query),
      (this.socket = o.socket),
      (this.supportsBinary = !o.forceBase64));
  }
  onError(o, i, l) {
    return (super.emitReserved('error', new ey(o, i, l)), this);
  }
  open() {
    return ((this.readyState = 'opening'), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(o) {
    this.readyState === 'open' && this.write(o);
  }
  onOpen() {
    ((this.readyState = 'open'), (this.writable = !0), super.emitReserved('open'));
  }
  onData(o) {
    const i = Xl(o, this.socket.binaryType);
    this.onPacket(i);
  }
  onPacket(o) {
    super.emitReserved('packet', o);
  }
  onClose(o) {
    ((this.readyState = 'closed'), super.emitReserved('close', o));
  }
  pause(o) {}
  createUri(o, i = {}) {
    return o + '://' + this._hostname() + this._port() + this.opts.path + this._query(i);
  }
  _hostname() {
    const o = this.opts.hostname;
    return o.indexOf(':') === -1 ? o : '[' + o + ']';
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && +(this.opts.port !== 443)) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ':' + this.opts.port
      : '';
  }
  _query(o) {
    const i = Zg(o);
    return i.length ? '?' + i : '';
  }
}
class ty extends Jl {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return 'polling';
  }
  doOpen() {
    this._poll();
  }
  pause(o) {
    this.readyState = 'pausing';
    const i = () => {
      ((this.readyState = 'paused'), o());
    };
    if (this._polling || !this.writable) {
      let l = 0;
      (this._polling &&
        (l++,
        this.once('pollComplete', function () {
          --l || i();
        })),
        this.writable ||
          (l++,
          this.once('drain', function () {
            --l || i();
          })));
    } else i();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved('poll'));
  }
  onData(o) {
    const i = l => {
      if ((this.readyState === 'opening' && l.type === 'open' && this.onOpen(), l.type === 'close'))
        return (this.onClose({ description: 'transport closed by the server' }), !1);
      this.onPacket(l);
    };
    (qg(o, this.socket.binaryType).forEach(i),
      this.readyState !== 'closed' &&
        ((this._polling = !1),
        this.emitReserved('pollComplete'),
        this.readyState === 'open' && this._poll()));
  }
  doClose() {
    const o = () => {
      this.write([{ type: 'close' }]);
    };
    this.readyState === 'open' ? o() : this.once('open', o);
  }
  write(o) {
    ((this.writable = !1),
      Bg(o, i => {
        this.doWrite(i, () => {
          ((this.writable = !0), this.emitReserved('drain'));
        });
      }));
  }
  uri() {
    const o = this.opts.secure ? 'https' : 'http',
      i = this.query || {};
    return (
      this.opts.timestampRequests !== !1 && (i[this.opts.timestampParam] = Fh()),
      !this.supportsBinary && !i.sid && (i.b64 = 1),
      this.createUri(o, i)
    );
  }
}
let Bh = !1;
try {
  Bh = typeof XMLHttpRequest < 'u' && 'withCredentials' in new XMLHttpRequest();
} catch {}
const ny = Bh;
function ry() {}
class ay extends ty {
  constructor(o) {
    if ((super(o), typeof location < 'u')) {
      const i = location.protocol === 'https:';
      let l = location.port;
      (l || (l = i ? '443' : '80'),
        (this.xd = (typeof location < 'u' && o.hostname !== location.hostname) || l !== o.port));
    }
  }
  doWrite(o, i) {
    const l = this.request({ method: 'POST', data: o });
    (l.on('success', i),
      l.on('error', (p, b) => {
        this.onError('xhr post error', p, b);
      }));
  }
  doPoll() {
    const o = this.request();
    (o.on('data', this.onData.bind(this)),
      o.on('error', (i, l) => {
        this.onError('xhr poll error', i, l);
      }),
      (this.pollXhr = o));
  }
}
class Bt extends ze {
  constructor(o, i, l) {
    (super(),
      (this.createRequest = o),
      ho(this, l),
      (this._opts = l),
      (this._method = l.method || 'GET'),
      (this._uri = i),
      (this._data = l.data !== void 0 ? l.data : null),
      this._create());
  }
  _create() {
    var o;
    const i = Dh(
      this._opts,
      'agent',
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'rejectUnauthorized',
      'autoUnref'
    );
    i.xdomain = !!this._opts.xd;
    const l = (this._xhr = this.createRequest(i));
    try {
      l.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          l.setDisableHeaderCheck && l.setDisableHeaderCheck(!0);
          for (let p in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(p) &&
              l.setRequestHeader(p, this._opts.extraHeaders[p]);
        }
      } catch {}
      if (this._method === 'POST')
        try {
          l.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } catch {}
      try {
        l.setRequestHeader('Accept', '*/*');
      } catch {}
      ((o = this._opts.cookieJar) === null || o === void 0 || o.addCookies(l),
        'withCredentials' in l && (l.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (l.timeout = this._opts.requestTimeout),
        (l.onreadystatechange = () => {
          var p;
          (l.readyState === 3 &&
            ((p = this._opts.cookieJar) === null ||
              p === void 0 ||
              p.parseCookies(l.getResponseHeader('set-cookie'))),
            l.readyState === 4 &&
              (l.status === 200 || l.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof l.status == 'number' ? l.status : 0);
                  }, 0)));
        }),
        l.send(this._data));
    } catch (p) {
      this.setTimeoutFn(() => {
        this._onError(p);
      }, 0);
      return;
    }
    typeof document < 'u' &&
      ((this._index = Bt.requestsCount++), (Bt.requests[this._index] = this));
  }
  _onError(o) {
    (this.emitReserved('error', o, this._xhr), this._cleanup(!0));
  }
  _cleanup(o) {
    if (!(typeof this._xhr > 'u' || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = ry), o))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < 'u' && delete Bt.requests[this._index], (this._xhr = null));
    }
  }
  _onLoad() {
    const o = this._xhr.responseText;
    o !== null && (this.emitReserved('data', o), this.emitReserved('success'), this._cleanup());
  }
  abort() {
    this._cleanup();
  }
}
Bt.requestsCount = 0;
Bt.requests = {};
if (typeof document < 'u') {
  if (typeof attachEvent == 'function') attachEvent('onunload', xh);
  else if (typeof addEventListener == 'function') {
    const c = 'onpagehide' in jt ? 'pagehide' : 'unload';
    addEventListener(c, xh, !1);
  }
}
function xh() {
  for (let c in Bt.requests) Bt.requests.hasOwnProperty(c) && Bt.requests[c].abort();
}
const sy = (function () {
  const c = qh({ xdomain: !1 });
  return c && c.responseType !== null;
})();
class oy extends ay {
  constructor(o) {
    super(o);
    const i = o && o.forceBase64;
    this.supportsBinary = sy && !i;
  }
  request(o = {}) {
    return (Object.assign(o, { xd: this.xd }, this.opts), new Bt(qh, this.uri(), o));
  }
}
function qh(c) {
  const o = c.xdomain;
  try {
    if (typeof XMLHttpRequest < 'u' && (!o || ny)) return new XMLHttpRequest();
  } catch {}
  if (!o)
    try {
      return new jt[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch {}
}
const Vh =
  typeof navigator < 'u' &&
  typeof navigator.product == 'string' &&
  navigator.product.toLowerCase() === 'reactnative';
class iy extends Jl {
  get name() {
    return 'websocket';
  }
  doOpen() {
    const o = this.uri(),
      i = this.opts.protocols,
      l = Vh
        ? {}
        : Dh(
            this.opts,
            'agent',
            'perMessageDeflate',
            'pfx',
            'key',
            'passphrase',
            'cert',
            'ca',
            'ciphers',
            'rejectUnauthorized',
            'localAddress',
            'protocolVersion',
            'origin',
            'maxPayload',
            'family',
            'checkServerIdentity'
          );
    this.opts.extraHeaders && (l.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(o, i, l);
    } catch (p) {
      return this.emitReserved('error', p);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = o =>
        this.onClose({ description: 'websocket connection closed', context: o })),
      (this.ws.onmessage = o => this.onData(o.data)),
      (this.ws.onerror = o => this.onError('websocket error', o)));
  }
  write(o) {
    this.writable = !1;
    for (let i = 0; i < o.length; i++) {
      const l = o[i],
        p = i === o.length - 1;
      Gl(l, this.supportsBinary, b => {
        try {
          this.doWrite(l, b);
        } catch {}
        p &&
          fo(() => {
            ((this.writable = !0), this.emitReserved('drain'));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < 'u' && ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const o = this.opts.secure ? 'wss' : 'ws',
      i = this.query || {};
    return (
      this.opts.timestampRequests && (i[this.opts.timestampParam] = Fh()),
      this.supportsBinary || (i.b64 = 1),
      this.createUri(o, i)
    );
  }
}
const Il = jt.WebSocket || jt.MozWebSocket;
class ly extends iy {
  createSocket(o, i, l) {
    return Vh ? new Il(o, i, l) : i ? new Il(o, i) : new Il(o);
  }
  doWrite(o, i) {
    this.ws.send(i);
  }
}
class uy extends Jl {
  get name() {
    return 'webtransport';
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri('https'),
        this.opts.transportOptions[this.name]
      );
    } catch (o) {
      return this.emitReserved('error', o);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch(o => {
        this.onError('webtransport error', o);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then(o => {
          const i = Hg(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            l = o.readable.pipeThrough(i).getReader(),
            p = Vg();
          (p.readable.pipeTo(o.writable), (this._writer = p.writable.getWriter()));
          const b = () => {
            l.read()
              .then(({ done: M, value: _ }) => {
                M || (this.onPacket(_), b());
              })
              .catch(M => {});
          };
          b();
          const R = { type: 'open' };
          (this.query.sid && (R.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(R).then(() => this.onOpen()));
        });
      }));
  }
  write(o) {
    this.writable = !1;
    for (let i = 0; i < o.length; i++) {
      const l = o[i],
        p = i === o.length - 1;
      this._writer.write(l).then(() => {
        p &&
          fo(() => {
            ((this.writable = !0), this.emitReserved('drain'));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var o;
    (o = this._transport) === null || o === void 0 || o.close();
  }
}
const cy = { websocket: ly, webtransport: uy, polling: oy },
  dy =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  fy = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor',
  ];
function Dl(c) {
  if (c.length > 8e3) throw 'URI too long';
  const o = c,
    i = c.indexOf('['),
    l = c.indexOf(']');
  i != -1 &&
    l != -1 &&
    (c = c.substring(0, i) + c.substring(i, l).replace(/:/g, ';') + c.substring(l, c.length));
  let p = dy.exec(c || ''),
    b = {},
    R = 14;
  for (; R--; ) b[fy[R]] = p[R] || '';
  return (
    i != -1 &&
      l != -1 &&
      ((b.source = o),
      (b.host = b.host.substring(1, b.host.length - 1).replace(/;/g, ':')),
      (b.authority = b.authority.replace('[', '').replace(']', '').replace(/;/g, ':')),
      (b.ipv6uri = !0)),
    (b.pathNames = hy(b, b.path)),
    (b.queryKey = py(b, b.query)),
    b
  );
}
function hy(c, o) {
  const i = /\/{2,9}/g,
    l = o.replace(i, '/').split('/');
  return (
    (o.slice(0, 1) == '/' || o.length === 0) && l.splice(0, 1),
    o.slice(-1) == '/' && l.splice(l.length - 1, 1),
    l
  );
}
function py(c, o) {
  const i = {};
  return (
    o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (l, p, b) {
      p && (i[p] = b);
    }),
    i
  );
}
const Fl = typeof addEventListener == 'function' && typeof removeEventListener == 'function',
  io = [];
Fl &&
  addEventListener(
    'offline',
    () => {
      io.forEach(c => c());
    },
    !1
  );
class Ln extends ze {
  constructor(o, i) {
    if (
      (super(),
      (this.binaryType = Wg),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      o && typeof o == 'object' && ((i = o), (o = null)),
      o)
    ) {
      const l = Dl(o);
      ((i.hostname = l.host),
        (i.secure = l.protocol === 'https' || l.protocol === 'wss'),
        (i.port = l.port),
        l.query && (i.query = l.query));
    } else i.host && (i.hostname = Dl(i.host).host);
    (ho(this, i),
      (this.secure =
        i.secure != null ? i.secure : typeof location < 'u' && location.protocol === 'https:'),
      i.hostname && !i.port && (i.port = this.secure ? '443' : '80'),
      (this.hostname = i.hostname || (typeof location < 'u' ? location.hostname : 'localhost')),
      (this.port =
        i.port ||
        (typeof location < 'u' && location.port ? location.port : this.secure ? '443' : '80')),
      (this.transports = []),
      (this._transportsByName = {}),
      i.transports.forEach(l => {
        const p = l.prototype.name;
        (this.transports.push(p), (this._transportsByName[p] = l));
      }),
      (this.opts = Object.assign(
        {
          path: '/engine.io',
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: 't',
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        i
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, '') + (this.opts.addTrailingSlash ? '/' : '')),
      typeof this.opts.query == 'string' && (this.opts.query = Yg(this.opts.query)),
      Fl &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener('beforeunload', this._beforeunloadEventListener, !1)),
        this.hostname !== 'localhost' &&
          ((this._offlineEventListener = () => {
            this._onClose('transport close', { description: 'network connection lost' });
          }),
          io.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(o) {
    const i = Object.assign({}, this.opts.query);
    ((i.EIO = Uh), (i.transport = o), this.id && (i.sid = this.id));
    const l = Object.assign(
      {},
      this.opts,
      { query: i, socket: this, hostname: this.hostname, secure: this.secure, port: this.port },
      this.opts.transportOptions[o]
    );
    return new this._transportsByName[o](l);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved('error', 'No transports available');
      }, 0);
      return;
    }
    const o =
      this.opts.rememberUpgrade &&
      Ln.priorWebsocketSuccess &&
      this.transports.indexOf('websocket') !== -1
        ? 'websocket'
        : this.transports[0];
    this.readyState = 'opening';
    const i = this.createTransport(o);
    (i.open(), this.setTransport(i));
  }
  setTransport(o) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = o),
      o
        .on('drain', this._onDrain.bind(this))
        .on('packet', this._onPacket.bind(this))
        .on('error', this._onError.bind(this))
        .on('close', i => this._onClose('transport close', i)));
  }
  onOpen() {
    ((this.readyState = 'open'),
      (Ln.priorWebsocketSuccess = this.transport.name === 'websocket'),
      this.emitReserved('open'),
      this.flush());
  }
  _onPacket(o) {
    if (
      this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing'
    )
      switch ((this.emitReserved('packet', o), this.emitReserved('heartbeat'), o.type)) {
        case 'open':
          this.onHandshake(JSON.parse(o.data));
          break;
        case 'ping':
          (this._sendPacket('pong'),
            this.emitReserved('ping'),
            this.emitReserved('pong'),
            this._resetPingTimeout());
          break;
        case 'error':
          const i = new Error('server error');
          ((i.code = o.data), this._onError(i));
          break;
        case 'message':
          (this.emitReserved('data', o.data), this.emitReserved('message', o.data));
          break;
      }
  }
  onHandshake(o) {
    (this.emitReserved('handshake', o),
      (this.id = o.sid),
      (this.transport.query.sid = o.sid),
      (this._pingInterval = o.pingInterval),
      (this._pingTimeout = o.pingTimeout),
      (this._maxPayload = o.maxPayload),
      this.onOpen(),
      this.readyState !== 'closed' && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const o = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + o),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose('ping timeout');
      }, o)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved('drain') : this.flush());
  }
  flush() {
    if (
      this.readyState !== 'closed' &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const o = this._getWritablePackets();
      (this.transport.send(o), (this._prevBufferLen = o.length), this.emitReserved('flush'));
    }
  }
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === 'polling' && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let o = 1;
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const l = this.writeBuffer[i].data;
      if ((l && (o += Xg(l)), i > 0 && o > this._maxPayload)) return this.writeBuffer.slice(0, i);
      o += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const o = Date.now() > this._pingTimeoutTime;
    return (
      o &&
        ((this._pingTimeoutTime = 0),
        fo(() => {
          this._onClose('ping timeout');
        }, this.setTimeoutFn)),
      o
    );
  }
  write(o, i, l) {
    return (this._sendPacket('message', o, i, l), this);
  }
  send(o, i, l) {
    return (this._sendPacket('message', o, i, l), this);
  }
  _sendPacket(o, i, l, p) {
    if (
      (typeof i == 'function' && ((p = i), (i = void 0)),
      typeof l == 'function' && ((p = l), (l = null)),
      this.readyState === 'closing' || this.readyState === 'closed')
    )
      return;
    ((l = l || {}), (l.compress = l.compress !== !1));
    const b = { type: o, data: i, options: l };
    (this.emitReserved('packetCreate', b),
      this.writeBuffer.push(b),
      p && this.once('flush', p),
      this.flush());
  }
  close() {
    const o = () => {
        (this._onClose('forced close'), this.transport.close());
      },
      i = () => {
        (this.off('upgrade', i), this.off('upgradeError', i), o());
      },
      l = () => {
        (this.once('upgrade', i), this.once('upgradeError', i));
      };
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        ((this.readyState = 'closing'),
        this.writeBuffer.length
          ? this.once('drain', () => {
              this.upgrading ? l() : o();
            })
          : this.upgrading
            ? l()
            : o()),
      this
    );
  }
  _onError(o) {
    if (
      ((Ln.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === 'opening')
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved('error', o), this._onClose('transport error', o));
  }
  _onClose(o, i) {
    if (
      this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing'
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners('close'),
        this.transport.close(),
        this.transport.removeAllListeners(),
        Fl &&
          (this._beforeunloadEventListener &&
            removeEventListener('beforeunload', this._beforeunloadEventListener, !1),
          this._offlineEventListener))
      ) {
        const l = io.indexOf(this._offlineEventListener);
        l !== -1 && io.splice(l, 1);
      }
      ((this.readyState = 'closed'),
        (this.id = null),
        this.emitReserved('close', o, i),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Ln.protocol = Uh;
class my extends Ln {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === 'open' && this.opts.upgrade))
      for (let o = 0; o < this._upgrades.length; o++) this._probe(this._upgrades[o]);
  }
  _probe(o) {
    let i = this.createTransport(o),
      l = !1;
    Ln.priorWebsocketSuccess = !1;
    const p = () => {
      l ||
        (i.send([{ type: 'ping', data: 'probe' }]),
        i.once('packet', L => {
          if (!l)
            if (L.type === 'pong' && L.data === 'probe') {
              if (((this.upgrading = !0), this.emitReserved('upgrading', i), !i)) return;
              ((Ln.priorWebsocketSuccess = i.name === 'websocket'),
                this.transport.pause(() => {
                  l ||
                    (this.readyState !== 'closed' &&
                      (A(),
                      this.setTransport(i),
                      i.send([{ type: 'upgrade' }]),
                      this.emitReserved('upgrade', i),
                      (i = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const H = new Error('probe error');
              ((H.transport = i.name), this.emitReserved('upgradeError', H));
            }
        }));
    };
    function b() {
      l || ((l = !0), A(), i.close(), (i = null));
    }
    const R = L => {
      const H = new Error('probe error: ' + L);
      ((H.transport = i.name), b(), this.emitReserved('upgradeError', H));
    };
    function M() {
      R('transport closed');
    }
    function _() {
      R('socket closed');
    }
    function S(L) {
      i && L.name !== i.name && b();
    }
    const A = () => {
      (i.removeListener('open', p),
        i.removeListener('error', R),
        i.removeListener('close', M),
        this.off('close', _),
        this.off('upgrading', S));
    };
    (i.once('open', p),
      i.once('error', R),
      i.once('close', M),
      this.once('close', _),
      this.once('upgrading', S),
      this._upgrades.indexOf('webtransport') !== -1 && o !== 'webtransport'
        ? this.setTimeoutFn(() => {
            l || i.open();
          }, 200)
        : i.open());
  }
  onHandshake(o) {
    ((this._upgrades = this._filterUpgrades(o.upgrades)), super.onHandshake(o));
  }
  _filterUpgrades(o) {
    const i = [];
    for (let l = 0; l < o.length; l++) ~this.transports.indexOf(o[l]) && i.push(o[l]);
    return i;
  }
}
let gy = class extends my {
  constructor(c, o = {}) {
    const i = typeof c == 'object' ? c : o;
    ((!i.transports || (i.transports && typeof i.transports[0] == 'string')) &&
      (i.transports = (i.transports || ['polling', 'websocket', 'webtransport'])
        .map(l => cy[l])
        .filter(l => !!l)),
      super(c, i));
  }
};
function yy(c, o = '', i) {
  let l = c;
  ((i = i || (typeof location < 'u' && location)),
    c == null && (c = i.protocol + '//' + i.host),
    typeof c == 'string' &&
      (c.charAt(0) === '/' && (c.charAt(1) === '/' ? (c = i.protocol + c) : (c = i.host + c)),
      /^(https?|wss?):\/\//.test(c) ||
        (typeof i < 'u' ? (c = i.protocol + '//' + c) : (c = 'https://' + c)),
      (l = Dl(c))),
    l.port ||
      (/^(http|ws)$/.test(l.protocol)
        ? (l.port = '80')
        : /^(http|ws)s$/.test(l.protocol) && (l.port = '443')),
    (l.path = l.path || '/'));
  const p = l.host.indexOf(':') !== -1 ? '[' + l.host + ']' : l.host;
  return (
    (l.id = l.protocol + '://' + p + ':' + l.port + o),
    (l.href = l.protocol + '://' + p + (i && i.port === l.port ? '' : ':' + l.port)),
    l
  );
}
const vy = typeof ArrayBuffer == 'function',
  by = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c.buffer instanceof ArrayBuffer,
  Hh = Object.prototype.toString,
  xy =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Hh.call(Blob) === '[object BlobConstructor]'),
  wy =
    typeof File == 'function' ||
    (typeof File < 'u' && Hh.call(File) === '[object FileConstructor]');
function Zl(c) {
  return (
    (vy && (c instanceof ArrayBuffer || by(c))) ||
    (xy && c instanceof Blob) ||
    (wy && c instanceof File)
  );
}
function lo(c, o) {
  if (!c || typeof c != 'object') return !1;
  if (Array.isArray(c)) {
    for (let i = 0, l = c.length; i < l; i++) if (lo(c[i])) return !0;
    return !1;
  }
  if (Zl(c)) return !0;
  if (c.toJSON && typeof c.toJSON == 'function' && arguments.length === 1)
    return lo(c.toJSON(), !0);
  for (const i in c) if (Object.prototype.hasOwnProperty.call(c, i) && lo(c[i])) return !0;
  return !1;
}
function ky(c) {
  const o = [],
    i = c.data,
    l = c;
  return ((l.data = Bl(i, o)), (l.attachments = o.length), { packet: l, buffers: o });
}
function Bl(c, o) {
  if (!c) return c;
  if (Zl(c)) {
    const i = { _placeholder: !0, num: o.length };
    return (o.push(c), i);
  } else if (Array.isArray(c)) {
    const i = new Array(c.length);
    for (let l = 0; l < c.length; l++) i[l] = Bl(c[l], o);
    return i;
  } else if (typeof c == 'object' && !(c instanceof Date)) {
    const i = {};
    for (const l in c) Object.prototype.hasOwnProperty.call(c, l) && (i[l] = Bl(c[l], o));
    return i;
  }
  return c;
}
function Sy(c, o) {
  return ((c.data = ql(c.data, o)), delete c.attachments, c);
}
function ql(c, o) {
  if (!c) return c;
  if (c && c._placeholder === !0) {
    if (typeof c.num == 'number' && c.num >= 0 && c.num < o.length) return o[c.num];
    throw new Error('illegal attachments');
  } else if (Array.isArray(c)) for (let i = 0; i < c.length; i++) c[i] = ql(c[i], o);
  else if (typeof c == 'object')
    for (const i in c) Object.prototype.hasOwnProperty.call(c, i) && (c[i] = ql(c[i], o));
  return c;
}
const Ny = [
    'connect',
    'connect_error',
    'disconnect',
    'disconnecting',
    'newListener',
    'removeListener',
  ],
  _y = 5;
var ae;
(function (c) {
  ((c[(c.CONNECT = 0)] = 'CONNECT'),
    (c[(c.DISCONNECT = 1)] = 'DISCONNECT'),
    (c[(c.EVENT = 2)] = 'EVENT'),
    (c[(c.ACK = 3)] = 'ACK'),
    (c[(c.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
    (c[(c.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
    (c[(c.BINARY_ACK = 6)] = 'BINARY_ACK'));
})(ae || (ae = {}));
class Ey {
  constructor(o) {
    this.replacer = o;
  }
  encode(o) {
    return (o.type === ae.EVENT || o.type === ae.ACK) && lo(o)
      ? this.encodeAsBinary({
          type: o.type === ae.EVENT ? ae.BINARY_EVENT : ae.BINARY_ACK,
          nsp: o.nsp,
          data: o.data,
          id: o.id,
        })
      : [this.encodeAsString(o)];
  }
  encodeAsString(o) {
    let i = '' + o.type;
    return (
      (o.type === ae.BINARY_EVENT || o.type === ae.BINARY_ACK) && (i += o.attachments + '-'),
      o.nsp && o.nsp !== '/' && (i += o.nsp + ','),
      o.id != null && (i += o.id),
      o.data != null && (i += JSON.stringify(o.data, this.replacer)),
      i
    );
  }
  encodeAsBinary(o) {
    const i = ky(o),
      l = this.encodeAsString(i.packet),
      p = i.buffers;
    return (p.unshift(l), p);
  }
}
function wh(c) {
  return Object.prototype.toString.call(c) === '[object Object]';
}
class Yl extends ze {
  constructor(o) {
    (super(), (this.reviver = o));
  }
  add(o) {
    let i;
    if (typeof o == 'string') {
      if (this.reconstructor) throw new Error('got plaintext data when reconstructing a packet');
      i = this.decodeString(o);
      const l = i.type === ae.BINARY_EVENT;
      l || i.type === ae.BINARY_ACK
        ? ((i.type = l ? ae.EVENT : ae.ACK),
          (this.reconstructor = new Cy(i)),
          i.attachments === 0 && super.emitReserved('decoded', i))
        : super.emitReserved('decoded', i);
    } else if (Zl(o) || o.base64)
      if (this.reconstructor)
        ((i = this.reconstructor.takeBinaryData(o)),
          i && ((this.reconstructor = null), super.emitReserved('decoded', i)));
      else throw new Error('got binary data when not reconstructing a packet');
    else throw new Error('Unknown type: ' + o);
  }
  decodeString(o) {
    let i = 0;
    const l = { type: Number(o.charAt(0)) };
    if (ae[l.type] === void 0) throw new Error('unknown packet type ' + l.type);
    if (l.type === ae.BINARY_EVENT || l.type === ae.BINARY_ACK) {
      const b = i + 1;
      for (; o.charAt(++i) !== '-' && i != o.length; );
      const R = o.substring(b, i);
      if (R != Number(R) || o.charAt(i) !== '-') throw new Error('Illegal attachments');
      l.attachments = Number(R);
    }
    if (o.charAt(i + 1) === '/') {
      const b = i + 1;
      for (; ++i && !(o.charAt(i) === ',' || i === o.length); );
      l.nsp = o.substring(b, i);
    } else l.nsp = '/';
    const p = o.charAt(i + 1);
    if (p !== '' && Number(p) == p) {
      const b = i + 1;
      for (; ++i; ) {
        const R = o.charAt(i);
        if (R == null || Number(R) != R) {
          --i;
          break;
        }
        if (i === o.length) break;
      }
      l.id = Number(o.substring(b, i + 1));
    }
    if (o.charAt(++i)) {
      const b = this.tryParse(o.substr(i));
      if (Yl.isPayloadValid(l.type, b)) l.data = b;
      else throw new Error('invalid payload');
    }
    return l;
  }
  tryParse(o) {
    try {
      return JSON.parse(o, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(o, i) {
    switch (o) {
      case ae.CONNECT:
        return wh(i);
      case ae.DISCONNECT:
        return i === void 0;
      case ae.CONNECT_ERROR:
        return typeof i == 'string' || wh(i);
      case ae.EVENT:
      case ae.BINARY_EVENT:
        return (
          Array.isArray(i) &&
          (typeof i[0] == 'number' || (typeof i[0] == 'string' && Ny.indexOf(i[0]) === -1))
        );
      case ae.ACK:
      case ae.BINARY_ACK:
        return Array.isArray(i);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(), (this.reconstructor = null));
  }
}
class Cy {
  constructor(o) {
    ((this.packet = o), (this.buffers = []), (this.reconPack = o));
  }
  takeBinaryData(o) {
    if ((this.buffers.push(o), this.buffers.length === this.reconPack.attachments)) {
      const i = Sy(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), i);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
const Ty = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Yl,
      Encoder: Ey,
      get PacketType() {
        return ae;
      },
      protocol: _y,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function Mt(c, o, i) {
  return (
    c.on(o, i),
    function () {
      c.off(o, i);
    }
  );
}
const jy = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class $h extends ze {
  constructor(o, i, l) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = o),
      (this.nsp = i),
      l && l.auth && (this.auth = l.auth),
      (this._opts = Object.assign({}, l)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const o = this.io;
    this.subs = [
      Mt(o, 'open', this.onopen.bind(this)),
      Mt(o, 'packet', this.onpacket.bind(this)),
      Mt(o, 'error', this.onerror.bind(this)),
      Mt(o, 'close', this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === 'open' && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...o) {
    return (o.unshift('message'), this.emit.apply(this, o), this);
  }
  emit(o, ...i) {
    var l, p, b;
    if (jy.hasOwnProperty(o)) throw new Error('"' + o.toString() + '" is a reserved event name');
    if ((i.unshift(o), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
      return (this._addToQueue(i), this);
    const R = { type: ae.EVENT, data: i };
    if (
      ((R.options = {}),
      (R.options.compress = this.flags.compress !== !1),
      typeof i[i.length - 1] == 'function')
    ) {
      const S = this.ids++,
        A = i.pop();
      (this._registerAckCallback(S, A), (R.id = S));
    }
    const M =
        (p = (l = this.io.engine) === null || l === void 0 ? void 0 : l.transport) === null ||
        p === void 0
          ? void 0
          : p.writable,
      _ =
        this.connected &&
        !(!((b = this.io.engine) === null || b === void 0) && b._hasPingExpired());
    return (
      (this.flags.volatile && !M) ||
        (_ ? (this.notifyOutgoingListeners(R), this.packet(R)) : this.sendBuffer.push(R)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(o, i) {
    var l;
    const p = (l = this.flags.timeout) !== null && l !== void 0 ? l : this._opts.ackTimeout;
    if (p === void 0) {
      this.acks[o] = i;
      return;
    }
    const b = this.io.setTimeoutFn(() => {
        delete this.acks[o];
        for (let M = 0; M < this.sendBuffer.length; M++)
          this.sendBuffer[M].id === o && this.sendBuffer.splice(M, 1);
        i.call(this, new Error('operation has timed out'));
      }, p),
      R = (...M) => {
        (this.io.clearTimeoutFn(b), i.apply(this, M));
      };
    ((R.withError = !0), (this.acks[o] = R));
  }
  emitWithAck(o, ...i) {
    return new Promise((l, p) => {
      const b = (R, M) => (R ? p(R) : l(M));
      ((b.withError = !0), i.push(b), this.emit(o, ...i));
    });
  }
  _addToQueue(o) {
    let i;
    typeof o[o.length - 1] == 'function' && (i = o.pop());
    const l = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: o,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (o.push((p, ...b) =>
      l !== this._queue[0]
        ? void 0
        : (p !== null
            ? l.tryCount > this._opts.retries && (this._queue.shift(), i && i(p))
            : (this._queue.shift(), i && i(null, ...b)),
          (l.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(l),
      this._drainQueue());
  }
  _drainQueue(o = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const i = this._queue[0];
    (i.pending && !o) ||
      ((i.pending = !0), i.tryCount++, (this.flags = i.flags), this.emit.apply(this, i.args));
  }
  packet(o) {
    ((o.nsp = this.nsp), this.io._packet(o));
  }
  onopen() {
    typeof this.auth == 'function'
      ? this.auth(o => {
          this._sendConnectPacket(o);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(o) {
    this.packet({
      type: ae.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, o) : o,
    });
  }
  onerror(o) {
    this.connected || this.emitReserved('connect_error', o);
  }
  onclose(o, i) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved('disconnect', o, i),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach(o => {
      if (!this.sendBuffer.some(i => String(i.id) === o)) {
        const i = this.acks[o];
        (delete this.acks[o],
          i.withError && i.call(this, new Error('socket has been disconnected')));
      }
    });
  }
  onpacket(o) {
    if (o.nsp === this.nsp)
      switch (o.type) {
        case ae.CONNECT:
          o.data && o.data.sid
            ? this.onconnect(o.data.sid, o.data.pid)
            : this.emitReserved(
                'connect_error',
                new Error(
                  'It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)'
                )
              );
          break;
        case ae.EVENT:
        case ae.BINARY_EVENT:
          this.onevent(o);
          break;
        case ae.ACK:
        case ae.BINARY_ACK:
          this.onack(o);
          break;
        case ae.DISCONNECT:
          this.ondisconnect();
          break;
        case ae.CONNECT_ERROR:
          this.destroy();
          const i = new Error(o.data.message);
          ((i.data = o.data.data), this.emitReserved('connect_error', i));
          break;
      }
  }
  onevent(o) {
    const i = o.data || [];
    (o.id != null && i.push(this.ack(o.id)),
      this.connected ? this.emitEvent(i) : this.receiveBuffer.push(Object.freeze(i)));
  }
  emitEvent(o) {
    if (this._anyListeners && this._anyListeners.length) {
      const i = this._anyListeners.slice();
      for (const l of i) l.apply(this, o);
    }
    (super.emit.apply(this, o),
      this._pid &&
        o.length &&
        typeof o[o.length - 1] == 'string' &&
        (this._lastOffset = o[o.length - 1]));
  }
  ack(o) {
    const i = this;
    let l = !1;
    return function (...p) {
      l || ((l = !0), i.packet({ type: ae.ACK, id: o, data: p }));
    };
  }
  onack(o) {
    const i = this.acks[o.id];
    typeof i == 'function' &&
      (delete this.acks[o.id], i.withError && o.data.unshift(null), i.apply(this, o.data));
  }
  onconnect(o, i) {
    ((this.id = o),
      (this.recovered = i && this._pid === i),
      (this._pid = i),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved('connect'),
      this._drainQueue(!0));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach(o => this.emitEvent(o)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach(o => {
        (this.notifyOutgoingListeners(o), this.packet(o));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose('io server disconnect'));
  }
  destroy() {
    (this.subs && (this.subs.forEach(o => o()), (this.subs = void 0)), this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: ae.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose('io client disconnect'),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(o) {
    return ((this.flags.compress = o), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(o) {
    return ((this.flags.timeout = o), this);
  }
  onAny(o) {
    return ((this._anyListeners = this._anyListeners || []), this._anyListeners.push(o), this);
  }
  prependAny(o) {
    return ((this._anyListeners = this._anyListeners || []), this._anyListeners.unshift(o), this);
  }
  offAny(o) {
    if (!this._anyListeners) return this;
    if (o) {
      const i = this._anyListeners;
      for (let l = 0; l < i.length; l++) if (o === i[l]) return (i.splice(l, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(o) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(o),
      this
    );
  }
  prependAnyOutgoing(o) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(o),
      this
    );
  }
  offAnyOutgoing(o) {
    if (!this._anyOutgoingListeners) return this;
    if (o) {
      const i = this._anyOutgoingListeners;
      for (let l = 0; l < i.length; l++) if (o === i[l]) return (i.splice(l, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(o) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const i = this._anyOutgoingListeners.slice();
      for (const l of i) l.apply(this, o.data);
    }
  }
}
function Dr(c) {
  ((c = c || {}),
    (this.ms = c.min || 100),
    (this.max = c.max || 1e4),
    (this.factor = c.factor || 2),
    (this.jitter = c.jitter > 0 && c.jitter <= 1 ? c.jitter : 0),
    (this.attempts = 0));
}
Dr.prototype.duration = function () {
  var c = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var o = Math.random(),
      i = Math.floor(o * this.jitter * c);
    c = (Math.floor(o * 10) & 1) == 0 ? c - i : c + i;
  }
  return Math.min(c, this.max) | 0;
};
Dr.prototype.reset = function () {
  this.attempts = 0;
};
Dr.prototype.setMin = function (c) {
  this.ms = c;
};
Dr.prototype.setMax = function (c) {
  this.max = c;
};
Dr.prototype.setJitter = function (c) {
  this.jitter = c;
};
class Vl extends ze {
  constructor(o, i) {
    var l;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      o && typeof o == 'object' && ((i = o), (o = void 0)),
      (i = i || {}),
      (i.path = i.path || '/socket.io'),
      (this.opts = i),
      ho(this, i),
      this.reconnection(i.reconnection !== !1),
      this.reconnectionAttempts(i.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(i.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(i.reconnectionDelayMax || 5e3),
      this.randomizationFactor((l = i.randomizationFactor) !== null && l !== void 0 ? l : 0.5),
      (this.backoff = new Dr({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(i.timeout == null ? 2e4 : i.timeout),
      (this._readyState = 'closed'),
      (this.uri = o));
    const p = i.parser || Ty;
    ((this.encoder = new p.Encoder()),
      (this.decoder = new p.Decoder()),
      (this._autoConnect = i.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(o) {
    return arguments.length
      ? ((this._reconnection = !!o), o || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(o) {
    return o === void 0 ? this._reconnectionAttempts : ((this._reconnectionAttempts = o), this);
  }
  reconnectionDelay(o) {
    var i;
    return o === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = o),
        (i = this.backoff) === null || i === void 0 || i.setMin(o),
        this);
  }
  randomizationFactor(o) {
    var i;
    return o === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = o),
        (i = this.backoff) === null || i === void 0 || i.setJitter(o),
        this);
  }
  reconnectionDelayMax(o) {
    var i;
    return o === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = o),
        (i = this.backoff) === null || i === void 0 || i.setMax(o),
        this);
  }
  timeout(o) {
    return arguments.length ? ((this._timeout = o), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  open(o) {
    if (~this._readyState.indexOf('open')) return this;
    this.engine = new gy(this.uri, this.opts);
    const i = this.engine,
      l = this;
    ((this._readyState = 'opening'), (this.skipReconnect = !1));
    const p = Mt(i, 'open', function () {
        (l.onopen(), o && o());
      }),
      b = M => {
        (this.cleanup(),
          (this._readyState = 'closed'),
          this.emitReserved('error', M),
          o ? o(M) : this.maybeReconnectOnOpen());
      },
      R = Mt(i, 'error', b);
    if (this._timeout !== !1) {
      const M = this._timeout,
        _ = this.setTimeoutFn(() => {
          (p(), b(new Error('timeout')), i.close());
        }, M);
      (this.opts.autoUnref && _.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(_);
        }));
    }
    return (this.subs.push(p), this.subs.push(R), this);
  }
  connect(o) {
    return this.open(o);
  }
  onopen() {
    (this.cleanup(), (this._readyState = 'open'), this.emitReserved('open'));
    const o = this.engine;
    this.subs.push(
      Mt(o, 'ping', this.onping.bind(this)),
      Mt(o, 'data', this.ondata.bind(this)),
      Mt(o, 'error', this.onerror.bind(this)),
      Mt(o, 'close', this.onclose.bind(this)),
      Mt(this.decoder, 'decoded', this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved('ping');
  }
  ondata(o) {
    try {
      this.decoder.add(o);
    } catch (i) {
      this.onclose('parse error', i);
    }
  }
  ondecoded(o) {
    fo(() => {
      this.emitReserved('packet', o);
    }, this.setTimeoutFn);
  }
  onerror(o) {
    this.emitReserved('error', o);
  }
  socket(o, i) {
    let l = this.nsps[o];
    return (
      l
        ? this._autoConnect && !l.active && l.connect()
        : ((l = new $h(this, o, i)), (this.nsps[o] = l)),
      l
    );
  }
  _destroy(o) {
    const i = Object.keys(this.nsps);
    for (const l of i) if (this.nsps[l].active) return;
    this._close();
  }
  _packet(o) {
    const i = this.encoder.encode(o);
    for (let l = 0; l < i.length; l++) this.engine.write(i[l], o.options);
  }
  cleanup() {
    (this.subs.forEach(o => o()), (this.subs.length = 0), this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0), (this._reconnecting = !1), this.onclose('forced close'));
  }
  disconnect() {
    return this._close();
  }
  onclose(o, i) {
    var l;
    (this.cleanup(),
      (l = this.engine) === null || l === void 0 || l.close(),
      this.backoff.reset(),
      (this._readyState = 'closed'),
      this.emitReserved('close', o, i),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const o = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(), this.emitReserved('reconnect_failed'), (this._reconnecting = !1));
    else {
      const i = this.backoff.duration();
      this._reconnecting = !0;
      const l = this.setTimeoutFn(() => {
        o.skipReconnect ||
          (this.emitReserved('reconnect_attempt', o.backoff.attempts),
          !o.skipReconnect &&
            o.open(p => {
              p
                ? ((o._reconnecting = !1), o.reconnect(), this.emitReserved('reconnect_error', p))
                : o.onreconnect();
            }));
      }, i);
      (this.opts.autoUnref && l.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(l);
        }));
    }
  }
  onreconnect() {
    const o = this.backoff.attempts;
    ((this._reconnecting = !1), this.backoff.reset(), this.emitReserved('reconnect', o));
  }
}
const za = {};
function uo(c, o) {
  (typeof c == 'object' && ((o = c), (c = void 0)), (o = o || {}));
  const i = yy(c, o.path || '/socket.io'),
    l = i.source,
    p = i.id,
    b = i.path,
    R = za[p] && b in za[p].nsps,
    M = o.forceNew || o['force new connection'] || o.multiplex === !1 || R;
  let _;
  return (
    M ? (_ = new Vl(l, o)) : (za[p] || (za[p] = new Vl(l, o)), (_ = za[p])),
    i.query && !o.query && (o.query = i.queryKey),
    _.socket(i.path, o)
  );
}
Object.assign(uo, { Manager: Vl, Socket: $h, io: uo, connect: uo });
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Py = c => c.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ay = c =>
    c.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, i, l) => (l ? l.toUpperCase() : i.toLowerCase())),
  kh = c => {
    const o = Ay(c);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  Wh = (...c) =>
    c
      .filter((o, i, l) => !!o && o.trim() !== '' && l.indexOf(o) === i)
      .join(' ')
      .trim(),
  Ry = c => {
    for (const o in c) if (o.startsWith('aria-') || o === 'role' || o === 'title') return !0;
  };
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Oy = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ly = D.forwardRef(
  (
    {
      color: c = 'currentColor',
      size: o = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: l,
      className: p = '',
      children: b,
      iconNode: R,
      ...M
    },
    _
  ) =>
    D.createElement(
      'svg',
      {
        ref: _,
        ...Oy,
        width: o,
        height: o,
        stroke: c,
        strokeWidth: l ? (Number(i) * 24) / Number(o) : i,
        className: Wh('lucide', p),
        ...(!b && !Ry(M) && { 'aria-hidden': 'true' }),
        ...M,
      },
      [...R.map(([S, A]) => D.createElement(S, A)), ...(Array.isArray(b) ? b : [b])]
    )
);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xe = (c, o) => {
  const i = D.forwardRef(({ className: l, ...p }, b) =>
    D.createElement(Ly, {
      ref: b,
      iconNode: o,
      className: Wh(`lucide-${Py(kh(c))}`, `lucide-${c}`, l),
      ...p,
    })
  );
  return ((i.displayName = kh(c)), i);
};
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zy = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
  ],
  My = xe('arrow-right', zy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Iy = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
  so = xe('chevron-down', Iy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Uy = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
    ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
  ],
  Qh = xe('circle-alert', Uy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dy = [
    [
      'path',
      {
        d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
        key: '9ktpf1',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ],
  Fy = xe('compass', Dy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const By = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' }],
    ['path', { d: 'M2 12h20', key: '9i4pu4' }],
  ],
  qy = xe('globe', By);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vy = [
    ['line', { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' }],
    ['line', { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' }],
    ['line', { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' }],
    ['line', { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' }],
  ],
  Hl = xe('hash', Vy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hy = [
    ['path', { d: 'M21 14h-1.343', key: '1jdnxi' }],
    ['path', { d: 'M9.128 3.47A9 9 0 0 1 21 12v3.343', key: '6kipu2' }],
    ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
    ['path', { d: 'M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3', key: '9x50f4' }],
    [
      'path',
      {
        d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364',
        key: '1bkxnm',
      },
    ],
  ],
  Sh = xe('headphone-off', Hy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $y = [
    ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        key: 'r6nss1',
      },
    ],
  ],
  Wy = xe('house', $y);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qy = [
    ['line', { x1: '2', x2: '22', y1: '2', y2: '22', key: 'a6p6uj' }],
    ['path', { d: 'M10.41 10.41a2 2 0 1 1-2.83-2.83', key: '1bzlo9' }],
    ['line', { x1: '13.5', x2: '6', y1: '13.5', y2: '21', key: '1q0aeu' }],
    ['line', { x1: '18', x2: '21', y1: '12', y2: '15', key: '5mozeu' }],
    [
      'path',
      {
        d: 'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59',
        key: 'mmje98',
      },
    ],
    ['path', { d: 'M21 15V5a2 2 0 0 0-2-2H9', key: '43el77' }],
  ],
  Ky = xe('image-off', Qy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gy = [
    ['path', { d: 'm10 17 5-5-5-5', key: '1bsop3' }],
    ['path', { d: 'M15 12H3', key: '6jk70r' }],
    ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', key: 'u53s6r' }],
  ],
  Xy = xe('log-in', Gy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jy = [
    ['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
    ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
  ],
  Zy = xe('lock', Jy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yy = [
    ['path', { d: 'M4 5h16', key: '1tepv9' }],
    ['path', { d: 'M4 12h16', key: '1lakjw' }],
    ['path', { d: 'M4 19h16', key: '1djgab' }],
  ],
  Kh = xe('menu', Yy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const e0 = [
    [
      'path',
      {
        d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
        key: '18887p',
      },
    ],
  ],
  Gh = xe('message-square', e0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const t0 = [
    ['path', { d: 'M12 19v3', key: 'npa21l' }],
    ['path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2', key: '1vc78b' }],
    ['rect', { x: '9', y: '2', width: '6', height: '13', rx: '3', key: 's6n7sd' }],
  ],
  n0 = xe('mic', t0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r0 = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'M12 5v14', key: 's699le' }],
  ],
  a0 = xe('plus', r0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const s0 = [
    ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
    ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
    ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
    ['path', { d: 'M8 16H3v5', key: '1cv678' }],
  ],
  o0 = xe('refresh-cw', s0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const i0 = [
    [
      'path',
      {
        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
        key: '1i5ecw',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
  ],
  l0 = xe('settings', i0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const u0 = [
    [
      'path',
      {
        d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
        key: 'oel41y',
      },
    ],
  ],
  po = xe('shield', u0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c0 = [
    ['path', { d: 'M10 11v6', key: 'nco0om' }],
    ['path', { d: 'M14 11v6', key: 'outv1u' }],
    ['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', key: 'miytrc' }],
    ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
    ['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', key: 'e791ji' }],
  ],
  Xh = xe('trash-2', c0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const d0 = [
    [
      'path',
      {
        d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
        key: 'wmoenq',
      },
    ],
    ['path', { d: 'M12 9v4', key: 'juzpu7' }],
    ['path', { d: 'M12 17h.01', key: 'p32p05' }],
  ],
  f0 = xe('triangle-alert', d0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const h0 = [
    ['path', { d: 'M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978', key: '1n3hpd' }],
    ['path', { d: 'M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978', key: 'rfe1zi' }],
    ['path', { d: 'M18 9h1.5a1 1 0 0 0 0-5H18', key: '7xy6bh' }],
    ['path', { d: 'M4 22h16', key: '57wxv0' }],
    ['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z', key: '1mhfuq' }],
    ['path', { d: 'M6 9H4.5a1 1 0 0 1 0-5H6', key: 'tex48p' }],
  ],
  p0 = xe('trophy', h0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const m0 = [
    ['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' }],
    ['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744', key: '16gr8j' }],
    ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
    ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
  ],
  eu = xe('users', m0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const g0 = [
    [
      'path',
      {
        d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
        key: 'uqj9uw',
      },
    ],
    ['path', { d: 'M16 9a5 5 0 0 1 0 6', key: '1q6k2b' }],
    ['path', { d: 'M19.364 18.364a9 9 0 0 0 0-12.728', key: 'ijwkga' }],
  ],
  Nh = xe('volume-2', g0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const y0 = [
    ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
    ['path', { d: 'M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z', key: '1ezoue' }],
    ['path', { d: 'M22 19H2', key: 'nuriw5' }],
  ],
  v0 = xe('vote', y0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b0 = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  Jh = xe('x', b0),
  Ur = ({
    src: c,
    alt: o,
    fallbackSrc: i,
    showFallbackIcon: l = !0,
    className: p = '',
    onError: b,
    ...R
  }) => {
    const [M, _] = D.useState(!1),
      [S, A] = D.useState(c),
      L = H => {
        if ((b && b(H), i && S !== i)) {
          A(i);
          return;
        }
        _(!0);
      };
    return M
      ? l
        ? f.jsx('div', {
            className: `bg-discord-hover flex items-center justify-center ${p}`,
            role: 'img',
            'aria-label': o || 'Imagen no disponible',
            children: f.jsx(Ky, { className: 'text-discord-text-muted', size: 24 }),
          })
        : null
      : f.jsx('img', { src: S, alt: o, className: p, onError: L, loading: 'lazy', ...R });
  },
  Zh = D.memo(({ isOpen: c, onClose: o, currentUser: i, socket: l }) => {
    const [p, b] = D.useState(!1),
      [R, M] = D.useState(null);
    if (!c) return null;
    const _ = async (S, A = !0) => {
      if (A && R !== S) {
        (M(S), setTimeout(() => M(null), 5e3));
        return;
      }
      (b(!0), M(null));
      try {
        switch (S) {
          case 'clear-users':
            i && l.emit('admin:clear-users', { adminId: i.id });
            break;
          case 'clear-messages':
            i && l.emit('admin:clear-all-messages', { adminId: i.id });
            break;
        }
      } catch (L) {
        console.error('Error ejecutando acción:', L);
      } finally {
        setTimeout(() => b(!1), 1e3);
      }
    };
    return f.jsx('div', {
      className:
        'fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn',
      children: f.jsxs('div', {
        className:
          'bg-discord-sidebar rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn border border-gray-800',
        children: [
          f.jsxs('div', {
            className:
              'bg-gradient-to-r from-red-600 to-orange-600 p-4 flex items-center justify-between',
            children: [
              f.jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  f.jsx(po, { className: 'w-6 h-6 text-white' }),
                  f.jsx('h2', {
                    className: 'text-xl font-bold text-white',
                    children: 'Panel de Administración',
                  }),
                ],
              }),
              f.jsx('button', {
                onClick: o,
                className: 'text-white hover:bg-white/20 rounded p-1 transition-colors',
                'aria-label': 'Cerrar',
                children: f.jsx(Jh, { size: 24 }),
              }),
            ],
          }),
          f.jsx('div', {
            className: 'bg-yellow-900/30 border-l-4 border-yellow-500 p-3 m-4',
            children: f.jsxs('div', {
              className: 'flex items-center gap-2',
              children: [
                f.jsx(f0, { className: 'w-5 h-5 text-yellow-500' }),
                f.jsxs('p', {
                  className: 'text-sm text-yellow-200',
                  children: [
                    f.jsx('strong', { children: 'Advertencia:' }),
                    ' Estas acciones son irreversibles. Usa con precaución.',
                  ],
                }),
              ],
            }),
          }),
          f.jsx('div', {
            className: 'p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar space-y-4',
            children: f.jsxs('div', {
              className: 'space-y-4',
              children: [
                f.jsx($l, {
                  icon: f.jsx(Gh, { size: 18 }),
                  title: 'Limpiar Todos los Mensajes',
                  description: 'Borra el historial completo de mensajes de todos los canales',
                  onClick: () => _('clear-messages'),
                  isConfirming: R === 'clear-messages',
                  isLoading: p,
                  variant: 'danger',
                }),
                f.jsx($l, {
                  icon: f.jsx(Xh, { size: 18 }),
                  title: 'Reiniciar Usuarios y IPs',
                  description:
                    'Elimina todos los usuarios registrados y limpia sus IPs. Todos deberán volver a crear su usuario',
                  onClick: () => _('clear-users'),
                  isConfirming: R === 'clear-users',
                  isLoading: p,
                  variant: 'danger',
                }),
              ],
            }),
          }),
          f.jsx('div', {
            className: 'bg-discord-dark p-4 border-t border-gray-800',
            children: f.jsxs('p', {
              className: 'text-xs text-discord-text-muted text-center',
              children: [
                'Sesión de admin: ',
                (i == null ? void 0 : i.username) || 'Unknown',
                ' | IP Hash Verificada',
              ],
            }),
          }),
        ],
      }),
    });
  }),
  $l = D.memo(
    ({
      icon: c,
      title: o,
      description: i,
      onClick: l,
      isConfirming: p,
      isLoading: b,
      variant: R,
    }) => {
      const M = {
        danger: 'bg-red-600 hover:bg-red-700 border-red-500',
        warning: 'bg-orange-600 hover:bg-orange-700 border-orange-500',
        info: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
        success: 'bg-green-600 hover:bg-green-700 border-green-500',
      };
      return f.jsx('button', {
        onClick: l,
        disabled: b,
        className: `w-full p-4 rounded-lg border-2 transition-all ${p ? 'bg-yellow-600 border-yellow-500 animate-pulse' : M[R]} ${b ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'} text-left`,
        children: f.jsxs('div', {
          className: 'flex items-start gap-3',
          children: [
            f.jsx('div', { className: 'text-white mt-0.5', children: c }),
            f.jsxs('div', {
              className: 'flex-1',
              children: [
                f.jsx('h4', {
                  className: 'text-white font-semibold mb-1',
                  children: p ? '⚠️ Confirmar - Clic nuevamente' : o,
                }),
                f.jsx('p', {
                  className: 'text-sm text-gray-200 opacity-90',
                  children: p
                    ? 'Esta acción es irreversible. Haz clic de nuevo para confirmar.'
                    : i,
                }),
              ],
            }),
          ],
        }),
      });
    }
  );
$l.displayName = 'ActionButton';
Zh.displayName = 'AdminPanel';
var Vt = (c => ((c.ADMIN = 'admin'), (c.USER = 'user'), c))(Vt || {}),
  bt = (c => ((c.CHAT = 'CHAT'), (c.WHO_WE_ARE = 'WHO_WE_ARE'), (c.VOTING = 'VOTING'), c))(
    bt || {}
  );
const Wl = D.memo(({ currentUser: c, setCurrentUser: o, isConnected: i }) => {
  const [l, p] = D.useState(!1),
    b = (c == null ? void 0 : c.role) === Vt.ADMIN,
    R = window.socketInstance;
  return f.jsxs('div', {
    className:
      'w-[72px] bg-discord-dark flex flex-col items-center py-3 space-y-2 overflow-y-auto shrink-0',
    children: [
      f.jsxs('div', {
        className: 'group relative',
        children: [
          f.jsx('div', {
            className:
              'absolute left-0 bg-white rounded-r w-1 h-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-4 origin-left group-hover:scale-100',
          }),
          f.jsx('button', {
            className:
              'w-12 h-12 bg-discord-chat text-discord-text-normal hover:bg-discord-blurple hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
            children: f.jsx(Wy, { size: 28 }),
          }),
        ],
      }),
      f.jsx('div', { className: 'w-8 h-[2px] bg-discord-chat rounded-lg mx-auto' }),
      f.jsxs('div', {
        className: 'group relative',
        children: [
          f.jsx('div', {
            className:
              'absolute left-0 bg-white rounded-r-md w-1 h-10 top-1/2 -translate-y-1/2 -ml-1',
          }),
          f.jsx('button', {
            className:
              'w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-yellow hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
            children: f.jsx(Ur, {
              src: '/upg.png',
              alt: 'UPG',
              className: 'object-cover w-full h-full',
              fallbackSrc:
                'https://ui-avatars.com/api/?name=UPG&background=ffcc17&color=ffcc17&size=128',
            }),
          }),
        ],
      }),
      f.jsx('div', { className: 'w-8 h-[2px] bg-discord-chat rounded-lg mx-auto' }),
      f.jsx('button', {
        className:
          'w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-green hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
        children: f.jsx(a0, { size: 24 }),
      }),
      f.jsx('button', {
        className:
          'w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-green hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
        children: f.jsx(Fy, { size: 24 }),
      }),
      b &&
        f.jsxs(f.Fragment, {
          children: [
            f.jsx('div', { className: 'w-8 h-[2px] bg-discord-chat rounded-lg mx-auto mt-auto' }),
            f.jsx('button', {
              onClick: () => p(!0),
              className:
                'w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
              title: 'Panel de Administración',
              children: f.jsx(po, { size: 24 }),
            }),
          ],
        }),
      b && f.jsx(Zh, { isOpen: l, onClose: () => p(!1), currentUser: c, socket: R }),
    ],
  });
});
Wl.displayName = 'Sidebar';
const x0 = ({
    activeView: c,
    currentChannelId: o,
    onChannelSelect: i,
    currentUser: l,
    activeVoiceChannel: p,
    onVoiceJoin: b,
    voiceStates: R,
    users: M,
  }) => {
    var _;
    const S = ({ id: L, name: H, description: q, icon: oe = Hl, view: Q = bt.CHAT }) => {
        const se = c === Q && (Q !== bt.CHAT || o === L);
        return f.jsxs('button', {
          onClick: () => i(Q, Q === bt.CHAT ? { id: L, name: H, description: q } : void 0),
          className: `w-full flex items-center px-2 py-[6px] rounded-md mb-[2px] group transition-colors ${se ? 'bg-discord-hover text-discord-text-header' : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'}`,
          children: [
            f.jsx(oe, { size: 20, className: 'mr-1.5 text-gray-400' }),
            f.jsx('span', {
              className: `font-medium truncate ${se ? 'text-white' : ''}`,
              children: H,
            }),
          ],
        });
      },
      A = ({ name: L }) => {
        const H = p === L,
          q = M.filter(oe => R[oe.id] === L);
        return f.jsxs('div', {
          className: 'mb-1',
          children: [
            f.jsxs('div', {
              onClick: () => b(L),
              className: `w-full flex items-center px-2 py-[6px] rounded-md group transition-colors cursor-pointer ${H ? 'bg-discord-hover text-white' : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'}`,
              children: [
                f.jsx(Nh, {
                  size: 20,
                  className: `mr-1.5 ${H ? 'text-green-500' : 'text-gray-400'}`,
                }),
                f.jsx('span', { className: 'font-medium truncate flex-1', children: L }),
              ],
            }),
            q.length > 0 &&
              f.jsx('div', {
                className: 'pl-8 pr-2 space-y-1 pb-1',
                children: q.map(oe =>
                  f.jsxs(
                    'div',
                    {
                      className:
                        'flex items-center group/user cursor-pointer py-0.5 rounded hover:bg-white/5',
                      children: [
                        f.jsx(Ur, {
                          src: oe.avatar,
                          alt: oe.username,
                          className: `w-5 h-5 rounded-full mr-2 border border-[#2b2d31] ${oe.status === 'online' ? 'ring-1 ring-green-500' : ''}`,
                          fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(oe.username)}&background=5865F2&color=fff&size=128`,
                        }),
                        f.jsx('span', {
                          className: `text-sm truncate ${oe.id === (l == null ? void 0 : l.id) ? 'font-bold text-white' : 'text-discord-text-muted group-hover/user:text-discord-text-normal'}`,
                          children: oe.username,
                        }),
                        oe.isBot &&
                          f.jsx('span', {
                            className: 'ml-1 text-[9px] bg-discord-blurple text-white px-1 rounded',
                            children: 'BOT',
                          }),
                      ],
                    },
                    oe.id
                  )
                ),
              }),
          ],
        });
      };
    return f.jsxs('div', {
      className: 'w-60 bg-discord-sidebar flex flex-col shrink-0 relative',
      children: [
        f.jsxs('div', {
          className:
            'h-12 px-4 flex items-center justify-between shadow-sm hover:bg-discord-hover transition-colors cursor-pointer border-b border-gray-900/20 shrink-0',
          children: [
            f.jsx('h1', {
              className: 'font-bold text-discord-text-header text-[15px] truncate',
              children: 'UPG Community',
            }),
            f.jsx(so, { size: 16, className: 'text-discord-text-header' }),
          ],
        }),
        f.jsxs('div', {
          className: 'flex-1 overflow-y-auto p-3 custom-scrollbar space-y-5 pb-24',
          children: [
            f.jsxs('div', {
              children: [
                f.jsx('div', {
                  className:
                    'flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer',
                  children: f.jsxs('div', {
                    className: 'flex items-center',
                    children: [f.jsx(so, { size: 10, className: 'mr-0.5' }), 'INFORMACIÓN'],
                  }),
                }),
                f.jsx(S, {
                  id: 'quienes-somos',
                  name: 'quienes-somos',
                  description: 'Sobre nosotros',
                  icon: eu,
                  view: bt.WHO_WE_ARE,
                }),
                f.jsx(S, {
                  id: 'votaciones',
                  name: 'votaciones',
                  description: 'Vota por el futuro',
                  icon: v0,
                  view: bt.VOTING,
                }),
              ],
            }),
            f.jsxs('div', {
              children: [
                f.jsxs('div', {
                  className:
                    'flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer',
                  children: [
                    f.jsxs('div', {
                      className: 'flex items-center',
                      children: [f.jsx(so, { size: 10, className: 'mr-0.5' }), 'CANALES DE TEXTO'],
                    }),
                    f.jsx('span', {
                      className: 'text-xl leading-none relative top-[1px]',
                      children: '+',
                    }),
                  ],
                }),
                f.jsx(S, { id: 'general', name: 'general', description: 'Chat general de UPG' }),
              ],
            }),
            f.jsxs('div', {
              children: [
                f.jsx('div', {
                  className:
                    'flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer',
                  children: f.jsxs('div', {
                    className: 'flex items-center',
                    children: [f.jsx(so, { size: 10, className: 'mr-0.5' }), 'CANALES DE VOZ'],
                  }),
                }),
                f.jsx(A, { name: 'Plaza UPG' }),
              ],
            }),
          ],
        }),
        p &&
          f.jsxs('div', {
            className: 'bg-[#232428] border-b border-gray-800 p-2 shrink-0',
            children: [
              f.jsxs('div', {
                className:
                  'flex items-center justify-between text-green-400 text-xs font-bold px-1 mb-1',
                children: [
                  f.jsxs('span', {
                    className: 'flex items-center',
                    children: [f.jsx(Nh, { size: 12, className: 'mr-1' }), ' Voz Conectada'],
                  }),
                  f.jsx('span', {
                    className: 'text-discord-text-muted font-normal cursor-pointer hover:underline',
                    children: p,
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  f.jsx('div', {
                    className: 'text-discord-text-muted text-[10px] px-1',
                    children: 'Latencia: 24ms',
                  }),
                  f.jsx('button', {
                    onClick: () => b(p),
                    className: 'hover:bg-gray-700 p-1 rounded',
                    children: f.jsx(Sh, { size: 14, className: 'text-discord-text-header' }),
                  }),
                ],
              }),
            ],
          }),
        f.jsx('div', {
          className: 'bg-[#232428] shrink-0 flex flex-col z-10',
          children: f.jsxs('div', {
            className: 'h-[52px] px-2 flex items-center',
            children: [
              f.jsxs('div', {
                className:
                  'group flex items-center py-1 px-1 pl-0.5 rounded-md hover:bg-discord-hover cursor-pointer mr-auto min-w-[120px]',
                children: [
                  f.jsxs('div', {
                    className: 'relative w-8 h-8 mr-2 ml-1',
                    children: [
                      f.jsx(Ur, {
                        src: (l == null ? void 0 : l.avatar) || '',
                        className: 'w-8 h-8 rounded-full object-cover',
                        alt: 'User',
                        fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent((l == null ? void 0 : l.username) || 'U')}&background=5865F2&color=fff&size=128`,
                      }),
                      f.jsx('div', {
                        className: `absolute bottom-0 right-0 w-3 h-3 border-2 border-[#232428] rounded-full ${(l == null ? void 0 : l.status) === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`,
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'text-sm min-w-0',
                    children: [
                      f.jsx('div', {
                        className: 'font-semibold text-white text-xs truncate w-20',
                        children: (l == null ? void 0 : l.username) || 'User',
                      }),
                      f.jsxs('div', {
                        className: 'text-[10px] text-gray-400 truncate',
                        children: [
                          '#',
                          ((_ = l == null ? void 0 : l.id) == null ? void 0 : _.substring(0, 4)) ||
                            '0000',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex items-center',
                children: [
                  f.jsx('button', {
                    className:
                      'p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal',
                    children: f.jsx(n0, { size: 18 }),
                  }),
                  f.jsx('button', {
                    className:
                      'p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal',
                    children: f.jsx(Sh, { size: 18 }),
                  }),
                  f.jsx('button', {
                    className:
                      'p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal',
                    children: f.jsx(l0, { size: 18 }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  _h = D.memo(x0),
  Eh = ({
    currentUser: c,
    users: o,
    currentChannel: i,
    onSendMessage: l,
    messages: p,
    onMenuToggle: b,
  }) => {
    const [R, M] = D.useState(''),
      [_, S] = D.useState(null),
      A = D.useRef(null),
      L = (c == null ? void 0 : c.role) === Vt.ADMIN,
      H = () => window.socketInstance;
    D.useEffect(() => {
      var Q;
      (Q = A.current) == null || Q.scrollIntoView({ behavior: 'smooth' });
    }, [p]);
    const q = Q => {
        (Q.preventDefault(), R.trim() && (l(R), M('')));
      },
      oe = () => {
        if (
          L &&
          confirm(`¿Estás seguro de que quieres eliminar todos los mensajes de #${i.name}?`)
        ) {
          const Q = H();
          Q && Q.emit('admin:clear-channel', { channelId: i.id, adminId: c.id });
        }
      };
    return f.jsxs('div', {
      className: 'flex-1 flex flex-col bg-discord-chat min-w-0 h-full',
      children: [
        f.jsxs('div', {
          className:
            'h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0',
          children: [
            f.jsxs('div', {
              className: 'flex items-center text-discord-text-header font-bold truncate',
              children: [
                f.jsx('button', {
                  onClick: b,
                  className: 'md:hidden mr-3 text-discord-text-muted hover:text-white',
                  'aria-label': 'Abrir menú',
                  'aria-expanded': 'false',
                  children: f.jsx(Kh, { size: 24 }),
                }),
                f.jsx(Hl, { size: 24, className: 'text-discord-text-muted mr-2 shrink-0' }),
                f.jsx('span', { className: 'truncate', children: i.name }),
              ],
            }),
            L &&
              f.jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  f.jsxs('span', {
                    className:
                      'text-xs bg-discord-blurple px-2 py-1 rounded flex items-center gap-1',
                    children: [f.jsx(po, { size: 12 }), 'ADMIN'],
                  }),
                  f.jsx('button', {
                    onClick: oe,
                    className:
                      'text-red-400 hover:text-red-300 px-2 py-1 hover:bg-red-500/10 rounded transition-colors',
                    title: 'Limpiar chat',
                    children: f.jsx(Xh, { size: 18 }),
                  }),
                ],
              }),
          ],
        }),
        f.jsx('div', {
          className: 'flex-1 overflow-y-auto px-4 pt-4 flex flex-col',
          style: { maxHeight: '100%' },
          children: f.jsxs('div', {
            className: 'mt-auto',
            children: [
              f.jsxs('div', {
                className: 'mb-8 mt-4',
                children: [
                  f.jsx('div', {
                    className:
                      'w-16 h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-4',
                    children: f.jsx(Hl, { size: 40, className: 'text-white' }),
                  }),
                  f.jsxs('h1', {
                    className: 'text-3xl font-bold text-white mb-2',
                    children: ['¡Bienvenido a #', i.name, '!'],
                  }),
                  f.jsx('p', {
                    className: 'text-discord-text-muted',
                    children: 'Este es el chat real del canal.',
                  }),
                ],
              }),
              f.jsx('div', { className: 'h-[1px] bg-discord-text-muted/20 w-full my-4' }),
              p.map(Q => {
                const se = o.find(Pt => Pt.id === Q.userId),
                  qe = typeof Q.timestamp == 'string' ? new Date(Q.timestamp) : Q.timestamp;
                return f.jsxs(
                  'div',
                  {
                    className: 'group flex pr-4 mt-4 py-0.5 hover:bg-[#2e3035] relative',
                    onMouseEnter: () => S(Q.id),
                    onMouseLeave: () => S(null),
                    children: [
                      f.jsx('div', {
                        className:
                          'w-10 h-10 rounded-full bg-gray-600 mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer',
                        children: f.jsx(Ur, {
                          src: Q.avatar || (se == null ? void 0 : se.avatar) || '',
                          alt: Q.username || (se == null ? void 0 : se.username) || '',
                          className: 'w-full h-full object-cover',
                          fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(Q.username || (se == null ? void 0 : se.username) || '')}&background=5865F2&color=fff&size=128`,
                        }),
                      }),
                      f.jsxs('div', {
                        className: 'flex-1 min-w-0',
                        children: [
                          f.jsxs('div', {
                            className: 'flex items-center',
                            children: [
                              f.jsx('span', {
                                className: 'font-medium text-base mr-2',
                                style: { color: (se == null ? void 0 : se.color) || '#fff' },
                                children: Q.username || (se == null ? void 0 : se.username),
                              }),
                              (se == null ? void 0 : se.role) === Vt.ADMIN &&
                                f.jsx('span', {
                                  className:
                                    'text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2',
                                  children: 'ADMIN',
                                }),
                              f.jsx('span', {
                                className: 'text-xs text-discord-text-muted ml-2 font-medium',
                                children: qe.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }),
                              }),
                            ],
                          }),
                          f.jsx('p', {
                            className:
                              'text-discord-text-normal whitespace-pre-wrap leading-[1.375rem]',
                            children: Q.content,
                          }),
                        ],
                      }),
                    ],
                  },
                  Q.id
                );
              }),
              f.jsx('div', { ref: A }),
            ],
          }),
        }),
        f.jsx('div', {
          className: 'px-4 pt-2 shrink-0',
          style: { paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' },
          children: f.jsx('div', {
            className: 'bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center',
            children: f.jsx('form', {
              onSubmit: q,
              className: 'flex-1 flex items-center',
              children: f.jsx('input', {
                type: 'text',
                value: R,
                onChange: Q => M(Q.target.value),
                placeholder: `Enviar mensaje a #${i.name}`,
                className:
                  'bg-transparent w-full text-discord-text-normal placeholder-discord-text-muted outline-none',
                'aria-label': 'Escribir mensaje',
                maxLength: 2e3,
              }),
            }),
          }),
        }),
      ],
    });
  },
  w0 = ({ isOpen: c, onClose: o, user: i, onLoginWithDiscord: l }) => {
    if (!c) return null;
    const p = i.isGuest || i.username.startsWith('Invitado');
    return f.jsx('div', {
      className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4',
      onClick: o,
      children: f.jsxs('div', {
        className: 'bg-discord-sidebar rounded-lg shadow-xl max-w-md w-full overflow-hidden',
        onClick: b => b.stopPropagation(),
        children: [
          f.jsx('div', {
            className: 'relative h-24 bg-gradient-to-r from-purple-500 to-pink-500',
            children: f.jsx('button', {
              onClick: o,
              className:
                'absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full transition-colors',
              children: f.jsx(Jh, { size: 20, className: 'text-white' }),
            }),
          }),
          f.jsxs('div', {
            className: 'relative px-4 pb-4',
            children: [
              f.jsx('div', {
                className: 'absolute -top-12 left-4',
                children: f.jsxs('div', {
                  className: 'relative',
                  children: [
                    f.jsx(Ur, {
                      src: i.avatar,
                      alt: i.username,
                      className:
                        'w-24 h-24 rounded-full border-8 border-discord-sidebar object-cover',
                      fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(i.username)}&background=5865F2&color=fff&size=200`,
                    }),
                    f.jsx('div', {
                      className: `absolute bottom-1 right-1 w-6 h-6 border-[4px] border-discord-sidebar rounded-full ${i.status === 'online' ? 'bg-green-500' : i.status === 'idle' ? 'bg-yellow-500' : i.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'}`,
                    }),
                  ],
                }),
              }),
              f.jsxs('div', {
                className: 'pt-14',
                children: [
                  f.jsxs('div', {
                    className: 'bg-discord-dark rounded-lg p-4 mb-4',
                    children: [
                      f.jsx('h2', {
                        className: 'text-xl font-bold text-white mb-1',
                        style: { color: i.color },
                        children: i.username,
                      }),
                      f.jsx('p', { className: 'text-sm text-discord-text-muted', children: i.id }),
                      p &&
                        f.jsx('div', {
                          className:
                            'mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded',
                          children: f.jsx('p', {
                            className: 'text-sm text-yellow-200',
                            children: '👋 Estás navegando como invitado',
                          }),
                        }),
                    ],
                  }),
                  p &&
                    f.jsxs('button', {
                      onClick: l,
                      className:
                        'w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2',
                      children: [f.jsx(Xy, { size: 20 }), 'Iniciar sesión con Discord'],
                    }),
                  !p &&
                    f.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        f.jsx('div', {
                          className: 'p-3 bg-green-500/10 border border-green-500/30 rounded',
                          children: f.jsx('p', {
                            className: 'text-sm text-green-200 flex items-center gap-2',
                            children: '✓ Conectado con Discord',
                          }),
                        }),
                        f.jsx('button', {
                          onClick: () => {
                            confirm('¿Seguro que quieres cerrar sesión?') &&
                              (localStorage.clear(), window.location.reload());
                          },
                          className:
                            'w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors',
                          children: 'Cerrar sesión',
                        }),
                      ],
                    }),
                  f.jsxs('div', {
                    className: 'mt-4 grid grid-cols-2 gap-2 text-center',
                    children: [
                      f.jsxs('div', {
                        className: 'bg-discord-dark rounded p-3',
                        children: [
                          f.jsx('p', {
                            className: 'text-xs text-discord-text-muted uppercase',
                            children: 'Estado',
                          }),
                          f.jsx('p', {
                            className: 'text-sm font-semibold text-white capitalize',
                            children:
                              i.status === 'online'
                                ? 'Disponible'
                                : i.status === 'idle'
                                  ? 'Ausente'
                                  : i.status === 'dnd'
                                    ? 'No molestar'
                                    : 'Desconectado',
                          }),
                        ],
                      }),
                      f.jsxs('div', {
                        className: 'bg-discord-dark rounded p-3',
                        children: [
                          f.jsx('p', {
                            className: 'text-xs text-discord-text-muted uppercase',
                            children: 'Rol',
                          }),
                          f.jsx('p', {
                            className: 'text-sm font-semibold text-white',
                            children:
                              i.role === 'admin' ? '👑 Admin' : p ? '🚶 Invitado' : '👤 Miembro',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  co = D.memo(({ user: c, isCurrentUser: o, onClick: i }) => {
    const l = c.online === !1 || c.status === 'offline';
    return f.jsxs('div', {
      className: `flex items-center py-1.5 px-2 hover:bg-discord-hover rounded cursor-pointer group opacity-90 hover:opacity-100 ${o ? 'bg-discord-hover/50 border border-discord-blurple/30' : ''}`,
      onClick: i,
      children: [
        f.jsxs('div', {
          className: 'relative mr-3',
          children: [
            f.jsx(Ur, {
              src: c.avatar,
              alt: c.username,
              className: `w-8 h-8 rounded-full object-cover ${l ? 'grayscale opacity-60' : ''}`,
              fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.username)}&background=5865F2&color=fff&size=128`,
            }),
            !l &&
              f.jsx('div', {
                className: `absolute bottom-0 right-0 w-3.5 h-3.5 border-[3px] border-[#2b2d31] rounded-full ${c.status === 'online' ? 'bg-green-500' : c.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'}`,
              }),
          ],
        }),
        f.jsxs('div', {
          className: 'min-w-0',
          children: [
            f.jsxs('div', {
              className: 'flex items-center',
              children: [
                f.jsx('span', {
                  className: `font-medium text-sm truncate ${l ? 'text-discord-text-muted' : ''}`,
                  style: { color: l ? void 0 : c.color },
                  children: c.username,
                }),
                c.isBot &&
                  f.jsx('span', {
                    className:
                      'ml-1.5 bg-[#5865F2] text-white text-[10px] px-1 rounded-[3px] uppercase font-bold leading-tight py-[1px]',
                    children: 'Bot',
                  }),
              ],
            }),
            f.jsx('div', {
              className:
                'text-xs text-discord-text-muted truncate h-4 opacity-0 group-hover:opacity-100 transition-opacity',
              children: c.status === 'dnd' ? 'No molestar' : c.status === 'idle' ? 'Ausente' : '',
            }),
          ],
        }),
      ],
    });
  });
co.displayName = 'UserItem';
const Ql = D.memo(({ users: c, currentUserId: o, isMobileView: i = !1, onLoginWithDiscord: l }) => {
  const [p, b] = D.useState(!1),
    [R, M] = D.useState(null),
    _ = c.filter(q =>
      q.isBot ? !1 : q.online === !0 || (q.online === void 0 && q.status === 'online')
    ),
    S = c.filter(q => q.isBot),
    A = c.filter(q => (q.isBot ? !1 : q.online === !1 || q.status === 'offline')),
    L = q => {
      q.id === o && (M(q), b(!0));
    },
    H = () => {
      (b(!1), l && l());
    };
  return f.jsxs(f.Fragment, {
    children: [
      f.jsxs('div', {
        className: `${i ? 'w-full bg-discord-dark h-full' : 'w-60 bg-discord-sidebar shrink-0 hidden lg:flex'} flex flex-col p-3 overflow-y-auto custom-scrollbar border-l border-gray-900/20`,
        children: [
          f.jsxs('div', {
            className: 'mb-6',
            children: [
              f.jsxs('h2', {
                className: 'text-xs font-bold text-discord-text-muted uppercase mb-2 px-2',
                children: ['Disponible — ', _.length],
              }),
              _.map(q =>
                f.jsx(co, { user: q, isCurrentUser: q.id === o, onClick: () => L(q) }, q.id)
              ),
            ],
          }),
          f.jsxs('div', {
            className: 'mb-6',
            children: [
              f.jsxs('h2', {
                className: 'text-xs font-bold text-discord-text-muted uppercase mb-2 px-2',
                children: ['Bots — ', S.length],
              }),
              S.map(q => f.jsx(co, { user: q }, q.id)),
            ],
          }),
          f.jsxs('div', {
            children: [
              f.jsxs('h2', {
                className: 'text-xs font-bold text-discord-text-muted uppercase mb-2 px-2',
                children: ['Desconectado — ', A.length],
              }),
              A.map(q =>
                f.jsx(co, { user: q, isCurrentUser: q.id === o, onClick: () => L(q) }, q.id)
              ),
            ],
          }),
        ],
      }),
      R && f.jsx(w0, { isOpen: p, onClose: () => b(!1), user: R, onLoginWithDiscord: H }),
    ],
  });
});
Ql.displayName = 'UserList';
const Ch = () =>
    f.jsx('div', {
      className: 'flex-1 bg-discord-chat overflow-y-auto custom-scrollbar p-8',
      children: f.jsxs('div', {
        className: 'max-w-4xl mx-auto',
        children: [
          f.jsxs('div', {
            className: 'text-center mb-12',
            children: [
              f.jsx('h1', {
                className: 'text-4xl font-extrabold text-white mb-4',
                children: 'United Player Group (UPG)',
              }),
              f.jsx('p', {
                className: 'text-discord-text-muted text-lg max-w-2xl mx-auto',
                children:
                  'Somos una comunidad dedicada a unir jugadores de todas las plataformas y niveles. Nuestra misión es crear un espacio seguro, divertido y competitivo.',
              }),
            ],
          }),
          f.jsxs('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-12',
            children: [
              f.jsxs('div', {
                className:
                  'bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-discord-blurple/50 transition-colors',
                children: [
                  f.jsx('div', {
                    className:
                      'w-12 h-12 bg-discord-blurple rounded-lg flex items-center justify-center mb-4',
                    children: f.jsx(eu, { className: 'text-white', size: 28 }),
                  }),
                  f.jsx('h3', {
                    className: 'text-xl font-bold text-white mb-2',
                    children: 'Comunidad Activa',
                  }),
                  f.jsx('p', {
                    className: 'text-discord-text-muted',
                    children:
                      'Más de 5000 miembros activos participando en eventos diarios, charlas y partidas grupales.',
                  }),
                ],
              }),
              f.jsxs('div', {
                className:
                  'bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-green-500/50 transition-colors',
                children: [
                  f.jsx('div', {
                    className:
                      'w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4',
                    children: f.jsx(po, { className: 'text-white', size: 28 }),
                  }),
                  f.jsx('h3', {
                    className: 'text-xl font-bold text-white mb-2',
                    children: 'Moderación Justa',
                  }),
                  f.jsx('p', {
                    className: 'text-discord-text-muted',
                    children:
                      'Un equipo de staff dedicado 24/7 a mantener un ambiente libre de toxicidad y amigable para todos.',
                  }),
                ],
              }),
              f.jsxs('div', {
                className:
                  'bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-yellow-500/50 transition-colors',
                children: [
                  f.jsx('div', {
                    className:
                      'w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4',
                    children: f.jsx(p0, { className: 'text-white', size: 28 }),
                  }),
                  f.jsx('h3', {
                    className: 'text-xl font-bold text-white mb-2',
                    children: 'Torneos Semanales',
                  }),
                  f.jsx('p', {
                    className: 'text-discord-text-muted',
                    children:
                      'Organizamos torneos con premios reales en juegos como Valorant, League of Legends y Rocket League.',
                  }),
                ],
              }),
              f.jsxs('div', {
                className:
                  'bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-pink-500/50 transition-colors',
                children: [
                  f.jsx('div', {
                    className:
                      'w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4',
                    children: f.jsx(qy, { className: 'text-white', size: 28 }),
                  }),
                  f.jsx('h3', {
                    className: 'text-xl font-bold text-white mb-2',
                    children: 'Global',
                  }),
                  f.jsx('p', {
                    className: 'text-discord-text-muted',
                    children:
                      'Miembros de toda latinoamérica y España. ¡Siempre encontrarás a alguien con quien jugar!',
                  }),
                ],
              }),
            ],
          }),
          f.jsx('h2', {
            className: 'text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2',
            children: 'Equipo Staff',
          }),
          f.jsx('div', {
            className: 'grid grid-cols-2 md:grid-cols-4 gap-4',
            children: [
              { name: 'AdminZero', role: 'Fundador', color: 'text-red-500', img: 10 },
              { name: 'ModLuna', role: 'Admin', color: 'text-green-400', img: 20 },
              { name: 'DevKai', role: 'Developer', color: 'text-blue-400', img: 30 },
              { name: 'ComMgr', role: 'Community', color: 'text-yellow-400', img: 40 },
            ].map((c, o) =>
              f.jsxs(
                'div',
                {
                  className: 'flex items-center bg-[#2b2d31] p-3 rounded-md',
                  children: [
                    f.jsx('img', {
                      src: `https://picsum.photos/id/${c.img}/100/100`,
                      alt: c.name,
                      className: 'w-10 h-10 rounded-full mr-3',
                    }),
                    f.jsxs('div', {
                      children: [
                        f.jsx('div', {
                          className: `font-bold text-sm ${c.color}`,
                          children: c.name,
                        }),
                        f.jsx('div', {
                          className: 'text-xs text-discord-text-muted',
                          children: c.role,
                        }),
                      ],
                    }),
                  ],
                },
                o
              )
            ),
          }),
        ],
      }),
    }),
  Th = () => {
    const c = D.useRef(null);
    return (
      D.useEffect(() => {
        let o = -50,
          i = 1,
          l;
        const p = () => {
          ((o += 0.6 * i),
            o >= 40 && (i = -1),
            o <= -50 && (i = 1),
            c.current && (c.current.style.transform = `rotate(${o}deg)`),
            (l = requestAnimationFrame(p)));
        };
        return (
          p(),
          () => {
            l && cancelAnimationFrame(l);
          }
        );
      }, []),
      f.jsxs('div', {
        className: 'flex-1 flex flex-col items-center justify-center overflow-hidden w-full h-full',
        style: { backgroundColor: '#ffcc17' },
        children: [
          f.jsx('img', {
            ref: c,
            src: '/upg.png',
            alt: 'UPG Logo',
            className:
              'object-cover mb-6 md:mb-10 w-[200px] h-[200px] md:w-[400px] md:h-[400px] block',
            style: { transition: 'transform 0.1s linear' },
            onError: o => {
              o.currentTarget.style.display = 'none';
              const i = document.getElementById('logo-fallback');
              i && (i.style.display = 'flex');
            },
          }),
          f.jsx('div', {
            id: 'logo-fallback',
            ref: c,
            className:
              'hidden w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-orange-500 rounded-full items-center justify-center mb-6 md:mb-10 border-4 border-white text-white font-bold text-2xl',
            children: 'UPG',
          }),
          f.jsx('div', {
            className: 'font-black text-center text-[1.7em] md:text-[3em]',
            style: {
              color: '#ff4d0a',
              fontFamily: '"Arial Black", Arial, sans-serif',
              textShadow: '3px 3px 0px #ff9300',
              letterSpacing: '2px',
            },
            children: 'coming soon...',
          }),
          f.jsx('style', {
            children: `
        @media (min-width: 768px) {
            .coming-text {
                text-shadow: 3px 3px 0px #ff9300;
            }
        }
      `,
          }),
        ],
      })
    );
  },
  k0 = 'fc0b2a5f6669b54193a2c3db48cd26c3a4649be6e9f7b7fb958df4aa39b05402',
  S0 = ({ onUnlock: c }) => {
    const [o, i] = D.useState(''),
      [l, p] = D.useState(!1),
      [b, R] = D.useState(!1),
      M = D.useRef(null);
    D.useEffect(() => {
      let S = -50,
        A = 1,
        L;
      const H = () => {
        ((S += 0.6 * A),
          S >= 40 && (A = -1),
          S <= -50 && (A = 1),
          M.current && (M.current.style.transform = `rotate(${S}deg)`),
          (L = requestAnimationFrame(H)));
      };
      return (
        H(),
        () => {
          L && cancelAnimationFrame(L);
        }
      );
    }, []);
    const _ = async S => {
      (S.preventDefault(), p(!1), R(!0));
      try {
        const A = new TextEncoder().encode(o),
          L = await crypto.subtle.digest('SHA-256', A);
        Array.from(new Uint8Array(L))
          .map(H => H.toString(16).padStart(2, '0'))
          .join('') === k0
          ? setTimeout(() => {
              c();
            }, 500)
          : (p(!0), R(!1));
      } catch (A) {
        (console.error('Crypto error', A), p(!0), R(!1));
      }
    };
    return f.jsxs('div', {
      className:
        'fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden w-full h-full',
      style: { backgroundColor: '#ffcc17' },
      children: [
        f.jsx('img', {
          ref: M,
          src: '/upg.png',
          alt: 'UPG Logo',
          className: 'object-cover mb-8 w-[150px] h-[150px] md:w-[300px] md:h-[300px] block',
          style: { transition: 'transform 0.1s linear' },
          onError: S => {
            S.currentTarget.style.display = 'none';
          },
        }),
        f.jsx('div', {
          className: 'font-black text-center text-[2em] md:text-[3.5em] mb-8 px-4 leading-tight',
          style: {
            color: '#ff4d0a',
            fontFamily: '"Arial Black", Arial, sans-serif',
            textShadow: '3px 3px 0px #ff9300',
            letterSpacing: '1px',
          },
          children: 'WORK IN PROGRESS',
        }),
        f.jsxs('form', {
          onSubmit: _,
          className: 'w-full max-w-xs flex flex-col items-center relative z-10',
          children: [
            f.jsxs('div', {
              className: 'relative w-full',
              children: [
                f.jsx('div', {
                  className: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
                  children: f.jsx(Zy, { size: 20, className: 'text-[#ff4d0a]' }),
                }),
                f.jsx('input', {
                  type: 'password',
                  value: o,
                  onChange: S => {
                    (i(S.target.value), l && p(!1));
                  },
                  placeholder: 'Contraseña...',
                  className:
                    'block w-full pl-10 pr-3 py-3 border-4 border-[#ff4d0a] rounded-xl leading-5 bg-white placeholder-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300/50 sm:text-sm font-bold text-orange-600 shadow-lg',
                  style: { fontFamily: '"Arial Black", Arial, sans-serif' },
                }),
              ],
            }),
            l &&
              f.jsxs('div', {
                className:
                  'mt-3 flex items-center text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full animate-bounce',
                children: [
                  f.jsx(Qh, { size: 16, className: 'mr-1' }),
                  f.jsx('span', { children: 'Contraseña incorrecta' }),
                ],
              }),
            f.jsx('button', {
              type: 'submit',
              disabled: b,
              className:
                'mt-6 flex items-center justify-center px-8 py-3 border-transparent text-base font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed',
              style: { fontFamily: '"Arial Black", Arial, sans-serif' },
              'aria-label': b ? 'Verificando contraseña' : 'Acceder',
              children: b
                ? f.jsxs(f.Fragment, {
                    children: [
                      f.jsx('div', {
                        className:
                          'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2',
                      }),
                      'VERIFICANDO...',
                    ],
                  })
                : f.jsxs(f.Fragment, {
                    children: ['ACCEDER', f.jsx(My, { size: 20, className: 'ml-2' })],
                  }),
            }),
          ],
        }),
      ],
    });
  };
class Yh extends D.Component {
  constructor(o) {
    (super(o),
      (this.handleReset = () => {
        this.setState({ hasError: !1, error: null, errorInfo: null });
      }),
      (this.state = { hasError: !1, error: null, errorInfo: null }));
  }
  static getDerivedStateFromError(o) {
    return { hasError: !0, error: o, errorInfo: null };
  }
  componentDidCatch(o, i) {
    (console.error('ErrorBoundary caught an error:', o, i),
      this.setState({ error: o, errorInfo: i }));
  }
  render() {
    return this.state.hasError
      ? this.props.fallback
        ? this.props.fallback
        : f.jsx('div', {
            className: 'flex-1 flex items-center justify-center bg-discord-chat p-8',
            children: f.jsxs('div', {
              className: 'max-w-md w-full bg-[#2b2d31] rounded-lg p-6 border border-red-500/50',
              children: [
                f.jsxs('div', {
                  className: 'flex items-center mb-4',
                  children: [
                    f.jsx(Qh, { className: 'text-red-500 mr-3', size: 24 }),
                    f.jsx('h2', {
                      className: 'text-xl font-bold text-white',
                      children: 'Algo salió mal',
                    }),
                  ],
                }),
                f.jsx('p', {
                  className: 'text-discord-text-muted mb-4',
                  children: 'Ocurrió un error inesperado. Por favor, intenta recargar la página.',
                }),
                !1,
                f.jsxs('button', {
                  onClick: this.handleReset,
                  className:
                    'w-full flex items-center justify-center px-4 py-2 bg-discord-blurple hover:bg-[#4752c4] text-white rounded-md transition-colors font-medium',
                  children: [f.jsx(o0, { size: 16, className: 'mr-2' }), 'Intentar de nuevo'],
                }),
                f.jsx('button', {
                  onClick: () => window.location.reload(),
                  className:
                    'w-full mt-2 px-4 py-2 bg-discord-hover hover:bg-[#3f4147] text-discord-text-normal rounded-md transition-colors font-medium',
                  children: 'Recargar página',
                }),
              ],
            }),
          })
      : this.props.children;
  }
}
const ep = D.memo(({ activeTab: c, onTabChange: o, unreadCount: i = 0 }) =>
  f.jsx('div', {
    className:
      'fixed bottom-0 left-0 right-0 bg-discord-sidebar border-t border-gray-900/20 z-30 md:hidden safe-area-bottom',
    children: f.jsxs('div', {
      className: 'flex items-center justify-around h-16',
      children: [
        f.jsxs('button', {
          onClick: () => o('channels'),
          className: `flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative ${c === 'channels' ? 'text-white' : 'text-discord-text-muted'}`,
          'aria-label': 'Canales',
          children: [
            c === 'channels' &&
              f.jsx('div', {
                className:
                  'absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full',
              }),
            f.jsx(Kh, {
              size: 24,
              className: `transition-transform ${c === 'channels' ? 'scale-110' : ''}`,
            }),
            f.jsx('span', { className: 'text-xs mt-1 font-medium', children: 'Canales' }),
          ],
        }),
        f.jsxs('button', {
          onClick: () => o('chat'),
          className: `flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative ${c === 'chat' ? 'text-white' : 'text-discord-text-muted'}`,
          'aria-label': 'Chat',
          children: [
            c === 'chat' &&
              f.jsx('div', {
                className:
                  'absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full',
              }),
            f.jsx(Gh, {
              size: 24,
              className: `transition-transform ${c === 'chat' ? 'scale-110' : ''}`,
            }),
            f.jsx('span', { className: 'text-xs mt-1 font-medium', children: 'Chat' }),
            i > 0 &&
              f.jsx('div', {
                className:
                  'absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse',
                children: i > 9 ? '9+' : i,
              }),
          ],
        }),
        f.jsxs('button', {
          onClick: () => o('users'),
          className: `flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative ${c === 'users' ? 'text-white' : 'text-discord-text-muted'}`,
          'aria-label': 'Usuarios',
          children: [
            c === 'users' &&
              f.jsx('div', {
                className:
                  'absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full',
              }),
            f.jsx(eu, {
              size: 24,
              className: `transition-transform ${c === 'users' ? 'scale-110' : ''}`,
            }),
            f.jsx('span', { className: 'text-xs mt-1 font-medium', children: 'Usuarios' }),
          ],
        }),
      ],
    }),
  })
);
ep.displayName = 'MobileTabBar';
const N0 = 30,
  De = {
    ACCESS_TOKEN: 'upg_access_token',
    CURRENT_USER: 'upg_current_user',
    USER_ID: 'upg_user_id',
    USERNAME: 'upg_username',
    AVATAR: 'upg_avatar',
    ROLE: 'upg_role',
  };
function _0() {
  return document.cookie.split('; ').reduce((c, o) => {
    const [i, l] = o.split('=');
    return (i && l && (c[i] = l), c);
  }, {});
}
function Ua(c, o, i = N0) {
  const l = new Date();
  l.setTime(l.getTime() + i * 24 * 60 * 60 * 1e3);
  const p = `expires=${l.toUTCString()}`;
  document.cookie = `${c}=${o}; ${p}; path=/`;
}
function E0() {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
function Ma(c) {
  (Ua(De.USER_ID, c.id),
    Ua(De.USERNAME, encodeURIComponent(c.username)),
    Ua(De.AVATAR, encodeURIComponent(c.avatar)),
    Ua(De.ROLE, c.role || Vt.USER),
    localStorage.setItem(De.CURRENT_USER, JSON.stringify(c)));
}
function jh() {
  const c = _0();
  if (c[De.USERNAME] && c[De.AVATAR]) {
    const i = decodeURIComponent(c[De.USERNAME]),
      l = c[De.ROLE] || Vt.USER,
      p = l === Vt.ADMIN;
    return {
      id: c[De.USER_ID] || `user-${Date.now()}`,
      username: i,
      avatar: decodeURIComponent(c[De.AVATAR]),
      status: 'online',
      color: p ? '#ff4d0a' : '#3ba55c',
      role: l,
    };
  }
  const o = localStorage.getItem(De.CURRENT_USER);
  if (o)
    try {
      return JSON.parse(o);
    } catch (i) {
      return (console.error('Error parseando datos de usuario:', i), null);
    }
  return null;
}
function C0(c) {
  Ua(De.ROLE, c);
  const o = localStorage.getItem(De.CURRENT_USER);
  if (o)
    try {
      const i = JSON.parse(o);
      ((i.role = c),
        (i.color = c === Vt.ADMIN ? '#ff4d0a' : '#3ba55c'),
        localStorage.setItem(De.CURRENT_USER, JSON.stringify(i)));
    } catch (i) {
      console.error('Error actualizando rol en localStorage:', i);
    }
}
function T0() {
  return localStorage.getItem(De.ACCESS_TOKEN) === 'granted';
}
function j0(c) {
  localStorage.setItem(De.ACCESS_TOKEN, 'granted');
}
function Ph() {
  (localStorage.removeItem(De.ACCESS_TOKEN), localStorage.removeItem(De.CURRENT_USER), E0());
}
function P0(c, o = 50) {
  const i = D.useRef(null),
    l = D.useRef(null),
    p = o,
    b = _ => {
      ((l.current = null),
        (i.current = { x: _.targetTouches[0].clientX, y: _.targetTouches[0].clientY }));
    },
    R = _ => {
      l.current = { x: _.targetTouches[0].clientX, y: _.targetTouches[0].clientY };
    },
    M = () => {
      if (!i.current || !l.current) return;
      const _ = i.current.x - l.current.x,
        S = i.current.y - l.current.y;
      (Math.abs(_) > Math.abs(S)
        ? (_ > p && c.onSwipeLeft && c.onSwipeLeft(), _ < -p && c.onSwipeRight && c.onSwipeRight())
        : (S > p && c.onSwipeUp && c.onSwipeUp(), S < -p && c.onSwipeDown && c.onSwipeDown()),
        (i.current = null),
        (l.current = null));
    };
  return (
    D.useEffect(() => {
      const _ = document.body;
      return (
        _.addEventListener('touchstart', b, { passive: !0 }),
        _.addEventListener('touchmove', R, { passive: !0 }),
        _.addEventListener('touchend', M, { passive: !0 }),
        () => {
          (_.removeEventListener('touchstart', b),
            _.removeEventListener('touchmove', R),
            _.removeEventListener('touchend', M));
        }
      );
    }, [c]),
    null
  );
}
const Ah = {
    id: 'bot',
    username: 'UPG',
    avatar: '/upg.png',
    status: 'online',
    isBot: !0,
    color: '#5865F2',
  },
  A0 = 'https://mensajeria-ksc7.onrender.com',
  R0 = {
    transports: ['websocket', 'polling'],
    reconnection: !0,
    reconnectionDelay: 1e3,
    reconnectionAttempts: 5,
    timeout: 1e4,
  };
function O0() {
  const [c, o] = D.useState(!0),
    [i, l] = D.useState(!1),
    [p, b] = D.useState(!1),
    [R, M] = D.useState(bt.CHAT),
    [_, S] = D.useState({ id: 'general', name: 'general', description: 'Chat general' }),
    [A, L] = D.useState(() => {
      const h = jh();
      if (h && h.id && !h.username.startsWith('Guest'))
        return { ...h, online: !0, status: 'online' };
      const y = Math.floor(Math.random() * 1e4).toString(),
        P = {
          id: `guest-${y}`,
          username: `Invitado${y}`,
          avatar: `https://ui-avatars.com/api/?name=I${y.charAt(0)}&background=gray&color=fff&size=200`,
          status: 'online',
          online: !0,
          color: '#808080',
          isGuest: !0,
        };
      return (Ma(P), P);
    }),
    [H, q] = D.useState([]),
    [oe, Q] = D.useState({}),
    [se, qe] = D.useState(null),
    [Pt, je] = D.useState(!1),
    [_e, Pe] = D.useState('chat'),
    [Ve, J] = D.useState({}),
    [ke, lt] = D.useState(!1),
    Me = D.useRef(null),
    Je = 'https://mensajeria-ksc7.onrender.com';
  D.useEffect(() => {
    (async () => {
      try {
        const h = new URLSearchParams(window.location.search),
          y = h.get('auth'),
          P = h.get('error_code'),
          O = h.get('error_description');
        if (y === 'error') {
          (console.error('❌ Discord OAuth error:', P, O),
            alert(`Error de autenticación: ${decodeURIComponent(O || 'Error desconocido')}`),
            window.history.replaceState({}, document.title, '/'));
          return;
        }
        if (y === 'success') {
          (console.log('✅ Received Discord OAuth callback, fetching user from backend...'),
            window.history.replaceState({}, document.title, '/'));
          const $ = await fetch(`${Je}/auth/user`, {
            credentials: 'include',
            headers: { Accept: 'application/json' },
          });
          if ($.ok) {
            const Z = await $.json();
            console.log('✅ Discord user session found:', Z);
            const Ie = {
              id: Z.id,
              username: Z.username,
              avatar: Z.avatar
                ? `https://cdn.discordapp.com/avatars/${Z.id}/${Z.avatar}.png`
                : `https://ui-avatars.com/api/?name=${Z.username.charAt(0)}&background=5865F2&color=fff&size=200`,
              status: 'online',
              online: !0,
              color: '#5865F2',
              isGuest: !1,
            };
            (L(Ie), Ma(Ie), b(!0), console.log('✅ Usuario Discord autenticado:', Ie.username));
            return;
          }
        }
        const I = jh();
        I && I.id && !I.username.startsWith('Invitado') && !I.id.startsWith('guest-')
          ? (console.log('📦 Using cached Discord user from localStorage:', I.username),
            L(I),
            b(!0))
          : (console.log('👤 Entrando como invitado'), b(!1));
      } catch (h) {
        console.error('❌ Error checking auth:', h);
      }
    })();
  }, [Je]);
  const Ge = D.useCallback(() => {
    j0();
  }, []);
  (D.useEffect(() => {
    if (!c || !A) return;
    let h = Me.current;
    return (
      h || ((h = uo(A0, R0)), (Me.current = h), (window.socketInstance = h)),
      h.removeAllListeners(),
      h.on('connect', () => {
        (console.log('🔌 Conectado a Socket.IO - ID:', h.id),
          lt(!0),
          h.emit('user:join', { ...A, socketId: h.id }),
          h.emit('users:request'),
          h.emit('channel:join', { channelId: _.id, userId: A.id }));
      }),
      h.on('disconnect', () => {
        (console.log('⛔ Desconectado de Socket.IO'), lt(!1));
      }),
      h.on('reconnect', y => {
        (console.log(`✅ Reconectado después de ${y} intentos`),
          h.emit('user:join', { ...A, socketId: h.id }),
          h.emit('users:request'));
      }),
      h.on('users:list', y => {
        (console.log('👥 Lista de usuarios recibida:', y), A && q(y.filter(P => P.id !== A.id)));
      }),
      h.on('users:update', y => {
        (console.log('🔄 Usuarios actualizados:', y.length), A && q(y.filter(P => P.id !== A.id)));
      }),
      h.on('user:online', y => {
        (console.log('✅ Usuario online:', y.username),
          A &&
            y.id !== A.id &&
            q(P => {
              const O = P.findIndex(I => I.id === y.id);
              if (O !== -1) {
                const I = [...P];
                return ((I[O] = { ...I[O], online: !0, status: 'online' }), I);
              } else return [...P, { ...y, online: !0, status: 'online' }];
            }));
      }),
      h.on('user:offline', ({ userId: y, username: P }) => {
        (console.log('⚫ Usuario offline:', P),
          q(O => {
            const I = O.findIndex($ => $.id === y);
            if (I !== -1) {
              const $ = [...O];
              return (($[I] = { ...$[I], online: !1, status: 'offline' }), $);
            }
            return O;
          }));
      }),
      h.on('channel:history', ({ channelId: y, messages: P }) => {
        J(O => ({ ...O, [y]: P }));
      }),
      h.on('message:received', y => {
        J(P => ({ ...P, [y.channelId]: [...(P[y.channelId] || []), y] }));
      }),
      h.on('voice:update', ({ userId: y, channelName: P, action: O }) => {
        Q(I => {
          const $ = { ...I };
          return (O === 'join' && P ? ($[y] = P) : delete $[y], $);
        });
      }),
      h.on('message:deleted', ({ messageId: y, channelId: P }) => {
        J(O => ({ ...O, [P]: (O[P] || []).filter(I => I.id !== y) }));
      }),
      h.on('channel:cleared', ({ channelId: y }) => {
        J(P => ({ ...P, [y]: [] }));
      }),
      h.on('user:banned', ({ userId: y, username: P }) => {
        (console.log(`🔨 Usuario ${P} ha sido baneado`), q(O => O.filter(I => I.id !== y)));
      }),
      h.on('banned', ({ reason: y }) => {
        (alert(`Has sido baneado del servidor.
Razón: ${y}`),
          Ph(),
          window.location.reload());
      }),
      h.on('kicked', ({ reason: y }) => {
        (alert(`${y}`), window.location.reload());
      }),
      h.on('username:taken', ({ message: y }) => {
        (alert(y), Ph(), window.location.reload());
      }),
      h.on('admin:action-success', ({ action: y, message: P }) => {
        (console.log(`✅ Admin action ${y}: ${P}`), alert(`✅ ${P}`));
      }),
      h.on('admin:notification', ({ message: y }) => {
        console.log(`📢 Admin notification: ${y}`);
      }),
      h.on('admin:export-data-result', ({ data: y }) => {
        const P = new Blob([JSON.stringify(y, null, 2)], { type: 'application/json' }),
          O = URL.createObjectURL(P),
          I = document.createElement('a');
        ((I.href = O),
          (I.download = `upg-server-backup-${new Date().toISOString()}.json`),
          document.body.appendChild(I),
          I.click(),
          document.body.removeChild(I),
          URL.revokeObjectURL(O),
          alert('✅ Backup descargado correctamente'));
      }),
      h.on('server:restarting', ({ message: y }) => {
        (console.log(`🔄 ${y}`), alert(y));
      }),
      h.on('user:registered', y => {
        (console.log('✅ Registro confirmado por servidor:', y),
          L(P => ({ ...P, ...y, color: y.role === Vt.ADMIN ? '#ff4d0a' : '#3ba55c' })),
          Ma(y));
      }),
      h.on('role:updated', ({ role: y }) => {
        (L(P => {
          const O = y === Vt.ADMIN,
            I = { ...P, role: y, color: O ? '#ff4d0a' : '#3ba55c' };
          return (C0(y), Ma(I), I);
        }),
          console.log(`🛡️ Rol actualizado: ${y}`));
      }),
      h.on('connect_error', y => {
        console.error('❌ Error de conexión:', y.message);
      }),
      h.on('heartbeat:ping', () => {
        h.emit('heartbeat:pong');
      }),
      h.on('rate-limit-exceeded', ({ message: y }) => {
        console.warn('⚠️ Rate limit:', y);
      }),
      h.on('message-error', ({ message: y }) => {
        console.error('❌ Error mensaje:', y);
      }),
      () => {
        (h.removeAllListeners(),
          (!c || !A) &&
            (h.disconnect(),
            (Me.current = null),
            console.log('🔌 Socket desconectado y limpiado')));
      }
    );
  }, [c, A, _.id]),
    D.useEffect(() => {
      if (!ke || !Me.current) return;
      const h = setInterval(() => {
        var y;
        ((y = Me.current) == null || y.emit('users:request'),
          console.log('🔄 Solicitando actualización de usuarios...'));
      }, 3e4);
      return () => clearInterval(h);
    }, [ke]),
    D.useEffect(() => {
      !c ||
        !Me.current ||
        (se
          ? Me.current.emit('voice:join', { channelName: se, userId: A.id })
          : Me.current.emit('voice:leave', { channelName: null, userId: A.id }),
        Q(h => {
          const y = { ...h };
          return (se ? (y[A.id] = se) : delete y[A.id], y);
        }));
    }, [se, A, c]),
    D.useEffect(() => {
      A && Ma(A);
    }, [A]));
  const Ye = D.useMemo(() => {
      const h = new Map();
      return (
        h.set(Ah.id, Ah),
        H.forEach(y => h.set(y.id, y)),
        A && h.set(A.id, A),
        Array.from(h.values())
      );
    }, [H, A]),
    xt = D.useMemo(() => Ve[_.id] || [], [Ve, _.id]),
    et = D.useCallback(
      (h, y) => {
        (M(h),
          y &&
            y.id !== _.id &&
            (S(y),
            Me.current &&
              ke &&
              A &&
              Me.current.emit('channel:join', { channelId: y.id, userId: A.id })),
          je(!1));
      },
      [ke, A, _.id]
    ),
    C = D.useCallback(h => {
      qe(y => (y === h ? null : h));
    }, []),
    z = D.useCallback(
      h => {
        if (!Me.current || !ke || !A) {
          console.error('❌ Socket no conectado o usuario no disponible');
          return;
        }
        Me.current.emit('message:send', {
          channelId: _.id,
          content: h,
          userId: A.id,
          username: A.username,
          avatar: A.avatar,
          timestamp: new Date().toISOString(),
        });
      },
      [ke, _.id, A]
    ),
    V = D.useCallback(() => {
      je(h => !h);
    }, []);
  D.useCallback(() => {
    je(!1);
  }, []);
  const ce = D.useCallback(h => {
      Pe(h);
    }, []),
    de = D.useCallback(() => {
      window.location.href = `${Je}/auth/discord`;
    }, [Je]);
  return (
    P0({
      onSwipeLeft: () => {
        window.innerWidth < 768 && (_e === 'channels' ? Pe('chat') : _e === 'chat' && Pe('users'));
      },
      onSwipeRight: () => {
        window.innerWidth < 768 && (_e === 'users' ? Pe('chat') : _e === 'chat' && Pe('channels'));
      },
    }),
    T0()
      ? f.jsx(Yh, {
          children: f.jsxs('div', {
            className:
              'flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative',
            children: [
              f.jsxs('div', {
                className: 'hidden md:flex h-full w-full',
                children: [
                  f.jsx(Wl, { currentUser: A, setCurrentUser: L, isConnected: ke }),
                  f.jsx(_h, {
                    activeView: R,
                    currentChannelId: _.id,
                    onChannelSelect: et,
                    currentUser: A,
                    activeVoiceChannel: se,
                    onVoiceJoin: C,
                    voiceStates: oe,
                    users: Ye,
                  }),
                  f.jsxs('div', {
                    className: 'flex flex-1 min-w-0 relative',
                    children: [
                      R === bt.CHAT &&
                        f.jsxs(f.Fragment, {
                          children: [
                            f.jsx(Eh, {
                              currentUser: A,
                              users: Ye,
                              currentChannel: _,
                              onSendMessage: z,
                              messages: xt,
                              onMenuToggle: V,
                            }),
                            f.jsx(Ql, { users: Ye, currentUserId: A.id, onLoginWithDiscord: de }),
                          ],
                        }),
                      R === bt.WHO_WE_ARE && f.jsx(Ch, { onMenuToggle: V }),
                      R === bt.VOTING && f.jsx(Th, { onMenuToggle: V }),
                    ],
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex md:hidden h-full w-full flex-col relative overflow-hidden',
                style: { paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' },
                children: [
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${_e === 'channels' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex h-full w-full overflow-hidden',
                      children: [
                        f.jsx(Wl, { currentUser: A, setCurrentUser: L, isConnected: ke }),
                        f.jsx(_h, {
                          activeView: R,
                          currentChannelId: _.id,
                          onChannelSelect: (h, y) => {
                            (et(h, y), Pe('chat'));
                          },
                          currentUser: A,
                          activeVoiceChannel: se,
                          onVoiceJoin: C,
                          voiceStates: oe,
                          users: Ye,
                        }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${_e === 'chat' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex flex-1 min-w-0 relative h-full',
                      children: [
                        R === bt.CHAT &&
                          f.jsx(Eh, {
                            currentUser: A,
                            users: Ye,
                            currentChannel: _,
                            onSendMessage: z,
                            messages: xt,
                            onMenuToggle: () => Pe('channels'),
                          }),
                        R === bt.WHO_WE_ARE && f.jsx(Ch, { onMenuToggle: () => Pe('channels') }),
                        R === bt.VOTING && f.jsx(Th, { onMenuToggle: () => Pe('channels') }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${_e === 'users' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsx('div', {
                      className: 'h-full w-full overflow-hidden',
                      children: f.jsx(Ql, {
                        users: Ye,
                        currentUserId: A.id,
                        isMobileView: !0,
                        onLoginWithDiscord: de,
                      }),
                    }),
                  }),
                  f.jsx(ep, { activeTab: _e, onTabChange: ce }),
                ],
              }),
            ],
          }),
        })
      : f.jsx(S0, { onUnlock: Ge })
  );
}
const tp = document.getElementById('root');
if (!tp) throw new Error('Could not find root element to mount to');
const L0 = Mg.createRoot(tp);
L0.render(f.jsx(Tg.StrictMode, { children: f.jsx(Yh, { children: f.jsx(O0, {}) }) }));
