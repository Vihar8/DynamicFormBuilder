import React from "react";
import classes from "./Breadcrumb.module.scss";
// import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <div className={`${classes.breadcumSeparate}`}>
      <div className={`${classes.breadcumSeparate}`}>
        {props?.links ? (
          <Link to={props?.links} className={`${classes.page_title}`}>
            {props?.title}
          </Link>
        ) : (
          <span className={`${classes.page_title}`}>{props?.title}</span>
        )}
        {/* {props?.items?.length > 0 && (
          <span className="text-gray-400">&#8725;</span>
        )} */}
      </div>
      {props?.items?.map((item, i) => (
        <div key={i} className={`${classes.breadcumSeparate}`}>
          {item.link ? (
            <>
              <span className="text-gray-400">&#8725;</span>
              <Link to={item.link} className={`${classes.lable_title}`}>
                {item.label}
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-400">&#8725;</span>
              <span className={`${classes.lable_title}`}>{item.label}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default Breadcrumb;
