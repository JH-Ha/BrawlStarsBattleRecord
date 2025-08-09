import React from 'react';
import Navbar from './navbar'
import Footer from './footer'
import styles from "../styles/Layout.module.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;