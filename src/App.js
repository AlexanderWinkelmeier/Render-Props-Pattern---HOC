import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./styles.css";
import withToggles from "./HOC";

// erstellt ein zufälliges Array bestehend aus 20 Produkten
const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price()
  };
});

// erstellt ein zufälliges Array bestehend aus 15 Unternehmen
const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase()
  };
});

// Komponente, die ein einzelnes Produkt in einer Liste rendert
// nimmt ein Produkt-Objekt als Prop entgegen
function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

// Komponente, die ein einzelndes Unternehmen in einer Liste rendert
// nimmt ein Unternehmensobjekt und eine defaultVisibility Prop entgegen
function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

// Diese Komponente rendert eine Liste von Produkten oder Unternehmen
// mit der Möglichkeit, die Liste zu erweitern oder zu reduzieren.
// nimmt eine Titel- und eine Items-Prop entgegen sowie
// ein render prop, das eine Funktion ist
// List weiß nicht, was es rendern wird, das bestimmt die Instanz von List
// das nennt man Inversion of Control, da nicht mehr die Komponente an sich,
// d.h. die function List bestimmt, was gerendert wird, sondern die Instanz <List render={(...) ={...}}>
function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

// !VERWENDUNG DER HOC

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it

// WrappedComponent wird mit Toggles erweitert
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

const ProductListWithToggles = withToggles(ProductList);

// ! ENDE VERWENDUNG DER HOC

// Die Hauptkomponente App rendert die List-Komponente mit dem
// Titel "Products" und den Produkten als Items.
export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        {/* Render props Muster: für jedes product soll ein ProductItem gerendert werden */}
        {/* <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        /> */}
        {/* Render props Muster: für jede company soll ein CompanyItem gerendert werden */}
        {/* <List
          title="Companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        /> */}
        <div className="col-2">
          <ProductList title="Products" items={products} />
          <ProductListWithToggles title="Products HOC" items={products} />
        </div>
      </div>
    </div>
  );
}
