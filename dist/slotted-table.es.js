import { ref as N, defineComponent as O, computed as l, openBlock as n, createElementBlock as c, normalizeClass as S, Fragment as F, renderList as L, normalizeStyle as ae, createTextVNode as q, toDisplayString as C, createElementVNode as m, withDirectives as ne, vModelSelect as ge, createCommentVNode as W, withKeys as he, vModelText as ye, createBlock as oe, toRefs as Se, onMounted as me, createVNode as H, renderSlot as te } from "vue";
const _e = {
  pleaseWait: "Caricamento",
  noResults: "Nessun risultato",
  rowsPerPage: "Righe per pagina:",
  of: "di",
  filter: "Filtro",
  search: "Cerca",
  activefilters: "Ricerca attiva",
  bulkActions: "Azioni in blocco",
  selectAll: "Seleziona tutto",
  selectCurrentPageElement: "Seleziona tutti gli elementi in questa pagina"
}, le = {
  pleaseWait: "Loading",
  noResults: "No results",
  rowsPerPage: "Rows per page:",
  of: "of",
  filter: "Filter",
  search: "Search",
  activefilters: "Active search",
  bulkActions: "Selected",
  selectAll: "Select all",
  selectCurrentPageElement: "Select all elements in this page",
  unselectAll: "Unselect all"
}, ke = {
  pleaseWait: "Chargement",
  noResults: "Aucun résultat",
  rowsPerPage: "Lignes par page:",
  of: "sur",
  filter: "Filtrer",
  search: "Rechercher",
  activefilters: "Recherche active",
  bulkActions: "Actions en masse",
  selectAll: "Tout sélectionner",
  selectCurrentPageElement: "",
  allSelected: "Sélectionner tous les éléments sur cette page"
}, we = {
  pleaseWait: "Laden",
  noResults: "Keine Ergebnisse",
  rowsPerPage: "Zeilen pro Seite:",
  of: "von",
  filter: "Filter",
  search: "Suche",
  activefilters: "Aktive Suche",
  bulkActions: "Massenaktionen",
  selectAll: "Alle auswählen",
  selectCurrentPageElement: "Alle Elemente auf dieser Seite auswählen"
}, be = (v) => {
  switch (v) {
    case "it":
      return _e;
    case "en":
      return le;
    case "fr":
      return ke;
    case "de":
      return we;
    default:
      return le;
  }
}, e = N({
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
  styles: {},
  filters: [],
  prevFilters: [],
  selection: [],
  selector: !1,
  selectorColIdentifier: "",
  allSelected: !1
}), Ce = (v) => {
  const { styles: y } = e.value;
  if (!Object.keys(y).length)
    return "";
  function g(h) {
    return [
      "container",
      "header",
      "body",
      "footer",
      "row",
      "cell",
      "pageselector",
      "pagebtns",
      "filter",
      "filteractions",
      "activefilter",
      "searchbutton",
      "filterbutton"
    ].includes(h);
  }
  return g(v) && y[v] || "";
}, se = (v) => {
  const y = new Date(v);
  return !isNaN(y.getTime()) && v === y.toISOString().split("T")[0] ? y.getTime() : !1;
}, xe = (v) => isNaN(Number(v)) ? se(v) ? se(v) : v : Number(v), b = {
  getStyle: Ce,
  castToType: xe
}, Ie = ["onClick", "title"], Te = { key: 0 }, Pe = ["innerHTML"], Ae = ["title", "checked", "disabled"], $e = /* @__PURE__ */ O({
  __name: "TableHeader",
  emits: ["update", "updateSelection"],
  setup(v, { emit: y }) {
    const g = y, h = l(() => e.value.columns), x = l(() => e.value.selectorColIdentifier), I = l(() => e.value.trs), D = l(() => e.value.allSelected), B = l(() => [
      "st-row",
      "st-header",
      b.getStyle("row"),
      b.getStyle("header")
    ]), T = (p) => [
      "st-cell",
      p.sortable ? "st-pointer" : "",
      b.getStyle("cell")
    ], U = (p) => {
      if (!p || !p.value || !p.sortable) return;
      const { sortBy: d, sortType: o } = e.value.ordering;
      e.value.ordering.sortType = d === p.value && o === "asc" ? "desc" : "asc", e.value.ordering.sortBy = p.value, g("update");
    }, $ = (p) => ({
      width: p.width ? `${p.width}px` : "auto"
    }), _ = (p) => {
      const { sortBy: d, sortType: o } = e.value.ordering;
      return d !== p ? "" : !o || o === "asc" ? "&uarr;" : "&darr;";
    }, P = (p) => {
      const d = p.target;
      if (!d)
        return;
      let o = document.querySelectorAll(".st-row-selector");
      const f = [];
      o.forEach((k) => {
        const u = k;
        u.checked = d.checked, f.push(u.id);
      }), f.forEach((k) => {
        d.checked ? e.value.selection.indexOf(k) === -1 && e.value.selection.push(k) : e.value.selection = e.value.selection.filter(
          (u) => u !== k
        );
      }), g("updateSelection");
    };
    return (p, d) => (n(), c("div", {
      class: S(B.value)
    }, [
      (n(!0), c(F, null, L(h.value, (o, f) => (n(), c("div", {
        key: o.value || f,
        onClick: (k) => U(o),
        class: S(T(o)),
        style: ae($(o)),
        title: o.text
      }, [
        o.value !== x.value ? (n(), c("b", Te, [
          q(C(o.text) + " ", 1),
          m("span", {
            innerHTML: _(o.value)
          }, null, 8, Pe)
        ])) : (n(), c("input", {
          key: 1,
          id: "st-select-all",
          type: "checkbox",
          title: I.value.selectCurrentPageElement,
          checked: D.value,
          onChange: P,
          disabled: D.value
        }, null, 40, Ae))
      ], 14, Ie))), 128))
    ], 2));
  }
}), De = ["value"], Be = ["onClick"], Re = { key: 1 }, Ue = /* @__PURE__ */ O({
  __name: "TableFooter",
  emits: ["update"],
  setup(v, { emit: y }) {
    const g = y, h = l(() => [5, 10, 25, 50]), x = l(() => {
      const { totalItems: d, rowsPerPage: o, page: f } = e.value;
      if (!d) return [];
      const k = Math.ceil(d / o), u = f;
      if (k <= 4)
        return Array.from({ length: k }, (R, E) => E + 1);
      const i = [1];
      return u > 3 && i.push("..."), u > 2 && i.push(u - 1), u !== 1 && u !== k && i.push(u), u < k - 1 && i.push(u + 1), u < k - 2 && i.push("..."), i.push(k), i;
    }), I = l({
      get() {
        return e.value.rowsPerPage;
      },
      set(d) {
        e.value.rowsPerPage = d;
      }
    }), D = l(() => e.value.startIndex), B = l(() => e.value.endIndex), T = l(() => e.value.totalItems), U = l(() => e.value.page), $ = async (d) => {
      !Number.isInteger(d) || d < 1 || (e.value.page = d, g("update", { clearSelected: !0 }));
    }, _ = l(() => e.value.trs), P = l(() => ["st-pageselector", b.getStyle("pageselector")]), p = l(() => ["st-pagebtns", b.getStyle("pagebtns")]);
    return (d, o) => (n(), c(F, null, [
      m("div", {
        class: S(P.value)
      }, [
        q(C(_.value.rowsPerPage) + " ", 1),
        ne(m("select", {
          name: "st-rows-per-page-selector",
          class: "st-select",
          "onUpdate:modelValue": o[0] || (o[0] = (f) => I.value = f),
          onChange: o[1] || (o[1] = (f) => $(1))
        }, [
          (n(!0), c(F, null, L(h.value, (f) => (n(), c("option", {
            key: f,
            value: f
          }, C(f), 9, De))), 128))
        ], 544), [
          [ge, I.value]
        ])
      ], 2),
      m("div", null, C(D.value) + "-" + C(B.value) + " " + C(_.value.of) + " " + C(T.value || 0), 1),
      T.value > I.value ? (n(), c("div", {
        key: 0,
        class: S(p.value)
      }, [
        (n(!0), c(F, null, L(x.value, (f) => (n(), c(F, { key: f }, [
          typeof f == "number" ? (n(), c("button", {
            key: 0,
            class: S({ "st-active": Number(f) === Number(U.value) }),
            onClick: (k) => $(f)
          }, C(f), 11, Be)) : (n(), c("span", Re, "  "))
        ], 64))), 128))
      ], 2)) : W("", !0)
    ], 64));
  }
}), Fe = {
  width: "100",
  height: "100",
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
}, Ee = /* @__PURE__ */ m("circle", {
  cx: "50",
  cy: "50",
  r: "40",
  stroke: "#007bff",
  "stroke-width": "6",
  fill: "none",
  "stroke-dasharray": "251.2",
  "stroke-dashoffset": "251.2"
}, [
  /* @__PURE__ */ m("animate", {
    attributeName: "stroke-dashoffset",
    from: "251.2",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  }),
  /* @__PURE__ */ m("animate", {
    attributeName: "opacity",
    from: "1",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  })
], -1), Me = {
  x: "50%",
  y: "60%",
  "text-anchor": "middle",
  "font-size": "10px",
  fill: "#007bff"
}, Ne = /* @__PURE__ */ O({
  __name: "SpinnerItem",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  setup(v) {
    return (y, g) => (n(), c("svg", Fe, [
      Ee,
      m("text", Me, C(v.text), 1)
    ]));
  }
}), Le = /* @__PURE__ */ O({
  __name: "BulkSelection",
  emits: ["updateSelection"],
  setup(v, { emit: y }) {
    const g = l(() => e.value.trs), h = l(() => [
      "st-bulkactions",
      b.getStyle("bulkactions")
    ]), x = l(() => e.value.allSelected ? g.value.unselectAll : g.value.selectAll), I = l(() => {
      const T = e.value.selection.length;
      return e.value.allSelected ? e.value.totalItems : T;
    }), D = y, B = () => {
      e.value.allSelected = !e.value.allSelected, e.value.allSelected === !1 && (e.value.selection = []), D("updateSelection");
    };
    return (T, U) => (n(), c("div", {
      class: S(h.value)
    }, [
      m("p", null, C(g.value.bulkActions) + ":", 1),
      m("p", null, C(I.value), 1),
      m("button", { onClick: B }, C(x.value), 1)
    ], 2));
  }
}), Oe = ["disabled"], ze = ["data-key"], qe = /* @__PURE__ */ O({
  __name: "FilterComponent",
  emits: ["update", "updateSelection"],
  setup(v, { emit: y }) {
    const g = l(() => e.value.trs), h = N(""), x = N([]), I = y, D = l(() => [
      "st-filtercontainer",
      b.getStyle("filter")
    ]), B = l(() => [
      "st-filteractions",
      b.getStyle("filteractions")
    ]), T = l(() => [
      "st-activefilter",
      b.getStyle("activefilter")
    ]), U = l(() => [
      "st-searchbutton",
      b.getStyle("searchbutton")
    ]), $ = l(() => [
      "st-filterbutton",
      b.getStyle("filterbutton")
    ]), _ = l(() => e.value.filters || []), P = l(() => e.value.selector), p = l(() => Number(e.value.totalItems)), d = (u) => {
      if (!u || u === "")
        return "";
      let i = u.trim().toLowerCase();
      return i = i.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), i = i.replace(/[^a-z0-9]/g, "-").trim(), i;
    }, o = () => {
      const u = e.value.filters || [];
      if (h.value === "" || p.value <= 0)
        return;
      const i = d(h.value);
      if (!u || u.length === 0) {
        u || (e.value.filters = []), e.value.filters.push(h.value), x.value.push(i), I("update"), h.value = "";
        return;
      }
      x.value.indexOf(i) === -1 && (e.value.filters.push(h.value), x.value.push(i), I("update"), h.value = "");
    }, f = (u) => {
      const i = u.target, R = i.getAttribute("data-key") || "";
      x.value = x.value.filter(
        (E) => E !== R
      ), e.value.filters = e.value.filters.filter(
        (E) => E !== i.innerHTML
      ), i.remove(), I("update");
    }, k = () => I("updateSelection");
    return (u, i) => (n(), c(F, null, [
      m("div", {
        class: S(D.value)
      }, [
        m("div", {
          class: S(B.value)
        }, [
          q(C(g.value.filter) + " ", 1),
          ne(m("input", {
            id: "st-text-search",
            type: "text",
            onKeyup: he(o, ["enter"]),
            "onUpdate:modelValue": i[0] || (i[0] = (R) => h.value = R),
            autocomplete: "on"
          }, null, 544), [
            [ye, h.value]
          ]),
          m("button", {
            class: S(U.value),
            onClick: o,
            disabled: p.value <= 0
          }, C(g.value.search), 11, Oe)
        ], 2),
        P.value ? (n(), oe(Le, {
          key: 0,
          onUpdateSelection: k
        })) : W("", !0)
      ], 2),
      _.value.length > 0 ? (n(), c("div", {
        key: 0,
        class: S(T.value)
      }, [
        q(C(g.value.activefilters) + " ", 1),
        (n(!0), c(F, null, L(_.value, (R) => (n(), c("button", {
          class: S($.value),
          key: d(R),
          "data-key": d(R),
          onClick: f
        }, C(R), 11, ze))), 128))
      ], 2)) : W("", !0)
    ], 64));
  }
}), Ve = { key: 1 }, je = ["onClick"], He = { key: 0 }, We = ["id", "checked", "disabled"], Ke = /* @__PURE__ */ O({
  __name: "SlottedTable",
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: !0
    },
    selector: { type: Boolean, default: !1 },
    items: { type: Array, default: () => [] },
    styles: { type: Object, default: () => ({}) },
    language: { type: String, default: "en" },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callBack: { type: Function, default: null }
  },
  emits: ["updateSelection", "rowClick"],
  setup(v, { expose: y, emit: g }) {
    const h = v, { headers: x, items: I, styles: D, language: B, callBack: T, selector: U } = Se(h), $ = N(!1), _ = N([]), P = N([]), p = N(be(B.value)), d = g, o = async (t) => {
      if (!T.value)
        throw new Error("Callback is not defined or invalid");
      const s = await T.value({ ...t });
      if (s != null && s.rows && s.totalRows)
        return s.rows.forEach((a) => {
          a.ST_UID = Y(a);
        }), {
          rows: s.rows,
          totalItems: s.totalRows
        };
      throw new Error("Callback response is invalid or errored");
    }, f = async () => {
      const { page: t, rowsPerPage: s, ordering: a, filters: r, prevFilters: w } = e.value, { sortBy: A, sortType: M } = a, j = {
        page: t,
        rowsPerPage: s,
        sortBy: A,
        sortType: M
      };
      r.length > 0 && (j.filters = r, (r.length !== w.length || r.join("|") !== w.join("|")) && (j.page = 1, e.value.page = 1), e.value.prevFilters = [...r]);
      const ee = await o(j);
      _.value = ee.rows, e.value.totalItems = ee.totalItems;
    }, k = () => {
      const { sortBy: t, sortType: s } = e.value.ordering;
      P.value.sort((a, r) => {
        const w = b.castToType(a[t]), A = b.castToType(r[t]);
        return w < A ? s === "asc" ? -1 : 1 : w > A ? s === "asc" ? 1 : -1 : 0;
      });
    }, u = () => {
      const t = e.value.filters;
      if (t.length === 0) {
        _.value = P.value, e.value.totalItems = _.value.length;
        return;
      }
      let s = P.value.filter((a) => {
        const r = Object.values(a).join("|").toLowerCase();
        let w = 0;
        for (const A of t) {
          const M = r.includes(A.toLowerCase());
          w += M ? 1 : 0;
        }
        return w === t.length;
      });
      _.value = s, e.value.totalItems = _.value.length;
    }, i = () => {
      const { page: t, rowsPerPage: s } = e.value;
      _.value = _.value.slice((t - 1) * s, t * s);
    }, R = () => {
      const { page: t, rowsPerPage: s, totalItems: a } = e.value;
      e.value.startIndex = (t - 1) * s + 1, e.value.endIndex = Math.min(t * s, a);
    }, E = (t) => ({
      width: t.width ? `${t.width}px` : "auto"
    }), K = l(() => e.value.loading), re = l(() => e.value.columns), ce = l(() => e.value.selectorColIdentifier), ue = l(() => e.value.allSelected), ie = l(() => [
      "slottedtable",
      b.getStyle("container")
    ]), J = l(() => [
      "st-body",
      b.getStyle("body")
    ]), Z = l(() => [
      "st-row",
      b.getStyle("row")
    ]), G = l(() => [
      "st-cell",
      b.getStyle("cell")
    ]), de = l(() => [
      "st-footer",
      b.getStyle("footer")
    ]), Q = () => {
      const t = document.querySelectorAll(".st-row-selector:checked"), s = document.querySelectorAll(".st-row-selector");
      return t.length === s.length;
    }, X = async () => {
      const { selection: t, allSelected: s, ordering: a } = e.value;
      if (s)
        if ($.value) {
          const A = {
            sortBy: a.sortBy,
            sortType: a.sortType,
            page: 1,
            rowsPerPage: "all"
          };
          return (await o(A)).rows;
        } else
          return P.value;
      const r = _.value.filter(
        (A) => t.indexOf(A.ST_UID) !== -1
      ), w = [];
      return r.forEach((A) => {
        const M = { ...A };
        delete M.ST_UID, w.push(M);
      }), w;
    }, V = async () => {
      const t = await X();
      d("updateSelection", { ...t });
    }, ve = (t) => {
      const s = { ...t };
      delete s.ST_UID, d("rowClick", s);
    }, pe = (t) => {
      const { selection: s } = e.value, a = document.querySelector("#st-select-all"), r = t.target;
      if (r) {
        if (!r.checked) {
          e.value.selection = s.filter(
            (w) => w !== r.id
          ), Q() || (a.checked = !1, e.value.allSelected = !1);
          return;
        }
        e.value.selection.push(r.id), Q() && (a.checked = !0, e.value.allSelected = !1), V();
      }
    }, fe = (t) => e.value.allSelected ? !0 : e.value.selection.indexOf(t) !== -1, Y = (t) => {
      const s = JSON.stringify(t, Object.keys(t).sort());
      let a = Date.now() - Math.random();
      for (let w = 0; w < s.length; w++)
        a = a * 33 ^ s.charCodeAt(w);
      return (a >>> 0).toString(16);
    };
    me(async () => {
      e.value.selectorColIdentifier = `${Date.now()}-${Math.random().toString(36)}`, e.value.trs = p, e.value.language = B.value, U.value && x.value.unshift({
        text: "",
        value: e.value.selectorColIdentifier,
        sortable: !1
      }), e.value.columns = x.value, e.value.styles = D.value, e.value.selector = U.value, $.value = !!T.value, $.value || (I.value.forEach((t) => {
        t.ST_UID = Y(t);
      }), P.value = I.value, e.value.totalItems = P.value.length), await z();
    });
    const z = async (t = null) => {
      if (e.value.loading = !0, $.value ? await f() : (k(), u(), i()), R(), t != null && t.clearSelected) {
        const s = document.querySelector(
          "#st-select-all"
        );
        s && (s.checked = !1), e.value.selection = [];
      }
      e.value.loading = !1;
    };
    return y({ reloadTable: z, getSelection: async () => await X() }), (t, s) => (n(), c("div", {
      class: S(ie.value)
    }, [
      H(qe, {
        onUpdate: z,
        onUpdateSelection: V
      }),
      K.value || !_.value.length ? (n(), c("div", {
        key: 0,
        class: S(J.value)
      }, [
        m("div", {
          class: S(Z.value)
        }, [
          m("div", {
            class: S(G.value)
          }, [
            K.value ? (n(), oe(Ne, {
              key: 0,
              text: p.value.pleaseWait
            }, null, 8, ["text"])) : (n(), c("span", Ve, C(p.value.noResults), 1))
          ], 2)
        ], 2)
      ], 2)) : (n(), c("div", {
        key: 1,
        class: S(J.value)
      }, [
        H($e, {
          onUpdate: z,
          onUpdateSelection: V
        }),
        (n(!0), c(F, null, L(_.value, (a) => (n(), c("div", {
          key: a.ST_UID,
          class: S(Z.value)
        }, [
          (n(!0), c(F, null, L(re.value, (r) => (n(), c("div", {
            key: `${a.ST_UID}-${r.value}`,
            class: S(G.value),
            style: ae(E(r)),
            onClick: (w) => ve(a)
          }, [
            r.value === ce.value ? (n(), c("div", He, [
              m("input", {
                id: a.ST_UID,
                class: "st-row-selector",
                type: "checkbox",
                checked: fe(a.ST_UID),
                onChange: pe,
                disabled: ue.value
              }, null, 40, We)
            ])) : te(t.$slots, r.value, {
              key: 1,
              column: r.value,
              cellData: a[r.value] || r.empty,
              data: a
            }, () => [
              te(t.$slots, "default", {
                column: r.value,
                cellData: a[r.value] || r.empty,
                data: a
              }, void 0, !0)
            ], !0)
          ], 14, je))), 128))
        ], 2))), 128))
      ], 2)),
      m("div", {
        class: S(de.value)
      }, [
        H(Ue, { onUpdate: z })
      ], 2)
    ], 2));
  }
}), Je = (v, y) => {
  const g = v.__vccOpts || v;
  for (const [h, x] of y)
    g[h] = x;
  return g;
}, Ze = /* @__PURE__ */ Je(Ke, [["__scopeId", "data-v-7b719e9c"]]);
typeof window < "u" && window.Vue && window.Vue.createApp({}).component("SlottedTable", Ze);
export {
  Ze as default
};
