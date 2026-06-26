import React from "react";
import { Outlet } from "react-router-dom";

// Lazy-loaded page components
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Services = React.lazy(() => import("../pages/Services"));
const ServiceDetail = React.lazy(() => import("../pages/ServiceDetail"));
const Projects = React.lazy(() => import("../pages/Projects"));
const ProjectDetails = React.lazy(() => import("../pages/ProjectDetails"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const Contact = React.lazy(() => import("../pages/Contact"));
const RequestQuote = React.lazy(() => import("../pages/RequestQuote"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const CatalogDetail = React.lazy(() => import("../pages/CatalogDetail"));
const Rentals = React.lazy(() => import("../pages/Rentals"));
const Lands = React.lazy(() => import("../pages/Lands"));
const Designs = React.lazy(() => import("../pages/Designs"));
const Artifacts = React.lazy(() => import("../pages/Artifacts"));
const Materials = React.lazy(() => import("../pages/Materials"));
const BuildingPlans = React.lazy(() => import("../pages/BuildingPlans"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));
const AdminGallery = React.lazy(() => import("../pages/AdminGallery"));
const TestimonialsPage = React.lazy(() => import("../pages/Testimonials")); // New page
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegistrationPage = React.lazy(() => import("../pages/RegistrationPage"));
const ProtectedRoute = React.lazy(() => import("../components/common/ProtectedRoute"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/services/:id", element: <ServiceDetail /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:id", element: <ProjectDetails /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/contact", element: <Contact /> },
  { path: "/request-quote", element: <RequestQuote /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/testimonials", element: <TestimonialsPage /> }, // New route
  {
    path: "/catalog",
    children: [
      { index: true, element: <Catalog /> },
      { path: "rentals", element: <Rentals /> },
      { path: "rentals/:id", element: <CatalogDetail /> },
      { path: "lands", element: <Lands /> },
      { path: "lands/:id", element: <CatalogDetail /> },
      { path: "designs", element: <Designs /> },
      { path: "designs/:id", element: <CatalogDetail /> },
      { path: "artifacts", element: <Artifacts /> },
      { path: "artifacts/:id", element: <CatalogDetail /> },
      { path: "materials", element: <Materials /> },
      { path: "materials/:id", element: <CatalogDetail /> },
      { path: "building-plans", element: <BuildingPlans /> },
      { path: "building-plans/:id", element: <CatalogDetail /> },
      { path: ":category/:id", element: <CatalogDetail /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/gallery", element: <AdminGallery /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];