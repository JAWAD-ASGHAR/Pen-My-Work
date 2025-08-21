import { FiFileText, FiGrid } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

export const paperTypes = [
    {
      id: "ruled",
      name: "Ruled",
      description: "Traditional lined paper",
      icon: RxHamburgerMenu,
      preview: "/lines-page.png",
    },
    {
      id: "blank",
      name: "Blank",
      description: "Clean white paper",
      icon: FiFileText,
      preview: "/blank-page.png",
    },
    {
      id: "grid",
      name: "Grid",
      description: "Graph paper with grid lines",
      icon: FiGrid,
      preview: "/grid-page.png",
    },
  ];