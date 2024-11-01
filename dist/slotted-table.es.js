import { ref as N, defineComponent as O, computed as r, openBlock as i, createElementBlock as d, normalizeClass as S, Fragment as A, renderList as L, normalizeStyle as X, createTextVNode as V, toDisplayString as C, createElementVNode as k, withDirectives as q, vModelSelect as oe, unref as E, createCommentVNode as W, withKeys as re, vModelText as ne, createBlock as Y, toRefs as ce, onMounted as ie, createVNode as H, vModelCheckbox as ue, renderSlot as Z } from "vue";
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
}, e = N({
  language: "en",
  trs: {},
  loading: !0,
  columns: [],
  ordering: {
    sortBy: "",
    sortType: ""
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
  function a(o) {
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
    ].includes(o);
  }
  return a(t) && s[t] || "";
}, Q = (t) => {
  const s = new Date(t);
  return !isNaN(s.getTime()) && t === s.toISOString().split("T")[0] ? s.getTime() : !1;
}, ge = (t) => isNaN(Number(t)) ? Q(t) ? Q(t) : t : Number(t), ee = () => {
  const { hasServerCallback: t, dynamicRows: s, staticRows: a } = e.value;
  return t ? s.rows : a.filtered;
}, ye = () => {
  const { hasServerCallback: t, dynamicRows: s, staticRows: a } = e.value;
  return t ? s.total : a.filteredTotal;
}, te = () => {
  Object.keys(e.value.checkboxes).forEach((s) => {
    e.value.checkboxes[s] = !1;
  }), e.value.allSelected = !1;
}, we = () => {
  const t = [];
  e.value.allSelected = !1;
  const s = Object.keys(e.value.checkboxes);
  for (let o = 0; o < s.length; o += 1)
    e.value.checkboxes[s[o]] && t.push(s[o]);
  te();
  const a = ee().map((o) => o.ST_UID);
  t.forEach((o) => {
    a.indexOf(o) !== -1 && (e.value.checkboxes[o] = !0);
  });
}, c = {
  getStyle: he,
  castToType: ge,
  getRows: ee,
  getTotalRows: ye,
  resetCheckboxes: te,
  setDisplayRowSelected: we
}, Se = ["onClick", "title"], ke = { key: 0 }, be = ["innerHTML"], me = ["title"], _e = /* @__PURE__ */ O({
  __name: "TableHeader",
  emits: ["update", "updateSelection"],
  setup(t, { emit: s }) {
    const a = s, o = r(() => e.value.columns), u = r(() => e.value.selectorColIdentifier), v = r(() => e.value.trs), x = r(() => [
      "st-row",
      "st-header",
      c.getStyle("row"),
      c.getStyle("header")
    ]), m = (f) => {
      const h = [
        "st-cell",
        f.sortable ? "st-pointer" : "",
        c.getStyle("cell")
      ];
      return f.value === u.value && h.push("w30"), h;
    }, b = (f) => {
      if (!f || !f.value || !f.sortable) return;
      const { sortBy: h, sortType: g } = e.value.ordering;
      e.value.ordering.sortType = h === f.value && g === "asc" ? "desc" : "asc", e.value.ordering.sortBy = f.value, a("update");
    }, _ = (f) => ({
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
      }), a("updateSelection");
    };
    return (f, h) => (i(), d("div", {
      class: S(x.value)
    }, [
      (i(!0), d(A, null, L(o.value, (g, p) => (i(), d("div", {
        key: g.value || p,
        onClick: (T) => b(g),
        class: S(m(g)),
        style: X(_(g)),
        title: g.text
      }, [
        g.value !== u.value ? (i(), d("b", ke, [
          V(C(g.text) + " ", 1),
          k("span", {
            innerHTML: R(g.value)
          }, null, 8, be)
        ])) : (i(), d("button", {
          key: 1,
          class: "st-select-all",
          onClick: I,
          title: v.value.selectCurrentPageElement
        }, " ☑️ ", 8, me))
      ], 14, Se))), 128))
    ], 2));
  }
}), Ce = ["value"], xe = ["onClick"], Te = { key: 1 }, Re = /* @__PURE__ */ O({
  __name: "TableFooter",
  emits: ["update"],
  setup(t, { emit: s }) {
    const a = s, o = r(() => [5, 10, 25, 50]), u = r(() => {
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
    }), x = r(() => e.value.startIndex), m = r(() => e.value.endIndex), b = r(() => e.value.page), _ = async (h) => {
      !Number.isInteger(h) || h < 1 || (e.value.page = h, a("update", { clearSelected: !0 }));
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
          onChange: g[1] || (g[1] = (p) => _(1))
        }, [
          (i(!0), d(A, null, L(o.value, (p) => (i(), d("option", {
            key: p,
            value: p
          }, C(p), 9, Ce))), 128))
        ], 544), [
          [oe, v.value]
        ])
      ], 2),
      k("div", null, C(x.value) + "-" + C(m.value) + " " + C(R.value.of) + " " + C(E(c).getTotalRows() || 0), 1),
      E(c).getTotalRows() > v.value ? (i(), d("div", {
        key: 0,
        class: S(f.value)
      }, [
        (i(!0), d(A, null, L(u.value, (p) => (i(), d(A, { key: p }, [
          typeof p == "number" ? (i(), d("button", {
            key: 0,
            class: S({ "st-active": Number(p) === Number(b.value) }),
            onClick: (T) => _(p)
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
    return (s, a) => (i(), d("svg", Pe, [
      De,
      k("text", Ie, C(t.text), 1)
    ]));
  }
}), $e = /* @__PURE__ */ O({
  __name: "BulkSelection",
  emits: ["updateSelection"],
  setup(t, { emit: s }) {
    const a = r(() => e.value.trs), o = r(() => [
      "st-bulkactions",
      c.getStyle("bulkactions")
    ]), u = r(() => a.value.selectAll), v = r(() => {
      const { hasServerCallback: b, checkboxes: _, dynamicRows: R, staticRows: I } = e.value, f = Object.values(_).filter((h) => h);
      return e.value.allSelected ? b ? R.total : I.total : f.length;
    }), x = s, m = () => {
      e.value.allSelected = !0;
      const { hasServerCallback: b, dynamicRows: _, staticRows: R } = e.value;
      (b ? _.rows : R.rows).forEach((f) => {
        e.value.checkboxes[f.ST_UID] = !0;
      }), x("updateSelection");
    };
    return (b, _) => (i(), d("div", {
      class: S(o.value)
    }, [
      k("p", null, C(a.value.bulkActions) + ":", 1),
      k("p", null, C(v.value), 1),
      k("button", { onClick: m }, C(u.value), 1)
    ], 2));
  }
}), Ae = ["disabled"], Be = ["data-key"], Fe = /* @__PURE__ */ O({
  __name: "FilterComponent",
  emits: ["update", "updateSelection"],
  setup(t, { emit: s }) {
    const a = r(() => e.value.trs), o = N(""), u = N([]), v = s, x = r(() => [
      "st-filtercontainer",
      c.getStyle("filter")
    ]), m = r(() => [
      "st-filteractions",
      c.getStyle("filteractions")
    ]), b = r(() => [
      "st-activefilter",
      c.getStyle("activefilter")
    ]), _ = r(() => [
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
      if (o.value === "" || h.value <= 0)
        return;
      const w = g(o.value);
      if (!D || D.length === 0) {
        D || (e.value.filters = []), c.resetCheckboxes(), e.value.filters.push(o.value), u.value.push(w), v("update", { resetPage: !0 }), o.value = "";
        return;
      }
      u.value.indexOf(w) === -1 && (c.resetCheckboxes(), e.value.filters.push(o.value), u.value.push(w), v("update", { resetPage: !0 }), o.value = "");
    }, T = (D) => {
      const w = D.target, $ = w.getAttribute("data-key") || "";
      u.value = u.value.filter(
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
          class: S(m.value)
        }, [
          V(C(a.value.filter) + " ", 1),
          q(k("input", {
            id: "st-text-search",
            type: "text",
            onKeyup: re(p, ["enter"]),
            "onUpdate:modelValue": w[0] || (w[0] = ($) => o.value = $),
            autocomplete: "on"
          }, null, 544), [
            [ne, o.value]
          ]),
          k("button", {
            class: S(_.value),
            onClick: p,
            disabled: h.value <= 0
          }, C(a.value.search), 11, Ae)
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
        V(C(a.value.activefilters) + " ", 1),
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
  const { staticRows: t, ordering: s } = e.value, { sortBy: a, sortType: o } = s;
  t.rows.sort((u, v) => {
    const x = c.castToType(u[a]), m = c.castToType(v[a]);
    return x < m ? o === "asc" ? -1 : 1 : x > m ? o === "asc" ? 1 : -1 : 0;
  });
}, Le = () => {
  const { filters: t, staticRows: s } = e.value;
  if (t.length === 0) {
    e.value.staticRows.filtered = s.rows, e.value.staticRows.filteredTotal = s.rows.length;
    return;
  }
  const a = s.rows.filter((o) => {
    const u = Object.values(o).join("|").toLowerCase();
    let v = 0;
    for (const x of t) {
      const m = u.includes(x.toLowerCase());
      v += m ? 1 : 0;
    }
    return v === t.length;
  });
  e.value.staticRows.filtered = a, e.value.staticRows.filteredTotal = a.length;
}, Oe = () => {
  const { page: t, rowsPerPage: s, staticRows: a } = e.value;
  e.value.staticRows.filtered = a.filtered.slice(
    (t - 1) * s,
    t * s
  );
}, Me = () => {
  Ee(), Le(), Oe();
}, je = async (t) => {
  const { page: s, rowsPerPage: a, ordering: o, filters: u, prevFilters: v } = e.value, { sortBy: x, sortType: m } = o, b = {
    page: s,
    rowsPerPage: a,
    sortBy: x,
    sortType: m
  };
  u.length > 0 ? (b.filters = u, (u.length !== v.length || u.join("|") !== v.join("|")) && (e.value.page = 1, b.page = 1), e.value.prevFilters = [...u]) : e.value.prevFilters = [];
  const _ = await t(b);
  e.value.dynamicRows.rows = _.rows, e.value.dynamicRows.total = _.totalRows;
}, Ne = () => {
  const { dynamicRows: t } = e.value;
  return t.rows.filter((s) => e.value.checkboxes[s.ST_UID]).map((s) => {
    const a = { ...s };
    return delete a.ST_UID, a;
  });
}, Ve = () => {
  const { checkboxes: t, allSelected: s, staticRows: a } = e.value;
  return (s ? a.rows : a.filtered).filter((u) => t[u.ST_UID]).map((u) => {
    const v = { ...u };
    return delete v.ST_UID, v;
  });
}, j = {
  loadStaticData: Me,
  loadServerData: je,
  returnSelectedDynamic: Ne,
  returnSelectedStatic: Ve
}, ze = { key: 1 }, He = ["onClick"], We = { key: 0 }, qe = ["id", "onUpdate:modelValue"], Ke = /* @__PURE__ */ O({
  __name: "SlottedTable",
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: !0
    },
    baseFilter: {
      type: Object,
      default: () => ({ name: "", direction: "" })
    },
    selector: { type: Boolean, default: !1 },
    items: { type: Array, default: () => [] },
    styles: { type: Object, default: () => ({}) },
    language: { type: String, default: "en" },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callBack: { type: Function, default: null }
  },
  emits: ["updateSelection", "rowClick"],
  setup(t, { expose: s, emit: a }) {
    const o = t, { headers: u, items: v, styles: x, language: m, callBack: b, selector: _ } = ce(o), R = N(pe(m.value)), I = a, f = async (l) => {
      if (!b.value)
        throw new Error("Callback is not defined or invalid");
      let n = {};
      try {
        n = await b.value({ ...l });
      } catch (y) {
        throw console.log(y), new Error("Callback response is invalid or errored - ");
      }
      if (n != null && n.rows && n.totalRows !== void 0)
        return n.rows.forEach((y) => {
          y.ST_UID = J(y), e.value.checkboxes[y.ST_UID] = !1;
        }), {
          rows: n.rows,
          totalRows: n.totalRows
        };
      throw new Error("Callback response is invalid or errored");
    }, h = () => {
      const { page: l, rowsPerPage: n } = e.value;
      e.value.startIndex = (l - 1) * n + 1, e.value.endIndex = Math.min(l * n, c.getTotalRows());
    }, g = (l) => ({
      width: l.width ? `${l.width}px` : "auto"
    }), p = r(() => e.value.loading), T = r(() => e.value.columns), U = r(() => e.value.selectorColIdentifier), D = r(() => [
      "slottedtable",
      c.getStyle("container")
    ]), w = r(() => [
      "st-body",
      c.getStyle("body")
    ]), $ = r(() => [
      "st-row",
      c.getStyle("row")
    ]), F = (l) => {
      const n = ["st-cell", c.getStyle("cell")];
      return l && l.value === U.value && n.push("w30"), n;
    }, se = r(() => [
      "st-footer",
      c.getStyle("footer")
    ]), K = async () => {
      const { allSelected: l, ordering: n, rowsPerPage: y } = e.value;
      if (e.value.hasServerCallback) {
        if (l) {
          const P = {
            sortBy: n.sortBy,
            sortType: n.sortType,
            page: 1,
            rowsPerPage: y,
            all: !0
          };
          return (await f(P)).rows;
        }
        return j.returnSelectedDynamic();
      }
      return j.returnSelectedStatic();
    }, le = async () => {
      c.setDisplayRowSelected(), await z();
    }, z = async () => {
      const l = await K();
      I("updateSelection", [...l]);
    }, ae = (l) => {
      const n = { ...l };
      delete n.ST_UID, I("rowClick", n);
    }, J = (l) => {
      const n = JSON.stringify(l, Object.keys(l).sort());
      let y = Date.now() - Math.random();
      for (let B = 0; B < n.length; B++)
        y = y * 33 ^ n.charCodeAt(B);
      return (y >>> 0).toString(16);
    };
    ie(async () => {
      if (e.value.selectorColIdentifier = `${Date.now()}-${Math.random().toString(36)}`, e.value.trs = R, e.value.language = m.value, _.value && u.value.unshift({
        text: "",
        value: e.value.selectorColIdentifier,
        sortable: !1
      }), e.value.columns = u.value, e.value.styles = x.value, e.value.hasCheckboxSelector = _.value, e.value.hasServerCallback = !!b.value, e.value.hasServerCallback || (v.value.forEach((l) => {
        l.ST_UID = J(l), e.value.checkboxes[l.ST_UID] = !1;
      }), e.value.staticRows.rows = v.value, e.value.staticRows.total = v.value.length), e.value.ordering.sortBy = "id", e.value.ordering.sortType = "desc", o.baseFilter) {
        const { name: l, direction: n } = o.baseFilter;
        l && n && l !== "" && (e.value.ordering.sortBy = l, e.value.ordering.sortType = n);
      }
      await M();
    });
    const M = async (l = {}) => {
      e.value.loading = !0, e.value.hasServerCallback ? await j.loadServerData(f) : (l != null && l.resetPage && (e.value.page = 1), j.loadStaticData()), h(), l != null && l.clearSelected && c.resetCheckboxes(), e.value.loading = !1;
    };
    return s({ reloadTable: M, getSelection: async () => [...await K()], resetSelection: () => {
      const l = Object.keys(e.value.checkboxes);
      for (let n = 0; n < l.length; n += 1)
        e.value.checkboxes[l[n]] = !1;
    } }), (l, n) => (i(), d("div", {
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
        H(_e, {
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
            ])) : Z(l.$slots, P.value, {
              key: 1,
              column: P.value,
              cellData: y[P.value] || P.empty,
              data: y
            }, () => [
              Z(l.$slots, "default", {
                column: P.value,
                cellData: y[P.value] || P.empty,
                data: y
              })
            ])
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
});
typeof window < "u" && window.Vue && window.Vue.createApp({}).component("SlottedTable", Ke);
export {
  Ke as default
};
