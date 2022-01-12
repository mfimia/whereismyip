import IpButton from "./components/IpButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  return (
    <Container className="mt-5" fluid>
      <Row style={{ justifyContent: "center" }}>
        <Col className="text-center" xs={2}>
          <IpButton />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
