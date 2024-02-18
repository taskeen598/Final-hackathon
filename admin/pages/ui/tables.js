import { Row, Col} from "reactstrap";
import ProjectTables from "../../src/components/dashboard/ProjectTable";

const Tables = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default Tables;
