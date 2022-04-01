import Navbar from './navbar'
import Footer from './footer'
import styles from "../styles/Layout.module.scss";

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}