import React from 'react';
import { FormFeedback, FormGroup, Input, Label, FormText } from 'reactstrap';

const ReactstrapFormikInput = ({
  /* eslint-disable react/prop-types */
  field: { ...fields },
  form: { touched, errors },
  type,
  id,
  label,
  onChange,
  description,
  ...props
}) => (
  <FormGroup>
    {type !== 'hidden' ? (
      <Label for={id} className="label-color">
        {label}
      </Label>
    ) : (
      ''
    )}
    <Input
      type={type}
      id={id}
      label={label}
      {...props}
      {...fields}
      onChange={onChange || fields.onChange}
      invalid={Boolean(touched[fields.name] && errors[fields.name])}
    />
    {description && (!touched[fields.name] || !errors[fields.name]) ? (
      <FormText>{description}</FormText>
    ) : (
      ''
    )}
    {touched[fields.name] && errors[fields.name] ? (
      <FormFeedback>{errors[fields.name]}</FormFeedback>
    ) : (
      ''
    )}
  </FormGroup>
);
export default ReactstrapFormikInput;
