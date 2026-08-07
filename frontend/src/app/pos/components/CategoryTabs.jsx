"use client";

import {
  IconAll,
  IconElectronics,
  IconMobile,
  IconComputers,
  IconAccessories,
  IconHomeAppliances,
  IconClothing,
  IconFootwear,
  IconBeauty,
  IconToys,
  IconOthers,
} from "./icons";

const CATEGORY_ITEMS = [
  { id: "All", label: "All", icon: IconAll },
  { id: "Electronics", label: "Electronics", icon: IconElectronics },
  { id: "Mobile Phones", label: "Mobile Phones", icon: IconMobile },
  { id: "Computers", label: "Computers", icon: IconComputers },
  { id: "Accessories", label: "Accessories", icon: IconAccessories },
  { id: "Home Appliances", label: "Home Appliances", icon: IconHomeAppliances },
  { id: "Clothing", label: "Clothing", icon: IconClothing },
  { id: "Footwear", label: "Footwear", icon: IconFootwear },
  { id: "Beauty", label: "Beauty", icon: IconBeauty },
  { id: "Toys", label: "Toys", icon: IconToys },
  { id: "Others", label: "Others", icon: IconOthers },
];

export default function CategoryTabs({ active, onSelect }) {
  return (
    <aside className="pos-category-sidebar">
      {CATEGORY_ITEMS.map((item) => {
        const IconComp = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`pos-sidebar-cat-btn ${isActive ? "active" : ""}`}
            title={item.label}
          >
            <IconComp className="pos-sidebar-cat-icon" />
            <span className="pos-sidebar-cat-label">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
