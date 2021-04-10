import React, { useState } from 'react';
import styled from 'styled-components';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import WebsiteRenderer from './renderers/WebsiteRenderer';
import OpeningHoursRenderer from './renderers/OpeningHoursRenderer';
import PhoneRenderer from './renderers/PhoneRenderer';

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 15px;

  & .show-on-hover {
    display: none !important;
  }
  &:hover .show-on-hover {
    display: block !important;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute !important; /* TODO mui styles takes precendence, why? */
  right: 0;
  margin-top: -12px !important;
  z-index: 2;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Value = styled.div`
  display: flex;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);

  i {
    color: rgba(0, 0, 0, 0.54);
  }

  > svg {
    margin: 0 10px -6px 2px;
    opacity: 0.4;
  }
`;

const Spacer = styled.div`
  padding: 0 0 1em 0;
`;

const DefaultRenderer = ({ v }) => v;
const renderers = {
  website: WebsiteRenderer,
  phone: PhoneRenderer,
  opening_hours: OpeningHoursRenderer,
};

const Property = ({ k, v }) => {
  const [isInput, setIsInput] = useState(false);
  const Renderer = renderers[k] || DefaultRenderer;

  return (
    <Wrapper>
      {!isInput && (
        <>
          <StyledIconButton
            mini="true"
            onClick={() => setIsInput(true)}
            className="show-on-hover"
          >
            <Edit
              titleAccess="Upravit v živé databázi OpenStreetMap"
              htmlColor="#9e9e9e"
            />
          </StyledIconButton>

          <Value>{v ? <Renderer v={v} /> : <i>-</i>}</Value>
        </>
      )}
      {isInput && (
        <>
          <StyledIconButton mini="true" onClick={() => setIsInput(false)}>
            <Cancel titleAccess="Zrušit" htmlColor="#9e9e9e" />
          </StyledIconButton>

          <Spacer>
            <TextField // https://codesandbox.io/s/m45ywmp86j
              label={k}
              placeholder=""
              margin="none"
              autoFocus
              fullWidth
              defaultValue={v}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Spacer>
        </>
      )}
    </Wrapper>
  );
};

export default Property;