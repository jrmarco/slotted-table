import { ref as j, defineComponent as O, computed as r, openBlock as i, createElementBlock as d, normalizeClass as S, Fragment as A, renderList as L, normalizeStyle as X, createTextVNode as V, toDisplayString as C, createElementVNode as k, withDirectives as q, vModelSelect as oe, unref as E, createCommentVNode as W, withKeys as re, vModelText as ne, createBlock as Y, toRefs as ce, onMounted as ie, createVNode as H, vModelCheckbox as ue, renderSlot as Z } from "vue";
const de = {
  pleaseWait: "Caricamento",
  noResults: "Nessun risultato",
  rowsPerPage: "Righe per pagina:",
  of: "di",
  filter: "Filtro",
  search: "Cerca",
  activefilters: "Ricerca attiva",
  bulkActions: "Selezionati",
  selectAll: "Seleziona tutto",
  selectCurrentPageElement: "Seleziona tutti gli elementi in questa pagina"
}, G = {
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
}, ve = {
  pleaseWait: "Chargement",
  noResults: "Aucun résultat",
  rowsPerPage: "Lignes par page:",
  of: "sur",
  filter: "Filtrer",
  search: "Rechercher",
  activefilters: "Recherche active",
  bulkActions: "Sélectionnés",
  selectAll: "Tout sélectionner",
  selectCurrentPageElement: ""
}, fe = {
  pleaseWait: "Laden",
  noResults: "Keine Ergebnisse",
  rowsPerPage: "Zeilen pro Seite:",
  of: "von",
  filter: "Filter",
  search: "Suche",
  activefilters: "Aktive Suche",
  bulkActions: "Ausgewählt",
  selectAll: "Alle auswählen",
  selectCurrentPageElement: "Alle Elemente auf dieser Seite auswählen"
}, pe = (t) => {
  switch (t) {
    case "it":
      return de;
    case "en":
      return G;
    case "fr":
      return ve;
    case "de":
      return fe;
    default:
      return G;
  }
}, e = j({
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
  styles: {},
  filters: [],
  prevFilters: [],
  hasCheckboxSelector: !1,
  selectorColIdentifier: "",
  allSelected: !1,
  checkboxes: {},
  hasServerCallback: !1,
  dynamicRows: {
    rows: [],
    total: 0
  },
  staticRows: {
    rows: [],
    total: 0,
    filtered: [],
    filteredTotal: 0
  }
}), he = (t) => {
  const { styles: s } = e.value;
  if (!Object.keys(s).length)
    return "";
  function l(a) {
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
    ].includes(a);
  }
  return l(t) && s[t] || "";
}, Q = (t) => {
  const s = new Date(t);
  return !isNaN(s.getTime()) && t === s.toISOString().split("T")[0] ? s.getTime() : !1;
}, ge = (t) => isNaN(Number(t)) ? Q(t) ? Q(t) : t : Number(t), ee = () => {
  const { hasServerCallback: t, dynamicRows: s, staticRows: l } = e.value;
  return t ? s.rows : l.filtered;
}, ye = () => {
  const { hasServerCallback: t, dynamicRows: s, staticRows: l } = e.value;
  return t ? s.total : l.filteredTotal;
}, te = () => {
  Object.keys(e.value.checkboxes).forEach((s) => {
    e.value.checkboxes[s] = !1;
  }), e.value.allSelected = !1;
}, we = () => {
  const t = [];
  e.value.allSelected = !1;
  const s = Object.keys(e.value.checkboxes);
  for (let a = 0; a < s.length; a += 1)
    e.value.checkboxes[s[a]] && t.push(s[a]);
  te();
  const l = ee().map((a) => a.ST_UID);
  t.forEach((a) => {
    l.indexOf(a) !== -1 && (e.value.checkboxes[a] = !0);
  });
}, c = {
  getStyle: he,
  castToType: ge,
  getRows: ee,
  getTotalRows: ye,
  resetCheckboxes: te,
  setDisplayRowSelected: we
}, Se = ["onClick", "title"], ke = { key: 0 }, be = ["innerHTML"], _e = ["title"], me = /* @__PURE__ */ O({
  __name: "TableHeader",
  emits: ["update", "updateSelection"],
  setup(t, { emit: s }) {
    const l = s, a = r(() => e.value.columns), n = r(() => e.value.selectorColIdentifier), v = r(() => e.value.trs), x = r(() => [
      "st-row",
      "st-header",
      c.getStyle("row"),
      c.getStyle("header")
    ]), _ = (f) => {
      const h = [
        "st-cell",
        f.sortable ? "st-pointer" : "",
        c.getStyle("cell")
      ];
      return f.value === n.value && h.push("w30"), h;
    }, b = (f) => {
      if (!f || !f.value || !f.sortable) return;
      const { sortBy: h, sortType: g } = e.value.ordering;
      e.value.ordering.sortType = h === f.value && g === "asc" ? "desc" : "asc", e.value.ordering.sortBy = f.value, l("update");
    }, m = (f) => ({
      width: f.width ? `${f.width}px` : "auto"
    }), R = (f) => {
      const { sortBy: h, sortType: g } = e.value.ordering;
      return h !== f ? "" : !g || g === "asc" ? "&uarr;" : "&darr;";
    }, I = () => {
      const f = c.getRows();
      if (e.value.allSelected) {
        e.value.allSelected = !1, c.resetCheckboxes();
        return;
      }
      f.forEach((h) => {
        e.value.checkboxes[h.ST_UID] = !e.value.checkboxes[h.ST_UID];
      }), l("updateSelection");
    };
    return (f, h) => (i(), d("div", {
      class: S(x.value)
    }, [
      (i(!0), d(A, null, L(a.value, (g, p) => (i(), d("div", {
        key: g.value || p,
        onClick: (T) => b(g),
        class: S(_(g)),
        style: X(m(g)),
        title: g.text
      }, [
        g.value !== n.value ? (i(), d("b", ke, [
          V(C(g.text) + " ", 1),
          k("span", {
            innerHTML: R(g.value)
          }, null, 8, be)
        ])) : (i(), d("button", {
          key: 1,
          class: "st-select-all",
          onClick: I,
          title: v.value.selectCurrentPageElement
        }, " ☑️ ", 8, _e))
      ], 14, Se))), 128))
    ], 2));
  }
}), Ce = ["value"], xe = ["onClick"], Te = { key: 1 }, Re = /* @__PURE__ */ O({
  __name: "TableFooter",
  emits: ["update"],
  setup(t, { emit: s }) {
    const l = s, a = r(() => [5, 10, 25, 50]), n = r(() => {
      const { rowsPerPage: h, page: g } = e.value;
      if (!c.getTotalRows()) return [];
      const p = Math.ceil(c.getTotalRows() / h), T = g;
      if (p <= 4)
        return Array.from({ length: p }, (D, w) => w + 1);
      const U = [1];
      return T > 3 && U.push("..."), T > 2 && U.push(T - 1), T !== 1 && T !== p && U.push(T), T < p - 1 && U.push(T + 1), T < p - 2 && U.push("..."), U.push(p), U;
    }), v = r({
      get() {
        return e.value.rowsPerPage;
      },
      set(h) {
        e.value.rowsPerPage = h;
      }
    }), x = r(() => e.value.startIndex), _ = r(() => e.value.endIndex), b = r(() => e.value.page), m = async (h) => {
      !Number.isInteger(h) || h < 1 || (e.value.page = h, l("update", { clearSelected: !0 }));
    }, R = r(() => e.value.trs), I = r(() => ["st-pageselector", c.getStyle("pageselector")]), f = r(() => ["st-pagebtns", c.getStyle("pagebtns")]);
    return (h, g) => (i(), d(A, null, [
      k("div", {
        class: S(I.value)
      }, [
        V(C(R.value.rowsPerPage) + " ", 1),
        q(k("select", {
          name: "st-rows-per-page-selector",
          class: "st-select",
          "onUpdate:modelValue": g[0] || (g[0] = (p) => v.value = p),
          onChange: g[1] || (g[1] = (p) => m(1))
        }, [
          (i(!0), d(A, null, L(a.value, (p) => (i(), d("option", {
            key: p,
            value: p
          }, C(p), 9, Ce))), 128))
        ], 544), [
          [oe, v.value]
        ])
      ], 2),
      k("div", null, C(x.value) + "-" + C(_.value) + " " + C(R.value.of) + " " + C(E(c).getTotalRows() || 0), 1),
      E(c).getTotalRows() > v.value ? (i(), d("div", {
        key: 0,
        class: S(f.value)
      }, [
        (i(!0), d(A, null, L(n.value, (p) => (i(), d(A, { key: p }, [
          typeof p == "number" ? (i(), d("button", {
            key: 0,
            class: S({ "st-active": Number(p) === Number(b.value) }),
            onClick: (T) => m(p)
          }, C(p), 11, xe)) : (i(), d("span", Te, "  "))
        ], 64))), 128))
      ], 2)) : W("", !0)
    ], 64));
  }
}), Pe = {
  width: "100",
  height: "100",
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
}, De = /* @__PURE__ */ k("circle", {
  cx: "50",
  cy: "50",
  r: "40",
  stroke: "#007bff",
  "stroke-width": "6",
  fill: "none",
  "stroke-dasharray": "251.2",
  "stroke-dashoffset": "251.2"
}, [
  /* @__PURE__ */ k("animate", {
    attributeName: "stroke-dashoffset",
    from: "251.2",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  }),
  /* @__PURE__ */ k("animate", {
    attributeName: "opacity",
    from: "1",
    to: "0",
    dur: "2s",
    repeatCount: "indefinite"
  })
], -1), Ie = {
  x: "50%",
  y: "60%",
  "text-anchor": "middle",
  "font-size": "10px",
  fill: "#007bff"
}, Ue = /* @__PURE__ */ O({
  __name: "SpinnerItem",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  setup(t) {
    return (s, l) => (i(), d("svg", Pe, [
      De,
      k("text", Ie, C(t.text), 1)
    ]));
  }
}), $e = /* @__PURE__ */ O({
  __name: "BulkSelection",
  emits: ["updateSelection"],
  setup(t, { emit: s }) {
    const l = r(() => e.value.trs), a = r(() => [
      "st-bulkactions",
      c.getStyle("bulkactions")
    ]), n = r(() => l.value.selectAll), v = r(() => {
      const { hasServerCallback: b, checkboxes: m, dynamicRows: R, staticRows: I } = e.value, f = Object.values(m).filter((h) => h);
      return e.value.allSelected ? b ? R.total : I.total : f.length;
    }), x = s, _ = () => {
      e.value.allSelected = !0;
      const { hasServerCallback: b, dynamicRows: m, staticRows: R } = e.value;
      (b ? m.rows : R.rows).forEach((f) => {
        e.value.checkboxes[f.ST_UID] = !0;
      }), x("updateSelection");
    };
    return (b, m) => (i(), d("div", {
      class: S(a.value)
    }, [
      k("p", null, C(l.value.bulkActions) + ":", 1),
      k("p", null, C(v.value), 1),
      k("button", { onClick: _ }, C(n.value), 1)
    ], 2));
  }
}), Ae = ["disabled"], Be = ["data-key"], Fe = /* @__PURE__ */ O({
  __name: "FilterComponent",
  emits: ["update", "updateSelection"],
  setup(t, { emit: s }) {
    const l = r(() => e.value.trs), a = j(""), n = j([]), v = s, x = r(() => [
      "st-filtercontainer",
      c.getStyle("filter")
    ]), _ = r(() => [
      "st-filteractions",
      c.getStyle("filteractions")
    ]), b = r(() => [
      "st-activefilter",
      c.getStyle("activefilter")
    ]), m = r(() => [
      "st-searchbutton",
      c.getStyle("searchbutton")
    ]), R = r(() => [
      "st-filterbutton",
      c.getStyle("filterbutton")
    ]), I = r(() => e.value.filters || []), f = r(() => e.value.hasCheckboxSelector), h = r(
      () => e.value.hasServerCallback ? e.value.dynamicRows.total : e.value.staticRows.filteredTotal
    ), g = (D) => {
      if (!D || D === "")
        return "";
      let w = D.trim().toLowerCase();
      return w = w.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), w = w.replace(/[^a-z0-9]/g, "-").trim(), w;
    }, p = () => {
      const D = e.value.filters || [];
      if (a.value === "" || h.value <= 0)
        return;
      const w = g(a.value);
      if (!D || D.length === 0) {
        D || (e.value.filters = []), c.resetCheckboxes(), e.value.filters.push(a.value), n.value.push(w), v("update", { resetPage: !0 }), a.value = "";
        return;
      }
      n.value.indexOf(w) === -1 && (c.resetCheckboxes(), e.value.filters.push(a.value), n.value.push(w), v("update", { resetPage: !0 }), a.value = "");
    }, T = (D) => {
      const w = D.target, $ = w.getAttribute("data-key") || "";
      n.value = n.value.filter(
        (F) => F !== $
      ), e.value.filters = e.value.filters.filter(
        (F) => F !== w.innerHTML
      ), w.remove(), v("update", { resetPage: !0 });
    }, U = () => v("updateSelection");
    return (D, w) => (i(), d(A, null, [
      k("div", {
        class: S(x.value)
      }, [
        k("div", {
          class: S(_.value)
        }, [
          V(C(l.value.filter) + " ", 1),
          q(k("input", {
            id: "st-text-search",
            type: "text",
            onKeyup: re(p, ["enter"]),
            "onUpdate:modelValue": w[0] || (w[0] = ($) => a.value = $),
            autocomplete: "on"
          }, null, 544), [
            [ne, a.value]
          ]),
          k("button", {
            class: S(m.value),
            onClick: p,
            disabled: h.value <= 0
          }, C(l.value.search), 11, Ae)
        ], 2),
        f.value ? (i(), Y($e, {
          key: 0,
          onUpdateSelection: U
        })) : W("", !0)
      ], 2),
      I.value.length > 0 ? (i(), d("div", {
        key: 0,
        class: S(b.value)
      }, [
        V(C(l.value.activefilters) + " ", 1),
        (i(!0), d(A, null, L(I.value, ($) => (i(), d("button", {
          class: S(R.value),
          key: g($),
          "data-key": g($),
          onClick: T
        }, C($), 11, Be))), 128))
      ], 2)) : W("", !0)
    ], 64));
  }
}), Ee = () => {
  const { staticRows: t, ordering: s } = e.value, { sortBy: l, sortType: a } = s;
  t.rows.sort((n, v) => {
    const x = c.castToType(n[l]), _ = c.castToType(v[l]);
    return x < _ ? a === "asc" ? -1 : 1 : x > _ ? a === "asc" ? 1 : -1 : 0;
  });
}, Le = () => {
  const { filters: t, staticRows: s } = e.value;
  if (t.length === 0) {
    e.value.staticRows.filtered = s.rows, e.value.staticRows.filteredTotal = s.rows.length;
    return;
  }
  const l = s.rows.filter((a) => {
    const n = Object.values(a).join("|").toLowerCase();
    let v = 0;
    for (const x of t) {
      const _ = n.includes(x.toLowerCase());
      v += _ ? 1 : 0;
    }
    return v === t.length;
  });
  e.value.staticRows.filtered = l, e.value.staticRows.filteredTotal = l.length;
}, Oe = () => {
  const { page: t, rowsPerPage: s, staticRows: l } = e.value;
  e.value.staticRows.filtered = l.filtered.slice(
    (t - 1) * s,
    t * s
  );
}, Me = () => {
  Ee(), Le(), Oe();
}, Ne = async (t) => {
  const { page: s, rowsPerPage: l, ordering: a, filters: n, prevFilters: v } = e.value, { sortBy: x, sortType: _ } = a, b = {
    page: s,
    rowsPerPage: l,
    sortBy: x,
    sortType: _
  };
  n.length > 0 ? (b.filters = n, (n.length !== v.length || n.join("|") !== v.join("|")) && (e.value.page = 1, b.page = 1), e.value.prevFilters = [...n]) : e.value.prevFilters = [];
  const m = await t(b);
  e.value.dynamicRows.rows = m.rows, e.value.dynamicRows.total = m.totalRows;
}, je = () => {
  const { dynamicRows: t } = e.value;
  return t.rows.filter((s) => e.value.checkboxes[s.ST_UID]).map((s) => {
    const l = { ...s };
    return delete l.ST_UID, l;
  });
}, Ve = () => {
  const { checkboxes: t, allSelected: s, staticRows: l } = e.value;
  return (s ? l.rows : l.filtered).filter((n) => t[n.ST_UID]).map((n) => {
    const v = { ...n };
    return delete v.ST_UID, v;
  });
}, N = {
  loadStaticData: Me,
  loadServerData: Ne,
  returnSelectedDynamic: je,
  returnSelectedStatic: Ve
}, ze = { key: 1 }, He = ["onClick"], We = { key: 0 }, qe = ["id", "onUpdate:modelValue"], Ke = /* @__PURE__ */ O({
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
  setup(t, { expose: s, emit: l }) {
    const a = t, { headers: n, items: v, styles: x, language: _, callBack: b, selector: m } = ce(a), R = j(pe(_.value)), I = l, f = async (o) => {
      if (!b.value)
        throw new Error("Callback is not defined or invalid");
      let u = {};
      try {
        u = await b.value({ ...o });
      } catch (y) {
        throw console.log(y), new Error("Callback response is invalid or errored - ");
      }
      if (u != null && u.rows && u.totalRows !== void 0)
        return u.rows.forEach((y) => {
          y.ST_UID = J(y), e.value.checkboxes[y.ST_UID] = !1;
        }), {
          rows: u.rows,
          totalRows: u.totalRows
        };
      throw new Error("Callback response is invalid or errored");
    }, h = () => {
      const { page: o, rowsPerPage: u } = e.value;
      e.value.startIndex = (o - 1) * u + 1, e.value.endIndex = Math.min(o * u, c.getTotalRows());
    }, g = (o) => ({
      width: o.width ? `${o.width}px` : "auto"
    }), p = r(() => e.value.loading), T = r(() => e.value.columns), U = r(() => e.value.selectorColIdentifier), D = r(() => [
      "slottedtable",
      c.getStyle("container")
    ]), w = r(() => [
      "st-body",
      c.getStyle("body")
    ]), $ = r(() => [
      "st-row",
      c.getStyle("row")
    ]), F = (o) => {
      const u = ["st-cell", c.getStyle("cell")];
      return o && o.value === U.value && u.push("w30"), u;
    }, se = r(() => [
      "st-footer",
      c.getStyle("footer")
    ]), K = async () => {
      const { allSelected: o, ordering: u, rowsPerPage: y } = e.value;
      if (e.value.hasServerCallback) {
        if (o) {
          const P = {
            sortBy: u.sortBy,
            sortType: u.sortType,
            page: 1,
            rowsPerPage: y,
            all: !0
          };
          return (await f(P)).rows;
        }
        return N.returnSelectedDynamic();
      }
      return N.returnSelectedStatic();
    }, le = async () => {
      c.setDisplayRowSelected(), await z();
    }, z = async () => {
      const o = await K();
      I("updateSelection", [...o]);
    }, ae = (o) => {
      const u = { ...o };
      delete u.ST_UID, I("rowClick", u);
    }, J = (o) => {
      const u = JSON.stringify(o, Object.keys(o).sort());
      let y = Date.now() - Math.random();
      for (let B = 0; B < u.length; B++)
        y = y * 33 ^ u.charCodeAt(B);
      return (y >>> 0).toString(16);
    };
    ie(async () => {
      e.value.selectorColIdentifier = `${Date.now()}-${Math.random().toString(36)}`, e.value.trs = R, e.value.language = _.value, m.value && n.value.unshift({
        text: "",
        value: e.value.selectorColIdentifier,
        sortable: !1
      }), e.value.columns = n.value, e.value.styles = x.value, e.value.hasCheckboxSelector = m.value, e.value.hasServerCallback = !!b.value, e.value.hasServerCallback || (v.value.forEach((o) => {
        o.ST_UID = J(o), e.value.checkboxes[o.ST_UID] = !1;
      }), e.value.staticRows.rows = v.value, e.value.staticRows.total = v.value.length), await M();
    });
    const M = async (o = {}) => {
      e.value.loading = !0, e.value.hasServerCallback ? await N.loadServerData(f) : (o != null && o.resetPage && (e.value.page = 1), N.loadStaticData()), h(), o != null && o.clearSelected && c.resetCheckboxes(), e.value.loading = !1;
    };
    return s({ reloadTable: M, getSelection: async () => [...await K()], resetSelection: () => {
      const o = Object.keys(e.value.checkboxes);
      for (let u = 0; u < o.length; u += 1)
        e.value.checkboxes[o[u]] = !1;
    } }), (o, u) => (i(), d("div", {
      class: S(D.value)
    }, [
      H(Fe, {
        onUpdate: M,
        onUpdateSelection: z
      }),
      p.value || !E(c).getTotalRows() ? (i(), d("div", {
        key: 0,
        class: S(w.value)
      }, [
        k("div", {
          class: S($.value)
        }, [
          k("div", {
            class: S(F)
          }, [
            p.value ? (i(), Y(Ue, {
              key: 0,
              text: R.value.pleaseWait
            }, null, 8, ["text"])) : (i(), d("span", ze, C(R.value.noResults), 1))
          ])
        ], 2)
      ], 2)) : (i(), d("div", {
        key: 1,
        class: S(w.value)
      }, [
        H(me, {
          onUpdate: M,
          onUpdateSelection: z
        }),
        (i(!0), d(A, null, L(E(c).getRows(), (y) => (i(), d("div", {
          key: y.ST_UID,
          class: S($.value)
        }, [
          (i(!0), d(A, null, L(T.value, (P) => (i(), d("div", {
            key: `${y.ST_UID}-${P.value}`,
            class: S(F(P)),
            style: X(g(P)),
            onClick: (B) => ae(y)
          }, [
            P.value === U.value ? (i(), d("div", We, [
              q(k("input", {
                id: y.ST_UID,
                class: "st-row-selector",
                type: "checkbox",
                "onUpdate:modelValue": (B) => E(e).checkboxes[y.ST_UID] = B,
                onChange: le
              }, null, 40, qe), [
                [ue, E(e).checkboxes[y.ST_UID]]
              ])
            ])) : Z(o.$slots, P.value, {
              key: 1,
              column: P.value,
              cellData: y[P.value] || P.empty,
              data: y
            }, () => [
              Z(o.$slots, "default", {
                column: P.value,
                cellData: y[P.value] || P.empty,
                data: y
              }, void 0, !0)
            ], !0)
          ], 14, He))), 128))
        ], 2))), 128))
      ], 2)),
      k("div", {
        class: S(se.value)
      }, [
        H(Re, { onUpdate: M })
      ], 2)
    ], 2));
  }
}), Je = (t, s) => {
  const l = t.__vccOpts || t;
  for (const [a, n] of s)
    l[a] = n;
  return l;
}, Ze = /* @__PURE__ */ Je(Ke, [["__scopeId", "data-v-3d6ced3f"]]);
typeof window < "u" && window.Vue && window.Vue.createApp({}).component("SlottedTable", Ze);
export {
  Ze as default
};
