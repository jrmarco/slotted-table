import { ref as A, defineComponent as W, computed as o, openBlock as s, createElementBlock as r, normalizeClass as i, Fragment as $, renderList as L, normalizeStyle as K, createElementVNode as p, createTextVNode as q, toDisplayString as h, withDirectives as G, vModelSelect as J, createCommentVNode as Q, toRefs as X, onMounted as Y, createBlock as ee, createVNode as z, renderSlot as te } from "vue";
const se = {
  pleaseWait: "Caricamento",
  noResults: "Nessun risultato",
  rowsPerPage: "Righe per pagina:",
  of: "di"
}, U = {
  pleaseWait: "Loading",
  noResults: "No results",
  rowsPerPage: "Rows per page:",
  of: "of"
}, ae = {
  pleaseWait: "Chargement",
  noResults: "Aucun résultat",
  rowsPerPage: "Lignes par page:",
  of: "sur"
}, re = {
  pleaseWait: "Laden",
  noResults: "Keine Ergebnisse",
  rowsPerPage: "Zeilen pro Seite:",
  of: "von"
}, ne = (t) => {
  switch (t) {
    case "it":
      return se;
    case "en":
      return U;
    case "fr":
      return ae;
    case "de":
      return re;
    default:
      return U;
  }
}, e = A({
  language: "en",
  trs: {},
  loading: !0,
  columns: [],
  ordering: {
    sortBy: "id",
    sortType: "desc"
  },
  startIndex: 1,
  endIndex: 1,
  page: 1,
  rowsPerPage: 10,
  totalItems: 0,
  styles: {}
}), oe = (t) => {
  const { styles: u } = e.value;
  if (!Object.keys(u).length)
    return "";
  function g(P) {
    return [
      "container",
      "header",
      "body",
      "footer",
      "row",
      "cell",
      "pageselector",
      "pagebtns"
    ].includes(P);
  }
  return g(t) && u[t] || "";
}, j = (t) => {
  const u = new Date(t);
  return !isNaN(u.getTime()) && t === u.toISOString().split("T")[0] ? u.getTime() : !1;
}, le = (t) => isNaN(Number(t)) ? j(t) ? j(t) : t : Number(t), v = {
  getStyle: oe,
  castToType: le
}, ue = ["onClick", "title"], ce = ["innerHTML"], ie = /* @__PURE__ */ W({
  __name: "TableHeader",
  emits: ["update"],
  setup(t, { emit: u }) {
    const g = u, P = o(() => e.value.columns), C = o(() => [
      "row",
      "header",
      v.getStyle("row"),
      v.getStyle("header")
    ]), T = (a) => [
      "cell",
      a.sortable ? "pointer" : "",
      v.getStyle("cell")
    ], B = (a) => {
      if (!a || !a.value || !a.sortable) return;
      const { sortBy: d, sortType: n } = e.value.ordering;
      e.value.ordering.sortType = d === a.value && n === "asc" ? "desc" : "asc", e.value.ordering.sortBy = a.value, g("update");
    }, I = (a) => ({
      width: a.width ? `${a.width}px` : "auto"
    }), b = (a) => {
      const { sortBy: d, sortType: n } = e.value.ordering;
      return d !== a ? "" : !n || n === "asc" ? "&uarr;" : "&darr;";
    };
    return (a, d) => (s(), r("div", {
      class: i(C.value)
    }, [
      (s(!0), r($, null, L(P.value, (n, N) => (s(), r("div", {
        key: n.value || N,
        onClick: (M) => B(n),
        class: i(T(n)),
        style: K(I(n)),
        title: n.text
      }, [
        p("b", null, [
          q(h(n.text) + " ", 1),
          p("span", {
            innerHTML: b(n.value)
          }, null, 8, ce)
        ])
      ], 14, ue))), 128))
    ], 2));
  }
}), de = ["value"], ve = ["onClick"], pe = { key: 1 }, ge = /* @__PURE__ */ W({
  __name: "TableFooter",
  emits: ["update"],
  setup(t, { emit: u }) {
    const g = u, P = o(() => [5, 10, 25, 50]), C = o(() => {
      const { totalItems: y, rowsPerPage: k, page: l } = e.value;
      if (!y) return [];
      const w = Math.ceil(y / k), f = l;
      if (w <= 4)
        return Array.from({ length: w }, (E, F) => F + 1);
      const S = [1];
      return f > 3 && S.push("..."), f > 2 && S.push(f - 1), f !== 1 && f !== w && S.push(f), f < w - 1 && S.push(f + 1), f < w - 2 && S.push("..."), S.push(w), S;
    }), T = o({
      get() {
        return e.value.rowsPerPage;
      },
      set(y) {
        e.value.rowsPerPage = y;
      }
    }), B = o(() => e.value.startIndex), I = o(() => e.value.endIndex), b = o(() => e.value.totalItems), a = o(() => e.value.page), d = async (y) => {
      !Number.isInteger(y) || y < 1 || (e.value.page = y, g("update"));
    }, n = o(() => e.value.trs), N = o(() => ["pageselector", v.getStyle("pageselector")]), M = o(() => ["pagebtns", v.getStyle("pagebtns")]);
    return (y, k) => (s(), r($, null, [
      p("div", {
        class: i(N.value)
      }, [
        q(h(n.value.rowsPerPage) + " ", 1),
        G(p("select", {
          class: "select",
          "onUpdate:modelValue": k[0] || (k[0] = (l) => T.value = l),
          onChange: k[1] || (k[1] = (l) => d(1))
        }, [
          (s(!0), r($, null, L(P.value, (l) => (s(), r("option", {
            key: l,
            value: l
          }, h(l), 9, de))), 128))
        ], 544), [
          [J, T.value]
        ])
      ], 2),
      p("div", null, h(B.value) + "-" + h(I.value) + " " + h(n.value.of) + " " + h(b.value || 0), 1),
      b.value > T.value ? (s(), r("div", {
        key: 0,
        class: i(M.value)
      }, [
        (s(!0), r($, null, L(C.value, (l) => (s(), r($, { key: l }, [
          typeof l == "number" ? (s(), r("button", {
            key: 0,
            class: i({ active: Number(l) === Number(a.value) }),
            onClick: (w) => d(l)
          }, h(l), 11, ve)) : (s(), r("span", pe, "  "))
        ], 64))), 128))
      ], 2)) : Q("", !0)
    ], 64));
  }
}), ye = {
  width: "100",
  height: "100",
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
}, fe = /* @__PURE__ */ p("circle", {
  cx: "50",
  cy: "50",
  r: "40",
  stroke: "#007bff",
  "stroke-width": "6",
  fill: "none",
  "stroke-dasharray": "251.2",
  "stroke-dashoffset": "251.2"
}, [
  /* @__PURE__ */ p("animate", {
    attributeName: "stroke-dashoffset",
    from: "251.2",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  }),
  /* @__PURE__ */ p("animate", {
    attributeName: "opacity",
    from: "1",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  })
], -1), me = {
  x: "50%",
  y: "60%",
  "text-anchor": "middle",
  "font-size": "10px",
  fill: "#007bff"
}, we = /* @__PURE__ */ W({
  __name: "SpinnerItem",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  setup(t) {
    return (u, g) => (s(), r("svg", ye, [
      fe,
      p("text", me, h(t.text), 1)
    ]));
  }
}), _e = { key: 1 }, he = /* @__PURE__ */ W({
  __name: "SlottedTable",
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: !0
    },
    items: { type: Array, default: () => [] },
    styles: { type: Object, default: () => ({}) },
    language: { type: String, default: "en" },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callBack: { type: Function, default: null }
  },
  setup(t, { expose: u }) {
    const g = t, { headers: P, items: C, styles: T, language: B, callBack: I } = X(g), b = A(!1), a = A([]), d = A([]), n = A(ne(B.value)), N = async () => {
      if (!I.value) return;
      const { page: c, rowsPerPage: m, ordering: x } = e.value, { sortBy: V, sortType: _ } = x, R = {
        page: c,
        rowsPerPage: m,
        sortBy: V,
        sortType: _
      }, D = await I.value(R);
      D != null && D.rows && D.totalRows && (a.value = D.rows, e.value.totalItems = D.totalRows);
    }, M = () => {
      const { sortBy: c, sortType: m } = e.value.ordering;
      d.value.sort((x, V) => {
        const _ = v.castToType(x[c]), R = v.castToType(V[c]);
        return _ < R ? m === "asc" ? -1 : 1 : _ > R ? m === "asc" ? 1 : -1 : 0;
      });
    }, y = () => {
      const { page: c, rowsPerPage: m } = e.value;
      a.value = d.value.slice(
        (c - 1) * m,
        c * m
      );
    }, k = () => {
      const { page: c, rowsPerPage: m, totalItems: x } = e.value;
      e.value.startIndex = (c - 1) * m + 1, e.value.endIndex = Math.min(c * m, x);
    }, l = (c) => ({
      width: c.width ? `${c.width}px` : "auto"
    }), w = o(() => e.value.loading), f = o(() => e.value.columns), S = o(() => [
      "slottedtable",
      v.getStyle("container")
    ]), E = o(() => [
      "body",
      v.getStyle("body")
    ]), F = o(() => [
      "row",
      v.getStyle("row")
    ]), H = o(() => [
      "cell",
      v.getStyle("cell")
    ]), Z = o(() => [
      "footer",
      v.getStyle("footer")
    ]);
    Y(async () => {
      e.value.trs = n, e.value.language = B.value, e.value.columns = P.value, e.value.styles = T.value, b.value = !!I.value, b.value || (d.value = C.value, e.value.totalItems = d.value.length), await O();
    });
    const O = async () => {
      e.value.loading = !0, b.value ? await N() : (M(), y()), k(), e.value.loading = !1;
    };
    return u({ reloadTable: O }), (c, m) => (s(), r("div", {
      class: i(S.value)
    }, [
      w.value || !a.value.length ? (s(), r("div", {
        key: 0,
        class: i(E.value)
      }, [
        p("div", {
          class: i(F.value)
        }, [
          p("div", {
            class: i(H.value)
          }, [
            w.value ? (s(), ee(we, {
              key: 0,
              text: n.value.pleaseWait
            }, null, 8, ["text"])) : (s(), r("span", _e, h(n.value.noResults), 1))
          ], 2)
        ], 2)
      ], 2)) : (s(), r("div", {
        key: 1,
        class: i(E.value)
      }, [
        z(ie, { onUpdate: O }),
        (s(!0), r($, null, L(a.value, (x, V) => (s(), r("div", {
          key: x.id || V,
          class: i(F.value)
        }, [
          (s(!0), r($, null, L(f.value, (_, R) => (s(), r("div", {
            key: _.value || R,
            class: i(H.value),
            style: K(l(_))
          }, [
            te(c.$slots, "default", {
              column: _.value,
              cellData: x[_.value] || _.empty,
              data: x
            }, void 0, !0)
          ], 6))), 128))
        ], 2))), 128))
      ], 2)),
      p("div", {
        class: i(Z.value)
      }, [
        z(ge, { onUpdate: O })
      ], 2)
    ], 2));
  }
}), Pe = (t, u) => {
  const g = t.__vccOpts || t;
  for (const [P, C] of u)
    g[P] = C;
  return g;
}, Se = /* @__PURE__ */ Pe(he, [["__scopeId", "data-v-d22a67cd"]]);
typeof window < "u" && window.Vue && window.Vue.createApp({}).component("SlottedTable", Se);
export {
  Se as default
};
