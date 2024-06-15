import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

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