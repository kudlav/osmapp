import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getConfig from 'next/config';
import { Menu, MenuItem } from '@material-ui/core';
import { useMapStateContext } from '../utils/MapStateContext';
import { useFeatureContext } from '../utils/FeatureContext';
import { useIntlContext } from '../utils/IntlContext';

const {
  publicRuntimeConfig: { osmappVersion, commitHash, commitMessage },
} = getConfig();

const Box = styled.div`
  margin-top: 10px;
  padding: 2px;
  font-size: 12px;
  line-height: normal;
  color: #000;
  background-color: #f8f4f0; /* same as osm-bright */

  svg {
    vertical-align: -2px;
    margin-right: 4px;
  }
`;

const OsmappLink = () => {
  const { showHomepage } = useFeatureContext();

  return (
    <>
      <button type="button" className="linkLikeButton" onClick={showHomepage}>
        osmapp
      </button>{' '}
      <span title={`${commitHash} ${commitMessage}`}>{osmappVersion}</span>
    </>
  );
};

const LangSwitcher = () => {
  const {
    publicRuntimeConfig: { languages },
  } = getConfig();
  const { lang, changeLang } = useIntlContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLang = (k) => {
    changeLang(k);
    handleClose();
  };

  return (
    <>
      <Menu
        id="language-switcher"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(languages).map(([k, name]) => (
          <MenuItem key={k} onClick={() => setLang(k)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
      <button
        type="button"
        className="linkLikeButton"
        aria-controls="language-switcher"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {languages[lang]}
      </button>
    </>
  );
};

const EditLink = () => {
  // fixes hydration error - server and browser have different view (cookies and window.hash)
  // throwed "Warning: Prop `href` did not match."
  const [browser, setBrowser] = useState(false);
  useEffect(() => {
    setBrowser(true);
  }, []);

  const { view } = useMapStateContext();
  const { feature } = useFeatureContext();
  const featureQuery =
    feature != null ? `?${feature.osmMeta.type}=${feature.osmMeta.id}` : '';

  return (
    <a
      href={`https://www.openstreetmap.org/edit${featureQuery}#map=${
        browser ? view.join('/') : ''
      }`}
      title="v editoru iD"
      target="_blank"
      rel="noopener"
    >
      editovat
    </a>
  );
};

const MapDataLink = () => (
  <>
    {'© '}
    <button
      type="button"
      className="linkLikeButton"
      // eslint-disable-next-line no-alert
      onClick={() => alert('(c) OpenStreetMap.org contributors')}
    >
      mapová data
    </button>
  </>
);

export const MapFooter = () => (
  <Box>
    <OsmappLink />
    {' | '}
    <LangSwitcher />
    {' | '}
    <MapDataLink />
    {' | '}
    <EditLink />
  </Box>
);
