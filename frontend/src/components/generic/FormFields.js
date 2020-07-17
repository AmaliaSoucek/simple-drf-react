import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';


function DataGetterSelect(props) {
  const [options, setOptions] = useState([]);
  const dataGetter = props.dataGetter;

  useEffect(() => {
      dataGetter()
        .then(response => {
          setOptions(response.data['results']);
        })
  }, [dataGetter]);

  return <Form.Control
              as="select"
              multiple={props.multiple}
              name={props.name}
              onChange={(e) => props.onChange(e)}
              value={props.value}
              isInvalid={props.isInvalid}
              size={props.size}
          >
            <option>------</option>
            {
              options.map(o =>
                  <option value={o[props.valueKey]} key={o[props.valueKey]}>
                    {o[props.textKey]}
                      </option>)
            }
          </Form.Control>
}

export default DataGetterSelect;
