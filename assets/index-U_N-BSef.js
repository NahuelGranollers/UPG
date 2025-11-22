(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const h of document.querySelectorAll('link[rel="modulepreload"]')) s(h);
  new MutationObserver(h => {
    for (const x of h)
      if (x.type === 'childList')
        for (const R of x.addedNodes) R.tagName === 'LINK' && R.rel === 'modulepreload' && s(R);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(h) {
    const x = {};
    return (
      h.integrity && (x.integrity = h.integrity),
      h.referrerPolicy && (x.referrerPolicy = h.referrerPolicy),
      h.crossOrigin === 'use-credentials'
        ? (x.credentials = 'include')
        : h.crossOrigin === 'anonymous'
          ? (x.credentials = 'omit')
          : (x.credentials = 'same-origin'),
      x
    );
  }
  function s(h) {
    if (h.ep) return;
    h.ep = !0;
    const x = i(h);
    fetch(h.href, x);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver(s => {
    for (const h of s)
      if (h.type === 'childList')
        for (const x of h.addedNodes) x.tagName === 'LINK' && x.rel === 'modulepreload' && i(x);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(s) {
    const h = {};
    return (
      s.integrity && (h.integrity = s.integrity),
      s.referrerPolicy && (h.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (h.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (h.credentials = 'omit')
          : (h.credentials = 'same-origin'),
      h
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const h = o(s);
    fetch(s.href, h);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver(s => {
    for (const h of s)
      if (h.type === 'childList')
        for (const x of h.addedNodes) x.tagName === 'LINK' && x.rel === 'modulepreload' && i(x);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(s) {
    const h = {};
    return (
      s.integrity && (h.integrity = s.integrity),
      s.referrerPolicy && (h.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (h.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (h.credentials = 'omit')
          : (h.credentials = 'same-origin'),
      h
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const h = o(s);
    fetch(s.href, h);
  }
})();
function Rp(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var rp = { exports: {} },
  La = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ap;
function Ng() {
  if (ap) return La;
  ap = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.fragment');
  function i(s, h, x) {
    var R = null;
    if ((x !== void 0 && (R = '' + x), h.key !== void 0 && (R = '' + h.key), 'key' in h)) {
      x = {};
      for (var M in h) M !== 'key' && (x[M] = h[M]);
    } else x = h;
    return ((h = x.ref), { $$typeof: c, type: s, key: R, ref: h !== void 0 ? h : null, props: x });
  }
  return ((La.Fragment = o), (La.jsx = i), (La.jsxs = i), La);
}
var lp;
function Cg() {
  return (lp || ((lp = 1), (rp.exports = Ng())), rp.exports);
}
var f = Cg(),
  op = { exports: {} },
  K = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ip;
function _g() {
  if (ip) return K;
  ip = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.portal'),
    i = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    h = Symbol.for('react.profiler'),
    x = Symbol.for('react.consumer'),
    R = Symbol.for('react.context'),
    M = Symbol.for('react.forward_ref'),
    N = Symbol.for('react.suspense'),
    S = Symbol.for('react.memo'),
    P = Symbol.for('react.lazy'),
    O = Symbol.for('react.activity'),
    V = Symbol.iterator;
  function H(p) {
    return p === null || typeof p != 'object'
      ? null
      : ((p = (V && p[V]) || p['@@iterator']), typeof p == 'function' ? p : null);
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
    le = {};
  function He(p, y, A) {
    ((this.props = p), (this.context = y), (this.refs = le), (this.updater = A || oe));
  }
  ((He.prototype.isReactComponent = {}),
    (He.prototype.setState = function (p, y) {
      if (typeof p != 'object' && typeof p != 'function' && p != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, p, y, 'setState');
    }),
    (He.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, 'forceUpdate');
    }));
  function At() {}
  At.prototype = He.prototype;
  function ze(p, y, A) {
    ((this.props = p), (this.context = y), (this.refs = le), (this.updater = A || oe));
  }
  var Ne = (ze.prototype = new At());
  ((Ne.constructor = ze), Q(Ne, He.prototype), (Ne.isPureReactComponent = !0));
  var Ae = Array.isArray;
  function Be() {}
  var J = { H: null, A: null, T: null, S: null },
    ke = Object.prototype.hasOwnProperty;
  function st(p, y, A) {
    var L = A.ref;
    return { $$typeof: c, type: p, key: y, ref: L !== void 0 ? L : null, props: A };
  }
  function Me(p, y) {
    return st(p.type, y, p.props);
  }
  function Je(p) {
    return typeof p == 'object' && p !== null && p.$$typeof === c;
  }
  function Ge(p) {
    var y = { '=': '=0', ':': '=2' };
    return (
      '$' +
      p.replace(/[=:]/g, function (A) {
        return y[A];
      })
    );
  }
  var Xe = /\/+/g;
  function wt(p, y) {
    return typeof p == 'object' && p !== null && p.key != null ? Ge('' + p.key) : y.toString(36);
  }
  function et(p) {
    switch (p.status) {
      case 'fulfilled':
        return p.value;
      case 'rejected':
        throw p.reason;
      default:
        switch (
          (typeof p.status == 'string'
            ? p.then(Be, Be)
            : ((p.status = 'pending'),
              p.then(
                function (y) {
                  p.status === 'pending' && ((p.status = 'fulfilled'), (p.value = y));
                },
                function (y) {
                  p.status === 'pending' && ((p.status = 'rejected'), (p.reason = y));
                }
              )),
          p.status)
        ) {
          case 'fulfilled':
            return p.value;
          case 'rejected':
            throw p.reason;
        }
    }
    throw p;
  }
  function _(p, y, A, L, I) {
    var q = typeof p;
    (q === 'undefined' || q === 'boolean') && (p = null);
    var Z = !1;
    if (p === null) Z = !0;
    else
      switch (q) {
        case 'bigint':
        case 'string':
        case 'number':
          Z = !0;
          break;
        case 'object':
          switch (p.$$typeof) {
            case c:
            case o:
              Z = !0;
              break;
            case P:
              return ((Z = p._init), _(Z(p._payload), y, A, L, I));
          }
      }
    if (Z)
      return (
        (I = I(p)),
        (Z = L === '' ? '.' + wt(p, 0) : L),
        Ae(I)
          ? ((A = ''),
            Z != null && (A = Z.replace(Xe, '$&/') + '/'),
            _(I, y, A, '', function (Fr) {
              return Fr;
            }))
          : I != null &&
            (Je(I) &&
              (I = Me(
                I,
                A +
                  (I.key == null || (p && p.key === I.key)
                    ? ''
                    : ('' + I.key).replace(Xe, '$&/') + '/') +
                  Z
              )),
            y.push(I)),
        1
      );
    Z = 0;
    var Ie = L === '' ? '.' : L + ':';
    if (Ae(p))
      for (var Ce = 0; Ce < p.length; Ce++)
        ((L = p[Ce]), (q = Ie + wt(L, Ce)), (Z += _(L, y, A, q, I)));
    else if (((Ce = H(p)), typeof Ce == 'function'))
      for (p = Ce.call(p), Ce = 0; !(L = p.next()).done; )
        ((L = L.value), (q = Ie + wt(L, Ce++)), (Z += _(L, y, A, q, I)));
    else if (q === 'object') {
      if (typeof p.then == 'function') return _(et(p), y, A, L, I);
      throw (
        (y = String(p)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (y === '[object Object]' ? 'object with keys {' + Object.keys(p).join(', ') + '}' : y) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Z;
  }
  function T(p, y, A) {
    if (p == null) return p;
    var L = [],
      I = 0;
    return (
      _(p, L, '', '', function (q) {
        return y.call(A, q, I++);
      }),
      L
    );
  }
  function B(p) {
    if (p._status === -1) {
      var y = p._result;
      ((y = y()),
        y.then(
          function (A) {
            (p._status === 0 || p._status === -1) && ((p._status = 1), (p._result = A));
          },
          function (A) {
            (p._status === 0 || p._status === -1) && ((p._status = 2), (p._result = A));
          }
        ),
        p._status === -1 && ((p._status = 0), (p._result = y)));
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var ce =
      typeof reportError == 'function'
        ? reportError
        : function (p) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var y = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof p == 'object' && p !== null && typeof p.message == 'string'
                    ? String(p.message)
                    : String(p),
                error: p,
              });
              if (!window.dispatchEvent(y)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', p);
              return;
            }
            console.error(p);
          },
    de = {
      map: T,
      forEach: function (p, y, A) {
        T(
          p,
          function () {
            y.apply(this, arguments);
          },
          A
        );
      },
      count: function (p) {
        var y = 0;
        return (
          T(p, function () {
            y++;
          }),
          y
        );
      },
      toArray: function (p) {
        return (
          T(p, function (y) {
            return y;
          }) || []
        );
      },
      only: function (p) {
        if (!Je(p))
          throw Error('React.Children.only expected to receive a single React element child.');
        return p;
      },
    };
  return (
    (K.Activity = O),
    (K.Children = de),
    (K.Component = He),
    (K.Fragment = i),
    (K.Profiler = h),
    (K.PureComponent = ze),
    (K.StrictMode = s),
    (K.Suspense = N),
    (K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (K.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (p) {
        return J.H.useMemoCache(p);
      },
    }),
    (K.cache = function (p) {
      return function () {
        return p.apply(null, arguments);
      };
    }),
    (K.cacheSignal = function () {
      return null;
    }),
    (K.cloneElement = function (p, y, A) {
      if (p == null) throw Error('The argument must be a React element, but you passed ' + p + '.');
      var L = Q({}, p.props),
        I = p.key;
      if (y != null)
        for (q in (y.key !== void 0 && (I = '' + y.key), y))
          !ke.call(y, q) ||
            q === 'key' ||
            q === '__self' ||
            q === '__source' ||
            (q === 'ref' && y.ref === void 0) ||
            (L[q] = y[q]);
      var q = arguments.length - 2;
      if (q === 1) L.children = A;
      else if (1 < q) {
        for (var Z = Array(q), Ie = 0; Ie < q; Ie++) Z[Ie] = arguments[Ie + 2];
        L.children = Z;
      }
      return st(p.type, I, L);
    }),
    (K.createContext = function (p) {
      return (
        (p = {
          $$typeof: R,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (p.Provider = p),
        (p.Consumer = { $$typeof: x, _context: p }),
        p
      );
    }),
    (K.createElement = function (p, y, A) {
      var L,
        I = {},
        q = null;
      if (y != null)
        for (L in (y.key !== void 0 && (q = '' + y.key), y))
          ke.call(y, L) && L !== 'key' && L !== '__self' && L !== '__source' && (I[L] = y[L]);
      var Z = arguments.length - 2;
      if (Z === 1) I.children = A;
      else if (1 < Z) {
        for (var Ie = Array(Z), Ce = 0; Ce < Z; Ce++) Ie[Ce] = arguments[Ce + 2];
        I.children = Ie;
      }
      if (p && p.defaultProps)
        for (L in ((Z = p.defaultProps), Z)) I[L] === void 0 && (I[L] = Z[L]);
      return st(p, q, I);
    }),
    (K.createRef = function () {
      return { current: null };
    }),
    (K.forwardRef = function (p) {
      return { $$typeof: M, render: p };
    }),
    (K.isValidElement = Je),
    (K.lazy = function (p) {
      return { $$typeof: P, _payload: { _status: -1, _result: p }, _init: B };
    }),
    (K.memo = function (p, y) {
      return { $$typeof: S, type: p, compare: y === void 0 ? null : y };
    }),
    (K.startTransition = function (p) {
      var y = J.T,
        A = {};
      J.T = A;
      try {
        var L = p(),
          I = J.S;
        (I !== null && I(A, L),
          typeof L == 'object' && L !== null && typeof L.then == 'function' && L.then(Be, ce));
      } catch (q) {
        ce(q);
      } finally {
        (y !== null && A.types !== null && (y.types = A.types), (J.T = y));
      }
    }),
    (K.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (K.use = function (p) {
      return J.H.use(p);
    }),
    (K.useActionState = function (p, y, A) {
      return J.H.useActionState(p, y, A);
    }),
    (K.useCallback = function (p, y) {
      return J.H.useCallback(p, y);
    }),
    (K.useContext = function (p) {
      return J.H.useContext(p);
    }),
    (K.useDebugValue = function () {}),
    (K.useDeferredValue = function (p, y) {
      return J.H.useDeferredValue(p, y);
    }),
    (K.useEffect = function (p, y) {
      return J.H.useEffect(p, y);
    }),
    (K.useEffectEvent = function (p) {
      return J.H.useEffectEvent(p);
    }),
    (K.useId = function () {
      return J.H.useId();
    }),
    (K.useImperativeHandle = function (p, y, A) {
      return J.H.useImperativeHandle(p, y, A);
    }),
    (K.useInsertionEffect = function (p, y) {
      return J.H.useInsertionEffect(p, y);
    }),
    (K.useLayoutEffect = function (p, y) {
      return J.H.useLayoutEffect(p, y);
    }),
    (K.useMemo = function (p, y) {
      return J.H.useMemo(p, y);
    }),
    (K.useOptimistic = function (p, y) {
      return J.H.useOptimistic(p, y);
    }),
    (K.useReducer = function (p, y, A) {
      return J.H.useReducer(p, y, A);
    }),
    (K.useRef = function (p) {
      return J.H.useRef(p);
    }),
    (K.useState = function (p) {
      return J.H.useState(p);
    }),
    (K.useSyncExternalStore = function (p, y, A) {
      return J.H.useSyncExternalStore(p, y, A);
    }),
    (K.useTransition = function () {
      return J.H.useTransition();
    }),
    (K.version = '19.2.0'),
    K
  );
}
var sp;
function Ks() {
  return (sp || ((sp = 1), (op.exports = _g())), op.exports);
}
var U = Ks();
const jg = Rp(U);
var Ls = { exports: {} },
  Oa = {},
  up = { exports: {} },
  cp = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dp;
function zg() {
  return (
    dp ||
      ((dp = 1),
      (function (c) {
        function o(_, T) {
          var B = _.length;
          _.push(T);
          e: for (; 0 < B; ) {
            var ce = (B - 1) >>> 1,
              de = _[ce];
            if (0 < h(de, T)) ((_[ce] = T), (_[B] = de), (B = ce));
            else break e;
          }
        }
        function i(_) {
          return _.length === 0 ? null : _[0];
        }
        function s(_) {
          if (_.length === 0) return null;
          var T = _[0],
            B = _.pop();
          if (B !== T) {
            _[0] = B;
            e: for (var ce = 0, de = _.length, p = de >>> 1; ce < p; ) {
              var y = 2 * (ce + 1) - 1,
                A = _[y],
                L = y + 1,
                I = _[L];
              if (0 > h(A, B))
                L < de && 0 > h(I, A)
                  ? ((_[ce] = I), (_[L] = B), (ce = L))
                  : ((_[ce] = A), (_[y] = B), (ce = y));
              else if (L < de && 0 > h(I, B)) ((_[ce] = I), (_[L] = B), (ce = L));
              else break e;
            }
          }
          return T;
        }
        function h(_, T) {
          var B = _.sortIndex - T.sortIndex;
          return B !== 0 ? B : _.id - T.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var x = performance;
          c.unstable_now = function () {
            return x.now();
          };
        } else {
          var R = Date,
            M = R.now();
          c.unstable_now = function () {
            return R.now() - M;
          };
        }
        var N = [],
          S = [],
          P = 1,
          O = null,
          V = 3,
          H = !1,
          oe = !1,
          Q = !1,
          le = !1,
          He = typeof setTimeout == 'function' ? setTimeout : null,
          At = typeof clearTimeout == 'function' ? clearTimeout : null,
          ze = typeof setImmediate < 'u' ? setImmediate : null;
        function Ne(_) {
          for (var T = i(S); T !== null; ) {
            if (T.callback === null) s(S);
            else if (T.startTime <= _) (s(S), (T.sortIndex = T.expirationTime), o(N, T));
            else break;
            T = i(S);
          }
        }
        function Ae(_) {
          if (((Q = !1), Ne(_), !oe))
            if (i(N) !== null) ((oe = !0), Be || ((Be = !0), Ge()));
            else {
              var T = i(S);
              T !== null && et(Ae, T.startTime - _);
            }
        }
        var Be = !1,
          J = -1,
          ke = 5,
          st = -1;
        function Me() {
          return le ? !0 : !(c.unstable_now() - st < ke);
        }
        function Je() {
          if (((le = !1), Be)) {
            var _ = c.unstable_now();
            st = _;
            var T = !0;
            try {
              e: {
                ((oe = !1), Q && ((Q = !1), At(J), (J = -1)), (H = !0));
                var B = V;
                try {
                  t: {
                    for (Ne(_), O = i(N); O !== null && !(O.expirationTime > _ && Me()); ) {
                      var ce = O.callback;
                      if (typeof ce == 'function') {
                        ((O.callback = null), (V = O.priorityLevel));
                        var de = ce(O.expirationTime <= _);
                        if (((_ = c.unstable_now()), typeof de == 'function')) {
                          ((O.callback = de), Ne(_), (T = !0));
                          break t;
                        }
                        (O === i(N) && s(N), Ne(_));
                      } else s(N);
                      O = i(N);
                    }
                    if (O !== null) T = !0;
                    else {
                      var p = i(S);
                      (p !== null && et(Ae, p.startTime - _), (T = !1));
                    }
                  }
                  break e;
                } finally {
                  ((O = null), (V = B), (H = !1));
                }
                T = void 0;
              }
            } finally {
              T ? Ge() : (Be = !1);
            }
          }
        }
        var Ge;
        if (typeof ze == 'function')
          Ge = function () {
            ze(Je);
          };
        else if (typeof MessageChannel < 'u') {
          var Xe = new MessageChannel(),
            wt = Xe.port2;
          ((Xe.port1.onmessage = Je),
            (Ge = function () {
              wt.postMessage(null);
            }));
        } else
          Ge = function () {
            He(Je, 0);
          };
        function et(_, T) {
          J = He(function () {
            _(c.unstable_now());
          }, T);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (c.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ke = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return V;
          }),
          (c.unstable_next = function (_) {
            switch (V) {
              case 1:
              case 2:
              case 3:
                var T = 3;
                break;
              default:
                T = V;
            }
            var B = V;
            V = T;
            try {
              return _();
            } finally {
              V = B;
            }
          }),
          (c.unstable_requestPaint = function () {
            le = !0;
          }),
          (c.unstable_runWithPriority = function (_, T) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var B = V;
            V = _;
            try {
              return T();
            } finally {
              V = B;
            }
          }),
          (c.unstable_scheduleCallback = function (_, T, B) {
            var ce = c.unstable_now();
            switch (
              (typeof B == 'object' && B !== null
                ? ((B = B.delay), (B = typeof B == 'number' && 0 < B ? ce + B : ce))
                : (B = ce),
              _)
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
              (de = B + de),
              (_ = {
                id: P++,
                callback: T,
                priorityLevel: _,
                startTime: B,
                expirationTime: de,
                sortIndex: -1,
              }),
              B > ce
                ? ((_.sortIndex = B),
                  o(S, _),
                  i(N) === null && _ === i(S) && (Q ? (At(J), (J = -1)) : (Q = !0), et(Ae, B - ce)))
                : ((_.sortIndex = de), o(N, _), oe || H || ((oe = !0), Be || ((Be = !0), Ge()))),
              _
            );
          }),
          (c.unstable_shouldYield = Me),
          (c.unstable_wrapCallback = function (_) {
            var T = V;
            return function () {
              var B = V;
              V = T;
              try {
                return _.apply(this, arguments);
              } finally {
                V = B;
              }
            };
          }));
      })(cp)),
    cp
  );
}
var fp;
function Ag() {
  return (fp || ((fp = 1), (up.exports = zg())), up.exports);
}
var Os = { exports: {} },
  Ye = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pp;
function Pg() {
  if (pp) return Ye;
  pp = 1;
  var c = Ks();
  function o(N) {
    var S = 'https://react.dev/errors/' + N;
    if (1 < arguments.length) {
      S += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var P = 2; P < arguments.length; P++) S += '&args[]=' + encodeURIComponent(arguments[P]);
    }
    return (
      'Minified React error #' +
      N +
      '; visit ' +
      S +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function i() {}
  var s = {
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
    h = Symbol.for('react.portal');
  function x(N, S, P) {
    var O = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: O == null ? null : '' + O,
      children: N,
      containerInfo: S,
      implementation: P,
    };
  }
  var R = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(N, S) {
    if (N === 'font') return '';
    if (typeof S == 'string') return S === 'use-credentials' ? S : '';
  }
  return (
    (Ye.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Ye.createPortal = function (N, S) {
      var P = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)) throw Error(o(299));
      return x(N, S, null, P);
    }),
    (Ye.flushSync = function (N) {
      var S = R.T,
        P = s.p;
      try {
        if (((R.T = null), (s.p = 2), N)) return N();
      } finally {
        ((R.T = S), (s.p = P), s.d.f());
      }
    }),
    (Ye.preconnect = function (N, S) {
      typeof N == 'string' &&
        (S
          ? ((S = S.crossOrigin),
            (S = typeof S == 'string' ? (S === 'use-credentials' ? S : '') : void 0))
          : (S = null),
        s.d.C(N, S));
    }),
    (Ye.prefetchDNS = function (N) {
      typeof N == 'string' && s.d.D(N);
    }),
    (Ye.preinit = function (N, S) {
      if (typeof N == 'string' && S && typeof S.as == 'string') {
        var P = S.as,
          O = M(P, S.crossOrigin),
          V = typeof S.integrity == 'string' ? S.integrity : void 0,
          H = typeof S.fetchPriority == 'string' ? S.fetchPriority : void 0;
        P === 'style'
          ? s.d.S(N, typeof S.precedence == 'string' ? S.precedence : void 0, {
              crossOrigin: O,
              integrity: V,
              fetchPriority: H,
            })
          : P === 'script' &&
            s.d.X(N, {
              crossOrigin: O,
              integrity: V,
              fetchPriority: H,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
      }
    }),
    (Ye.preinitModule = function (N, S) {
      if (typeof N == 'string')
        if (typeof S == 'object' && S !== null) {
          if (S.as == null || S.as === 'script') {
            var P = M(S.as, S.crossOrigin);
            s.d.M(N, {
              crossOrigin: P,
              integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
          }
        } else S == null && s.d.M(N);
    }),
    (Ye.preload = function (N, S) {
      if (typeof N == 'string' && typeof S == 'object' && S !== null && typeof S.as == 'string') {
        var P = S.as,
          O = M(P, S.crossOrigin);
        s.d.L(N, P, {
          crossOrigin: O,
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
    (Ye.preloadModule = function (N, S) {
      if (typeof N == 'string')
        if (S) {
          var P = M(S.as, S.crossOrigin);
          s.d.m(N, {
            as: typeof S.as == 'string' && S.as !== 'script' ? S.as : void 0,
            crossOrigin: P,
            integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
          });
        } else s.d.m(N);
    }),
    (Ye.requestFormReset = function (N) {
      s.d.r(N);
    }),
    (Ye.unstable_batchedUpdates = function (N, S) {
      return N(S);
    }),
    (Ye.useFormState = function (N, S, P) {
      return R.H.useFormState(N, S, P);
    }),
    (Ye.useFormStatus = function () {
      return R.H.useHostTransitionStatus();
    }),
    (Ye.version = '19.2.0'),
    Ye
  );
}
var hp;
function Rg() {
  if (hp) return Os.exports;
  hp = 1;
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
  return (c(), (Os.exports = Pg()), Os.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mp;
function Lg() {
  if (mp) return Oa;
  mp = 1;
  var c = Ag(),
    o = Ks(),
    i = Rg();
  function s(e) {
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
  function h(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function x(e) {
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
  function N(e) {
    if (x(e) !== e) throw Error(s(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = x(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var l = a.alternate;
      if (l === null) {
        if (((r = a.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (a.child === l.child) {
        for (l = a.child; l; ) {
          if (l === n) return (N(a), e);
          if (l === r) return (N(a), t);
          l = l.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) ((n = a), (r = l));
      else {
        for (var u = !1, d = a.child; d; ) {
          if (d === n) {
            ((u = !0), (n = a), (r = l));
            break;
          }
          if (d === r) {
            ((u = !0), (r = a), (n = l));
            break;
          }
          d = d.sibling;
        }
        if (!u) {
          for (d = l.child; d; ) {
            if (d === n) {
              ((u = !0), (n = l), (r = a));
              break;
            }
            if (d === r) {
              ((u = !0), (r = l), (n = a));
              break;
            }
            d = d.sibling;
          }
          if (!u) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function P(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = P(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var O = Object.assign,
    V = Symbol.for('react.element'),
    H = Symbol.for('react.transitional.element'),
    oe = Symbol.for('react.portal'),
    Q = Symbol.for('react.fragment'),
    le = Symbol.for('react.strict_mode'),
    He = Symbol.for('react.profiler'),
    At = Symbol.for('react.consumer'),
    ze = Symbol.for('react.context'),
    Ne = Symbol.for('react.forward_ref'),
    Ae = Symbol.for('react.suspense'),
    Be = Symbol.for('react.suspense_list'),
    J = Symbol.for('react.memo'),
    ke = Symbol.for('react.lazy'),
    st = Symbol.for('react.activity'),
    Me = Symbol.for('react.memo_cache_sentinel'),
    Je = Symbol.iterator;
  function Ge(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Je && e[Je]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Xe = Symbol.for('react.client.reference');
  function wt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Xe ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Q:
        return 'Fragment';
      case He:
        return 'Profiler';
      case le:
        return 'StrictMode';
      case Ae:
        return 'Suspense';
      case Be:
        return 'SuspenseList';
      case st:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case oe:
          return 'Portal';
        case ze:
          return e.displayName || 'Context';
        case At:
          return (e._context.displayName || 'Context') + '.Consumer';
        case Ne:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case J:
          return ((t = e.displayName || null), t !== null ? t : wt(e.type) || 'Memo');
        case ke:
          ((t = e._payload), (e = e._init));
          try {
            return wt(e(t));
          } catch {}
      }
    return null;
  }
  var et = Array.isArray,
    _ = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    T = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = { pending: !1, data: null, method: null, action: null },
    ce = [],
    de = -1;
  function p(e) {
    return { current: e };
  }
  function y(e) {
    0 > de || ((e.current = ce[de]), (ce[de] = null), de--);
  }
  function A(e, t) {
    (de++, (ce[de] = e.current), (e.current = t));
  }
  var L = p(null),
    I = p(null),
    q = p(null),
    Z = p(null);
  function Ie(e, t) {
    switch ((A(q, t), A(I, e), A(L, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Cf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Cf(t)), (e = _f(t, e)));
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
    (y(L), A(L, e));
  }
  function Ce() {
    (y(L), y(I), y(q));
  }
  function Fr(e) {
    e.memoizedState !== null && A(Z, e);
    var t = L.current,
      n = _f(t, e.type);
    t !== n && (A(I, e), A(L, n));
  }
  function Ua(e) {
    (I.current === e && (y(L), y(I)), Z.current === e && (y(Z), (za._currentValue = B)));
  }
  var mo, tu;
  function Tn(e) {
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
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (E) {
                  var k = E;
                }
                Reflect.construct(e, [], z);
              } else {
                try {
                  z.call();
                } catch (E) {
                  k = E;
                }
                e.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (E) {
                k = E;
              }
              (z = e()) && typeof z.catch == 'function' && z.catch(function () {});
            }
          } catch (E) {
            if (E && k && typeof E.stack == 'string') return [E.stack, k.stack];
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
      var l = r.DetermineComponentFrameRoot(),
        u = l[0],
        d = l[1];
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
                  var C =
                    `
` + m[r].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      C.includes('<anonymous>') &&
                      (C = C.replace('<anonymous>', e.displayName)),
                    C
                  );
                }
              while (1 <= r && 0 <= a);
            break;
          }
      }
    } finally {
      ((go = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : '') ? Tn(n) : '';
  }
  function nh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Tn(e.type);
      case 16:
        return Tn('Lazy');
      case 13:
        return e.child !== t && t !== null ? Tn('Suspense Fallback') : Tn('Suspense');
      case 19:
        return Tn('SuspenseList');
      case 0:
      case 15:
        return yo(e.type, !1);
      case 11:
        return yo(e.type.render, !1);
      case 1:
        return yo(e.type, !0);
      case 31:
        return Tn('Activity');
      default:
        return '';
    }
  }
  function nu(e) {
    try {
      var t = '',
        n = null;
      do ((t += nh(e, n)), (n = e), (e = e.return));
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
    wo = c.unstable_cancelCallback,
    rh = c.unstable_shouldYield,
    ah = c.unstable_requestPaint,
    ut = c.unstable_now,
    lh = c.unstable_getCurrentPriorityLevel,
    ru = c.unstable_ImmediatePriority,
    au = c.unstable_UserBlockingPriority,
    Fa = c.unstable_NormalPriority,
    oh = c.unstable_LowPriority,
    lu = c.unstable_IdlePriority,
    ih = c.log,
    sh = c.unstable_setDisableYieldValue,
    $r = null,
    ct = null;
  function un(e) {
    if ((typeof ih == 'function' && sh(e), ct && typeof ct.setStrictMode == 'function'))
      try {
        ct.setStrictMode($r, e);
      } catch {}
  }
  var dt = Math.clz32 ? Math.clz32 : dh,
    uh = Math.log,
    ch = Math.LN2;
  function dh(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((uh(e) / ch) | 0)) | 0);
  }
  var $a = 256,
    Ha = 262144,
    Ba = 4194304;
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
  function Va(e, t, n) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var a = 0,
      l = e.suspendedLanes,
      u = e.pingedLanes;
    e = e.warmLanes;
    var d = r & 134217727;
    return (
      d !== 0
        ? ((r = d & ~l),
          r !== 0
            ? (a = Mn(r))
            : ((u &= d), u !== 0 ? (a = Mn(u)) : n || ((n = d & ~e), n !== 0 && (a = Mn(n)))))
        : ((d = r & ~l),
          d !== 0
            ? (a = Mn(d))
            : u !== 0
              ? (a = Mn(u))
              : n || ((n = r & ~e), n !== 0 && (a = Mn(n)))),
      a === 0
        ? 0
        : t !== 0 &&
            t !== a &&
            (t & l) === 0 &&
            ((l = a & -a), (n = t & -t), l >= n || (l === 32 && (n & 4194048) !== 0))
          ? t
          : a
    );
  }
  function Hr(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function fh(e, t) {
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
    var e = Ba;
    return ((Ba <<= 1), (Ba & 62914560) === 0 && (Ba = 4194304), e);
  }
  function xo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Br(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function ph(e, t, n, r, a, l) {
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
      var C = 31 - dt(n),
        z = 1 << C;
      ((d[C] = 0), (m[C] = -1));
      var k = w[C];
      if (k !== null)
        for (w[C] = null, C = 0; C < k.length; C++) {
          var E = k[C];
          E !== null && (E.lane &= -536870913);
        }
      n &= ~z;
    }
    (r !== 0 && iu(e, r, 0),
      l !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= l & ~(u & ~t)));
  }
  function iu(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var r = 31 - dt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930)));
  }
  function su(e, t) {
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
    var e = T.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Yf(e.type));
  }
  function du(e, t) {
    var n = T.p;
    try {
      return ((T.p = e), t());
    } finally {
      T.p = n;
    }
  }
  var cn = Math.random().toString(36).slice(2),
    Ve = '__reactFiber$' + cn,
    tt = '__reactProps$' + cn,
    er = '__reactContainer$' + cn,
    Eo = '__reactEvents$' + cn,
    hh = '__reactListeners$' + cn,
    mh = '__reactHandles$' + cn,
    fu = '__reactResources$' + cn,
    Vr = '__reactMarker$' + cn;
  function No(e) {
    (delete e[Ve], delete e[tt], delete e[Eo], delete e[hh], delete e[mh]);
  }
  function tr(e) {
    var t = e[Ve];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[er] || n[Ve])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Of(e); e !== null; ) {
            if ((n = e[Ve])) return n;
            e = Of(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function nr(e) {
    if ((e = e[Ve] || e[er])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function qr(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function rr(e) {
    var t = e[fu];
    return (t || (t = e[fu] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Fe(e) {
    e[Vr] = !0;
  }
  var pu = new Set(),
    hu = {};
  function In(e, t) {
    (ar(e, t), ar(e + 'Capture', t));
  }
  function ar(e, t) {
    for (hu[e] = t, e = 0; e < t.length; e++) pu.add(t[e]);
  }
  var gh = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    mu = {},
    gu = {};
  function yh(e) {
    return vo.call(gu, e)
      ? !0
      : vo.call(mu, e)
        ? !1
        : gh.test(e)
          ? (gu[e] = !0)
          : ((mu[e] = !0), !1);
  }
  function qa(e, t, n) {
    if (yh(t))
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
  function Vt(e, t, n, r) {
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
  function xt(e) {
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
  function vh(e, t, n) {
    var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof r < 'u' &&
      typeof r.get == 'function' &&
      typeof r.set == 'function'
    ) {
      var a = r.get,
        l = r.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (u) {
            ((n = '' + u), l.call(this, u));
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
  function Co(e) {
    if (!e._valueTracker) {
      var t = yu(e) ? 'checked' : 'value';
      e._valueTracker = vh(e, t, '' + e[t]);
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
  var bh = /[\n"\\]/g;
  function Pt(e) {
    return e.replace(bh, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function _o(e, t, n, r, a, l, u, d) {
    ((e.name = ''),
      u != null && typeof u != 'function' && typeof u != 'symbol' && typeof u != 'boolean'
        ? (e.type = u)
        : e.removeAttribute('type'),
      t != null
        ? u === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + xt(t))
          : e.value !== '' + xt(t) && (e.value = '' + xt(t))
        : (u !== 'submit' && u !== 'reset') || e.removeAttribute('value'),
      t != null
        ? jo(e, u, xt(t))
        : n != null
          ? jo(e, u, xt(n))
          : r != null && e.removeAttribute('value'),
      a == null && l != null && (e.defaultChecked = !!l),
      a != null && (e.checked = a && typeof a != 'function' && typeof a != 'symbol'),
      d != null && typeof d != 'function' && typeof d != 'symbol' && typeof d != 'boolean'
        ? (e.name = '' + xt(d))
        : e.removeAttribute('name'));
  }
  function bu(e, t, n, r, a, l, u, d) {
    if (
      (l != null &&
        typeof l != 'function' &&
        typeof l != 'symbol' &&
        typeof l != 'boolean' &&
        (e.type = l),
      t != null || n != null)
    ) {
      if (!((l !== 'submit' && l !== 'reset') || t != null)) {
        Co(e);
        return;
      }
      ((n = n != null ? '' + xt(n) : ''),
        (t = t != null ? '' + xt(t) : n),
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
      Co(e));
  }
  function jo(e, t, n) {
    (t === 'number' && Qa(e.ownerDocument) === e) ||
      e.defaultValue === '' + n ||
      (e.defaultValue = '' + n);
  }
  function lr(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < n.length; a++) t['$' + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        ((a = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== a && (e[n].selected = a),
          a && r && (e[n].defaultSelected = !0));
    } else {
      for (n = '' + xt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          ((e[a].selected = !0), r && (e[a].defaultSelected = !0));
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function wu(e, t, n) {
    if (t != null && ((t = '' + xt(t)), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? '' + xt(n) : '';
  }
  function xu(e, t, n, r) {
    if (t == null) {
      if (r != null) {
        if (n != null) throw Error(s(92));
        if (et(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        n = r;
      }
      (n == null && (n = ''), (t = n));
    }
    ((n = xt(t)),
      (e.defaultValue = n),
      (r = e.textContent),
      r === n && r !== '' && r !== null && (e.value = r),
      Co(e));
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
  var wh = new Set(
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
        : typeof n != 'number' || n === 0 || wh.has(t)
          ? t === 'float'
            ? (e.cssFloat = n)
            : (e[t] = ('' + n).trim())
          : (e[t] = n + 'px');
  }
  function Su(e, t, n) {
    if (t != null && typeof t != 'object') throw Error(s(62));
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
    } else for (var l in t) t.hasOwnProperty(l) && ku(e, l, t[l]);
  }
  function zo(e) {
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
  var xh = new Map([
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
    kh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ka(e) {
    return kh.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function qt() {}
  var Ao = null;
  function Po(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ir = null,
    sr = null;
  function Eu(e) {
    var t = nr(e);
    if (t && (e = t.stateNode)) {
      var n = e[tt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (_o(
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
              n = n.querySelectorAll('input[name="' + Pt('' + t) + '"][type="radio"]'), t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var a = r[tt] || null;
                if (!a) throw Error(s(90));
                _o(
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
          wu(e, n.value, n.defaultValue);
          break e;
        case 'select':
          ((t = n.value), t != null && lr(e, !!n.multiple, t, !1));
      }
    }
  }
  var Ro = !1;
  function Nu(e, t, n) {
    if (Ro) return e(t, n);
    Ro = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((Ro = !1),
        (ir !== null || sr !== null) &&
          (Tl(), ir && ((t = ir), (e = sr), (sr = ir = null), Eu(t), e)))
      )
        for (t = 0; t < e.length; t++) Eu(e[t]);
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
    if (n && typeof n != 'function') throw Error(s(231, t, typeof n));
    return n;
  }
  var Wt = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Lo = !1;
  if (Wt)
    try {
      var Qr = {};
      (Object.defineProperty(Qr, 'passive', {
        get: function () {
          Lo = !0;
        },
      }),
        window.addEventListener('test', Qr, Qr),
        window.removeEventListener('test', Qr, Qr));
    } catch {
      Lo = !1;
    }
  var dn = null,
    Oo = null,
    Ga = null;
  function Cu() {
    if (Ga) return Ga;
    var e,
      t = Oo,
      n = t.length,
      r,
      a = 'value' in dn ? dn.value : dn.textContent,
      l = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === a[l - r]; r++);
    return (Ga = a.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Ya(e) {
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
  function _u() {
    return !1;
  }
  function nt(e) {
    function t(n, r, a, l, u) {
      ((this._reactName = n),
        (this._targetInst = a),
        (this.type = r),
        (this.nativeEvent = l),
        (this.target = u),
        (this.currentTarget = null));
      for (var d in e) e.hasOwnProperty(d) && ((n = e[d]), (this[d] = n ? n(l) : l[d]));
      return (
        (this.isDefaultPrevented = (
          l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
        )
          ? Ja
          : _u),
        (this.isPropagationStopped = _u),
        this
      );
    }
    return (
      O(t.prototype, {
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
  var Dn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Za = nt(Dn),
    Kr = O({}, Dn, { view: 0, detail: 0 }),
    Sh = nt(Kr),
    To,
    Mo,
    Gr,
    Xa = O({}, Kr, {
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
      getModifierState: Do,
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
                ? ((To = e.screenX - Gr.screenX), (Mo = e.screenY - Gr.screenY))
                : (Mo = To = 0),
              (Gr = e)),
            To);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Mo;
      },
    }),
    ju = nt(Xa),
    Eh = O({}, Xa, { dataTransfer: 0 }),
    Nh = nt(Eh),
    Ch = O({}, Kr, { relatedTarget: 0 }),
    Io = nt(Ch),
    _h = O({}, Dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jh = nt(_h),
    zh = O({}, Dn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ah = nt(zh),
    Ph = O({}, Dn, { data: 0 }),
    zu = nt(Ph),
    Rh = {
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
    Lh = {
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
    Oh = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Th(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Oh[e]) ? !!t[e] : !1;
  }
  function Do() {
    return Th;
  }
  var Mh = O({}, Kr, {
      key: function (e) {
        if (e.key) {
          var t = Rh[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Ya(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Lh[e.keyCode] || 'Unidentified'
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
      getModifierState: Do,
      charCode: function (e) {
        return e.type === 'keypress' ? Ya(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Ya(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Ih = nt(Mh),
    Dh = O({}, Xa, {
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
    Au = nt(Dh),
    Uh = O({}, Kr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Do,
    }),
    Fh = nt(Uh),
    $h = O({}, Dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Hh = nt($h),
    Bh = O({}, Xa, {
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
    Vh = nt(Bh),
    qh = O({}, Dn, { newState: 0, oldState: 0 }),
    Wh = nt(qh),
    Qh = [9, 13, 27, 32],
    Uo = Wt && 'CompositionEvent' in window,
    Yr = null;
  Wt && 'documentMode' in document && (Yr = document.documentMode);
  var Kh = Wt && 'TextEvent' in window && !Yr,
    Pu = Wt && (!Uo || (Yr && 8 < Yr && 11 >= Yr)),
    Ru = ' ',
    Lu = !1;
  function Ou(e, t) {
    switch (e) {
      case 'keyup':
        return Qh.indexOf(t.keyCode) !== -1;
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
  function Tu(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var ur = !1;
  function Gh(e, t) {
    switch (e) {
      case 'compositionend':
        return Tu(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Lu = !0), Ru);
      case 'textInput':
        return ((e = t.data), e === Ru && Lu ? null : e);
      default:
        return null;
    }
  }
  function Yh(e, t) {
    if (ur)
      return e === 'compositionend' || (!Uo && Ou(e, t))
        ? ((e = Cu()), (Ga = Oo = dn = null), (ur = !1), e)
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
        return Pu && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Jh = {
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
    return t === 'input' ? !!Jh[e.type] : t === 'textarea';
  }
  function Iu(e, t, n, r) {
    (ir ? (sr ? sr.push(r) : (sr = [r])) : (ir = r),
      (t = Hl(t, 'onChange')),
      0 < t.length &&
        ((n = new Za('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
  }
  var Jr = null,
    Zr = null;
  function Zh(e) {
    wf(e, 0);
  }
  function el(e) {
    var t = qr(e);
    if (vu(t)) return e;
  }
  function Du(e, t) {
    if (e === 'change') return t;
  }
  var Uu = !1;
  if (Wt) {
    var Fo;
    if (Wt) {
      var $o = 'oninput' in document;
      if (!$o) {
        var Fu = document.createElement('div');
        (Fu.setAttribute('oninput', 'return;'), ($o = typeof Fu.oninput == 'function'));
      }
      Fo = $o;
    } else Fo = !1;
    Uu = Fo && (!document.documentMode || 9 < document.documentMode);
  }
  function $u() {
    Jr && (Jr.detachEvent('onpropertychange', Hu), (Zr = Jr = null));
  }
  function Hu(e) {
    if (e.propertyName === 'value' && el(Zr)) {
      var t = [];
      (Iu(t, Zr, e, Po(e)), Nu(Zh, t));
    }
  }
  function Xh(e, t, n) {
    e === 'focusin'
      ? ($u(), (Jr = t), (Zr = n), Jr.attachEvent('onpropertychange', Hu))
      : e === 'focusout' && $u();
  }
  function em(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return el(Zr);
  }
  function tm(e, t) {
    if (e === 'click') return el(t);
  }
  function nm(e, t) {
    if (e === 'input' || e === 'change') return el(t);
  }
  function rm(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ft = typeof Object.is == 'function' ? Object.is : rm;
  function Xr(e, t) {
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
  function Bu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Vu(e, t) {
    var n = Bu(e);
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
      n = Bu(n);
    }
  }
  function qu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? qu(e, t.parentNode)
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
  function Ho(e) {
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
    Bo = null,
    ea = null,
    Vo = !1;
  function Qu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Vo ||
      cr == null ||
      cr !== Qa(r) ||
      ((r = cr),
      'selectionStart' in r && Ho(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (ea && Xr(ea, r)) ||
        ((ea = r),
        (r = Hl(Bo, 'onSelect')),
        0 < r.length &&
          ((t = new Za('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = cr))));
  }
  function Un(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var dr = {
      animationend: Un('Animation', 'AnimationEnd'),
      animationiteration: Un('Animation', 'AnimationIteration'),
      animationstart: Un('Animation', 'AnimationStart'),
      transitionrun: Un('Transition', 'TransitionRun'),
      transitionstart: Un('Transition', 'TransitionStart'),
      transitioncancel: Un('Transition', 'TransitionCancel'),
      transitionend: Un('Transition', 'TransitionEnd'),
    },
    qo = {},
    Ku = {};
  Wt &&
    ((Ku = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete dr.animationend.animation,
      delete dr.animationiteration.animation,
      delete dr.animationstart.animation),
    'TransitionEvent' in window || delete dr.transitionend.transition);
  function Fn(e) {
    if (qo[e]) return qo[e];
    if (!dr[e]) return e;
    var t = dr[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ku) return (qo[e] = t[n]);
    return e;
  }
  var Gu = Fn('animationend'),
    Yu = Fn('animationiteration'),
    Ju = Fn('animationstart'),
    lm = Fn('transitionrun'),
    om = Fn('transitionstart'),
    im = Fn('transitioncancel'),
    Zu = Fn('transitionend'),
    Xu = new Map(),
    Wo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Wo.push('scrollEnd');
  function Rt(e, t) {
    (Xu.set(e, t), In(t, [e]));
  }
  var tl =
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
  function nl() {
    for (var e = fr, t = (Qo = fr = 0); t < e; ) {
      var n = kt[t];
      kt[t++] = null;
      var r = kt[t];
      kt[t++] = null;
      var a = kt[t];
      kt[t++] = null;
      var l = kt[t];
      if (((kt[t++] = null), r !== null && a !== null)) {
        var u = r.pending;
        (u === null ? (a.next = a) : ((a.next = u.next), (u.next = a)), (r.pending = a));
      }
      l !== 0 && ec(n, a, l);
    }
  }
  function rl(e, t, n, r) {
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
    return (rl(e, t, n, r), al(e));
  }
  function $n(e, t) {
    return (rl(e, null, null, t), al(e));
  }
  function ec(e, t, n) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n);
    for (var a = !1, l = e.return; l !== null; )
      ((l.childLanes |= n),
        (r = l.alternate),
        r !== null && (r.childLanes |= n),
        l.tag === 22 && ((e = l.stateNode), e === null || e._visibility & 1 || (a = !0)),
        (e = l),
        (l = l.return));
    return e.tag === 3
      ? ((l = e.stateNode),
        a &&
          t !== null &&
          ((a = 31 - dt(n)),
          (e = l.hiddenUpdates),
          (r = e[a]),
          r === null ? (e[a] = [t]) : r.push(t),
          (t.lane = n | 536870912)),
        l)
      : null;
  }
  function al(e) {
    if (50 < ka) throw ((ka = 0), (rs = null), Error(s(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var pr = {};
  function sm(e, t, n, r) {
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
  function pt(e, t, n, r) {
    return new sm(e, t, n, r);
  }
  function Go(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Qt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = pt(e.tag, t, e.key, e.mode)),
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
  function ll(e, t, n, r, a, l) {
    var u = 0;
    if (((r = e), typeof e == 'function')) Go(e) && (u = 1);
    else if (typeof e == 'string')
      u = pg(e, n, L.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case st:
          return ((e = pt(31, n, t, a)), (e.elementType = st), (e.lanes = l), e);
        case Q:
          return Hn(n.children, a, l, t);
        case le:
          ((u = 8), (a |= 24));
          break;
        case He:
          return ((e = pt(12, n, t, a | 2)), (e.elementType = He), (e.lanes = l), e);
        case Ae:
          return ((e = pt(13, n, t, a)), (e.elementType = Ae), (e.lanes = l), e);
        case Be:
          return ((e = pt(19, n, t, a)), (e.elementType = Be), (e.lanes = l), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case ze:
                u = 10;
                break e;
              case At:
                u = 9;
                break e;
              case Ne:
                u = 11;
                break e;
              case J:
                u = 14;
                break e;
              case ke:
                ((u = 16), (r = null));
                break e;
            }
          ((u = 29), (n = Error(s(130, e === null ? 'null' : typeof e, ''))), (r = null));
      }
    return ((t = pt(u, n, t, a)), (t.elementType = e), (t.type = r), (t.lanes = l), t);
  }
  function Hn(e, t, n, r) {
    return ((e = pt(7, e, r, t)), (e.lanes = n), e);
  }
  function Yo(e, t, n) {
    return ((e = pt(6, e, null, t)), (e.lanes = n), e);
  }
  function nc(e) {
    var t = pt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Jo(e, t, n) {
    return (
      (t = pt(4, e.children !== null ? e.children : [], e.key, t)),
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
  var hr = [],
    mr = 0,
    ol = null,
    ta = 0,
    Et = [],
    Nt = 0,
    fn = null,
    It = 1,
    Dt = '';
  function Kt(e, t) {
    ((hr[mr++] = ta), (hr[mr++] = ol), (ol = e), (ta = t));
  }
  function ac(e, t, n) {
    ((Et[Nt++] = It), (Et[Nt++] = Dt), (Et[Nt++] = fn), (fn = e));
    var r = It;
    e = Dt;
    var a = 32 - dt(r) - 1;
    ((r &= ~(1 << a)), (n += 1));
    var l = 32 - dt(t) + a;
    if (30 < l) {
      var u = a - (a % 5);
      ((l = (r & ((1 << u) - 1)).toString(32)),
        (r >>= u),
        (a -= u),
        (It = (1 << (32 - dt(t) + a)) | (n << a) | r),
        (Dt = l + e));
    } else ((It = (1 << l) | (n << a) | r), (Dt = e));
  }
  function Zo(e) {
    e.return !== null && (Kt(e, 1), ac(e, 1, 0));
  }
  function Xo(e) {
    for (; e === ol; ) ((ol = hr[--mr]), (hr[mr] = null), (ta = hr[--mr]), (hr[mr] = null));
    for (; e === fn; )
      ((fn = Et[--Nt]),
        (Et[Nt] = null),
        (Dt = Et[--Nt]),
        (Et[Nt] = null),
        (It = Et[--Nt]),
        (Et[Nt] = null));
  }
  function lc(e, t) {
    ((Et[Nt++] = It), (Et[Nt++] = Dt), (Et[Nt++] = fn), (It = t.id), (Dt = t.overflow), (fn = e));
  }
  var qe = null,
    ve = null,
    re = !1,
    pn = null,
    Ct = !1,
    ei = Error(s(519));
  function hn(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (na(St(t, e)), ei);
  }
  function oc(e) {
    var t = e.stateNode,
      n = e.type,
      r = e.memoizedProps;
    switch (((t[Ve] = e), (t[tt] = r), n)) {
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
        for (n = 0; n < Ea.length; n++) ee(Ea[n], t);
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
        (ee('invalid', t), xu(t, r.value, r.defaultValue, r.children));
    }
    ((n = r.children),
      (typeof n != 'string' && typeof n != 'number' && typeof n != 'bigint') ||
      t.textContent === '' + n ||
      r.suppressHydrationWarning === !0 ||
      Ef(t.textContent, n)
        ? (r.popover != null && (ee('beforetoggle', t), ee('toggle', t)),
          r.onScroll != null && ee('scroll', t),
          r.onScrollEnd != null && ee('scrollend', t),
          r.onClick != null && (t.onclick = qt),
          (t = !0))
        : (t = !1),
      t || hn(e, !0));
  }
  function ic(e) {
    for (qe = e.return; qe; )
      switch (qe.tag) {
        case 5:
        case 31:
        case 13:
          Ct = !1;
          return;
        case 27:
        case 3:
          Ct = !0;
          return;
        default:
          qe = qe.return;
      }
  }
  function gr(e) {
    if (e !== qe) return !1;
    if (!re) return (ic(e), (re = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type), (n = !(n !== 'form' && n !== 'button') || vs(e.type, e.memoizedProps))),
        (n = !n)),
      n && ve && hn(e),
      ic(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      ve = Lf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      ve = Lf(e);
    } else
      t === 27
        ? ((t = ve), jn(e.type) ? ((e = Ss), (Ss = null), (ve = e)) : (ve = t))
        : (ve = qe ? _t(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Bn() {
    ((ve = qe = null), (re = !1));
  }
  function ti() {
    var e = pn;
    return (e !== null && (ot === null ? (ot = e) : ot.push.apply(ot, e), (pn = null)), e);
  }
  function na(e) {
    pn === null ? (pn = [e]) : pn.push(e);
  }
  var ni = p(null),
    Vn = null,
    Gt = null;
  function mn(e, t, n) {
    (A(ni, t._currentValue), (t._currentValue = n));
  }
  function Yt(e) {
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
      var l = a.dependencies;
      if (l !== null) {
        var u = a.child;
        l = l.firstContext;
        e: for (; l !== null; ) {
          var d = l;
          l = a;
          for (var m = 0; m < t.length; m++)
            if (d.context === t[m]) {
              ((l.lanes |= n),
                (d = l.alternate),
                d !== null && (d.lanes |= n),
                ri(l.return, n, e),
                r || (u = null));
              break e;
            }
          l = d.next;
        }
      } else if (a.tag === 18) {
        if (((u = a.return), u === null)) throw Error(s(341));
        ((u.lanes |= n), (l = u.alternate), l !== null && (l.lanes |= n), ri(u, n, e), (u = null));
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
    for (var a = t, l = !1; a !== null; ) {
      if (!l) {
        if ((a.flags & 524288) !== 0) l = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var u = a.alternate;
        if (u === null) throw Error(s(387));
        if (((u = u.memoizedProps), u !== null)) {
          var d = a.type;
          ft(a.pendingProps.value, u.value) || (e !== null ? e.push(d) : (e = [d]));
        }
      } else if (a === Z.current) {
        if (((u = a.alternate), u === null)) throw Error(s(387));
        u.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
          (e !== null ? e.push(za) : (e = [za]));
      }
      a = a.return;
    }
    (e !== null && ai(t, e, n, r), (t.flags |= 262144));
  }
  function il(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ft(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function qn(e) {
    ((Vn = e), (Gt = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function We(e) {
    return sc(Vn, e);
  }
  function sl(e, t) {
    return (Vn === null && qn(e), sc(e, t));
  }
  function sc(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Gt === null)) {
      if (e === null) throw Error(s(308));
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
    Pe = {
      $$typeof: ze,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function li() {
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
        (vr = us()),
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
  function pm(e, t) {
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
  var cc = _.S;
  _.S = function (e, t) {
    ((Qd = ut()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && fm(e, t),
      cc !== null && cc(e, t));
  };
  var Wn = p(null);
  function ii() {
    var e = Wn.current;
    return e !== null ? e : ye.pooledCache;
  }
  function ul(e, t) {
    t === null ? A(Wn, Wn.current) : A(Wn, t.pool);
  }
  function dc() {
    var e = ii();
    return e === null ? null : { parent: Pe._currentValue, pool: e };
  }
  var wr = Error(s(460)),
    si = Error(s(474)),
    cl = Error(s(542)),
    dl = { then: function () {} };
  function fc(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function pc(e, t, n) {
    switch (
      ((n = e[n]), n === void 0 ? e.push(t) : n !== t && (t.then(qt, qt), (t = n)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), mc(e), e);
      default:
        if (typeof t.status == 'string') t.then(qt, qt);
        else {
          if (((e = ye), e !== null && 100 < e.shellSuspendCounter)) throw Error(s(482));
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
        throw ((Kn = t), wr);
    }
  }
  function Qn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == 'object' && typeof n.then == 'function' ? ((Kn = n), wr) : n;
    }
  }
  var Kn = null;
  function hc() {
    if (Kn === null) throw Error(s(459));
    var e = Kn;
    return ((Kn = null), e);
  }
  function mc(e) {
    if (e === wr || e === cl) throw Error(s(483));
  }
  var xr = null,
    la = 0;
  function fl(e) {
    var t = la;
    return ((la += 1), xr === null && (xr = []), pc(xr, e, t));
  }
  function oa(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function pl(e, t) {
    throw t.$$typeof === V
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function gc(e) {
    function t(v, g) {
      if (e) {
        var b = v.deletions;
        b === null ? ((v.deletions = [g]), (v.flags |= 16)) : b.push(g);
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
    function l(v, g, b) {
      return (
        (v.index = b),
        e
          ? ((b = v.alternate),
            b !== null
              ? ((b = b.index), b < g ? ((v.flags |= 67108866), g) : b)
              : ((v.flags |= 67108866), g))
          : ((v.flags |= 1048576), g)
      );
    }
    function u(v) {
      return (e && v.alternate === null && (v.flags |= 67108866), v);
    }
    function d(v, g, b, j) {
      return g === null || g.tag !== 6
        ? ((g = Yo(b, v.mode, j)), (g.return = v), g)
        : ((g = a(g, b)), (g.return = v), g);
    }
    function m(v, g, b, j) {
      var $ = b.type;
      return $ === Q
        ? C(v, g, b.props.children, j, b.key)
        : g !== null &&
            (g.elementType === $ ||
              (typeof $ == 'object' && $ !== null && $.$$typeof === ke && Qn($) === g.type))
          ? ((g = a(g, b.props)), oa(g, b), (g.return = v), g)
          : ((g = ll(b.type, b.key, b.props, null, v.mode, j)), oa(g, b), (g.return = v), g);
    }
    function w(v, g, b, j) {
      return g === null ||
        g.tag !== 4 ||
        g.stateNode.containerInfo !== b.containerInfo ||
        g.stateNode.implementation !== b.implementation
        ? ((g = Jo(b, v.mode, j)), (g.return = v), g)
        : ((g = a(g, b.children || [])), (g.return = v), g);
    }
    function C(v, g, b, j, $) {
      return g === null || g.tag !== 7
        ? ((g = Hn(b, v.mode, j, $)), (g.return = v), g)
        : ((g = a(g, b)), (g.return = v), g);
    }
    function z(v, g, b) {
      if ((typeof g == 'string' && g !== '') || typeof g == 'number' || typeof g == 'bigint')
        return ((g = Yo('' + g, v.mode, b)), (g.return = v), g);
      if (typeof g == 'object' && g !== null) {
        switch (g.$$typeof) {
          case H:
            return ((b = ll(g.type, g.key, g.props, null, v.mode, b)), oa(b, g), (b.return = v), b);
          case oe:
            return ((g = Jo(g, v.mode, b)), (g.return = v), g);
          case ke:
            return ((g = Qn(g)), z(v, g, b));
        }
        if (et(g) || Ge(g)) return ((g = Hn(g, v.mode, b, null)), (g.return = v), g);
        if (typeof g.then == 'function') return z(v, fl(g), b);
        if (g.$$typeof === ze) return z(v, sl(v, g), b);
        pl(v, g);
      }
      return null;
    }
    function k(v, g, b, j) {
      var $ = g !== null ? g.key : null;
      if ((typeof b == 'string' && b !== '') || typeof b == 'number' || typeof b == 'bigint')
        return $ !== null ? null : d(v, g, '' + b, j);
      if (typeof b == 'object' && b !== null) {
        switch (b.$$typeof) {
          case H:
            return b.key === $ ? m(v, g, b, j) : null;
          case oe:
            return b.key === $ ? w(v, g, b, j) : null;
          case ke:
            return ((b = Qn(b)), k(v, g, b, j));
        }
        if (et(b) || Ge(b)) return $ !== null ? null : C(v, g, b, j, null);
        if (typeof b.then == 'function') return k(v, g, fl(b), j);
        if (b.$$typeof === ze) return k(v, g, sl(v, b), j);
        pl(v, b);
      }
      return null;
    }
    function E(v, g, b, j, $) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((v = v.get(b) || null), d(g, v, '' + j, $));
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case H:
            return ((v = v.get(j.key === null ? b : j.key) || null), m(g, v, j, $));
          case oe:
            return ((v = v.get(j.key === null ? b : j.key) || null), w(g, v, j, $));
          case ke:
            return ((j = Qn(j)), E(v, g, b, j, $));
        }
        if (et(j) || Ge(j)) return ((v = v.get(b) || null), C(g, v, j, $, null));
        if (typeof j.then == 'function') return E(v, g, b, fl(j), $);
        if (j.$$typeof === ze) return E(v, g, b, sl(g, j), $);
        pl(g, j);
      }
      return null;
    }
    function D(v, g, b, j) {
      for (
        var $ = null, ie = null, F = g, Y = (g = 0), ne = null;
        F !== null && Y < b.length;
        Y++
      ) {
        F.index > Y ? ((ne = F), (F = null)) : (ne = F.sibling);
        var se = k(v, F, b[Y], j);
        if (se === null) {
          F === null && (F = ne);
          break;
        }
        (e && F && se.alternate === null && t(v, F),
          (g = l(se, g, Y)),
          ie === null ? ($ = se) : (ie.sibling = se),
          (ie = se),
          (F = ne));
      }
      if (Y === b.length) return (n(v, F), re && Kt(v, Y), $);
      if (F === null) {
        for (; Y < b.length; Y++)
          ((F = z(v, b[Y], j)),
            F !== null && ((g = l(F, g, Y)), ie === null ? ($ = F) : (ie.sibling = F), (ie = F)));
        return (re && Kt(v, Y), $);
      }
      for (F = r(F); Y < b.length; Y++)
        ((ne = E(F, v, Y, b[Y], j)),
          ne !== null &&
            (e && ne.alternate !== null && F.delete(ne.key === null ? Y : ne.key),
            (g = l(ne, g, Y)),
            ie === null ? ($ = ne) : (ie.sibling = ne),
            (ie = ne)));
      return (
        e &&
          F.forEach(function (Ln) {
            return t(v, Ln);
          }),
        re && Kt(v, Y),
        $
      );
    }
    function W(v, g, b, j) {
      if (b == null) throw Error(s(151));
      for (
        var $ = null, ie = null, F = g, Y = (g = 0), ne = null, se = b.next();
        F !== null && !se.done;
        Y++, se = b.next()
      ) {
        F.index > Y ? ((ne = F), (F = null)) : (ne = F.sibling);
        var Ln = k(v, F, se.value, j);
        if (Ln === null) {
          F === null && (F = ne);
          break;
        }
        (e && F && Ln.alternate === null && t(v, F),
          (g = l(Ln, g, Y)),
          ie === null ? ($ = Ln) : (ie.sibling = Ln),
          (ie = Ln),
          (F = ne));
      }
      if (se.done) return (n(v, F), re && Kt(v, Y), $);
      if (F === null) {
        for (; !se.done; Y++, se = b.next())
          ((se = z(v, se.value, j)),
            se !== null &&
              ((g = l(se, g, Y)), ie === null ? ($ = se) : (ie.sibling = se), (ie = se)));
        return (re && Kt(v, Y), $);
      }
      for (F = r(F); !se.done; Y++, se = b.next())
        ((se = E(F, v, Y, se.value, j)),
          se !== null &&
            (e && se.alternate !== null && F.delete(se.key === null ? Y : se.key),
            (g = l(se, g, Y)),
            ie === null ? ($ = se) : (ie.sibling = se),
            (ie = se)));
      return (
        e &&
          F.forEach(function (Eg) {
            return t(v, Eg);
          }),
        re && Kt(v, Y),
        $
      );
    }
    function ge(v, g, b, j) {
      if (
        (typeof b == 'object' &&
          b !== null &&
          b.type === Q &&
          b.key === null &&
          (b = b.props.children),
        typeof b == 'object' && b !== null)
      ) {
        switch (b.$$typeof) {
          case H:
            e: {
              for (var $ = b.key; g !== null; ) {
                if (g.key === $) {
                  if ((($ = b.type), $ === Q)) {
                    if (g.tag === 7) {
                      (n(v, g.sibling), (j = a(g, b.props.children)), (j.return = v), (v = j));
                      break e;
                    }
                  } else if (
                    g.elementType === $ ||
                    (typeof $ == 'object' && $ !== null && $.$$typeof === ke && Qn($) === g.type)
                  ) {
                    (n(v, g.sibling), (j = a(g, b.props)), oa(j, b), (j.return = v), (v = j));
                    break e;
                  }
                  n(v, g);
                  break;
                } else t(v, g);
                g = g.sibling;
              }
              b.type === Q
                ? ((j = Hn(b.props.children, v.mode, j, b.key)), (j.return = v), (v = j))
                : ((j = ll(b.type, b.key, b.props, null, v.mode, j)),
                  oa(j, b),
                  (j.return = v),
                  (v = j));
            }
            return u(v);
          case oe:
            e: {
              for ($ = b.key; g !== null; ) {
                if (g.key === $)
                  if (
                    g.tag === 4 &&
                    g.stateNode.containerInfo === b.containerInfo &&
                    g.stateNode.implementation === b.implementation
                  ) {
                    (n(v, g.sibling), (j = a(g, b.children || [])), (j.return = v), (v = j));
                    break e;
                  } else {
                    n(v, g);
                    break;
                  }
                else t(v, g);
                g = g.sibling;
              }
              ((j = Jo(b, v.mode, j)), (j.return = v), (v = j));
            }
            return u(v);
          case ke:
            return ((b = Qn(b)), ge(v, g, b, j));
        }
        if (et(b)) return D(v, g, b, j);
        if (Ge(b)) {
          if ((($ = Ge(b)), typeof $ != 'function')) throw Error(s(150));
          return ((b = $.call(b)), W(v, g, b, j));
        }
        if (typeof b.then == 'function') return ge(v, g, fl(b), j);
        if (b.$$typeof === ze) return ge(v, g, sl(v, b), j);
        pl(v, b);
      }
      return (typeof b == 'string' && b !== '') || typeof b == 'number' || typeof b == 'bigint'
        ? ((b = '' + b),
          g !== null && g.tag === 6
            ? (n(v, g.sibling), (j = a(g, b)), (j.return = v), (v = j))
            : (n(v, g), (j = Yo(b, v.mode, j)), (j.return = v), (v = j)),
          u(v))
        : n(v, g);
    }
    return function (v, g, b, j) {
      try {
        la = 0;
        var $ = ge(v, g, b, j);
        return ((xr = null), $);
      } catch (F) {
        if (F === wr || F === cl) throw F;
        var ie = pt(29, F, null, v.mode);
        return ((ie.lanes = j), (ie.return = v), ie);
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
        (t = al(e)),
        ec(e, null, n),
        t
      );
    }
    return (rl(e, r, t, n), al(e));
  }
  function ia(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), su(e, n));
    }
  }
  function di(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var a = null,
        l = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var u = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
          (l === null ? (a = l = u) : (l = l.next = u), (n = n.next));
        } while (n !== null);
        l === null ? (a = l = t) : (l = l.next = t);
      } else a = l = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: l,
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
  function sa() {
    if (fi) {
      var e = br;
      if (e !== null) throw e;
    }
  }
  function ua(e, t, n, r) {
    fi = !1;
    var a = e.updateQueue;
    gn = !1;
    var l = a.firstBaseUpdate,
      u = a.lastBaseUpdate,
      d = a.shared.pending;
    if (d !== null) {
      a.shared.pending = null;
      var m = d,
        w = m.next;
      ((m.next = null), u === null ? (l = w) : (u.next = w), (u = m));
      var C = e.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (d = C.lastBaseUpdate),
        d !== u && (d === null ? (C.firstBaseUpdate = w) : (d.next = w), (C.lastBaseUpdate = m)));
    }
    if (l !== null) {
      var z = a.baseState;
      ((u = 0), (C = w = m = null), (d = l));
      do {
        var k = d.lane & -536870913,
          E = k !== d.lane;
        if (E ? (te & k) === k : (r & k) === k) {
          (k !== 0 && k === vr && (fi = !0),
            C !== null &&
              (C = C.next =
                { lane: 0, tag: d.tag, payload: d.payload, callback: null, next: null }));
          e: {
            var D = e,
              W = d;
            k = t;
            var ge = n;
            switch (W.tag) {
              case 1:
                if (((D = W.payload), typeof D == 'function')) {
                  z = D.call(ge, z, k);
                  break e;
                }
                z = D;
                break e;
              case 3:
                D.flags = (D.flags & -65537) | 128;
              case 0:
                if (
                  ((D = W.payload), (k = typeof D == 'function' ? D.call(ge, z, k) : D), k == null)
                )
                  break e;
                z = O({}, z, k);
                break e;
              case 2:
                gn = !0;
            }
          }
          ((k = d.callback),
            k !== null &&
              ((e.flags |= 64),
              E && (e.flags |= 8192),
              (E = a.callbacks),
              E === null ? (a.callbacks = [k]) : E.push(k)));
        } else
          ((E = { lane: k, tag: d.tag, payload: d.payload, callback: d.callback, next: null }),
            C === null ? ((w = C = E), (m = z)) : (C = C.next = E),
            (u |= k));
        if (((d = d.next), d === null)) {
          if (((d = a.shared.pending), d === null)) break;
          ((E = d),
            (d = E.next),
            (E.next = null),
            (a.lastBaseUpdate = E),
            (a.shared.pending = null));
        }
      } while (!0);
      (C === null && (m = z),
        (a.baseState = m),
        (a.firstBaseUpdate = w),
        (a.lastBaseUpdate = C),
        l === null && (a.shared.lanes = 0),
        (Sn |= u),
        (e.lanes = u),
        (e.memoizedState = z));
    }
  }
  function vc(e, t) {
    if (typeof e != 'function') throw Error(s(191, e));
    e.call(t);
  }
  function bc(e, t) {
    var n = e.callbacks;
    if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) vc(n[e], t);
  }
  var kr = p(null),
    hl = p(0);
  function wc(e, t) {
    ((e = ln), A(hl, e), A(kr, t), (ln = e | t.baseLanes));
  }
  function pi() {
    (A(hl, ln), A(kr, kr.current));
  }
  function hi() {
    ((ln = hl.current), y(kr), y(hl));
  }
  var ht = p(null),
    Lt = null;
  function bn(e) {
    var t = e.alternate;
    (A(_e, _e.current & 1),
      A(ht, e),
      Lt === null && (t === null || kr.current !== null || t.memoizedState !== null) && (Lt = e));
  }
  function mi(e) {
    (A(_e, _e.current), A(ht, e), Lt === null && (Lt = e));
  }
  function xc(e) {
    e.tag === 22 ? (A(_e, _e.current), A(ht, e), Lt === null && (Lt = e)) : wn();
  }
  function wn() {
    (A(_e, _e.current), A(ht, ht.current));
  }
  function mt(e) {
    (y(ht), Lt === e && (Lt = null), y(_e));
  }
  var _e = p(0);
  function ml(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || xs(n) || ks(n))) return t;
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
    he = null,
    Re = null,
    gl = !1,
    Sr = !1,
    Yn = !1,
    yl = 0,
    ca = 0,
    Er = null,
    hm = 0;
  function Se() {
    throw Error(s(321));
  }
  function gi(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!ft(e[n], t[n])) return !1;
    return !0;
  }
  function yi(e, t, n, r, a, l) {
    return (
      (Jt = l),
      (G = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? ad : Ri),
      (Yn = !1),
      (l = n(r, a)),
      (Yn = !1),
      Sr && (l = Sc(t, n, r, a)),
      kc(e),
      l
    );
  }
  function kc(e) {
    _.H = pa;
    var t = he !== null && he.next !== null;
    if (((Jt = 0), (Re = he = G = null), (gl = !1), (ca = 0), (Er = null), t)) throw Error(s(300));
    e === null || Le || ((e = e.dependencies), e !== null && il(e) && (Le = !0));
  }
  function Sc(e, t, n, r) {
    G = e;
    var a = 0;
    do {
      if ((Sr && (Er = null), (ca = 0), (Sr = !1), 25 <= a)) throw Error(s(301));
      if (((a += 1), (Re = he = null), e.updateQueue != null)) {
        var l = e.updateQueue;
        ((l.lastEffect = null),
          (l.events = null),
          (l.stores = null),
          l.memoCache != null && (l.memoCache.index = 0));
      }
      ((_.H = ld), (l = t(n, r)));
    } while (Sr);
    return l;
  }
  function mm() {
    var e = _.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? da(t) : t),
      (e = e.useState()[0]),
      (he !== null ? he.memoizedState : null) !== e && (G.flags |= 1024),
      t
    );
  }
  function vi() {
    var e = yl !== 0;
    return ((yl = 0), e);
  }
  function bi(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function wi(e) {
    if (gl) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      gl = !1;
    }
    ((Jt = 0), (Re = he = G = null), (Sr = !1), (ca = yl = 0), (Er = null));
  }
  function Ze() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Re === null ? (G.memoizedState = Re = e) : (Re = Re.next = e), Re);
  }
  function je() {
    if (he === null) {
      var e = G.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = he.next;
    var t = Re === null ? G.memoizedState : Re.next;
    if (t !== null) ((Re = t), (he = e));
    else {
      if (e === null) throw G.alternate === null ? Error(s(467)) : Error(s(310));
      ((he = e),
        (e = {
          memoizedState: he.memoizedState,
          baseState: he.baseState,
          baseQueue: he.baseQueue,
          queue: he.queue,
          next: null,
        }),
        Re === null ? (G.memoizedState = Re = e) : (Re = Re.next = e));
    }
    return Re;
  }
  function vl() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function da(e) {
    var t = ca;
    return (
      (ca += 1),
      Er === null && (Er = []),
      (e = pc(Er, e, t)),
      (t = G),
      (Re === null ? t.memoizedState : Re.next) === null &&
        ((t = t.alternate), (_.H = t === null || t.memoizedState === null ? ad : Ri)),
      e
    );
  }
  function bl(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return da(e);
      if (e.$$typeof === ze) return We(e);
    }
    throw Error(s(438, String(e)));
  }
  function xi(e) {
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
      n === null && ((n = vl()), (G.updateQueue = n)),
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
  function wl(e) {
    var t = je();
    return ki(t, he, e);
  }
  function ki(e, t, n) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = n;
    var a = e.baseQueue,
      l = r.pending;
    if (l !== null) {
      if (a !== null) {
        var u = a.next;
        ((a.next = l.next), (l.next = u));
      }
      ((t.baseQueue = a = l), (r.pending = null));
    }
    if (((l = e.baseState), a === null)) e.memoizedState = l;
    else {
      t = a.next;
      var d = (u = null),
        m = null,
        w = t,
        C = !1;
      do {
        var z = w.lane & -536870913;
        if (z !== w.lane ? (te & z) === z : (Jt & z) === z) {
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
              z === vr && (C = !0));
          else if ((Jt & k) === k) {
            ((w = w.next), k === vr && (C = !0));
            continue;
          } else
            ((z = {
              lane: 0,
              revertLane: w.revertLane,
              gesture: null,
              action: w.action,
              hasEagerState: w.hasEagerState,
              eagerState: w.eagerState,
              next: null,
            }),
              m === null ? ((d = m = z), (u = l)) : (m = m.next = z),
              (G.lanes |= k),
              (Sn |= k));
          ((z = w.action), Yn && n(l, z), (l = w.hasEagerState ? w.eagerState : n(l, z)));
        } else
          ((k = {
            lane: z,
            revertLane: w.revertLane,
            gesture: w.gesture,
            action: w.action,
            hasEagerState: w.hasEagerState,
            eagerState: w.eagerState,
            next: null,
          }),
            m === null ? ((d = m = k), (u = l)) : (m = m.next = k),
            (G.lanes |= z),
            (Sn |= z));
        w = w.next;
      } while (w !== null && w !== t);
      if (
        (m === null ? (u = l) : (m.next = d),
        !ft(l, e.memoizedState) && ((Le = !0), C && ((n = br), n !== null)))
      )
        throw n;
      ((e.memoizedState = l), (e.baseState = u), (e.baseQueue = m), (r.lastRenderedState = l));
    }
    return (a === null && (r.lanes = 0), [e.memoizedState, r.dispatch]);
  }
  function Si(e) {
    var t = je(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      a = n.pending,
      l = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var u = (a = a.next);
      do ((l = e(l, u.action)), (u = u.next));
      while (u !== a);
      (ft(l, t.memoizedState) || (Le = !0),
        (t.memoizedState = l),
        t.baseQueue === null && (t.baseState = l),
        (n.lastRenderedState = l));
    }
    return [l, r];
  }
  function Ec(e, t, n) {
    var r = G,
      a = je(),
      l = re;
    if (l) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else n = t();
    var u = !ft((he || a).memoizedState, n);
    if (
      (u && ((a.memoizedState = n), (Le = !0)),
      (a = a.queue),
      Ci(_c.bind(null, r, a, e), [e]),
      a.getSnapshot !== t || u || (Re !== null && Re.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Nr(9, { destroy: void 0 }, Cc.bind(null, r, a, n, t), null),
        ye === null)
      )
        throw Error(s(349));
      l || (Jt & 127) !== 0 || Nc(r, t, n);
    }
    return n;
  }
  function Nc(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = G.updateQueue),
      t === null
        ? ((t = vl()), (G.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Cc(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), jc(t) && zc(e));
  }
  function _c(e, t, n) {
    return n(function () {
      jc(t) && zc(e);
    });
  }
  function jc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ft(e, n);
    } catch {
      return !0;
    }
  }
  function zc(e) {
    var t = $n(e, 2);
    t !== null && it(t, e, 2);
  }
  function Ei(e) {
    var t = Ze();
    if (typeof e == 'function') {
      var n = e;
      if (((e = n()), Yn)) {
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
  function Ac(e, t, n, r) {
    return ((e.baseState = n), ki(e, he, typeof r == 'function' ? r : Zt));
  }
  function gm(e, t, n, r, a) {
    if (Sl(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var l = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (u) {
          l.listeners.push(u);
        },
      };
      (_.T !== null ? n(!0) : (l.isTransition = !1),
        r(l),
        (n = t.pending),
        n === null
          ? ((l.next = t.pending = l), Pc(t, l))
          : ((l.next = n.next), (t.pending = n.next = l)));
    }
  }
  function Pc(e, t) {
    var n = t.action,
      r = t.payload,
      a = e.state;
    if (t.isTransition) {
      var l = _.T,
        u = {};
      _.T = u;
      try {
        var d = n(a, r),
          m = _.S;
        (m !== null && m(u, d), Rc(e, t, d));
      } catch (w) {
        Ni(e, t, w);
      } finally {
        (l !== null && u.types !== null && (l.types = u.types), (_.T = l));
      }
    } else
      try {
        ((l = n(a, r)), Rc(e, t, l));
      } catch (w) {
        Ni(e, t, w);
      }
  }
  function Rc(e, t, n) {
    n !== null && typeof n == 'object' && typeof n.then == 'function'
      ? n.then(
          function (r) {
            Lc(e, t, r);
          },
          function (r) {
            return Ni(e, t, r);
          }
        )
      : Lc(e, t, n);
  }
  function Lc(e, t, n) {
    ((t.status = 'fulfilled'),
      (t.value = n),
      Oc(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next), n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Pc(e, n))));
  }
  function Ni(e, t, n) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do ((t.status = 'rejected'), (t.reason = n), Oc(t), (t = t.next));
      while (t !== r);
    }
    e.action = null;
  }
  function Oc(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Tc(e, t) {
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
                for (var a = ve, l = Ct; a.nodeType !== 8; ) {
                  if (!l) {
                    a = null;
                    break t;
                  }
                  if (((a = _t(a.nextSibling)), a === null)) {
                    a = null;
                    break t;
                  }
                }
                ((l = a.data), (a = l === 'F!' || l === 'F' ? a : null));
              }
              if (a) {
                ((ve = _t(a.nextSibling)), (r = a.data === 'F!'));
                break e;
              }
            }
            hn(r);
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
        lastRenderedReducer: Tc,
        lastRenderedState: t,
      }),
      (n.queue = r),
      (n = td.bind(null, G, r)),
      (r.dispatch = n),
      (r = Ei(!1)),
      (l = Pi.bind(null, G, !1, r.queue)),
      (r = Ze()),
      (a = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = a),
      (n = gm.bind(null, G, a, l, n)),
      (a.dispatch = n),
      (r.memoizedState = e),
      [t, n, !1]
    );
  }
  function Ic(e) {
    var t = je();
    return Dc(t, he, e);
  }
  function Dc(e, t, n) {
    if (
      ((t = ki(e, t, Tc)[0]),
      (e = wl(Zt)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var r = da(t);
      } catch (u) {
        throw u === wr ? cl : u;
      }
    else r = t;
    t = je();
    var a = t.queue,
      l = a.dispatch;
    return (
      n !== t.memoizedState &&
        ((G.flags |= 2048), Nr(9, { destroy: void 0 }, ym.bind(null, a, n), null)),
      [r, l, e]
    );
  }
  function ym(e, t) {
    e.action = t;
  }
  function Uc(e) {
    var t = je(),
      n = he;
    if (n !== null) return Dc(t, n, e);
    (je(), (t = t.memoizedState), (n = je()));
    var r = n.queue.dispatch;
    return ((n.memoizedState = e), [t, r, !1]);
  }
  function Nr(e, t, n, r) {
    return (
      (e = { tag: e, create: n, deps: r, inst: t, next: null }),
      (t = G.updateQueue),
      t === null && ((t = vl()), (G.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Fc() {
    return je().memoizedState;
  }
  function xl(e, t, n, r) {
    var a = Ze();
    ((G.flags |= e),
      (a.memoizedState = Nr(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r)));
  }
  function kl(e, t, n, r) {
    var a = je();
    r = r === void 0 ? null : r;
    var l = a.memoizedState.inst;
    he !== null && r !== null && gi(r, he.memoizedState.deps)
      ? (a.memoizedState = Nr(t, l, n, r))
      : ((G.flags |= e), (a.memoizedState = Nr(1 | t, l, n, r)));
  }
  function $c(e, t) {
    xl(8390656, 8, e, t);
  }
  function Ci(e, t) {
    kl(2048, 8, e, t);
  }
  function vm(e) {
    G.flags |= 4;
    var t = G.updateQueue;
    if (t === null) ((t = vl()), (G.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Hc(e) {
    var t = je().memoizedState;
    return (
      vm({ ref: t, nextImpl: e }),
      function () {
        if ((ue & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Bc(e, t) {
    return kl(4, 2, e, t);
  }
  function Vc(e, t) {
    return kl(4, 4, e, t);
  }
  function qc(e, t) {
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
    ((n = n != null ? n.concat([e]) : null), kl(4, 4, qc.bind(null, t, e), n));
  }
  function _i() {}
  function Qc(e, t) {
    var n = je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return t !== null && gi(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Kc(e, t) {
    var n = je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    if (t !== null && gi(t, r[1])) return r[0];
    if (((r = e()), Yn)) {
      un(!0);
      try {
        e();
      } finally {
        un(!1);
      }
    }
    return ((n.memoizedState = [r, t]), r);
  }
  function ji(e, t, n) {
    return n === void 0 || ((Jt & 1073741824) !== 0 && (te & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Gd()), (G.lanes |= e), (Sn |= e), n);
  }
  function Gc(e, t, n, r) {
    return ft(n, t)
      ? n
      : kr.current !== null
        ? ((e = ji(e, n, r)), ft(e, t) || (Le = !0), e)
        : (Jt & 42) === 0 || ((Jt & 1073741824) !== 0 && (te & 261930) === 0)
          ? ((Le = !0), (e.memoizedState = n))
          : ((e = Gd()), (G.lanes |= e), (Sn |= e), t);
  }
  function Yc(e, t, n, r, a) {
    var l = T.p;
    T.p = l !== 0 && 8 > l ? l : 8;
    var u = _.T,
      d = {};
    ((_.T = d), Pi(e, !1, t, n));
    try {
      var m = a(),
        w = _.S;
      if (
        (w !== null && w(d, m), m !== null && typeof m == 'object' && typeof m.then == 'function')
      ) {
        var C = pm(m, r);
        fa(e, t, C, vt(e));
      } else fa(e, t, r, vt(e));
    } catch (z) {
      fa(e, t, { then: function () {}, status: 'rejected', reason: z }, vt());
    } finally {
      ((T.p = l), u !== null && d.types !== null && (u.types = d.types), (_.T = u));
    }
  }
  function bm() {}
  function zi(e, t, n, r) {
    if (e.tag !== 5) throw Error(s(476));
    var a = Jc(e).queue;
    Yc(
      e,
      a,
      t,
      B,
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
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: B,
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
  function Ai() {
    return We(za);
  }
  function Xc() {
    return je().memoizedState;
  }
  function ed() {
    return je().memoizedState;
  }
  function wm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = vt();
          e = yn(n);
          var r = vn(t, e, n);
          (r !== null && (it(r, t, n), ia(r, t, n)), (t = { cache: li() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function xm(e, t, n) {
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
      Sl(e) ? nd(t, n) : ((n = Ko(e, t, n, r)), n !== null && (it(n, e, r), rd(n, t, r))));
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
    if (Sl(e)) nd(t, a);
    else {
      var l = e.alternate;
      if (
        e.lanes === 0 &&
        (l === null || l.lanes === 0) &&
        ((l = t.lastRenderedReducer), l !== null)
      )
        try {
          var u = t.lastRenderedState,
            d = l(u, n);
          if (((a.hasEagerState = !0), (a.eagerState = d), ft(d, u)))
            return (rl(e, t, a, 0), ye === null && nl(), !1);
        } catch {
        } finally {
        }
      if (((n = Ko(e, t, a, r)), n !== null)) return (it(n, e, r), rd(n, t, r), !0);
    }
    return !1;
  }
  function Pi(e, t, n, r) {
    if (
      ((r = {
        lane: 2,
        revertLane: us(),
        gesture: null,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Sl(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Ko(e, n, r, 2)), t !== null && it(t, e, 2));
  }
  function Sl(e) {
    var t = e.alternate;
    return e === G || (t !== null && t === G);
  }
  function nd(e, t) {
    Sr = gl = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
  }
  function rd(e, t, n) {
    if ((n & 4194048) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), su(e, n));
    }
  }
  var pa = {
    readContext: We,
    use: bl,
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
  pa.useEffectEvent = Se;
  var ad = {
      readContext: We,
      use: bl,
      useCallback: function (e, t) {
        return ((Ze().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: We,
      useEffect: $c,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null), xl(4194308, 4, qc.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return xl(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        xl(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Ze();
        t = t === void 0 ? null : t;
        var r = e();
        if (Yn) {
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
          if (Yn) {
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
          (e = e.dispatch = xm.bind(null, G, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ze();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ei(e);
        var t = e.queue,
          n = td.bind(null, G, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: _i,
      useDeferredValue: function (e, t) {
        var n = Ze();
        return ji(n, e, t);
      },
      useTransition: function () {
        var e = Ei(!1);
        return ((e = Yc.bind(null, G, e.queue, !0, !1)), (Ze().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, n) {
        var r = G,
          a = Ze();
        if (re) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), ye === null)) throw Error(s(349));
          (te & 127) !== 0 || Nc(r, t, n);
        }
        a.memoizedState = n;
        var l = { value: n, getSnapshot: t };
        return (
          (a.queue = l),
          $c(_c.bind(null, r, l, e), [e]),
          (r.flags |= 2048),
          Nr(9, { destroy: void 0 }, Cc.bind(null, r, l, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Ze(),
          t = ye.identifierPrefix;
        if (re) {
          var n = Dt,
            r = It;
          ((n = (r & ~(1 << (32 - dt(r) - 1))).toString(32) + n),
            (t = '_' + t + 'R_' + n),
            (n = yl++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += '_'));
        } else ((n = hm++), (t = '_' + t + 'r_' + n.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Ai,
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
        return ((t.queue = n), (t = Pi.bind(null, G, !0, n)), (n.dispatch = t), [e, t]);
      },
      useMemoCache: xi,
      useCacheRefresh: function () {
        return (Ze().memoizedState = wm.bind(null, G));
      },
      useEffectEvent: function (e) {
        var t = Ze(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((ue & 2) !== 0) throw Error(s(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ri = {
      readContext: We,
      use: bl,
      useCallback: Qc,
      useContext: We,
      useEffect: Ci,
      useImperativeHandle: Wc,
      useInsertionEffect: Bc,
      useLayoutEffect: Vc,
      useMemo: Kc,
      useReducer: wl,
      useRef: Fc,
      useState: function () {
        return wl(Zt);
      },
      useDebugValue: _i,
      useDeferredValue: function (e, t) {
        var n = je();
        return Gc(n, he.memoizedState, e, t);
      },
      useTransition: function () {
        var e = wl(Zt)[0],
          t = je().memoizedState;
        return [typeof e == 'boolean' ? e : da(e), t];
      },
      useSyncExternalStore: Ec,
      useId: Xc,
      useHostTransitionStatus: Ai,
      useFormState: Ic,
      useActionState: Ic,
      useOptimistic: function (e, t) {
        var n = je();
        return Ac(n, he, e, t);
      },
      useMemoCache: xi,
      useCacheRefresh: ed,
    };
  Ri.useEffectEvent = Hc;
  var ld = {
    readContext: We,
    use: bl,
    useCallback: Qc,
    useContext: We,
    useEffect: Ci,
    useImperativeHandle: Wc,
    useInsertionEffect: Bc,
    useLayoutEffect: Vc,
    useMemo: Kc,
    useReducer: Si,
    useRef: Fc,
    useState: function () {
      return Si(Zt);
    },
    useDebugValue: _i,
    useDeferredValue: function (e, t) {
      var n = je();
      return he === null ? ji(n, e, t) : Gc(n, he.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Si(Zt)[0],
        t = je().memoizedState;
      return [typeof e == 'boolean' ? e : da(e), t];
    },
    useSyncExternalStore: Ec,
    useId: Xc,
    useHostTransitionStatus: Ai,
    useFormState: Uc,
    useActionState: Uc,
    useOptimistic: function (e, t) {
      var n = je();
      return he !== null ? Ac(n, he, e, t) : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: xi,
    useCacheRefresh: ed,
  };
  ld.useEffectEvent = Hc;
  function Li(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : O({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Oi = {
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
  function od(e, t, n, r, a, l, u) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, l, u)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Xr(n, r) || !Xr(a, l)
          : !0
    );
  }
  function id(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Oi.enqueueReplaceState(t, t.state, null));
  }
  function Jn(e, t) {
    var n = t;
    if ('ref' in t) {
      n = {};
      for (var r in t) r !== 'ref' && (n[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = O({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function sd(e) {
    tl(e);
  }
  function ud(e) {
    console.error(e);
  }
  function cd(e) {
    tl(e);
  }
  function El(e, t) {
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
  function Ti(e, t, n) {
    return (
      (n = yn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        El(e, t);
      }),
      n
    );
  }
  function fd(e) {
    return ((e = yn(e)), (e.tag = 3), e);
  }
  function pd(e, t, n, r) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == 'function') {
      var l = r.value;
      ((e.payload = function () {
        return a(l);
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
          typeof a != 'function' && (En === null ? (En = new Set([this])) : En.add(this)));
        var d = r.stack;
        this.componentDidCatch(r.value, { componentStack: d !== null ? d : '' });
      });
  }
  function km(e, t, n, r, a) {
    if (((n.flags |= 32768), r !== null && typeof r == 'object' && typeof r.then == 'function')) {
      if (((t = n.alternate), t !== null && yr(t, n, a, !0), (n = ht.current), n !== null)) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Lt === null ? Ml() : n.alternate === null && Ee === 0 && (Ee = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = a),
              r === dl
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                  os(e, r, a)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              r === dl
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([r]) }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue), n === null ? (t.retryQueue = new Set([r])) : n.add(r)),
                  os(e, r, a)),
              !1
            );
        }
        throw Error(s(435, n.tag));
      }
      return (os(e, r, a), Ml(), !1);
    }
    if (re)
      return (
        (t = ht.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = a),
            r !== ei && ((e = Error(s(422), { cause: r })), na(St(e, n))))
          : (r !== ei && ((t = Error(s(423), { cause: r })), na(St(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (a &= -a),
            (e.lanes |= a),
            (r = St(r, n)),
            (a = Ti(e.stateNode, r, a)),
            di(e, a),
            Ee !== 4 && (Ee = 2)),
        !1
      );
    var l = Error(s(520), { cause: r });
    if (((l = St(l, n)), xa === null ? (xa = [l]) : xa.push(l), Ee !== 4 && (Ee = 2), t === null))
      return !0;
    ((r = St(r, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = a & -a),
            (n.lanes |= e),
            (e = Ti(n.stateNode, r, e)),
            di(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (l = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (l !== null &&
                  typeof l.componentDidCatch == 'function' &&
                  (En === null || !En.has(l)))))
          )
            return (
              (n.flags |= 65536),
              (a &= -a),
              (n.lanes |= a),
              (a = fd(a)),
              pd(a, e, n, r),
              di(n, a),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Mi = Error(s(461)),
    Le = !1;
  function Qe(e, t, n, r) {
    t.child = e === null ? yc(t, null, n, r) : Gn(t, e.child, n, r);
  }
  function hd(e, t, n, r, a) {
    n = n.render;
    var l = t.ref;
    if ('ref' in r) {
      var u = {};
      for (var d in r) d !== 'ref' && (u[d] = r[d]);
    } else u = r;
    return (
      qn(t),
      (r = yi(e, t, n, u, l, a)),
      (d = vi()),
      e !== null && !Le
        ? (bi(e, t, a), Xt(e, t, a))
        : (re && d && Zo(t), (t.flags |= 1), Qe(e, t, r, a), t.child)
    );
  }
  function md(e, t, n, r, a) {
    if (e === null) {
      var l = n.type;
      return typeof l == 'function' && !Go(l) && l.defaultProps === void 0 && n.compare === null
        ? ((t.tag = 15), (t.type = l), gd(e, t, l, r, a))
        : ((e = ll(n.type, null, r, t, t.mode, a)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((l = e.child), !Vi(e, a))) {
      var u = l.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : Xr), n(u, r) && e.ref === t.ref))
        return Xt(e, t, a);
    }
    return ((t.flags |= 1), (e = Qt(l, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function gd(e, t, n, r, a) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (Xr(l, r) && e.ref === t.ref)
        if (((Le = !1), (t.pendingProps = r = l), Vi(e, a))) (e.flags & 131072) !== 0 && (Le = !0);
        else return ((t.lanes = e.lanes), Xt(e, t, a));
    }
    return Ii(e, t, n, r, a);
  }
  function yd(e, t, n, r) {
    var a = r.children,
      l = e !== null ? e.memoizedState : null;
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
        if (((l = l !== null ? l.baseLanes | n : n), e !== null)) {
          for (r = t.child = e.child, a = 0; r !== null; )
            ((a = a | r.lanes | r.childLanes), (r = r.sibling));
          r = a & ~l;
        } else ((r = 0), (t.child = null));
        return vd(e, t, l, n, r);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ul(t, l !== null ? l.cachePool : null),
          l !== null ? wc(t, l) : pi(),
          xc(t));
      else return ((r = t.lanes = 536870912), vd(e, t, l !== null ? l.baseLanes | n : n, n, r));
    } else
      l !== null
        ? (ul(t, l.cachePool), wc(t, l), wn(), (t.memoizedState = null))
        : (e !== null && ul(t, null), pi(), wn());
    return (Qe(e, t, a, n), t.child);
  }
  function ha(e, t) {
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
    var l = ii();
    return (
      (l = l === null ? null : { parent: Pe._currentValue, pool: l }),
      (t.memoizedState = { baseLanes: n, cachePool: l }),
      e !== null && ul(t, null),
      pi(),
      xc(t),
      e !== null && yr(e, t, r, !0),
      (t.childLanes = a),
      null
    );
  }
  function Nl(e, t) {
    return (
      (t = _l({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function bd(e, t, n) {
    return (
      Gn(t, e.child, null, n),
      (e = Nl(t, t.pendingProps)),
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
        if (r.mode === 'hidden') return ((e = Nl(t, r)), (t.lanes = 536870912), ha(null, e));
        if (
          (mi(t),
          (e = ve)
            ? ((e = Rf(e, Ct)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: It, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                (qe = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw hn(t);
        return ((t.lanes = 536870912), null);
      }
      return Nl(t, r);
    }
    var l = e.memoizedState;
    if (l !== null) {
      var u = l.dehydrated;
      if ((mi(t), a))
        if (t.flags & 256) ((t.flags &= -257), (t = bd(e, t, n)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((Le || yr(e, t, n, !1), (a = (n & e.childLanes) !== 0), Le || a)) {
        if (((r = ye), r !== null && ((u = uu(r, n)), u !== 0 && u !== l.retryLane)))
          throw ((l.retryLane = u), $n(e, u), it(r, e, u), Mi);
        (Ml(), (t = bd(e, t, n)));
      } else
        ((e = l.treeContext),
          (ve = _t(u.nextSibling)),
          (qe = t),
          (re = !0),
          (pn = null),
          (Ct = !1),
          e !== null && lc(t, e),
          (t = Nl(t, r)),
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
  function Cl(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != 'function' && typeof n != 'object') throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Ii(e, t, n, r, a) {
    return (
      qn(t),
      (n = yi(e, t, n, r, void 0, a)),
      (r = vi()),
      e !== null && !Le
        ? (bi(e, t, a), Xt(e, t, a))
        : (re && r && Zo(t), (t.flags |= 1), Qe(e, t, n, a), t.child)
    );
  }
  function wd(e, t, n, r, a, l) {
    return (
      qn(t),
      (t.updateQueue = null),
      (n = Sc(t, r, n, a)),
      kc(e),
      (r = vi()),
      e !== null && !Le
        ? (bi(e, t, l), Xt(e, t, l))
        : (re && r && Zo(t), (t.flags |= 1), Qe(e, t, n, l), t.child)
    );
  }
  function xd(e, t, n, r, a) {
    if ((qn(t), t.stateNode === null)) {
      var l = pr,
        u = n.contextType;
      (typeof u == 'object' && u !== null && (l = We(u)),
        (l = new n(r, l)),
        (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
        (l.updater = Oi),
        (t.stateNode = l),
        (l._reactInternals = t),
        (l = t.stateNode),
        (l.props = r),
        (l.state = t.memoizedState),
        (l.refs = {}),
        ui(t),
        (u = n.contextType),
        (l.context = typeof u == 'object' && u !== null ? We(u) : pr),
        (l.state = t.memoizedState),
        (u = n.getDerivedStateFromProps),
        typeof u == 'function' && (Li(t, n, u, r), (l.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == 'function' ||
          typeof l.getSnapshotBeforeUpdate == 'function' ||
          (typeof l.UNSAFE_componentWillMount != 'function' &&
            typeof l.componentWillMount != 'function') ||
          ((u = l.state),
          typeof l.componentWillMount == 'function' && l.componentWillMount(),
          typeof l.UNSAFE_componentWillMount == 'function' && l.UNSAFE_componentWillMount(),
          u !== l.state && Oi.enqueueReplaceState(l, l.state, null),
          ua(t, r, l, a),
          sa(),
          (l.state = t.memoizedState)),
        typeof l.componentDidMount == 'function' && (t.flags |= 4194308),
        (r = !0));
    } else if (e === null) {
      l = t.stateNode;
      var d = t.memoizedProps,
        m = Jn(n, d);
      l.props = m;
      var w = l.context,
        C = n.contextType;
      ((u = pr), typeof C == 'object' && C !== null && (u = We(C)));
      var z = n.getDerivedStateFromProps;
      ((C = typeof z == 'function' || typeof l.getSnapshotBeforeUpdate == 'function'),
        (d = t.pendingProps !== d),
        C ||
          (typeof l.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof l.componentWillReceiveProps != 'function') ||
          ((d || w !== u) && id(t, l, r, u)),
        (gn = !1));
      var k = t.memoizedState;
      ((l.state = k),
        ua(t, r, l, a),
        sa(),
        (w = t.memoizedState),
        d || k !== w || gn
          ? (typeof z == 'function' && (Li(t, n, z, r), (w = t.memoizedState)),
            (m = gn || od(t, n, m, r, k, w, u))
              ? (C ||
                  (typeof l.UNSAFE_componentWillMount != 'function' &&
                    typeof l.componentWillMount != 'function') ||
                  (typeof l.componentWillMount == 'function' && l.componentWillMount(),
                  typeof l.UNSAFE_componentWillMount == 'function' &&
                    l.UNSAFE_componentWillMount()),
                typeof l.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof l.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = w)),
            (l.props = r),
            (l.state = w),
            (l.context = u),
            (r = m))
          : (typeof l.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
      ((l = t.stateNode),
        ci(e, t),
        (u = t.memoizedProps),
        (C = Jn(n, u)),
        (l.props = C),
        (z = t.pendingProps),
        (k = l.context),
        (w = n.contextType),
        (m = pr),
        typeof w == 'object' && w !== null && (m = We(w)),
        (d = n.getDerivedStateFromProps),
        (w = typeof d == 'function' || typeof l.getSnapshotBeforeUpdate == 'function') ||
          (typeof l.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof l.componentWillReceiveProps != 'function') ||
          ((u !== z || k !== m) && id(t, l, r, m)),
        (gn = !1),
        (k = t.memoizedState),
        (l.state = k),
        ua(t, r, l, a),
        sa());
      var E = t.memoizedState;
      u !== z || k !== E || gn || (e !== null && e.dependencies !== null && il(e.dependencies))
        ? (typeof d == 'function' && (Li(t, n, d, r), (E = t.memoizedState)),
          (C =
            gn ||
            od(t, n, C, r, k, E, m) ||
            (e !== null && e.dependencies !== null && il(e.dependencies)))
            ? (w ||
                (typeof l.UNSAFE_componentWillUpdate != 'function' &&
                  typeof l.componentWillUpdate != 'function') ||
                (typeof l.componentWillUpdate == 'function' && l.componentWillUpdate(r, E, m),
                typeof l.UNSAFE_componentWillUpdate == 'function' &&
                  l.UNSAFE_componentWillUpdate(r, E, m)),
              typeof l.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof l.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof l.componentDidUpdate != 'function' ||
                (u === e.memoizedProps && k === e.memoizedState) ||
                (t.flags |= 4),
              typeof l.getSnapshotBeforeUpdate != 'function' ||
                (u === e.memoizedProps && k === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = E)),
          (l.props = r),
          (l.state = E),
          (l.context = m),
          (r = C))
        : (typeof l.componentDidUpdate != 'function' ||
            (u === e.memoizedProps && k === e.memoizedState) ||
            (t.flags |= 4),
          typeof l.getSnapshotBeforeUpdate != 'function' ||
            (u === e.memoizedProps && k === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (l = r),
      Cl(e, t),
      (r = (t.flags & 128) !== 0),
      l || r
        ? ((l = t.stateNode),
          (n = r && typeof n.getDerivedStateFromError != 'function' ? null : l.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = Gn(t, e.child, null, a)), (t.child = Gn(t, null, n, a)))
            : Qe(e, t, n, a),
          (t.memoizedState = l.state),
          (e = t.child))
        : (e = Xt(e, t, a)),
      e
    );
  }
  function kd(e, t, n, r) {
    return (Bn(), (t.flags |= 256), Qe(e, t, n, r), t.child);
  }
  var Di = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ui(e) {
    return { baseLanes: e, cachePool: dc() };
  }
  function Fi(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= yt), e);
  }
  function Sd(e, t, n) {
    var r = t.pendingProps,
      a = !1,
      l = (t.flags & 128) !== 0,
      u;
    if (
      ((u = l) || (u = e !== null && e.memoizedState === null ? !1 : (_e.current & 2) !== 0),
      u && ((a = !0), (t.flags &= -129)),
      (u = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (re) {
        if (
          (a ? bn(t) : wn(),
          (e = ve)
            ? ((e = Rf(e, Ct)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: It, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                (qe = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw hn(t);
        return (ks(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var d = r.children;
      return (
        (r = r.fallback),
        a
          ? (wn(),
            (a = t.mode),
            (d = _l({ mode: 'hidden', children: d }, a)),
            (r = Hn(r, a, n, null)),
            (d.return = t),
            (r.return = t),
            (d.sibling = r),
            (t.child = d),
            (r = t.child),
            (r.memoizedState = Ui(n)),
            (r.childLanes = Fi(e, u, n)),
            (t.memoizedState = Di),
            ha(null, r))
          : (bn(t), $i(t, d))
      );
    }
    var m = e.memoizedState;
    if (m !== null && ((d = m.dehydrated), d !== null)) {
      if (l)
        t.flags & 256
          ? (bn(t), (t.flags &= -257), (t = Hi(e, t, n)))
          : t.memoizedState !== null
            ? (wn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (wn(),
              (d = r.fallback),
              (a = t.mode),
              (r = _l({ mode: 'visible', children: r.children }, a)),
              (d = Hn(d, a, n, null)),
              (d.flags |= 2),
              (r.return = t),
              (d.return = t),
              (r.sibling = d),
              (t.child = r),
              Gn(t, e.child, null, n),
              (r = t.child),
              (r.memoizedState = Ui(n)),
              (r.childLanes = Fi(e, u, n)),
              (t.memoizedState = Di),
              (t = ha(null, r)));
      else if ((bn(t), ks(d))) {
        if (((u = d.nextSibling && d.nextSibling.dataset), u)) var w = u.dgst;
        ((u = w),
          (r = Error(s(419))),
          (r.stack = ''),
          (r.digest = u),
          na({ value: r, source: null, stack: null }),
          (t = Hi(e, t, n)));
      } else if ((Le || yr(e, t, n, !1), (u = (n & e.childLanes) !== 0), Le || u)) {
        if (((u = ye), u !== null && ((r = uu(u, n)), r !== 0 && r !== m.retryLane)))
          throw ((m.retryLane = r), $n(e, r), it(u, e, r), Mi);
        (xs(d) || Ml(), (t = Hi(e, t, n)));
      } else
        xs(d)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = m.treeContext),
            (ve = _t(d.nextSibling)),
            (qe = t),
            (re = !0),
            (pn = null),
            (Ct = !1),
            e !== null && lc(t, e),
            (t = $i(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return a
      ? (wn(),
        (d = r.fallback),
        (a = t.mode),
        (m = e.child),
        (w = m.sibling),
        (r = Qt(m, { mode: 'hidden', children: r.children })),
        (r.subtreeFlags = m.subtreeFlags & 65011712),
        w !== null ? (d = Qt(w, d)) : ((d = Hn(d, a, n, null)), (d.flags |= 2)),
        (d.return = t),
        (r.return = t),
        (r.sibling = d),
        (t.child = r),
        ha(null, r),
        (r = t.child),
        (d = e.child.memoizedState),
        d === null
          ? (d = Ui(n))
          : ((a = d.cachePool),
            a !== null
              ? ((m = Pe._currentValue), (a = a.parent !== m ? { parent: m, pool: m } : a))
              : (a = dc()),
            (d = { baseLanes: d.baseLanes | n, cachePool: a })),
        (r.memoizedState = d),
        (r.childLanes = Fi(e, u, n)),
        (t.memoizedState = Di),
        ha(e.child, r))
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
  function $i(e, t) {
    return ((t = _l({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function _l(e, t) {
    return ((e = pt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Hi(e, t, n) {
    return (
      Gn(t, e.child, null, n),
      (e = $i(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Ed(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), ri(e.return, t, n));
  }
  function Bi(e, t, n, r, a, l) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: a,
          treeForkCount: l,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = r),
        (u.tail = n),
        (u.tailMode = a),
        (u.treeForkCount = l));
  }
  function Nd(e, t, n) {
    var r = t.pendingProps,
      a = r.revealOrder,
      l = r.tail;
    r = r.children;
    var u = _e.current,
      d = (u & 2) !== 0;
    if (
      (d ? ((u = (u & 1) | 2), (t.flags |= 128)) : (u &= 1),
      A(_e, u),
      Qe(e, t, r, n),
      (r = re ? ta : 0),
      !d && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ed(e, n, t);
        else if (e.tag === 19) Ed(e, n, t);
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
          ((e = n.alternate), e !== null && ml(e) === null && (a = n), (n = n.sibling));
        ((n = a),
          n === null ? ((a = t.child), (t.child = null)) : ((a = n.sibling), (n.sibling = null)),
          Bi(t, !1, a, n, l, r));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (((e = a.alternate), e !== null && ml(e) === null)) {
            t.child = a;
            break;
          }
          ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
        }
        Bi(t, !0, n, null, l, r);
        break;
      case 'together':
        Bi(t, !1, null, null, void 0, r);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Xt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Sn |= t.lanes), (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((yr(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = Qt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        ((e = e.sibling), (n = n.sibling = Qt(e, e.pendingProps)), (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Vi(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && il(e)));
  }
  function Em(e, t, n) {
    switch (t.tag) {
      case 3:
        (Ie(t, t.stateNode.containerInfo), mn(t, Pe, e.memoizedState.cache), Bn());
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
              : (bn(t), (e = Xt(e, t, n)), e !== null ? e.sibling : null);
        bn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (
          ((r = (n & t.childLanes) !== 0),
          r || (yr(e, t, n, !1), (r = (n & t.childLanes) !== 0)),
          a)
        ) {
          if (r) return Nd(e, t, n);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null && ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          A(_e, _e.current),
          r)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), yd(e, t, n, t.pendingProps));
      case 24:
        mn(t, Pe, e.memoizedState.cache);
    }
    return Xt(e, t, n);
  }
  function Cd(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Le = !0;
      else {
        if (!Vi(e, n) && (t.flags & 128) === 0) return ((Le = !1), Em(e, t, n));
        Le = (e.flags & 131072) !== 0;
      }
    else ((Le = !1), re && (t.flags & 1048576) !== 0 && ac(t, ta, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (((e = Qn(t.elementType)), (t.type = e), typeof e == 'function'))
            Go(e)
              ? ((r = Jn(e, r)), (t.tag = 1), (t = xd(null, t, e, r, n)))
              : ((t.tag = 0), (t = Ii(null, t, e, r, n)));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === Ne) {
                ((t.tag = 11), (t = hd(null, t, e, r, n)));
                break e;
              } else if (a === J) {
                ((t.tag = 14), (t = md(null, t, e, r, n)));
                break e;
              }
            }
            throw ((t = wt(e) || e), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return Ii(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((r = t.type), (a = Jn(r, t.pendingProps)), xd(e, t, r, a, n));
      case 3:
        e: {
          if ((Ie(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          r = t.pendingProps;
          var l = t.memoizedState;
          ((a = l.element), ci(e, t), ua(t, r, null, n));
          var u = t.memoizedState;
          if (
            ((r = u.cache),
            mn(t, Pe, r),
            r !== l.cache && ai(t, [Pe], n, !0),
            sa(),
            (r = u.element),
            l.isDehydrated)
          )
            if (
              ((l = { element: r, isDehydrated: !1, cache: u.cache }),
              (t.updateQueue.baseState = l),
              (t.memoizedState = l),
              t.flags & 256)
            ) {
              t = kd(e, t, r, n);
              break e;
            } else if (r !== a) {
              ((a = St(Error(s(424)), t)), na(a), (t = kd(e, t, r, n)));
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
                ve = _t(e.firstChild),
                  qe = t,
                  re = !0,
                  pn = null,
                  Ct = !0,
                  n = yc(t, null, r, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((Bn(), r === a)) {
              t = Xt(e, t, n);
              break e;
            }
            Qe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Cl(e, t),
          e === null
            ? (n = Df(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : re ||
                ((n = t.type),
                (e = t.pendingProps),
                (r = Bl(q.current).createElement(n)),
                (r[Ve] = t),
                (r[tt] = e),
                Ke(r, n, e),
                Fe(r),
                (t.stateNode = r))
            : (t.memoizedState = Df(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Fr(t),
          e === null &&
            re &&
            ((r = t.stateNode = Tf(t.type, t.pendingProps, q.current)),
            (qe = t),
            (Ct = !0),
            (a = ve),
            jn(t.type) ? ((Ss = a), (ve = _t(r.firstChild))) : (ve = a)),
          Qe(e, t, t.pendingProps.children, n),
          Cl(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            re &&
            ((a = r = ve) &&
              ((r = eg(r, t.type, t.pendingProps, Ct)),
              r !== null
                ? ((t.stateNode = r), (qe = t), (ve = _t(r.firstChild)), (Ct = !1), (a = !0))
                : (a = !1)),
            a || hn(t)),
          Fr(t),
          (a = t.type),
          (l = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (r = l.children),
          vs(a, l) ? (r = null) : u !== null && vs(a, u) && (t.flags |= 32),
          t.memoizedState !== null && ((a = yi(e, t, mm, null, null, n)), (za._currentValue = a)),
          Cl(e, t),
          Qe(e, t, r, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            re &&
            ((e = n = ve) &&
              ((n = tg(n, t.pendingProps, Ct)),
              n !== null ? ((t.stateNode = n), (qe = t), (ve = null), (e = !0)) : (e = !1)),
            e || hn(t)),
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
        return hd(e, t, t.type, t.pendingProps, n);
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
          qn(t),
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
        return Nd(e, t, n);
      case 31:
        return Sm(e, t, n);
      case 22:
        return yd(e, t, n, t.pendingProps);
      case 24:
        return (
          qn(t),
          (r = We(Pe)),
          e === null
            ? ((a = ii()),
              a === null &&
                ((a = ye),
                (l = li()),
                (a.pooledCache = l),
                l.refCount++,
                l !== null && (a.pooledCacheLanes |= n),
                (a = l)),
              (t.memoizedState = { parent: r, cache: a }),
              ui(t),
              mn(t, Pe, a))
            : ((e.lanes & n) !== 0 && (ci(e, t), ua(t, null, null, n), sa()),
              (a = e.memoizedState),
              (l = t.memoizedState),
              a.parent !== r
                ? ((a = { parent: r, cache: r }),
                  (t.memoizedState = a),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a),
                  mn(t, Pe, r))
                : ((r = l.cache), mn(t, Pe, r), r !== a.cache && ai(t, [Pe], n, !0))),
          Qe(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function en(e) {
    e.flags |= 4;
  }
  function qi(e, t, n, r, a) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (a & 335544128) === a))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Xd()) e.flags |= 8192;
        else throw ((Kn = dl), si);
    } else e.flags &= -16777217;
  }
  function _d(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Bf(t)))
      if (Xd()) e.flags |= 8192;
      else throw ((Kn = dl), si);
  }
  function jl(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? ou() : 536870912), (e.lanes |= t), (zr |= t)));
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
  function Nm(e, t, n) {
    var r = t.pendingProps;
    switch ((Xo(t), t.tag)) {
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
          Yt(Pe),
          Ce(),
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
          l = t.memoizedState;
        return (
          e === null
            ? (en(t), l !== null ? (be(t), _d(t, l)) : (be(t), qi(t, a, null, r, n)))
            : l
              ? l !== e.memoizedState
                ? (en(t), be(t), _d(t, l))
                : (be(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== r && en(t), be(t), qi(t, a, e, r, n)),
          null
        );
      case 27:
        if ((Ua(t), (n = q.current), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return (be(t), null);
          }
          ((e = L.current), gr(t) ? oc(t) : ((e = Tf(a, r, n)), (t.stateNode = e), en(t)));
        }
        return (be(t), null);
      case 5:
        if ((Ua(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return (be(t), null);
          }
          if (((l = L.current), gr(t))) oc(t);
          else {
            var u = Bl(q.current);
            switch (l) {
              case 1:
                l = u.createElementNS('http://www.w3.org/2000/svg', a);
                break;
              case 2:
                l = u.createElementNS('http://www.w3.org/1998/Math/MathML', a);
                break;
              default:
                switch (a) {
                  case 'svg':
                    l = u.createElementNS('http://www.w3.org/2000/svg', a);
                    break;
                  case 'math':
                    l = u.createElementNS('http://www.w3.org/1998/Math/MathML', a);
                    break;
                  case 'script':
                    ((l = u.createElement('div')),
                      (l.innerHTML = '<script><\/script>'),
                      (l = l.removeChild(l.firstChild)));
                    break;
                  case 'select':
                    ((l =
                      typeof r.is == 'string'
                        ? u.createElement('select', { is: r.is })
                        : u.createElement('select')),
                      r.multiple ? (l.multiple = !0) : r.size && (l.size = r.size));
                    break;
                  default:
                    l =
                      typeof r.is == 'string'
                        ? u.createElement(a, { is: r.is })
                        : u.createElement(a);
                }
            }
            ((l[Ve] = t), (l[tt] = r));
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) l.appendChild(u.stateNode);
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
            t.stateNode = l;
            e: switch ((Ke(l, a, r), a)) {
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
        return (be(t), qi(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && en(t);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(s(166));
          if (((e = q.current), gr(t))) {
            if (((e = t.stateNode), (n = t.memoizedProps), (r = null), (a = qe), a !== null))
              switch (a.tag) {
                case 27:
                case 5:
                  r = a.memoizedProps;
              }
            ((e[Ve] = t),
              (e = !!(
                e.nodeValue === n ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                Ef(e.nodeValue, n)
              )),
              e || hn(t, !0));
          } else ((e = Bl(e).createTextNode(r)), (e[Ve] = t), (t.stateNode = e));
        }
        return (be(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((r = gr(t)), n !== null)) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(s(557));
              e[Ve] = t;
            } else (Bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (be(t), (e = !1));
          } else
            ((n = ti()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (mt(t), t) : (mt(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return (be(t), null);
      case 13:
        if (
          ((r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((a = gr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(s(318));
              if (((a = t.memoizedState), (a = a !== null ? a.dehydrated : null), !a))
                throw Error(s(317));
              a[Ve] = t;
            } else (Bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
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
                (l = null),
                r.memoizedState !== null &&
                  r.memoizedState.cachePool !== null &&
                  (l = r.memoizedState.cachePool.pool),
                l !== a && (r.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              jl(t, t.updateQueue),
              be(t),
              null)
        );
      case 4:
        return (Ce(), e === null && ps(t.stateNode.containerInfo), be(t), null);
      case 10:
        return (Yt(t.type), be(t), null);
      case 19:
        if ((y(_e), (r = t.memoizedState), r === null)) return (be(t), null);
        if (((a = (t.flags & 128) !== 0), (l = r.rendering), l === null))
          if (a) ma(r, !1);
          else {
            if (Ee !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((l = ml(e)), l !== null)) {
                  for (
                    t.flags |= 128,
                      ma(r, !1),
                      e = l.updateQueue,
                      t.updateQueue = e,
                      jl(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    (tc(n, e), (n = n.sibling));
                  return (A(_e, (_e.current & 1) | 2), re && Kt(t, r.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            r.tail !== null &&
              ut() > Ll &&
              ((t.flags |= 128), (a = !0), ma(r, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = ml(l)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                jl(t, e),
                ma(r, !0),
                r.tail === null && r.tailMode === 'hidden' && !l.alternate && !re)
              )
                return (be(t), null);
            } else
              2 * ut() - r.renderingStartTime > Ll &&
                n !== 536870912 &&
                ((t.flags |= 128), (a = !0), ma(r, !1), (t.lanes = 4194304));
          r.isBackwards
            ? ((l.sibling = t.child), (t.child = l))
            : ((e = r.last), e !== null ? (e.sibling = l) : (t.child = l), (r.last = l));
        }
        return r.tail !== null
          ? ((e = r.tail),
            (r.rendering = e),
            (r.tail = e.sibling),
            (r.renderingStartTime = ut()),
            (e.sibling = null),
            (n = _e.current),
            A(_e, a ? (n & 1) | 2 : n & 1),
            re && Kt(t, r.treeForkCount),
            e)
          : (be(t), null);
      case 22:
      case 23:
        return (
          mt(t),
          hi(),
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
          n !== null && jl(t, n.retryQueue),
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
          Yt(Pe),
          be(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Cm(e, t) {
    switch ((Xo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Yt(Pe),
          Ce(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ua(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((mt(t), t.alternate === null)) throw Error(s(340));
          Bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((mt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          Bn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (y(_e), null);
      case 4:
        return (Ce(), null);
      case 10:
        return (Yt(t.type), null);
      case 22:
      case 23:
        return (
          mt(t),
          hi(),
          e !== null && y(Wn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Yt(Pe), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function jd(e, t) {
    switch ((Xo(t), t.tag)) {
      case 3:
        (Yt(Pe), Ce());
        break;
      case 26:
      case 27:
      case 5:
        Ua(t);
        break;
      case 4:
        Ce();
        break;
      case 31:
        t.memoizedState !== null && mt(t);
        break;
      case 13:
        mt(t);
        break;
      case 19:
        y(_e);
        break;
      case 10:
        Yt(t.type);
        break;
      case 22:
      case 23:
        (mt(t), hi(), e !== null && y(Wn));
        break;
      case 24:
        Yt(Pe);
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
            var l = n.create,
              u = n.inst;
            ((r = l()), (u.destroy = r));
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (d) {
      pe(t, t.return, d);
    }
  }
  function xn(e, t, n) {
    try {
      var r = t.updateQueue,
        a = r !== null ? r.lastEffect : null;
      if (a !== null) {
        var l = a.next;
        r = l;
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
              } catch (C) {
                pe(a, m, C);
              }
            }
          }
          r = r.next;
        } while (r !== l);
      }
    } catch (C) {
      pe(t, t.return, C);
    }
  }
  function zd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        bc(t, n);
      } catch (r) {
        pe(e, e.return, r);
      }
    }
  }
  function Ad(e, t, n) {
    ((n.props = Jn(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (r) {
      pe(e, t, r);
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
      pe(e, t, a);
    }
  }
  function Ut(e, t) {
    var n = e.ref,
      r = e.refCleanup;
    if (n !== null)
      if (typeof r == 'function')
        try {
          r();
        } catch (a) {
          pe(e, t, a);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof n == 'function')
        try {
          n(null);
        } catch (a) {
          pe(e, t, a);
        }
      else n.current = null;
  }
  function Pd(e) {
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
      pe(e, e.return, a);
    }
  }
  function Wi(e, t, n) {
    try {
      var r = e.stateNode;
      (Km(r, e.type, n, t), (r[tt] = t));
    } catch (a) {
      pe(e, e.return, a);
    }
  }
  function Rd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && jn(e.type)) || e.tag === 4
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
        if ((e.tag === 27 && jn(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
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
            n != null || t.onclick !== null || (t.onclick = qt)));
    else if (
      r !== 4 &&
      (r === 27 && jn(e.type) && ((n = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Ki(e, t, n), e = e.sibling; e !== null; ) (Ki(e, t, n), (e = e.sibling));
  }
  function zl(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && (r === 27 && jn(e.type) && (n = e.stateNode), (e = e.child), e !== null))
      for (zl(e, t, n), e = e.sibling; e !== null; ) (zl(e, t, n), (e = e.sibling));
  }
  function Ld(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var r = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
      (Ke(t, r, n), (t[Ve] = e), (t[tt] = n));
    } catch (l) {
      pe(e, e.return, l);
    }
  }
  var tn = !1,
    Oe = !1,
    Gi = !1,
    Od = typeof WeakSet == 'function' ? WeakSet : Set,
    $e = null;
  function _m(e, t) {
    if (((e = e.containerInfo), (gs = Yl), (e = Wu(e)), Ho(e))) {
      if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var a = r.anchorOffset,
              l = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, l.nodeType);
            } catch {
              n = null;
              break e;
            }
            var u = 0,
              d = -1,
              m = -1,
              w = 0,
              C = 0,
              z = e,
              k = null;
            t: for (;;) {
              for (
                var E;
                z !== n || (a !== 0 && z.nodeType !== 3) || (d = u + a),
                  z !== l || (r !== 0 && z.nodeType !== 3) || (m = u + r),
                  z.nodeType === 3 && (u += z.nodeValue.length),
                  (E = z.firstChild) !== null;

              )
                ((k = z), (z = E));
              for (;;) {
                if (z === e) break t;
                if (
                  (k === n && ++w === a && (d = u),
                  k === l && ++C === r && (m = u),
                  (E = z.nextSibling) !== null)
                )
                  break;
                ((z = k), (k = z.parentNode));
              }
              z = E;
            }
            n = d === -1 || m === -1 ? null : { start: d, end: m };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ys = { focusedElem: e, selectionRange: n }, Yl = !1, $e = t; $e !== null; )
      if (((t = $e), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), ($e = e));
      else
        for (; $e !== null; ) {
          switch (((t = $e), (l = t.alternate), (e = t.flags), t.tag)) {
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
              if ((e & 1024) !== 0 && l !== null) {
                ((e = void 0),
                  (n = t),
                  (a = l.memoizedProps),
                  (l = l.memoizedState),
                  (r = n.stateNode));
                try {
                  var D = Jn(n.type, a);
                  ((e = r.getSnapshotBeforeUpdate(D, l)),
                    (r.__reactInternalSnapshotBeforeUpdate = e));
                } catch (W) {
                  pe(n, n.return, W);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)) ws(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      ws(e);
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), ($e = e));
            break;
          }
          $e = t.return;
        }
  }
  function Td(e, t, n) {
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
              pe(n, n.return, u);
            }
          else {
            var a = Jn(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (u) {
              pe(n, n.return, u);
            }
          }
        (r & 64 && zd(n), r & 512 && ya(n, n.return));
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
            pe(n, n.return, u);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Ld(n);
      case 26:
      case 5:
        (rn(e, n), t === null && r & 4 && Pd(n), r & 512 && ya(n, n.return));
        break;
      case 12:
        rn(e, n);
        break;
      case 31:
        (rn(e, n), r & 4 && Dd(e, n));
        break;
      case 13:
        (rn(e, n),
          r & 4 && Ud(e, n),
          r & 64 &&
            ((e = n.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((n = Mm.bind(null, n)), ng(e, n)))));
        break;
      case 22:
        if (((r = n.memoizedState !== null || tn), !r)) {
          ((t = (t !== null && t.memoizedState !== null) || Oe), (a = tn));
          var l = Oe;
          ((tn = r),
            (Oe = t) && !l ? an(e, n, (n.subtreeFlags & 8772) !== 0) : rn(e, n),
            (tn = a),
            (Oe = l));
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
      e.tag === 5 && ((t = e.stateNode), t !== null && No(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var xe = null,
    rt = !1;
  function nn(e, t, n) {
    for (n = n.child; n !== null; ) (Id(e, t, n), (n = n.sibling));
  }
  function Id(e, t, n) {
    if (ct && typeof ct.onCommitFiberUnmount == 'function')
      try {
        ct.onCommitFiberUnmount($r, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Oe || Ut(n, t),
          nn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Oe || Ut(n, t);
        var r = xe,
          a = rt;
        (jn(n.type) && ((xe = n.stateNode), (rt = !1)),
          nn(e, t, n),
          Ca(n.stateNode),
          (xe = r),
          (rt = a));
        break;
      case 5:
        Oe || Ut(n, t);
      case 6:
        if (((r = xe), (a = rt), (xe = null), nn(e, t, n), (xe = r), (rt = a), xe !== null))
          if (rt)
            try {
              (xe.nodeType === 9
                ? xe.body
                : xe.nodeName === 'HTML'
                  ? xe.ownerDocument.body
                  : xe
              ).removeChild(n.stateNode);
            } catch (l) {
              pe(n, t, l);
            }
          else
            try {
              xe.removeChild(n.stateNode);
            } catch (l) {
              pe(n, t, l);
            }
        break;
      case 18:
        xe !== null &&
          (rt
            ? ((e = xe),
              Af(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                n.stateNode
              ),
              Ir(e))
            : Af(xe, n.stateNode));
        break;
      case 4:
        ((r = xe),
          (a = rt),
          (xe = n.stateNode.containerInfo),
          (rt = !0),
          nn(e, t, n),
          (xe = r),
          (rt = a));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (xn(2, n, t), Oe || xn(4, n, t), nn(e, t, n));
        break;
      case 1:
        (Oe ||
          (Ut(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function' && Ad(n, t, r)),
          nn(e, t, n));
        break;
      case 21:
        nn(e, t, n);
        break;
      case 22:
        ((Oe = (r = Oe) || n.memoizedState !== null), nn(e, t, n), (Oe = r));
        break;
      default:
        nn(e, t, n);
    }
  }
  function Dd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Ir(e);
      } catch (n) {
        pe(t, t.return, n);
      }
    }
  }
  function Ud(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ir(e);
      } catch (n) {
        pe(t, t.return, n);
      }
  }
  function jm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Od()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Od()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function Al(e, t) {
    var n = jm(e);
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
          l = e,
          u = t,
          d = u;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (jn(d.type)) {
                ((xe = d.stateNode), (rt = !1));
                break e;
              }
              break;
            case 5:
              ((xe = d.stateNode), (rt = !1));
              break e;
            case 3:
            case 4:
              ((xe = d.stateNode.containerInfo), (rt = !0));
              break e;
          }
          d = d.return;
        }
        if (xe === null) throw Error(s(160));
        (Id(l, u, a),
          (xe = null),
          (rt = !1),
          (l = a.alternate),
          l !== null && (l.return = null),
          (a.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Fd(t, e), (t = t.sibling));
  }
  var Ot = null;
  function Fd(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (at(t, e), lt(e), r & 4 && (xn(3, e, e.return), ga(3, e), xn(5, e, e.return)));
        break;
      case 1:
        (at(t, e),
          lt(e),
          r & 512 && (Oe || n === null || Ut(n, n.return)),
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
        var a = Ot;
        if ((at(t, e), lt(e), r & 512 && (Oe || n === null || Ut(n, n.return)), r & 4)) {
          var l = n !== null ? n.memoizedState : null;
          if (((r = e.memoizedState), n === null))
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  ((r = e.type), (n = e.memoizedProps), (a = a.ownerDocument || a));
                  t: switch (r) {
                    case 'title':
                      ((l = a.getElementsByTagName('title')[0]),
                        (!l ||
                          l[Vr] ||
                          l[Ve] ||
                          l.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          l.hasAttribute('itemprop')) &&
                          ((l = a.createElement(r)),
                          a.head.insertBefore(l, a.querySelector('head > title'))),
                        Ke(l, r, n),
                        (l[Ve] = e),
                        Fe(l),
                        (r = l));
                      break e;
                    case 'link':
                      var u = $f('link', 'href', a).get(r + (n.href || ''));
                      if (u) {
                        for (var d = 0; d < u.length; d++)
                          if (
                            ((l = u[d]),
                            l.getAttribute('href') ===
                              (n.href == null || n.href === '' ? null : n.href) &&
                              l.getAttribute('rel') === (n.rel == null ? null : n.rel) &&
                              l.getAttribute('title') === (n.title == null ? null : n.title) &&
                              l.getAttribute('crossorigin') ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            u.splice(d, 1);
                            break t;
                          }
                      }
                      ((l = a.createElement(r)), Ke(l, r, n), a.head.appendChild(l));
                      break;
                    case 'meta':
                      if ((u = $f('meta', 'content', a).get(r + (n.content || '')))) {
                        for (d = 0; d < u.length; d++)
                          if (
                            ((l = u[d]),
                            l.getAttribute('content') ===
                              (n.content == null ? null : '' + n.content) &&
                              l.getAttribute('name') === (n.name == null ? null : n.name) &&
                              l.getAttribute('property') ===
                                (n.property == null ? null : n.property) &&
                              l.getAttribute('http-equiv') ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              l.getAttribute('charset') === (n.charSet == null ? null : n.charSet))
                          ) {
                            u.splice(d, 1);
                            break t;
                          }
                      }
                      ((l = a.createElement(r)), Ke(l, r, n), a.head.appendChild(l));
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  ((l[Ve] = e), Fe(l), (r = l));
                }
                e.stateNode = r;
              } else Hf(a, e.type, e.stateNode);
            else e.stateNode = Ff(a, r, e.memoizedProps);
          else
            l !== r
              ? (l === null
                  ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                  : l.count--,
                r === null ? Hf(a, e.type, e.stateNode) : Ff(a, r, e.memoizedProps))
              : r === null && e.stateNode !== null && Wi(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (at(t, e),
          lt(e),
          r & 512 && (Oe || n === null || Ut(n, n.return)),
          n !== null && r & 4 && Wi(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if ((at(t, e), lt(e), r & 512 && (Oe || n === null || Ut(n, n.return)), e.flags & 32)) {
          a = e.stateNode;
          try {
            or(a, '');
          } catch (D) {
            pe(e, e.return, D);
          }
        }
        (r & 4 &&
          e.stateNode != null &&
          ((a = e.memoizedProps), Wi(e, a, n !== null ? n.memoizedProps : a)),
          r & 1024 && (Gi = !0));
        break;
      case 6:
        if ((at(t, e), lt(e), r & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((r = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = r;
          } catch (D) {
            pe(e, e.return, D);
          }
        }
        break;
      case 3:
        if (
          ((Wl = null),
          (a = Ot),
          (Ot = Vl(t.containerInfo)),
          at(t, e),
          (Ot = a),
          lt(e),
          r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ir(t.containerInfo);
          } catch (D) {
            pe(e, e.return, D);
          }
        Gi && ((Gi = !1), $d(e));
        break;
      case 4:
        ((r = Ot), (Ot = Vl(e.stateNode.containerInfo)), at(t, e), lt(e), (Ot = r));
        break;
      case 12:
        (at(t, e), lt(e));
        break;
      case 31:
        (at(t, e),
          lt(e),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Al(e, r))));
        break;
      case 13:
        (at(t, e),
          lt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
            (Rl = ut()),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Al(e, r))));
        break;
      case 22:
        a = e.memoizedState !== null;
        var m = n !== null && n.memoizedState !== null,
          w = tn,
          C = Oe;
        if (((tn = w || a), (Oe = C || m), at(t, e), (Oe = C), (tn = w), lt(e), r & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = a ? t._visibility & -2 : t._visibility | 1,
              a && (n === null || m || tn || Oe || Zn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                m = n = t;
                try {
                  if (((l = m.stateNode), a))
                    ((u = l.style),
                      typeof u.setProperty == 'function'
                        ? u.setProperty('display', 'none', 'important')
                        : (u.display = 'none'));
                  else {
                    d = m.stateNode;
                    var z = m.memoizedProps.style,
                      k = z != null && z.hasOwnProperty('display') ? z.display : null;
                    d.style.display = k == null || typeof k == 'boolean' ? '' : ('' + k).trim();
                  }
                } catch (D) {
                  pe(m, m.return, D);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                m = t;
                try {
                  m.stateNode.nodeValue = a ? '' : m.memoizedProps;
                } catch (D) {
                  pe(m, m.return, D);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                m = t;
                try {
                  var E = m.stateNode;
                  a ? Pf(E, !0) : Pf(m.stateNode, !1);
                } catch (D) {
                  pe(m, m.return, D);
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
          r !== null && ((n = r.retryQueue), n !== null && ((r.retryQueue = null), Al(e, n))));
        break;
      case 19:
        (at(t, e),
          lt(e),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Al(e, r))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (at(t, e), lt(e));
    }
  }
  function lt(e) {
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
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode,
              l = Qi(e);
            zl(e, l, a);
            break;
          case 5:
            var u = n.stateNode;
            n.flags & 32 && (or(u, ''), (n.flags &= -33));
            var d = Qi(e);
            zl(e, d, u);
            break;
          case 3:
          case 4:
            var m = n.stateNode.containerInfo,
              w = Qi(e);
            Ki(e, w, m);
            break;
          default:
            throw Error(s(161));
        }
      } catch (C) {
        pe(e, e.return, C);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function $d(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ($d(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function rn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Td(e, t.alternate, t), (t = t.sibling));
  }
  function Zn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (xn(4, t, t.return), Zn(t));
          break;
        case 1:
          Ut(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == 'function' && Ad(t, t.return, n), Zn(t));
          break;
        case 27:
          Ca(t.stateNode);
        case 26:
        case 5:
          (Ut(t, t.return), Zn(t));
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
        l = t,
        u = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          (an(a, l, n), ga(4, l));
          break;
        case 1:
          if ((an(a, l, n), (r = l), (a = r.stateNode), typeof a.componentDidMount == 'function'))
            try {
              a.componentDidMount();
            } catch (w) {
              pe(r, r.return, w);
            }
          if (((r = l), (a = r.updateQueue), a !== null)) {
            var d = r.stateNode;
            try {
              var m = a.shared.hiddenCallbacks;
              if (m !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < m.length; a++) vc(m[a], d);
            } catch (w) {
              pe(r, r.return, w);
            }
          }
          (n && u & 64 && zd(l), ya(l, l.return));
          break;
        case 27:
          Ld(l);
        case 26:
        case 5:
          (an(a, l, n), n && r === null && u & 4 && Pd(l), ya(l, l.return));
          break;
        case 12:
          an(a, l, n);
          break;
        case 31:
          (an(a, l, n), n && u & 4 && Dd(a, l));
          break;
        case 13:
          (an(a, l, n), n && u & 4 && Ud(a, l));
          break;
        case 22:
          (l.memoizedState === null && an(a, l, n), ya(l, l.return));
          break;
        case 30:
          break;
        default:
          an(a, l, n);
      }
      t = t.sibling;
    }
  }
  function Yi(e, t) {
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
  function Tt(e, t, n, r) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Hd(e, t, n, r), (t = t.sibling));
  }
  function Hd(e, t, n, r) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Tt(e, t, n, r), a & 2048 && ga(9, t));
        break;
      case 1:
        Tt(e, t, n, r);
        break;
      case 3:
        (Tt(e, t, n, r),
          a & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ra(e))));
        break;
      case 12:
        if (a & 2048) {
          (Tt(e, t, n, r), (e = t.stateNode));
          try {
            var l = t.memoizedProps,
              u = l.id,
              d = l.onPostCommit;
            typeof d == 'function' &&
              d(u, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (m) {
            pe(t, t.return, m);
          }
        } else Tt(e, t, n, r);
        break;
      case 31:
        Tt(e, t, n, r);
        break;
      case 13:
        Tt(e, t, n, r);
        break;
      case 23:
        break;
      case 22:
        ((l = t.stateNode),
          (u = t.alternate),
          t.memoizedState !== null
            ? l._visibility & 2
              ? Tt(e, t, n, r)
              : va(e, t)
            : l._visibility & 2
              ? Tt(e, t, n, r)
              : ((l._visibility |= 2), Cr(e, t, n, r, (t.subtreeFlags & 10256) !== 0 || !1)),
          a & 2048 && Yi(u, t));
        break;
      case 24:
        (Tt(e, t, n, r), a & 2048 && Ji(t.alternate, t));
        break;
      default:
        Tt(e, t, n, r);
    }
  }
  function Cr(e, t, n, r, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var l = e,
        u = t,
        d = n,
        m = r,
        w = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Cr(l, u, d, m, a), ga(8, u));
          break;
        case 23:
          break;
        case 22:
          var C = u.stateNode;
          (u.memoizedState !== null
            ? C._visibility & 2
              ? Cr(l, u, d, m, a)
              : va(l, u)
            : ((C._visibility |= 2), Cr(l, u, d, m, a)),
            a && w & 2048 && Yi(u.alternate, u));
          break;
        case 24:
          (Cr(l, u, d, m, a), a && w & 2048 && Ji(u.alternate, u));
          break;
        default:
          Cr(l, u, d, m, a);
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
            (va(n, r), a & 2048 && Yi(r.alternate, r));
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
  function _r(e, t, n) {
    if (e.subtreeFlags & ba) for (e = e.child; e !== null; ) (Bd(e, t, n), (e = e.sibling));
  }
  function Bd(e, t, n) {
    switch (e.tag) {
      case 26:
        (_r(e, t, n),
          e.flags & ba && e.memoizedState !== null && hg(n, Ot, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        _r(e, t, n);
        break;
      case 3:
      case 4:
        var r = Ot;
        ((Ot = Vl(e.stateNode.containerInfo)), _r(e, t, n), (Ot = r));
        break;
      case 22:
        e.memoizedState === null &&
          ((r = e.alternate),
          r !== null && r.memoizedState !== null
            ? ((r = ba), (ba = 16777216), _r(e, t, n), (ba = r))
            : _r(e, t, n));
        break;
      default:
        _r(e, t, n);
    }
  }
  function Vd(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function wa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (($e = r), Wd(r, e));
        }
      Vd(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (qd(e), (e = e.sibling));
  }
  function qd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (wa(e), e.flags & 2048 && xn(9, e, e.return));
        break;
      case 3:
        wa(e);
        break;
      case 12:
        wa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Pl(e))
          : wa(e);
        break;
      default:
        wa(e);
    }
  }
  function Pl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (($e = r), Wd(r, e));
        }
      Vd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (xn(8, t, t.return), Pl(t));
          break;
        case 22:
          ((n = t.stateNode), n._visibility & 2 && ((n._visibility &= -3), Pl(t)));
          break;
        default:
          Pl(t);
      }
      e = e.sibling;
    }
  }
  function Wd(e, t) {
    for (; $e !== null; ) {
      var n = $e;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          xn(8, n, t);
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
      if (((r = n.child), r !== null)) ((r.return = n), ($e = r));
      else
        e: for (n = e; $e !== null; ) {
          r = $e;
          var a = r.sibling,
            l = r.return;
          if ((Md(r), r === n)) {
            $e = null;
            break e;
          }
          if (a !== null) {
            ((a.return = l), ($e = a));
            break e;
          }
          $e = l;
        }
    }
  }
  var zm = {
      getCacheForType: function (e) {
        var t = We(Pe),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return We(Pe).controller.signal;
      },
    },
    Am = typeof WeakMap == 'function' ? WeakMap : Map,
    ue = 0,
    ye = null,
    X = null,
    te = 0,
    fe = 0,
    gt = null,
    kn = !1,
    jr = !1,
    Zi = !1,
    ln = 0,
    Ee = 0,
    Sn = 0,
    Xn = 0,
    Xi = 0,
    yt = 0,
    zr = 0,
    xa = null,
    ot = null,
    es = !1,
    Rl = 0,
    Qd = 0,
    Ll = 1 / 0,
    Ol = null,
    En = null,
    De = 0,
    Nn = null,
    Ar = null,
    on = 0,
    ts = 0,
    ns = null,
    Kd = null,
    ka = 0,
    rs = null;
  function vt() {
    return (ue & 2) !== 0 && te !== 0 ? te & -te : _.T !== null ? us() : cu();
  }
  function Gd() {
    if (yt === 0)
      if ((te & 536870912) === 0 || re) {
        var e = Ha;
        ((Ha <<= 1), (Ha & 3932160) === 0 && (Ha = 262144), (yt = e));
      } else yt = 536870912;
    return ((e = ht.current), e !== null && (e.flags |= 32), yt);
  }
  function it(e, t, n) {
    (((e === ye && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null) &&
      (Pr(e, 0), Cn(e, te, yt, !1)),
      Br(e, n),
      ((ue & 2) === 0 || e !== ye) &&
        (e === ye && ((ue & 2) === 0 && (Xn |= n), Ee === 4 && Cn(e, te, yt, !1)), Ft(e)));
  }
  function Yd(e, t, n) {
    if ((ue & 6) !== 0) throw Error(s(327));
    var r = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Hr(e, t),
      a = r ? Lm(e, t) : ls(e, t, !0),
      l = r;
    do {
      if (a === 0) {
        jr && !r && Cn(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), l && !Pm(n))) {
          ((a = ls(e, t, !1)), (l = !1));
          continue;
        }
        if (a === 2) {
          if (((l = t), e.errorRecoveryDisabledLanes & l)) var u = 0;
          else
            ((u = e.pendingLanes & -536870913), (u = u !== 0 ? u : u & 536870912 ? 536870912 : 0));
          if (u !== 0) {
            t = u;
            e: {
              var d = e;
              a = xa;
              var m = d.current.memoizedState.isDehydrated;
              if ((m && (Pr(d, u).flags |= 256), (u = ls(d, u, !1)), u !== 2)) {
                if (Zi && !m) {
                  ((d.errorRecoveryDisabledLanes |= l), (Xn |= l), (a = 4));
                  break e;
                }
                ((l = ot), (ot = a), l !== null && (ot === null ? (ot = l) : ot.push.apply(ot, l)));
              }
              a = u;
            }
            if (((l = !1), a !== 2)) continue;
          }
        }
        if (a === 1) {
          (Pr(e, 0), Cn(e, t, 0, !0));
          break;
        }
        e: {
          switch (((r = e), (l = a), l)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Cn(r, t, yt, !kn);
              break e;
            case 2:
              ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((a = Rl + 300 - ut()), 10 < a)) {
            if ((Cn(r, t, yt, !kn), Va(r, 0, !0) !== 0)) break e;
            ((on = t),
              (r.timeoutHandle = jf(
                Jd.bind(null, r, n, ot, Ol, es, t, yt, Xn, zr, kn, l, 'Throttled', -0, 0),
                a
              )));
            break e;
          }
          Jd(r, n, ot, Ol, es, t, yt, Xn, zr, kn, l, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ft(e);
  }
  function Jd(e, t, n, r, a, l, u, d, m, w, C, z, k, E) {
    if (((e.timeoutHandle = -1), (z = t.subtreeFlags), z & 8192 || (z & 16785408) === 16785408)) {
      ((z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt,
      }),
        Bd(t, l, z));
      var D = (l & 62914560) === l ? Rl - ut() : (l & 4194048) === l ? Qd - ut() : 0;
      if (((D = mg(z, D)), D !== null)) {
        ((on = l),
          (e.cancelPendingCommit = D(lf.bind(null, e, t, l, n, r, a, u, d, m, C, z, null, k, E))),
          Cn(e, l, u, !w));
        return;
      }
    }
    lf(e, t, l, n, r, a, u, d, m);
  }
  function Pm(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var r = 0; r < n.length; r++) {
          var a = n[r],
            l = a.getSnapshot;
          a = a.value;
          try {
            if (!ft(l(), a)) return !1;
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
  function Cn(e, t, n, r) {
    ((t &= ~Xi),
      (t &= ~Xn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      r && (e.warmLanes |= t),
      (r = e.expirationTimes));
    for (var a = t; 0 < a; ) {
      var l = 31 - dt(a),
        u = 1 << l;
      ((r[l] = -1), (a &= ~u));
    }
    n !== 0 && iu(e, n, t);
  }
  function Tl() {
    return (ue & 6) === 0 ? (Sa(0), !1) : !0;
  }
  function as() {
    if (X !== null) {
      if (fe === 0) var e = X.return;
      else ((e = X), (Gt = Vn = null), wi(e), (xr = null), (la = 0), (e = X));
      for (; e !== null; ) (jd(e.alternate, e), (e = e.return));
      X = null;
    }
  }
  function Pr(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), Jm(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (on = 0),
      as(),
      (ye = e),
      (X = n = Qt(e.current, null)),
      (te = t),
      (fe = 0),
      (gt = null),
      (kn = !1),
      (jr = Hr(e, t)),
      (Zi = !1),
      (zr = yt = Xi = Xn = Sn = Ee = 0),
      (ot = xa = null),
      (es = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var a = 31 - dt(r),
          l = 1 << a;
        ((t |= e[a]), (r &= ~l));
      }
    return ((ln = t), nl(), n);
  }
  function Zd(e, t) {
    ((G = null),
      (_.H = pa),
      t === wr || t === cl
        ? ((t = hc()), (fe = 3))
        : t === si
          ? ((t = hc()), (fe = 4))
          : (fe =
              t === Mi
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (gt = t),
      X === null && ((Ee = 1), El(e, St(t, e.current))));
  }
  function Xd() {
    var e = ht.current;
    return e === null
      ? !0
      : (te & 4194048) === te
        ? Lt === null
        : (te & 62914560) === te || (te & 536870912) !== 0
          ? e === Lt
          : !1;
  }
  function ef() {
    var e = _.H;
    return ((_.H = pa), e === null ? pa : e);
  }
  function tf() {
    var e = _.A;
    return ((_.A = zm), e);
  }
  function Ml() {
    ((Ee = 4),
      kn || ((te & 4194048) !== te && ht.current !== null) || (jr = !0),
      ((Sn & 134217727) === 0 && (Xn & 134217727) === 0) || ye === null || Cn(ye, te, yt, !1));
  }
  function ls(e, t, n) {
    var r = ue;
    ue |= 2;
    var a = ef(),
      l = tf();
    ((ye !== e || te !== t) && ((Ol = null), Pr(e, t)), (t = !1));
    var u = Ee;
    e: do
      try {
        if (fe !== 0 && X !== null) {
          var d = X,
            m = gt;
          switch (fe) {
            case 8:
              (as(), (u = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ht.current === null && (t = !0);
              var w = fe;
              if (((fe = 0), (gt = null), Rr(e, d, m, w), n && jr)) {
                u = 0;
                break e;
              }
              break;
            default:
              ((w = fe), (fe = 0), (gt = null), Rr(e, d, m, w));
          }
        }
        (Rm(), (u = Ee));
        break;
      } catch (C) {
        Zd(e, C);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Gt = Vn = null),
      (ue = r),
      (_.H = a),
      (_.A = l),
      X === null && ((ye = null), (te = 0), nl()),
      u
    );
  }
  function Rm() {
    for (; X !== null; ) nf(X);
  }
  function Lm(e, t) {
    var n = ue;
    ue |= 2;
    var r = ef(),
      a = tf();
    ye !== e || te !== t ? ((Ol = null), (Ll = ut() + 500), Pr(e, t)) : (jr = Hr(e, t));
    e: do
      try {
        if (fe !== 0 && X !== null) {
          t = X;
          var l = gt;
          t: switch (fe) {
            case 1:
              ((fe = 0), (gt = null), Rr(e, t, l, 1));
              break;
            case 2:
            case 9:
              if (fc(l)) {
                ((fe = 0), (gt = null), rf(t));
                break;
              }
              ((t = function () {
                ((fe !== 2 && fe !== 9) || ye !== e || (fe = 7), Ft(e));
              }),
                l.then(t, t));
              break e;
            case 3:
              fe = 7;
              break e;
            case 4:
              fe = 5;
              break e;
            case 7:
              fc(l) ? ((fe = 0), (gt = null), rf(t)) : ((fe = 0), (gt = null), Rr(e, t, l, 7));
              break;
            case 5:
              var u = null;
              switch (X.tag) {
                case 26:
                  u = X.memoizedState;
                case 5:
                case 27:
                  var d = X;
                  if (u ? Bf(u) : d.stateNode.complete) {
                    ((fe = 0), (gt = null));
                    var m = d.sibling;
                    if (m !== null) X = m;
                    else {
                      var w = d.return;
                      w !== null ? ((X = w), Il(w)) : (X = null);
                    }
                    break t;
                  }
              }
              ((fe = 0), (gt = null), Rr(e, t, l, 5));
              break;
            case 6:
              ((fe = 0), (gt = null), Rr(e, t, l, 6));
              break;
            case 8:
              (as(), (Ee = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        Om();
        break;
      } catch (C) {
        Zd(e, C);
      }
    while (!0);
    return (
      (Gt = Vn = null),
      (_.H = r),
      (_.A = a),
      (ue = n),
      X !== null ? 0 : ((ye = null), (te = 0), nl(), Ee)
    );
  }
  function Om() {
    for (; X !== null && !rh(); ) nf(X);
  }
  function nf(e) {
    var t = Cd(e.alternate, e, ln);
    ((e.memoizedProps = e.pendingProps), t === null ? Il(e) : (X = t));
  }
  function rf(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = wd(n, t, t.pendingProps, t.type, void 0, te);
        break;
      case 11:
        t = wd(n, t, t.pendingProps, t.type.render, t.ref, te);
        break;
      case 5:
        wi(t);
      default:
        (jd(n, t), (t = X = tc(t, ln)), (t = Cd(n, t, ln)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Il(e) : (X = t));
  }
  function Rr(e, t, n, r) {
    ((Gt = Vn = null), wi(t), (xr = null), (la = 0));
    var a = t.return;
    try {
      if (km(e, a, t, n, te)) {
        ((Ee = 1), El(e, St(n, e.current)), (X = null));
        return;
      }
    } catch (l) {
      if (a !== null) throw ((X = a), l);
      ((Ee = 1), El(e, St(n, e.current)), (X = null));
      return;
    }
    t.flags & 32768
      ? (re || r === 1
          ? (e = !0)
          : jr || (te & 536870912) !== 0
            ? (e = !1)
            : ((kn = e = !0),
              (r === 2 || r === 9 || r === 3 || r === 6) &&
                ((r = ht.current), r !== null && r.tag === 13 && (r.flags |= 16384))),
        af(t, e))
      : Il(t);
  }
  function Il(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        af(t, kn);
        return;
      }
      e = t.return;
      var n = Nm(t.alternate, t, ln);
      if (n !== null) {
        X = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        X = t;
        return;
      }
      X = t = e;
    } while (t !== null);
    Ee === 0 && (Ee = 5);
  }
  function af(e, t) {
    do {
      var n = Cm(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (X = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        X = e;
        return;
      }
      X = e = n;
    } while (e !== null);
    ((Ee = 6), (X = null));
  }
  function lf(e, t, n, r, a, l, u, d, m) {
    e.cancelPendingCommit = null;
    do Dl();
    while (De !== 0);
    if ((ue & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((l = t.lanes | t.childLanes),
        (l |= Qo),
        ph(e, n, l, u, d, m),
        e === ye && ((X = ye = null), (te = 0)),
        (Ar = t),
        (Nn = e),
        (on = n),
        (ts = l),
        (ns = a),
        (Kd = r),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Dm(Fa, function () {
              return (df(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (r = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || r)
      ) {
        ((r = _.T), (_.T = null), (a = T.p), (T.p = 2), (u = ue), (ue |= 4));
        try {
          _m(e, t, n);
        } finally {
          ((ue = u), (T.p = a), (_.T = r));
        }
      }
      ((De = 1), of(), sf(), uf());
    }
  }
  function of() {
    if (De === 1) {
      De = 0;
      var e = Nn,
        t = Ar,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = _.T), (_.T = null));
        var r = T.p;
        T.p = 2;
        var a = ue;
        ue |= 4;
        try {
          Fd(t, e);
          var l = ys,
            u = Wu(e.containerInfo),
            d = l.focusedElem,
            m = l.selectionRange;
          if (u !== d && d && d.ownerDocument && qu(d.ownerDocument.documentElement, d)) {
            if (m !== null && Ho(d)) {
              var w = m.start,
                C = m.end;
              if ((C === void 0 && (C = w), 'selectionStart' in d))
                ((d.selectionStart = w), (d.selectionEnd = Math.min(C, d.value.length)));
              else {
                var z = d.ownerDocument || document,
                  k = (z && z.defaultView) || window;
                if (k.getSelection) {
                  var E = k.getSelection(),
                    D = d.textContent.length,
                    W = Math.min(m.start, D),
                    ge = m.end === void 0 ? W : Math.min(m.end, D);
                  !E.extend && W > ge && ((u = ge), (ge = W), (W = u));
                  var v = Vu(d, W),
                    g = Vu(d, ge);
                  if (
                    v &&
                    g &&
                    (E.rangeCount !== 1 ||
                      E.anchorNode !== v.node ||
                      E.anchorOffset !== v.offset ||
                      E.focusNode !== g.node ||
                      E.focusOffset !== g.offset)
                  ) {
                    var b = z.createRange();
                    (b.setStart(v.node, v.offset),
                      E.removeAllRanges(),
                      W > ge
                        ? (E.addRange(b), E.extend(g.node, g.offset))
                        : (b.setEnd(g.node, g.offset), E.addRange(b)));
                  }
                }
              }
            }
            for (z = [], E = d; (E = E.parentNode); )
              E.nodeType === 1 && z.push({ element: E, left: E.scrollLeft, top: E.scrollTop });
            for (typeof d.focus == 'function' && d.focus(), d = 0; d < z.length; d++) {
              var j = z[d];
              ((j.element.scrollLeft = j.left), (j.element.scrollTop = j.top));
            }
          }
          ((Yl = !!gs), (ys = gs = null));
        } finally {
          ((ue = a), (T.p = r), (_.T = n));
        }
      }
      ((e.current = t), (De = 2));
    }
  }
  function sf() {
    if (De === 2) {
      De = 0;
      var e = Nn,
        t = Ar,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = _.T), (_.T = null));
        var r = T.p;
        T.p = 2;
        var a = ue;
        ue |= 4;
        try {
          Td(e, t.alternate, t);
        } finally {
          ((ue = a), (T.p = r), (_.T = n));
        }
      }
      De = 3;
    }
  }
  function uf() {
    if (De === 4 || De === 3) {
      ((De = 0), ah());
      var e = Nn,
        t = Ar,
        n = on,
        r = Kd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (De = 5)
        : ((De = 0), (Ar = Nn = null), cf(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (
        (a === 0 && (En = null),
        So(n),
        (t = t.stateNode),
        ct && typeof ct.onCommitFiberRoot == 'function')
      )
        try {
          ct.onCommitFiberRoot($r, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        ((t = _.T), (a = T.p), (T.p = 2), (_.T = null));
        try {
          for (var l = e.onRecoverableError, u = 0; u < r.length; u++) {
            var d = r[u];
            l(d.value, { componentStack: d.stack });
          }
        } finally {
          ((_.T = t), (T.p = a));
        }
      }
      ((on & 3) !== 0 && Dl(),
        Ft(e),
        (a = e.pendingLanes),
        (n & 261930) !== 0 && (a & 42) !== 0 ? (e === rs ? ka++ : ((ka = 0), (rs = e))) : (ka = 0),
        Sa(0));
    }
  }
  function cf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ra(t)));
  }
  function Dl() {
    return (of(), sf(), uf(), df());
  }
  function df() {
    if (De !== 5) return !1;
    var e = Nn,
      t = ts;
    ts = 0;
    var n = So(on),
      r = _.T,
      a = T.p;
    try {
      ((T.p = 32 > n ? 32 : n), (_.T = null), (n = ns), (ns = null));
      var l = Nn,
        u = on;
      if (((De = 0), (Ar = Nn = null), (on = 0), (ue & 6) !== 0)) throw Error(s(331));
      var d = ue;
      if (
        ((ue |= 4),
        qd(l.current),
        Hd(l, l.current, u, n),
        (ue = d),
        Sa(0, !1),
        ct && typeof ct.onPostCommitFiberRoot == 'function')
      )
        try {
          ct.onPostCommitFiberRoot($r, l);
        } catch {}
      return !0;
    } finally {
      ((T.p = a), (_.T = r), cf(e, t));
    }
  }
  function ff(e, t, n) {
    ((t = St(n, t)),
      (t = Ti(e.stateNode, t, 2)),
      (e = vn(e, t, 2)),
      e !== null && (Br(e, 2), Ft(e)));
  }
  function pe(e, t, n) {
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
            (typeof r.componentDidCatch == 'function' && (En === null || !En.has(r)))
          ) {
            ((e = St(n, e)),
              (n = fd(2)),
              (r = vn(t, n, 2)),
              r !== null && (pd(n, r, t, e), Br(r, 2), Ft(r)));
            break;
          }
        }
        t = t.return;
      }
  }
  function os(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Am();
      var a = new Set();
      r.set(t, a);
    } else ((a = r.get(t)), a === void 0 && ((a = new Set()), r.set(t, a)));
    a.has(n) || ((Zi = !0), a.add(n), (e = Tm.bind(null, e, t, n)), t.then(e, e));
  }
  function Tm(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      ye === e &&
        (te & n) === n &&
        (Ee === 4 || (Ee === 3 && (te & 62914560) === te && 300 > ut() - Rl)
          ? (ue & 2) === 0 && Pr(e, 0)
          : (Xi |= n),
        zr === te && (zr = 0)),
      Ft(e));
  }
  function pf(e, t) {
    (t === 0 && (t = ou()), (e = $n(e, t)), e !== null && (Br(e, t), Ft(e)));
  }
  function Mm(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), pf(e, n));
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
        throw Error(s(314));
    }
    (r !== null && r.delete(t), pf(e, n));
  }
  function Dm(e, t) {
    return bo(e, t);
  }
  var Ul = null,
    Lr = null,
    is = !1,
    Fl = !1,
    ss = !1,
    _n = 0;
  function Ft(e) {
    (e !== Lr && e.next === null && (Lr === null ? (Ul = Lr = e) : (Lr = Lr.next = e)),
      (Fl = !0),
      is || ((is = !0), Fm()));
  }
  function Sa(e, t) {
    if (!ss && Fl) {
      ss = !0;
      do
        for (var n = !1, r = Ul; r !== null; ) {
          if (e !== 0) {
            var a = r.pendingLanes;
            if (a === 0) var l = 0;
            else {
              var u = r.suspendedLanes,
                d = r.pingedLanes;
              ((l = (1 << (31 - dt(42 | e) + 1)) - 1),
                (l &= a & ~(u & ~d)),
                (l = l & 201326741 ? (l & 201326741) | 1 : l ? l | 2 : 0));
            }
            l !== 0 && ((n = !0), yf(r, l));
          } else
            ((l = te),
              (l = Va(
                r,
                r === ye ? l : 0,
                r.cancelPendingCommit !== null || r.timeoutHandle !== -1
              )),
              (l & 3) === 0 || Hr(r, l) || ((n = !0), yf(r, l)));
          r = r.next;
        }
      while (n);
      ss = !1;
    }
  }
  function Um() {
    hf();
  }
  function hf() {
    Fl = is = !1;
    var e = 0;
    _n !== 0 && Ym() && (e = _n);
    for (var t = ut(), n = null, r = Ul; r !== null; ) {
      var a = r.next,
        l = mf(r, t);
      (l === 0
        ? ((r.next = null), n === null ? (Ul = a) : (n.next = a), a === null && (Lr = n))
        : ((n = r), (e !== 0 || (l & 3) !== 0) && (Fl = !0)),
        (r = a));
    }
    ((De !== 0 && De !== 5) || Sa(e), _n !== 0 && (_n = 0));
  }
  function mf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        a = e.expirationTimes,
        l = e.pendingLanes & -62914561;
      0 < l;

    ) {
      var u = 31 - dt(l),
        d = 1 << u,
        m = a[u];
      (m === -1
        ? ((d & n) === 0 || (d & r) !== 0) && (a[u] = fh(d, t))
        : m <= t && (e.expiredLanes |= d),
        (l &= ~d));
    }
    if (
      ((t = ye),
      (n = te),
      (n = Va(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (r = e.callbackNode),
      n === 0 || (e === t && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null)
    )
      return (r !== null && r !== null && wo(r), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((n & 3) === 0 || Hr(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((r !== null && wo(r), So(n))) {
        case 2:
        case 8:
          n = au;
          break;
        case 32:
          n = Fa;
          break;
        case 268435456:
          n = lu;
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
      r !== null && r !== null && wo(r),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function gf(e, t) {
    if (De !== 0 && De !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Dl() && e.callbackNode !== n) return null;
    var r = te;
    return (
      (r = Va(e, e === ye ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      r === 0
        ? null
        : (Yd(e, r, t),
          mf(e, ut()),
          e.callbackNode != null && e.callbackNode === n ? gf.bind(null, e) : null)
    );
  }
  function yf(e, t) {
    if (Dl()) return null;
    Yd(e, t, !0);
  }
  function Fm() {
    Zm(function () {
      (ue & 6) !== 0 ? bo(ru, Um) : hf();
    });
  }
  function us() {
    if (_n === 0) {
      var e = vr;
      (e === 0 && ((e = $a), ($a <<= 1), ($a & 261888) === 0 && ($a = 256)), (_n = e));
    }
    return _n;
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
  function $m(e, t, n, r, a) {
    if (t === 'submit' && n && n.stateNode === a) {
      var l = vf((a[tt] || null).action),
        u = r.submitter;
      u &&
        ((t = (t = u[tt] || null) ? vf(t.formAction) : u.getAttribute('formAction')),
        t !== null && ((l = t), (u = null)));
      var d = new Za('action', 'action', null, r, a);
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (_n !== 0) {
                  var m = u ? bf(a, u) : new FormData(a);
                  zi(n, { pending: !0, data: m, method: a.method, action: l }, null, m);
                }
              } else
                typeof l == 'function' &&
                  (d.preventDefault(),
                  (m = u ? bf(a, u) : new FormData(a)),
                  zi(n, { pending: !0, data: m, method: a.method, action: l }, l, m));
            },
            currentTarget: a,
          },
        ],
      });
    }
  }
  for (var cs = 0; cs < Wo.length; cs++) {
    var ds = Wo[cs],
      Hm = ds.toLowerCase(),
      Bm = ds[0].toUpperCase() + ds.slice(1);
    Rt(Hm, 'on' + Bm);
  }
  (Rt(Gu, 'onAnimationEnd'),
    Rt(Yu, 'onAnimationIteration'),
    Rt(Ju, 'onAnimationStart'),
    Rt('dblclick', 'onDoubleClick'),
    Rt('focusin', 'onFocus'),
    Rt('focusout', 'onBlur'),
    Rt(lm, 'onTransitionRun'),
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
  var Ea =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Vm = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Ea)
    );
  function wf(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        a = r.event;
      r = r.listeners;
      e: {
        var l = void 0;
        if (t)
          for (var u = r.length - 1; 0 <= u; u--) {
            var d = r[u],
              m = d.instance,
              w = d.currentTarget;
            if (((d = d.listener), m !== l && a.isPropagationStopped())) break e;
            ((l = d), (a.currentTarget = w));
            try {
              l(a);
            } catch (C) {
              tl(C);
            }
            ((a.currentTarget = null), (l = m));
          }
        else
          for (u = 0; u < r.length; u++) {
            if (
              ((d = r[u]),
              (m = d.instance),
              (w = d.currentTarget),
              (d = d.listener),
              m !== l && a.isPropagationStopped())
            )
              break e;
            ((l = d), (a.currentTarget = w));
            try {
              l(a);
            } catch (C) {
              tl(C);
            }
            ((a.currentTarget = null), (l = m));
          }
      }
    }
  }
  function ee(e, t) {
    var n = t[Eo];
    n === void 0 && (n = t[Eo] = new Set());
    var r = e + '__bubble';
    n.has(r) || (xf(t, e, 2, !1), n.add(r));
  }
  function fs(e, t, n) {
    var r = 0;
    (t && (r |= 4), xf(n, e, r, t));
  }
  var $l = '_reactListening' + Math.random().toString(36).slice(2);
  function ps(e) {
    if (!e[$l]) {
      ((e[$l] = !0),
        pu.forEach(function (n) {
          n !== 'selectionchange' && (Vm.has(n) || fs(n, !1, e), fs(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$l] || ((t[$l] = !0), fs('selectionchange', !1, t));
    }
  }
  function xf(e, t, n, r) {
    switch (Yf(t)) {
      case 2:
        var a = vg;
        break;
      case 8:
        a = bg;
        break;
      default:
        a = js;
    }
    ((n = a.bind(null, t, n, e)),
      (a = void 0),
      !Lo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (a = !0),
      r
        ? a !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : a !== void 0
          ? e.addEventListener(t, n, { passive: a })
          : e.addEventListener(t, n, !1));
  }
  function hs(e, t, n, r, a) {
    var l = r;
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
              r = l = u;
              continue e;
            }
            d = d.parentNode;
          }
        }
        r = r.return;
      }
    Nu(function () {
      var w = l,
        C = Po(n),
        z = [];
      e: {
        var k = Xu.get(e);
        if (k !== void 0) {
          var E = Za,
            D = e;
          switch (e) {
            case 'keypress':
              if (Ya(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              E = Ih;
              break;
            case 'focusin':
              ((D = 'focus'), (E = Io));
              break;
            case 'focusout':
              ((D = 'blur'), (E = Io));
              break;
            case 'beforeblur':
            case 'afterblur':
              E = Io;
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
              E = ju;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              E = Nh;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              E = Fh;
              break;
            case Gu:
            case Yu:
            case Ju:
              E = jh;
              break;
            case Zu:
              E = Hh;
              break;
            case 'scroll':
            case 'scrollend':
              E = Sh;
              break;
            case 'wheel':
              E = Vh;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              E = Ah;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              E = Au;
              break;
            case 'toggle':
            case 'beforetoggle':
              E = Wh;
          }
          var W = (t & 4) !== 0,
            ge = !W && (e === 'scroll' || e === 'scrollend'),
            v = W ? (k !== null ? k + 'Capture' : null) : k;
          W = [];
          for (var g = w, b; g !== null; ) {
            var j = g;
            if (
              ((b = j.stateNode),
              (j = j.tag),
              (j !== 5 && j !== 26 && j !== 27) ||
                b === null ||
                v === null ||
                ((j = Wr(g, v)), j != null && W.push(Na(g, j, b))),
              ge)
            )
              break;
            g = g.return;
          }
          0 < W.length && ((k = new E(k, D, null, n, C)), z.push({ event: k, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((k = e === 'mouseover' || e === 'pointerover'),
            (E = e === 'mouseout' || e === 'pointerout'),
            k && n !== Ao && (D = n.relatedTarget || n.fromElement) && (tr(D) || D[er]))
          )
            break e;
          if (
            (E || k) &&
            ((k =
              C.window === C
                ? C
                : (k = C.ownerDocument)
                  ? k.defaultView || k.parentWindow
                  : window),
            E
              ? ((D = n.relatedTarget || n.toElement),
                (E = w),
                (D = D ? tr(D) : null),
                D !== null &&
                  ((ge = x(D)), (W = D.tag), D !== ge || (W !== 5 && W !== 27 && W !== 6)) &&
                  (D = null))
              : ((E = null), (D = w)),
            E !== D)
          ) {
            if (
              ((W = ju),
              (j = 'onMouseLeave'),
              (v = 'onMouseEnter'),
              (g = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((W = Au), (j = 'onPointerLeave'), (v = 'onPointerEnter'), (g = 'pointer')),
              (ge = E == null ? k : qr(E)),
              (b = D == null ? k : qr(D)),
              (k = new W(j, g + 'leave', E, n, C)),
              (k.target = ge),
              (k.relatedTarget = b),
              (j = null),
              tr(C) === w &&
                ((W = new W(v, g + 'enter', D, n, C)),
                (W.target = b),
                (W.relatedTarget = ge),
                (j = W)),
              (ge = j),
              E && D)
            )
              t: {
                for (W = qm, v = E, g = D, b = 0, j = v; j; j = W(j)) b++;
                j = 0;
                for (var $ = g; $; $ = W($)) j++;
                for (; 0 < b - j; ) ((v = W(v)), b--);
                for (; 0 < j - b; ) ((g = W(g)), j--);
                for (; b--; ) {
                  if (v === g || (g !== null && v === g.alternate)) {
                    W = v;
                    break t;
                  }
                  ((v = W(v)), (g = W(g)));
                }
                W = null;
              }
            else W = null;
            (E !== null && kf(z, k, E, W, !1), D !== null && ge !== null && kf(z, ge, D, W, !0));
          }
        }
        e: {
          if (
            ((k = w ? qr(w) : window),
            (E = k.nodeName && k.nodeName.toLowerCase()),
            E === 'select' || (E === 'input' && k.type === 'file'))
          )
            var ie = Du;
          else if (Mu(k))
            if (Uu) ie = nm;
            else {
              ie = em;
              var F = Xh;
            }
          else
            ((E = k.nodeName),
              !E || E.toLowerCase() !== 'input' || (k.type !== 'checkbox' && k.type !== 'radio')
                ? w && zo(w.elementType) && (ie = Du)
                : (ie = tm));
          if (ie && (ie = ie(e, w))) {
            Iu(z, ie, n, C);
            break e;
          }
          (F && F(e, k, w),
            e === 'focusout' &&
              w &&
              k.type === 'number' &&
              w.memoizedProps.value != null &&
              jo(k, 'number', k.value));
        }
        switch (((F = w ? qr(w) : window), e)) {
          case 'focusin':
            (Mu(F) || F.contentEditable === 'true') && ((cr = F), (Bo = w), (ea = null));
            break;
          case 'focusout':
            ea = Bo = cr = null;
            break;
          case 'mousedown':
            Vo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Vo = !1), Qu(z, n, C));
            break;
          case 'selectionchange':
            if (am) break;
          case 'keydown':
          case 'keyup':
            Qu(z, n, C);
        }
        var Y;
        if (Uo)
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
            ? Ou(e, n) && (ne = 'onCompositionEnd')
            : e === 'keydown' && n.keyCode === 229 && (ne = 'onCompositionStart');
        (ne &&
          (Pu &&
            n.locale !== 'ko' &&
            (ur || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && ur && (Y = Cu())
              : ((dn = C), (Oo = 'value' in dn ? dn.value : dn.textContent), (ur = !0))),
          (F = Hl(w, ne)),
          0 < F.length &&
            ((ne = new zu(ne, e, null, n, C)),
            z.push({ event: ne, listeners: F }),
            Y ? (ne.data = Y) : ((Y = Tu(n)), Y !== null && (ne.data = Y)))),
          (Y = Kh ? Gh(e, n) : Yh(e, n)) &&
            ((ne = Hl(w, 'onBeforeInput')),
            0 < ne.length &&
              ((F = new zu('onBeforeInput', 'beforeinput', null, n, C)),
              z.push({ event: F, listeners: ne }),
              (F.data = Y))),
          $m(z, e, w, n, C));
      }
      wf(z, t);
    });
  }
  function Na(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Hl(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var a = e,
        l = a.stateNode;
      if (
        ((a = a.tag),
        (a !== 5 && a !== 26 && a !== 27) ||
          l === null ||
          ((a = Wr(e, n)),
          a != null && r.unshift(Na(e, a, l)),
          (a = Wr(e, t)),
          a != null && r.push(Na(e, a, l))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function qm(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function kf(e, t, n, r, a) {
    for (var l = t._reactName, u = []; n !== null && n !== r; ) {
      var d = n,
        m = d.alternate,
        w = d.stateNode;
      if (((d = d.tag), m !== null && m === r)) break;
      ((d !== 5 && d !== 26 && d !== 27) ||
        w === null ||
        ((m = w),
        a
          ? ((w = Wr(n, l)), w != null && u.unshift(Na(n, w, m)))
          : a || ((w = Wr(n, l)), w != null && u.push(Na(n, w, m)))),
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
  function Ef(e, t) {
    return ((t = Sf(t)), Sf(e) === t);
  }
  function me(e, t, n, r, a, l) {
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
        Su(e, r, l);
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
          typeof l == 'function' &&
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
        r != null && (e.onclick = qt);
        break;
      case 'onScroll':
        r != null && ee('scroll', e);
        break;
      case 'onScrollEnd':
        r != null && ee('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(s(61));
          if (((n = r.__html), n != null)) {
            if (a.children != null) throw Error(s(60));
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
        (ee('beforetoggle', e), ee('toggle', e), qa(e, 'popover', r));
        break;
      case 'xlinkActuate':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', r);
        break;
      case 'xlinkArcrole':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', r);
        break;
      case 'xlinkRole':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:role', r);
        break;
      case 'xlinkShow':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:show', r);
        break;
      case 'xlinkTitle':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:title', r);
        break;
      case 'xlinkType':
        Vt(e, 'http://www.w3.org/1999/xlink', 'xlink:type', r);
        break;
      case 'xmlBase':
        Vt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', r);
        break;
      case 'xmlLang':
        Vt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', r);
        break;
      case 'xmlSpace':
        Vt(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', r);
        break;
      case 'is':
        qa(e, 'is', r);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < n.length) || (n[0] !== 'o' && n[0] !== 'O') || (n[1] !== 'n' && n[1] !== 'N')) &&
          ((n = xh.get(n) || n), qa(e, n, r));
    }
  }
  function ms(e, t, n, r, a, l) {
    switch (n) {
      case 'style':
        Su(e, r, l);
        break;
      case 'dangerouslySetInnerHTML':
        if (r != null) {
          if (typeof r != 'object' || !('__html' in r)) throw Error(s(61));
          if (((n = r.__html), n != null)) {
            if (a.children != null) throw Error(s(60));
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
        r != null && (e.onclick = qt);
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
        if (!hu.hasOwnProperty(n))
          e: {
            if (
              n[0] === 'o' &&
              n[1] === 'n' &&
              ((a = n.endsWith('Capture')),
              (t = n.slice(2, a ? n.length - 7 : void 0)),
              (l = e[tt] || null),
              (l = l != null ? l[n] : null),
              typeof l == 'function' && e.removeEventListener(t, l, a),
              typeof r == 'function')
            ) {
              (typeof l != 'function' &&
                l !== null &&
                (n in e ? (e[n] = null) : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, r, a));
              break e;
            }
            n in e ? (e[n] = r) : r === !0 ? e.setAttribute(n, '') : qa(e, n, r);
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
          l;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var u = n[l];
            if (u != null)
              switch (l) {
                case 'src':
                  r = !0;
                  break;
                case 'srcSet':
                  a = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, t));
                default:
                  me(e, t, l, u, n, null);
              }
          }
        (a && me(e, t, 'srcSet', n.srcSet, n, null), r && me(e, t, 'src', n.src, n, null));
        return;
      case 'input':
        ee('invalid', e);
        var d = (l = u = a = null),
          m = null,
          w = null;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var C = n[r];
            if (C != null)
              switch (r) {
                case 'name':
                  a = C;
                  break;
                case 'type':
                  u = C;
                  break;
                case 'checked':
                  m = C;
                  break;
                case 'defaultChecked':
                  w = C;
                  break;
                case 'value':
                  l = C;
                  break;
                case 'defaultValue':
                  d = C;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (C != null) throw Error(s(137, t));
                  break;
                default:
                  me(e, t, r, C, n, null);
              }
          }
        bu(e, l, d, m, w, u, a, !1);
        return;
      case 'select':
        (ee('invalid', e), (r = u = l = null));
        for (a in n)
          if (n.hasOwnProperty(a) && ((d = n[a]), d != null))
            switch (a) {
              case 'value':
                l = d;
                break;
              case 'defaultValue':
                u = d;
                break;
              case 'multiple':
                r = d;
              default:
                me(e, t, a, d, n, null);
            }
        ((t = l),
          (n = u),
          (e.multiple = !!r),
          t != null ? lr(e, !!r, t, !1) : n != null && lr(e, !!r, n, !0));
        return;
      case 'textarea':
        (ee('invalid', e), (l = a = r = null));
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
                l = d;
                break;
              case 'dangerouslySetInnerHTML':
                if (d != null) throw Error(s(91));
                break;
              default:
                me(e, t, u, d, n, null);
            }
        xu(e, r, a, l);
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
        for (r = 0; r < Ea.length; r++) ee(Ea[r], e);
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
                throw Error(s(137, t));
              default:
                me(e, t, w, r, n, null);
            }
        return;
      default:
        if (zo(t)) {
          for (C in n)
            n.hasOwnProperty(C) && ((r = n[C]), r !== void 0 && ms(e, t, C, r, n, void 0));
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
          l = null,
          u = null,
          d = null,
          m = null,
          w = null,
          C = null;
        for (E in n) {
          var z = n[E];
          if (n.hasOwnProperty(E) && z != null)
            switch (E) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                m = z;
              default:
                r.hasOwnProperty(E) || me(e, t, E, null, r, z);
            }
        }
        for (var k in r) {
          var E = r[k];
          if (((z = n[k]), r.hasOwnProperty(k) && (E != null || z != null)))
            switch (k) {
              case 'type':
                l = E;
                break;
              case 'name':
                a = E;
                break;
              case 'checked':
                w = E;
                break;
              case 'defaultChecked':
                C = E;
                break;
              case 'value':
                u = E;
                break;
              case 'defaultValue':
                d = E;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (E != null) throw Error(s(137, t));
                break;
              default:
                E !== z && me(e, t, k, E, r, z);
            }
        }
        _o(e, u, d, m, w, C, l, a);
        return;
      case 'select':
        E = u = d = k = null;
        for (l in n)
          if (((m = n[l]), n.hasOwnProperty(l) && m != null))
            switch (l) {
              case 'value':
                break;
              case 'multiple':
                E = m;
              default:
                r.hasOwnProperty(l) || me(e, t, l, null, r, m);
            }
        for (a in r)
          if (((l = r[a]), (m = n[a]), r.hasOwnProperty(a) && (l != null || m != null)))
            switch (a) {
              case 'value':
                k = l;
                break;
              case 'defaultValue':
                d = l;
                break;
              case 'multiple':
                u = l;
              default:
                l !== m && me(e, t, a, l, r, m);
            }
        ((t = d),
          (n = u),
          (r = E),
          k != null
            ? lr(e, !!n, k, !1)
            : !!r != !!n && (t != null ? lr(e, !!n, t, !0) : lr(e, !!n, n ? [] : '', !1)));
        return;
      case 'textarea':
        E = k = null;
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
          if (((a = r[u]), (l = n[u]), r.hasOwnProperty(u) && (a != null || l != null)))
            switch (u) {
              case 'value':
                k = a;
                break;
              case 'defaultValue':
                E = a;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (a != null) throw Error(s(91));
                break;
              default:
                a !== l && me(e, t, u, a, r, l);
            }
        wu(e, k, E);
        return;
      case 'option':
        for (var D in n)
          if (((k = n[D]), n.hasOwnProperty(D) && k != null && !r.hasOwnProperty(D)))
            switch (D) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                me(e, t, D, null, r, k);
            }
        for (m in r)
          if (((k = r[m]), (E = n[m]), r.hasOwnProperty(m) && k !== E && (k != null || E != null)))
            switch (m) {
              case 'selected':
                e.selected = k && typeof k != 'function' && typeof k != 'symbol';
                break;
              default:
                me(e, t, m, k, r, E);
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
          if (((k = r[w]), (E = n[w]), r.hasOwnProperty(w) && k !== E && (k != null || E != null)))
            switch (w) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (k != null) throw Error(s(137, t));
                break;
              default:
                me(e, t, w, k, r, E);
            }
        return;
      default:
        if (zo(t)) {
          for (var ge in n)
            ((k = n[ge]),
              n.hasOwnProperty(ge) &&
                k !== void 0 &&
                !r.hasOwnProperty(ge) &&
                ms(e, t, ge, void 0, r, k));
          for (C in r)
            ((k = r[C]),
              (E = n[C]),
              !r.hasOwnProperty(C) ||
                k === E ||
                (k === void 0 && E === void 0) ||
                ms(e, t, C, k, r, E));
          return;
        }
    }
    for (var v in n)
      ((k = n[v]),
        n.hasOwnProperty(v) && k != null && !r.hasOwnProperty(v) && me(e, t, v, null, r, k));
    for (z in r)
      ((k = r[z]),
        (E = n[z]),
        !r.hasOwnProperty(z) || k === E || (k == null && E == null) || me(e, t, z, k, r, E));
  }
  function Nf(e) {
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
          l = a.transferSize,
          u = a.initiatorType,
          d = a.duration;
        if (l && d && Nf(u)) {
          for (u = 0, d = a.responseEnd, r += 1; r < n.length; r++) {
            var m = n[r],
              w = m.startTime;
            if (w > d) break;
            var C = m.transferSize,
              z = m.initiatorType;
            C && Nf(z) && ((m = m.responseEnd), (u += C * (m < d ? 1 : (d - w) / (m - w))));
          }
          if ((--r, (t += (8 * (l + u)) / (a.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var gs = null,
    ys = null;
  function Bl(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Cf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function _f(e, t) {
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
  function vs(e, t) {
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
  var bs = null;
  function Ym() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === bs ? !1 : ((bs = e), !0)) : ((bs = null), !1);
  }
  var jf = typeof setTimeout == 'function' ? setTimeout : void 0,
    Jm = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    zf = typeof Promise == 'function' ? Promise : void 0,
    Zm =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof zf < 'u'
          ? function (e) {
              return zf.resolve(null).then(e).catch(Xm);
            }
          : jf;
  function Xm(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function jn(e) {
    return e === 'head';
  }
  function Af(e, t) {
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
        else if (n === 'html') Ca(e.ownerDocument.documentElement);
        else if (n === 'head') {
          ((n = e.ownerDocument.head), Ca(n));
          for (var l = n.firstChild; l; ) {
            var u = l.nextSibling,
              d = l.nodeName;
            (l[Vr] ||
              d === 'SCRIPT' ||
              d === 'STYLE' ||
              (d === 'LINK' && l.rel.toLowerCase() === 'stylesheet') ||
              n.removeChild(l),
              (l = u));
          }
        } else n === 'body' && Ca(e.ownerDocument.body);
      n = a;
    } while (n);
    Ir(t);
  }
  function Pf(e, t) {
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
  function ws(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (ws(n), No(n));
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
        if (!e[Vr])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((l = e.getAttribute('rel')),
                (l === 'stylesheet' && e.hasAttribute('data-precedence')) ||
                  l !== a.rel ||
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
                ((l = e.getAttribute('src')),
                (l !== (a.src == null ? null : a.src) ||
                  e.getAttribute('type') !== (a.type == null ? null : a.type) ||
                  e.getAttribute('crossorigin') !==
                    (a.crossOrigin == null ? null : a.crossOrigin)) &&
                  l &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var l = a.name == null ? null : '' + a.name;
        if (a.type === 'hidden' && e.getAttribute('name') === l) return e;
      } else return e;
      if (((e = _t(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function tg(e, t, n) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !n) ||
        ((e = _t(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Rf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = _t(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function xs(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function ks(e) {
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
  function _t(e) {
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
  var Ss = null;
  function Lf(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '/$' || n === '/&') {
          if (t === 0) return _t(e.nextSibling);
          t--;
        } else (n !== '$' && n !== '$!' && n !== '$?' && n !== '$~' && n !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Of(e) {
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
  function Tf(e, t, n) {
    switch (((t = Bl(n)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Ca(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    No(e);
  }
  var jt = new Map(),
    Mf = new Set();
  function Vl(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var sn = T.d;
  T.d = { f: rg, r: ag, D: lg, C: og, L: ig, m: sg, X: cg, S: ug, M: dg };
  function rg() {
    var e = sn.f(),
      t = Tl();
    return e || t;
  }
  function ag(e) {
    var t = nr(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Zc(t) : sn.r(e);
  }
  var Or = typeof document > 'u' ? null : document;
  function If(e, t, n) {
    var r = Or;
    if (r && typeof t == 'string' && t) {
      var a = Pt(t);
      ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
        typeof n == 'string' && (a += '[crossorigin="' + n + '"]'),
        Mf.has(a) ||
          (Mf.add(a),
          (e = { rel: e, crossOrigin: n, href: t }),
          r.querySelector(a) === null &&
            ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t))));
    }
  }
  function lg(e) {
    (sn.D(e), If('dns-prefetch', e, null));
  }
  function og(e, t) {
    (sn.C(e, t), If('preconnect', e, t));
  }
  function ig(e, t, n) {
    sn.L(e, t, n);
    var r = Or;
    if (r && e && t) {
      var a = 'link[rel="preload"][as="' + Pt(t) + '"]';
      t === 'image' && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + Pt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == 'string' && (a += '[imagesizes="' + Pt(n.imageSizes) + '"]'))
        : (a += '[href="' + Pt(e) + '"]');
      var l = a;
      switch (t) {
        case 'style':
          l = Tr(e);
          break;
        case 'script':
          l = Mr(e);
      }
      jt.has(l) ||
        ((e = O(
          { rel: 'preload', href: t === 'image' && n && n.imageSrcSet ? void 0 : e, as: t },
          n
        )),
        jt.set(l, e),
        r.querySelector(a) !== null ||
          (t === 'style' && r.querySelector(_a(l))) ||
          (t === 'script' && r.querySelector(ja(l))) ||
          ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t)));
    }
  }
  function sg(e, t) {
    sn.m(e, t);
    var n = Or;
    if (n && e) {
      var r = t && typeof t.as == 'string' ? t.as : 'script',
        a = 'link[rel="modulepreload"][as="' + Pt(r) + '"][href="' + Pt(e) + '"]',
        l = a;
      switch (r) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          l = Mr(e);
      }
      if (
        !jt.has(l) &&
        ((e = O({ rel: 'modulepreload', href: e }, t)), jt.set(l, e), n.querySelector(a) === null)
      ) {
        switch (r) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (n.querySelector(ja(l))) return;
        }
        ((r = n.createElement('link')), Ke(r, 'link', e), Fe(r), n.head.appendChild(r));
      }
    }
  }
  function ug(e, t, n) {
    sn.S(e, t, n);
    var r = Or;
    if (r && e) {
      var a = rr(r).hoistableStyles,
        l = Tr(e);
      t = t || 'default';
      var u = a.get(l);
      if (!u) {
        var d = { loading: 0, preload: null };
        if ((u = r.querySelector(_a(l)))) d.loading = 5;
        else {
          ((e = O({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
            (n = jt.get(l)) && Es(e, n));
          var m = (u = r.createElement('link'));
          (Fe(m),
            Ke(m, 'link', e),
            (m._p = new Promise(function (w, C) {
              ((m.onload = w), (m.onerror = C));
            })),
            m.addEventListener('load', function () {
              d.loading |= 1;
            }),
            m.addEventListener('error', function () {
              d.loading |= 2;
            }),
            (d.loading |= 4),
            ql(u, t, r));
        }
        ((u = { type: 'stylesheet', instance: u, count: 1, state: d }), a.set(l, u));
      }
    }
  }
  function cg(e, t) {
    sn.X(e, t);
    var n = Or;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Mr(e),
        l = r.get(a);
      l ||
        ((l = n.querySelector(ja(a))),
        l ||
          ((e = O({ src: e, async: !0 }, t)),
          (t = jt.get(a)) && Ns(e, t),
          (l = n.createElement('script')),
          Fe(l),
          Ke(l, 'link', e),
          n.head.appendChild(l)),
        (l = { type: 'script', instance: l, count: 1, state: null }),
        r.set(a, l));
    }
  }
  function dg(e, t) {
    sn.M(e, t);
    var n = Or;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Mr(e),
        l = r.get(a);
      l ||
        ((l = n.querySelector(ja(a))),
        l ||
          ((e = O({ src: e, async: !0, type: 'module' }, t)),
          (t = jt.get(a)) && Ns(e, t),
          (l = n.createElement('script')),
          Fe(l),
          Ke(l, 'link', e),
          n.head.appendChild(l)),
        (l = { type: 'script', instance: l, count: 1, state: null }),
        r.set(a, l));
    }
  }
  function Df(e, t, n, r) {
    var a = (a = q.current) ? Vl(a) : null;
    if (!a) throw Error(s(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof n.precedence == 'string' && typeof n.href == 'string'
          ? ((t = Tr(n.href)),
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
          e = Tr(n.href);
          var l = rr(a).hoistableStyles,
            u = l.get(e);
          if (
            (u ||
              ((a = a.ownerDocument || a),
              (u = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              l.set(e, u),
              (l = a.querySelector(_a(e))) && !l._p && ((u.instance = l), (u.state.loading = 5)),
              jt.has(e) ||
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
                jt.set(e, n),
                l || fg(a, e, n, u.state))),
            t && r === null)
          )
            throw Error(s(528, ''));
          return u;
        }
        if (t && r !== null) throw Error(s(529, ''));
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
        throw Error(s(444, e));
    }
  }
  function Tr(e) {
    return 'href="' + Pt(e) + '"';
  }
  function _a(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Uf(e) {
    return O({}, e, { 'data-precedence': e.precedence, precedence: null });
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
    return '[src="' + Pt(e) + '"]';
  }
  function ja(e) {
    return 'script[async]' + e;
  }
  function Ff(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var r = e.querySelector('style[data-href~="' + Pt(n.href) + '"]');
          if (r) return ((t.instance = r), Fe(r), r);
          var a = O({}, n, {
            'data-href': n.href,
            'data-precedence': n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement('style')),
            Fe(r),
            Ke(r, 'style', a),
            ql(r, n.precedence, e),
            (t.instance = r)
          );
        case 'stylesheet':
          a = Tr(n.href);
          var l = e.querySelector(_a(a));
          if (l) return ((t.state.loading |= 4), (t.instance = l), Fe(l), l);
          ((r = Uf(n)),
            (a = jt.get(a)) && Es(r, a),
            (l = (e.ownerDocument || e).createElement('link')),
            Fe(l));
          var u = l;
          return (
            (u._p = new Promise(function (d, m) {
              ((u.onload = d), (u.onerror = m));
            })),
            Ke(l, 'link', r),
            (t.state.loading |= 4),
            ql(l, n.precedence, e),
            (t.instance = l)
          );
        case 'script':
          return (
            (l = Mr(n.src)),
            (a = e.querySelector(ja(l)))
              ? ((t.instance = a), Fe(a), a)
              : ((r = n),
                (a = jt.get(l)) && ((r = O({}, n)), Ns(r, a)),
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
          throw Error(s(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((r = t.instance), (t.state.loading |= 4), ql(r, n.precedence, e));
    return t.instance;
  }
  function ql(e, t, n) {
    for (
      var r = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        a = r.length ? r[r.length - 1] : null,
        l = a,
        u = 0;
      u < r.length;
      u++
    ) {
      var d = r[u];
      if (d.dataset.precedence === t) l = d;
      else if (l !== a) break;
    }
    l
      ? l.parentNode.insertBefore(e, l.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Es(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Ns(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Wl = null;
  function $f(e, t, n) {
    if (Wl === null) {
      var r = new Map(),
        a = (Wl = new Map());
      a.set(n, r);
    } else ((a = Wl), (r = a.get(n)), r || ((r = new Map()), a.set(n, r)));
    if (r.has(e)) return r;
    for (r.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var l = n[a];
      if (
        !(l[Vr] || l[Ve] || (e === 'link' && l.getAttribute('rel') === 'stylesheet')) &&
        l.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var u = l.getAttribute(t) || '';
        u = e + u;
        var d = r.get(u);
        d ? d.push(l) : r.set(u, [l]);
      }
    }
    return r;
  }
  function Hf(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(n, t === 'title' ? e.querySelector('head > title') : null));
  }
  function pg(e, t, n) {
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
  function Bf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function hg(e, t, n, r) {
    if (
      n.type === 'stylesheet' &&
      (typeof r.media != 'string' || matchMedia(r.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var a = Tr(r.href),
          l = t.querySelector(_a(a));
        if (l) {
          ((t = l._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Ql.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = l),
            Fe(l));
          return;
        }
        ((l = t.ownerDocument || t),
          (r = Uf(r)),
          (a = jt.get(a)) && Es(r, a),
          (l = l.createElement('link')),
          Fe(l));
        var u = l;
        ((u._p = new Promise(function (d, m) {
          ((u.onload = d), (u.onerror = m));
        })),
          Ke(l, 'link', r),
          (n.instance = l));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = Ql.bind(e)),
          t.addEventListener('load', n),
          t.addEventListener('error', n)));
    }
  }
  var Cs = 0;
  function mg(e, t) {
    return (
      e.stylesheets && e.count === 0 && Gl(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var r = setTimeout(function () {
              if ((e.stylesheets && Gl(e, e.stylesheets), e.unsuspend)) {
                var l = e.unsuspend;
                ((e.unsuspend = null), l());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Cs === 0 && (Cs = 62500 * Gm());
            var a = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Gl(e, e.stylesheets), e.unsuspend))
                ) {
                  var l = e.unsuspend;
                  ((e.unsuspend = null), l());
                }
              },
              (e.imgBytes > Cs ? 50 : 800) + t
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
  function Ql() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gl(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Kl = null;
  function Gl(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Kl = new Map()), t.forEach(gg, e), (Kl = null), Ql.call(e)));
  }
  function gg(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Kl.get(e);
      if (n) var r = n.get(null);
      else {
        ((n = new Map()), Kl.set(e, n));
        for (
          var a = e.querySelectorAll('link[data-precedence],style[data-precedence]'), l = 0;
          l < a.length;
          l++
        ) {
          var u = a[l];
          (u.nodeName === 'LINK' || u.getAttribute('media') !== 'not all') &&
            (n.set(u.dataset.precedence, u), (r = u));
        }
        r && n.set(null, r);
      }
      ((a = t.instance),
        (u = a.getAttribute('data-precedence')),
        (l = n.get(u) || r),
        l === r && n.set(null, a),
        n.set(u, a),
        this.count++,
        (r = Ql.bind(this)),
        a.addEventListener('load', r),
        a.addEventListener('error', r),
        l
          ? l.parentNode.insertBefore(a, l.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(a, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var za = {
    $$typeof: ze,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0,
  };
  function yg(e, t, n, r, a, l, u, d, m) {
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
      (this.expirationTimes = xo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = xo(0)),
      (this.hiddenUpdates = xo(null)),
      (this.identifierPrefix = r),
      (this.onUncaughtError = a),
      (this.onCaughtError = l),
      (this.onRecoverableError = u),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = m),
      (this.incompleteTransitions = new Map()));
  }
  function Vf(e, t, n, r, a, l, u, d, m, w, C, z) {
    return (
      (e = new yg(e, t, n, u, m, w, C, z, d)),
      (t = 1),
      l === !0 && (t |= 24),
      (l = pt(3, null, null, t)),
      (e.current = l),
      (l.stateNode = e),
      (t = li()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (l.memoizedState = { element: r, isDehydrated: n, cache: t }),
      ui(l),
      e
    );
  }
  function qf(e) {
    return e ? ((e = pr), e) : pr;
  }
  function Wf(e, t, n, r, a, l) {
    ((a = qf(a)),
      r.context === null ? (r.context = a) : (r.pendingContext = a),
      (r = yn(t)),
      (r.payload = { element: n }),
      (l = l === void 0 ? null : l),
      l !== null && (r.callback = l),
      (n = vn(e, r, t)),
      n !== null && (it(n, e, t), ia(n, e, t)));
  }
  function Qf(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function _s(e, t) {
    (Qf(e, t), (e = e.alternate) && Qf(e, t));
  }
  function Kf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $n(e, 67108864);
      (t !== null && it(t, e, 67108864), _s(e, 67108864));
    }
  }
  function Gf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = vt();
      t = ko(t);
      var n = $n(e, t);
      (n !== null && it(n, e, t), _s(e, t));
    }
  }
  var Yl = !0;
  function vg(e, t, n, r) {
    var a = _.T;
    _.T = null;
    var l = T.p;
    try {
      ((T.p = 2), js(e, t, n, r));
    } finally {
      ((T.p = l), (_.T = a));
    }
  }
  function bg(e, t, n, r) {
    var a = _.T;
    _.T = null;
    var l = T.p;
    try {
      ((T.p = 8), js(e, t, n, r));
    } finally {
      ((T.p = l), (_.T = a));
    }
  }
  function js(e, t, n, r) {
    if (Yl) {
      var a = zs(r);
      if (a === null) (hs(e, t, r, Jl, n), Jf(e, r));
      else if (xg(a, e, t, n, r)) r.stopPropagation();
      else if ((Jf(e, r), t & 4 && -1 < wg.indexOf(e))) {
        for (; a !== null; ) {
          var l = nr(a);
          if (l !== null)
            switch (l.tag) {
              case 3:
                if (((l = l.stateNode), l.current.memoizedState.isDehydrated)) {
                  var u = Mn(l.pendingLanes);
                  if (u !== 0) {
                    var d = l;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; u; ) {
                      var m = 1 << (31 - dt(u));
                      ((d.entanglements[1] |= m), (u &= ~m));
                    }
                    (Ft(l), (ue & 6) === 0 && ((Ll = ut() + 500), Sa(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((d = $n(l, 2)), d !== null && it(d, l, 2), Tl(), _s(l, 2));
            }
          if (((l = zs(r)), l === null && hs(e, t, r, Jl, n), l === a)) break;
          a = l;
        }
        a !== null && r.stopPropagation();
      } else hs(e, t, r, null, n);
    }
  }
  function zs(e) {
    return ((e = Po(e)), As(e));
  }
  var Jl = null;
  function As(e) {
    if (((Jl = null), (e = tr(e)), e !== null)) {
      var t = x(e);
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
    return ((Jl = e), null);
  }
  function Yf(e) {
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
        switch (lh()) {
          case ru:
            return 2;
          case au:
            return 8;
          case Fa:
          case oh:
            return 32;
          case lu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ps = !1,
    zn = null,
    An = null,
    Pn = null,
    Aa = new Map(),
    Pa = new Map(),
    Rn = [],
    wg =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Jf(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        zn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        An = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Pn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Aa.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Pa.delete(t.pointerId);
    }
  }
  function Ra(e, t, n, r, a, l) {
    return e === null || e.nativeEvent !== l
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: l,
          targetContainers: [a],
        }),
        t !== null && ((t = nr(t)), t !== null && Kf(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e);
  }
  function xg(e, t, n, r, a) {
    switch (t) {
      case 'focusin':
        return ((zn = Ra(zn, e, t, n, r, a)), !0);
      case 'dragenter':
        return ((An = Ra(An, e, t, n, r, a)), !0);
      case 'mouseover':
        return ((Pn = Ra(Pn, e, t, n, r, a)), !0);
      case 'pointerover':
        var l = a.pointerId;
        return (Aa.set(l, Ra(Aa.get(l) || null, e, t, n, r, a)), !0);
      case 'gotpointercapture':
        return ((l = a.pointerId), Pa.set(l, Ra(Pa.get(l) || null, e, t, n, r, a)), !0);
    }
    return !1;
  }
  function Zf(e) {
    var t = tr(e.target);
    if (t !== null) {
      var n = x(t);
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
  function Zl(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = zs(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Ao = r), n.target.dispatchEvent(r), (Ao = null));
      } else return ((t = nr(n)), t !== null && Kf(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Xf(e, t, n) {
    Zl(e) && n.delete(t);
  }
  function kg() {
    ((Ps = !1),
      zn !== null && Zl(zn) && (zn = null),
      An !== null && Zl(An) && (An = null),
      Pn !== null && Zl(Pn) && (Pn = null),
      Aa.forEach(Xf),
      Pa.forEach(Xf));
  }
  function Xl(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ps || ((Ps = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, kg)));
  }
  var eo = null;
  function ep(e) {
    eo !== e &&
      ((eo = e),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        eo === e && (eo = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            r = e[t + 1],
            a = e[t + 2];
          if (typeof r != 'function') {
            if (As(r || n) === null) continue;
            break;
          }
          var l = nr(n);
          l !== null &&
            (e.splice(t, 3),
            (t -= 3),
            zi(l, { pending: !0, data: a, method: n.method, action: r }, r, a));
        }
      }));
  }
  function Ir(e) {
    function t(m) {
      return Xl(m, e);
    }
    (zn !== null && Xl(zn, e),
      An !== null && Xl(An, e),
      Pn !== null && Xl(Pn, e),
      Aa.forEach(t),
      Pa.forEach(t));
    for (var n = 0; n < Rn.length; n++) {
      var r = Rn[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Rn.length && ((n = Rn[0]), n.blockedOn === null); )
      (Zf(n), n.blockedOn === null && Rn.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (r = 0; r < n.length; r += 3) {
        var a = n[r],
          l = n[r + 1],
          u = a[tt] || null;
        if (typeof l == 'function') u || ep(n);
        else if (u) {
          var d = null;
          if (l && l.hasAttribute('formAction')) {
            if (((a = l), (u = l[tt] || null))) d = u.formAction;
            else if (As(a) !== null) continue;
          } else d = u.action;
          (typeof d == 'function' ? (n[r + 1] = d) : (n.splice(r, 3), (r -= 3)), ep(n));
        }
      }
  }
  function tp() {
    function e(l) {
      l.canIntercept &&
        l.info === 'react-transition' &&
        l.intercept({
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
        var l = navigation.currentEntry;
        l &&
          l.url != null &&
          navigation.navigate(l.url, {
            state: l.getState(),
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
  function Rs(e) {
    this._internalRoot = e;
  }
  ((to.prototype.render = Rs.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var n = t.current,
        r = vt();
      Wf(n, r, e, t, null, null);
    }),
    (to.prototype.unmount = Rs.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Wf(e.current, 2, null, e, null, null), Tl(), (t[er] = null));
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
  var np = o.version;
  if (np !== '19.2.0') throw Error(s(527, np, '19.2.0'));
  T.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(s(188))
        : ((e = Object.keys(e).join(',')), Error(s(268, e)));
    return ((e = S(t)), (e = e !== null ? P(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Sg = {
    bundleType: 0,
    version: '19.2.0',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: _,
    reconcilerVersion: '19.2.0',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var no = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!no.isDisabled && no.supportsFiber)
      try {
        (($r = no.inject(Sg)), (ct = no));
      } catch {}
  }
  return (
    (Oa.createRoot = function (e, t) {
      if (!h(e)) throw Error(s(299));
      var n = !1,
        r = '',
        a = sd,
        l = ud,
        u = cd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (a = t.onUncaughtError),
          t.onCaughtError !== void 0 && (l = t.onCaughtError),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = Vf(e, 1, !1, null, null, n, r, null, a, l, u, tp)),
        (e[er] = t.current),
        ps(e),
        new Rs(t)
      );
    }),
    (Oa.hydrateRoot = function (e, t, n) {
      if (!h(e)) throw Error(s(299));
      var r = !1,
        a = '',
        l = sd,
        u = ud,
        d = cd,
        m = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (l = n.onUncaughtError),
          n.onCaughtError !== void 0 && (u = n.onCaughtError),
          n.onRecoverableError !== void 0 && (d = n.onRecoverableError),
          n.formState !== void 0 && (m = n.formState)),
        (t = Vf(e, 1, !0, t, n ?? null, r, a, m, l, u, d, tp)),
        (t.context = qf(null)),
        (n = t.current),
        (r = vt()),
        (r = ko(r)),
        (a = yn(r)),
        (a.callback = null),
        vn(n, a, r),
        (n = r),
        (t.current.lanes = n),
        Br(t, n),
        Ft(t),
        (e[er] = t.current),
        ps(e),
        new to(t)
      );
    }),
    (Oa.version = '19.2.0'),
    Oa
  );
}
var gp;
function Og() {
  if (gp) return Ls.exports;
  gp = 1;
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
  return (c(), (Ls.exports = Lg()), Ls.exports);
}
var Tg = Og();
const Mg = Rp(Tg),
  Ht = Object.create(null);
Ht.open = '0';
Ht.close = '1';
Ht.ping = '2';
Ht.pong = '3';
Ht.message = '4';
Ht.upgrade = '5';
Ht.noop = '6';
const oo = Object.create(null);
Object.keys(Ht).forEach(c => {
  oo[Ht[c]] = c;
});
const Ds = { type: 'error', data: 'parser error' },
  Lp =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Object.prototype.toString.call(Blob) === '[object BlobConstructor]'),
  Op = typeof ArrayBuffer == 'function',
  Tp = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c && c.buffer instanceof ArrayBuffer,
  Gs = ({ type: c, data: o }, i, s) =>
    Lp && o instanceof Blob
      ? i
        ? s(o)
        : yp(o, s)
      : Op && (o instanceof ArrayBuffer || Tp(o))
        ? i
          ? s(o)
          : yp(new Blob([o]), s)
        : s(Ht[c] + (o || '')),
  yp = (c, o) => {
    const i = new FileReader();
    return (
      (i.onload = function () {
        const s = i.result.split(',')[1];
        o('b' + (s || ''));
      }),
      i.readAsDataURL(c)
    );
  };
function vp(c) {
  return c instanceof Uint8Array
    ? c
    : c instanceof ArrayBuffer
      ? new Uint8Array(c)
      : new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
}
let Ts;
function Ig(c, o) {
  if (Lp && c.data instanceof Blob) return c.data.arrayBuffer().then(vp).then(o);
  if (Op && (c.data instanceof ArrayBuffer || Tp(c.data))) return o(vp(c.data));
  Gs(c, !1, i => {
    (Ts || (Ts = new TextEncoder()), o(Ts.encode(i)));
  });
}
const bp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  Ia = typeof Uint8Array > 'u' ? [] : new Uint8Array(256);
for (let c = 0; c < bp.length; c++) Ia[bp.charCodeAt(c)] = c;
const Dg = c => {
    let o = c.length * 0.75,
      i = c.length,
      s,
      h = 0,
      x,
      R,
      M,
      N;
    c[c.length - 1] === '=' && (o--, c[c.length - 2] === '=' && o--);
    const S = new ArrayBuffer(o),
      P = new Uint8Array(S);
    for (s = 0; s < i; s += 4)
      ((x = Ia[c.charCodeAt(s)]),
        (R = Ia[c.charCodeAt(s + 1)]),
        (M = Ia[c.charCodeAt(s + 2)]),
        (N = Ia[c.charCodeAt(s + 3)]),
        (P[h++] = (x << 2) | (R >> 4)),
        (P[h++] = ((R & 15) << 4) | (M >> 2)),
        (P[h++] = ((M & 3) << 6) | (N & 63)));
    return S;
  },
  Ug = typeof ArrayBuffer == 'function',
  Ys = (c, o) => {
    if (typeof c != 'string') return { type: 'message', data: Mp(c, o) };
    const i = c.charAt(0);
    return i === 'b'
      ? { type: 'message', data: Fg(c.substring(1), o) }
      : oo[i]
        ? c.length > 1
          ? { type: oo[i], data: c.substring(1) }
          : { type: oo[i] }
        : Ds;
  },
  Fg = (c, o) => {
    if (Ug) {
      const i = Dg(c);
      return Mp(i, o);
    } else return { base64: !0, data: c };
  },
  Mp = (c, o) => {
    switch (o) {
      case 'blob':
        return c instanceof Blob ? c : new Blob([c]);
      case 'arraybuffer':
      default:
        return c instanceof ArrayBuffer ? c : c.buffer;
    }
  },
  Ip = '',
  $g = (c, o) => {
    const i = c.length,
      s = new Array(i);
    let h = 0;
    c.forEach((x, R) => {
      Gs(x, !1, M => {
        ((s[R] = M), ++h === i && o(s.join(Ip)));
      });
    });
  },
  Hg = (c, o) => {
    const i = c.split(Ip),
      s = [];
    for (let h = 0; h < i.length; h++) {
      const x = Ys(i[h], o);
      if ((s.push(x), x.type === 'error')) break;
    }
    return s;
  };
function Bg() {
  return new TransformStream({
    transform(c, o) {
      Ig(c, i => {
        const s = i.length;
        let h;
        if (s < 126) ((h = new Uint8Array(1)), new DataView(h.buffer).setUint8(0, s));
        else if (s < 65536) {
          h = new Uint8Array(3);
          const x = new DataView(h.buffer);
          (x.setUint8(0, 126), x.setUint16(1, s));
        } else {
          h = new Uint8Array(9);
          const x = new DataView(h.buffer);
          (x.setUint8(0, 127), x.setBigUint64(1, BigInt(s)));
        }
        (c.data && typeof c.data != 'string' && (h[0] |= 128), o.enqueue(h), o.enqueue(i));
      });
    },
  });
}
let Ms;
function ro(c) {
  return c.reduce((o, i) => o + i.length, 0);
}
function ao(c, o) {
  if (c[0].length === o) return c.shift();
  const i = new Uint8Array(o);
  let s = 0;
  for (let h = 0; h < o; h++) ((i[h] = c[0][s++]), s === c[0].length && (c.shift(), (s = 0)));
  return (c.length && s < c[0].length && (c[0] = c[0].slice(s)), i);
}
function Vg(c, o) {
  Ms || (Ms = new TextDecoder());
  const i = [];
  let s = 0,
    h = -1,
    x = !1;
  return new TransformStream({
    transform(R, M) {
      for (i.push(R); ; ) {
        if (s === 0) {
          if (ro(i) < 1) break;
          const N = ao(i, 1);
          ((x = (N[0] & 128) === 128),
            (h = N[0] & 127),
            h < 126 ? (s = 3) : h === 126 ? (s = 1) : (s = 2));
        } else if (s === 1) {
          if (ro(i) < 2) break;
          const N = ao(i, 2);
          ((h = new DataView(N.buffer, N.byteOffset, N.length).getUint16(0)), (s = 3));
        } else if (s === 2) {
          if (ro(i) < 8) break;
          const N = ao(i, 8),
            S = new DataView(N.buffer, N.byteOffset, N.length),
            P = S.getUint32(0);
          if (P > Math.pow(2, 21) - 1) {
            M.enqueue(Ds);
            break;
          }
          ((h = P * Math.pow(2, 32) + S.getUint32(4)), (s = 3));
        } else {
          if (ro(i) < h) break;
          const N = ao(i, h);
          (M.enqueue(Ys(x ? N : Ms.decode(N), o)), (s = 0));
        }
        if (h === 0 || h > c) {
          M.enqueue(Ds);
          break;
        }
      }
    },
  });
}
const Dp = 4;
function Te(c) {
  if (c) return qg(c);
}
function qg(c) {
  for (var o in Te.prototype) c[o] = Te.prototype[o];
  return c;
}
Te.prototype.on = Te.prototype.addEventListener = function (c, o) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks['$' + c] = this._callbacks['$' + c] || []).push(o),
    this
  );
};
Te.prototype.once = function (c, o) {
  function i() {
    (this.off(c, i), o.apply(this, arguments));
  }
  return ((i.fn = o), this.on(c, i), this);
};
Te.prototype.off =
  Te.prototype.removeListener =
  Te.prototype.removeAllListeners =
  Te.prototype.removeEventListener =
    function (c, o) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var i = this._callbacks['$' + c];
      if (!i) return this;
      if (arguments.length == 1) return (delete this._callbacks['$' + c], this);
      for (var s, h = 0; h < i.length; h++)
        if (((s = i[h]), s === o || s.fn === o)) {
          i.splice(h, 1);
          break;
        }
      return (i.length === 0 && delete this._callbacks['$' + c], this);
    };
Te.prototype.emit = function (c) {
  this._callbacks = this._callbacks || {};
  for (
    var o = new Array(arguments.length - 1), i = this._callbacks['$' + c], s = 1;
    s < arguments.length;
    s++
  )
    o[s - 1] = arguments[s];
  if (i) {
    i = i.slice(0);
    for (var s = 0, h = i.length; s < h; ++s) i[s].apply(this, o);
  }
  return this;
};
Te.prototype.emitReserved = Te.prototype.emit;
Te.prototype.listeners = function (c) {
  return ((this._callbacks = this._callbacks || {}), this._callbacks['$' + c] || []);
};
Te.prototype.hasListeners = function (c) {
  return !!this.listeners(c).length;
};
const fo =
    typeof Promise == 'function' && typeof Promise.resolve == 'function'
      ? c => Promise.resolve().then(c)
      : (c, o) => o(c, 0),
  zt = typeof self < 'u' ? self : typeof window < 'u' ? window : Function('return this')(),
  Wg = 'arraybuffer';
function Up(c, ...o) {
  return o.reduce((i, s) => (c.hasOwnProperty(s) && (i[s] = c[s]), i), {});
}
const Qg = zt.setTimeout,
  Kg = zt.clearTimeout;
function po(c, o) {
  o.useNativeTimers
    ? ((c.setTimeoutFn = Qg.bind(zt)), (c.clearTimeoutFn = Kg.bind(zt)))
    : ((c.setTimeoutFn = zt.setTimeout.bind(zt)), (c.clearTimeoutFn = zt.clearTimeout.bind(zt)));
}
const Gg = 1.33;
function Yg(c) {
  return typeof c == 'string' ? Jg(c) : Math.ceil((c.byteLength || c.size) * Gg);
}
function Jg(c) {
  let o = 0,
    i = 0;
  for (let s = 0, h = c.length; s < h; s++)
    ((o = c.charCodeAt(s)),
      o < 128
        ? (i += 1)
        : o < 2048
          ? (i += 2)
          : o < 55296 || o >= 57344
            ? (i += 3)
            : (s++, (i += 4)));
  return i;
}
function Fp() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Zg(c) {
  let o = '';
  for (let i in c)
    c.hasOwnProperty(i) &&
      (o.length && (o += '&'), (o += encodeURIComponent(i) + '=' + encodeURIComponent(c[i])));
  return o;
}
function Xg(c) {
  let o = {},
    i = c.split('&');
  for (let s = 0, h = i.length; s < h; s++) {
    let x = i[s].split('=');
    o[decodeURIComponent(x[0])] = decodeURIComponent(x[1]);
  }
  return o;
}
class ey extends Error {
  constructor(o, i, s) {
    (super(o), (this.description = i), (this.context = s), (this.type = 'TransportError'));
  }
}
class Js extends Te {
  constructor(o) {
    (super(),
      (this.writable = !1),
      po(this, o),
      (this.opts = o),
      (this.query = o.query),
      (this.socket = o.socket),
      (this.supportsBinary = !o.forceBase64));
  }
  onError(o, i, s) {
    return (super.emitReserved('error', new ey(o, i, s)), this);
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
    const i = Ys(o, this.socket.binaryType);
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
class ty extends Js {
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
      let s = 0;
      (this._polling &&
        (s++,
        this.once('pollComplete', function () {
          --s || i();
        })),
        this.writable ||
          (s++,
          this.once('drain', function () {
            --s || i();
          })));
    } else i();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved('poll'));
  }
  onData(o) {
    const i = s => {
      if ((this.readyState === 'opening' && s.type === 'open' && this.onOpen(), s.type === 'close'))
        return (this.onClose({ description: 'transport closed by the server' }), !1);
      this.onPacket(s);
    };
    (Hg(o, this.socket.binaryType).forEach(i),
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
      $g(o, i => {
        this.doWrite(i, () => {
          ((this.writable = !0), this.emitReserved('drain'));
        });
      }));
  }
  uri() {
    const o = this.opts.secure ? 'https' : 'http',
      i = this.query || {};
    return (
      this.opts.timestampRequests !== !1 && (i[this.opts.timestampParam] = Fp()),
      !this.supportsBinary && !i.sid && (i.b64 = 1),
      this.createUri(o, i)
    );
  }
}
let $p = !1;
try {
  $p = typeof XMLHttpRequest < 'u' && 'withCredentials' in new XMLHttpRequest();
} catch {}
const ny = $p;
function ry() {}
class ay extends ty {
  constructor(o) {
    if ((super(o), typeof location < 'u')) {
      const i = location.protocol === 'https:';
      let s = location.port;
      (s || (s = i ? '443' : '80'),
        (this.xd = (typeof location < 'u' && o.hostname !== location.hostname) || s !== o.port));
    }
  }
  doWrite(o, i) {
    const s = this.request({ method: 'POST', data: o });
    (s.on('success', i),
      s.on('error', (h, x) => {
        this.onError('xhr post error', h, x);
      }));
  }
  doPoll() {
    const o = this.request();
    (o.on('data', this.onData.bind(this)),
      o.on('error', (i, s) => {
        this.onError('xhr poll error', i, s);
      }),
      (this.pollXhr = o));
  }
}
class $t extends Te {
  constructor(o, i, s) {
    (super(),
      (this.createRequest = o),
      po(this, s),
      (this._opts = s),
      (this._method = s.method || 'GET'),
      (this._uri = i),
      (this._data = s.data !== void 0 ? s.data : null),
      this._create());
  }
  _create() {
    var o;
    const i = Up(
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
    const s = (this._xhr = this.createRequest(i));
    try {
      s.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
          for (let h in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(h) &&
              s.setRequestHeader(h, this._opts.extraHeaders[h]);
        }
      } catch {}
      if (this._method === 'POST')
        try {
          s.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } catch {}
      try {
        s.setRequestHeader('Accept', '*/*');
      } catch {}
      ((o = this._opts.cookieJar) === null || o === void 0 || o.addCookies(s),
        'withCredentials' in s && (s.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (s.timeout = this._opts.requestTimeout),
        (s.onreadystatechange = () => {
          var h;
          (s.readyState === 3 &&
            ((h = this._opts.cookieJar) === null ||
              h === void 0 ||
              h.parseCookies(s.getResponseHeader('set-cookie'))),
            s.readyState === 4 &&
              (s.status === 200 || s.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof s.status == 'number' ? s.status : 0);
                  }, 0)));
        }),
        s.send(this._data));
    } catch (h) {
      this.setTimeoutFn(() => {
        this._onError(h);
      }, 0);
      return;
    }
    typeof document < 'u' &&
      ((this._index = $t.requestsCount++), ($t.requests[this._index] = this));
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
      (typeof document < 'u' && delete $t.requests[this._index], (this._xhr = null));
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
$t.requestsCount = 0;
$t.requests = {};
if (typeof document < 'u') {
  if (typeof attachEvent == 'function') attachEvent('onunload', wp);
  else if (typeof addEventListener == 'function') {
    const c = 'onpagehide' in zt ? 'pagehide' : 'unload';
    addEventListener(c, wp, !1);
  }
}
function wp() {
  for (let c in $t.requests) $t.requests.hasOwnProperty(c) && $t.requests[c].abort();
}
const ly = (function () {
  const c = Hp({ xdomain: !1 });
  return c && c.responseType !== null;
})();
class oy extends ay {
  constructor(o) {
    super(o);
    const i = o && o.forceBase64;
    this.supportsBinary = ly && !i;
  }
  request(o = {}) {
    return (Object.assign(o, { xd: this.xd }, this.opts), new $t(Hp, this.uri(), o));
  }
}
function Hp(c) {
  const o = c.xdomain;
  try {
    if (typeof XMLHttpRequest < 'u' && (!o || ny)) return new XMLHttpRequest();
  } catch {}
  if (!o)
    try {
      return new zt[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch {}
}
const Bp =
  typeof navigator < 'u' &&
  typeof navigator.product == 'string' &&
  navigator.product.toLowerCase() === 'reactnative';
class iy extends Js {
  get name() {
    return 'websocket';
  }
  doOpen() {
    const o = this.uri(),
      i = this.opts.protocols,
      s = Bp
        ? {}
        : Up(
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
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(o, i, s);
    } catch (h) {
      return this.emitReserved('error', h);
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
      const s = o[i],
        h = i === o.length - 1;
      Gs(s, this.supportsBinary, x => {
        try {
          this.doWrite(s, x);
        } catch {}
        h &&
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
      this.opts.timestampRequests && (i[this.opts.timestampParam] = Fp()),
      this.supportsBinary || (i.b64 = 1),
      this.createUri(o, i)
    );
  }
}
const Is = zt.WebSocket || zt.MozWebSocket;
class sy extends iy {
  createSocket(o, i, s) {
    return Bp ? new Is(o, i, s) : i ? new Is(o, i) : new Is(o);
  }
  doWrite(o, i) {
    this.ws.send(i);
  }
}
class uy extends Js {
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
          const i = Vg(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            s = o.readable.pipeThrough(i).getReader(),
            h = Bg();
          (h.readable.pipeTo(o.writable), (this._writer = h.writable.getWriter()));
          const x = () => {
            s.read()
              .then(({ done: M, value: N }) => {
                M || (this.onPacket(N), x());
              })
              .catch(M => {});
          };
          x();
          const R = { type: 'open' };
          (this.query.sid && (R.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(R).then(() => this.onOpen()));
        });
      }));
  }
  write(o) {
    this.writable = !1;
    for (let i = 0; i < o.length; i++) {
      const s = o[i],
        h = i === o.length - 1;
      this._writer.write(s).then(() => {
        h &&
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
const cy = { websocket: sy, webtransport: uy, polling: oy },
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
function Us(c) {
  if (c.length > 8e3) throw 'URI too long';
  const o = c,
    i = c.indexOf('['),
    s = c.indexOf(']');
  i != -1 &&
    s != -1 &&
    (c = c.substring(0, i) + c.substring(i, s).replace(/:/g, ';') + c.substring(s, c.length));
  let h = dy.exec(c || ''),
    x = {},
    R = 14;
  for (; R--; ) x[fy[R]] = h[R] || '';
  return (
    i != -1 &&
      s != -1 &&
      ((x.source = o),
      (x.host = x.host.substring(1, x.host.length - 1).replace(/;/g, ':')),
      (x.authority = x.authority.replace('[', '').replace(']', '').replace(/;/g, ':')),
      (x.ipv6uri = !0)),
    (x.pathNames = py(x, x.path)),
    (x.queryKey = hy(x, x.query)),
    x
  );
}
function py(c, o) {
  const i = /\/{2,9}/g,
    s = o.replace(i, '/').split('/');
  return (
    (o.slice(0, 1) == '/' || o.length === 0) && s.splice(0, 1),
    o.slice(-1) == '/' && s.splice(s.length - 1, 1),
    s
  );
}
function hy(c, o) {
  const i = {};
  return (
    o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (s, h, x) {
      h && (i[h] = x);
    }),
    i
  );
}
const Fs = typeof addEventListener == 'function' && typeof removeEventListener == 'function',
  io = [];
Fs &&
  addEventListener(
    'offline',
    () => {
      io.forEach(c => c());
    },
    !1
  );
class On extends Te {
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
      const s = Us(o);
      ((i.hostname = s.host),
        (i.secure = s.protocol === 'https' || s.protocol === 'wss'),
        (i.port = s.port),
        s.query && (i.query = s.query));
    } else i.host && (i.hostname = Us(i.host).host);
    (po(this, i),
      (this.secure =
        i.secure != null ? i.secure : typeof location < 'u' && location.protocol === 'https:'),
      i.hostname && !i.port && (i.port = this.secure ? '443' : '80'),
      (this.hostname = i.hostname || (typeof location < 'u' ? location.hostname : 'localhost')),
      (this.port =
        i.port ||
        (typeof location < 'u' && location.port ? location.port : this.secure ? '443' : '80')),
      (this.transports = []),
      (this._transportsByName = {}),
      i.transports.forEach(s => {
        const h = s.prototype.name;
        (this.transports.push(h), (this._transportsByName[h] = s));
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
      typeof this.opts.query == 'string' && (this.opts.query = Xg(this.opts.query)),
      Fs &&
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
    ((i.EIO = Dp), (i.transport = o), this.id && (i.sid = this.id));
    const s = Object.assign(
      {},
      this.opts,
      { query: i, socket: this, hostname: this.hostname, secure: this.secure, port: this.port },
      this.opts.transportOptions[o]
    );
    return new this._transportsByName[o](s);
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
      On.priorWebsocketSuccess &&
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
      (On.priorWebsocketSuccess = this.transport.name === 'websocket'),
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
      const s = this.writeBuffer[i].data;
      if ((s && (o += Yg(s)), i > 0 && o > this._maxPayload)) return this.writeBuffer.slice(0, i);
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
  write(o, i, s) {
    return (this._sendPacket('message', o, i, s), this);
  }
  send(o, i, s) {
    return (this._sendPacket('message', o, i, s), this);
  }
  _sendPacket(o, i, s, h) {
    if (
      (typeof i == 'function' && ((h = i), (i = void 0)),
      typeof s == 'function' && ((h = s), (s = null)),
      this.readyState === 'closing' || this.readyState === 'closed')
    )
      return;
    ((s = s || {}), (s.compress = s.compress !== !1));
    const x = { type: o, data: i, options: s };
    (this.emitReserved('packetCreate', x),
      this.writeBuffer.push(x),
      h && this.once('flush', h),
      this.flush());
  }
  close() {
    const o = () => {
        (this._onClose('forced close'), this.transport.close());
      },
      i = () => {
        (this.off('upgrade', i), this.off('upgradeError', i), o());
      },
      s = () => {
        (this.once('upgrade', i), this.once('upgradeError', i));
      };
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        ((this.readyState = 'closing'),
        this.writeBuffer.length
          ? this.once('drain', () => {
              this.upgrading ? s() : o();
            })
          : this.upgrading
            ? s()
            : o()),
      this
    );
  }
  _onError(o) {
    if (
      ((On.priorWebsocketSuccess = !1),
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
        Fs &&
          (this._beforeunloadEventListener &&
            removeEventListener('beforeunload', this._beforeunloadEventListener, !1),
          this._offlineEventListener))
      ) {
        const s = io.indexOf(this._offlineEventListener);
        s !== -1 && io.splice(s, 1);
      }
      ((this.readyState = 'closed'),
        (this.id = null),
        this.emitReserved('close', o, i),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
On.protocol = Dp;
class my extends On {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === 'open' && this.opts.upgrade))
      for (let o = 0; o < this._upgrades.length; o++) this._probe(this._upgrades[o]);
  }
  _probe(o) {
    let i = this.createTransport(o),
      s = !1;
    On.priorWebsocketSuccess = !1;
    const h = () => {
      s ||
        (i.send([{ type: 'ping', data: 'probe' }]),
        i.once('packet', O => {
          if (!s)
            if (O.type === 'pong' && O.data === 'probe') {
              if (((this.upgrading = !0), this.emitReserved('upgrading', i), !i)) return;
              ((On.priorWebsocketSuccess = i.name === 'websocket'),
                this.transport.pause(() => {
                  s ||
                    (this.readyState !== 'closed' &&
                      (P(),
                      this.setTransport(i),
                      i.send([{ type: 'upgrade' }]),
                      this.emitReserved('upgrade', i),
                      (i = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const V = new Error('probe error');
              ((V.transport = i.name), this.emitReserved('upgradeError', V));
            }
        }));
    };
    function x() {
      s || ((s = !0), P(), i.close(), (i = null));
    }
    const R = O => {
      const V = new Error('probe error: ' + O);
      ((V.transport = i.name), x(), this.emitReserved('upgradeError', V));
    };
    function M() {
      R('transport closed');
    }
    function N() {
      R('socket closed');
    }
    function S(O) {
      i && O.name !== i.name && x();
    }
    const P = () => {
      (i.removeListener('open', h),
        i.removeListener('error', R),
        i.removeListener('close', M),
        this.off('close', N),
        this.off('upgrading', S));
    };
    (i.once('open', h),
      i.once('error', R),
      i.once('close', M),
      this.once('close', N),
      this.once('upgrading', S),
      this._upgrades.indexOf('webtransport') !== -1 && o !== 'webtransport'
        ? this.setTimeoutFn(() => {
            s || i.open();
          }, 200)
        : i.open());
  }
  onHandshake(o) {
    ((this._upgrades = this._filterUpgrades(o.upgrades)), super.onHandshake(o));
  }
  _filterUpgrades(o) {
    const i = [];
    for (let s = 0; s < o.length; s++) ~this.transports.indexOf(o[s]) && i.push(o[s]);
    return i;
  }
}
let gy = class extends my {
  constructor(c, o = {}) {
    const i = typeof c == 'object' ? c : o;
    ((!i.transports || (i.transports && typeof i.transports[0] == 'string')) &&
      (i.transports = (i.transports || ['polling', 'websocket', 'webtransport'])
        .map(s => cy[s])
        .filter(s => !!s)),
      super(c, i));
  }
};
function yy(c, o = '', i) {
  let s = c;
  ((i = i || (typeof location < 'u' && location)),
    c == null && (c = i.protocol + '//' + i.host),
    typeof c == 'string' &&
      (c.charAt(0) === '/' && (c.charAt(1) === '/' ? (c = i.protocol + c) : (c = i.host + c)),
      /^(https?|wss?):\/\//.test(c) ||
        (typeof i < 'u' ? (c = i.protocol + '//' + c) : (c = 'https://' + c)),
      (s = Us(c))),
    s.port ||
      (/^(http|ws)$/.test(s.protocol)
        ? (s.port = '80')
        : /^(http|ws)s$/.test(s.protocol) && (s.port = '443')),
    (s.path = s.path || '/'));
  const h = s.host.indexOf(':') !== -1 ? '[' + s.host + ']' : s.host;
  return (
    (s.id = s.protocol + '://' + h + ':' + s.port + o),
    (s.href = s.protocol + '://' + h + (i && i.port === s.port ? '' : ':' + s.port)),
    s
  );
}
const vy = typeof ArrayBuffer == 'function',
  by = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c.buffer instanceof ArrayBuffer,
  Vp = Object.prototype.toString,
  wy =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Vp.call(Blob) === '[object BlobConstructor]'),
  xy =
    typeof File == 'function' ||
    (typeof File < 'u' && Vp.call(File) === '[object FileConstructor]');
function Zs(c) {
  return (
    (vy && (c instanceof ArrayBuffer || by(c))) ||
    (wy && c instanceof Blob) ||
    (xy && c instanceof File)
  );
}
function so(c, o) {
  if (!c || typeof c != 'object') return !1;
  if (Array.isArray(c)) {
    for (let i = 0, s = c.length; i < s; i++) if (so(c[i])) return !0;
    return !1;
  }
  if (Zs(c)) return !0;
  if (c.toJSON && typeof c.toJSON == 'function' && arguments.length === 1)
    return so(c.toJSON(), !0);
  for (const i in c) if (Object.prototype.hasOwnProperty.call(c, i) && so(c[i])) return !0;
  return !1;
}
function ky(c) {
  const o = [],
    i = c.data,
    s = c;
  return ((s.data = $s(i, o)), (s.attachments = o.length), { packet: s, buffers: o });
}
function $s(c, o) {
  if (!c) return c;
  if (Zs(c)) {
    const i = { _placeholder: !0, num: o.length };
    return (o.push(c), i);
  } else if (Array.isArray(c)) {
    const i = new Array(c.length);
    for (let s = 0; s < c.length; s++) i[s] = $s(c[s], o);
    return i;
  } else if (typeof c == 'object' && !(c instanceof Date)) {
    const i = {};
    for (const s in c) Object.prototype.hasOwnProperty.call(c, s) && (i[s] = $s(c[s], o));
    return i;
  }
  return c;
}
function Sy(c, o) {
  return ((c.data = Hs(c.data, o)), delete c.attachments, c);
}
function Hs(c, o) {
  if (!c) return c;
  if (c && c._placeholder === !0) {
    if (typeof c.num == 'number' && c.num >= 0 && c.num < o.length) return o[c.num];
    throw new Error('illegal attachments');
  } else if (Array.isArray(c)) for (let i = 0; i < c.length; i++) c[i] = Hs(c[i], o);
  else if (typeof c == 'object')
    for (const i in c) Object.prototype.hasOwnProperty.call(c, i) && (c[i] = Hs(c[i], o));
  return c;
}
const Ey = [
    'connect',
    'connect_error',
    'disconnect',
    'disconnecting',
    'newListener',
    'removeListener',
  ],
  Ny = 5;
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
class Cy {
  constructor(o) {
    this.replacer = o;
  }
  encode(o) {
    return (o.type === ae.EVENT || o.type === ae.ACK) && so(o)
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
      s = this.encodeAsString(i.packet),
      h = i.buffers;
    return (h.unshift(s), h);
  }
}
function xp(c) {
  return Object.prototype.toString.call(c) === '[object Object]';
}
class Xs extends Te {
  constructor(o) {
    (super(), (this.reviver = o));
  }
  add(o) {
    let i;
    if (typeof o == 'string') {
      if (this.reconstructor) throw new Error('got plaintext data when reconstructing a packet');
      i = this.decodeString(o);
      const s = i.type === ae.BINARY_EVENT;
      s || i.type === ae.BINARY_ACK
        ? ((i.type = s ? ae.EVENT : ae.ACK),
          (this.reconstructor = new _y(i)),
          i.attachments === 0 && super.emitReserved('decoded', i))
        : super.emitReserved('decoded', i);
    } else if (Zs(o) || o.base64)
      if (this.reconstructor)
        ((i = this.reconstructor.takeBinaryData(o)),
          i && ((this.reconstructor = null), super.emitReserved('decoded', i)));
      else throw new Error('got binary data when not reconstructing a packet');
    else throw new Error('Unknown type: ' + o);
  }
  decodeString(o) {
    let i = 0;
    const s = { type: Number(o.charAt(0)) };
    if (ae[s.type] === void 0) throw new Error('unknown packet type ' + s.type);
    if (s.type === ae.BINARY_EVENT || s.type === ae.BINARY_ACK) {
      const x = i + 1;
      for (; o.charAt(++i) !== '-' && i != o.length; );
      const R = o.substring(x, i);
      if (R != Number(R) || o.charAt(i) !== '-') throw new Error('Illegal attachments');
      s.attachments = Number(R);
    }
    if (o.charAt(i + 1) === '/') {
      const x = i + 1;
      for (; ++i && !(o.charAt(i) === ',' || i === o.length); );
      s.nsp = o.substring(x, i);
    } else s.nsp = '/';
    const h = o.charAt(i + 1);
    if (h !== '' && Number(h) == h) {
      const x = i + 1;
      for (; ++i; ) {
        const R = o.charAt(i);
        if (R == null || Number(R) != R) {
          --i;
          break;
        }
        if (i === o.length) break;
      }
      s.id = Number(o.substring(x, i + 1));
    }
    if (o.charAt(++i)) {
      const x = this.tryParse(o.substr(i));
      if (Xs.isPayloadValid(s.type, x)) s.data = x;
      else throw new Error('invalid payload');
    }
    return s;
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
        return xp(i);
      case ae.DISCONNECT:
        return i === void 0;
      case ae.CONNECT_ERROR:
        return typeof i == 'string' || xp(i);
      case ae.EVENT:
      case ae.BINARY_EVENT:
        return (
          Array.isArray(i) &&
          (typeof i[0] == 'number' || (typeof i[0] == 'string' && Ey.indexOf(i[0]) === -1))
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
class _y {
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
const jy = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Xs,
      Encoder: Cy,
      get PacketType() {
        return ae;
      },
      protocol: Ny,
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
const zy = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class qp extends Te {
  constructor(o, i, s) {
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
      s && s.auth && (this.auth = s.auth),
      (this._opts = Object.assign({}, s)),
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
    var s, h, x;
    if (zy.hasOwnProperty(o)) throw new Error('"' + o.toString() + '" is a reserved event name');
    if ((i.unshift(o), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
      return (this._addToQueue(i), this);
    const R = { type: ae.EVENT, data: i };
    if (
      ((R.options = {}),
      (R.options.compress = this.flags.compress !== !1),
      typeof i[i.length - 1] == 'function')
    ) {
      const S = this.ids++,
        P = i.pop();
      (this._registerAckCallback(S, P), (R.id = S));
    }
    const M =
        (h = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null ||
        h === void 0
          ? void 0
          : h.writable,
      N =
        this.connected &&
        !(!((x = this.io.engine) === null || x === void 0) && x._hasPingExpired());
    return (
      (this.flags.volatile && !M) ||
        (N ? (this.notifyOutgoingListeners(R), this.packet(R)) : this.sendBuffer.push(R)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(o, i) {
    var s;
    const h = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
    if (h === void 0) {
      this.acks[o] = i;
      return;
    }
    const x = this.io.setTimeoutFn(() => {
        delete this.acks[o];
        for (let M = 0; M < this.sendBuffer.length; M++)
          this.sendBuffer[M].id === o && this.sendBuffer.splice(M, 1);
        i.call(this, new Error('operation has timed out'));
      }, h),
      R = (...M) => {
        (this.io.clearTimeoutFn(x), i.apply(this, M));
      };
    ((R.withError = !0), (this.acks[o] = R));
  }
  emitWithAck(o, ...i) {
    return new Promise((s, h) => {
      const x = (R, M) => (R ? h(R) : s(M));
      ((x.withError = !0), i.push(x), this.emit(o, ...i));
    });
  }
  _addToQueue(o) {
    let i;
    typeof o[o.length - 1] == 'function' && (i = o.pop());
    const s = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: o,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (o.push((h, ...x) =>
      s !== this._queue[0]
        ? void 0
        : (h !== null
            ? s.tryCount > this._opts.retries && (this._queue.shift(), i && i(h))
            : (this._queue.shift(), i && i(null, ...x)),
          (s.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(s),
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
      for (const s of i) s.apply(this, o);
    }
    (super.emit.apply(this, o),
      this._pid &&
        o.length &&
        typeof o[o.length - 1] == 'string' &&
        (this._lastOffset = o[o.length - 1]));
  }
  ack(o) {
    const i = this;
    let s = !1;
    return function (...h) {
      s || ((s = !0), i.packet({ type: ae.ACK, id: o, data: h }));
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
      for (let s = 0; s < i.length; s++) if (o === i[s]) return (i.splice(s, 1), this);
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
      for (let s = 0; s < i.length; s++) if (o === i[s]) return (i.splice(s, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(o) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const i = this._anyOutgoingListeners.slice();
      for (const s of i) s.apply(this, o.data);
    }
  }
}
function Ur(c) {
  ((c = c || {}),
    (this.ms = c.min || 100),
    (this.max = c.max || 1e4),
    (this.factor = c.factor || 2),
    (this.jitter = c.jitter > 0 && c.jitter <= 1 ? c.jitter : 0),
    (this.attempts = 0));
}
Ur.prototype.duration = function () {
  var c = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var o = Math.random(),
      i = Math.floor(o * this.jitter * c);
    c = (Math.floor(o * 10) & 1) == 0 ? c - i : c + i;
  }
  return Math.min(c, this.max) | 0;
};
Ur.prototype.reset = function () {
  this.attempts = 0;
};
Ur.prototype.setMin = function (c) {
  this.ms = c;
};
Ur.prototype.setMax = function (c) {
  this.max = c;
};
Ur.prototype.setJitter = function (c) {
  this.jitter = c;
};
class Bs extends Te {
  constructor(o, i) {
    var s;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      o && typeof o == 'object' && ((i = o), (o = void 0)),
      (i = i || {}),
      (i.path = i.path || '/socket.io'),
      (this.opts = i),
      po(this, i),
      this.reconnection(i.reconnection !== !1),
      this.reconnectionAttempts(i.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(i.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(i.reconnectionDelayMax || 5e3),
      this.randomizationFactor((s = i.randomizationFactor) !== null && s !== void 0 ? s : 0.5),
      (this.backoff = new Ur({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(i.timeout == null ? 2e4 : i.timeout),
      (this._readyState = 'closed'),
      (this.uri = o));
    const h = i.parser || jy;
    ((this.encoder = new h.Encoder()),
      (this.decoder = new h.Decoder()),
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
      s = this;
    ((this._readyState = 'opening'), (this.skipReconnect = !1));
    const h = Mt(i, 'open', function () {
        (s.onopen(), o && o());
      }),
      x = M => {
        (this.cleanup(),
          (this._readyState = 'closed'),
          this.emitReserved('error', M),
          o ? o(M) : this.maybeReconnectOnOpen());
      },
      R = Mt(i, 'error', x);
    if (this._timeout !== !1) {
      const M = this._timeout,
        N = this.setTimeoutFn(() => {
          (h(), x(new Error('timeout')), i.close());
        }, M);
      (this.opts.autoUnref && N.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(N);
        }));
    }
    return (this.subs.push(h), this.subs.push(R), this);
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
    let s = this.nsps[o];
    return (
      s
        ? this._autoConnect && !s.active && s.connect()
        : ((s = new qp(this, o, i)), (this.nsps[o] = s)),
      s
    );
  }
  _destroy(o) {
    const i = Object.keys(this.nsps);
    for (const s of i) if (this.nsps[s].active) return;
    this._close();
  }
  _packet(o) {
    const i = this.encoder.encode(o);
    for (let s = 0; s < i.length; s++) this.engine.write(i[s], o.options);
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
    var s;
    (this.cleanup(),
      (s = this.engine) === null || s === void 0 || s.close(),
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
      const s = this.setTimeoutFn(() => {
        o.skipReconnect ||
          (this.emitReserved('reconnect_attempt', o.backoff.attempts),
          !o.skipReconnect &&
            o.open(h => {
              h
                ? ((o._reconnecting = !1), o.reconnect(), this.emitReserved('reconnect_error', h))
                : o.onreconnect();
            }));
      }, i);
      (this.opts.autoUnref && s.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(s);
        }));
    }
  }
  onreconnect() {
    const o = this.backoff.attempts;
    ((this._reconnecting = !1), this.backoff.reset(), this.emitReserved('reconnect', o));
  }
}
const Ta = {};
function uo(c, o) {
  (typeof c == 'object' && ((o = c), (c = void 0)), (o = o || {}));
  const i = yy(c, o.path || '/socket.io'),
    s = i.source,
    h = i.id,
    x = i.path,
    R = Ta[h] && x in Ta[h].nsps,
    M = o.forceNew || o['force new connection'] || o.multiplex === !1 || R;
  let N;
  return (
    M ? (N = new Bs(s, o)) : (Ta[h] || (Ta[h] = new Bs(s, o)), (N = Ta[h])),
    i.query && !o.query && (o.query = i.queryKey),
    N.socket(i.path, o)
  );
}
Object.assign(uo, { Manager: Bs, Socket: qp, io: uo, connect: uo });
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ay = c => c.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Py = c =>
    c.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, i, s) => (s ? s.toUpperCase() : i.toLowerCase())),
  kp = c => {
    const o = Py(c);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  Wp = (...c) =>
    c
      .filter((o, i, s) => !!o && o.trim() !== '' && s.indexOf(o) === i)
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
 */ var Ly = {
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
 */ const Oy = U.forwardRef(
  (
    {
      color: c = 'currentColor',
      size: o = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: s,
      className: h = '',
      children: x,
      iconNode: R,
      ...M
    },
    N
  ) =>
    U.createElement(
      'svg',
      {
        ref: N,
        ...Ly,
        width: o,
        height: o,
        stroke: c,
        strokeWidth: s ? (Number(i) * 24) / Number(o) : i,
        className: Wp('lucide', h),
        ...(!x && !Ry(M) && { 'aria-hidden': 'true' }),
        ...M,
      },
      [...R.map(([S, P]) => U.createElement(S, P)), ...(Array.isArray(x) ? x : [x])]
    )
);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const we = (c, o) => {
  const i = U.forwardRef(({ className: s, ...h }, x) =>
    U.createElement(Oy, {
      ref: x,
      iconNode: o,
      className: Wp(`lucide-${Ay(kp(c))}`, `lucide-${c}`, s),
      ...h,
    })
  );
  return ((i.displayName = kp(c)), i);
};
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ty = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
  ],
  My = we('arrow-right', Ty);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Iy = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
  lo = we('chevron-down', Iy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dy = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
    ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
  ],
  Qp = we('circle-alert', Dy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Uy = [
    [
      'path',
      {
        d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
        key: '9ktpf1',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ],
  Fy = we('compass', Uy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $y = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' }],
    ['path', { d: 'M2 12h20', key: '9i4pu4' }],
  ],
  Hy = we('globe', $y);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const By = [
    ['line', { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' }],
    ['line', { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' }],
    ['line', { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' }],
    ['line', { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' }],
  ],
  Vs = we('hash', By);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vy = [
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
  Sp = we('headphone-off', Vy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qy = [
    ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        key: 'r6nss1',
      },
    ],
  ],
  Wy = we('house', qy);
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
  Ky = we('image-off', Qy);
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
  Yy = we('log-in', Gy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jy = [
    ['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
    ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
  ],
  Zy = we('lock', Jy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xy = [
    ['path', { d: 'M4 5h16', key: '1tepv9' }],
    ['path', { d: 'M4 12h16', key: '1lakjw' }],
    ['path', { d: 'M4 19h16', key: '1djgab' }],
  ],
  Kp = we('menu', Xy);
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
  Gp = we('message-square', e0);
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
  n0 = we('mic', t0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r0 = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'M12 5v14', key: 's699le' }],
  ],
  a0 = we('plus', r0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const l0 = [
    ['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', key: 'v9h5vc' }],
    ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
    ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', key: '3uifl3' }],
    ['path', { d: 'M8 16H3v5', key: '1cv678' }],
  ],
  o0 = we('refresh-cw', l0);
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
  s0 = we('settings', i0);
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
  ho = we('shield', u0);
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
  Yp = we('trash-2', c0);
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
  f0 = we('triangle-alert', d0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const p0 = [
    ['path', { d: 'M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978', key: '1n3hpd' }],
    ['path', { d: 'M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978', key: 'rfe1zi' }],
    ['path', { d: 'M18 9h1.5a1 1 0 0 0 0-5H18', key: '7xy6bh' }],
    ['path', { d: 'M4 22h16', key: '57wxv0' }],
    ['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z', key: '1mhfuq' }],
    ['path', { d: 'M6 9H4.5a1 1 0 0 1 0-5H6', key: 'tex48p' }],
  ],
  h0 = we('trophy', p0);
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
  eu = we('users', m0);
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
  Ep = we('volume-2', g0);
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
  v0 = we('vote', y0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b0 = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  Jp = we('x', b0),
  Dr = ({
    src: c,
    alt: o,
    fallbackSrc: i,
    showFallbackIcon: s = !0,
    className: h = '',
    onError: x,
    ...R
  }) => {
    const [M, N] = U.useState(!1),
      [S, P] = U.useState(c),
      O = V => {
        if ((x && x(V), i && S !== i)) {
          P(i);
          return;
        }
        N(!0);
      };
    return M
      ? s
        ? f.jsx('div', {
            className: `bg-discord-hover flex items-center justify-center ${h}`,
            role: 'img',
            'aria-label': o || 'Imagen no disponible',
            children: f.jsx(Ky, { className: 'text-discord-text-muted', size: 24 }),
          })
        : null
      : f.jsx('img', { src: S, alt: o, className: h, onError: O, loading: 'lazy', ...R });
  },
  Zp = U.memo(({ isOpen: c, onClose: o, currentUser: i, socket: s }) => {
    const [h, x] = U.useState(!1),
      [R, M] = U.useState(null);
    if (!c) return null;
    const N = async (S, P = !0) => {
      if (P && R !== S) {
        (M(S), setTimeout(() => M(null), 5e3));
        return;
      }
      (x(!0), M(null));
      try {
        switch (S) {
          case 'clear-users':
            i && s.emit('admin:clear-users', { adminId: i.id });
            break;
          case 'clear-messages':
            i && s.emit('admin:clear-all-messages', { adminId: i.id });
            break;
        }
      } catch (O) {
        console.error('Error ejecutando acción:', O);
      } finally {
        setTimeout(() => x(!1), 1e3);
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
                  f.jsx(ho, { className: 'w-6 h-6 text-white' }),
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
                children: f.jsx(Jp, { size: 24 }),
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
                f.jsx(qs, {
                  icon: f.jsx(Gp, { size: 18 }),
                  title: 'Limpiar Todos los Mensajes',
                  description: 'Borra el historial completo de mensajes de todos los canales',
                  onClick: () => N('clear-messages'),
                  isConfirming: R === 'clear-messages',
                  isLoading: h,
                  variant: 'danger',
                }),
                f.jsx(qs, {
                  icon: f.jsx(Yp, { size: 18 }),
                  title: 'Reiniciar Usuarios y IPs',
                  description:
                    'Elimina todos los usuarios registrados y limpia sus IPs. Todos deberán volver a crear su usuario',
                  onClick: () => N('clear-users'),
                  isConfirming: R === 'clear-users',
                  isLoading: h,
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
  qs = U.memo(
    ({
      icon: c,
      title: o,
      description: i,
      onClick: s,
      isConfirming: h,
      isLoading: x,
      variant: R,
    }) => {
      const M = {
        danger: 'bg-red-600 hover:bg-red-700 border-red-500',
        warning: 'bg-orange-600 hover:bg-orange-700 border-orange-500',
        info: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
        success: 'bg-green-600 hover:bg-green-700 border-green-500',
      };
      return f.jsx('button', {
        onClick: s,
        disabled: x,
        className: `w-full p-4 rounded-lg border-2 transition-all ${h ? 'bg-yellow-600 border-yellow-500 animate-pulse' : M[R]} ${x ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'} text-left`,
        children: f.jsxs('div', {
          className: 'flex items-start gap-3',
          children: [
            f.jsx('div', { className: 'text-white mt-0.5', children: c }),
            f.jsxs('div', {
              className: 'flex-1',
              children: [
                f.jsx('h4', {
                  className: 'text-white font-semibold mb-1',
                  children: h ? '⚠️ Confirmar - Clic nuevamente' : o,
                }),
                f.jsx('p', {
                  className: 'text-sm text-gray-200 opacity-90',
                  children: h
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
qs.displayName = 'ActionButton';
Zp.displayName = 'AdminPanel';
var Bt = (c => ((c.ADMIN = 'admin'), (c.USER = 'user'), c))(Bt || {}),
  bt = (c => ((c.CHAT = 'CHAT'), (c.WHO_WE_ARE = 'WHO_WE_ARE'), (c.VOTING = 'VOTING'), c))(
    bt || {}
  );
const Ws = U.memo(({ currentUser: c, setCurrentUser: o, isConnected: i }) => {
  const [s, h] = U.useState(!1),
    x = (c == null ? void 0 : c.role) === Bt.ADMIN,
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
            children: f.jsx(Dr, {
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
      x &&
        f.jsxs(f.Fragment, {
          children: [
            f.jsx('div', { className: 'w-8 h-[2px] bg-discord-chat rounded-lg mx-auto mt-auto' }),
            f.jsx('button', {
              onClick: () => h(!0),
              className:
                'w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
              title: 'Panel de Administración',
              children: f.jsx(ho, { size: 24 }),
            }),
          ],
        }),
      x && f.jsx(Zp, { isOpen: s, onClose: () => h(!1), currentUser: c, socket: R }),
    ],
  });
});
Ws.displayName = 'Sidebar';
const w0 = ({
    activeView: c,
    currentChannelId: o,
    onChannelSelect: i,
    currentUser: s,
    activeVoiceChannel: h,
    onVoiceJoin: x,
    voiceStates: R,
    users: M,
  }) => {
    var N;
    const S = ({ id: O, name: V, description: H, icon: oe = Vs, view: Q = bt.CHAT }) => {
        const le = c === Q && (Q !== bt.CHAT || o === O);
        return f.jsxs('button', {
          onClick: () => i(Q, Q === bt.CHAT ? { id: O, name: V, description: H } : void 0),
          className: `w-full flex items-center px-2 py-[6px] rounded-md mb-[2px] group transition-colors ${le ? 'bg-discord-hover text-discord-text-header' : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'}`,
          children: [
            f.jsx(oe, { size: 20, className: 'mr-1.5 text-gray-400' }),
            f.jsx('span', {
              className: `font-medium truncate ${le ? 'text-white' : ''}`,
              children: V,
            }),
          ],
        });
      },
      P = ({ name: O }) => {
        const V = h === O,
          H = M.filter(oe => R[oe.id] === O);
        return f.jsxs('div', {
          className: 'mb-1',
          children: [
            f.jsxs('div', {
              onClick: () => x(O),
              className: `w-full flex items-center px-2 py-[6px] rounded-md group transition-colors cursor-pointer ${V ? 'bg-discord-hover text-white' : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'}`,
              children: [
                f.jsx(Ep, {
                  size: 20,
                  className: `mr-1.5 ${V ? 'text-green-500' : 'text-gray-400'}`,
                }),
                f.jsx('span', { className: 'font-medium truncate flex-1', children: O }),
              ],
            }),
            H.length > 0 &&
              f.jsx('div', {
                className: 'pl-8 pr-2 space-y-1 pb-1',
                children: H.map(oe =>
                  f.jsxs(
                    'div',
                    {
                      className:
                        'flex items-center group/user cursor-pointer py-0.5 rounded hover:bg-white/5',
                      children: [
                        f.jsx(Dr, {
                          src: oe.avatar,
                          alt: oe.username,
                          className: `w-5 h-5 rounded-full mr-2 border border-[#2b2d31] ${oe.status === 'online' ? 'ring-1 ring-green-500' : ''}`,
                          fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(oe.username)}&background=5865F2&color=fff&size=128`,
                        }),
                        f.jsx('span', {
                          className: `text-sm truncate ${oe.id === (s == null ? void 0 : s.id) ? 'font-bold text-white' : 'text-discord-text-muted group-hover/user:text-discord-text-normal'}`,
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
            f.jsx(lo, { size: 16, className: 'text-discord-text-header' }),
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
                    children: [f.jsx(lo, { size: 10, className: 'mr-0.5' }), 'INFORMACIÓN'],
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
                      children: [f.jsx(lo, { size: 10, className: 'mr-0.5' }), 'CANALES DE TEXTO'],
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
                    children: [f.jsx(lo, { size: 10, className: 'mr-0.5' }), 'CANALES DE VOZ'],
                  }),
                }),
                f.jsx(P, { name: 'Plaza UPG' }),
              ],
            }),
          ],
        }),
        h &&
          f.jsxs('div', {
            className: 'bg-[#232428] border-b border-gray-800 p-2 shrink-0',
            children: [
              f.jsxs('div', {
                className:
                  'flex items-center justify-between text-green-400 text-xs font-bold px-1 mb-1',
                children: [
                  f.jsxs('span', {
                    className: 'flex items-center',
                    children: [f.jsx(Ep, { size: 12, className: 'mr-1' }), ' Voz Conectada'],
                  }),
                  f.jsx('span', {
                    className: 'text-discord-text-muted font-normal cursor-pointer hover:underline',
                    children: h,
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
                    onClick: () => x(h),
                    className: 'hover:bg-gray-700 p-1 rounded',
                    children: f.jsx(Sp, { size: 14, className: 'text-discord-text-header' }),
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
                      f.jsx(Dr, {
                        src: (s == null ? void 0 : s.avatar) || '',
                        className: 'w-8 h-8 rounded-full object-cover',
                        alt: 'User',
                        fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent((s == null ? void 0 : s.username) || 'U')}&background=5865F2&color=fff&size=128`,
                      }),
                      f.jsx('div', {
                        className: `absolute bottom-0 right-0 w-3 h-3 border-2 border-[#232428] rounded-full ${(s == null ? void 0 : s.status) === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`,
                      }),
                    ],
                  }),
                  f.jsxs('div', {
                    className: 'text-sm min-w-0',
                    children: [
                      f.jsx('div', {
                        className: 'font-semibold text-white text-xs truncate w-20',
                        children: (s == null ? void 0 : s.username) || 'User',
                      }),
                      f.jsxs('div', {
                        className: 'text-[10px] text-gray-400 truncate',
                        children: [
                          '#',
                          ((N = s == null ? void 0 : s.id) == null ? void 0 : N.substring(0, 4)) ||
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
                    children: f.jsx(Sp, { size: 18 }),
                  }),
                  f.jsx('button', {
                    className:
                      'p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal',
                    children: f.jsx(s0, { size: 18 }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  Np = U.memo(w0),
  Cp = ({
    currentUser: c,
    users: o,
    currentChannel: i,
    onSendMessage: s,
    messages: h,
    onMenuToggle: x,
  }) => {
    const [R, M] = U.useState(''),
      [N, S] = U.useState(null),
      P = U.useRef(null),
      O = (c == null ? void 0 : c.role) === Bt.ADMIN,
      V = () => window.socketInstance;
    U.useEffect(() => {
      var Q;
      (Q = P.current) == null || Q.scrollIntoView({ behavior: 'smooth' });
    }, [h]);
    const H = Q => {
        (Q.preventDefault(), R.trim() && (s(R), M('')));
      },
      oe = () => {
        if (
          O &&
          confirm(`¿Estás seguro de que quieres eliminar todos los mensajes de #${i.name}?`)
        ) {
          const Q = V();
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
                  onClick: x,
                  className: 'md:hidden mr-3 text-discord-text-muted hover:text-white',
                  'aria-label': 'Abrir menú',
                  'aria-expanded': 'false',
                  children: f.jsx(Kp, { size: 24 }),
                }),
                f.jsx(Vs, { size: 24, className: 'text-discord-text-muted mr-2 shrink-0' }),
                f.jsx('span', { className: 'truncate', children: i.name }),
              ],
            }),
            O &&
              f.jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  f.jsxs('span', {
                    className:
                      'text-xs bg-discord-blurple px-2 py-1 rounded flex items-center gap-1',
                    children: [f.jsx(ho, { size: 12 }), 'ADMIN'],
                  }),
                  f.jsx('button', {
                    onClick: oe,
                    className:
                      'text-red-400 hover:text-red-300 px-2 py-1 hover:bg-red-500/10 rounded transition-colors',
                    title: 'Limpiar chat',
                    children: f.jsx(Yp, { size: 18 }),
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
                    children: f.jsx(Vs, { size: 40, className: 'text-white' }),
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
              h.map(Q => {
                const le = o.find(At => At.id === Q.userId),
                  He = typeof Q.timestamp == 'string' ? new Date(Q.timestamp) : Q.timestamp;
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
                        children: f.jsx(Dr, {
                          src: Q.avatar || (le == null ? void 0 : le.avatar) || '',
                          alt: Q.username || (le == null ? void 0 : le.username) || '',
                          className: 'w-full h-full object-cover',
                          fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(Q.username || (le == null ? void 0 : le.username) || '')}&background=5865F2&color=fff&size=128`,
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
                                style: { color: (le == null ? void 0 : le.color) || '#fff' },
                                children: Q.username || (le == null ? void 0 : le.username),
                              }),
                              (le == null ? void 0 : le.role) === Bt.ADMIN &&
                                f.jsx('span', {
                                  className:
                                    'text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2',
                                  children: 'ADMIN',
                                }),
                              f.jsx('span', {
                                className: 'text-xs text-discord-text-muted ml-2 font-medium',
                                children: He.toLocaleTimeString([], {
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
              f.jsx('div', { ref: P }),
            ],
          }),
        }),
        f.jsx('div', {
          className: 'px-4 pt-2 shrink-0',
          style: { paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' },
          children: f.jsx('div', {
            className: 'bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center',
            children: f.jsx('form', {
              onSubmit: H,
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
  x0 = ({ isOpen: c, onClose: o, user: i, onLoginWithDiscord: s }) => {
    if (!c) return null;
    const h = i.isGuest || i.username.startsWith('Invitado');
    return f.jsx('div', {
      className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4',
      onClick: o,
      children: f.jsxs('div', {
        className: 'bg-discord-sidebar rounded-lg shadow-xl max-w-md w-full overflow-hidden',
        onClick: x => x.stopPropagation(),
        children: [
          f.jsx('div', {
            className: 'relative h-24 bg-gradient-to-r from-purple-500 to-pink-500',
            children: f.jsx('button', {
              onClick: o,
              className:
                'absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full transition-colors',
              children: f.jsx(Jp, { size: 20, className: 'text-white' }),
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
                    f.jsx(Dr, {
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
                      h &&
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
                  h &&
                    f.jsxs('button', {
                      onClick: s,
                      className:
                        'w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2',
                      children: [f.jsx(Yy, { size: 20 }), 'Iniciar sesión con Discord'],
                    }),
                  !h &&
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
                              i.role === 'admin' ? '👑 Admin' : h ? '🚶 Invitado' : '👤 Miembro',
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
  co = U.memo(({ user: c, isCurrentUser: o, onClick: i }) => {
    const s = c.online === !1 || c.status === 'offline';
    return f.jsxs('div', {
      className: `flex items-center py-1.5 px-2 hover:bg-discord-hover rounded cursor-pointer group opacity-90 hover:opacity-100 ${o ? 'bg-discord-hover/50 border border-discord-blurple/30' : ''}`,
      onClick: i,
      children: [
        f.jsxs('div', {
          className: 'relative mr-3',
          children: [
            f.jsx(Dr, {
              src: c.avatar,
              alt: c.username,
              className: `w-8 h-8 rounded-full object-cover ${s ? 'grayscale opacity-60' : ''}`,
              fallbackSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.username)}&background=5865F2&color=fff&size=128`,
            }),
            !s &&
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
                  className: `font-medium text-sm truncate ${s ? 'text-discord-text-muted' : ''}`,
                  style: { color: s ? void 0 : c.color },
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
const Qs = U.memo(({ users: c, currentUserId: o, isMobileView: i = !1, onLoginWithDiscord: s }) => {
  const [h, x] = U.useState(!1),
    [R, M] = U.useState(null),
    N = c.filter(H =>
      H.isBot ? !1 : H.online === !0 || (H.online === void 0 && H.status === 'online')
    ),
    S = c.filter(H => H.isBot),
    P = c.filter(H => (H.isBot ? !1 : H.online === !1 || H.status === 'offline')),
    O = H => {
      H.id === o && (M(H), x(!0));
    },
    V = () => {
      (x(!1), s && s());
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
                children: ['Disponible — ', N.length],
              }),
              N.map(H =>
                f.jsx(co, { user: H, isCurrentUser: H.id === o, onClick: () => O(H) }, H.id)
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
              S.map(H => f.jsx(co, { user: H }, H.id)),
            ],
          }),
          f.jsxs('div', {
            children: [
              f.jsxs('h2', {
                className: 'text-xs font-bold text-discord-text-muted uppercase mb-2 px-2',
                children: ['Desconectado — ', P.length],
              }),
              P.map(H =>
                f.jsx(co, { user: H, isCurrentUser: H.id === o, onClick: () => O(H) }, H.id)
              ),
            ],
          }),
        ],
      }),
      R && f.jsx(x0, { isOpen: h, onClose: () => x(!1), user: R, onLoginWithDiscord: V }),
    ],
  });
});
Qs.displayName = 'UserList';
const _p = () =>
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
                    children: f.jsx(ho, { className: 'text-white', size: 28 }),
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
                    children: f.jsx(h0, { className: 'text-white', size: 28 }),
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
                    children: f.jsx(Hy, { className: 'text-white', size: 28 }),
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
  jp = () => {
    const c = U.useRef(null);
    return (
      U.useEffect(() => {
        let o = -50,
          i = 1,
          s;
        const h = () => {
          ((o += 0.6 * i),
            o >= 40 && (i = -1),
            o <= -50 && (i = 1),
            c.current && (c.current.style.transform = `rotate(${o}deg)`),
            (s = requestAnimationFrame(h)));
        };
        return (
          h(),
          () => {
            s && cancelAnimationFrame(s);
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
    const [o, i] = U.useState(''),
      [s, h] = U.useState(!1),
      [x, R] = U.useState(!1),
      M = U.useRef(null);
    U.useEffect(() => {
      let S = -50,
        P = 1,
        O;
      const V = () => {
        ((S += 0.6 * P),
          S >= 40 && (P = -1),
          S <= -50 && (P = 1),
          M.current && (M.current.style.transform = `rotate(${S}deg)`),
          (O = requestAnimationFrame(V)));
      };
      return (
        V(),
        () => {
          O && cancelAnimationFrame(O);
        }
      );
    }, []);
    const N = async S => {
      (S.preventDefault(), h(!1), R(!0));
      try {
        const P = new TextEncoder().encode(o),
          O = await crypto.subtle.digest('SHA-256', P);
        Array.from(new Uint8Array(O))
          .map(V => V.toString(16).padStart(2, '0'))
          .join('') === k0
          ? setTimeout(() => {
              c();
            }, 500)
          : (h(!0), R(!1));
      } catch (P) {
        (console.error('Crypto error', P), h(!0), R(!1));
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
          onSubmit: N,
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
                    (i(S.target.value), s && h(!1));
                  },
                  placeholder: 'Contraseña...',
                  className:
                    'block w-full pl-10 pr-3 py-3 border-4 border-[#ff4d0a] rounded-xl leading-5 bg-white placeholder-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300/50 sm:text-sm font-bold text-orange-600 shadow-lg',
                  style: { fontFamily: '"Arial Black", Arial, sans-serif' },
                }),
              ],
            }),
            s &&
              f.jsxs('div', {
                className:
                  'mt-3 flex items-center text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full animate-bounce',
                children: [
                  f.jsx(Qp, { size: 16, className: 'mr-1' }),
                  f.jsx('span', { children: 'Contraseña incorrecta' }),
                ],
              }),
            f.jsx('button', {
              type: 'submit',
              disabled: x,
              className:
                'mt-6 flex items-center justify-center px-8 py-3 border-transparent text-base font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed',
              style: { fontFamily: '"Arial Black", Arial, sans-serif' },
              'aria-label': x ? 'Verificando contraseña' : 'Acceder',
              children: x
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
class Xp extends U.Component {
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
                    f.jsx(Qp, { className: 'text-red-500 mr-3', size: 24 }),
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
const eh = U.memo(({ activeTab: c, onTabChange: o, unreadCount: i = 0 }) =>
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
            f.jsx(Kp, {
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
            f.jsx(Gp, {
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
eh.displayName = 'MobileTabBar';
const E0 = 30,
  Ue = {
    ACCESS_TOKEN: 'upg_access_token',
    CURRENT_USER: 'upg_current_user',
    USER_ID: 'upg_user_id',
    USERNAME: 'upg_username',
    AVATAR: 'upg_avatar',
    ROLE: 'upg_role',
  };
function N0() {
  return document.cookie.split('; ').reduce((c, o) => {
    const [i, s] = o.split('=');
    return (i && s && (c[i] = s), c);
  }, {});
}
function Da(c, o, i = E0) {
  const s = new Date();
  s.setTime(s.getTime() + i * 24 * 60 * 60 * 1e3);
  const h = `expires=${s.toUTCString()}`;
  document.cookie = `${c}=${o}; ${h}; path=/`;
}
function C0() {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
function Ma(c) {
  (Da(Ue.USER_ID, c.id),
    Da(Ue.USERNAME, encodeURIComponent(c.username)),
    Da(Ue.AVATAR, encodeURIComponent(c.avatar)),
    Da(Ue.ROLE, c.role || Bt.USER),
    localStorage.setItem(Ue.CURRENT_USER, JSON.stringify(c)));
}
function zp() {
  const c = N0();
  if (c[Ue.USERNAME] && c[Ue.AVATAR]) {
    const i = decodeURIComponent(c[Ue.USERNAME]),
      s = c[Ue.ROLE] || Bt.USER,
      h = s === Bt.ADMIN;
    return {
      id: c[Ue.USER_ID] || `user-${Date.now()}`,
      username: i,
      avatar: decodeURIComponent(c[Ue.AVATAR]),
      status: 'online',
      color: h ? '#ff4d0a' : '#3ba55c',
      role: s,
    };
  }
  const o = localStorage.getItem(Ue.CURRENT_USER);
  if (o)
    try {
      return JSON.parse(o);
    } catch (i) {
      return (console.error('Error parseando datos de usuario:', i), null);
    }
  return null;
}
function _0(c) {
  Da(Ue.ROLE, c);
  const o = localStorage.getItem(Ue.CURRENT_USER);
  if (o)
    try {
      const i = JSON.parse(o);
      ((i.role = c),
        (i.color = c === Bt.ADMIN ? '#ff4d0a' : '#3ba55c'),
        localStorage.setItem(Ue.CURRENT_USER, JSON.stringify(i)));
    } catch (i) {
      console.error('Error actualizando rol en localStorage:', i);
    }
}
function j0() {
  return localStorage.getItem(Ue.ACCESS_TOKEN) === 'granted';
}
function z0(c) {
  localStorage.setItem(Ue.ACCESS_TOKEN, 'granted');
}
function Ap() {
  (localStorage.removeItem(Ue.ACCESS_TOKEN), localStorage.removeItem(Ue.CURRENT_USER), C0());
}
function A0(c, o = 50) {
  const i = U.useRef(null),
    s = U.useRef(null),
    h = o,
    x = N => {
      ((s.current = null),
        (i.current = { x: N.targetTouches[0].clientX, y: N.targetTouches[0].clientY }));
    },
    R = N => {
      s.current = { x: N.targetTouches[0].clientX, y: N.targetTouches[0].clientY };
    },
    M = () => {
      if (!i.current || !s.current) return;
      const N = i.current.x - s.current.x,
        S = i.current.y - s.current.y;
      (Math.abs(N) > Math.abs(S)
        ? (N > h && c.onSwipeLeft && c.onSwipeLeft(), N < -h && c.onSwipeRight && c.onSwipeRight())
        : (S > h && c.onSwipeUp && c.onSwipeUp(), S < -h && c.onSwipeDown && c.onSwipeDown()),
        (i.current = null),
        (s.current = null));
    };
  return (
    U.useEffect(() => {
      const N = document.body;
      return (
        N.addEventListener('touchstart', x, { passive: !0 }),
        N.addEventListener('touchmove', R, { passive: !0 }),
        N.addEventListener('touchend', M, { passive: !0 }),
        () => {
          (N.removeEventListener('touchstart', x),
            N.removeEventListener('touchmove', R),
            N.removeEventListener('touchend', M));
        }
      );
    }, [c]),
    null
  );
}
const Pp = {
    id: 'bot',
    username: 'UPG',
    avatar: '/upg.png',
    status: 'online',
    isBot: !0,
    color: '#5865F2',
  },
  P0 = 'https://mensajeria-ksc7.onrender.com',
  R0 = {
    transports: ['websocket', 'polling'],
    reconnection: !0,
    reconnectionDelay: 1e3,
    reconnectionAttempts: 5,
    timeout: 1e4,
  };
function L0() {
  const [c, o] = U.useState(!0),
    [i, s] = U.useState(!1),
    [h, x] = U.useState(!1),
    [R, M] = U.useState(bt.CHAT),
    [N, S] = U.useState({ id: 'general', name: 'general', description: 'Chat general' }),
    [P, O] = U.useState(() => {
      const p = zp();
      if (p && p.id && !p.username.startsWith('Guest'))
        return { ...p, online: !0, status: 'online' };
      const y = Math.floor(Math.random() * 1e4).toString(),
        A = {
          id: `guest-${y}`,
          username: `Invitado${y}`,
          avatar: `https://ui-avatars.com/api/?name=I${y.charAt(0)}&background=gray&color=fff&size=200`,
          status: 'online',
          online: !0,
          color: '#808080',
          isGuest: !0,
        };
      return (Ma(A), A);
    }),
    [V, H] = U.useState([]),
    [oe, Q] = U.useState({}),
    [le, He] = U.useState(null),
    [At, ze] = U.useState(!1),
    [Ne, Ae] = U.useState('chat'),
    [Be, J] = U.useState({}),
    [ke, st] = U.useState(!1),
    Me = U.useRef(null),
    Je = 'https://mensajeria-ksc7.onrender.com';
  U.useEffect(() => {
    (async () => {
      try {
        const p = new URLSearchParams(window.location.search),
          y = p.get('auth'),
          A = p.get('error_code'),
          L = p.get('error_description');
        if (y === 'error') {
          (console.error('❌ Discord OAuth error:', A, L),
            alert(`Error de autenticación: ${decodeURIComponent(L || 'Error desconocido')}`),
            window.history.replaceState({}, document.title, '/'));
          return;
        }
        if (y === 'success') {
          (console.log('✅ Received Discord OAuth callback, fetching user from backend...'),
            window.history.replaceState({}, document.title, '/'));
          const q = await fetch(`${Je}/auth/user`, {
            credentials: 'include',
            headers: { Accept: 'application/json' },
          });
          if (q.ok) {
            const Z = await q.json();
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
            (O(Ie), Ma(Ie), x(!0), console.log('✅ Usuario Discord autenticado:', Ie.username));
            return;
          }
        }
        const I = zp();
        I && I.id && !I.username.startsWith('Invitado') && !I.id.startsWith('guest-')
          ? (console.log('📦 Using cached Discord user from localStorage:', I.username),
            O(I),
            x(!0))
          : (console.log('👤 Entrando como invitado'), x(!1));
      } catch (p) {
        console.error('❌ Error checking auth:', p);
      }
    })();
  }, [Je]);
  const Ge = U.useCallback(() => {
    z0();
  }, []);
  (U.useEffect(() => {
    if (!c || !P) return;
    let p = Me.current;
    return (
      p || ((p = uo(P0, R0)), (Me.current = p), (window.socketInstance = p)),
      p.removeAllListeners(),
      p.on('connect', () => {
        (console.log('🔌 Conectado a Socket.IO - ID:', p.id),
          st(!0),
          p.emit('user:join', { ...P, socketId: p.id }),
          p.emit('users:request'),
          p.emit('channel:join', { channelId: N.id, userId: P.id }));
      }),
      p.on('disconnect', () => {
        (console.log('⛔ Desconectado de Socket.IO'), st(!1));
      }),
      p.on('reconnect', y => {
        (console.log(`✅ Reconectado después de ${y} intentos`),
          p.emit('user:join', { ...P, socketId: p.id }),
          p.emit('users:request'));
      }),
      p.on('users:list', y => {
        (console.log('👥 Lista de usuarios recibida:', y), P && H(y.filter(A => A.id !== P.id)));
      }),
      p.on('users:update', y => {
        (console.log('🔄 Usuarios actualizados:', y.length), P && H(y.filter(A => A.id !== P.id)));
      }),
      p.on('user:online', y => {
        (console.log('✅ Usuario online:', y.username),
          P &&
            y.id !== P.id &&
            H(A => {
              const L = A.findIndex(I => I.id === y.id);
              if (L !== -1) {
                const I = [...A];
                return ((I[L] = { ...I[L], online: !0, status: 'online' }), I);
              } else return [...A, { ...y, online: !0, status: 'online' }];
            }));
      }),
      p.on('user:offline', ({ userId: y, username: A }) => {
        (console.log('⚫ Usuario offline:', A),
          H(L => {
            const I = L.findIndex(q => q.id === y);
            if (I !== -1) {
              const q = [...L];
              return ((q[I] = { ...q[I], online: !1, status: 'offline' }), q);
            }
            return L;
          }));
      }),
      p.on('channel:history', ({ channelId: y, messages: A }) => {
        J(L => ({ ...L, [y]: A }));
      }),
      p.on('message:received', y => {
        J(A => ({ ...A, [y.channelId]: [...(A[y.channelId] || []), y] }));
      }),
      p.on('voice:update', ({ userId: y, channelName: A, action: L }) => {
        Q(I => {
          const q = { ...I };
          return (L === 'join' && A ? (q[y] = A) : delete q[y], q);
        });
      }),
      p.on('message:deleted', ({ messageId: y, channelId: A }) => {
        J(L => ({ ...L, [A]: (L[A] || []).filter(I => I.id !== y) }));
      }),
      p.on('channel:cleared', ({ channelId: y }) => {
        J(A => ({ ...A, [y]: [] }));
      }),
      p.on('user:banned', ({ userId: y, username: A }) => {
        (console.log(`🔨 Usuario ${A} ha sido baneado`), H(L => L.filter(I => I.id !== y)));
      }),
      p.on('banned', ({ reason: y }) => {
        (alert(`Has sido baneado del servidor.
Razón: ${y}`),
          Ap(),
          window.location.reload());
      }),
      p.on('kicked', ({ reason: y }) => {
        (alert(`${y}`), window.location.reload());
      }),
      p.on('username:taken', ({ message: y }) => {
        (alert(y), Ap(), window.location.reload());
      }),
      p.on('admin:action-success', ({ action: y, message: A }) => {
        (console.log(`✅ Admin action ${y}: ${A}`), alert(`✅ ${A}`));
      }),
      p.on('admin:notification', ({ message: y }) => {
        console.log(`📢 Admin notification: ${y}`);
      }),
      p.on('admin:export-data-result', ({ data: y }) => {
        const A = new Blob([JSON.stringify(y, null, 2)], { type: 'application/json' }),
          L = URL.createObjectURL(A),
          I = document.createElement('a');
        ((I.href = L),
          (I.download = `upg-server-backup-${new Date().toISOString()}.json`),
          document.body.appendChild(I),
          I.click(),
          document.body.removeChild(I),
          URL.revokeObjectURL(L),
          alert('✅ Backup descargado correctamente'));
      }),
      p.on('server:restarting', ({ message: y }) => {
        (console.log(`🔄 ${y}`), alert(y));
      }),
      p.on('user:registered', y => {
        (console.log('✅ Registro confirmado por servidor:', y),
          O(A => ({ ...A, ...y, color: y.role === Bt.ADMIN ? '#ff4d0a' : '#3ba55c' })),
          Ma(y));
      }),
      p.on('role:updated', ({ role: y }) => {
        (O(A => {
          const L = y === Bt.ADMIN,
            I = { ...A, role: y, color: L ? '#ff4d0a' : '#3ba55c' };
          return (_0(y), Ma(I), I);
        }),
          console.log(`🛡️ Rol actualizado: ${y}`));
      }),
      p.on('connect_error', y => {
        console.error('❌ Error de conexión:', y.message);
      }),
      p.on('heartbeat:ping', () => {
        p.emit('heartbeat:pong');
      }),
      p.on('rate-limit-exceeded', ({ message: y }) => {
        console.warn('⚠️ Rate limit:', y);
      }),
      p.on('message-error', ({ message: y }) => {
        console.error('❌ Error mensaje:', y);
      }),
      () => {
        (p.removeAllListeners(),
          (!c || !P) &&
            (p.disconnect(),
            (Me.current = null),
            console.log('🔌 Socket desconectado y limpiado')));
      }
    );
  }, [c, P, N.id]),
    U.useEffect(() => {
      if (!ke || !Me.current) return;
      const p = setInterval(() => {
        var y;
        ((y = Me.current) == null || y.emit('users:request'),
          console.log('🔄 Solicitando actualización de usuarios...'));
      }, 3e4);
      return () => clearInterval(p);
    }, [ke]),
    U.useEffect(() => {
      !c ||
        !Me.current ||
        (le
          ? Me.current.emit('voice:join', { channelName: le, userId: P.id })
          : Me.current.emit('voice:leave', { channelName: null, userId: P.id }),
        Q(p => {
          const y = { ...p };
          return (le ? (y[P.id] = le) : delete y[P.id], y);
        }));
    }, [le, P, c]),
    U.useEffect(() => {
      P && Ma(P);
    }, [P]));
  const Xe = U.useMemo(() => {
      const p = new Map();
      return (
        p.set(Pp.id, Pp),
        V.forEach(y => p.set(y.id, y)),
        P && p.set(P.id, P),
        Array.from(p.values())
      );
    }, [V, P]),
    wt = U.useMemo(() => Be[N.id] || [], [Be, N.id]),
    et = U.useCallback(
      (p, y) => {
        (M(p),
          y &&
            y.id !== N.id &&
            (S(y),
            Me.current &&
              ke &&
              P &&
              Me.current.emit('channel:join', { channelId: y.id, userId: P.id })),
          ze(!1));
      },
      [ke, P, N.id]
    ),
    _ = U.useCallback(p => {
      He(y => (y === p ? null : p));
    }, []),
    T = U.useCallback(
      p => {
        if (!Me.current || !ke || !P) {
          console.error('❌ Socket no conectado o usuario no disponible');
          return;
        }
        Me.current.emit('message:send', {
          channelId: N.id,
          content: p,
          userId: P.id,
          username: P.username,
          avatar: P.avatar,
          timestamp: new Date().toISOString(),
        });
      },
      [ke, N.id, P]
    ),
    B = U.useCallback(() => {
      ze(p => !p);
    }, []);
  U.useCallback(() => {
    ze(!1);
  }, []);
  const ce = U.useCallback(p => {
      Ae(p);
    }, []),
    de = U.useCallback(() => {
      window.location.href = `${Je}/auth/discord`;
    }, [Je]);
  return (
    A0({
      onSwipeLeft: () => {
        window.innerWidth < 768 && (Ne === 'channels' ? Ae('chat') : Ne === 'chat' && Ae('users'));
      },
      onSwipeRight: () => {
        window.innerWidth < 768 && (Ne === 'users' ? Ae('chat') : Ne === 'chat' && Ae('channels'));
      },
    }),
    j0()
      ? f.jsx(Xp, {
          children: f.jsxs('div', {
            className:
              'flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative',
            children: [
              f.jsxs('div', {
                className: 'hidden md:flex h-full w-full',
                children: [
                  f.jsx(Ws, { currentUser: P, setCurrentUser: O, isConnected: ke }),
                  f.jsx(Np, {
                    activeView: R,
                    currentChannelId: N.id,
                    onChannelSelect: et,
                    currentUser: P,
                    activeVoiceChannel: le,
                    onVoiceJoin: _,
                    voiceStates: oe,
                    users: Xe,
                  }),
                  f.jsxs('div', {
                    className: 'flex flex-1 min-w-0 relative',
                    children: [
                      R === bt.CHAT &&
                        f.jsxs(f.Fragment, {
                          children: [
                            f.jsx(Cp, {
                              currentUser: P,
                              users: Xe,
                              currentChannel: N,
                              onSendMessage: T,
                              messages: wt,
                              onMenuToggle: B,
                            }),
                            f.jsx(Qs, { users: Xe, currentUserId: P.id, onLoginWithDiscord: de }),
                          ],
                        }),
                      R === bt.WHO_WE_ARE && f.jsx(_p, { onMenuToggle: B }),
                      R === bt.VOTING && f.jsx(jp, { onMenuToggle: B }),
                    ],
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex md:hidden h-full w-full flex-col relative overflow-hidden',
                style: { paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' },
                children: [
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ne === 'channels' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex h-full w-full overflow-hidden',
                      children: [
                        f.jsx(Ws, { currentUser: P, setCurrentUser: O, isConnected: ke }),
                        f.jsx(Np, {
                          activeView: R,
                          currentChannelId: N.id,
                          onChannelSelect: (p, y) => {
                            (et(p, y), Ae('chat'));
                          },
                          currentUser: P,
                          activeVoiceChannel: le,
                          onVoiceJoin: _,
                          voiceStates: oe,
                          users: Xe,
                        }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ne === 'chat' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex flex-1 min-w-0 relative h-full',
                      children: [
                        R === bt.CHAT &&
                          f.jsx(Cp, {
                            currentUser: P,
                            users: Xe,
                            currentChannel: N,
                            onSendMessage: T,
                            messages: wt,
                            onMenuToggle: () => Ae('channels'),
                          }),
                        R === bt.WHO_WE_ARE && f.jsx(_p, { onMenuToggle: () => Ae('channels') }),
                        R === bt.VOTING && f.jsx(jp, { onMenuToggle: () => Ae('channels') }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ne === 'users' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsx('div', {
                      className: 'h-full w-full overflow-hidden',
                      children: f.jsx(Qs, {
                        users: Xe,
                        currentUserId: P.id,
                        isMobileView: !0,
                        onLoginWithDiscord: de,
                      }),
                    }),
                  }),
                  f.jsx(eh, { activeTab: Ne, onTabChange: ce }),
                ],
              }),
            ],
          }),
        })
      : f.jsx(S0, { onUnlock: Ge })
  );
}
const th = document.getElementById('root');
if (!th) throw new Error('Could not find root element to mount to');
const O0 = Mg.createRoot(th);
O0.render(f.jsx(jg.StrictMode, { children: f.jsx(Xp, { children: f.jsx(L0, {}) }) }));
