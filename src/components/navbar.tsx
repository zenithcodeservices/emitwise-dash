import styles from "../styles/Navbar.module.css";

export default function Home() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>Collect</li>
        <li>Analyse</li>
        <li>Reduce</li>
        <li>Report</li>
        <li>ACME</li>
      </ul>
    </nav>
  );
}
