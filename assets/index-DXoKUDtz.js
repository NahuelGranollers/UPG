(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) l(m);
  new MutationObserver(m => {
    for (const w of m)
      if (w.type === 'childList')
        for (const z of w.addedNodes) z.tagName === 'LINK' && z.rel === 'modulepreload' && l(z);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(m) {
    const w = {};
    return (
      m.integrity && (w.integrity = m.integrity),
      m.referrerPolicy && (w.referrerPolicy = m.referrerPolicy),
      m.crossOrigin === 'use-credentials'
        ? (w.credentials = 'include')
        : m.crossOrigin === 'anonymous'
          ? (w.credentials = 'omit')
          : (w.credentials = 'same-origin'),
      w
    );
  }
  function l(m) {
    if (m.ep) return;
    m.ep = !0;
    const w = i(m);
    fetch(m.href, w);
  }
})();
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver(l => {
    for (const m of l)
      if (m.type === 'childList')
        for (const w of m.addedNodes) w.tagName === 'LINK' && w.rel === 'modulepreload' && i(w);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const m = {};
    return (
      l.integrity && (m.integrity = l.integrity),
      l.referrerPolicy && (m.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (m.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (m.credentials = 'omit')
          : (m.credentials = 'same-origin'),
      m
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const m = o(l);
    fetch(l.href, m);
  }
})();
function zp(c) {
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
function Cg() {
  if (ap) return La;
  ap = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.fragment');
  function i(l, m, w) {
    var z = null;
    if ((w !== void 0 && (z = '' + w), m.key !== void 0 && (z = '' + m.key), 'key' in m)) {
      w = {};
      for (var I in m) I !== 'key' && (w[I] = m[I]);
    } else w = m;
    return ((m = w.ref), { $$typeof: c, type: l, key: z, ref: m !== void 0 ? m : null, props: w });
  }
  return ((La.Fragment = o), (La.jsx = i), (La.jsxs = i), La);
}
var sp;
function Ng() {
  return (sp || ((sp = 1), (rp.exports = Cg())), rp.exports);
}
var f = Ng(),
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
function Eg() {
  if (ip) return K;
  ip = 1;
  var c = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.portal'),
    i = Symbol.for('react.fragment'),
    l = Symbol.for('react.strict_mode'),
    m = Symbol.for('react.profiler'),
    w = Symbol.for('react.consumer'),
    z = Symbol.for('react.context'),
    I = Symbol.for('react.forward_ref'),
    C = Symbol.for('react.suspense'),
    S = Symbol.for('react.memo'),
    R = Symbol.for('react.lazy'),
    A = Symbol.for('react.activity'),
    H = Symbol.iterator;
  function $(p) {
    return p === null || typeof p != 'object'
      ? null
      : ((p = (H && p[H]) || p['@@iterator']), typeof p == 'function' ? p : null);
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
  function $e(p, y, P) {
    ((this.props = p), (this.context = y), (this.refs = se), (this.updater = P || oe));
  }
  (($e.prototype.isReactComponent = {}),
    ($e.prototype.setState = function (p, y) {
      if (typeof p != 'object' && typeof p != 'function' && p != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, p, y, 'setState');
    }),
    ($e.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, 'forceUpdate');
    }));
  function Pt() {}
  Pt.prototype = $e.prototype;
  function je(p, y, P) {
    ((this.props = p), (this.context = y), (this.refs = se), (this.updater = P || oe));
  }
  var Ce = (je.prototype = new Pt());
  ((Ce.constructor = je), Q(Ce, $e.prototype), (Ce.isPureReactComponent = !0));
  var Pe = Array.isArray;
  function qe() {}
  var J = { H: null, A: null, T: null, S: null },
    xe = Object.prototype.hasOwnProperty;
  function lt(p, y, P) {
    var L = P.ref;
    return { $$typeof: c, type: p, key: y, ref: L !== void 0 ? L : null, props: P };
  }
  function Ie(p, y) {
    return lt(p.type, y, p.props);
  }
  function Je(p) {
    return typeof p == 'object' && p !== null && p.$$typeof === c;
  }
  function Ye(p) {
    var y = { '=': '=0', ':': '=2' };
    return (
      '$' +
      p.replace(/[=:]/g, function (P) {
        return y[P];
      })
    );
  }
  var Ze = /\/+/g;
  function kt(p, y) {
    return typeof p == 'object' && p !== null && p.key != null ? Ye('' + p.key) : y.toString(36);
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
            ? p.then(qe, qe)
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
  function E(p, y, P, L, D) {
    var V = typeof p;
    (V === 'undefined' || V === 'boolean') && (p = null);
    var G = !1;
    if (p === null) G = !0;
    else
      switch (V) {
        case 'bigint':
        case 'string':
        case 'number':
          G = !0;
          break;
        case 'object':
          switch (p.$$typeof) {
            case c:
            case o:
              G = !0;
              break;
            case R:
              return ((G = p._init), E(G(p._payload), y, P, L, D));
          }
      }
    if (G)
      return (
        (D = D(p)),
        (G = L === '' ? '.' + kt(p, 0) : L),
        Pe(D)
          ? ((P = ''),
            G != null && (P = G.replace(Ze, '$&/') + '/'),
            E(D, y, P, '', function (Fr) {
              return Fr;
            }))
          : D != null &&
            (Je(D) &&
              (D = Ie(
                D,
                P +
                  (D.key == null || (p && p.key === D.key)
                    ? ''
                    : ('' + D.key).replace(Ze, '$&/') + '/') +
                  G
              )),
            y.push(D)),
        1
      );
    G = 0;
    var De = L === '' ? '.' : L + ':';
    if (Pe(p))
      for (var Ne = 0; Ne < p.length; Ne++)
        ((L = p[Ne]), (V = De + kt(L, Ne)), (G += E(L, y, P, V, D)));
    else if (((Ne = $(p)), typeof Ne == 'function'))
      for (p = Ne.call(p), Ne = 0; !(L = p.next()).done; )
        ((L = L.value), (V = De + kt(L, Ne++)), (G += E(L, y, P, V, D)));
    else if (V === 'object') {
      if (typeof p.then == 'function') return E(et(p), y, P, L, D);
      throw (
        (y = String(p)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (y === '[object Object]' ? 'object with keys {' + Object.keys(p).join(', ') + '}' : y) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return G;
  }
  function O(p, y, P) {
    if (p == null) return p;
    var L = [],
      D = 0;
    return (
      E(p, L, '', '', function (V) {
        return y.call(P, V, D++);
      }),
      L
    );
  }
  function q(p) {
    if (p._status === -1) {
      var y = p._result;
      ((y = y()),
        y.then(
          function (P) {
            (p._status === 0 || p._status === -1) && ((p._status = 1), (p._result = P));
          },
          function (P) {
            (p._status === 0 || p._status === -1) && ((p._status = 2), (p._result = P));
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
      map: O,
      forEach: function (p, y, P) {
        O(
          p,
          function () {
            y.apply(this, arguments);
          },
          P
        );
      },
      count: function (p) {
        var y = 0;
        return (
          O(p, function () {
            y++;
          }),
          y
        );
      },
      toArray: function (p) {
        return (
          O(p, function (y) {
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
    (K.Activity = A),
    (K.Children = de),
    (K.Component = $e),
    (K.Fragment = i),
    (K.Profiler = m),
    (K.PureComponent = je),
    (K.StrictMode = l),
    (K.Suspense = C),
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
    (K.cloneElement = function (p, y, P) {
      if (p == null) throw Error('The argument must be a React element, but you passed ' + p + '.');
      var L = Q({}, p.props),
        D = p.key;
      if (y != null)
        for (V in (y.key !== void 0 && (D = '' + y.key), y))
          !xe.call(y, V) ||
            V === 'key' ||
            V === '__self' ||
            V === '__source' ||
            (V === 'ref' && y.ref === void 0) ||
            (L[V] = y[V]);
      var V = arguments.length - 2;
      if (V === 1) L.children = P;
      else if (1 < V) {
        for (var G = Array(V), De = 0; De < V; De++) G[De] = arguments[De + 2];
        L.children = G;
      }
      return lt(p.type, D, L);
    }),
    (K.createContext = function (p) {
      return (
        (p = {
          $$typeof: z,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (p.Provider = p),
        (p.Consumer = { $$typeof: w, _context: p }),
        p
      );
    }),
    (K.createElement = function (p, y, P) {
      var L,
        D = {},
        V = null;
      if (y != null)
        for (L in (y.key !== void 0 && (V = '' + y.key), y))
          xe.call(y, L) && L !== 'key' && L !== '__self' && L !== '__source' && (D[L] = y[L]);
      var G = arguments.length - 2;
      if (G === 1) D.children = P;
      else if (1 < G) {
        for (var De = Array(G), Ne = 0; Ne < G; Ne++) De[Ne] = arguments[Ne + 2];
        D.children = De;
      }
      if (p && p.defaultProps)
        for (L in ((G = p.defaultProps), G)) D[L] === void 0 && (D[L] = G[L]);
      return lt(p, V, D);
    }),
    (K.createRef = function () {
      return { current: null };
    }),
    (K.forwardRef = function (p) {
      return { $$typeof: I, render: p };
    }),
    (K.isValidElement = Je),
    (K.lazy = function (p) {
      return { $$typeof: R, _payload: { _status: -1, _result: p }, _init: q };
    }),
    (K.memo = function (p, y) {
      return { $$typeof: S, type: p, compare: y === void 0 ? null : y };
    }),
    (K.startTransition = function (p) {
      var y = J.T,
        P = {};
      J.T = P;
      try {
        var L = p(),
          D = J.S;
        (D !== null && D(P, L),
          typeof L == 'object' && L !== null && typeof L.then == 'function' && L.then(qe, ce));
      } catch (V) {
        ce(V);
      } finally {
        (y !== null && P.types !== null && (y.types = P.types), (J.T = y));
      }
    }),
    (K.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (K.use = function (p) {
      return J.H.use(p);
    }),
    (K.useActionState = function (p, y, P) {
      return J.H.useActionState(p, y, P);
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
    (K.useImperativeHandle = function (p, y, P) {
      return J.H.useImperativeHandle(p, y, P);
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
    (K.useReducer = function (p, y, P) {
      return J.H.useReducer(p, y, P);
    }),
    (K.useRef = function (p) {
      return J.H.useRef(p);
    }),
    (K.useState = function (p) {
      return J.H.useState(p);
    }),
    (K.useSyncExternalStore = function (p, y, P) {
      return J.H.useSyncExternalStore(p, y, P);
    }),
    (K.useTransition = function () {
      return J.H.useTransition();
    }),
    (K.version = '19.2.0'),
    K
  );
}
var lp;
function Kl() {
  return (lp || ((lp = 1), (op.exports = Eg())), op.exports);
}
var M = Kl();
const Tg = zp(M);
var Ll = { exports: {} },
  Aa = {},
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
function jg() {
  return (
    dp ||
      ((dp = 1),
      (function (c) {
        function o(E, O) {
          var q = E.length;
          E.push(O);
          e: for (; 0 < q; ) {
            var ce = (q - 1) >>> 1,
              de = E[ce];
            if (0 < m(de, O)) ((E[ce] = O), (E[q] = de), (q = ce));
            else break e;
          }
        }
        function i(E) {
          return E.length === 0 ? null : E[0];
        }
        function l(E) {
          if (E.length === 0) return null;
          var O = E[0],
            q = E.pop();
          if (q !== O) {
            E[0] = q;
            e: for (var ce = 0, de = E.length, p = de >>> 1; ce < p; ) {
              var y = 2 * (ce + 1) - 1,
                P = E[y],
                L = y + 1,
                D = E[L];
              if (0 > m(P, q))
                L < de && 0 > m(D, P)
                  ? ((E[ce] = D), (E[L] = q), (ce = L))
                  : ((E[ce] = P), (E[y] = q), (ce = y));
              else if (L < de && 0 > m(D, q)) ((E[ce] = D), (E[L] = q), (ce = L));
              else break e;
            }
          }
          return O;
        }
        function m(E, O) {
          var q = E.sortIndex - O.sortIndex;
          return q !== 0 ? q : E.id - O.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var w = performance;
          c.unstable_now = function () {
            return w.now();
          };
        } else {
          var z = Date,
            I = z.now();
          c.unstable_now = function () {
            return z.now() - I;
          };
        }
        var C = [],
          S = [],
          R = 1,
          A = null,
          H = 3,
          $ = !1,
          oe = !1,
          Q = !1,
          se = !1,
          $e = typeof setTimeout == 'function' ? setTimeout : null,
          Pt = typeof clearTimeout == 'function' ? clearTimeout : null,
          je = typeof setImmediate < 'u' ? setImmediate : null;
        function Ce(E) {
          for (var O = i(S); O !== null; ) {
            if (O.callback === null) l(S);
            else if (O.startTime <= E) (l(S), (O.sortIndex = O.expirationTime), o(C, O));
            else break;
            O = i(S);
          }
        }
        function Pe(E) {
          if (((Q = !1), Ce(E), !oe))
            if (i(C) !== null) ((oe = !0), qe || ((qe = !0), Ye()));
            else {
              var O = i(S);
              O !== null && et(Pe, O.startTime - E);
            }
        }
        var qe = !1,
          J = -1,
          xe = 5,
          lt = -1;
        function Ie() {
          return se ? !0 : !(c.unstable_now() - lt < xe);
        }
        function Je() {
          if (((se = !1), qe)) {
            var E = c.unstable_now();
            lt = E;
            var O = !0;
            try {
              e: {
                ((oe = !1), Q && ((Q = !1), Pt(J), (J = -1)), ($ = !0));
                var q = H;
                try {
                  t: {
                    for (Ce(E), A = i(C); A !== null && !(A.expirationTime > E && Ie()); ) {
                      var ce = A.callback;
                      if (typeof ce == 'function') {
                        ((A.callback = null), (H = A.priorityLevel));
                        var de = ce(A.expirationTime <= E);
                        if (((E = c.unstable_now()), typeof de == 'function')) {
                          ((A.callback = de), Ce(E), (O = !0));
                          break t;
                        }
                        (A === i(C) && l(C), Ce(E));
                      } else l(C);
                      A = i(C);
                    }
                    if (A !== null) O = !0;
                    else {
                      var p = i(S);
                      (p !== null && et(Pe, p.startTime - E), (O = !1));
                    }
                  }
                  break e;
                } finally {
                  ((A = null), (H = q), ($ = !1));
                }
                O = void 0;
              }
            } finally {
              O ? Ye() : (qe = !1);
            }
          }
        }
        var Ye;
        if (typeof je == 'function')
          Ye = function () {
            je(Je);
          };
        else if (typeof MessageChannel < 'u') {
          var Ze = new MessageChannel(),
            kt = Ze.port2;
          ((Ze.port1.onmessage = Je),
            (Ye = function () {
              kt.postMessage(null);
            }));
        } else
          Ye = function () {
            $e(Je, 0);
          };
        function et(E, O) {
          J = $e(function () {
            E(c.unstable_now());
          }, O);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (E) {
            E.callback = null;
          }),
          (c.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (xe = 0 < E ? Math.floor(1e3 / E) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return H;
          }),
          (c.unstable_next = function (E) {
            switch (H) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = H;
            }
            var q = H;
            H = O;
            try {
              return E();
            } finally {
              H = q;
            }
          }),
          (c.unstable_requestPaint = function () {
            se = !0;
          }),
          (c.unstable_runWithPriority = function (E, O) {
            switch (E) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                E = 3;
            }
            var q = H;
            H = E;
            try {
              return O();
            } finally {
              H = q;
            }
          }),
          (c.unstable_scheduleCallback = function (E, O, q) {
            var ce = c.unstable_now();
            switch (
              (typeof q == 'object' && q !== null
                ? ((q = q.delay), (q = typeof q == 'number' && 0 < q ? ce + q : ce))
                : (q = ce),
              E)
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
              (de = q + de),
              (E = {
                id: R++,
                callback: O,
                priorityLevel: E,
                startTime: q,
                expirationTime: de,
                sortIndex: -1,
              }),
              q > ce
                ? ((E.sortIndex = q),
                  o(S, E),
                  i(C) === null && E === i(S) && (Q ? (Pt(J), (J = -1)) : (Q = !0), et(Pe, q - ce)))
                : ((E.sortIndex = de), o(C, E), oe || $ || ((oe = !0), qe || ((qe = !0), Ye()))),
              E
            );
          }),
          (c.unstable_shouldYield = Ie),
          (c.unstable_wrapCallback = function (E) {
            var O = H;
            return function () {
              var q = H;
              H = O;
              try {
                return E.apply(this, arguments);
              } finally {
                H = q;
              }
            };
          }));
      })(cp)),
    cp
  );
}
var fp;
function Pg() {
  return (fp || ((fp = 1), (up.exports = jg())), up.exports);
}
var Al = { exports: {} },
  Xe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pp;
function Rg() {
  if (pp) return Xe;
  pp = 1;
  var c = Kl();
  function o(C) {
    var S = 'https://react.dev/errors/' + C;
    if (1 < arguments.length) {
      S += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++) S += '&args[]=' + encodeURIComponent(arguments[R]);
    }
    return (
      'Minified React error #' +
      C +
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
    m = Symbol.for('react.portal');
  function w(C, S, R) {
    var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: A == null ? null : '' + A,
      children: C,
      containerInfo: S,
      implementation: R,
    };
  }
  var z = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function I(C, S) {
    if (C === 'font') return '';
    if (typeof S == 'string') return S === 'use-credentials' ? S : '';
  }
  return (
    (Xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
    (Xe.createPortal = function (C, S) {
      var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)) throw Error(o(299));
      return w(C, S, null, R);
    }),
    (Xe.flushSync = function (C) {
      var S = z.T,
        R = l.p;
      try {
        if (((z.T = null), (l.p = 2), C)) return C();
      } finally {
        ((z.T = S), (l.p = R), l.d.f());
      }
    }),
    (Xe.preconnect = function (C, S) {
      typeof C == 'string' &&
        (S
          ? ((S = S.crossOrigin),
            (S = typeof S == 'string' ? (S === 'use-credentials' ? S : '') : void 0))
          : (S = null),
        l.d.C(C, S));
    }),
    (Xe.prefetchDNS = function (C) {
      typeof C == 'string' && l.d.D(C);
    }),
    (Xe.preinit = function (C, S) {
      if (typeof C == 'string' && S && typeof S.as == 'string') {
        var R = S.as,
          A = I(R, S.crossOrigin),
          H = typeof S.integrity == 'string' ? S.integrity : void 0,
          $ = typeof S.fetchPriority == 'string' ? S.fetchPriority : void 0;
        R === 'style'
          ? l.d.S(C, typeof S.precedence == 'string' ? S.precedence : void 0, {
              crossOrigin: A,
              integrity: H,
              fetchPriority: $,
            })
          : R === 'script' &&
            l.d.X(C, {
              crossOrigin: A,
              integrity: H,
              fetchPriority: $,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
      }
    }),
    (Xe.preinitModule = function (C, S) {
      if (typeof C == 'string')
        if (typeof S == 'object' && S !== null) {
          if (S.as == null || S.as === 'script') {
            var R = I(S.as, S.crossOrigin);
            l.d.M(C, {
              crossOrigin: R,
              integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
              nonce: typeof S.nonce == 'string' ? S.nonce : void 0,
            });
          }
        } else S == null && l.d.M(C);
    }),
    (Xe.preload = function (C, S) {
      if (typeof C == 'string' && typeof S == 'object' && S !== null && typeof S.as == 'string') {
        var R = S.as,
          A = I(R, S.crossOrigin);
        l.d.L(C, R, {
          crossOrigin: A,
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
    (Xe.preloadModule = function (C, S) {
      if (typeof C == 'string')
        if (S) {
          var R = I(S.as, S.crossOrigin);
          l.d.m(C, {
            as: typeof S.as == 'string' && S.as !== 'script' ? S.as : void 0,
            crossOrigin: R,
            integrity: typeof S.integrity == 'string' ? S.integrity : void 0,
          });
        } else l.d.m(C);
    }),
    (Xe.requestFormReset = function (C) {
      l.d.r(C);
    }),
    (Xe.unstable_batchedUpdates = function (C, S) {
      return C(S);
    }),
    (Xe.useFormState = function (C, S, R) {
      return z.H.useFormState(C, S, R);
    }),
    (Xe.useFormStatus = function () {
      return z.H.useHostTransitionStatus();
    }),
    (Xe.version = '19.2.0'),
    Xe
  );
}
var hp;
function zg() {
  if (hp) return Al.exports;
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
  return (c(), (Al.exports = Rg()), Al.exports);
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
  if (mp) return Aa;
  mp = 1;
  var c = Pg(),
    o = Kl(),
    i = zg();
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
  function m(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function w(e) {
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
  function z(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function I(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function C(e) {
    if (w(e) !== e) throw Error(l(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = w(e)), t === null)) throw Error(l(188));
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
          if (s === n) return (C(a), e);
          if (s === r) return (C(a), t);
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
  function R(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = R(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var A = Object.assign,
    H = Symbol.for('react.element'),
    $ = Symbol.for('react.transitional.element'),
    oe = Symbol.for('react.portal'),
    Q = Symbol.for('react.fragment'),
    se = Symbol.for('react.strict_mode'),
    $e = Symbol.for('react.profiler'),
    Pt = Symbol.for('react.consumer'),
    je = Symbol.for('react.context'),
    Ce = Symbol.for('react.forward_ref'),
    Pe = Symbol.for('react.suspense'),
    qe = Symbol.for('react.suspense_list'),
    J = Symbol.for('react.memo'),
    xe = Symbol.for('react.lazy'),
    lt = Symbol.for('react.activity'),
    Ie = Symbol.for('react.memo_cache_sentinel'),
    Je = Symbol.iterator;
  function Ye(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Je && e[Je]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Ze = Symbol.for('react.client.reference');
  function kt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === Ze ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Q:
        return 'Fragment';
      case $e:
        return 'Profiler';
      case se:
        return 'StrictMode';
      case Pe:
        return 'Suspense';
      case qe:
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
        case Ce:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case J:
          return ((t = e.displayName || null), t !== null ? t : kt(e.type) || 'Memo');
        case xe:
          ((t = e._payload), (e = e._init));
          try {
            return kt(e(t));
          } catch {}
      }
    return null;
  }
  var et = Array.isArray,
    E = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    O = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    q = { pending: !1, data: null, method: null, action: null },
    ce = [],
    de = -1;
  function p(e) {
    return { current: e };
  }
  function y(e) {
    0 > de || ((e.current = ce[de]), (ce[de] = null), de--);
  }
  function P(e, t) {
    (de++, (ce[de] = e.current), (e.current = t));
  }
  var L = p(null),
    D = p(null),
    V = p(null),
    G = p(null);
  function De(e, t) {
    switch ((P(V, t), P(D, e), P(L, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Nf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Nf(t)), (e = Ef(t, e)));
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
    (y(L), P(L, e));
  }
  function Ne() {
    (y(L), y(D), y(V));
  }
  function Fr(e) {
    e.memoizedState !== null && P(G, e);
    var t = L.current,
      n = Ef(t, e.type);
    t !== n && (P(D, e), P(L, n));
  }
  function Ma(e) {
    (D.current === e && (y(L), y(D)), G.current === e && (y(G), (ja._currentValue = q)));
  }
  var mo, tu;
  function On(e) {
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
                } catch (_) {
                  var x = _;
                }
                Reflect.construct(e, [], j);
              } else {
                try {
                  j.call();
                } catch (_) {
                  x = _;
                }
                e.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                x = _;
              }
              (j = e()) && typeof j.catch == 'function' && j.catch(function () {});
            }
          } catch (_) {
            if (_ && x && typeof _.stack == 'string') return [_.stack, x.stack];
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
        var h = u.split(`
`),
          k = d.split(`
`);
        for (a = r = 0; r < h.length && !h[r].includes('DetermineComponentFrameRoot'); ) r++;
        for (; a < k.length && !k[a].includes('DetermineComponentFrameRoot'); ) a++;
        if (r === h.length || a === k.length)
          for (r = h.length - 1, a = k.length - 1; 1 <= r && 0 <= a && h[r] !== k[a]; ) a--;
        for (; 1 <= r && 0 <= a; r--, a--)
          if (h[r] !== k[a]) {
            if (r !== 1 || a !== 1)
              do
                if ((r--, a--, 0 > a || h[r] !== k[a])) {
                  var N =
                    `
` + h[r].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      N.includes('<anonymous>') &&
                      (N = N.replace('<anonymous>', e.displayName)),
                    N
                  );
                }
              while (1 <= r && 0 <= a);
            break;
          }
      }
    } finally {
      ((go = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : '') ? On(n) : '';
  }
  function nh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return On(e.type);
      case 16:
        return On('Lazy');
      case 13:
        return e.child !== t && t !== null ? On('Suspense Fallback') : On('Suspense');
      case 19:
        return On('SuspenseList');
      case 0:
      case 15:
        return yo(e.type, !1);
      case 11:
        return yo(e.type.render, !1);
      case 1:
        return yo(e.type, !0);
      case 31:
        return On('Activity');
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
    ko = c.unstable_cancelCallback,
    rh = c.unstable_shouldYield,
    ah = c.unstable_requestPaint,
    ut = c.unstable_now,
    sh = c.unstable_getCurrentPriorityLevel,
    ru = c.unstable_ImmediatePriority,
    au = c.unstable_UserBlockingPriority,
    Fa = c.unstable_NormalPriority,
    oh = c.unstable_LowPriority,
    su = c.unstable_IdlePriority,
    ih = c.log,
    lh = c.unstable_setDisableYieldValue,
    Br = null,
    ct = null;
  function un(e) {
    if ((typeof ih == 'function' && lh(e), ct && typeof ct.setStrictMode == 'function'))
      try {
        ct.setStrictMode(Br, e);
      } catch {}
  }
  var dt = Math.clz32 ? Math.clz32 : dh,
    uh = Math.log,
    ch = Math.LN2;
  function dh(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((uh(e) / ch) | 0)) | 0);
  }
  var Ba = 256,
    $a = 262144,
    qa = 4194304;
  function In(e) {
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
            ? (a = In(r))
            : ((u &= d), u !== 0 ? (a = In(u)) : n || ((n = d & ~e), n !== 0 && (a = In(n)))))
        : ((d = r & ~s),
          d !== 0
            ? (a = In(d))
            : u !== 0
              ? (a = In(u))
              : n || ((n = r & ~e), n !== 0 && (a = In(n)))),
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
  function $r(e, t) {
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
    var e = qa;
    return ((qa <<= 1), (qa & 62914560) === 0 && (qa = 4194304), e);
  }
  function wo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function qr(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function ph(e, t, n, r, a, s) {
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
      h = e.expirationTimes,
      k = e.hiddenUpdates;
    for (n = u & ~n; 0 < n; ) {
      var N = 31 - dt(n),
        j = 1 << N;
      ((d[N] = 0), (h[N] = -1));
      var x = k[N];
      if (x !== null)
        for (k[N] = null, N = 0; N < x.length; N++) {
          var _ = x[N];
          _ !== null && (_.lane &= -536870913);
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
    return ((n = (n & 42) !== 0 ? 1 : xo(n)), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n);
  }
  function xo(e) {
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
    var e = O.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Xf(e.type));
  }
  function du(e, t) {
    var n = O.p;
    try {
      return ((O.p = e), t());
    } finally {
      O.p = n;
    }
  }
  var cn = Math.random().toString(36).slice(2),
    He = '__reactFiber$' + cn,
    tt = '__reactProps$' + cn,
    er = '__reactContainer$' + cn,
    _o = '__reactEvents$' + cn,
    hh = '__reactListeners$' + cn,
    mh = '__reactHandles$' + cn,
    fu = '__reactResources$' + cn,
    Hr = '__reactMarker$' + cn;
  function Co(e) {
    (delete e[He], delete e[tt], delete e[_o], delete e[hh], delete e[mh]);
  }
  function tr(e) {
    var t = e[He];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[er] || n[He])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Af(e); e !== null; ) {
            if ((n = e[He])) return n;
            e = Af(e);
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
  function Vr(e) {
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
  var pu = new Set(),
    hu = {};
  function Dn(e, t) {
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
  function Va(e, t, n) {
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
  function vh(e, t, n) {
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
  function No(e) {
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
  function Rt(e) {
    return e.replace(bh, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Eo(e, t, n, r, a, s, u, d) {
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
        No(e);
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
      No(e));
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
  function ku(e, t, n) {
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
      No(e));
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
  var kh = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function xu(e, t, n) {
    var r = t.indexOf('--') === 0;
    n == null || typeof n == 'boolean' || n === ''
      ? r
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : r
        ? e.setProperty(t, n)
        : typeof n != 'number' || n === 0 || kh.has(t)
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
      for (var a in t) ((r = t[a]), t.hasOwnProperty(a) && n[a] !== r && xu(e, a, r));
    } else for (var s in t) t.hasOwnProperty(s) && xu(e, s, t[s]);
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
  var wh = new Map([
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
    xh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ka(e) {
    return xh.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Vt() {}
  var Po = null;
  function Ro(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ir = null,
    lr = null;
  function _u(e) {
    var t = nr(e);
    if (t && (e = t.stateNode)) {
      var n = e[tt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Eo(
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
              n = n.querySelectorAll('input[name="' + Rt('' + t) + '"][type="radio"]'), t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var a = r[tt] || null;
                if (!a) throw Error(l(90));
                Eo(
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
          ku(e, n.value, n.defaultValue);
          break e;
        case 'select':
          ((t = n.value), t != null && sr(e, !!n.multiple, t, !1));
      }
    }
  }
  var zo = !1;
  function Cu(e, t, n) {
    if (zo) return e(t, n);
    zo = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (
        ((zo = !1),
        (ir !== null || lr !== null) &&
          (Os(), ir && ((t = ir), (e = lr), (lr = ir = null), _u(t), e)))
      )
        for (t = 0; t < e.length; t++) _u(e[t]);
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
    Ao = null,
    Ya = null;
  function Nu() {
    if (Ya) return Ya;
    var e,
      t = Ao,
      n = t.length,
      r,
      a = 'value' in dn ? dn.value : dn.textContent,
      s = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === a[s - r]; r++);
    return (Ya = a.slice(e, 1 < r ? 1 - r : void 0));
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
  function Eu() {
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
          : Eu),
        (this.isPropagationStopped = Eu),
        this
      );
    }
    return (
      A(t.prototype, {
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
    Ga = nt(Un),
    Kr = A({}, Un, { view: 0, detail: 0 }),
    Sh = nt(Kr),
    Oo,
    Io,
    Yr,
    Za = A({}, Kr, {
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
          : (e !== Yr &&
              (Yr && e.type === 'mousemove'
                ? ((Oo = e.screenX - Yr.screenX), (Io = e.screenY - Yr.screenY))
                : (Io = Oo = 0),
              (Yr = e)),
            Oo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Io;
      },
    }),
    Tu = nt(Za),
    _h = A({}, Za, { dataTransfer: 0 }),
    Ch = nt(_h),
    Nh = A({}, Kr, { relatedTarget: 0 }),
    Do = nt(Nh),
    Eh = A({}, Un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Th = nt(Eh),
    jh = A({}, Un, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ph = nt(jh),
    Rh = A({}, Un, { data: 0 }),
    ju = nt(Rh),
    zh = {
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
    Ah = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Oh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Ah[e]) ? !!t[e] : !1;
  }
  function Uo() {
    return Oh;
  }
  var Ih = A({}, Kr, {
      key: function (e) {
        if (e.key) {
          var t = zh[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Xa(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
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
    Dh = nt(Ih),
    Uh = A({}, Za, {
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
    Pu = nt(Uh),
    Mh = A({}, Kr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Uo,
    }),
    Fh = nt(Mh),
    Bh = A({}, Un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $h = nt(Bh),
    qh = A({}, Za, {
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
    Hh = nt(qh),
    Vh = A({}, Un, { newState: 0, oldState: 0 }),
    Wh = nt(Vh),
    Qh = [9, 13, 27, 32],
    Mo = Wt && 'CompositionEvent' in window,
    Xr = null;
  Wt && 'documentMode' in document && (Xr = document.documentMode);
  var Kh = Wt && 'TextEvent' in window && !Xr,
    Ru = Wt && (!Mo || (Xr && 8 < Xr && 11 >= Xr)),
    zu = ' ',
    Lu = !1;
  function Au(e, t) {
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
  function Ou(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var ur = !1;
  function Yh(e, t) {
    switch (e) {
      case 'compositionend':
        return Ou(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Lu = !0), zu);
      case 'textInput':
        return ((e = t.data), e === zu && Lu ? null : e);
      default:
        return null;
    }
  }
  function Xh(e, t) {
    if (ur)
      return e === 'compositionend' || (!Mo && Au(e, t))
        ? ((e = Nu()), (Ya = Ao = dn = null), (ur = !1), e)
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
        return Ru && t.locale !== 'ko' ? null : t.data;
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
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Jh[e.type] : t === 'textarea';
  }
  function Du(e, t, n, r) {
    (ir ? (lr ? lr.push(r) : (lr = [r])) : (ir = r),
      (t = $s(t, 'onChange')),
      0 < t.length &&
        ((n = new Ga('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
  }
  var Jr = null,
    Gr = null;
  function Gh(e) {
    kf(e, 0);
  }
  function es(e) {
    var t = Vr(e);
    if (vu(t)) return e;
  }
  function Uu(e, t) {
    if (e === 'change') return t;
  }
  var Mu = !1;
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
    Mu = Fo && (!document.documentMode || 9 < document.documentMode);
  }
  function Bu() {
    Jr && (Jr.detachEvent('onpropertychange', $u), (Gr = Jr = null));
  }
  function $u(e) {
    if (e.propertyName === 'value' && es(Gr)) {
      var t = [];
      (Du(t, Gr, e, Ro(e)), Cu(Gh, t));
    }
  }
  function Zh(e, t, n) {
    e === 'focusin'
      ? (Bu(), (Jr = t), (Gr = n), Jr.attachEvent('onpropertychange', $u))
      : e === 'focusout' && Bu();
  }
  function em(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return es(Gr);
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
  function Zr(e, t) {
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
  function qu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Hu(e, t) {
    var n = qu(e);
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
      n = qu(n);
    }
  }
  function Vu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Vu(e, t.parentNode)
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
  function $o(e) {
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
    qo = null,
    ea = null,
    Ho = !1;
  function Qu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ho ||
      cr == null ||
      cr !== Qa(r) ||
      ((r = cr),
      'selectionStart' in r && $o(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (ea && Zr(ea, r)) ||
        ((ea = r),
        (r = $s(qo, 'onSelect')),
        0 < r.length &&
          ((t = new Ga('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = cr))));
  }
  function Mn(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var dr = {
      animationend: Mn('Animation', 'AnimationEnd'),
      animationiteration: Mn('Animation', 'AnimationIteration'),
      animationstart: Mn('Animation', 'AnimationStart'),
      transitionrun: Mn('Transition', 'TransitionRun'),
      transitionstart: Mn('Transition', 'TransitionStart'),
      transitioncancel: Mn('Transition', 'TransitionCancel'),
      transitionend: Mn('Transition', 'TransitionEnd'),
    },
    Vo = {},
    Ku = {};
  Wt &&
    ((Ku = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete dr.animationend.animation,
      delete dr.animationiteration.animation,
      delete dr.animationstart.animation),
    'TransitionEvent' in window || delete dr.transitionend.transition);
  function Fn(e) {
    if (Vo[e]) return Vo[e];
    if (!dr[e]) return e;
    var t = dr[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ku) return (Vo[e] = t[n]);
    return e;
  }
  var Yu = Fn('animationend'),
    Xu = Fn('animationiteration'),
    Ju = Fn('animationstart'),
    sm = Fn('transitionrun'),
    om = Fn('transitionstart'),
    im = Fn('transitioncancel'),
    Gu = Fn('transitionend'),
    Zu = new Map(),
    Wo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Wo.push('scrollEnd');
  function zt(e, t) {
    (Zu.set(e, t), Dn(t, [e]));
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
    xt = [],
    fr = 0,
    Qo = 0;
  function ns() {
    for (var e = fr, t = (Qo = fr = 0); t < e; ) {
      var n = xt[t];
      xt[t++] = null;
      var r = xt[t];
      xt[t++] = null;
      var a = xt[t];
      xt[t++] = null;
      var s = xt[t];
      if (((xt[t++] = null), r !== null && a !== null)) {
        var u = r.pending;
        (u === null ? (a.next = a) : ((a.next = u.next), (u.next = a)), (r.pending = a));
      }
      s !== 0 && ec(n, a, s);
    }
  }
  function rs(e, t, n, r) {
    ((xt[fr++] = e),
      (xt[fr++] = t),
      (xt[fr++] = n),
      (xt[fr++] = r),
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
    if (50 < xa) throw ((xa = 0), (rl = null), Error(l(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var pr = {};
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
  function pt(e, t, n, r) {
    return new lm(e, t, n, r);
  }
  function Yo(e) {
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
  function ss(e, t, n, r, a, s) {
    var u = 0;
    if (((r = e), typeof e == 'function')) Yo(e) && (u = 1);
    else if (typeof e == 'string')
      u = pg(e, n, L.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case lt:
          return ((e = pt(31, n, t, a)), (e.elementType = lt), (e.lanes = s), e);
        case Q:
          return $n(n.children, a, s, t);
        case se:
          ((u = 8), (a |= 24));
          break;
        case $e:
          return ((e = pt(12, n, t, a | 2)), (e.elementType = $e), (e.lanes = s), e);
        case Pe:
          return ((e = pt(13, n, t, a)), (e.elementType = Pe), (e.lanes = s), e);
        case qe:
          return ((e = pt(19, n, t, a)), (e.elementType = qe), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case je:
                u = 10;
                break e;
              case Pt:
                u = 9;
                break e;
              case Ce:
                u = 11;
                break e;
              case J:
                u = 14;
                break e;
              case xe:
                ((u = 16), (r = null));
                break e;
            }
          ((u = 29), (n = Error(l(130, e === null ? 'null' : typeof e, ''))), (r = null));
      }
    return ((t = pt(u, n, t, a)), (t.elementType = e), (t.type = r), (t.lanes = s), t);
  }
  function $n(e, t, n, r) {
    return ((e = pt(7, e, r, t)), (e.lanes = n), e);
  }
  function Xo(e, t, n) {
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
    os = null,
    ta = 0,
    _t = [],
    Ct = 0,
    fn = null,
    Dt = 1,
    Ut = '';
  function Kt(e, t) {
    ((hr[mr++] = ta), (hr[mr++] = os), (os = e), (ta = t));
  }
  function ac(e, t, n) {
    ((_t[Ct++] = Dt), (_t[Ct++] = Ut), (_t[Ct++] = fn), (fn = e));
    var r = Dt;
    e = Ut;
    var a = 32 - dt(r) - 1;
    ((r &= ~(1 << a)), (n += 1));
    var s = 32 - dt(t) + a;
    if (30 < s) {
      var u = a - (a % 5);
      ((s = (r & ((1 << u) - 1)).toString(32)),
        (r >>= u),
        (a -= u),
        (Dt = (1 << (32 - dt(t) + a)) | (n << a) | r),
        (Ut = s + e));
    } else ((Dt = (1 << s) | (n << a) | r), (Ut = e));
  }
  function Go(e) {
    e.return !== null && (Kt(e, 1), ac(e, 1, 0));
  }
  function Zo(e) {
    for (; e === os; ) ((os = hr[--mr]), (hr[mr] = null), (ta = hr[--mr]), (hr[mr] = null));
    for (; e === fn; )
      ((fn = _t[--Ct]),
        (_t[Ct] = null),
        (Ut = _t[--Ct]),
        (_t[Ct] = null),
        (Dt = _t[--Ct]),
        (_t[Ct] = null));
  }
  function sc(e, t) {
    ((_t[Ct++] = Dt), (_t[Ct++] = Ut), (_t[Ct++] = fn), (Dt = t.id), (Ut = t.overflow), (fn = e));
  }
  var Ve = null,
    ve = null,
    re = !1,
    pn = null,
    Nt = !1,
    ei = Error(l(519));
  function hn(e) {
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
        for (n = 0; n < _a.length; n++) ee(_a[n], t);
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
      _f(t.textContent, n)
        ? (r.popover != null && (ee('beforetoggle', t), ee('toggle', t)),
          r.onScroll != null && ee('scroll', t),
          r.onScrollEnd != null && ee('scrollend', t),
          r.onClick != null && (t.onclick = Vt),
          (t = !0))
        : (t = !1),
      t || hn(e, !0));
  }
  function ic(e) {
    for (Ve = e.return; Ve; )
      switch (Ve.tag) {
        case 5:
        case 31:
        case 13:
          Nt = !1;
          return;
        case 27:
        case 3:
          Nt = !0;
          return;
        default:
          Ve = Ve.return;
      }
  }
  function gr(e) {
    if (e !== Ve) return !1;
    if (!re) return (ic(e), (re = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type), (n = !(n !== 'form' && n !== 'button') || vl(e.type, e.memoizedProps))),
        (n = !n)),
      n && ve && hn(e),
      ic(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(l(317));
      ve = Lf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(l(317));
      ve = Lf(e);
    } else
      t === 27
        ? ((t = ve), Tn(e.type) ? ((e = Sl), (Sl = null), (ve = e)) : (ve = t))
        : (ve = Ve ? Et(e.stateNode.nextSibling) : null);
    return !0;
  }
  function qn() {
    ((ve = Ve = null), (re = !1));
  }
  function ti() {
    var e = pn;
    return (e !== null && (ot === null ? (ot = e) : ot.push.apply(ot, e), (pn = null)), e);
  }
  function na(e) {
    pn === null ? (pn = [e]) : pn.push(e);
  }
  var ni = p(null),
    Hn = null,
    Yt = null;
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
          for (var h = 0; h < t.length; h++)
            if (d.context === t[h]) {
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
      } else if (a === G.current) {
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
  function Vn(e) {
    ((Hn = e), (Yt = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function We(e) {
    return lc(Hn, e);
  }
  function ls(e, t) {
    return (Hn === null && Vn(e), lc(e, t));
  }
  function lc(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Yt === null)) {
      if (e === null) throw Error(l(308));
      ((Yt = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Yt = Yt.next = t;
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
    Re = {
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
  var cc = E.S;
  E.S = function (e, t) {
    ((Qd = ut()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && fm(e, t),
      cc !== null && cc(e, t));
  };
  var Wn = p(null);
  function ii() {
    var e = Wn.current;
    return e !== null ? e : ye.pooledCache;
  }
  function us(e, t) {
    t === null ? P(Wn, Wn.current) : P(Wn, t.pool);
  }
  function dc() {
    var e = ii();
    return e === null ? null : { parent: Re._currentValue, pool: e };
  }
  var kr = Error(l(460)),
    li = Error(l(474)),
    cs = Error(l(542)),
    ds = { then: function () {} };
  function fc(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function pc(e, t, n) {
    switch (
      ((n = e[n]), n === void 0 ? e.push(t) : n !== t && (t.then(Vt, Vt), (t = n)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), mc(e), e);
      default:
        if (typeof t.status == 'string') t.then(Vt, Vt);
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
        throw ((Kn = t), kr);
    }
  }
  function Qn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == 'object' && typeof n.then == 'function' ? ((Kn = n), kr) : n;
    }
  }
  var Kn = null;
  function hc() {
    if (Kn === null) throw Error(l(459));
    var e = Kn;
    return ((Kn = null), e);
  }
  function mc(e) {
    if (e === kr || e === cs) throw Error(l(483));
  }
  var wr = null,
    sa = 0;
  function fs(e) {
    var t = sa;
    return ((sa += 1), wr === null && (wr = []), pc(wr, e, t));
  }
  function oa(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ps(e, t) {
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
    function s(v, g, b) {
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
    function d(v, g, b, T) {
      return g === null || g.tag !== 6
        ? ((g = Xo(b, v.mode, T)), (g.return = v), g)
        : ((g = a(g, b)), (g.return = v), g);
    }
    function h(v, g, b, T) {
      var B = b.type;
      return B === Q
        ? N(v, g, b.props.children, T, b.key)
        : g !== null &&
            (g.elementType === B ||
              (typeof B == 'object' && B !== null && B.$$typeof === xe && Qn(B) === g.type))
          ? ((g = a(g, b.props)), oa(g, b), (g.return = v), g)
          : ((g = ss(b.type, b.key, b.props, null, v.mode, T)), oa(g, b), (g.return = v), g);
    }
    function k(v, g, b, T) {
      return g === null ||
        g.tag !== 4 ||
        g.stateNode.containerInfo !== b.containerInfo ||
        g.stateNode.implementation !== b.implementation
        ? ((g = Jo(b, v.mode, T)), (g.return = v), g)
        : ((g = a(g, b.children || [])), (g.return = v), g);
    }
    function N(v, g, b, T, B) {
      return g === null || g.tag !== 7
        ? ((g = $n(b, v.mode, T, B)), (g.return = v), g)
        : ((g = a(g, b)), (g.return = v), g);
    }
    function j(v, g, b) {
      if ((typeof g == 'string' && g !== '') || typeof g == 'number' || typeof g == 'bigint')
        return ((g = Xo('' + g, v.mode, b)), (g.return = v), g);
      if (typeof g == 'object' && g !== null) {
        switch (g.$$typeof) {
          case $:
            return ((b = ss(g.type, g.key, g.props, null, v.mode, b)), oa(b, g), (b.return = v), b);
          case oe:
            return ((g = Jo(g, v.mode, b)), (g.return = v), g);
          case xe:
            return ((g = Qn(g)), j(v, g, b));
        }
        if (et(g) || Ye(g)) return ((g = $n(g, v.mode, b, null)), (g.return = v), g);
        if (typeof g.then == 'function') return j(v, fs(g), b);
        if (g.$$typeof === je) return j(v, ls(v, g), b);
        ps(v, g);
      }
      return null;
    }
    function x(v, g, b, T) {
      var B = g !== null ? g.key : null;
      if ((typeof b == 'string' && b !== '') || typeof b == 'number' || typeof b == 'bigint')
        return B !== null ? null : d(v, g, '' + b, T);
      if (typeof b == 'object' && b !== null) {
        switch (b.$$typeof) {
          case $:
            return b.key === B ? h(v, g, b, T) : null;
          case oe:
            return b.key === B ? k(v, g, b, T) : null;
          case xe:
            return ((b = Qn(b)), x(v, g, b, T));
        }
        if (et(b) || Ye(b)) return B !== null ? null : N(v, g, b, T, null);
        if (typeof b.then == 'function') return x(v, g, fs(b), T);
        if (b.$$typeof === je) return x(v, g, ls(v, b), T);
        ps(v, b);
      }
      return null;
    }
    function _(v, g, b, T, B) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((v = v.get(b) || null), d(g, v, '' + T, B));
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case $:
            return ((v = v.get(T.key === null ? b : T.key) || null), h(g, v, T, B));
          case oe:
            return ((v = v.get(T.key === null ? b : T.key) || null), k(g, v, T, B));
          case xe:
            return ((T = Qn(T)), _(v, g, b, T, B));
        }
        if (et(T) || Ye(T)) return ((v = v.get(b) || null), N(g, v, T, B, null));
        if (typeof T.then == 'function') return _(v, g, b, fs(T), B);
        if (T.$$typeof === je) return _(v, g, b, ls(g, T), B);
        ps(g, T);
      }
      return null;
    }
    function U(v, g, b, T) {
      for (
        var B = null, ie = null, F = g, X = (g = 0), ne = null;
        F !== null && X < b.length;
        X++
      ) {
        F.index > X ? ((ne = F), (F = null)) : (ne = F.sibling);
        var le = x(v, F, b[X], T);
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
      if (X === b.length) return (n(v, F), re && Kt(v, X), B);
      if (F === null) {
        for (; X < b.length; X++)
          ((F = j(v, b[X], T)),
            F !== null && ((g = s(F, g, X)), ie === null ? (B = F) : (ie.sibling = F), (ie = F)));
        return (re && Kt(v, X), B);
      }
      for (F = r(F); X < b.length; X++)
        ((ne = _(F, v, X, b[X], T)),
          ne !== null &&
            (e && ne.alternate !== null && F.delete(ne.key === null ? X : ne.key),
            (g = s(ne, g, X)),
            ie === null ? (B = ne) : (ie.sibling = ne),
            (ie = ne)));
      return (
        e &&
          F.forEach(function (Ln) {
            return t(v, Ln);
          }),
        re && Kt(v, X),
        B
      );
    }
    function W(v, g, b, T) {
      if (b == null) throw Error(l(151));
      for (
        var B = null, ie = null, F = g, X = (g = 0), ne = null, le = b.next();
        F !== null && !le.done;
        X++, le = b.next()
      ) {
        F.index > X ? ((ne = F), (F = null)) : (ne = F.sibling);
        var Ln = x(v, F, le.value, T);
        if (Ln === null) {
          F === null && (F = ne);
          break;
        }
        (e && F && Ln.alternate === null && t(v, F),
          (g = s(Ln, g, X)),
          ie === null ? (B = Ln) : (ie.sibling = Ln),
          (ie = Ln),
          (F = ne));
      }
      if (le.done) return (n(v, F), re && Kt(v, X), B);
      if (F === null) {
        for (; !le.done; X++, le = b.next())
          ((le = j(v, le.value, T)),
            le !== null &&
              ((g = s(le, g, X)), ie === null ? (B = le) : (ie.sibling = le), (ie = le)));
        return (re && Kt(v, X), B);
      }
      for (F = r(F); !le.done; X++, le = b.next())
        ((le = _(F, v, X, le.value, T)),
          le !== null &&
            (e && le.alternate !== null && F.delete(le.key === null ? X : le.key),
            (g = s(le, g, X)),
            ie === null ? (B = le) : (ie.sibling = le),
            (ie = le)));
      return (
        e &&
          F.forEach(function (_g) {
            return t(v, _g);
          }),
        re && Kt(v, X),
        B
      );
    }
    function ge(v, g, b, T) {
      if (
        (typeof b == 'object' &&
          b !== null &&
          b.type === Q &&
          b.key === null &&
          (b = b.props.children),
        typeof b == 'object' && b !== null)
      ) {
        switch (b.$$typeof) {
          case $:
            e: {
              for (var B = b.key; g !== null; ) {
                if (g.key === B) {
                  if (((B = b.type), B === Q)) {
                    if (g.tag === 7) {
                      (n(v, g.sibling), (T = a(g, b.props.children)), (T.return = v), (v = T));
                      break e;
                    }
                  } else if (
                    g.elementType === B ||
                    (typeof B == 'object' && B !== null && B.$$typeof === xe && Qn(B) === g.type)
                  ) {
                    (n(v, g.sibling), (T = a(g, b.props)), oa(T, b), (T.return = v), (v = T));
                    break e;
                  }
                  n(v, g);
                  break;
                } else t(v, g);
                g = g.sibling;
              }
              b.type === Q
                ? ((T = $n(b.props.children, v.mode, T, b.key)), (T.return = v), (v = T))
                : ((T = ss(b.type, b.key, b.props, null, v.mode, T)),
                  oa(T, b),
                  (T.return = v),
                  (v = T));
            }
            return u(v);
          case oe:
            e: {
              for (B = b.key; g !== null; ) {
                if (g.key === B)
                  if (
                    g.tag === 4 &&
                    g.stateNode.containerInfo === b.containerInfo &&
                    g.stateNode.implementation === b.implementation
                  ) {
                    (n(v, g.sibling), (T = a(g, b.children || [])), (T.return = v), (v = T));
                    break e;
                  } else {
                    n(v, g);
                    break;
                  }
                else t(v, g);
                g = g.sibling;
              }
              ((T = Jo(b, v.mode, T)), (T.return = v), (v = T));
            }
            return u(v);
          case xe:
            return ((b = Qn(b)), ge(v, g, b, T));
        }
        if (et(b)) return U(v, g, b, T);
        if (Ye(b)) {
          if (((B = Ye(b)), typeof B != 'function')) throw Error(l(150));
          return ((b = B.call(b)), W(v, g, b, T));
        }
        if (typeof b.then == 'function') return ge(v, g, fs(b), T);
        if (b.$$typeof === je) return ge(v, g, ls(v, b), T);
        ps(v, b);
      }
      return (typeof b == 'string' && b !== '') || typeof b == 'number' || typeof b == 'bigint'
        ? ((b = '' + b),
          g !== null && g.tag === 6
            ? (n(v, g.sibling), (T = a(g, b)), (T.return = v), (v = T))
            : (n(v, g), (T = Xo(b, v.mode, T)), (T.return = v), (v = T)),
          u(v))
        : n(v, g);
    }
    return function (v, g, b, T) {
      try {
        sa = 0;
        var B = ge(v, g, b, T);
        return ((wr = null), B);
      } catch (F) {
        if (F === kr || F === cs) throw F;
        var ie = pt(29, F, null, v.mode);
        return ((ie.lanes = T), (ie.return = v), ie);
      } finally {
      }
    };
  }
  var Yn = gc(!0),
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
      var h = d,
        k = h.next;
      ((h.next = null), u === null ? (s = k) : (u.next = k), (u = h));
      var N = e.alternate;
      N !== null &&
        ((N = N.updateQueue),
        (d = N.lastBaseUpdate),
        d !== u && (d === null ? (N.firstBaseUpdate = k) : (d.next = k), (N.lastBaseUpdate = h)));
    }
    if (s !== null) {
      var j = a.baseState;
      ((u = 0), (N = k = h = null), (d = s));
      do {
        var x = d.lane & -536870913,
          _ = x !== d.lane;
        if (_ ? (te & x) === x : (r & x) === x) {
          (x !== 0 && x === vr && (fi = !0),
            N !== null &&
              (N = N.next =
                { lane: 0, tag: d.tag, payload: d.payload, callback: null, next: null }));
          e: {
            var U = e,
              W = d;
            x = t;
            var ge = n;
            switch (W.tag) {
              case 1:
                if (((U = W.payload), typeof U == 'function')) {
                  j = U.call(ge, j, x);
                  break e;
                }
                j = U;
                break e;
              case 3:
                U.flags = (U.flags & -65537) | 128;
              case 0:
                if (
                  ((U = W.payload), (x = typeof U == 'function' ? U.call(ge, j, x) : U), x == null)
                )
                  break e;
                j = A({}, j, x);
                break e;
              case 2:
                gn = !0;
            }
          }
          ((x = d.callback),
            x !== null &&
              ((e.flags |= 64),
              _ && (e.flags |= 8192),
              (_ = a.callbacks),
              _ === null ? (a.callbacks = [x]) : _.push(x)));
        } else
          ((_ = { lane: x, tag: d.tag, payload: d.payload, callback: d.callback, next: null }),
            N === null ? ((k = N = _), (h = j)) : (N = N.next = _),
            (u |= x));
        if (((d = d.next), d === null)) {
          if (((d = a.shared.pending), d === null)) break;
          ((_ = d),
            (d = _.next),
            (_.next = null),
            (a.lastBaseUpdate = _),
            (a.shared.pending = null));
        }
      } while (!0);
      (N === null && (h = j),
        (a.baseState = h),
        (a.firstBaseUpdate = k),
        (a.lastBaseUpdate = N),
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
  var xr = p(null),
    hs = p(0);
  function kc(e, t) {
    ((e = sn), P(hs, e), P(xr, t), (sn = e | t.baseLanes));
  }
  function pi() {
    (P(hs, sn), P(xr, xr.current));
  }
  function hi() {
    ((sn = hs.current), y(xr), y(hs));
  }
  var ht = p(null),
    Lt = null;
  function bn(e) {
    var t = e.alternate;
    (P(Ee, Ee.current & 1),
      P(ht, e),
      Lt === null && (t === null || xr.current !== null || t.memoizedState !== null) && (Lt = e));
  }
  function mi(e) {
    (P(Ee, Ee.current), P(ht, e), Lt === null && (Lt = e));
  }
  function wc(e) {
    e.tag === 22 ? (P(Ee, Ee.current), P(ht, e), Lt === null && (Lt = e)) : kn();
  }
  function kn() {
    (P(Ee, Ee.current), P(ht, ht.current));
  }
  function mt(e) {
    (y(ht), Lt === e && (Lt = null), y(Ee));
  }
  var Ee = p(0);
  function ms(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || wl(n) || xl(n))) return t;
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
    Y = null,
    he = null,
    ze = null,
    gs = !1,
    Sr = !1,
    Xn = !1,
    ys = 0,
    ca = 0,
    _r = null,
    hm = 0;
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
      (Y = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (E.H = e === null || e.memoizedState === null ? ad : zi),
      (Xn = !1),
      (s = n(r, a)),
      (Xn = !1),
      Sr && (s = Sc(t, n, r, a)),
      xc(e),
      s
    );
  }
  function xc(e) {
    E.H = pa;
    var t = he !== null && he.next !== null;
    if (((Jt = 0), (ze = he = Y = null), (gs = !1), (ca = 0), (_r = null), t)) throw Error(l(300));
    e === null || Le || ((e = e.dependencies), e !== null && is(e) && (Le = !0));
  }
  function Sc(e, t, n, r) {
    Y = e;
    var a = 0;
    do {
      if ((Sr && (_r = null), (ca = 0), (Sr = !1), 25 <= a)) throw Error(l(301));
      if (((a += 1), (ze = he = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((E.H = sd), (s = t(n, r)));
    } while (Sr);
    return s;
  }
  function mm() {
    var e = E.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? da(t) : t),
      (e = e.useState()[0]),
      (he !== null ? he.memoizedState : null) !== e && (Y.flags |= 1024),
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
  function ki(e) {
    if (gs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      gs = !1;
    }
    ((Jt = 0), (ze = he = Y = null), (Sr = !1), (ca = ys = 0), (_r = null));
  }
  function Ge() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ze === null ? (Y.memoizedState = ze = e) : (ze = ze.next = e), ze);
  }
  function Te() {
    if (he === null) {
      var e = Y.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = he.next;
    var t = ze === null ? Y.memoizedState : ze.next;
    if (t !== null) ((ze = t), (he = e));
    else {
      if (e === null) throw Y.alternate === null ? Error(l(467)) : Error(l(310));
      ((he = e),
        (e = {
          memoizedState: he.memoizedState,
          baseState: he.baseState,
          baseQueue: he.baseQueue,
          queue: he.queue,
          next: null,
        }),
        ze === null ? (Y.memoizedState = ze = e) : (ze = ze.next = e));
    }
    return ze;
  }
  function vs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function da(e) {
    var t = ca;
    return (
      (ca += 1),
      _r === null && (_r = []),
      (e = pc(_r, e, t)),
      (t = Y),
      (ze === null ? t.memoizedState : ze.next) === null &&
        ((t = t.alternate), (E.H = t === null || t.memoizedState === null ? ad : zi)),
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
      n = Y.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var r = Y.alternate;
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
      n === null && ((n = vs()), (Y.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Ie;
    return (t.index++, n);
  }
  function Gt(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function ks(e) {
    var t = Te();
    return xi(t, he, e);
  }
  function xi(e, t, n) {
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
        h = null,
        k = t,
        N = !1;
      do {
        var j = k.lane & -536870913;
        if (j !== k.lane ? (te & j) === j : (Jt & j) === j) {
          var x = k.revertLane;
          if (x === 0)
            (h !== null &&
              (h = h.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: k.action,
                  hasEagerState: k.hasEagerState,
                  eagerState: k.eagerState,
                  next: null,
                }),
              j === vr && (N = !0));
          else if ((Jt & x) === x) {
            ((k = k.next), x === vr && (N = !0));
            continue;
          } else
            ((j = {
              lane: 0,
              revertLane: k.revertLane,
              gesture: null,
              action: k.action,
              hasEagerState: k.hasEagerState,
              eagerState: k.eagerState,
              next: null,
            }),
              h === null ? ((d = h = j), (u = s)) : (h = h.next = j),
              (Y.lanes |= x),
              (Sn |= x));
          ((j = k.action), Xn && n(s, j), (s = k.hasEagerState ? k.eagerState : n(s, j)));
        } else
          ((x = {
            lane: j,
            revertLane: k.revertLane,
            gesture: k.gesture,
            action: k.action,
            hasEagerState: k.hasEagerState,
            eagerState: k.eagerState,
            next: null,
          }),
            h === null ? ((d = h = x), (u = s)) : (h = h.next = x),
            (Y.lanes |= j),
            (Sn |= j));
        k = k.next;
      } while (k !== null && k !== t);
      if (
        (h === null ? (u = s) : (h.next = d),
        !ft(s, e.memoizedState) && ((Le = !0), N && ((n = br), n !== null)))
      )
        throw n;
      ((e.memoizedState = s), (e.baseState = u), (e.baseQueue = h), (r.lastRenderedState = s));
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
      (ft(s, t.memoizedState) || (Le = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (n.lastRenderedState = s));
    }
    return [s, r];
  }
  function _c(e, t, n) {
    var r = Y,
      a = Te(),
      s = re;
    if (s) {
      if (n === void 0) throw Error(l(407));
      n = n();
    } else n = t();
    var u = !ft((he || a).memoizedState, n);
    if (
      (u && ((a.memoizedState = n), (Le = !0)),
      (a = a.queue),
      Ni(Ec.bind(null, r, a, e), [e]),
      a.getSnapshot !== t || u || (ze !== null && ze.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        Cr(9, { destroy: void 0 }, Nc.bind(null, r, a, n, t), null),
        ye === null)
      )
        throw Error(l(349));
      s || (Jt & 127) !== 0 || Cc(r, t, n);
    }
    return n;
  }
  function Cc(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Y.updateQueue),
      t === null
        ? ((t = vs()), (Y.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Nc(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), Tc(t) && jc(e));
  }
  function Ec(e, t, n) {
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
  function _i(e) {
    var t = Ge();
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
        lastRenderedReducer: Gt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Pc(e, t, n, r) {
    return ((e.baseState = n), xi(e, he, typeof r == 'function' ? r : Gt));
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
      (E.T !== null ? n(!0) : (s.isTransition = !1),
        r(s),
        (n = t.pending),
        n === null
          ? ((s.next = t.pending = s), Rc(t, s))
          : ((s.next = n.next), (t.pending = n.next = s)));
    }
  }
  function Rc(e, t) {
    var n = t.action,
      r = t.payload,
      a = e.state;
    if (t.isTransition) {
      var s = E.T,
        u = {};
      E.T = u;
      try {
        var d = n(a, r),
          h = E.S;
        (h !== null && h(u, d), zc(e, t, d));
      } catch (k) {
        Ci(e, t, k);
      } finally {
        (s !== null && u.types !== null && (s.types = u.types), (E.T = s));
      }
    } else
      try {
        ((s = n(a, r)), zc(e, t, s));
      } catch (k) {
        Ci(e, t, k);
      }
  }
  function zc(e, t, n) {
    n !== null && typeof n == 'object' && typeof n.then == 'function'
      ? n.then(
          function (r) {
            Lc(e, t, r);
          },
          function (r) {
            return Ci(e, t, r);
          }
        )
      : Lc(e, t, n);
  }
  function Lc(e, t, n) {
    ((t.status = 'fulfilled'),
      (t.value = n),
      Ac(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next), n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Rc(e, n))));
  }
  function Ci(e, t, n) {
    var r = e.pending;
    if (((e.pending = null), r !== null)) {
      r = r.next;
      do ((t.status = 'rejected'), (t.reason = n), Ac(t), (t = t.next));
      while (t !== r);
    }
    e.action = null;
  }
  function Ac(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Oc(e, t) {
    return t;
  }
  function Ic(e, t) {
    if (re) {
      var n = ye.formState;
      if (n !== null) {
        e: {
          var r = Y;
          if (re) {
            if (ve) {
              t: {
                for (var a = ve, s = Nt; a.nodeType !== 8; ) {
                  if (!s) {
                    a = null;
                    break t;
                  }
                  if (((a = Et(a.nextSibling)), a === null)) {
                    a = null;
                    break t;
                  }
                }
                ((s = a.data), (a = s === 'F!' || s === 'F' ? a : null));
              }
              if (a) {
                ((ve = Et(a.nextSibling)), (r = a.data === 'F!'));
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
      (n = Ge()),
      (n.memoizedState = n.baseState = t),
      (r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Oc,
        lastRenderedState: t,
      }),
      (n.queue = r),
      (n = td.bind(null, Y, r)),
      (r.dispatch = n),
      (r = _i(!1)),
      (s = Ri.bind(null, Y, !1, r.queue)),
      (r = Ge()),
      (a = { state: t, dispatch: null, action: e, pending: null }),
      (r.queue = a),
      (n = gm.bind(null, Y, a, s, n)),
      (a.dispatch = n),
      (r.memoizedState = e),
      [t, n, !1]
    );
  }
  function Dc(e) {
    var t = Te();
    return Uc(t, he, e);
  }
  function Uc(e, t, n) {
    if (
      ((t = xi(e, t, Oc)[0]),
      (e = ks(Gt)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var r = da(t);
      } catch (u) {
        throw u === kr ? cs : u;
      }
    else r = t;
    t = Te();
    var a = t.queue,
      s = a.dispatch;
    return (
      n !== t.memoizedState &&
        ((Y.flags |= 2048), Cr(9, { destroy: void 0 }, ym.bind(null, a, n), null)),
      [r, s, e]
    );
  }
  function ym(e, t) {
    e.action = t;
  }
  function Mc(e) {
    var t = Te(),
      n = he;
    if (n !== null) return Uc(t, n, e);
    (Te(), (t = t.memoizedState), (n = Te()));
    var r = n.queue.dispatch;
    return ((n.memoizedState = e), [t, r, !1]);
  }
  function Cr(e, t, n, r) {
    return (
      (e = { tag: e, create: n, deps: r, inst: t, next: null }),
      (t = Y.updateQueue),
      t === null && ((t = vs()), (Y.updateQueue = t)),
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
    var a = Ge();
    ((Y.flags |= e),
      (a.memoizedState = Cr(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r)));
  }
  function xs(e, t, n, r) {
    var a = Te();
    r = r === void 0 ? null : r;
    var s = a.memoizedState.inst;
    he !== null && r !== null && gi(r, he.memoizedState.deps)
      ? (a.memoizedState = Cr(t, s, n, r))
      : ((Y.flags |= e), (a.memoizedState = Cr(1 | t, s, n, r)));
  }
  function Bc(e, t) {
    ws(8390656, 8, e, t);
  }
  function Ni(e, t) {
    xs(2048, 8, e, t);
  }
  function vm(e) {
    Y.flags |= 4;
    var t = Y.updateQueue;
    if (t === null) ((t = vs()), (Y.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function $c(e) {
    var t = Te().memoizedState;
    return (
      vm({ ref: t, nextImpl: e }),
      function () {
        if ((ue & 2) !== 0) throw Error(l(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function qc(e, t) {
    return xs(4, 2, e, t);
  }
  function Hc(e, t) {
    return xs(4, 4, e, t);
  }
  function Vc(e, t) {
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
    ((n = n != null ? n.concat([e]) : null), xs(4, 4, Vc.bind(null, t, e), n));
  }
  function Ei() {}
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
      : ((e.memoizedState = n), (e = Yd()), (Y.lanes |= e), (Sn |= e), n);
  }
  function Yc(e, t, n, r) {
    return ft(n, t)
      ? n
      : xr.current !== null
        ? ((e = Ti(e, n, r)), ft(e, t) || (Le = !0), e)
        : (Jt & 42) === 0 || ((Jt & 1073741824) !== 0 && (te & 261930) === 0)
          ? ((Le = !0), (e.memoizedState = n))
          : ((e = Yd()), (Y.lanes |= e), (Sn |= e), t);
  }
  function Xc(e, t, n, r, a) {
    var s = O.p;
    O.p = s !== 0 && 8 > s ? s : 8;
    var u = E.T,
      d = {};
    ((E.T = d), Ri(e, !1, t, n));
    try {
      var h = a(),
        k = E.S;
      if (
        (k !== null && k(d, h), h !== null && typeof h == 'object' && typeof h.then == 'function')
      ) {
        var N = pm(h, r);
        fa(e, t, N, vt(e));
      } else fa(e, t, r, vt(e));
    } catch (j) {
      fa(e, t, { then: function () {}, status: 'rejected', reason: j }, vt());
    } finally {
      ((O.p = s), u !== null && d.types !== null && (u.types = d.types), (E.T = u));
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
      q,
      n === null
        ? bm
        : function () {
            return (Gc(e), n(r));
          }
    );
  }
  function Jc(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Gt,
        lastRenderedState: q,
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
          lastRenderedReducer: Gt,
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
  function Gc(e) {
    var t = Jc(e);
    (t.next === null && (t = e.alternate.memoizedState), fa(e, t.next.queue, {}, vt()));
  }
  function Pi() {
    return We(ja);
  }
  function Zc() {
    return Te().memoizedState;
  }
  function ed() {
    return Te().memoizedState;
  }
  function km(e) {
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
  function Ri(e, t, n, r) {
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
    return e === Y || (t !== null && t === Y);
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
  var pa = {
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
  pa.useEffectEvent = Se;
  var ad = {
      readContext: We,
      use: bs,
      useCallback: function (e, t) {
        return ((Ge().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: We,
      useEffect: Bc,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null), ws(4194308, 4, Vc.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return ws(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ws(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Ge();
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
        var r = Ge();
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
          (e = e.dispatch = wm.bind(null, Y, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ge();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = _i(e);
        var t = e.queue,
          n = td.bind(null, Y, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: Ei,
      useDeferredValue: function (e, t) {
        var n = Ge();
        return Ti(n, e, t);
      },
      useTransition: function () {
        var e = _i(!1);
        return ((e = Xc.bind(null, Y, e.queue, !0, !1)), (Ge().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, n) {
        var r = Y,
          a = Ge();
        if (re) {
          if (n === void 0) throw Error(l(407));
          n = n();
        } else {
          if (((n = t()), ye === null)) throw Error(l(349));
          (te & 127) !== 0 || Cc(r, t, n);
        }
        a.memoizedState = n;
        var s = { value: n, getSnapshot: t };
        return (
          (a.queue = s),
          Bc(Ec.bind(null, r, s, e), [e]),
          (r.flags |= 2048),
          Cr(9, { destroy: void 0 }, Nc.bind(null, r, s, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Ge(),
          t = ye.identifierPrefix;
        if (re) {
          var n = Ut,
            r = Dt;
          ((n = (r & ~(1 << (32 - dt(r) - 1))).toString(32) + n),
            (t = '_' + t + 'R_' + n),
            (n = ys++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += '_'));
        } else ((n = hm++), (t = '_' + t + 'r_' + n.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Pi,
      useFormState: Ic,
      useActionState: Ic,
      useOptimistic: function (e) {
        var t = Ge();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = n), (t = Ri.bind(null, Y, !0, n)), (n.dispatch = t), [e, t]);
      },
      useMemoCache: wi,
      useCacheRefresh: function () {
        return (Ge().memoizedState = km.bind(null, Y));
      },
      useEffectEvent: function (e) {
        var t = Ge(),
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
    zi = {
      readContext: We,
      use: bs,
      useCallback: Qc,
      useContext: We,
      useEffect: Ni,
      useImperativeHandle: Wc,
      useInsertionEffect: qc,
      useLayoutEffect: Hc,
      useMemo: Kc,
      useReducer: ks,
      useRef: Fc,
      useState: function () {
        return ks(Gt);
      },
      useDebugValue: Ei,
      useDeferredValue: function (e, t) {
        var n = Te();
        return Yc(n, he.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ks(Gt)[0],
          t = Te().memoizedState;
        return [typeof e == 'boolean' ? e : da(e), t];
      },
      useSyncExternalStore: _c,
      useId: Zc,
      useHostTransitionStatus: Pi,
      useFormState: Dc,
      useActionState: Dc,
      useOptimistic: function (e, t) {
        var n = Te();
        return Pc(n, he, e, t);
      },
      useMemoCache: wi,
      useCacheRefresh: ed,
    };
  zi.useEffectEvent = $c;
  var sd = {
    readContext: We,
    use: bs,
    useCallback: Qc,
    useContext: We,
    useEffect: Ni,
    useImperativeHandle: Wc,
    useInsertionEffect: qc,
    useLayoutEffect: Hc,
    useMemo: Kc,
    useReducer: Si,
    useRef: Fc,
    useState: function () {
      return Si(Gt);
    },
    useDebugValue: Ei,
    useDeferredValue: function (e, t) {
      var n = Te();
      return he === null ? Ti(n, e, t) : Yc(n, he.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Si(Gt)[0],
        t = Te().memoizedState;
      return [typeof e == 'boolean' ? e : da(e), t];
    },
    useSyncExternalStore: _c,
    useId: Zc,
    useHostTransitionStatus: Pi,
    useFormState: Mc,
    useActionState: Mc,
    useOptimistic: function (e, t) {
      var n = Te();
      return he !== null ? Pc(n, he, e, t) : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: wi,
    useCacheRefresh: ed,
  };
  sd.useEffectEvent = $c;
  function Li(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : A({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Ai = {
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
          ? !Zr(n, r) || !Zr(a, s)
          : !0
    );
  }
  function id(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Ai.enqueueReplaceState(t, t.state, null));
  }
  function Jn(e, t) {
    var n = t;
    if ('ref' in t) {
      n = {};
      for (var r in t) r !== 'ref' && (n[r] = t[r]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = A({}, n));
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
  function _s(e, t) {
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
  function Oi(e, t, n) {
    return (
      (n = yn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        _s(e, t);
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
          typeof a != 'function' && (_n === null ? (_n = new Set([this])) : _n.add(this)));
        var d = r.stack;
        this.componentDidCatch(r.value, { componentStack: d !== null ? d : '' });
      });
  }
  function xm(e, t, n, r, a) {
    if (((n.flags |= 32768), r !== null && typeof r == 'object' && typeof r.then == 'function')) {
      if (((t = n.alternate), t !== null && yr(t, n, a, !0), (n = ht.current), n !== null)) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Lt === null ? Is() : n.alternate === null && _e === 0 && (_e = 3),
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
      return (ol(e, r, a), Is(), !1);
    }
    if (re)
      return (
        (t = ht.current),
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
            (a = Oi(e.stateNode, r, a)),
            di(e, a),
            _e !== 4 && (_e = 2)),
        !1
      );
    var s = Error(l(520), { cause: r });
    if (((s = St(s, n)), wa === null ? (wa = [s]) : wa.push(s), _e !== 4 && (_e = 2), t === null))
      return !0;
    ((r = St(r, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = a & -a),
            (n.lanes |= e),
            (e = Oi(n.stateNode, r, e)),
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
                  (_n === null || !_n.has(s)))))
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
  var Ii = Error(l(461)),
    Le = !1;
  function Qe(e, t, n, r) {
    t.child = e === null ? yc(t, null, n, r) : Yn(t, e.child, n, r);
  }
  function hd(e, t, n, r, a) {
    n = n.render;
    var s = t.ref;
    if ('ref' in r) {
      var u = {};
      for (var d in r) d !== 'ref' && (u[d] = r[d]);
    } else u = r;
    return (
      Vn(t),
      (r = yi(e, t, n, u, s, a)),
      (d = vi()),
      e !== null && !Le
        ? (bi(e, t, a), Zt(e, t, a))
        : (re && d && Go(t), (t.flags |= 1), Qe(e, t, r, a), t.child)
    );
  }
  function md(e, t, n, r, a) {
    if (e === null) {
      var s = n.type;
      return typeof s == 'function' && !Yo(s) && s.defaultProps === void 0 && n.compare === null
        ? ((t.tag = 15), (t.type = s), gd(e, t, s, r, a))
        : ((e = ss(n.type, null, r, t, t.mode, a)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !Hi(e, a))) {
      var u = s.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : Zr), n(u, r) && e.ref === t.ref))
        return Zt(e, t, a);
    }
    return ((t.flags |= 1), (e = Qt(s, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function gd(e, t, n, r, a) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Zr(s, r) && e.ref === t.ref)
        if (((Le = !1), (t.pendingProps = r = s), Hi(e, a))) (e.flags & 131072) !== 0 && (Le = !0);
        else return ((t.lanes = e.lanes), Zt(e, t, a));
    }
    return Di(e, t, n, r, a);
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
          s !== null ? kc(t, s) : pi(),
          wc(t));
      else return ((r = t.lanes = 536870912), vd(e, t, s !== null ? s.baseLanes | n : n, n, r));
    } else
      s !== null
        ? (us(t, s.cachePool), kc(t, s), kn(), (t.memoizedState = null))
        : (e !== null && us(t, null), pi(), kn());
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
    var s = ii();
    return (
      (s = s === null ? null : { parent: Re._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: n, cachePool: s }),
      e !== null && us(t, null),
      pi(),
      wc(t),
      e !== null && yr(e, t, r, !0),
      (t.childLanes = a),
      null
    );
  }
  function Cs(e, t) {
    return (
      (t = Es({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function bd(e, t, n) {
    return (
      Yn(t, e.child, null, n),
      (e = Cs(t, t.pendingProps)),
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
        if (r.mode === 'hidden') return ((e = Cs(t, r)), (t.lanes = 536870912), ha(null, e));
        if (
          (mi(t),
          (e = ve)
            ? ((e = zf(e, Nt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: Dt, overflow: Ut } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                (Ve = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw hn(t);
        return ((t.lanes = 536870912), null);
      }
      return Cs(t, r);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var u = s.dehydrated;
      if ((mi(t), a))
        if (t.flags & 256) ((t.flags &= -257), (t = bd(e, t, n)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(l(558));
      else if ((Le || yr(e, t, n, !1), (a = (n & e.childLanes) !== 0), Le || a)) {
        if (((r = ye), r !== null && ((u = uu(r, n)), u !== 0 && u !== s.retryLane)))
          throw ((s.retryLane = u), Bn(e, u), it(r, e, u), Ii);
        (Is(), (t = bd(e, t, n)));
      } else
        ((e = s.treeContext),
          (ve = Et(u.nextSibling)),
          (Ve = t),
          (re = !0),
          (pn = null),
          (Nt = !1),
          e !== null && sc(t, e),
          (t = Cs(t, r)),
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
  function Ns(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != 'function' && typeof n != 'object') throw Error(l(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Di(e, t, n, r, a) {
    return (
      Vn(t),
      (n = yi(e, t, n, r, void 0, a)),
      (r = vi()),
      e !== null && !Le
        ? (bi(e, t, a), Zt(e, t, a))
        : (re && r && Go(t), (t.flags |= 1), Qe(e, t, n, a), t.child)
    );
  }
  function kd(e, t, n, r, a, s) {
    return (
      Vn(t),
      (t.updateQueue = null),
      (n = Sc(t, r, n, a)),
      xc(e),
      (r = vi()),
      e !== null && !Le
        ? (bi(e, t, s), Zt(e, t, s))
        : (re && r && Go(t), (t.flags |= 1), Qe(e, t, n, s), t.child)
    );
  }
  function wd(e, t, n, r, a) {
    if ((Vn(t), t.stateNode === null)) {
      var s = pr,
        u = n.contextType;
      (typeof u == 'object' && u !== null && (s = We(u)),
        (s = new n(r, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = Ai),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = r),
        (s.state = t.memoizedState),
        (s.refs = {}),
        ui(t),
        (u = n.contextType),
        (s.context = typeof u == 'object' && u !== null ? We(u) : pr),
        (s.state = t.memoizedState),
        (u = n.getDerivedStateFromProps),
        typeof u == 'function' && (Li(t, n, u, r), (s.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((u = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          u !== s.state && Ai.enqueueReplaceState(s, s.state, null),
          ua(t, r, s, a),
          la(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (r = !0));
    } else if (e === null) {
      s = t.stateNode;
      var d = t.memoizedProps,
        h = Jn(n, d);
      s.props = h;
      var k = s.context,
        N = n.contextType;
      ((u = pr), typeof N == 'object' && N !== null && (u = We(N)));
      var j = n.getDerivedStateFromProps;
      ((N = typeof j == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (d = t.pendingProps !== d),
        N ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((d || k !== u) && id(t, s, r, u)),
        (gn = !1));
      var x = t.memoizedState;
      ((s.state = x),
        ua(t, r, s, a),
        la(),
        (k = t.memoizedState),
        d || x !== k || gn
          ? (typeof j == 'function' && (Li(t, n, j, r), (k = t.memoizedState)),
            (h = gn || od(t, n, h, r, x, k, u))
              ? (N ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = k)),
            (s.props = r),
            (s.state = k),
            (s.context = u),
            (r = h))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
      ((s = t.stateNode),
        ci(e, t),
        (u = t.memoizedProps),
        (N = Jn(n, u)),
        (s.props = N),
        (j = t.pendingProps),
        (x = s.context),
        (k = n.contextType),
        (h = pr),
        typeof k == 'object' && k !== null && (h = We(k)),
        (d = n.getDerivedStateFromProps),
        (k = typeof d == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((u !== j || x !== h) && id(t, s, r, h)),
        (gn = !1),
        (x = t.memoizedState),
        (s.state = x),
        ua(t, r, s, a),
        la());
      var _ = t.memoizedState;
      u !== j || x !== _ || gn || (e !== null && e.dependencies !== null && is(e.dependencies))
        ? (typeof d == 'function' && (Li(t, n, d, r), (_ = t.memoizedState)),
          (N =
            gn ||
            od(t, n, N, r, x, _, h) ||
            (e !== null && e.dependencies !== null && is(e.dependencies)))
            ? (k ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(r, _, h),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(r, _, h)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (u === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (u === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = _)),
          (s.props = r),
          (s.state = _),
          (s.context = h),
          (r = N))
        : (typeof s.componentDidUpdate != 'function' ||
            (u === e.memoizedProps && x === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (u === e.memoizedProps && x === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return (
      (s = r),
      Ns(e, t),
      (r = (t.flags & 128) !== 0),
      s || r
        ? ((s = t.stateNode),
          (n = r && typeof n.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && r
            ? ((t.child = Yn(t, e.child, null, a)), (t.child = Yn(t, null, n, a)))
            : Qe(e, t, n, a),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = Zt(e, t, a)),
      e
    );
  }
  function xd(e, t, n, r) {
    return (qn(), (t.flags |= 256), Qe(e, t, n, r), t.child);
  }
  var Ui = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Mi(e) {
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
      ((u = s) || (u = e !== null && e.memoizedState === null ? !1 : (Ee.current & 2) !== 0),
      u && ((a = !0), (t.flags &= -129)),
      (u = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (re) {
        if (
          (a ? bn(t) : kn(),
          (e = ve)
            ? ((e = zf(e, Nt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: fn !== null ? { id: Dt, overflow: Ut } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = nc(e)),
                (n.return = t),
                (t.child = n),
                (Ve = t),
                (ve = null)))
            : (e = null),
          e === null)
        )
          throw hn(t);
        return (xl(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var d = r.children;
      return (
        (r = r.fallback),
        a
          ? (kn(),
            (a = t.mode),
            (d = Es({ mode: 'hidden', children: d }, a)),
            (r = $n(r, a, n, null)),
            (d.return = t),
            (r.return = t),
            (d.sibling = r),
            (t.child = d),
            (r = t.child),
            (r.memoizedState = Mi(n)),
            (r.childLanes = Fi(e, u, n)),
            (t.memoizedState = Ui),
            ha(null, r))
          : (bn(t), Bi(t, d))
      );
    }
    var h = e.memoizedState;
    if (h !== null && ((d = h.dehydrated), d !== null)) {
      if (s)
        t.flags & 256
          ? (bn(t), (t.flags &= -257), (t = $i(e, t, n)))
          : t.memoizedState !== null
            ? (kn(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (kn(),
              (d = r.fallback),
              (a = t.mode),
              (r = Es({ mode: 'visible', children: r.children }, a)),
              (d = $n(d, a, n, null)),
              (d.flags |= 2),
              (r.return = t),
              (d.return = t),
              (r.sibling = d),
              (t.child = r),
              Yn(t, e.child, null, n),
              (r = t.child),
              (r.memoizedState = Mi(n)),
              (r.childLanes = Fi(e, u, n)),
              (t.memoizedState = Ui),
              (t = ha(null, r)));
      else if ((bn(t), xl(d))) {
        if (((u = d.nextSibling && d.nextSibling.dataset), u)) var k = u.dgst;
        ((u = k),
          (r = Error(l(419))),
          (r.stack = ''),
          (r.digest = u),
          na({ value: r, source: null, stack: null }),
          (t = $i(e, t, n)));
      } else if ((Le || yr(e, t, n, !1), (u = (n & e.childLanes) !== 0), Le || u)) {
        if (((u = ye), u !== null && ((r = uu(u, n)), r !== 0 && r !== h.retryLane)))
          throw ((h.retryLane = r), Bn(e, r), it(u, e, r), Ii);
        (wl(d) || Is(), (t = $i(e, t, n)));
      } else
        wl(d)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = h.treeContext),
            (ve = Et(d.nextSibling)),
            (Ve = t),
            (re = !0),
            (pn = null),
            (Nt = !1),
            e !== null && sc(t, e),
            (t = Bi(t, r.children)),
            (t.flags |= 4096));
      return t;
    }
    return a
      ? (kn(),
        (d = r.fallback),
        (a = t.mode),
        (h = e.child),
        (k = h.sibling),
        (r = Qt(h, { mode: 'hidden', children: r.children })),
        (r.subtreeFlags = h.subtreeFlags & 65011712),
        k !== null ? (d = Qt(k, d)) : ((d = $n(d, a, n, null)), (d.flags |= 2)),
        (d.return = t),
        (r.return = t),
        (r.sibling = d),
        (t.child = r),
        ha(null, r),
        (r = t.child),
        (d = e.child.memoizedState),
        d === null
          ? (d = Mi(n))
          : ((a = d.cachePool),
            a !== null
              ? ((h = Re._currentValue), (a = a.parent !== h ? { parent: h, pool: h } : a))
              : (a = dc()),
            (d = { baseLanes: d.baseLanes | n, cachePool: a })),
        (r.memoizedState = d),
        (r.childLanes = Fi(e, u, n)),
        (t.memoizedState = Ui),
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
  function Bi(e, t) {
    return ((t = Es({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Es(e, t) {
    return ((e = pt(22, e, null, t)), (e.lanes = 0), e);
  }
  function $i(e, t, n) {
    return (
      Yn(t, e.child, null, n),
      (e = Bi(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function _d(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), ri(e.return, t, n));
  }
  function qi(e, t, n, r, a, s) {
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
  function Cd(e, t, n) {
    var r = t.pendingProps,
      a = r.revealOrder,
      s = r.tail;
    r = r.children;
    var u = Ee.current,
      d = (u & 2) !== 0;
    if (
      (d ? ((u = (u & 1) | 2), (t.flags |= 128)) : (u &= 1),
      P(Ee, u),
      Qe(e, t, r, n),
      (r = re ? ta : 0),
      !d && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && _d(e, n, t);
        else if (e.tag === 19) _d(e, n, t);
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
          qi(t, !1, a, n, s, r));
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
        qi(t, !0, n, null, s, r);
        break;
      case 'together':
        qi(t, !1, null, null, void 0, r);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zt(e, t, n) {
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
  function _m(e, t, n) {
    switch (t.tag) {
      case 3:
        (De(t, t.stateNode.containerInfo), mn(t, Re, e.memoizedState.cache), qn());
        break;
      case 27:
      case 5:
        Fr(t);
        break;
      case 4:
        De(t, t.stateNode.containerInfo);
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
              : (bn(t), (e = Zt(e, t, n)), e !== null ? e.sibling : null);
        bn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (
          ((r = (n & t.childLanes) !== 0),
          r || (yr(e, t, n, !1), (r = (n & t.childLanes) !== 0)),
          a)
        ) {
          if (r) return Cd(e, t, n);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null && ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          P(Ee, Ee.current),
          r)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), yd(e, t, n, t.pendingProps));
      case 24:
        mn(t, Re, e.memoizedState.cache);
    }
    return Zt(e, t, n);
  }
  function Nd(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Le = !0;
      else {
        if (!Hi(e, n) && (t.flags & 128) === 0) return ((Le = !1), _m(e, t, n));
        Le = (e.flags & 131072) !== 0;
      }
    else ((Le = !1), re && (t.flags & 1048576) !== 0 && ac(t, ta, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (((e = Qn(t.elementType)), (t.type = e), typeof e == 'function'))
            Yo(e)
              ? ((r = Jn(e, r)), (t.tag = 1), (t = wd(null, t, e, r, n)))
              : ((t.tag = 0), (t = Di(null, t, e, r, n)));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === Ce) {
                ((t.tag = 11), (t = hd(null, t, e, r, n)));
                break e;
              } else if (a === J) {
                ((t.tag = 14), (t = md(null, t, e, r, n)));
                break e;
              }
            }
            throw ((t = kt(e) || e), Error(l(306, t, '')));
          }
        }
        return t;
      case 0:
        return Di(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((r = t.type), (a = Jn(r, t.pendingProps)), wd(e, t, r, a, n));
      case 3:
        e: {
          if ((De(t, t.stateNode.containerInfo), e === null)) throw Error(l(387));
          r = t.pendingProps;
          var s = t.memoizedState;
          ((a = s.element), ci(e, t), ua(t, r, null, n));
          var u = t.memoizedState;
          if (
            ((r = u.cache),
            mn(t, Re, r),
            r !== s.cache && ai(t, [Re], n, !0),
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
              t = xd(e, t, r, n);
              break e;
            } else if (r !== a) {
              ((a = St(Error(l(424)), t)), na(a), (t = xd(e, t, r, n)));
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
                ve = Et(e.firstChild),
                  Ve = t,
                  re = !0,
                  pn = null,
                  Nt = !0,
                  n = yc(t, null, r, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((qn(), r === a)) {
              t = Zt(e, t, n);
              break e;
            }
            Qe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Ns(e, t),
          e === null
            ? (n = Uf(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : re ||
                ((n = t.type),
                (e = t.pendingProps),
                (r = qs(V.current).createElement(n)),
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
            ((r = t.stateNode = Of(t.type, t.pendingProps, V.current)),
            (Ve = t),
            (Nt = !0),
            (a = ve),
            Tn(t.type) ? ((Sl = a), (ve = Et(r.firstChild))) : (ve = a)),
          Qe(e, t, t.pendingProps.children, n),
          Ns(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            re &&
            ((a = r = ve) &&
              ((r = eg(r, t.type, t.pendingProps, Nt)),
              r !== null
                ? ((t.stateNode = r), (Ve = t), (ve = Et(r.firstChild)), (Nt = !1), (a = !0))
                : (a = !1)),
            a || hn(t)),
          Fr(t),
          (a = t.type),
          (s = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (r = s.children),
          vl(a, s) ? (r = null) : u !== null && vl(a, u) && (t.flags |= 32),
          t.memoizedState !== null && ((a = yi(e, t, mm, null, null, n)), (ja._currentValue = a)),
          Ns(e, t),
          Qe(e, t, r, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            re &&
            ((e = n = ve) &&
              ((n = tg(n, t.pendingProps, Nt)),
              n !== null ? ((t.stateNode = n), (Ve = t), (ve = null), (e = !0)) : (e = !1)),
            e || hn(t)),
          null
        );
      case 13:
        return Sd(e, t, n);
      case 4:
        return (
          De(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Yn(t, null, r, n)) : Qe(e, t, r, n),
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
          Vn(t),
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
        return Cd(e, t, n);
      case 31:
        return Sm(e, t, n);
      case 22:
        return yd(e, t, n, t.pendingProps);
      case 24:
        return (
          Vn(t),
          (r = We(Re)),
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
              mn(t, Re, a))
            : ((e.lanes & n) !== 0 && (ci(e, t), ua(t, null, null, n), la()),
              (a = e.memoizedState),
              (s = t.memoizedState),
              a.parent !== r
                ? ((a = { parent: r, cache: r }),
                  (t.memoizedState = a),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a),
                  mn(t, Re, r))
                : ((r = s.cache), mn(t, Re, r), r !== a.cache && ai(t, [Re], n, !0))),
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
  function Vi(e, t, n, r, a) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (a & 335544128) === a))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Zd()) e.flags |= 8192;
        else throw ((Kn = ds), li);
    } else e.flags &= -16777217;
  }
  function Ed(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !qf(t)))
      if (Zd()) e.flags |= 8192;
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
  function Cm(e, t, n) {
    var r = t.pendingProps;
    switch ((Zo(t), t.tag)) {
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
          Xt(Re),
          Ne(),
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
            ? (en(t), s !== null ? (be(t), Ed(t, s)) : (be(t), Vi(t, a, null, r, n)))
            : s
              ? s !== e.memoizedState
                ? (en(t), be(t), Ed(t, s))
                : (be(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== r && en(t), be(t), Vi(t, a, e, r, n)),
          null
        );
      case 27:
        if ((Ma(t), (n = V.current), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(l(166));
            return (be(t), null);
          }
          ((e = L.current), gr(t) ? oc(t) : ((e = Of(a, r, n)), (t.stateNode = e), en(t)));
        }
        return (be(t), null);
      case 5:
        if ((Ma(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== r && en(t);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(l(166));
            return (be(t), null);
          }
          if (((s = L.current), gr(t))) oc(t);
          else {
            var u = qs(V.current);
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
        return (be(t), Vi(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== r && en(t);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(l(166));
          if (((e = V.current), gr(t))) {
            if (((e = t.stateNode), (n = t.memoizedProps), (r = null), (a = Ve), a !== null))
              switch (a.tag) {
                case 27:
                case 5:
                  r = a.memoizedProps;
              }
            ((e[He] = t),
              (e = !!(
                e.nodeValue === n ||
                (r !== null && r.suppressHydrationWarning === !0) ||
                _f(e.nodeValue, n)
              )),
              e || hn(t, !0));
          } else ((e = qs(e).createTextNode(r)), (e[He] = t), (t.stateNode = e));
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
            } else (qn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
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
            } else (qn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
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
        return (Ne(), e === null && pl(t.stateNode.containerInfo), be(t), null);
      case 10:
        return (Xt(t.type), be(t), null);
      case 19:
        if ((y(Ee), (r = t.memoizedState), r === null)) return (be(t), null);
        if (((a = (t.flags & 128) !== 0), (s = r.rendering), s === null))
          if (a) ma(r, !1);
          else {
            if (_e !== 0 || (e !== null && (e.flags & 128) !== 0))
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
                  return (P(Ee, (Ee.current & 1) | 2), re && Kt(t, r.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            r.tail !== null &&
              ut() > Ls &&
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
              2 * ut() - r.renderingStartTime > Ls &&
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
            (n = Ee.current),
            P(Ee, a ? (n & 1) | 2 : n & 1),
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
          Xt(Re),
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
  function Nm(e, t) {
    switch ((Zo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Xt(Re),
          Ne(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ma(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((mt(t), t.alternate === null)) throw Error(l(340));
          qn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((mt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(l(340));
          qn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (y(Ee), null);
      case 4:
        return (Ne(), null);
      case 10:
        return (Xt(t.type), null);
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
        return (Xt(Re), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Td(e, t) {
    switch ((Zo(t), t.tag)) {
      case 3:
        (Xt(Re), Ne());
        break;
      case 26:
      case 27:
      case 5:
        Ma(t);
        break;
      case 4:
        Ne();
        break;
      case 31:
        t.memoizedState !== null && mt(t);
        break;
      case 13:
        mt(t);
        break;
      case 19:
        y(Ee);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        (mt(t), hi(), e !== null && y(Wn));
        break;
      case 24:
        Xt(Re);
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
      pe(t, t.return, d);
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
              var h = n,
                k = d;
              try {
                k();
              } catch (N) {
                pe(a, h, N);
              }
            }
          }
          r = r.next;
        } while (r !== s);
      }
    } catch (N) {
      pe(t, t.return, N);
    }
  }
  function jd(e) {
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
  function Pd(e, t, n) {
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
  function Mt(e, t) {
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
  function Rd(e) {
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
  function zd(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Tn(e.type)) || e.tag === 4
    );
  }
  function Qi(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || zd(e.return)) return null;
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
            n != null || t.onclick !== null || (t.onclick = Vt)));
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
  function Ld(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var r = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
      (Ke(t, r, n), (t[He] = e), (t[tt] = n));
    } catch (s) {
      pe(e, e.return, s);
    }
  }
  var tn = !1,
    Ae = !1,
    Yi = !1,
    Ad = typeof WeakSet == 'function' ? WeakSet : Set,
    Be = null;
  function Em(e, t) {
    if (((e = e.containerInfo), (gl = Xs), (e = Wu(e)), $o(e))) {
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
              h = -1,
              k = 0,
              N = 0,
              j = e,
              x = null;
            t: for (;;) {
              for (
                var _;
                j !== n || (a !== 0 && j.nodeType !== 3) || (d = u + a),
                  j !== s || (r !== 0 && j.nodeType !== 3) || (h = u + r),
                  j.nodeType === 3 && (u += j.nodeValue.length),
                  (_ = j.firstChild) !== null;

              )
                ((x = j), (j = _));
              for (;;) {
                if (j === e) break t;
                if (
                  (x === n && ++k === a && (d = u),
                  x === s && ++N === r && (h = u),
                  (_ = j.nextSibling) !== null)
                )
                  break;
                ((j = x), (x = j.parentNode));
              }
              j = _;
            }
            n = d === -1 || h === -1 ? null : { start: d, end: h };
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
                  pe(n, n.return, W);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)) kl(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      kl(e);
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
  function Od(e, t, n) {
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
            pe(n, n.return, u);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Ld(n);
      case 26:
      case 5:
        (rn(e, n), t === null && r & 4 && Rd(n), r & 512 && ya(n, n.return));
        break;
      case 12:
        rn(e, n);
        break;
      case 31:
        (rn(e, n), r & 4 && Ud(e, n));
        break;
      case 13:
        (rn(e, n),
          r & 4 && Md(e, n),
          r & 64 &&
            ((e = n.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((n = Im.bind(null, n)), ng(e, n)))));
        break;
      case 22:
        if (((r = n.memoizedState !== null || tn), !r)) {
          ((t = (t !== null && t.memoizedState !== null) || Ae), (a = tn));
          var s = Ae;
          ((tn = r),
            (Ae = t) && !s ? an(e, n, (n.subtreeFlags & 8772) !== 0) : rn(e, n),
            (tn = a),
            (Ae = s));
        }
        break;
      case 30:
        break;
      default:
        rn(e, n);
    }
  }
  function Id(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Id(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Co(t)),
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
    for (n = n.child; n !== null; ) (Dd(e, t, n), (n = n.sibling));
  }
  function Dd(e, t, n) {
    if (ct && typeof ct.onCommitFiberUnmount == 'function')
      try {
        ct.onCommitFiberUnmount(Br, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (Ae || Mt(n, t),
          nn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        Ae || Mt(n, t);
        var r = we,
          a = rt;
        (Tn(n.type) && ((we = n.stateNode), (rt = !1)),
          nn(e, t, n),
          Na(n.stateNode),
          (we = r),
          (rt = a));
        break;
      case 5:
        Ae || Mt(n, t);
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
              pe(n, t, s);
            }
          else
            try {
              we.removeChild(n.stateNode);
            } catch (s) {
              pe(n, t, s);
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
              Dr(e))
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
        (wn(2, n, t), Ae || wn(4, n, t), nn(e, t, n));
        break;
      case 1:
        (Ae ||
          (Mt(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function' && Pd(n, t, r)),
          nn(e, t, n));
        break;
      case 21:
        nn(e, t, n);
        break;
      case 22:
        ((Ae = (r = Ae) || n.memoizedState !== null), nn(e, t, n), (Ae = r));
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
        Dr(e);
      } catch (n) {
        pe(t, t.return, n);
      }
    }
  }
  function Md(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Dr(e);
      } catch (n) {
        pe(t, t.return, n);
      }
  }
  function Tm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Ad()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Ad()),
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
        var a = Dm.bind(null, e, r);
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
        (Dd(s, u, a),
          (we = null),
          (rt = !1),
          (s = a.alternate),
          s !== null && (s.return = null),
          (a.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Fd(t, e), (t = t.sibling));
  }
  var At = null;
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
          r & 512 && (Ae || n === null || Mt(n, n.return)),
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
        var a = At;
        if ((at(t, e), st(e), r & 512 && (Ae || n === null || Mt(n, n.return)), r & 4)) {
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
              } else $f(a, e.type, e.stateNode);
            else e.stateNode = Ff(a, r, e.memoizedProps);
          else
            s !== r
              ? (s === null
                  ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                  : s.count--,
                r === null ? $f(a, e.type, e.stateNode) : Ff(a, r, e.memoizedProps))
              : r === null && e.stateNode !== null && Wi(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (at(t, e),
          st(e),
          r & 512 && (Ae || n === null || Mt(n, n.return)),
          n !== null && r & 4 && Wi(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if ((at(t, e), st(e), r & 512 && (Ae || n === null || Mt(n, n.return)), e.flags & 32)) {
          a = e.stateNode;
          try {
            or(a, '');
          } catch (U) {
            pe(e, e.return, U);
          }
        }
        (r & 4 &&
          e.stateNode != null &&
          ((a = e.memoizedProps), Wi(e, a, n !== null ? n.memoizedProps : a)),
          r & 1024 && (Yi = !0));
        break;
      case 6:
        if ((at(t, e), st(e), r & 4)) {
          if (e.stateNode === null) throw Error(l(162));
          ((r = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = r;
          } catch (U) {
            pe(e, e.return, U);
          }
        }
        break;
      case 3:
        if (
          ((Ws = null),
          (a = At),
          (At = Hs(t.containerInfo)),
          at(t, e),
          (At = a),
          st(e),
          r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Dr(t.containerInfo);
          } catch (U) {
            pe(e, e.return, U);
          }
        Yi && ((Yi = !1), Bd(e));
        break;
      case 4:
        ((r = At), (At = Hs(e.stateNode.containerInfo)), at(t, e), st(e), (At = r));
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
            (zs = ut()),
          r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), Ps(e, r))));
        break;
      case 22:
        a = e.memoizedState !== null;
        var h = n !== null && n.memoizedState !== null,
          k = tn,
          N = Ae;
        if (((tn = k || a), (Ae = N || h), at(t, e), (Ae = N), (tn = k), st(e), r & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = a ? t._visibility & -2 : t._visibility | 1,
              a && (n === null || h || tn || Ae || Gn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                h = n = t;
                try {
                  if (((s = h.stateNode), a))
                    ((u = s.style),
                      typeof u.setProperty == 'function'
                        ? u.setProperty('display', 'none', 'important')
                        : (u.display = 'none'));
                  else {
                    d = h.stateNode;
                    var j = h.memoizedProps.style,
                      x = j != null && j.hasOwnProperty('display') ? j.display : null;
                    d.style.display = x == null || typeof x == 'boolean' ? '' : ('' + x).trim();
                  }
                } catch (U) {
                  pe(h, h.return, U);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                h = t;
                try {
                  h.stateNode.nodeValue = a ? '' : h.memoizedProps;
                } catch (U) {
                  pe(h, h.return, U);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                h = t;
                try {
                  var _ = h.stateNode;
                  a ? Rf(_, !0) : Rf(h.stateNode, !1);
                } catch (U) {
                  pe(h, h.return, U);
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
          if (zd(r)) {
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
            var h = n.stateNode.containerInfo,
              k = Qi(e);
            Ki(e, k, h);
            break;
          default:
            throw Error(l(161));
        }
      } catch (N) {
        pe(e, e.return, N);
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
      for (t = t.child; t !== null; ) (Od(e, t.alternate, t), (t = t.sibling));
  }
  function Gn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (wn(4, t, t.return), Gn(t));
          break;
        case 1:
          Mt(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == 'function' && Pd(t, t.return, n), Gn(t));
          break;
        case 27:
          Na(t.stateNode);
        case 26:
        case 5:
          (Mt(t, t.return), Gn(t));
          break;
        case 22:
          t.memoizedState === null && Gn(t);
          break;
        case 30:
          Gn(t);
          break;
        default:
          Gn(t);
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
            } catch (k) {
              pe(r, r.return, k);
            }
          if (((r = s), (a = r.updateQueue), a !== null)) {
            var d = r.stateNode;
            try {
              var h = a.shared.hiddenCallbacks;
              if (h !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < h.length; a++) vc(h[a], d);
            } catch (k) {
              pe(r, r.return, k);
            }
          }
          (n && u & 64 && jd(s), ya(s, s.return));
          break;
        case 27:
          Ld(s);
        case 26:
        case 5:
          (an(a, s, n), n && r === null && u & 4 && Rd(s), ya(s, s.return));
          break;
        case 12:
          an(a, s, n);
          break;
        case 31:
          (an(a, s, n), n && u & 4 && Ud(a, s));
          break;
        case 13:
          (an(a, s, n), n && u & 4 && Md(a, s));
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
  function Ot(e, t, n, r) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) ($d(e, t, n, r), (t = t.sibling));
  }
  function $d(e, t, n, r) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ot(e, t, n, r), a & 2048 && ga(9, t));
        break;
      case 1:
        Ot(e, t, n, r);
        break;
      case 3:
        (Ot(e, t, n, r),
          a & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ra(e))));
        break;
      case 12:
        if (a & 2048) {
          (Ot(e, t, n, r), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              u = s.id,
              d = s.onPostCommit;
            typeof d == 'function' &&
              d(u, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (h) {
            pe(t, t.return, h);
          }
        } else Ot(e, t, n, r);
        break;
      case 31:
        Ot(e, t, n, r);
        break;
      case 13:
        Ot(e, t, n, r);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (u = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? Ot(e, t, n, r)
              : va(e, t)
            : s._visibility & 2
              ? Ot(e, t, n, r)
              : ((s._visibility |= 2), Nr(e, t, n, r, (t.subtreeFlags & 10256) !== 0 || !1)),
          a & 2048 && Xi(u, t));
        break;
      case 24:
        (Ot(e, t, n, r), a & 2048 && Ji(t.alternate, t));
        break;
      default:
        Ot(e, t, n, r);
    }
  }
  function Nr(e, t, n, r, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e,
        u = t,
        d = n,
        h = r,
        k = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Nr(s, u, d, h, a), ga(8, u));
          break;
        case 23:
          break;
        case 22:
          var N = u.stateNode;
          (u.memoizedState !== null
            ? N._visibility & 2
              ? Nr(s, u, d, h, a)
              : va(s, u)
            : ((N._visibility |= 2), Nr(s, u, d, h, a)),
            a && k & 2048 && Xi(u.alternate, u));
          break;
        case 24:
          (Nr(s, u, d, h, a), a && k & 2048 && Ji(u.alternate, u));
          break;
        default:
          Nr(s, u, d, h, a);
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
  function Er(e, t, n) {
    if (e.subtreeFlags & ba) for (e = e.child; e !== null; ) (qd(e, t, n), (e = e.sibling));
  }
  function qd(e, t, n) {
    switch (e.tag) {
      case 26:
        (Er(e, t, n),
          e.flags & ba && e.memoizedState !== null && hg(n, At, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Er(e, t, n);
        break;
      case 3:
      case 4:
        var r = At;
        ((At = Hs(e.stateNode.containerInfo)), Er(e, t, n), (At = r));
        break;
      case 22:
        e.memoizedState === null &&
          ((r = e.alternate),
          r !== null && r.memoizedState !== null
            ? ((r = ba), (ba = 16777216), Er(e, t, n), (ba = r))
            : Er(e, t, n));
        break;
      default:
        Er(e, t, n);
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
  function ka(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          ((Be = r), Wd(r, e));
        }
      Hd(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Vd(e), (e = e.sibling));
  }
  function Vd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ka(e), e.flags & 2048 && wn(9, e, e.return));
        break;
      case 3:
        ka(e);
        break;
      case 12:
        ka(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Rs(e))
          : ka(e);
        break;
      default:
        ka(e);
    }
  }
  function Rs(e) {
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
          (wn(8, t, t.return), Rs(t));
          break;
        case 22:
          ((n = t.stateNode), n._visibility & 2 && ((n._visibility &= -3), Rs(t)));
          break;
        default:
          Rs(t);
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
          if ((Id(r), r === n)) {
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
        var t = We(Re),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return We(Re).controller.signal;
      },
    },
    Pm = typeof WeakMap == 'function' ? WeakMap : Map,
    ue = 0,
    ye = null,
    Z = null,
    te = 0,
    fe = 0,
    gt = null,
    xn = !1,
    Tr = !1,
    Gi = !1,
    sn = 0,
    _e = 0,
    Sn = 0,
    Zn = 0,
    Zi = 0,
    yt = 0,
    jr = 0,
    wa = null,
    ot = null,
    el = !1,
    zs = 0,
    Qd = 0,
    Ls = 1 / 0,
    As = null,
    _n = null,
    Ue = 0,
    Cn = null,
    Pr = null,
    on = 0,
    tl = 0,
    nl = null,
    Kd = null,
    xa = 0,
    rl = null;
  function vt() {
    return (ue & 2) !== 0 && te !== 0 ? te & -te : E.T !== null ? ul() : cu();
  }
  function Yd() {
    if (yt === 0)
      if ((te & 536870912) === 0 || re) {
        var e = $a;
        (($a <<= 1), ($a & 3932160) === 0 && ($a = 262144), (yt = e));
      } else yt = 536870912;
    return ((e = ht.current), e !== null && (e.flags |= 32), yt);
  }
  function it(e, t, n) {
    (((e === ye && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null) &&
      (Rr(e, 0), Nn(e, te, yt, !1)),
      qr(e, n),
      ((ue & 2) === 0 || e !== ye) &&
        (e === ye && ((ue & 2) === 0 && (Zn |= n), _e === 4 && Nn(e, te, yt, !1)), Ft(e)));
  }
  function Xd(e, t, n) {
    if ((ue & 6) !== 0) throw Error(l(327));
    var r = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || $r(e, t),
      a = r ? Lm(e, t) : sl(e, t, !0),
      s = r;
    do {
      if (a === 0) {
        Tr && !r && Nn(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), s && !Rm(n))) {
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
              var h = d.current.memoizedState.isDehydrated;
              if ((h && (Rr(d, u).flags |= 256), (u = sl(d, u, !1)), u !== 2)) {
                if (Gi && !h) {
                  ((d.errorRecoveryDisabledLanes |= s), (Zn |= s), (a = 4));
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
          (Rr(e, 0), Nn(e, t, 0, !0));
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
              Nn(r, t, yt, !xn);
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
          if ((t & 62914560) === t && ((a = zs + 300 - ut()), 10 < a)) {
            if ((Nn(r, t, yt, !xn), Ha(r, 0, !0) !== 0)) break e;
            ((on = t),
              (r.timeoutHandle = Tf(
                Jd.bind(null, r, n, ot, As, el, t, yt, Zn, jr, xn, s, 'Throttled', -0, 0),
                a
              )));
            break e;
          }
          Jd(r, n, ot, As, el, t, yt, Zn, jr, xn, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ft(e);
  }
  function Jd(e, t, n, r, a, s, u, d, h, k, N, j, x, _) {
    if (((e.timeoutHandle = -1), (j = t.subtreeFlags), j & 8192 || (j & 16785408) === 16785408)) {
      ((j = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Vt,
      }),
        qd(t, s, j));
      var U = (s & 62914560) === s ? zs - ut() : (s & 4194048) === s ? Qd - ut() : 0;
      if (((U = mg(j, U)), U !== null)) {
        ((on = s),
          (e.cancelPendingCommit = U(sf.bind(null, e, t, s, n, r, a, u, d, h, N, j, null, x, _))),
          Nn(e, s, u, !k));
        return;
      }
    }
    sf(e, t, s, n, r, a, u, d, h);
  }
  function Rm(e) {
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
  function Nn(e, t, n, r) {
    ((t &= ~Zi),
      (t &= ~Zn),
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
  function Os() {
    return (ue & 6) === 0 ? (Sa(0), !1) : !0;
  }
  function al() {
    if (Z !== null) {
      if (fe === 0) var e = Z.return;
      else ((e = Z), (Yt = Hn = null), ki(e), (wr = null), (sa = 0), (e = Z));
      for (; e !== null; ) (Td(e.alternate, e), (e = e.return));
      Z = null;
    }
  }
  function Rr(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), Jm(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (on = 0),
      al(),
      (ye = e),
      (Z = n = Qt(e.current, null)),
      (te = t),
      (fe = 0),
      (gt = null),
      (xn = !1),
      (Tr = $r(e, t)),
      (Gi = !1),
      (jr = yt = Zi = Zn = Sn = _e = 0),
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
  function Gd(e, t) {
    ((Y = null),
      (E.H = pa),
      t === kr || t === cs
        ? ((t = hc()), (fe = 3))
        : t === li
          ? ((t = hc()), (fe = 4))
          : (fe =
              t === Ii
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (gt = t),
      Z === null && ((_e = 1), _s(e, St(t, e.current))));
  }
  function Zd() {
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
    var e = E.H;
    return ((E.H = pa), e === null ? pa : e);
  }
  function tf() {
    var e = E.A;
    return ((E.A = jm), e);
  }
  function Is() {
    ((_e = 4),
      xn || ((te & 4194048) !== te && ht.current !== null) || (Tr = !0),
      ((Sn & 134217727) === 0 && (Zn & 134217727) === 0) || ye === null || Nn(ye, te, yt, !1));
  }
  function sl(e, t, n) {
    var r = ue;
    ue |= 2;
    var a = ef(),
      s = tf();
    ((ye !== e || te !== t) && ((As = null), Rr(e, t)), (t = !1));
    var u = _e;
    e: do
      try {
        if (fe !== 0 && Z !== null) {
          var d = Z,
            h = gt;
          switch (fe) {
            case 8:
              (al(), (u = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ht.current === null && (t = !0);
              var k = fe;
              if (((fe = 0), (gt = null), zr(e, d, h, k), n && Tr)) {
                u = 0;
                break e;
              }
              break;
            default:
              ((k = fe), (fe = 0), (gt = null), zr(e, d, h, k));
          }
        }
        (zm(), (u = _e));
        break;
      } catch (N) {
        Gd(e, N);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Yt = Hn = null),
      (ue = r),
      (E.H = a),
      (E.A = s),
      Z === null && ((ye = null), (te = 0), ns()),
      u
    );
  }
  function zm() {
    for (; Z !== null; ) nf(Z);
  }
  function Lm(e, t) {
    var n = ue;
    ue |= 2;
    var r = ef(),
      a = tf();
    ye !== e || te !== t ? ((As = null), (Ls = ut() + 500), Rr(e, t)) : (Tr = $r(e, t));
    e: do
      try {
        if (fe !== 0 && Z !== null) {
          t = Z;
          var s = gt;
          t: switch (fe) {
            case 1:
              ((fe = 0), (gt = null), zr(e, t, s, 1));
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
              fc(s) ? ((fe = 0), (gt = null), rf(t)) : ((fe = 0), (gt = null), zr(e, t, s, 7));
              break;
            case 5:
              var u = null;
              switch (Z.tag) {
                case 26:
                  u = Z.memoizedState;
                case 5:
                case 27:
                  var d = Z;
                  if (u ? qf(u) : d.stateNode.complete) {
                    ((fe = 0), (gt = null));
                    var h = d.sibling;
                    if (h !== null) Z = h;
                    else {
                      var k = d.return;
                      k !== null ? ((Z = k), Ds(k)) : (Z = null);
                    }
                    break t;
                  }
              }
              ((fe = 0), (gt = null), zr(e, t, s, 5));
              break;
            case 6:
              ((fe = 0), (gt = null), zr(e, t, s, 6));
              break;
            case 8:
              (al(), (_e = 6));
              break e;
            default:
              throw Error(l(462));
          }
        }
        Am();
        break;
      } catch (N) {
        Gd(e, N);
      }
    while (!0);
    return (
      (Yt = Hn = null),
      (E.H = r),
      (E.A = a),
      (ue = n),
      Z !== null ? 0 : ((ye = null), (te = 0), ns(), _e)
    );
  }
  function Am() {
    for (; Z !== null && !rh(); ) nf(Z);
  }
  function nf(e) {
    var t = Nd(e.alternate, e, sn);
    ((e.memoizedProps = e.pendingProps), t === null ? Ds(e) : (Z = t));
  }
  function rf(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = kd(n, t, t.pendingProps, t.type, void 0, te);
        break;
      case 11:
        t = kd(n, t, t.pendingProps, t.type.render, t.ref, te);
        break;
      case 5:
        ki(t);
      default:
        (Td(n, t), (t = Z = tc(t, sn)), (t = Nd(n, t, sn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ds(e) : (Z = t));
  }
  function zr(e, t, n, r) {
    ((Yt = Hn = null), ki(t), (wr = null), (sa = 0));
    var a = t.return;
    try {
      if (xm(e, a, t, n, te)) {
        ((_e = 1), _s(e, St(n, e.current)), (Z = null));
        return;
      }
    } catch (s) {
      if (a !== null) throw ((Z = a), s);
      ((_e = 1), _s(e, St(n, e.current)), (Z = null));
      return;
    }
    t.flags & 32768
      ? (re || r === 1
          ? (e = !0)
          : Tr || (te & 536870912) !== 0
            ? (e = !1)
            : ((xn = e = !0),
              (r === 2 || r === 9 || r === 3 || r === 6) &&
                ((r = ht.current), r !== null && r.tag === 13 && (r.flags |= 16384))),
        af(t, e))
      : Ds(t);
  }
  function Ds(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        af(t, xn);
        return;
      }
      e = t.return;
      var n = Cm(t.alternate, t, sn);
      if (n !== null) {
        Z = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Z = t;
        return;
      }
      Z = t = e;
    } while (t !== null);
    _e === 0 && (_e = 5);
  }
  function af(e, t) {
    do {
      var n = Nm(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (Z = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Z = e;
        return;
      }
      Z = e = n;
    } while (e !== null);
    ((_e = 6), (Z = null));
  }
  function sf(e, t, n, r, a, s, u, d, h) {
    e.cancelPendingCommit = null;
    do Us();
    while (Ue !== 0);
    if ((ue & 6) !== 0) throw Error(l(327));
    if (t !== null) {
      if (t === e.current) throw Error(l(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= Qo),
        ph(e, n, s, u, d, h),
        e === ye && ((Z = ye = null), (te = 0)),
        (Pr = t),
        (Cn = e),
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
        ((r = E.T), (E.T = null), (a = O.p), (O.p = 2), (u = ue), (ue |= 4));
        try {
          Em(e, t, n);
        } finally {
          ((ue = u), (O.p = a), (E.T = r));
        }
      }
      ((Ue = 1), of(), lf(), uf());
    }
  }
  function of() {
    if (Ue === 1) {
      Ue = 0;
      var e = Cn,
        t = Pr,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = E.T), (E.T = null));
        var r = O.p;
        O.p = 2;
        var a = ue;
        ue |= 4;
        try {
          Fd(t, e);
          var s = yl,
            u = Wu(e.containerInfo),
            d = s.focusedElem,
            h = s.selectionRange;
          if (u !== d && d && d.ownerDocument && Vu(d.ownerDocument.documentElement, d)) {
            if (h !== null && $o(d)) {
              var k = h.start,
                N = h.end;
              if ((N === void 0 && (N = k), 'selectionStart' in d))
                ((d.selectionStart = k), (d.selectionEnd = Math.min(N, d.value.length)));
              else {
                var j = d.ownerDocument || document,
                  x = (j && j.defaultView) || window;
                if (x.getSelection) {
                  var _ = x.getSelection(),
                    U = d.textContent.length,
                    W = Math.min(h.start, U),
                    ge = h.end === void 0 ? W : Math.min(h.end, U);
                  !_.extend && W > ge && ((u = ge), (ge = W), (W = u));
                  var v = Hu(d, W),
                    g = Hu(d, ge);
                  if (
                    v &&
                    g &&
                    (_.rangeCount !== 1 ||
                      _.anchorNode !== v.node ||
                      _.anchorOffset !== v.offset ||
                      _.focusNode !== g.node ||
                      _.focusOffset !== g.offset)
                  ) {
                    var b = j.createRange();
                    (b.setStart(v.node, v.offset),
                      _.removeAllRanges(),
                      W > ge
                        ? (_.addRange(b), _.extend(g.node, g.offset))
                        : (b.setEnd(g.node, g.offset), _.addRange(b)));
                  }
                }
              }
            }
            for (j = [], _ = d; (_ = _.parentNode); )
              _.nodeType === 1 && j.push({ element: _, left: _.scrollLeft, top: _.scrollTop });
            for (typeof d.focus == 'function' && d.focus(), d = 0; d < j.length; d++) {
              var T = j[d];
              ((T.element.scrollLeft = T.left), (T.element.scrollTop = T.top));
            }
          }
          ((Xs = !!gl), (yl = gl = null));
        } finally {
          ((ue = a), (O.p = r), (E.T = n));
        }
      }
      ((e.current = t), (Ue = 2));
    }
  }
  function lf() {
    if (Ue === 2) {
      Ue = 0;
      var e = Cn,
        t = Pr,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = E.T), (E.T = null));
        var r = O.p;
        O.p = 2;
        var a = ue;
        ue |= 4;
        try {
          Od(e, t.alternate, t);
        } finally {
          ((ue = a), (O.p = r), (E.T = n));
        }
      }
      Ue = 3;
    }
  }
  function uf() {
    if (Ue === 4 || Ue === 3) {
      ((Ue = 0), ah());
      var e = Cn,
        t = Pr,
        n = on,
        r = Kd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ue = 5)
        : ((Ue = 0), (Pr = Cn = null), cf(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (
        (a === 0 && (_n = null),
        So(n),
        (t = t.stateNode),
        ct && typeof ct.onCommitFiberRoot == 'function')
      )
        try {
          ct.onCommitFiberRoot(Br, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (r !== null) {
        ((t = E.T), (a = O.p), (O.p = 2), (E.T = null));
        try {
          for (var s = e.onRecoverableError, u = 0; u < r.length; u++) {
            var d = r[u];
            s(d.value, { componentStack: d.stack });
          }
        } finally {
          ((E.T = t), (O.p = a));
        }
      }
      ((on & 3) !== 0 && Us(),
        Ft(e),
        (a = e.pendingLanes),
        (n & 261930) !== 0 && (a & 42) !== 0 ? (e === rl ? xa++ : ((xa = 0), (rl = e))) : (xa = 0),
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
    var e = Cn,
      t = tl;
    tl = 0;
    var n = So(on),
      r = E.T,
      a = O.p;
    try {
      ((O.p = 32 > n ? 32 : n), (E.T = null), (n = nl), (nl = null));
      var s = Cn,
        u = on;
      if (((Ue = 0), (Pr = Cn = null), (on = 0), (ue & 6) !== 0)) throw Error(l(331));
      var d = ue;
      if (
        ((ue |= 4),
        Vd(s.current),
        $d(s, s.current, u, n),
        (ue = d),
        Sa(0, !1),
        ct && typeof ct.onPostCommitFiberRoot == 'function')
      )
        try {
          ct.onPostCommitFiberRoot(Br, s);
        } catch {}
      return !0;
    } finally {
      ((O.p = a), (E.T = r), cf(e, t));
    }
  }
  function ff(e, t, n) {
    ((t = St(n, t)),
      (t = Oi(e.stateNode, t, 2)),
      (e = vn(e, t, 2)),
      e !== null && (qr(e, 2), Ft(e)));
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
            (typeof r.componentDidCatch == 'function' && (_n === null || !_n.has(r)))
          ) {
            ((e = St(n, e)),
              (n = fd(2)),
              (r = vn(t, n, 2)),
              r !== null && (pd(n, r, t, e), qr(r, 2), Ft(r)));
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
    a.has(n) || ((Gi = !0), a.add(n), (e = Om.bind(null, e, t, n)), t.then(e, e));
  }
  function Om(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      ye === e &&
        (te & n) === n &&
        (_e === 4 || (_e === 3 && (te & 62914560) === te && 300 > ut() - zs)
          ? (ue & 2) === 0 && Rr(e, 0)
          : (Zi |= n),
        jr === te && (jr = 0)),
      Ft(e));
  }
  function pf(e, t) {
    (t === 0 && (t = ou()), (e = Bn(e, t)), e !== null && (qr(e, t), Ft(e)));
  }
  function Im(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), pf(e, n));
  }
  function Dm(e, t) {
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
    (r !== null && r.delete(t), pf(e, n));
  }
  function Um(e, t) {
    return bo(e, t);
  }
  var Ms = null,
    Lr = null,
    il = !1,
    Fs = !1,
    ll = !1,
    En = 0;
  function Ft(e) {
    (e !== Lr && e.next === null && (Lr === null ? (Ms = Lr = e) : (Lr = Lr.next = e)),
      (Fs = !0),
      il || ((il = !0), Fm()));
  }
  function Sa(e, t) {
    if (!ll && Fs) {
      ll = !0;
      do
        for (var n = !1, r = Ms; r !== null; ) {
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
              (s & 3) === 0 || $r(r, s) || ((n = !0), yf(r, s)));
          r = r.next;
        }
      while (n);
      ll = !1;
    }
  }
  function Mm() {
    hf();
  }
  function hf() {
    Fs = il = !1;
    var e = 0;
    En !== 0 && Xm() && (e = En);
    for (var t = ut(), n = null, r = Ms; r !== null; ) {
      var a = r.next,
        s = mf(r, t);
      (s === 0
        ? ((r.next = null), n === null ? (Ms = a) : (n.next = a), a === null && (Lr = n))
        : ((n = r), (e !== 0 || (s & 3) !== 0) && (Fs = !0)),
        (r = a));
    }
    ((Ue !== 0 && Ue !== 5) || Sa(e), En !== 0 && (En = 0));
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
        h = a[u];
      (h === -1
        ? ((d & n) === 0 || (d & r) !== 0) && (a[u] = fh(d, t))
        : h <= t && (e.expiredLanes |= d),
        (s &= ~d));
    }
    if (
      ((t = ye),
      (n = te),
      (n = Ha(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (r = e.callbackNode),
      n === 0 || (e === t && (fe === 2 || fe === 9)) || e.cancelPendingCommit !== null)
    )
      return (r !== null && r !== null && ko(r), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((n & 3) === 0 || $r(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((r !== null && ko(r), So(n))) {
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
      r !== null && r !== null && ko(r),
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
    Gm(function () {
      (ue & 6) !== 0 ? bo(ru, Mm) : hf();
    });
  }
  function ul() {
    if (En === 0) {
      var e = vr;
      (e === 0 && ((e = Ba), (Ba <<= 1), (Ba & 261888) === 0 && (Ba = 256)), (En = e));
    }
    return En;
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
      var d = new Ga('action', 'action', null, r, a);
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (r.defaultPrevented) {
                if (En !== 0) {
                  var h = u ? bf(a, u) : new FormData(a);
                  ji(n, { pending: !0, data: h, method: a.method, action: s }, null, h);
                }
              } else
                typeof s == 'function' &&
                  (d.preventDefault(),
                  (h = u ? bf(a, u) : new FormData(a)),
                  ji(n, { pending: !0, data: h, method: a.method, action: s }, s, h));
            },
            currentTarget: a,
          },
        ],
      });
    }
  }
  for (var cl = 0; cl < Wo.length; cl++) {
    var dl = Wo[cl],
      $m = dl.toLowerCase(),
      qm = dl[0].toUpperCase() + dl.slice(1);
    zt($m, 'on' + qm);
  }
  (zt(Yu, 'onAnimationEnd'),
    zt(Xu, 'onAnimationIteration'),
    zt(Ju, 'onAnimationStart'),
    zt('dblclick', 'onDoubleClick'),
    zt('focusin', 'onFocus'),
    zt('focusout', 'onBlur'),
    zt(sm, 'onTransitionRun'),
    zt(om, 'onTransitionStart'),
    zt(im, 'onTransitionCancel'),
    zt(Gu, 'onTransitionEnd'),
    ar('onMouseEnter', ['mouseout', 'mouseover']),
    ar('onMouseLeave', ['mouseout', 'mouseover']),
    ar('onPointerEnter', ['pointerout', 'pointerover']),
    ar('onPointerLeave', ['pointerout', 'pointerover']),
    Dn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Dn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Dn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Dn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Dn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Dn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var _a =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Hm = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(_a)
    );
  function kf(e, t) {
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
              h = d.instance,
              k = d.currentTarget;
            if (((d = d.listener), h !== s && a.isPropagationStopped())) break e;
            ((s = d), (a.currentTarget = k));
            try {
              s(a);
            } catch (N) {
              ts(N);
            }
            ((a.currentTarget = null), (s = h));
          }
        else
          for (u = 0; u < r.length; u++) {
            if (
              ((d = r[u]),
              (h = d.instance),
              (k = d.currentTarget),
              (d = d.listener),
              h !== s && a.isPropagationStopped())
            )
              break e;
            ((s = d), (a.currentTarget = k));
            try {
              s(a);
            } catch (N) {
              ts(N);
            }
            ((a.currentTarget = null), (s = h));
          }
      }
    }
  }
  function ee(e, t) {
    var n = t[_o];
    n === void 0 && (n = t[_o] = new Set());
    var r = e + '__bubble';
    n.has(r) || (wf(t, e, 2, !1), n.add(r));
  }
  function fl(e, t, n) {
    var r = 0;
    (t && (r |= 4), wf(n, e, r, t));
  }
  var Bs = '_reactListening' + Math.random().toString(36).slice(2);
  function pl(e) {
    if (!e[Bs]) {
      ((e[Bs] = !0),
        pu.forEach(function (n) {
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
      !Lo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (a = !0),
      r
        ? a !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : a !== void 0
          ? e.addEventListener(t, n, { passive: a })
          : e.addEventListener(t, n, !1));
  }
  function hl(e, t, n, r, a) {
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
              var h = u.tag;
              if ((h === 3 || h === 4) && u.stateNode.containerInfo === a) return;
              u = u.return;
            }
          for (; d !== null; ) {
            if (((u = tr(d)), u === null)) return;
            if (((h = u.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
              r = s = u;
              continue e;
            }
            d = d.parentNode;
          }
        }
        r = r.return;
      }
    Cu(function () {
      var k = s,
        N = Ro(n),
        j = [];
      e: {
        var x = Zu.get(e);
        if (x !== void 0) {
          var _ = Ga,
            U = e;
          switch (e) {
            case 'keypress':
              if (Xa(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              _ = Dh;
              break;
            case 'focusin':
              ((U = 'focus'), (_ = Do));
              break;
            case 'focusout':
              ((U = 'blur'), (_ = Do));
              break;
            case 'beforeblur':
            case 'afterblur':
              _ = Do;
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
              _ = Tu;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              _ = Ch;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              _ = Fh;
              break;
            case Yu:
            case Xu:
            case Ju:
              _ = Th;
              break;
            case Gu:
              _ = $h;
              break;
            case 'scroll':
            case 'scrollend':
              _ = Sh;
              break;
            case 'wheel':
              _ = Hh;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              _ = Ph;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              _ = Pu;
              break;
            case 'toggle':
            case 'beforetoggle':
              _ = Wh;
          }
          var W = (t & 4) !== 0,
            ge = !W && (e === 'scroll' || e === 'scrollend'),
            v = W ? (x !== null ? x + 'Capture' : null) : x;
          W = [];
          for (var g = k, b; g !== null; ) {
            var T = g;
            if (
              ((b = T.stateNode),
              (T = T.tag),
              (T !== 5 && T !== 26 && T !== 27) ||
                b === null ||
                v === null ||
                ((T = Wr(g, v)), T != null && W.push(Ca(g, T, b))),
              ge)
            )
              break;
            g = g.return;
          }
          0 < W.length && ((x = new _(x, U, null, n, N)), j.push({ event: x, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((x = e === 'mouseover' || e === 'pointerover'),
            (_ = e === 'mouseout' || e === 'pointerout'),
            x && n !== Po && (U = n.relatedTarget || n.fromElement) && (tr(U) || U[er]))
          )
            break e;
          if (
            (_ || x) &&
            ((x =
              N.window === N
                ? N
                : (x = N.ownerDocument)
                  ? x.defaultView || x.parentWindow
                  : window),
            _
              ? ((U = n.relatedTarget || n.toElement),
                (_ = k),
                (U = U ? tr(U) : null),
                U !== null &&
                  ((ge = w(U)), (W = U.tag), U !== ge || (W !== 5 && W !== 27 && W !== 6)) &&
                  (U = null))
              : ((_ = null), (U = k)),
            _ !== U)
          ) {
            if (
              ((W = Tu),
              (T = 'onMouseLeave'),
              (v = 'onMouseEnter'),
              (g = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((W = Pu), (T = 'onPointerLeave'), (v = 'onPointerEnter'), (g = 'pointer')),
              (ge = _ == null ? x : Vr(_)),
              (b = U == null ? x : Vr(U)),
              (x = new W(T, g + 'leave', _, n, N)),
              (x.target = ge),
              (x.relatedTarget = b),
              (T = null),
              tr(N) === k &&
                ((W = new W(v, g + 'enter', U, n, N)),
                (W.target = b),
                (W.relatedTarget = ge),
                (T = W)),
              (ge = T),
              _ && U)
            )
              t: {
                for (W = Vm, v = _, g = U, b = 0, T = v; T; T = W(T)) b++;
                T = 0;
                for (var B = g; B; B = W(B)) T++;
                for (; 0 < b - T; ) ((v = W(v)), b--);
                for (; 0 < T - b; ) ((g = W(g)), T--);
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
            (_ !== null && xf(j, x, _, W, !1), U !== null && ge !== null && xf(j, ge, U, W, !0));
          }
        }
        e: {
          if (
            ((x = k ? Vr(k) : window),
            (_ = x.nodeName && x.nodeName.toLowerCase()),
            _ === 'select' || (_ === 'input' && x.type === 'file'))
          )
            var ie = Uu;
          else if (Iu(x))
            if (Mu) ie = nm;
            else {
              ie = em;
              var F = Zh;
            }
          else
            ((_ = x.nodeName),
              !_ || _.toLowerCase() !== 'input' || (x.type !== 'checkbox' && x.type !== 'radio')
                ? k && jo(k.elementType) && (ie = Uu)
                : (ie = tm));
          if (ie && (ie = ie(e, k))) {
            Du(j, ie, n, N);
            break e;
          }
          (F && F(e, x, k),
            e === 'focusout' &&
              k &&
              x.type === 'number' &&
              k.memoizedProps.value != null &&
              To(x, 'number', x.value));
        }
        switch (((F = k ? Vr(k) : window), e)) {
          case 'focusin':
            (Iu(F) || F.contentEditable === 'true') && ((cr = F), (qo = k), (ea = null));
            break;
          case 'focusout':
            ea = qo = cr = null;
            break;
          case 'mousedown':
            Ho = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ho = !1), Qu(j, n, N));
            break;
          case 'selectionchange':
            if (am) break;
          case 'keydown':
          case 'keyup':
            Qu(j, n, N);
        }
        var X;
        if (Mo)
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
            ? Au(e, n) && (ne = 'onCompositionEnd')
            : e === 'keydown' && n.keyCode === 229 && (ne = 'onCompositionStart');
        (ne &&
          (Ru &&
            n.locale !== 'ko' &&
            (ur || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && ur && (X = Nu())
              : ((dn = N), (Ao = 'value' in dn ? dn.value : dn.textContent), (ur = !0))),
          (F = $s(k, ne)),
          0 < F.length &&
            ((ne = new ju(ne, e, null, n, N)),
            j.push({ event: ne, listeners: F }),
            X ? (ne.data = X) : ((X = Ou(n)), X !== null && (ne.data = X)))),
          (X = Kh ? Yh(e, n) : Xh(e, n)) &&
            ((ne = $s(k, 'onBeforeInput')),
            0 < ne.length &&
              ((F = new ju('onBeforeInput', 'beforeinput', null, n, N)),
              j.push({ event: F, listeners: ne }),
              (F.data = X))),
          Bm(j, e, k, n, N));
      }
      kf(j, t);
    });
  }
  function Ca(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function $s(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var a = e,
        s = a.stateNode;
      if (
        ((a = a.tag),
        (a !== 5 && a !== 26 && a !== 27) ||
          s === null ||
          ((a = Wr(e, n)),
          a != null && r.unshift(Ca(e, a, s)),
          (a = Wr(e, t)),
          a != null && r.push(Ca(e, a, s))),
        e.tag === 3)
      )
        return r;
      e = e.return;
    }
    return [];
  }
  function Vm(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xf(e, t, n, r, a) {
    for (var s = t._reactName, u = []; n !== null && n !== r; ) {
      var d = n,
        h = d.alternate,
        k = d.stateNode;
      if (((d = d.tag), h !== null && h === r)) break;
      ((d !== 5 && d !== 26 && d !== 27) ||
        k === null ||
        ((h = k),
        a
          ? ((k = Wr(n, s)), k != null && u.unshift(Ca(n, k, h)))
          : a || ((k = Wr(n, s)), k != null && u.push(Ca(n, k, h)))),
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
  function _f(e, t) {
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
        r != null && (e.onclick = Vt);
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
        (ee('beforetoggle', e), ee('toggle', e), Va(e, 'popover', r));
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
        Va(e, 'is', r);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < n.length) || (n[0] !== 'o' && n[0] !== 'O') || (n[1] !== 'n' && n[1] !== 'N')) &&
          ((n = wh.get(n) || n), Va(e, n, r));
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
        r != null && (e.onclick = Vt);
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
            n in e ? (e[n] = r) : r === !0 ? e.setAttribute(n, '') : Va(e, n, r);
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
          h = null,
          k = null;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var N = n[r];
            if (N != null)
              switch (r) {
                case 'name':
                  a = N;
                  break;
                case 'type':
                  u = N;
                  break;
                case 'checked':
                  h = N;
                  break;
                case 'defaultChecked':
                  k = N;
                  break;
                case 'value':
                  s = N;
                  break;
                case 'defaultValue':
                  d = N;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (N != null) throw Error(l(137, t));
                  break;
                default:
                  me(e, t, r, N, n, null);
              }
          }
        bu(e, s, d, h, k, u, a, !1);
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
        for (h in n)
          if (n.hasOwnProperty(h) && ((r = n[h]), r != null))
            switch (h) {
              case 'selected':
                e.selected = r && typeof r != 'function' && typeof r != 'symbol';
                break;
              default:
                me(e, t, h, r, n, null);
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
        for (r = 0; r < _a.length; r++) ee(_a[r], e);
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
        for (k in n)
          if (n.hasOwnProperty(k) && ((r = n[k]), r != null))
            switch (k) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(l(137, t));
              default:
                me(e, t, k, r, n, null);
            }
        return;
      default:
        if (jo(t)) {
          for (N in n)
            n.hasOwnProperty(N) && ((r = n[N]), r !== void 0 && ml(e, t, N, r, n, void 0));
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
          h = null,
          k = null,
          N = null;
        for (_ in n) {
          var j = n[_];
          if (n.hasOwnProperty(_) && j != null)
            switch (_) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                h = j;
              default:
                r.hasOwnProperty(_) || me(e, t, _, null, r, j);
            }
        }
        for (var x in r) {
          var _ = r[x];
          if (((j = n[x]), r.hasOwnProperty(x) && (_ != null || j != null)))
            switch (x) {
              case 'type':
                s = _;
                break;
              case 'name':
                a = _;
                break;
              case 'checked':
                k = _;
                break;
              case 'defaultChecked':
                N = _;
                break;
              case 'value':
                u = _;
                break;
              case 'defaultValue':
                d = _;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (_ != null) throw Error(l(137, t));
                break;
              default:
                _ !== j && me(e, t, x, _, r, j);
            }
        }
        Eo(e, u, d, h, k, N, s, a);
        return;
      case 'select':
        _ = u = d = x = null;
        for (s in n)
          if (((h = n[s]), n.hasOwnProperty(s) && h != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                _ = h;
              default:
                r.hasOwnProperty(s) || me(e, t, s, null, r, h);
            }
        for (a in r)
          if (((s = r[a]), (h = n[a]), r.hasOwnProperty(a) && (s != null || h != null)))
            switch (a) {
              case 'value':
                x = s;
                break;
              case 'defaultValue':
                d = s;
                break;
              case 'multiple':
                u = s;
              default:
                s !== h && me(e, t, a, s, r, h);
            }
        ((t = d),
          (n = u),
          (r = _),
          x != null
            ? sr(e, !!n, x, !1)
            : !!r != !!n && (t != null ? sr(e, !!n, t, !0) : sr(e, !!n, n ? [] : '', !1)));
        return;
      case 'textarea':
        _ = x = null;
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
                x = a;
                break;
              case 'defaultValue':
                _ = a;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (a != null) throw Error(l(91));
                break;
              default:
                a !== s && me(e, t, u, a, r, s);
            }
        ku(e, x, _);
        return;
      case 'option':
        for (var U in n)
          if (((x = n[U]), n.hasOwnProperty(U) && x != null && !r.hasOwnProperty(U)))
            switch (U) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                me(e, t, U, null, r, x);
            }
        for (h in r)
          if (((x = r[h]), (_ = n[h]), r.hasOwnProperty(h) && x !== _ && (x != null || _ != null)))
            switch (h) {
              case 'selected':
                e.selected = x && typeof x != 'function' && typeof x != 'symbol';
                break;
              default:
                me(e, t, h, x, r, _);
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
          ((x = n[W]),
            n.hasOwnProperty(W) && x != null && !r.hasOwnProperty(W) && me(e, t, W, null, r, x));
        for (k in r)
          if (((x = r[k]), (_ = n[k]), r.hasOwnProperty(k) && x !== _ && (x != null || _ != null)))
            switch (k) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (x != null) throw Error(l(137, t));
                break;
              default:
                me(e, t, k, x, r, _);
            }
        return;
      default:
        if (jo(t)) {
          for (var ge in n)
            ((x = n[ge]),
              n.hasOwnProperty(ge) &&
                x !== void 0 &&
                !r.hasOwnProperty(ge) &&
                ml(e, t, ge, void 0, r, x));
          for (N in r)
            ((x = r[N]),
              (_ = n[N]),
              !r.hasOwnProperty(N) ||
                x === _ ||
                (x === void 0 && _ === void 0) ||
                ml(e, t, N, x, r, _));
          return;
        }
    }
    for (var v in n)
      ((x = n[v]),
        n.hasOwnProperty(v) && x != null && !r.hasOwnProperty(v) && me(e, t, v, null, r, x));
    for (j in r)
      ((x = r[j]),
        (_ = n[j]),
        !r.hasOwnProperty(j) || x === _ || (x == null && _ == null) || me(e, t, j, x, r, _));
  }
  function Cf(e) {
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
  function Ym() {
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
        if (s && d && Cf(u)) {
          for (u = 0, d = a.responseEnd, r += 1; r < n.length; r++) {
            var h = n[r],
              k = h.startTime;
            if (k > d) break;
            var N = h.transferSize,
              j = h.initiatorType;
            N && Cf(j) && ((h = h.responseEnd), (u += N * (h < d ? 1 : (d - k) / (h - k))));
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
  function qs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Nf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Ef(e, t) {
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
    Gm =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof jf < 'u'
          ? function (e) {
              return jf.resolve(null).then(e).catch(Zm);
            }
          : Tf;
  function Zm(e) {
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
            (e.removeChild(a), Dr(t));
            return;
          }
          r--;
        } else if (n === '$' || n === '$?' || n === '$~' || n === '$!' || n === '&') r++;
        else if (n === 'html') Na(e.ownerDocument.documentElement);
        else if (n === 'head') {
          ((n = e.ownerDocument.head), Na(n));
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
        } else n === 'body' && Na(e.ownerDocument.body);
      n = a;
    } while (n);
    Dr(t);
  }
  function Rf(e, t) {
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
  function kl(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (kl(n), Co(n));
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
      if (((e = Et(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function tg(e, t, n) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !n) ||
        ((e = Et(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function zf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Et(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function wl(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function xl(e) {
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
  function Et(e) {
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
  function Lf(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '/$' || n === '/&') {
          if (t === 0) return Et(e.nextSibling);
          t--;
        } else (n !== '$' && n !== '$!' && n !== '$?' && n !== '$~' && n !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Af(e) {
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
  function Of(e, t, n) {
    switch (((t = qs(n)), e)) {
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
  function Na(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Co(e);
  }
  var Tt = new Map(),
    If = new Set();
  function Hs(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ln = O.d;
  O.d = { f: rg, r: ag, D: sg, C: og, L: ig, m: lg, X: cg, S: ug, M: dg };
  function rg() {
    var e = ln.f(),
      t = Os();
    return e || t;
  }
  function ag(e) {
    var t = nr(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Gc(t) : ln.r(e);
  }
  var Ar = typeof document > 'u' ? null : document;
  function Df(e, t, n) {
    var r = Ar;
    if (r && typeof t == 'string' && t) {
      var a = Rt(t);
      ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
        typeof n == 'string' && (a += '[crossorigin="' + n + '"]'),
        If.has(a) ||
          (If.add(a),
          (e = { rel: e, crossOrigin: n, href: t }),
          r.querySelector(a) === null &&
            ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t))));
    }
  }
  function sg(e) {
    (ln.D(e), Df('dns-prefetch', e, null));
  }
  function og(e, t) {
    (ln.C(e, t), Df('preconnect', e, t));
  }
  function ig(e, t, n) {
    ln.L(e, t, n);
    var r = Ar;
    if (r && e && t) {
      var a = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === 'image' && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + Rt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == 'string' && (a += '[imagesizes="' + Rt(n.imageSizes) + '"]'))
        : (a += '[href="' + Rt(e) + '"]');
      var s = a;
      switch (t) {
        case 'style':
          s = Or(e);
          break;
        case 'script':
          s = Ir(e);
      }
      Tt.has(s) ||
        ((e = A(
          { rel: 'preload', href: t === 'image' && n && n.imageSrcSet ? void 0 : e, as: t },
          n
        )),
        Tt.set(s, e),
        r.querySelector(a) !== null ||
          (t === 'style' && r.querySelector(Ea(s))) ||
          (t === 'script' && r.querySelector(Ta(s))) ||
          ((t = r.createElement('link')), Ke(t, 'link', e), Fe(t), r.head.appendChild(t)));
    }
  }
  function lg(e, t) {
    ln.m(e, t);
    var n = Ar;
    if (n && e) {
      var r = t && typeof t.as == 'string' ? t.as : 'script',
        a = 'link[rel="modulepreload"][as="' + Rt(r) + '"][href="' + Rt(e) + '"]',
        s = a;
      switch (r) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          s = Ir(e);
      }
      if (
        !Tt.has(s) &&
        ((e = A({ rel: 'modulepreload', href: e }, t)), Tt.set(s, e), n.querySelector(a) === null)
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
    var r = Ar;
    if (r && e) {
      var a = rr(r).hoistableStyles,
        s = Or(e);
      t = t || 'default';
      var u = a.get(s);
      if (!u) {
        var d = { loading: 0, preload: null };
        if ((u = r.querySelector(Ea(s)))) d.loading = 5;
        else {
          ((e = A({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
            (n = Tt.get(s)) && _l(e, n));
          var h = (u = r.createElement('link'));
          (Fe(h),
            Ke(h, 'link', e),
            (h._p = new Promise(function (k, N) {
              ((h.onload = k), (h.onerror = N));
            })),
            h.addEventListener('load', function () {
              d.loading |= 1;
            }),
            h.addEventListener('error', function () {
              d.loading |= 2;
            }),
            (d.loading |= 4),
            Vs(u, t, r));
        }
        ((u = { type: 'stylesheet', instance: u, count: 1, state: d }), a.set(s, u));
      }
    }
  }
  function cg(e, t) {
    ln.X(e, t);
    var n = Ar;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Ir(e),
        s = r.get(a);
      s ||
        ((s = n.querySelector(Ta(a))),
        s ||
          ((e = A({ src: e, async: !0 }, t)),
          (t = Tt.get(a)) && Cl(e, t),
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
    var n = Ar;
    if (n && e) {
      var r = rr(n).hoistableScripts,
        a = Ir(e),
        s = r.get(a);
      s ||
        ((s = n.querySelector(Ta(a))),
        s ||
          ((e = A({ src: e, async: !0, type: 'module' }, t)),
          (t = Tt.get(a)) && Cl(e, t),
          (s = n.createElement('script')),
          Fe(s),
          Ke(s, 'link', e),
          n.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        r.set(a, s));
    }
  }
  function Uf(e, t, n, r) {
    var a = (a = V.current) ? Hs(a) : null;
    if (!a) throw Error(l(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof n.precedence == 'string' && typeof n.href == 'string'
          ? ((t = Or(n.href)),
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
          e = Or(n.href);
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
              (s = a.querySelector(Ea(e))) && !s._p && ((u.instance = s), (u.state.loading = 5)),
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
            ? ((t = Ir(n)),
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
  function Or(e) {
    return 'href="' + Rt(e) + '"';
  }
  function Ea(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Mf(e) {
    return A({}, e, { 'data-precedence': e.precedence, precedence: null });
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
  function Ir(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function Ta(e) {
    return 'script[async]' + e;
  }
  function Ff(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var r = e.querySelector('style[data-href~="' + Rt(n.href) + '"]');
          if (r) return ((t.instance = r), Fe(r), r);
          var a = A({}, n, {
            'data-href': n.href,
            'data-precedence': n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (r = (e.ownerDocument || e).createElement('style')),
            Fe(r),
            Ke(r, 'style', a),
            Vs(r, n.precedence, e),
            (t.instance = r)
          );
        case 'stylesheet':
          a = Or(n.href);
          var s = e.querySelector(Ea(a));
          if (s) return ((t.state.loading |= 4), (t.instance = s), Fe(s), s);
          ((r = Mf(n)),
            (a = Tt.get(a)) && _l(r, a),
            (s = (e.ownerDocument || e).createElement('link')),
            Fe(s));
          var u = s;
          return (
            (u._p = new Promise(function (d, h) {
              ((u.onload = d), (u.onerror = h));
            })),
            Ke(s, 'link', r),
            (t.state.loading |= 4),
            Vs(s, n.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = Ir(n.src)),
            (a = e.querySelector(Ta(s)))
              ? ((t.instance = a), Fe(a), a)
              : ((r = n),
                (a = Tt.get(s)) && ((r = A({}, n)), Cl(r, a)),
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
        ((r = t.instance), (t.state.loading |= 4), Vs(r, n.precedence, e));
    return t.instance;
  }
  function Vs(e, t, n) {
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
  function _l(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Cl(e, t) {
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
  function $f(e, t, n) {
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
  function qf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function hg(e, t, n, r) {
    if (
      n.type === 'stylesheet' &&
      (typeof r.media != 'string' || matchMedia(r.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var a = Or(r.href),
          s = t.querySelector(Ea(a));
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
          (r = Mf(r)),
          (a = Tt.get(a)) && _l(r, a),
          (s = s.createElement('link')),
          Fe(s));
        var u = s;
        ((u._p = new Promise(function (d, h) {
          ((u.onload = d), (u.onerror = h));
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
  var Nl = 0;
  function mg(e, t) {
    return (
      e.stylesheets && e.count === 0 && Ys(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var r = setTimeout(function () {
              if ((e.stylesheets && Ys(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Nl === 0 && (Nl = 62500 * Ym());
            var a = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Ys(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > Nl ? 50 : 800) + t
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
      if (this.stylesheets) Ys(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ks = null;
  function Ys(e, t) {
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
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0,
  };
  function yg(e, t, n, r, a, s, u, d, h) {
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
      (this.formState = h),
      (this.incompleteTransitions = new Map()));
  }
  function Hf(e, t, n, r, a, s, u, d, h, k, N, j) {
    return (
      (e = new yg(e, t, n, u, h, k, N, j, d)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = pt(3, null, null, t)),
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
  function Vf(e) {
    return e ? ((e = pr), e) : pr;
  }
  function Wf(e, t, n, r, a, s) {
    ((a = Vf(a)),
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
  function El(e, t) {
    (Qf(e, t), (e = e.alternate) && Qf(e, t));
  }
  function Kf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bn(e, 67108864);
      (t !== null && it(t, e, 67108864), El(e, 67108864));
    }
  }
  function Yf(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = vt();
      t = xo(t);
      var n = Bn(e, t);
      (n !== null && it(n, e, t), El(e, t));
    }
  }
  var Xs = !0;
  function vg(e, t, n, r) {
    var a = E.T;
    E.T = null;
    var s = O.p;
    try {
      ((O.p = 2), Tl(e, t, n, r));
    } finally {
      ((O.p = s), (E.T = a));
    }
  }
  function bg(e, t, n, r) {
    var a = E.T;
    E.T = null;
    var s = O.p;
    try {
      ((O.p = 8), Tl(e, t, n, r));
    } finally {
      ((O.p = s), (E.T = a));
    }
  }
  function Tl(e, t, n, r) {
    if (Xs) {
      var a = jl(r);
      if (a === null) (hl(e, t, r, Js, n), Jf(e, r));
      else if (wg(a, e, t, n, r)) r.stopPropagation();
      else if ((Jf(e, r), t & 4 && -1 < kg.indexOf(e))) {
        for (; a !== null; ) {
          var s = nr(a);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var u = In(s.pendingLanes);
                  if (u !== 0) {
                    var d = s;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; u; ) {
                      var h = 1 << (31 - dt(u));
                      ((d.entanglements[1] |= h), (u &= ~h));
                    }
                    (Ft(s), (ue & 6) === 0 && ((Ls = ut() + 500), Sa(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((d = Bn(s, 2)), d !== null && it(d, s, 2), Os(), El(s, 2));
            }
          if (((s = jl(r)), s === null && hl(e, t, r, Js, n), s === a)) break;
          a = s;
        }
        a !== null && r.stopPropagation();
      } else hl(e, t, r, null, n);
    }
  }
  function jl(e) {
    return ((e = Ro(e)), Pl(e));
  }
  var Js = null;
  function Pl(e) {
    if (((Js = null), (e = tr(e)), e !== null)) {
      var t = w(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = z(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = I(t)), e !== null)) return e;
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
        switch (sh()) {
          case ru:
            return 2;
          case au:
            return 8;
          case Fa:
          case oh:
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
  var Rl = !1,
    jn = null,
    Pn = null,
    Rn = null,
    Pa = new Map(),
    Ra = new Map(),
    zn = [],
    kg =
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
        Rn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Pa.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ra.delete(t.pointerId);
    }
  }
  function za(e, t, n, r, a, s) {
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
        return ((jn = za(jn, e, t, n, r, a)), !0);
      case 'dragenter':
        return ((Pn = za(Pn, e, t, n, r, a)), !0);
      case 'mouseover':
        return ((Rn = za(Rn, e, t, n, r, a)), !0);
      case 'pointerover':
        var s = a.pointerId;
        return (Pa.set(s, za(Pa.get(s) || null, e, t, n, r, a)), !0);
      case 'gotpointercapture':
        return ((s = a.pointerId), Ra.set(s, za(Ra.get(s) || null, e, t, n, r, a)), !0);
    }
    return !1;
  }
  function Gf(e) {
    var t = tr(e.target);
    if (t !== null) {
      var n = w(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = z(n)), t !== null)) {
            ((e.blockedOn = t),
              du(e.priority, function () {
                Yf(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = I(n)), t !== null)) {
            ((e.blockedOn = t),
              du(e.priority, function () {
                Yf(n);
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
  function Gs(e) {
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
  function Zf(e, t, n) {
    Gs(e) && n.delete(t);
  }
  function xg() {
    ((Rl = !1),
      jn !== null && Gs(jn) && (jn = null),
      Pn !== null && Gs(Pn) && (Pn = null),
      Rn !== null && Gs(Rn) && (Rn = null),
      Pa.forEach(Zf),
      Ra.forEach(Zf));
  }
  function Zs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Rl || ((Rl = !0), c.unstable_scheduleCallback(c.unstable_NormalPriority, xg)));
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
  function Dr(e) {
    function t(h) {
      return Zs(h, e);
    }
    (jn !== null && Zs(jn, e),
      Pn !== null && Zs(Pn, e),
      Rn !== null && Zs(Rn, e),
      Pa.forEach(t),
      Ra.forEach(t));
    for (var n = 0; n < zn.length; n++) {
      var r = zn[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < zn.length && ((n = zn[0]), n.blockedOn === null); )
      (Gf(n), n.blockedOn === null && zn.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (r = 0; r < n.length; r += 3) {
        var a = n[r],
          s = n[r + 1],
          u = a[tt] || null;
        if (typeof s == 'function') u || ep(n);
        else if (u) {
          var d = null;
          if (s && s.hasAttribute('formAction')) {
            if (((a = s), (u = s[tt] || null))) d = u.formAction;
            else if (Pl(a) !== null) continue;
          } else d = u.action;
          (typeof d == 'function' ? (n[r + 1] = d) : (n.splice(r, 3), (r -= 3)), ep(n));
        }
      }
  }
  function tp() {
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
  function zl(e) {
    this._internalRoot = e;
  }
  ((to.prototype.render = zl.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(l(409));
      var n = t.current,
        r = vt();
      Wf(n, r, e, t, null, null);
    }),
    (to.prototype.unmount = zl.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Wf(e.current, 2, null, e, null, null), Os(), (t[er] = null));
        }
      }));
  function to(e) {
    this._internalRoot = e;
  }
  to.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = cu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < zn.length && t !== 0 && t < zn[n].priority; n++);
      (zn.splice(n, 0, e), n === 0 && Gf(e));
    }
  };
  var np = o.version;
  if (np !== '19.2.0') throw Error(l(527, np, '19.2.0'));
  O.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(l(188))
        : ((e = Object.keys(e).join(',')), Error(l(268, e)));
    return ((e = S(t)), (e = e !== null ? R(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Sg = {
    bundleType: 0,
    version: '19.2.0',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: E,
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
    (Aa.createRoot = function (e, t) {
      if (!m(e)) throw Error(l(299));
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
        (t = Hf(e, 1, !1, null, null, n, r, null, a, s, u, tp)),
        (e[er] = t.current),
        pl(e),
        new zl(t)
      );
    }),
    (Aa.hydrateRoot = function (e, t, n) {
      if (!m(e)) throw Error(l(299));
      var r = !1,
        a = '',
        s = ld,
        u = ud,
        d = cd,
        h = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
          n.onCaughtError !== void 0 && (u = n.onCaughtError),
          n.onRecoverableError !== void 0 && (d = n.onRecoverableError),
          n.formState !== void 0 && (h = n.formState)),
        (t = Hf(e, 1, !0, t, n ?? null, r, a, h, s, u, d, tp)),
        (t.context = Vf(null)),
        (n = t.current),
        (r = vt()),
        (r = xo(r)),
        (a = yn(r)),
        (a.callback = null),
        vn(n, a, r),
        (n = r),
        (t.current.lanes = n),
        qr(t, n),
        Ft(t),
        (e[er] = t.current),
        pl(e),
        new to(t)
      );
    }),
    (Aa.version = '19.2.0'),
    Aa
  );
}
var gp;
function Ag() {
  if (gp) return Ll.exports;
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
  return (c(), (Ll.exports = Lg()), Ll.exports);
}
var Og = Ag();
const Ig = zp(Og),
  $t = Object.create(null);
$t.open = '0';
$t.close = '1';
$t.ping = '2';
$t.pong = '3';
$t.message = '4';
$t.upgrade = '5';
$t.noop = '6';
const oo = Object.create(null);
Object.keys($t).forEach(c => {
  oo[$t[c]] = c;
});
const Ul = { type: 'error', data: 'parser error' },
  Lp =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Object.prototype.toString.call(Blob) === '[object BlobConstructor]'),
  Ap = typeof ArrayBuffer == 'function',
  Op = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c && c.buffer instanceof ArrayBuffer,
  Yl = ({ type: c, data: o }, i, l) =>
    Lp && o instanceof Blob
      ? i
        ? l(o)
        : yp(o, l)
      : Ap && (o instanceof ArrayBuffer || Op(o))
        ? i
          ? l(o)
          : yp(new Blob([o]), l)
        : l($t[c] + (o || '')),
  yp = (c, o) => {
    const i = new FileReader();
    return (
      (i.onload = function () {
        const l = i.result.split(',')[1];
        o('b' + (l || ''));
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
let Ol;
function Dg(c, o) {
  if (Lp && c.data instanceof Blob) return c.data.arrayBuffer().then(vp).then(o);
  if (Ap && (c.data instanceof ArrayBuffer || Op(c.data))) return o(vp(c.data));
  Yl(c, !1, i => {
    (Ol || (Ol = new TextEncoder()), o(Ol.encode(i)));
  });
}
const bp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  Da = typeof Uint8Array > 'u' ? [] : new Uint8Array(256);
for (let c = 0; c < bp.length; c++) Da[bp.charCodeAt(c)] = c;
const Ug = c => {
    let o = c.length * 0.75,
      i = c.length,
      l,
      m = 0,
      w,
      z,
      I,
      C;
    c[c.length - 1] === '=' && (o--, c[c.length - 2] === '=' && o--);
    const S = new ArrayBuffer(o),
      R = new Uint8Array(S);
    for (l = 0; l < i; l += 4)
      ((w = Da[c.charCodeAt(l)]),
        (z = Da[c.charCodeAt(l + 1)]),
        (I = Da[c.charCodeAt(l + 2)]),
        (C = Da[c.charCodeAt(l + 3)]),
        (R[m++] = (w << 2) | (z >> 4)),
        (R[m++] = ((z & 15) << 4) | (I >> 2)),
        (R[m++] = ((I & 3) << 6) | (C & 63)));
    return S;
  },
  Mg = typeof ArrayBuffer == 'function',
  Xl = (c, o) => {
    if (typeof c != 'string') return { type: 'message', data: Ip(c, o) };
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
    if (Mg) {
      const i = Ug(c);
      return Ip(i, o);
    } else return { base64: !0, data: c };
  },
  Ip = (c, o) => {
    switch (o) {
      case 'blob':
        return c instanceof Blob ? c : new Blob([c]);
      case 'arraybuffer':
      default:
        return c instanceof ArrayBuffer ? c : c.buffer;
    }
  },
  Dp = '',
  Bg = (c, o) => {
    const i = c.length,
      l = new Array(i);
    let m = 0;
    c.forEach((w, z) => {
      Yl(w, !1, I => {
        ((l[z] = I), ++m === i && o(l.join(Dp)));
      });
    });
  },
  $g = (c, o) => {
    const i = c.split(Dp),
      l = [];
    for (let m = 0; m < i.length; m++) {
      const w = Xl(i[m], o);
      if ((l.push(w), w.type === 'error')) break;
    }
    return l;
  };
function qg() {
  return new TransformStream({
    transform(c, o) {
      Dg(c, i => {
        const l = i.length;
        let m;
        if (l < 126) ((m = new Uint8Array(1)), new DataView(m.buffer).setUint8(0, l));
        else if (l < 65536) {
          m = new Uint8Array(3);
          const w = new DataView(m.buffer);
          (w.setUint8(0, 126), w.setUint16(1, l));
        } else {
          m = new Uint8Array(9);
          const w = new DataView(m.buffer);
          (w.setUint8(0, 127), w.setBigUint64(1, BigInt(l)));
        }
        (c.data && typeof c.data != 'string' && (m[0] |= 128), o.enqueue(m), o.enqueue(i));
      });
    },
  });
}
let Il;
function ro(c) {
  return c.reduce((o, i) => o + i.length, 0);
}
function ao(c, o) {
  if (c[0].length === o) return c.shift();
  const i = new Uint8Array(o);
  let l = 0;
  for (let m = 0; m < o; m++) ((i[m] = c[0][l++]), l === c[0].length && (c.shift(), (l = 0)));
  return (c.length && l < c[0].length && (c[0] = c[0].slice(l)), i);
}
function Hg(c, o) {
  Il || (Il = new TextDecoder());
  const i = [];
  let l = 0,
    m = -1,
    w = !1;
  return new TransformStream({
    transform(z, I) {
      for (i.push(z); ; ) {
        if (l === 0) {
          if (ro(i) < 1) break;
          const C = ao(i, 1);
          ((w = (C[0] & 128) === 128),
            (m = C[0] & 127),
            m < 126 ? (l = 3) : m === 126 ? (l = 1) : (l = 2));
        } else if (l === 1) {
          if (ro(i) < 2) break;
          const C = ao(i, 2);
          ((m = new DataView(C.buffer, C.byteOffset, C.length).getUint16(0)), (l = 3));
        } else if (l === 2) {
          if (ro(i) < 8) break;
          const C = ao(i, 8),
            S = new DataView(C.buffer, C.byteOffset, C.length),
            R = S.getUint32(0);
          if (R > Math.pow(2, 21) - 1) {
            I.enqueue(Ul);
            break;
          }
          ((m = R * Math.pow(2, 32) + S.getUint32(4)), (l = 3));
        } else {
          if (ro(i) < m) break;
          const C = ao(i, m);
          (I.enqueue(Xl(w ? C : Il.decode(C), o)), (l = 0));
        }
        if (m === 0 || m > c) {
          I.enqueue(Ul);
          break;
        }
      }
    },
  });
}
const Up = 4;
function Oe(c) {
  if (c) return Vg(c);
}
function Vg(c) {
  for (var o in Oe.prototype) c[o] = Oe.prototype[o];
  return c;
}
Oe.prototype.on = Oe.prototype.addEventListener = function (c, o) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks['$' + c] = this._callbacks['$' + c] || []).push(o),
    this
  );
};
Oe.prototype.once = function (c, o) {
  function i() {
    (this.off(c, i), o.apply(this, arguments));
  }
  return ((i.fn = o), this.on(c, i), this);
};
Oe.prototype.off =
  Oe.prototype.removeListener =
  Oe.prototype.removeAllListeners =
  Oe.prototype.removeEventListener =
    function (c, o) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var i = this._callbacks['$' + c];
      if (!i) return this;
      if (arguments.length == 1) return (delete this._callbacks['$' + c], this);
      for (var l, m = 0; m < i.length; m++)
        if (((l = i[m]), l === o || l.fn === o)) {
          i.splice(m, 1);
          break;
        }
      return (i.length === 0 && delete this._callbacks['$' + c], this);
    };
Oe.prototype.emit = function (c) {
  this._callbacks = this._callbacks || {};
  for (
    var o = new Array(arguments.length - 1), i = this._callbacks['$' + c], l = 1;
    l < arguments.length;
    l++
  )
    o[l - 1] = arguments[l];
  if (i) {
    i = i.slice(0);
    for (var l = 0, m = i.length; l < m; ++l) i[l].apply(this, o);
  }
  return this;
};
Oe.prototype.emitReserved = Oe.prototype.emit;
Oe.prototype.listeners = function (c) {
  return ((this._callbacks = this._callbacks || {}), this._callbacks['$' + c] || []);
};
Oe.prototype.hasListeners = function (c) {
  return !!this.listeners(c).length;
};
const fo =
    typeof Promise == 'function' && typeof Promise.resolve == 'function'
      ? c => Promise.resolve().then(c)
      : (c, o) => o(c, 0),
  jt = typeof self < 'u' ? self : typeof window < 'u' ? window : Function('return this')(),
  Wg = 'arraybuffer';
function Mp(c, ...o) {
  return o.reduce((i, l) => (c.hasOwnProperty(l) && (i[l] = c[l]), i), {});
}
const Qg = jt.setTimeout,
  Kg = jt.clearTimeout;
function po(c, o) {
  o.useNativeTimers
    ? ((c.setTimeoutFn = Qg.bind(jt)), (c.clearTimeoutFn = Kg.bind(jt)))
    : ((c.setTimeoutFn = jt.setTimeout.bind(jt)), (c.clearTimeoutFn = jt.clearTimeout.bind(jt)));
}
const Yg = 1.33;
function Xg(c) {
  return typeof c == 'string' ? Jg(c) : Math.ceil((c.byteLength || c.size) * Yg);
}
function Jg(c) {
  let o = 0,
    i = 0;
  for (let l = 0, m = c.length; l < m; l++)
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
function Fp() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Gg(c) {
  let o = '';
  for (let i in c)
    c.hasOwnProperty(i) &&
      (o.length && (o += '&'), (o += encodeURIComponent(i) + '=' + encodeURIComponent(c[i])));
  return o;
}
function Zg(c) {
  let o = {},
    i = c.split('&');
  for (let l = 0, m = i.length; l < m; l++) {
    let w = i[l].split('=');
    o[decodeURIComponent(w[0])] = decodeURIComponent(w[1]);
  }
  return o;
}
class ey extends Error {
  constructor(o, i, l) {
    (super(o), (this.description = i), (this.context = l), (this.type = 'TransportError'));
  }
}
class Jl extends Oe {
  constructor(o) {
    (super(),
      (this.writable = !1),
      po(this, o),
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
    const i = Gg(o);
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
    ($g(o, this.socket.binaryType).forEach(i),
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
      this.opts.timestampRequests !== !1 && (i[this.opts.timestampParam] = Fp()),
      !this.supportsBinary && !i.sid && (i.b64 = 1),
      this.createUri(o, i)
    );
  }
}
let Bp = !1;
try {
  Bp = typeof XMLHttpRequest < 'u' && 'withCredentials' in new XMLHttpRequest();
} catch {}
const ny = Bp;
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
      l.on('error', (m, w) => {
        this.onError('xhr post error', m, w);
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
class Bt extends Oe {
  constructor(o, i, l) {
    (super(),
      (this.createRequest = o),
      po(this, l),
      (this._opts = l),
      (this._method = l.method || 'GET'),
      (this._uri = i),
      (this._data = l.data !== void 0 ? l.data : null),
      this._create());
  }
  _create() {
    var o;
    const i = Mp(
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
          for (let m in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(m) &&
              l.setRequestHeader(m, this._opts.extraHeaders[m]);
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
          var m;
          (l.readyState === 3 &&
            ((m = this._opts.cookieJar) === null ||
              m === void 0 ||
              m.parseCookies(l.getResponseHeader('set-cookie'))),
            l.readyState === 4 &&
              (l.status === 200 || l.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof l.status == 'number' ? l.status : 0);
                  }, 0)));
        }),
        l.send(this._data));
    } catch (m) {
      this.setTimeoutFn(() => {
        this._onError(m);
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
  if (typeof attachEvent == 'function') attachEvent('onunload', kp);
  else if (typeof addEventListener == 'function') {
    const c = 'onpagehide' in jt ? 'pagehide' : 'unload';
    addEventListener(c, kp, !1);
  }
}
function kp() {
  for (let c in Bt.requests) Bt.requests.hasOwnProperty(c) && Bt.requests[c].abort();
}
const sy = (function () {
  const c = $p({ xdomain: !1 });
  return c && c.responseType !== null;
})();
class oy extends ay {
  constructor(o) {
    super(o);
    const i = o && o.forceBase64;
    this.supportsBinary = sy && !i;
  }
  request(o = {}) {
    return (Object.assign(o, { xd: this.xd }, this.opts), new Bt($p, this.uri(), o));
  }
}
function $p(c) {
  const o = c.xdomain;
  try {
    if (typeof XMLHttpRequest < 'u' && (!o || ny)) return new XMLHttpRequest();
  } catch {}
  if (!o)
    try {
      return new jt[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch {}
}
const qp =
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
      l = qp
        ? {}
        : Mp(
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
    } catch (m) {
      return this.emitReserved('error', m);
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
        m = i === o.length - 1;
      Yl(l, this.supportsBinary, w => {
        try {
          this.doWrite(l, w);
        } catch {}
        m &&
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
const Dl = jt.WebSocket || jt.MozWebSocket;
class ly extends iy {
  createSocket(o, i, l) {
    return qp ? new Dl(o, i, l) : i ? new Dl(o, i) : new Dl(o);
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
            m = qg();
          (m.readable.pipeTo(o.writable), (this._writer = m.writable.getWriter()));
          const w = () => {
            l.read()
              .then(({ done: I, value: C }) => {
                I || (this.onPacket(C), w());
              })
              .catch(I => {});
          };
          w();
          const z = { type: 'open' };
          (this.query.sid && (z.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(z).then(() => this.onOpen()));
        });
      }));
  }
  write(o) {
    this.writable = !1;
    for (let i = 0; i < o.length; i++) {
      const l = o[i],
        m = i === o.length - 1;
      this._writer.write(l).then(() => {
        m &&
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
function Ml(c) {
  if (c.length > 8e3) throw 'URI too long';
  const o = c,
    i = c.indexOf('['),
    l = c.indexOf(']');
  i != -1 &&
    l != -1 &&
    (c = c.substring(0, i) + c.substring(i, l).replace(/:/g, ';') + c.substring(l, c.length));
  let m = dy.exec(c || ''),
    w = {},
    z = 14;
  for (; z--; ) w[fy[z]] = m[z] || '';
  return (
    i != -1 &&
      l != -1 &&
      ((w.source = o),
      (w.host = w.host.substring(1, w.host.length - 1).replace(/;/g, ':')),
      (w.authority = w.authority.replace('[', '').replace(']', '').replace(/;/g, ':')),
      (w.ipv6uri = !0)),
    (w.pathNames = py(w, w.path)),
    (w.queryKey = hy(w, w.query)),
    w
  );
}
function py(c, o) {
  const i = /\/{2,9}/g,
    l = o.replace(i, '/').split('/');
  return (
    (o.slice(0, 1) == '/' || o.length === 0) && l.splice(0, 1),
    o.slice(-1) == '/' && l.splice(l.length - 1, 1),
    l
  );
}
function hy(c, o) {
  const i = {};
  return (
    o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (l, m, w) {
      m && (i[m] = w);
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
class An extends Oe {
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
      const l = Ml(o);
      ((i.hostname = l.host),
        (i.secure = l.protocol === 'https' || l.protocol === 'wss'),
        (i.port = l.port),
        l.query && (i.query = l.query));
    } else i.host && (i.hostname = Ml(i.host).host);
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
      i.transports.forEach(l => {
        const m = l.prototype.name;
        (this.transports.push(m), (this._transportsByName[m] = l));
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
      typeof this.opts.query == 'string' && (this.opts.query = Zg(this.opts.query)),
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
    ((i.EIO = Up), (i.transport = o), this.id && (i.sid = this.id));
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
      An.priorWebsocketSuccess &&
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
      (An.priorWebsocketSuccess = this.transport.name === 'websocket'),
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
  _sendPacket(o, i, l, m) {
    if (
      (typeof i == 'function' && ((m = i), (i = void 0)),
      typeof l == 'function' && ((m = l), (l = null)),
      this.readyState === 'closing' || this.readyState === 'closed')
    )
      return;
    ((l = l || {}), (l.compress = l.compress !== !1));
    const w = { type: o, data: i, options: l };
    (this.emitReserved('packetCreate', w),
      this.writeBuffer.push(w),
      m && this.once('flush', m),
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
      ((An.priorWebsocketSuccess = !1),
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
An.protocol = Up;
class my extends An {
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
    An.priorWebsocketSuccess = !1;
    const m = () => {
      l ||
        (i.send([{ type: 'ping', data: 'probe' }]),
        i.once('packet', A => {
          if (!l)
            if (A.type === 'pong' && A.data === 'probe') {
              if (((this.upgrading = !0), this.emitReserved('upgrading', i), !i)) return;
              ((An.priorWebsocketSuccess = i.name === 'websocket'),
                this.transport.pause(() => {
                  l ||
                    (this.readyState !== 'closed' &&
                      (R(),
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
    function w() {
      l || ((l = !0), R(), i.close(), (i = null));
    }
    const z = A => {
      const H = new Error('probe error: ' + A);
      ((H.transport = i.name), w(), this.emitReserved('upgradeError', H));
    };
    function I() {
      z('transport closed');
    }
    function C() {
      z('socket closed');
    }
    function S(A) {
      i && A.name !== i.name && w();
    }
    const R = () => {
      (i.removeListener('open', m),
        i.removeListener('error', z),
        i.removeListener('close', I),
        this.off('close', C),
        this.off('upgrading', S));
    };
    (i.once('open', m),
      i.once('error', z),
      i.once('close', I),
      this.once('close', C),
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
      (l = Ml(c))),
    l.port ||
      (/^(http|ws)$/.test(l.protocol)
        ? (l.port = '80')
        : /^(http|ws)s$/.test(l.protocol) && (l.port = '443')),
    (l.path = l.path || '/'));
  const m = l.host.indexOf(':') !== -1 ? '[' + l.host + ']' : l.host;
  return (
    (l.id = l.protocol + '://' + m + ':' + l.port + o),
    (l.href = l.protocol + '://' + m + (i && i.port === l.port ? '' : ':' + l.port)),
    l
  );
}
const vy = typeof ArrayBuffer == 'function',
  by = c =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(c)
      : c.buffer instanceof ArrayBuffer,
  Hp = Object.prototype.toString,
  ky =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Hp.call(Blob) === '[object BlobConstructor]'),
  wy =
    typeof File == 'function' ||
    (typeof File < 'u' && Hp.call(File) === '[object FileConstructor]');
function Gl(c) {
  return (
    (vy && (c instanceof ArrayBuffer || by(c))) ||
    (ky && c instanceof Blob) ||
    (wy && c instanceof File)
  );
}
function lo(c, o) {
  if (!c || typeof c != 'object') return !1;
  if (Array.isArray(c)) {
    for (let i = 0, l = c.length; i < l; i++) if (lo(c[i])) return !0;
    return !1;
  }
  if (Gl(c)) return !0;
  if (c.toJSON && typeof c.toJSON == 'function' && arguments.length === 1)
    return lo(c.toJSON(), !0);
  for (const i in c) if (Object.prototype.hasOwnProperty.call(c, i) && lo(c[i])) return !0;
  return !1;
}
function xy(c) {
  const o = [],
    i = c.data,
    l = c;
  return ((l.data = Bl(i, o)), (l.attachments = o.length), { packet: l, buffers: o });
}
function Bl(c, o) {
  if (!c) return c;
  if (Gl(c)) {
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
  return ((c.data = $l(c.data, o)), delete c.attachments, c);
}
function $l(c, o) {
  if (!c) return c;
  if (c && c._placeholder === !0) {
    if (typeof c.num == 'number' && c.num >= 0 && c.num < o.length) return o[c.num];
    throw new Error('illegal attachments');
  } else if (Array.isArray(c)) for (let i = 0; i < c.length; i++) c[i] = $l(c[i], o);
  else if (typeof c == 'object')
    for (const i in c) Object.prototype.hasOwnProperty.call(c, i) && (c[i] = $l(c[i], o));
  return c;
}
const _y = [
    'connect',
    'connect_error',
    'disconnect',
    'disconnecting',
    'newListener',
    'removeListener',
  ],
  Cy = 5;
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
class Ny {
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
    const i = xy(o),
      l = this.encodeAsString(i.packet),
      m = i.buffers;
    return (m.unshift(l), m);
  }
}
function wp(c) {
  return Object.prototype.toString.call(c) === '[object Object]';
}
class Zl extends Oe {
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
          (this.reconstructor = new Ey(i)),
          i.attachments === 0 && super.emitReserved('decoded', i))
        : super.emitReserved('decoded', i);
    } else if (Gl(o) || o.base64)
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
      const w = i + 1;
      for (; o.charAt(++i) !== '-' && i != o.length; );
      const z = o.substring(w, i);
      if (z != Number(z) || o.charAt(i) !== '-') throw new Error('Illegal attachments');
      l.attachments = Number(z);
    }
    if (o.charAt(i + 1) === '/') {
      const w = i + 1;
      for (; ++i && !(o.charAt(i) === ',' || i === o.length); );
      l.nsp = o.substring(w, i);
    } else l.nsp = '/';
    const m = o.charAt(i + 1);
    if (m !== '' && Number(m) == m) {
      const w = i + 1;
      for (; ++i; ) {
        const z = o.charAt(i);
        if (z == null || Number(z) != z) {
          --i;
          break;
        }
        if (i === o.length) break;
      }
      l.id = Number(o.substring(w, i + 1));
    }
    if (o.charAt(++i)) {
      const w = this.tryParse(o.substr(i));
      if (Zl.isPayloadValid(l.type, w)) l.data = w;
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
        return wp(i);
      case ae.DISCONNECT:
        return i === void 0;
      case ae.CONNECT_ERROR:
        return typeof i == 'string' || wp(i);
      case ae.EVENT:
      case ae.BINARY_EVENT:
        return (
          Array.isArray(i) &&
          (typeof i[0] == 'number' || (typeof i[0] == 'string' && _y.indexOf(i[0]) === -1))
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
class Ey {
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
      Decoder: Zl,
      Encoder: Ny,
      get PacketType() {
        return ae;
      },
      protocol: Cy,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function It(c, o, i) {
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
class Vp extends Oe {
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
      It(o, 'open', this.onopen.bind(this)),
      It(o, 'packet', this.onpacket.bind(this)),
      It(o, 'error', this.onerror.bind(this)),
      It(o, 'close', this.onclose.bind(this)),
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
    var l, m, w;
    if (jy.hasOwnProperty(o)) throw new Error('"' + o.toString() + '" is a reserved event name');
    if ((i.unshift(o), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
      return (this._addToQueue(i), this);
    const z = { type: ae.EVENT, data: i };
    if (
      ((z.options = {}),
      (z.options.compress = this.flags.compress !== !1),
      typeof i[i.length - 1] == 'function')
    ) {
      const S = this.ids++,
        R = i.pop();
      (this._registerAckCallback(S, R), (z.id = S));
    }
    const I =
        (m = (l = this.io.engine) === null || l === void 0 ? void 0 : l.transport) === null ||
        m === void 0
          ? void 0
          : m.writable,
      C =
        this.connected &&
        !(!((w = this.io.engine) === null || w === void 0) && w._hasPingExpired());
    return (
      (this.flags.volatile && !I) ||
        (C ? (this.notifyOutgoingListeners(z), this.packet(z)) : this.sendBuffer.push(z)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(o, i) {
    var l;
    const m = (l = this.flags.timeout) !== null && l !== void 0 ? l : this._opts.ackTimeout;
    if (m === void 0) {
      this.acks[o] = i;
      return;
    }
    const w = this.io.setTimeoutFn(() => {
        delete this.acks[o];
        for (let I = 0; I < this.sendBuffer.length; I++)
          this.sendBuffer[I].id === o && this.sendBuffer.splice(I, 1);
        i.call(this, new Error('operation has timed out'));
      }, m),
      z = (...I) => {
        (this.io.clearTimeoutFn(w), i.apply(this, I));
      };
    ((z.withError = !0), (this.acks[o] = z));
  }
  emitWithAck(o, ...i) {
    return new Promise((l, m) => {
      const w = (z, I) => (z ? m(z) : l(I));
      ((w.withError = !0), i.push(w), this.emit(o, ...i));
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
    (o.push((m, ...w) =>
      l !== this._queue[0]
        ? void 0
        : (m !== null
            ? l.tryCount > this._opts.retries && (this._queue.shift(), i && i(m))
            : (this._queue.shift(), i && i(null, ...w)),
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
    return function (...m) {
      l || ((l = !0), i.packet({ type: ae.ACK, id: o, data: m }));
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
function Mr(c) {
  ((c = c || {}),
    (this.ms = c.min || 100),
    (this.max = c.max || 1e4),
    (this.factor = c.factor || 2),
    (this.jitter = c.jitter > 0 && c.jitter <= 1 ? c.jitter : 0),
    (this.attempts = 0));
}
Mr.prototype.duration = function () {
  var c = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var o = Math.random(),
      i = Math.floor(o * this.jitter * c);
    c = (Math.floor(o * 10) & 1) == 0 ? c - i : c + i;
  }
  return Math.min(c, this.max) | 0;
};
Mr.prototype.reset = function () {
  this.attempts = 0;
};
Mr.prototype.setMin = function (c) {
  this.ms = c;
};
Mr.prototype.setMax = function (c) {
  this.max = c;
};
Mr.prototype.setJitter = function (c) {
  this.jitter = c;
};
class ql extends Oe {
  constructor(o, i) {
    var l;
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
      this.randomizationFactor((l = i.randomizationFactor) !== null && l !== void 0 ? l : 0.5),
      (this.backoff = new Mr({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(i.timeout == null ? 2e4 : i.timeout),
      (this._readyState = 'closed'),
      (this.uri = o));
    const m = i.parser || Ty;
    ((this.encoder = new m.Encoder()),
      (this.decoder = new m.Decoder()),
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
    const m = It(i, 'open', function () {
        (l.onopen(), o && o());
      }),
      w = I => {
        (this.cleanup(),
          (this._readyState = 'closed'),
          this.emitReserved('error', I),
          o ? o(I) : this.maybeReconnectOnOpen());
      },
      z = It(i, 'error', w);
    if (this._timeout !== !1) {
      const I = this._timeout,
        C = this.setTimeoutFn(() => {
          (m(), w(new Error('timeout')), i.close());
        }, I);
      (this.opts.autoUnref && C.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(C);
        }));
    }
    return (this.subs.push(m), this.subs.push(z), this);
  }
  connect(o) {
    return this.open(o);
  }
  onopen() {
    (this.cleanup(), (this._readyState = 'open'), this.emitReserved('open'));
    const o = this.engine;
    this.subs.push(
      It(o, 'ping', this.onping.bind(this)),
      It(o, 'data', this.ondata.bind(this)),
      It(o, 'error', this.onerror.bind(this)),
      It(o, 'close', this.onclose.bind(this)),
      It(this.decoder, 'decoded', this.ondecoded.bind(this))
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
        : ((l = new Vp(this, o, i)), (this.nsps[o] = l)),
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
            o.open(m => {
              m
                ? ((o._reconnecting = !1), o.reconnect(), this.emitReserved('reconnect_error', m))
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
const Oa = {};
function uo(c, o) {
  (typeof c == 'object' && ((o = c), (c = void 0)), (o = o || {}));
  const i = yy(c, o.path || '/socket.io'),
    l = i.source,
    m = i.id,
    w = i.path,
    z = Oa[m] && w in Oa[m].nsps,
    I = o.forceNew || o['force new connection'] || o.multiplex === !1 || z;
  let C;
  return (
    I ? (C = new ql(l, o)) : (Oa[m] || (Oa[m] = new ql(l, o)), (C = Oa[m])),
    i.query && !o.query && (o.query = i.queryKey),
    C.socket(i.path, o)
  );
}
Object.assign(uo, { Manager: ql, Socket: Vp, io: uo, connect: uo });
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Py = c => c.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ry = c =>
    c.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, i, l) => (l ? l.toUpperCase() : i.toLowerCase())),
  xp = c => {
    const o = Ry(c);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  Wp = (...c) =>
    c
      .filter((o, i, l) => !!o && o.trim() !== '' && l.indexOf(o) === i)
      .join(' ')
      .trim(),
  zy = c => {
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
 */ const Ay = M.forwardRef(
  (
    {
      color: c = 'currentColor',
      size: o = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: l,
      className: m = '',
      children: w,
      iconNode: z,
      ...I
    },
    C
  ) =>
    M.createElement(
      'svg',
      {
        ref: C,
        ...Ly,
        width: o,
        height: o,
        stroke: c,
        strokeWidth: l ? (Number(i) * 24) / Number(o) : i,
        className: Wp('lucide', m),
        ...(!w && !zy(I) && { 'aria-hidden': 'true' }),
        ...I,
      },
      [...z.map(([S, R]) => M.createElement(S, R)), ...(Array.isArray(w) ? w : [w])]
    )
);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ke = (c, o) => {
  const i = M.forwardRef(({ className: l, ...m }, w) =>
    M.createElement(Ay, {
      ref: w,
      iconNode: o,
      className: Wp(`lucide-${Py(xp(c))}`, `lucide-${c}`, l),
      ...m,
    })
  );
  return ((i.displayName = xp(c)), i);
};
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Oy = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
  ],
  Iy = ke('arrow-right', Oy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dy = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
  so = ke('chevron-down', Dy);
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
  Qp = ke('circle-alert', Uy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const My = [
    [
      'path',
      {
        d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
        key: '9ktpf1',
      },
    ],
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ],
  Fy = ke('compass', My);
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
  $y = ke('globe', By);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qy = [
    ['line', { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' }],
    ['line', { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' }],
    ['line', { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' }],
    ['line', { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' }],
  ],
  Hl = ke('hash', qy);
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
  Sp = ke('headphone-off', Hy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vy = [
    ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        key: 'r6nss1',
      },
    ],
  ],
  Wy = ke('house', Vy);
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
  Ky = ke('image-off', Qy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yy = [
    ['path', { d: 'm10 17 5-5-5-5', key: '1bsop3' }],
    ['path', { d: 'M15 12H3', key: '6jk70r' }],
    ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', key: 'u53s6r' }],
  ],
  Xy = ke('log-in', Yy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jy = [
    ['rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2', key: '1w4ew1' }],
    ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
  ],
  Gy = ke('lock', Jy);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zy = [
    ['path', { d: 'M4 5h16', key: '1tepv9' }],
    ['path', { d: 'M4 12h16', key: '1lakjw' }],
    ['path', { d: 'M4 19h16', key: '1djgab' }],
  ],
  Kp = ke('menu', Zy);
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
  Yp = ke('message-square', e0);
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
  n0 = ke('mic', t0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r0 = [
    ['path', { d: 'M5 12h14', key: '1ays0h' }],
    ['path', { d: 'M12 5v14', key: 's699le' }],
  ],
  a0 = ke('plus', r0);
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
  o0 = ke('refresh-cw', s0);
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
  l0 = ke('settings', i0);
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
  ho = ke('shield', u0);
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
  Xp = ke('trash-2', c0);
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
  f0 = ke('triangle-alert', d0);
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
  h0 = ke('trophy', p0);
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
  eu = ke('users', m0);
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
  _p = ke('volume-2', g0);
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
  v0 = ke('vote', y0);
/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b0 = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  Jp = ke('x', b0),
  Ur = ({
    src: c,
    alt: o,
    fallbackSrc: i,
    showFallbackIcon: l = !0,
    className: m = '',
    onError: w,
    ...z
  }) => {
    const [I, C] = M.useState(!1),
      [S, R] = M.useState(c),
      A = H => {
        if ((w && w(H), i && S !== i)) {
          R(i);
          return;
        }
        C(!0);
      };
    return I
      ? l
        ? f.jsx('div', {
            className: `bg-discord-hover flex items-center justify-center ${m}`,
            role: 'img',
            'aria-label': o || 'Imagen no disponible',
            children: f.jsx(Ky, { className: 'text-discord-text-muted', size: 24 }),
          })
        : null
      : f.jsx('img', { src: S, alt: o, className: m, onError: A, loading: 'lazy', ...z });
  },
  Gp = M.memo(({ isOpen: c, onClose: o, currentUser: i, socket: l }) => {
    const [m, w] = M.useState(!1),
      [z, I] = M.useState(null);
    if (!c) return null;
    const C = async (S, R = !0) => {
      if (R && z !== S) {
        (I(S), setTimeout(() => I(null), 5e3));
        return;
      }
      (w(!0), I(null));
      try {
        switch (S) {
          case 'clear-users':
            i && l.emit('admin:clear-users', { adminId: i.id });
            break;
          case 'clear-messages':
            i && l.emit('admin:clear-all-messages', { adminId: i.id });
            break;
        }
      } catch (A) {
        console.error('Error ejecutando acción:', A);
      } finally {
        setTimeout(() => w(!1), 1e3);
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
                f.jsx(Vl, {
                  icon: f.jsx(Yp, { size: 18 }),
                  title: 'Limpiar Todos los Mensajes',
                  description: 'Borra el historial completo de mensajes de todos los canales',
                  onClick: () => C('clear-messages'),
                  isConfirming: z === 'clear-messages',
                  isLoading: m,
                  variant: 'danger',
                }),
                f.jsx(Vl, {
                  icon: f.jsx(Xp, { size: 18 }),
                  title: 'Reiniciar Usuarios y IPs',
                  description:
                    'Elimina todos los usuarios registrados y limpia sus IPs. Todos deberán volver a crear su usuario',
                  onClick: () => C('clear-users'),
                  isConfirming: z === 'clear-users',
                  isLoading: m,
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
  Vl = M.memo(
    ({
      icon: c,
      title: o,
      description: i,
      onClick: l,
      isConfirming: m,
      isLoading: w,
      variant: z,
    }) => {
      const I = {
        danger: 'bg-red-600 hover:bg-red-700 border-red-500',
        warning: 'bg-orange-600 hover:bg-orange-700 border-orange-500',
        info: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
        success: 'bg-green-600 hover:bg-green-700 border-green-500',
      };
      return f.jsx('button', {
        onClick: l,
        disabled: w,
        className: `w-full p-4 rounded-lg border-2 transition-all ${m ? 'bg-yellow-600 border-yellow-500 animate-pulse' : I[z]} ${w ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'} text-left`,
        children: f.jsxs('div', {
          className: 'flex items-start gap-3',
          children: [
            f.jsx('div', { className: 'text-white mt-0.5', children: c }),
            f.jsxs('div', {
              className: 'flex-1',
              children: [
                f.jsx('h4', {
                  className: 'text-white font-semibold mb-1',
                  children: m ? '⚠️ Confirmar - Clic nuevamente' : o,
                }),
                f.jsx('p', {
                  className: 'text-sm text-gray-200 opacity-90',
                  children: m
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
Vl.displayName = 'ActionButton';
Gp.displayName = 'AdminPanel';
var qt = (c => ((c.ADMIN = 'admin'), (c.USER = 'user'), c))(qt || {}),
  bt = (c => ((c.CHAT = 'CHAT'), (c.WHO_WE_ARE = 'WHO_WE_ARE'), (c.VOTING = 'VOTING'), c))(
    bt || {}
  );
const Wl = M.memo(({ currentUser: c, setCurrentUser: o, isConnected: i }) => {
  const [l, m] = M.useState(!1),
    w = (c == null ? void 0 : c.role) === qt.ADMIN,
    z = window.socketInstance;
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
      w &&
        f.jsxs(f.Fragment, {
          children: [
            f.jsx('div', { className: 'w-8 h-[2px] bg-discord-chat rounded-lg mx-auto mt-auto' }),
            f.jsx('button', {
              onClick: () => m(!0),
              className:
                'w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center',
              title: 'Panel de Administración',
              children: f.jsx(ho, { size: 24 }),
            }),
          ],
        }),
      w && f.jsx(Gp, { isOpen: l, onClose: () => m(!1), currentUser: c, socket: z }),
    ],
  });
});
Wl.displayName = 'Sidebar';
const k0 = ({
    activeView: c,
    currentChannelId: o,
    onChannelSelect: i,
    currentUser: l,
    activeVoiceChannel: m,
    onVoiceJoin: w,
    voiceStates: z,
    users: I,
  }) => {
    var C;
    const S = ({ id: A, name: H, description: $, icon: oe = Hl, view: Q = bt.CHAT }) => {
        const se = c === Q && (Q !== bt.CHAT || o === A);
        return f.jsxs('button', {
          onClick: () => i(Q, Q === bt.CHAT ? { id: A, name: H, description: $ } : void 0),
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
      R = ({ name: A }) => {
        const H = m === A,
          $ = I.filter(oe => z[oe.id] === A);
        return f.jsxs('div', {
          className: 'mb-1',
          children: [
            f.jsxs('div', {
              onClick: () => w(A),
              className: `w-full flex items-center px-2 py-[6px] rounded-md group transition-colors cursor-pointer ${H ? 'bg-discord-hover text-white' : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'}`,
              children: [
                f.jsx(_p, {
                  size: 20,
                  className: `mr-1.5 ${H ? 'text-green-500' : 'text-gray-400'}`,
                }),
                f.jsx('span', { className: 'font-medium truncate flex-1', children: A }),
              ],
            }),
            $.length > 0 &&
              f.jsx('div', {
                className: 'pl-8 pr-2 space-y-1 pb-1',
                children: $.map(oe =>
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
                f.jsx(R, { name: 'Plaza UPG' }),
              ],
            }),
          ],
        }),
        m &&
          f.jsxs('div', {
            className: 'bg-[#232428] border-b border-gray-800 p-2 shrink-0',
            children: [
              f.jsxs('div', {
                className:
                  'flex items-center justify-between text-green-400 text-xs font-bold px-1 mb-1',
                children: [
                  f.jsxs('span', {
                    className: 'flex items-center',
                    children: [f.jsx(_p, { size: 12, className: 'mr-1' }), ' Voz Conectada'],
                  }),
                  f.jsx('span', {
                    className: 'text-discord-text-muted font-normal cursor-pointer hover:underline',
                    children: m,
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
                    onClick: () => w(m),
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
                          ((C = l == null ? void 0 : l.id) == null ? void 0 : C.substring(0, 4)) ||
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
  Cp = M.memo(k0),
  Np = ({
    currentUser: c,
    users: o,
    currentChannel: i,
    onSendMessage: l,
    messages: m,
    onMenuToggle: w,
  }) => {
    const [z, I] = M.useState(''),
      [C, S] = M.useState(null),
      R = M.useRef(null),
      A = (c == null ? void 0 : c.role) === qt.ADMIN,
      H = () => window.socketInstance;
    M.useEffect(() => {
      var Q;
      (Q = R.current) == null || Q.scrollIntoView({ behavior: 'smooth' });
    }, [m]);
    const $ = Q => {
        (Q.preventDefault(), z.trim() && (l(z), I('')));
      },
      oe = () => {
        if (
          A &&
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
                  onClick: w,
                  className: 'md:hidden mr-3 text-discord-text-muted hover:text-white',
                  'aria-label': 'Abrir menú',
                  'aria-expanded': 'false',
                  children: f.jsx(Kp, { size: 24 }),
                }),
                f.jsx(Hl, { size: 24, className: 'text-discord-text-muted mr-2 shrink-0' }),
                f.jsx('span', { className: 'truncate', children: i.name }),
              ],
            }),
            A &&
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
                    children: f.jsx(Xp, { size: 18 }),
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
              m.map(Q => {
                const se = o.find(Pt => Pt.id === Q.userId),
                  $e = typeof Q.timestamp == 'string' ? new Date(Q.timestamp) : Q.timestamp;
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
                              (se == null ? void 0 : se.role) === qt.ADMIN &&
                                f.jsx('span', {
                                  className:
                                    'text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2',
                                  children: 'ADMIN',
                                }),
                              f.jsx('span', {
                                className: 'text-xs text-discord-text-muted ml-2 font-medium',
                                children: $e.toLocaleTimeString([], {
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
              f.jsx('div', { ref: R }),
            ],
          }),
        }),
        f.jsx('div', {
          className: 'px-4 pt-2 shrink-0',
          style: { paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' },
          children: f.jsx('div', {
            className: 'bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center',
            children: f.jsx('form', {
              onSubmit: $,
              className: 'flex-1 flex items-center',
              children: f.jsx('input', {
                type: 'text',
                value: z,
                onChange: Q => I(Q.target.value),
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
    const m = i.isGuest || i.username.startsWith('Invitado');
    return f.jsx('div', {
      className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4',
      onClick: o,
      children: f.jsxs('div', {
        className: 'bg-discord-sidebar rounded-lg shadow-xl max-w-md w-full overflow-hidden',
        onClick: w => w.stopPropagation(),
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
                      m &&
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
                  m &&
                    f.jsxs('button', {
                      onClick: l,
                      className:
                        'w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2',
                      children: [f.jsx(Xy, { size: 20 }), 'Iniciar sesión con Discord'],
                    }),
                  !m &&
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
                              i.role === 'admin' ? '👑 Admin' : m ? '🚶 Invitado' : '👤 Miembro',
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
  co = M.memo(({ user: c, isCurrentUser: o, onClick: i }) => {
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
const Ql = M.memo(({ users: c, currentUserId: o, isMobileView: i = !1, onLoginWithDiscord: l }) => {
  const [m, w] = M.useState(!1),
    [z, I] = M.useState(null),
    C = c.filter($ =>
      $.isBot ? !1 : $.online === !0 || ($.online === void 0 && $.status === 'online')
    ),
    S = c.filter($ => $.isBot),
    R = c.filter($ => ($.isBot ? !1 : $.online === !1 || $.status === 'offline')),
    A = $ => {
      $.id === o && (I($), w(!0));
    },
    H = () => {
      (w(!1), l && l());
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
                children: ['Disponible — ', C.length],
              }),
              C.map($ =>
                f.jsx(co, { user: $, isCurrentUser: $.id === o, onClick: () => A($) }, $.id)
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
              S.map($ => f.jsx(co, { user: $ }, $.id)),
            ],
          }),
          f.jsxs('div', {
            children: [
              f.jsxs('h2', {
                className: 'text-xs font-bold text-discord-text-muted uppercase mb-2 px-2',
                children: ['Desconectado — ', R.length],
              }),
              R.map($ =>
                f.jsx(co, { user: $, isCurrentUser: $.id === o, onClick: () => A($) }, $.id)
              ),
            ],
          }),
        ],
      }),
      z && f.jsx(w0, { isOpen: m, onClose: () => w(!1), user: z, onLoginWithDiscord: H }),
    ],
  });
});
Ql.displayName = 'UserList';
const Ep = () =>
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
                    children: f.jsx($y, { className: 'text-white', size: 28 }),
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
  Tp = () => {
    const c = M.useRef(null);
    return (
      M.useEffect(() => {
        let o = -50,
          i = 1,
          l;
        const m = () => {
          ((o += 0.6 * i),
            o >= 40 && (i = -1),
            o <= -50 && (i = 1),
            c.current && (c.current.style.transform = `rotate(${o}deg)`),
            (l = requestAnimationFrame(m)));
        };
        return (
          m(),
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
  x0 = 'fc0b2a5f6669b54193a2c3db48cd26c3a4649be6e9f7b7fb958df4aa39b05402',
  S0 = ({ onUnlock: c }) => {
    const [o, i] = M.useState(''),
      [l, m] = M.useState(!1),
      [w, z] = M.useState(!1),
      I = M.useRef(null);
    M.useEffect(() => {
      let S = -50,
        R = 1,
        A;
      const H = () => {
        ((S += 0.6 * R),
          S >= 40 && (R = -1),
          S <= -50 && (R = 1),
          I.current && (I.current.style.transform = `rotate(${S}deg)`),
          (A = requestAnimationFrame(H)));
      };
      return (
        H(),
        () => {
          A && cancelAnimationFrame(A);
        }
      );
    }, []);
    const C = async S => {
      (S.preventDefault(), m(!1), z(!0));
      try {
        const R = new TextEncoder().encode(o),
          A = await crypto.subtle.digest('SHA-256', R);
        Array.from(new Uint8Array(A))
          .map(H => H.toString(16).padStart(2, '0'))
          .join('') === x0
          ? setTimeout(() => {
              c();
            }, 500)
          : (m(!0), z(!1));
      } catch (R) {
        (console.error('Crypto error', R), m(!0), z(!1));
      }
    };
    return f.jsxs('div', {
      className:
        'fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden w-full h-full',
      style: { backgroundColor: '#ffcc17' },
      children: [
        f.jsx('img', {
          ref: I,
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
          onSubmit: C,
          className: 'w-full max-w-xs flex flex-col items-center relative z-10',
          children: [
            f.jsxs('div', {
              className: 'relative w-full',
              children: [
                f.jsx('div', {
                  className: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
                  children: f.jsx(Gy, { size: 20, className: 'text-[#ff4d0a]' }),
                }),
                f.jsx('input', {
                  type: 'password',
                  value: o,
                  onChange: S => {
                    (i(S.target.value), l && m(!1));
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
                  f.jsx(Qp, { size: 16, className: 'mr-1' }),
                  f.jsx('span', { children: 'Contraseña incorrecta' }),
                ],
              }),
            f.jsx('button', {
              type: 'submit',
              disabled: w,
              className:
                'mt-6 flex items-center justify-center px-8 py-3 border-transparent text-base font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed',
              style: { fontFamily: '"Arial Black", Arial, sans-serif' },
              'aria-label': w ? 'Verificando contraseña' : 'Acceder',
              children: w
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
                    children: ['ACCEDER', f.jsx(Iy, { size: 20, className: 'ml-2' })],
                  }),
            }),
          ],
        }),
      ],
    });
  };
class Zp extends M.Component {
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
const eh = M.memo(({ activeTab: c, onTabChange: o, unreadCount: i = 0 }) =>
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
            f.jsx(Yp, {
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
const _0 = 30,
  Me = {
    ACCESS_TOKEN: 'upg_access_token',
    CURRENT_USER: 'upg_current_user',
    USER_ID: 'upg_user_id',
    USERNAME: 'upg_username',
    AVATAR: 'upg_avatar',
    ROLE: 'upg_role',
  };
function C0() {
  return document.cookie.split('; ').reduce((c, o) => {
    const [i, l] = o.split('=');
    return (i && l && (c[i] = l), c);
  }, {});
}
function Ua(c, o, i = _0) {
  const l = new Date();
  l.setTime(l.getTime() + i * 24 * 60 * 60 * 1e3);
  const m = `expires=${l.toUTCString()}`;
  document.cookie = `${c}=${o}; ${m}; path=/`;
}
function N0() {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}
function Ia(c) {
  (Ua(Me.USER_ID, c.id),
    Ua(Me.USERNAME, encodeURIComponent(c.username)),
    Ua(Me.AVATAR, encodeURIComponent(c.avatar)),
    Ua(Me.ROLE, c.role || qt.USER),
    localStorage.setItem(Me.CURRENT_USER, JSON.stringify(c)));
}
function jp() {
  const c = C0();
  if (c[Me.USERNAME] && c[Me.AVATAR]) {
    const i = decodeURIComponent(c[Me.USERNAME]),
      l = c[Me.ROLE] || qt.USER,
      m = l === qt.ADMIN;
    return {
      id: c[Me.USER_ID] || `user-${Date.now()}`,
      username: i,
      avatar: decodeURIComponent(c[Me.AVATAR]),
      status: 'online',
      color: m ? '#ff4d0a' : '#3ba55c',
      role: l,
    };
  }
  const o = localStorage.getItem(Me.CURRENT_USER);
  if (o)
    try {
      return JSON.parse(o);
    } catch (i) {
      return (console.error('Error parseando datos de usuario:', i), null);
    }
  return null;
}
function E0(c) {
  Ua(Me.ROLE, c);
  const o = localStorage.getItem(Me.CURRENT_USER);
  if (o)
    try {
      const i = JSON.parse(o);
      ((i.role = c),
        (i.color = c === qt.ADMIN ? '#ff4d0a' : '#3ba55c'),
        localStorage.setItem(Me.CURRENT_USER, JSON.stringify(i)));
    } catch (i) {
      console.error('Error actualizando rol en localStorage:', i);
    }
}
function T0() {
  return localStorage.getItem(Me.ACCESS_TOKEN) === 'granted';
}
function j0(c) {
  localStorage.setItem(Me.ACCESS_TOKEN, 'granted');
}
function Pp() {
  (localStorage.removeItem(Me.ACCESS_TOKEN), localStorage.removeItem(Me.CURRENT_USER), N0());
}
function P0(c, o = 50) {
  const i = M.useRef(null),
    l = M.useRef(null),
    m = o,
    w = C => {
      ((l.current = null),
        (i.current = { x: C.targetTouches[0].clientX, y: C.targetTouches[0].clientY }));
    },
    z = C => {
      l.current = { x: C.targetTouches[0].clientX, y: C.targetTouches[0].clientY };
    },
    I = () => {
      if (!i.current || !l.current) return;
      const C = i.current.x - l.current.x,
        S = i.current.y - l.current.y;
      (Math.abs(C) > Math.abs(S)
        ? (C > m && c.onSwipeLeft && c.onSwipeLeft(), C < -m && c.onSwipeRight && c.onSwipeRight())
        : (S > m && c.onSwipeUp && c.onSwipeUp(), S < -m && c.onSwipeDown && c.onSwipeDown()),
        (i.current = null),
        (l.current = null));
    };
  return (
    M.useEffect(() => {
      const C = document.body;
      return (
        C.addEventListener('touchstart', w, { passive: !0 }),
        C.addEventListener('touchmove', z, { passive: !0 }),
        C.addEventListener('touchend', I, { passive: !0 }),
        () => {
          (C.removeEventListener('touchstart', w),
            C.removeEventListener('touchmove', z),
            C.removeEventListener('touchend', I));
        }
      );
    }, [c]),
    null
  );
}
const Rp = {
    id: 'bot',
    username: 'UPG',
    avatar: '/upg.png',
    status: 'online',
    isBot: !0,
    color: '#5865F2',
  },
  R0 = 'https://mensajeria-ksc7.onrender.com',
  z0 = {
    transports: ['websocket', 'polling'],
    reconnection: !0,
    reconnectionDelay: 1e3,
    reconnectionAttempts: 5,
    timeout: 1e4,
  };
function L0() {
  const [c, o] = M.useState(!0),
    [i, l] = M.useState(!1),
    [m, w] = M.useState(!1),
    [z, I] = M.useState(bt.CHAT),
    [C, S] = M.useState({ id: 'general', name: 'general', description: 'Chat general' }),
    [R, A] = M.useState(() => {
      const p = jp();
      if (p && p.id && !p.username.startsWith('Guest'))
        return { ...p, online: !0, status: 'online' };
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
      return (Ia(P), P);
    }),
    [H, $] = M.useState([]),
    [oe, Q] = M.useState({}),
    [se, $e] = M.useState(null),
    [Pt, je] = M.useState(!1),
    [Ce, Pe] = M.useState('chat'),
    [qe, J] = M.useState({}),
    [xe, lt] = M.useState(!1),
    Ie = M.useRef(null),
    Je = 'https://mensajeria-ksc7.onrender.com';
  M.useEffect(() => {
    (async () => {
      try {
        const p = new URLSearchParams(window.location.search),
          y = p.get('auth'),
          P = p.get('error_code'),
          L = p.get('error_description');
        if (y === 'error') {
          (console.error('❌ Discord OAuth error:', P, L),
            alert(`Error de autenticación: ${decodeURIComponent(L || 'Error desconocido')}`),
            window.history.replaceState({}, document.title, '/'));
          return;
        }
        if (y === 'success') {
          (console.log('✅ Received Discord OAuth callback, fetching user from backend...'),
            window.history.replaceState({}, document.title, '/'));
          const V = await fetch(`${Je}/auth/user`, {
            credentials: 'include',
            headers: { Accept: 'application/json' },
          });
          if (V.ok) {
            const G = await V.json();
            console.log('✅ Discord user session found:', G);
            const De = {
              id: G.id,
              username: G.username,
              avatar: G.avatar
                ? `https://cdn.discordapp.com/avatars/${G.id}/${G.avatar}.png`
                : `https://ui-avatars.com/api/?name=${G.username.charAt(0)}&background=5865F2&color=fff&size=200`,
              status: 'online',
              online: !0,
              color: '#5865F2',
              isGuest: !1,
            };
            (A(De), Ia(De), w(!0), console.log('✅ Usuario Discord autenticado:', De.username));
            return;
          }
        }
        const D = jp();
        D && D.id && !D.username.startsWith('Invitado') && !D.id.startsWith('guest-')
          ? (console.log('📦 Using cached Discord user from localStorage:', D.username),
            A(D),
            w(!0))
          : (console.log('👤 Entrando como invitado'), w(!1));
      } catch (p) {
        console.error('❌ Error checking auth:', p);
      }
    })();
  }, [Je]);
  const Ye = M.useCallback(() => {
    j0();
  }, []);
  (M.useEffect(() => {
    if (!c || !R) return;
    let p = Ie.current;
    return (
      p || ((p = uo(R0, z0)), (Ie.current = p), (window.socketInstance = p)),
      p.removeAllListeners(),
      p.on('connect', () => {
        (console.log('🔌 Conectado a Socket.IO - ID:', p.id),
          lt(!0),
          p.emit('user:join', { ...R, socketId: p.id }),
          p.emit('users:request'),
          p.emit('channel:join', { channelId: C.id, userId: R.id }));
      }),
      p.on('disconnect', () => {
        (console.log('⛔ Desconectado de Socket.IO'), lt(!1));
      }),
      p.on('reconnect', y => {
        (console.log(`✅ Reconectado después de ${y} intentos`),
          p.emit('user:join', { ...R, socketId: p.id }),
          p.emit('users:request'));
      }),
      p.on('users:list', y => {
        (console.log('👥 Lista de usuarios recibida:', y), R && $(y.filter(P => P.id !== R.id)));
      }),
      p.on('users:update', y => {
        (console.log('🔄 Usuarios actualizados:', y.length), R && $(y.filter(P => P.id !== R.id)));
      }),
      p.on('user:online', y => {
        (console.log('✅ Usuario online:', y.username),
          R &&
            y.id !== R.id &&
            $(P => {
              const L = P.findIndex(D => D.id === y.id);
              if (L !== -1) {
                const D = [...P];
                return ((D[L] = { ...D[L], online: !0, status: 'online' }), D);
              } else return [...P, { ...y, online: !0, status: 'online' }];
            }));
      }),
      p.on('user:offline', ({ userId: y, username: P }) => {
        (console.log('⚫ Usuario offline:', P),
          $(L => {
            const D = L.findIndex(V => V.id === y);
            if (D !== -1) {
              const V = [...L];
              return ((V[D] = { ...V[D], online: !1, status: 'offline' }), V);
            }
            return L;
          }));
      }),
      p.on('channel:history', ({ channelId: y, messages: P }) => {
        J(L => ({ ...L, [y]: P }));
      }),
      p.on('message:received', y => {
        J(P => ({ ...P, [y.channelId]: [...(P[y.channelId] || []), y] }));
      }),
      p.on('voice:update', ({ userId: y, channelName: P, action: L }) => {
        Q(D => {
          const V = { ...D };
          return (L === 'join' && P ? (V[y] = P) : delete V[y], V);
        });
      }),
      p.on('message:deleted', ({ messageId: y, channelId: P }) => {
        J(L => ({ ...L, [P]: (L[P] || []).filter(D => D.id !== y) }));
      }),
      p.on('channel:cleared', ({ channelId: y }) => {
        J(P => ({ ...P, [y]: [] }));
      }),
      p.on('user:banned', ({ userId: y, username: P }) => {
        (console.log(`🔨 Usuario ${P} ha sido baneado`), $(L => L.filter(D => D.id !== y)));
      }),
      p.on('banned', ({ reason: y }) => {
        (alert(`Has sido baneado del servidor.
Razón: ${y}`),
          Pp(),
          window.location.reload());
      }),
      p.on('kicked', ({ reason: y }) => {
        (alert(`${y}`), window.location.reload());
      }),
      p.on('username:taken', ({ message: y }) => {
        (alert(y), Pp(), window.location.reload());
      }),
      p.on('admin:action-success', ({ action: y, message: P }) => {
        (console.log(`✅ Admin action ${y}: ${P}`), alert(`✅ ${P}`));
      }),
      p.on('admin:notification', ({ message: y }) => {
        console.log(`📢 Admin notification: ${y}`);
      }),
      p.on('admin:export-data-result', ({ data: y }) => {
        const P = new Blob([JSON.stringify(y, null, 2)], { type: 'application/json' }),
          L = URL.createObjectURL(P),
          D = document.createElement('a');
        ((D.href = L),
          (D.download = `upg-server-backup-${new Date().toISOString()}.json`),
          document.body.appendChild(D),
          D.click(),
          document.body.removeChild(D),
          URL.revokeObjectURL(L),
          alert('✅ Backup descargado correctamente'));
      }),
      p.on('server:restarting', ({ message: y }) => {
        (console.log(`🔄 ${y}`), alert(y));
      }),
      p.on('user:registered', y => {
        (console.log('✅ Registro confirmado por servidor:', y),
          A(P => ({ ...P, ...y, color: y.role === qt.ADMIN ? '#ff4d0a' : '#3ba55c' })),
          Ia(y));
      }),
      p.on('role:updated', ({ role: y }) => {
        (A(P => {
          const L = y === qt.ADMIN,
            D = { ...P, role: y, color: L ? '#ff4d0a' : '#3ba55c' };
          return (E0(y), Ia(D), D);
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
          (!c || !R) &&
            (p.disconnect(),
            (Ie.current = null),
            console.log('🔌 Socket desconectado y limpiado')));
      }
    );
  }, [c, R, C.id]),
    M.useEffect(() => {
      if (!xe || !Ie.current) return;
      const p = setInterval(() => {
        var y;
        ((y = Ie.current) == null || y.emit('users:request'),
          console.log('🔄 Solicitando actualización de usuarios...'));
      }, 3e4);
      return () => clearInterval(p);
    }, [xe]),
    M.useEffect(() => {
      !c ||
        !Ie.current ||
        (se
          ? Ie.current.emit('voice:join', { channelName: se, userId: R.id })
          : Ie.current.emit('voice:leave', { channelName: null, userId: R.id }),
        Q(p => {
          const y = { ...p };
          return (se ? (y[R.id] = se) : delete y[R.id], y);
        }));
    }, [se, R, c]),
    M.useEffect(() => {
      R && Ia(R);
    }, [R]));
  const Ze = M.useMemo(() => {
      const p = new Map();
      return (
        p.set(Rp.id, Rp),
        H.forEach(y => p.set(y.id, y)),
        R && p.set(R.id, R),
        Array.from(p.values())
      );
    }, [H, R]),
    kt = M.useMemo(() => qe[C.id] || [], [qe, C.id]),
    et = M.useCallback(
      (p, y) => {
        (I(p),
          y &&
            y.id !== C.id &&
            (S(y),
            Ie.current &&
              xe &&
              R &&
              Ie.current.emit('channel:join', { channelId: y.id, userId: R.id })),
          je(!1));
      },
      [xe, R, C.id]
    ),
    E = M.useCallback(p => {
      $e(y => (y === p ? null : p));
    }, []),
    O = M.useCallback(
      p => {
        if (!Ie.current || !xe || !R) {
          console.error('❌ Socket no conectado o usuario no disponible');
          return;
        }
        Ie.current.emit('message:send', {
          channelId: C.id,
          content: p,
          userId: R.id,
          username: R.username,
          avatar: R.avatar,
          timestamp: new Date().toISOString(),
        });
      },
      [xe, C.id, R]
    ),
    q = M.useCallback(() => {
      je(p => !p);
    }, []);
  M.useCallback(() => {
    je(!1);
  }, []);
  const ce = M.useCallback(p => {
      Pe(p);
    }, []),
    de = M.useCallback(() => {
      window.location.href = `${Je}/auth/discord`;
    }, [Je]);
  return (
    P0({
      onSwipeLeft: () => {
        window.innerWidth < 768 && (Ce === 'channels' ? Pe('chat') : Ce === 'chat' && Pe('users'));
      },
      onSwipeRight: () => {
        window.innerWidth < 768 && (Ce === 'users' ? Pe('chat') : Ce === 'chat' && Pe('channels'));
      },
    }),
    T0()
      ? f.jsx(Zp, {
          children: f.jsxs('div', {
            className:
              'flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative',
            children: [
              f.jsxs('div', {
                className: 'hidden md:flex h-full w-full',
                children: [
                  f.jsx(Wl, { currentUser: R, setCurrentUser: A, isConnected: xe }),
                  f.jsx(Cp, {
                    activeView: z,
                    currentChannelId: C.id,
                    onChannelSelect: et,
                    currentUser: R,
                    activeVoiceChannel: se,
                    onVoiceJoin: E,
                    voiceStates: oe,
                    users: Ze,
                  }),
                  f.jsxs('div', {
                    className: 'flex flex-1 min-w-0 relative',
                    children: [
                      z === bt.CHAT &&
                        f.jsxs(f.Fragment, {
                          children: [
                            f.jsx(Np, {
                              currentUser: R,
                              users: Ze,
                              currentChannel: C,
                              onSendMessage: O,
                              messages: kt,
                              onMenuToggle: q,
                            }),
                            f.jsx(Ql, { users: Ze, currentUserId: R.id, onLoginWithDiscord: de }),
                          ],
                        }),
                      z === bt.WHO_WE_ARE && f.jsx(Ep, { onMenuToggle: q }),
                      z === bt.VOTING && f.jsx(Tp, { onMenuToggle: q }),
                    ],
                  }),
                ],
              }),
              f.jsxs('div', {
                className: 'flex md:hidden h-full w-full flex-col relative overflow-hidden',
                style: { paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' },
                children: [
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ce === 'channels' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex h-full w-full overflow-hidden',
                      children: [
                        f.jsx(Wl, { currentUser: R, setCurrentUser: A, isConnected: xe }),
                        f.jsx(Cp, {
                          activeView: z,
                          currentChannelId: C.id,
                          onChannelSelect: (p, y) => {
                            (et(p, y), Pe('chat'));
                          },
                          currentUser: R,
                          activeVoiceChannel: se,
                          onVoiceJoin: E,
                          voiceStates: oe,
                          users: Ze,
                        }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ce === 'chat' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsxs('div', {
                      className: 'flex flex-1 min-w-0 relative h-full',
                      children: [
                        z === bt.CHAT &&
                          f.jsx(Np, {
                            currentUser: R,
                            users: Ze,
                            currentChannel: C,
                            onSendMessage: O,
                            messages: kt,
                            onMenuToggle: () => Pe('channels'),
                          }),
                        z === bt.WHO_WE_ARE && f.jsx(Ep, { onMenuToggle: () => Pe('channels') }),
                        z === bt.VOTING && f.jsx(Tp, { onMenuToggle: () => Pe('channels') }),
                      ],
                    }),
                  }),
                  f.jsx('div', {
                    className: `absolute inset-0 transition-all duration-300 ease-out pb-16 ${Ce === 'users' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'}`,
                    children: f.jsx('div', {
                      className: 'h-full w-full overflow-hidden',
                      children: f.jsx(Ql, {
                        users: Ze,
                        currentUserId: R.id,
                        isMobileView: !0,
                        onLoginWithDiscord: de,
                      }),
                    }),
                  }),
                  f.jsx(eh, { activeTab: Ce, onTabChange: ce }),
                ],
              }),
            ],
          }),
        })
      : f.jsx(S0, { onUnlock: Ye })
  );
}
const th = document.getElementById('root');
if (!th) throw new Error('Could not find root element to mount to');
const A0 = Ig.createRoot(th);
A0.render(f.jsx(Tg.StrictMode, { children: f.jsx(Zp, { children: f.jsx(L0, {}) }) }));
