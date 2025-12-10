import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, subjects: 0, scores: 0 });
  const [distData, setDistData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("toan");

  // Fetch thống kê
  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, students: data.length })));

    fetch("http://localhost:3000/subjects")
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, subjects: data.length })));

    fetch("http://localhost:3000/scores")
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, scores: data.length })));
  }, []);

  // Fetch phân bố điểm
  useEffect(() => {
    fetch(
      `http://localhost:3000/reports/score-distribution?subject=${selectedSubject}`
    )
      .then((res) => res.json())
      .then((data) => setDistData(Array.isArray(data) ? data : []))
      .catch(() => setDistData([]));
  }, [selectedSubject]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tổng quan</h2>

      {/* ==== 3 CARDS ==== */}
      <div style={styles.cardRow}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>👨‍🎓</div>
          <div>
            <p style={styles.cardLabel}>Students</p>
            <h3 style={styles.cardValue}>{stats.students}</h3>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📘</div>
          <div>
            <p style={styles.cardLabel}>Subjects</p>
            <h3 style={styles.cardValue}>{stats.subjects-1}</h3>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>⭐</div>
          <div>
            <p style={styles.cardLabel}>Scores</p>
            <h3 style={styles.cardValue}>{stats.scores}</h3>
          </div>
        </div>
      </div>

      {/* ==== BIỂU ĐỒ ==== */}
      <div style={styles.chartCard}>
        <div style={styles.chartHeader}>
          <h3 style={{ margin: 0 }}>Phân bố điểm theo môn</h3>

          <select
            style={styles.select}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="toan">Toán</option>
            <option value="van">Ngữ Văn</option>
            <option value="anh">Tiếng Anh</option>
            <option value="ly">Vật Lý</option>
            <option value="hoa">Hóa</option>
            <option value="sinh">Sinh</option>
          </select>
        </div>

        {distData.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            Không có dữ liệu cho môn này.
          </p>
        ) : (
          <div style={styles.chartWrapper}>
            {distData.map((item, idx) => (
              <div key={idx} style={styles.barItem}>
                <div
                  style={{
                    ...styles.bar,
                    height: `${item.count * 12}px`,
                  }}
                ></div>
                <span style={styles.barLabel}>{item.range}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CSS WITH THEME VARIABLES ================= */
const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "var(--bg-color)",
    color: "var(--text-color)",
    transition: "0.3s",
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "var(--text-color)",
  },

  /* === CARDS === */
  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
    marginBottom: "30px",
    
  },

  card: {
    background: "var(--card-bg)",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "var(--shadow)",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "var(--shadow)",
  },

  cardIcon: {
    fontSize: "40px",
  },

  cardLabel: {
    margin: 0,
    opacity: 0.7,
    fontSize: "15px",
  },

  cardValue: {
    margin: 0,
    marginTop: "4px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "var(--primary)",
  },

  /* === CHART === */
  chartCard: {
    background: "var(--card-bg)",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "var(--shadow)",
  },

  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  select: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "2px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text-color)",
    fontSize: "15px",
    cursor: "pointer",
  },

  chartWrapper: {
    marginTop: "25px",
    display: "flex",
    alignItems: "flex-end",
    gap: "20px",
    height: "220px",
    paddingBottom: "10px",
  },

  barItem: {
    textAlign: "center",
    flex: 1,
  },

  bar: {
    width: "100%",
    background: "var(--primary)",
    borderRadius: "12px",
    transition: "height 0.4s ease",
  },

  barLabel: {
    marginTop: "8px",
    display: "block",
    fontSize: "14px",
    color: "var(--text-color)",
  },
};
