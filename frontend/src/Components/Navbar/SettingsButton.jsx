import React from "react";

import LineIcon from "./LineIcon";

export default function SettingsButton({state:[currentPage, setCurrentPage]}) {
  const isSelected = currentPage === "settings";
    return (
      <div className="w-10 h-10 justify-center flex-row">
        <svg
          onClick={() => setCurrentPage("settings")}
          width="38"
          height="34"
          viewBox="0 0 32 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.5913 21.0855L28.7203 19.3992C29.0101 17.8089 29.0101 16.1774 28.7203 14.5871L31.5913 12.9008C31.9215 12.7089 32.0698 12.3113 31.9619 11.9411C31.2139 9.50084 29.9401 7.29358 28.2755 5.4565C28.0194 5.17545 27.6016 5.1069 27.2781 5.29883L24.4071 6.98512C23.2007 5.92948 21.8124 5.11375 20.3095 4.57908V1.21337C20.3095 0.829496 20.0467 0.493611 19.676 0.411353C17.2027 -0.150742 14.6687 -0.123322 12.3166 0.411353C11.946 0.493611 11.6831 0.829496 11.6831 1.21337V4.58593C10.187 5.12746 8.79868 5.94319 7.58559 6.99197L4.72135 5.30569C4.39112 5.11375 3.98002 5.17545 3.72392 5.46335C2.05929 7.29359 0.785551 9.50083 0.037479 11.948C-0.0770905 12.3182 0.0779153 12.7157 0.408145 12.9077L3.27912 14.594C2.98933 16.1843 2.98933 17.8157 3.27912 19.406L0.408145 21.0923C0.0779153 21.2843 -0.0703511 21.6818 0.037479 22.052C0.785551 24.4923 2.05929 26.6996 3.72392 28.5366C3.98002 28.8177 4.39786 28.8862 4.72135 28.6943L7.59233 27.008C8.79868 28.0637 10.187 28.8794 11.6899 29.4141V32.7866C11.6899 33.1705 11.9527 33.5064 12.3234 33.5886C14.7967 34.1507 17.3307 34.1233 19.6828 33.5886C20.0534 33.5064 20.3163 33.1705 20.3163 32.7866V29.4141C21.8124 28.8725 23.2007 28.0568 24.4138 27.008L27.2848 28.6943C27.615 28.8862 28.0261 28.8246 28.2822 28.5366C29.9469 26.7064 31.2206 24.4992 31.9687 22.052C32.0698 21.675 31.9215 21.2774 31.5913 21.0855ZM15.9963 22.477C13.0243 22.477 10.6048 20.0161 10.6048 16.9931C10.6048 13.9702 13.0243 11.5093 15.9963 11.5093C18.9684 11.5093 21.3878 13.9702 21.3878 16.9931C21.3878 20.0161 18.9684 22.477 15.9963 22.477Z"
            className={`${isSelected?'fill-primaryDark': 'fill-white'}`}
          />
        </svg>
        {isSelected ? <LineIcon/> : ""}
      </div>
    );
}
