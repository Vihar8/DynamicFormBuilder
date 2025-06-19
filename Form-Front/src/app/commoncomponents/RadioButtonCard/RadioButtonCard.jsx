import classes from "./RadioButtonCard.module.scss";

const RadioButtonCard = ({ title, description, icon, isSelected, onClick }) => {
  return (
    <div
      className={`${classes.radiocard} ${isSelected ? classes.selected : ""}`}
      onClick={onClick}
    >
      <div className={`${classes.radiocardcontent}`}>
        <div>
          <div className={`${classes.radiocardtitle}`}>{title}</div>
          <div className={`${classes.radiocarddescription}`}>{description}</div>
        </div>
        <div className={`${classes.radiocardicon}`}>{icon}</div>
      </div>
      {/* <input type="radio" checked={isSelected} readOnly /> */}
    </div>
  );
};

export default RadioButtonCard;
