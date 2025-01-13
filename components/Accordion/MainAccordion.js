import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ReactMarkdown from "react-markdown";


const MainAccordion = ({ accordionData }) => {
  return (
    <Accordion defaultActiveKey="0">
      {accordionData.map((item) => (
        <Accordion.Item eventKey={item.id} key={item.id}>
          <Accordion.Header>{item.Question}</Accordion.Header>
          <Accordion.Body>
            <ReactMarkdown>
              {item.Answer}
            </ReactMarkdown>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MainAccordion;
