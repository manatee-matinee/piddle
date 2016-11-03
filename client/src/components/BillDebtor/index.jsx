import React from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

const BillDebtor = (props) => {
  const fieldChange = (event) => {
    const field = {
      name: event.target.getAttribute('name').match(/([a-z]+)$/)[1],
      tagName: event.target.tagName,
      type: event.target.getAttribute('type'),
    };
  }

  return (
    <div className="BillDebtor">
      <div>
        <FormControl
          className="debtor"
          name={`billDebtor-${props.index}-description`}
          onChange={fieldChange}
          placeholder="Debtor"
          type="text"
          value={props.debtor}
          disabled={!!props.payerId}
        />
        <FormGroup>
          <InputGroup>
            <InputGroup.Button>
              <Button
                bsStyle="danger"
                onClick={event => props.deleteBillDebtor(event, props.index)}
                disabled={!!props.payerId}>
                Delete
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    </div>
  );
};

BillDebtor.propTypes = {
  deleteBillDebtor: React.PropTypes.func.isRequired,
  payerId: React.PropTypes.string.isRequired,
  debtor: React.PropTypes.string.isRequired
}