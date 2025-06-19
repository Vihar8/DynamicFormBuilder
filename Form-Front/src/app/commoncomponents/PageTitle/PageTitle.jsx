import classes from "./PageTitle.module.scss";
import Container from "../Container/Container";

const PageTitle = (props) => {
  const { title } = props;

  return (
    <div className={`${classes.pageHeadings}`}>
      <Container>
        <h1 className={`${classes.headings}`}>{title}</h1>
      </Container>
    </div>
  );
};

export default PageTitle;
