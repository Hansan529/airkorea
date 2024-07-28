import Header from '../app/components/layout/Header.jsx';
import Footer from '../app/components/layout/Footer.jsx';

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
};

export default Layout;
