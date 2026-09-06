import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  X,
  Filter,
  ChevronDown,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
} from "lucide-react";
import "./PgAllotments2025Page.css";

const COL_DEFS = [
  { key: "Round", label: "Round" },
  { key: "AI Rank", label: "AI Rank" },
  { key: "State", label: "State" },
  { key: "Institute", label: "Institute" },
  { key: "Course", label: "Course" },
  { key: "Quota", label: "Quota" },
  { key: "Category", label: "Category" },
  { key: "Fee", label: "Fee" },
  { key: "Stipend", label: "Stipend" },
  { key: "Bond Yrs", label: "Bond Yrs" },
  { key: "Beds", label: "Beds" },
];

const DEFAULT_VIS = {
  Round: true,
  "AI Rank": true,
  State: true,
  Institute: true,
  Course: true,
  Quota: true,
  Category: true,
  Fee: true,
  Stipend: true,
  "Bond Yrs": true,
  Beds: true,
};

const CustomSelect = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pg25-al-cs-wrapper">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pg25-al-cs-button"
      >
        <span className="pg25-al-cs-button-label">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`pg25-al-cs-chevron ${open ? "pg25-al-cs-chevron-open" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="pg25-al-cs-overlay" onClick={() => setOpen(false)} />
          <div className="pg25-al-cs-dropdown">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="pg25-al-cs-search-input"
            />
            <div className="pg25-al-cs-options-list">
              {filtered.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`pg25-al-cs-option ${value === opt ? "pg25-al-cs-option-selected" : ""}`}
                >
                  {opt === "all" ? allLabel : opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RankCell = ({ val }) => {
  if (!val || val === "-" || val === "")
    return <span className="pg25-al-rank-empty">—</span>;

  const digits = val.match(/\d+/);
  const rank = digits ? parseInt(digits[0], 10) : NaN;
  if (isNaN(rank)) return <span className="pg25-al-rank-empty">—</span>;

  const tier =
    rank <= 100
      ? "pg25-al-rank-tier-1"
      : rank <= 500
        ? "pg25-al-rank-tier-2"
        : rank <= 2000
          ? "pg25-al-rank-tier-3"
          : rank <= 5000
            ? "pg25-al-rank-tier-4"
            : "pg25-al-rank-tier-5";

  return <span className={`pg25-al-rank-value ${tier}`}>{val}</span>;
};

const formatCurrency = (val) => {
  if (!val || val === "-" || val === "") return "—";
  const numeric = Number(String(val).replace(/[^0-9.]/g, ""));
  if (!numeric || Number.isNaN(numeric)) return val;
  return `₹${numeric.toLocaleString("en-IN")}`;
};

const formatBondYrs = (val) => {
  if (!val || val === "-" || val === "") return "—";
  const numeric = Number(String(val).replace(/[^0-9.]/g, ""));
  if (!numeric || Number.isNaN(numeric)) return val;
  return `${numeric} yrs`;
};

const categoryBadgeClass = (category) => {
  if (category === "UR" || category === "GEN" || category === "Open")
    return "pg25-al-badge-cat-gray";
  if (category === "OBC") return "pg25-al-badge-cat-yellow";
  if (category === "SC") return "pg25-al-badge-cat-red";
  if (category === "ST") return "pg25-al-badge-cat-blue";
  if (category === "EWS") return "pg25-al-badge-cat-green";
  return "pg25-al-badge-cat-purple";
};

const PgAllotments2025Page = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selState, setSelState] = useState("all");
  const [selQuota, setSelQuota] = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [selRound, setSelRound] = useState("all");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");
  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [colVis, setColVis] = useState(DEFAULT_VIS);
  const [page, setPage] = useState(1);

  const PER_PAGE = 50;

  const toggleCol = (key) =>
    setColVis((prev) => ({ ...prev, [key]: !prev[key] }));
  const showAll = () =>
    setColVis(COL_DEFS.reduce((acc, { key }) => ({ ...acc, [key]: true }), {}));
  const hideAll = () =>
    setColVis(
      COL_DEFS.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: key === "Institute" || key === "Course",
        }),
        {},
      ),
    );

  const FIELD_MAP = {
    ROUND: "Round",
    "AI RANK": "AI Rank",
    STATE: "State",
    INSTITUTE: "Institute",
    COURSE: "Course",
    QUOTA: "Quota",
    CATEGORY: "Category",
    FEE: "Fee",
    STIPEND: "Stipend",
    "BOND YRS": "Bond Yrs",
    BEDS: "Beds",
  };

  const parseCSV = (text) => {
    const clean = text.replace(/^\uFEFF/, "");
    if (clean.includes("<html") || clean.includes("<!DOCTYPE"))
      throw new Error("Invalid CSV");
    const lines = clean.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error("No data");

    const header = lines[0]
      .split(",")
      .map((h) => h.trim().replace(/^"|"$/g, ""))
      .map((h) => FIELD_MAP[h.toUpperCase()] || h);

    return lines.slice(1).map((line) => {
      const values = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i += 1;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      values.push(current.trim());

      const row = header.reduce((acc, key, index) => {
        acc[key] = values[index]
          ? values[index].replace(/^"|"$/g, "").trim()
          : "";
        return acc;
      }, {});

      return {
        Round: row.Round || "",
        "AI Rank": row["AI Rank"] || "",
        State: row.State || "",
        Institute: row.Institute || "",
        Course: row.Course || "",
        Quota: row.Quota || "",
        Category: row.Category || "",
        Fee: row.Fee || "",
        Stipend: row.Stipend || "",
        "Bond Yrs": row["Bond Yrs"] || "",
        Beds: row.Beds || "",
      };
    });
  };

  useEffect(() => {
    fetch("/data/neetpg/pg_allotments_2025.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.text();
      })
      .then((text) => {
        setData(parseCSV(text));
        setDataError(false);
      })
      .catch(() => {
        setDataError(true);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const rounds = useMemo(
    () =>
      Array.from(
        new Set(data.map((item) => item.Round).filter(Boolean)),
      ).sort(),
    [data],
  );
  const states = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(data.map((item) => item.State).filter(Boolean)),
      ).sort(),
    ],
    [data],
  );
  const quotas = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(data.map((item) => item.Quota).filter(Boolean)),
      ).sort(),
    ],
    [data],
  );
  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(data.map((item) => item.Category).filter(Boolean)),
      ).sort(),
    ],
    [data],
  );
  const courses = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(data.map((item) => item.Course).filter(Boolean)),
      ).sort(),
    ],
    [data],
  );

  const filtered = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return data.filter((item) => {
      if (selRound !== "all" && item.Round !== selRound) return false;
      if (selState !== "all" && item.State !== selState) return false;
      if (selQuota !== "all" && item.Quota !== selQuota) return false;
      if (selCategory !== "all" && item.Category !== selCategory) return false;
      if (selCourse !== "all" && item.Course !== selCourse) return false;

      if (minRank || maxRank) {
        const digits = item["AI Rank"]?.match(/\d+/);
        const rank = digits ? parseInt(digits[0], 10) : null;
        if (rank === null) return false;
        if (minRank && rank < parseFloat(minRank)) return false;
        if (maxRank && rank > parseFloat(maxRank)) return false;
      }

      if (search) {
        const haystack =
          `${item.Institute} ${item.Course} ${item.State} ${item.Quota} ${item.Category}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }

      return true;
    });
  }, [
    data,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    minRank,
    maxRank,
    searchTerm,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    minRank,
    maxRank,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSearchTerm("");
    setSelRound("all");
    setSelState("all");
    setSelQuota("all");
    setSelCategory("all");
    setSelCourse("all");
    setMinRank("");
    setMaxRank("");
    setColVis(DEFAULT_VIS);
    setPage(1);
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  if (loading)
    return (
      <div className="pg25-al-loading-screen">
        <div className="pg25-al-loading-box">
          <div className="pg25-al-loading-spinner" />
          <p>Loading NEET PG allotments...</p>
        </div>
      </div>
    );

  return (
    <div className="pg25-al-page-root">
      {showColModal && (
        <div className="pg25-al-modal-overlay">
          <div className="pg25-al-modal-box">
            <div className="pg25-al-modal-header">
              <h3>Show / Hide Columns</h3>
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-al-modal-close-btn"
              >
                <X />
              </button>
            </div>
            <div className="pg25-al-modal-body">
              <div className="pg25-al-modal-actions">
                <button
                  type="button"
                  onClick={showAll}
                  className="pg25-al-btn-secondary"
                >
                  Show All
                </button>
                <button
                  type="button"
                  onClick={hideAll}
                  className="pg25-al-btn-secondary"
                >
                  Hide All
                </button>
              </div>
              {[
                {
                  label: "Basic Info",
                  keys: ["Round", "State", "Institute", "Course"],
                },
                {
                  label: "Rank & Category",
                  keys: ["AI Rank", "Quota", "Category"],
                },
                { label: "Fee & Stipend", keys: ["Fee", "Stipend"] },
                { label: "Other", keys: ["Bond Yrs", "Beds"] },
              ].map((group) => (
                <div key={group.label} className="pg25-al-col-group">
                  <p className="pg25-al-col-group-label">{group.label}</p>
                  {group.keys.map((key) => (
                    <label key={key} className="pg25-al-col-row">
                      <input
                        type="checkbox"
                        checked={colVis[key]}
                        onChange={() => toggleCol(key)}
                      />
                      <span>
                        {COL_DEFS.find((def) => def.key === key)?.label || key}
                      </span>
                      {colVis[key] ? <Eye /> : <EyeOff />}
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <div className="pg25-al-modal-footer">
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-al-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pg25-al-content-wrapper">
        <div className="pg25-al-app-header">
          <div className="pg25-al-header-row">
            <div className="pg25-al-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-pg")}
                className="pg25-al-back-btn"
              >
                <ArrowLeft className="pg25-al-icon-sm" />
              </button>
              <div className="pg25-al-header-text">
                <h1>Allotments</h1>
                <p>NEET PG 2025</p>
              </div>
            </div>
            <span className="pg25-al-records-count">
              {filtered.length.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="pg25-al-error-banner">
            ⚠️ Data not found. Check the data File/Path
          </div>
        )}

        <div className="pg25-al-pills-row">
          {rounds.map((round) => (
            <button
              type="button"
              key={round}
              onClick={() => setSelRound(round)}
              className={`pg25-al-pill ${selRound === round ? "pg25-al-pill-active" : "pg25-al-pill-inactive"}`}
            >
              {`R${round}`}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelRound("all")}
            className={`pg25-al-pill ${selRound === "all" ? "pg25-al-pill-active" : "pg25-al-pill-inactive"}`}
          >
            All Rounds
          </button>

          <button
            type="button"
            onClick={() => setShowColModal(true)}
            className="pg25-al-pill-icon-btn"
          >
            <Eye className="pg25-al-icon-sm" /> Columns
          </button>
        </div>

        <div className="pg25-al-filters-row">
          <div className="pg25-al-search-box">
            <Search />
            <input
              type="text"
              placeholder="Search institute, course, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pg25-al-filter-selects">
            <CustomSelect
              value={selState}
              onChange={(value) => {
                setSelState(value);
                setPage(1);
              }}
              options={states}
              allLabel="All States"
            />
            <CustomSelect
              value={selQuota}
              onChange={(value) => {
                setSelQuota(value);
                setPage(1);
              }}
              options={quotas}
              allLabel="All Quotas"
            />
            <CustomSelect
              value={selCategory}
              onChange={(value) => {
                setSelCategory(value);
                setPage(1);
              }}
              options={categories}
              allLabel="All Categories"
            />
            <button
              type="button"
              className="pg25-al-toggle-filter"
              onClick={() => setShowAdv((prev) => !prev)}
            >
              <Filter className="pg25-al-icon-fl" /> {showAdv ? "Hide" : "More"}{" "}
              Filters
              <ChevronDown
                className={showAdv ? "pg25-al-cs-chevron-open" : ""}
              />
            </button>
          </div>
        </div>

        {showAdv && (
          <div className="pg25-al-advanced-filters">
            <CustomSelect
              value={selCourse}
              onChange={(value) => {
                setSelCourse(value);
                setPage(1);
              }}
              options={courses}
              allLabel="All Courses"
            />
            <div className="pg25-al-rank-inputs">
              <input
                type="number"
                placeholder="Min AI Rank"
                value={minRank}
                onChange={(e) => {
                  setMinRank(e.target.value);
                  setPage(1);
                }}
              />
              <input
                type="number"
                placeholder="Max AI Rank"
                value={maxRank}
                onChange={(e) => {
                  setMaxRank(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button
              type="button"
              className="pg25-al-clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </button>
            <div className="pg25-al-filtered-count-row">
              <span className="pg25-al-filtered-count-num">
                {filtered.length.toLocaleString()}
              </span>
              <span>&nbsp;filtered results</span>
            </div>
          </div>
        )}

        <div className="pg25-al-table-wrapper">
          <table className="pg25-al-table">
            <thead>
              <tr>
                {visibleCols.map(({ key, label }) => (
                  <th
                    key={key}
                    className={key === "AI Rank" ? "pg25-al-th-rank" : ""}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleCols.length}
                    className="pg25-al-table-empty"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item, index) => (
                  <tr key={`${item.Institute}-${index}`}>
                    {colVis.Round && <td>{item.Round || "—"}</td>}
                    {colVis["AI Rank"] && (
                      <td className="pg25-al-td-rank">
                        <RankCell val={item["AI Rank"]} />
                      </td>
                    )}
                    {colVis.State && <td>{item.State || "—"}</td>}
                    {colVis.Institute && (
                      <td className="pg25-al-td-institute">
                        {item.Institute || "—"}
                      </td>
                    )}
                    {colVis.Course && <td>{item.Course || "—"}</td>}
                    {colVis.Quota && (
                      <td>
                        <span className="pg25-al-badge-quota">
                          {item.Quota || "—"}
                        </span>
                      </td>
                    )}
                    {colVis.Category && (
                      <td>
                        <span
                          className={`pg25-al-badge-category-base ${categoryBadgeClass(item.Category)}`}
                        >
                          {item.Category || "—"}
                        </span>
                      </td>
                    )}
                    {colVis.Fee && (
                      <td className="pg25-al-td-fee">
                        {formatCurrency(item.Fee)}
                      </td>
                    )}
                    {colVis.Stipend && (
                      <td className="pg25-al-td-stipend">
                        {formatCurrency(item.Stipend)}
                      </td>
                    )}
                    {colVis["Bond Yrs"] && (
                      <td className="pg25-al-td-muted">
                        {formatBondYrs(item["Bond Yrs"])}
                      </td>
                    )}
                    {colVis.Beds && (
                      <td className="pg25-al-td-muted">{item.Beds || "—"}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pg25-al-pagination-row">
          <div className="pg25-al-pagination-info">
            Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
            {Math.min(page * PER_PAGE, filtered.length)} of{" "}
            {filtered.length.toLocaleString()}
          </div>
          <div className="pg25-al-pagination-controls">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <PrevIcon />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const pageNum = start + idx;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={
                    pageNum === page
                      ? "pg25-al-page-active"
                      : "pg25-al-page-btn"
                  }
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgAllotments2025Page;
