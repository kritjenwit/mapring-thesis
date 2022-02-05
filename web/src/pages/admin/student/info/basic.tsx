import React from "react";
import { Col, Row, SSRProvider } from "react-bootstrap";
import { Layout } from "../../../../components/Layout";

interface basicProps {}

const basic: React.FC<basicProps> = ({}) => {
  return (
    <SSRProvider>
      <Layout>
        <Row style={{ marginTop: 20 }}>
          <Col lg={12}>
            <h4>ด้านประวัติทะเบียนนักเรียน</h4>
            <Row style={{ marginTop: 20 }}>
              <Col lg={12}>
                <h4><u>ข้อมูลเบื้องต้น</u></h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </SSRProvider>
  );
};

export default basic;
