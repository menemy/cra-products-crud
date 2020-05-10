import * as React from 'react';
import { FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';

const ReactstrapSelectInput = ({
  /* eslint-disable react/prop-types */
  field,
  form: { touched, errors },
  inputprops,
  description,
  label,
  ...props
}) => {
  const error = errors[field.name];
  const touch = touched[field.name];
  return (
    <FormGroup>
      <Label for={inputprops.id} className="label-color">
        {label}
      </Label>
      <Input
        id={inputprops.id}
        label={label}
        {...field}
        {...props}
        type="select"
        invalid={Boolean(touched[field.name] && errors[field.name])}
        placeholder="Test"
      >
        {inputprops.options.map((option, index) => {
          if (option.name)
            return (
              <option value={option.id} key={String(index)}>
                {option.name}
              </option>
            );
          return (
            <option value={option} key={String(index)}>
              {option}
            </option>
          );
        })}
      </Input>
      {description && (!touch || !error) ? (
        <FormText>{description}</FormText>
      ) : (
        ''
      )}
      {touch && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default ReactstrapSelectInput;
