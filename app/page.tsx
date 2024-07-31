import Results from "./page$.Results";
import Search from "./page$.Search";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <section>
        <Search />
        <br />
        <Results />
      </section>
    </main>
  );
}
