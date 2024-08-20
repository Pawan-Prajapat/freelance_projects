import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import('./components/client/home.jsx'));
const Navbar = lazy(() => import('./components/client/Navbar.jsx'));
const Skin = lazy(() => import('./components/client/skin.jsx'));
const Hair = lazy(() => import('./components/client/hair.jsx'));
const Combopack = lazy(() => import('./components/client/combopack.jsx'));
const Deals = lazy(() => import('./components/client/deals.jsx'));
const ProductDetail = lazy(() => import('./components/client/productDetailWhole.jsx'))
const Footer = lazy(() => import("./components/client/footer.jsx"));
const PaymentDetailSummary = lazy(() => import("./components/client/paymentDetailSummary.jsx"));
const AddToCart = lazy(() => import("./components/client/addToCart.jsx"))
const Register = lazy(() => import("./components/client/register.jsx"))
const Logout = lazy(() => import("./components/client/logout.jsx"))
const BestSellers = lazy(() => import("./components/client/bestSellers.jsx"))
const NewLaunches = lazy(() => import("./components/client/newLaunches.jsx"))
const Refund_Return = lazy(() => import("./components/client/Refund_Return.jsx"))
const Privacy_Policy = lazy(() => import("./components/client/privacy_policy.jsx"))
const Shipping_Policy = lazy(() => import("./components/client/shipping_policy.jsx"))
const Tearms_Service = lazy(() => import("./components/client/tearms_service.jsx"))
const FAQ = lazy(() => import("./components/client/faq.jsx"))
const Contact = lazy(() => import("./components/client/contact.jsx"))
const About = lazy(() => import("./components/client/about.jsx"))
import DotLoader from "react-spinners/DotLoader";

// admin components
const Products = lazy(() => import('./components/admin/products.jsx'));
const ProductForm = lazy(() => import('./components/admin/product_form.jsx'));
const UserDetail = lazy(() => import('./components/admin/UserDetail.jsx'));
const UserPaymentDetail = lazy(() => import('./components/admin/UserPaymentDetail.jsx'));
const AdminLayout = lazy(() => import('./components/layouts/adminLayout.jsx'));
const Categroies = lazy(() => import('./components/admin/categroies.jsx'));
const Subcategroies = lazy(() => import('./components/admin/subCategroies.jsx'));
const BannerAndTopSlider = lazy(() => import('./components/admin/bannerAndTopSlider.jsx'));

function App() {

  return (
    <Router>
      <Navbar />

      <Suspense fallback={<div className='w-full h-screen flex justify-center items-center'><DotLoader color="#36d7b7" loading={true} /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/hair" element={<Hair which="hair" />} />
          <Route path="/hennas" element={<Hair which="hennas" />} />
          <Route path="/hairMask" element={<Hair which="hairMask" />} />
          <Route path="/hairEssentialOil" element={<Hair which="hairEssentialOil" />} />
          <Route path="/addtocart" element={<AddToCart />} />
          <Route path="/skin" element={<Skin which={"skin"} />} />
          <Route path="/facePowder" element={<Skin which={"facePowder"} />} />
          <Route path="/facePack" element={<Skin which={"facePack"} />} />
          <Route path="/faceSheet" element={<Skin which={"faceSheet"} />} />
          <Route path="/faceEssentialOil" element={<Skin which={"faceEssentialOil"} />} />
          <Route path="/bestSellers" element={<BestSellers />} />
          <Route path="/combopack" element={<Combopack which={"combo"} />} />
          <Route path="/combopackHairMask" element={<Combopack which={"comboHairMask"} />} />
          <Route path="/combopackFaceCare" element={<Combopack which={"comboFaceMask"} />} />
          <Route path="/combopackFaceSheet" element={<Combopack which={"comboFaceSheet"} />} />
          <Route path="/combopackHennaIndigo" element={<Combopack which={"comboHennaIndigo"} />} />
          <Route path="/combopackEssentialOil" element={<Combopack which={"comboEssentialOil"} />} />
          <Route path="/newLaunches" element={<NewLaunches />} />


          <Route path="/Refund_Return" element={<Refund_Return />} />
          <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
          <Route path="/Shipping_Policy" element={<Shipping_Policy />} />
          <Route path="/Tearms_Service" element={<Tearms_Service />} />
          <Route path="/About" element={<About />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Contact" element={<Contact />} />




          <Route path="/deals" element={<Deals under={0} />} />
          <Route path="/deals100" element={<Deals under={100} />} />
          <Route path="/deals200" element={<Deals under={200} />} />
          <Route path="/deals300" element={<Deals under={300} />} />
          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/paymentDetailSummary/:id/:variantId' element={<PaymentDetailSummary />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin' element={<AdminLayout />} >
            <Route path='products' element={<Products />} />
            <Route path='ProductForm' element={<ProductForm />} />
            <Route path="ProductFormForUpdate/:productId" element={<ProductForm />} />

            <Route path='userDetail' element={<UserDetail />} />
            <Route path='userPaymentDetail' element={<UserPaymentDetail />} />
            <Route path='categroies' element={<Categroies />} />
            <Route path='subcategroies' element={<Subcategroies />} />
            <Route path='bannerAndTopSlider' element={<BannerAndTopSlider />} />
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}
export default App;
