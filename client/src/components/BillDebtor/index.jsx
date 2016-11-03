import React from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

const BillDebtor = (props) => {
  const fieldChange = (event) => {
    const field = {
      name: event.target.getAttribute('name').match(/([a-z]+)$/)[1],
      tagName: event.target.tagName,
      type: event.target.getAttribute('type'),
    };
    props.changeBillDebtor(props.index, {
      [field.name]: field.value,
    });
  }

  return (
    <div className="BillDebtor">
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl
              className="debtor"
              name={`billDebtor-${props.index}-debtor`}
              onChange={fieldChange}
              placeholder="Debtor"
              type="text"
              value={props.debtor}
              // disabled={!!props.payerId}
            />
            <InputGroup.Button>
              <Button
                bsStyle="danger"
                onClick={event => props.deleteBillDebtor(event, props.index)}
                // disabled={!!props.payerId}
                >
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
  // eslint-disable-next-line react/no-unused-prop-types
  changeBillDebtor: React.PropTypes.func.isRequired,
  deleteBillDebtor: React.PropTypes.func.isRequired,
  payerId: React.PropTypes.string.isRequired,
  debtor: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired
}

export default BillDebtor;