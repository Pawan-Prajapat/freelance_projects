import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import('./components/client/home.jsx'));
const Navbar = lazy(() => import('./components/client/Navbar.jsx'));
const Face = lazy(() => import('./components/client/face.jsx'));
const Hair = lazy(() => import('./components/client/hair.jsx'));
const Combopack = lazy(() => import('./components/client/combopack.jsx'));
const Henna = lazy(() => import('./components/client/henna.jsx'));
const ProductDetail = lazy(() => import('./components/client/productDetailWhole.jsx'))
const Footer = lazy(() => import("./components/client/footer.jsx"));
const PaymentDetailSummary = lazy(() => import("./components/client/paymentDetailSummary.jsx"));
const AddToCart = lazy(() => import("./components/client/addToCart.jsx"))
const Register = lazy(() => import("./components/client/register.jsx"))
const Logout = lazy(() => import("./components/client/logout.jsx"))
const BestSellers = lazy(() => import("./components/client/bestSellers.jsx"))
const EssentialOil = lazy(() => import("./components/client/essentialOil.jsx"))
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
const OrderDetail = lazy(() => import('./components/admin/orderDetail.jsx'));
const AdminLayout = lazy(() => import('./components/layouts/adminLayout.jsx'));
const Categroies = lazy(() => import('./components/admin/categroies.jsx'));
const Subcategroies = lazy(() => import('./components/admin/subCategroies.jsx'));
const BannerAndTopSlider = lazy(() => import('./components/admin/bannerAndTopSlider.jsx'));
const Orders = lazy(() => import('./components/admin/orders.jsx'));

function App() {

  return (
    <Router>
      <Navbar />

      <Suspense fallback={<div className='w-full h-screen flex justify-center items-center'><DotLoader color="#36d7b7" loading={true} /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/bestSellers" element={<BestSellers />} />
          <Route path="/henna/:subHenna" element={<Henna />} />
          <Route path="/essentialOil/:subEssentialOil" element={<EssentialOil />} />
          <Route path="/face_care" element={<Face  />} />
          <Route path="/hair_care" element={<Hair  />} />
          <Route path="/combopack/:subCombo" element={<Combopack  />} />
          <Route path="/About" element={<About />} />


          <Route path="/addtocart" element={<AddToCart />} />


          <Route path="/Refund_Return" element={<Refund_Return />} />
          <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
          <Route path="/Shipping_Policy" element={<Shipping_Policy />} />
          <Route path="/Tearms_Service" element={<Tearms_Service />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Contact" element={<Contact />} />



          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/paymentDetailSummary/:id/:variantId' element={<PaymentDetailSummary />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />

          {/* admin routes */}
          <Route path='/admin' element={<AdminLayout />} >
            <Route path='products' element={<Products />} />
            <Route path='ProductForm' element={<ProductForm />} />
            <Route path="ProductFormForUpdate/:productId" element={<ProductForm />} />

            <Route path='orders' element={<Orders />} />
            <Route path='orderDetail/:order_number' element={<OrderDetail />} />
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
