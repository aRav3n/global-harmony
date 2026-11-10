import "../styles/PageWrapper.css";

import { Header } from "./Header";
import { Footer } from "./Footer";

import type { PageWrapperImports } from "../types";

export function PageWrapper({ children }: PageWrapperImports) {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-wrapper">{children}</main>
      <Footer />
    </div>
  );
}
