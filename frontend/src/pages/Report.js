import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Report() {
  const [subject, setSubject] = useState("toan");
  const [distData, setDistData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [loadingDist, setLoadingDist] = useState(false);
  const [loadingTop, setLoadingTop] = useState(false);

  const SUBJECTS = [
    { code: "toan", name: "Toán" },
    { code: "ngu_van", name: "Ngữ Văn" },
    { code: "vat_li", name: "Vật Lý" },
    { code: "hoa_hoc", name: "Hóa Học" },
    { code: "sinh_hoc", name: "Sinh Học" },
    { code: "lich_su", name: "Lịch Sử" },
    { code: "dia_li", name: "Địa Lý" },
    { code: "gdcd", name: "GDCD" },
  ];

  // Fetch score distribution
  useEffect(() => {
    setLoadingDist(true);
    fetch(
      `http://localhost:3000/scores/report/distribution?subjectCode=${subject}`
    )
      .then((res) => res.json())
      .then((data) => setDistData(Array.isArray(data) ? data : []))
      .catch(() => setDistData([]))
      .finally(() => setLoadingDist(false));
  }, [subject]);

  // Fetch top 10
  useEffect(() => {
    setLoadingTop(true);
    fetch("http://localhost:3000/scores/report/top10")
      .then((res) => res.json())
      .then((data) => setTopData(Array.isArray(data) ? data : []))
      .catch(() => setTopData([]))
      .finally(() => setLoadingTop(false));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thống kê</h2>

      {/* ===== Score Distribution ===== */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            1️⃣ Score Distribution (
            {SUBJECTS.find((s) => s.code === subject)?.name})
          </h3>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.select}
          >
            {SUBJECTS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {loadingDist ? (
          <p style={styles.loading}>Loading chart...</p>
        ) : (
          <div style={styles.chartBox}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ===== Top 10 ===== */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>2️⃣ Top 10 Students (Toán + Lý + Hóa)</h3>

        {loadingTop ? (
          <p style={styles.loading}>Loading chart...</p>
        ) : (
          <div style={styles.chartBox}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

/* =================== STYLES WITH THEME VARIABLES =================== */

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    background: "var(--bg-color)",
    color: "var(--text-color)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "var(--text-color)",
  },

  card: {
    background: "var(--card-bg)",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "40px",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--card-border)",

  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "var(--text-color)",
  },

  select: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "2px solid var(--border)",
    fontSize: "15px",
    background: "var(--card-bg)",
    color: "var(--text-color)",
  },

  chartBox: {
    marginTop: "15px",
  },

  loading: {
    textAlign: "center",
    padding: "20px",
    color: "var(--text-color)",
  },
};

export default Report;
