import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Feature } from '../../services/types';
import { useBoolState } from '../helpers';

export interface FeatureContextType {
  feature: Feature | null;
  featureShown: boolean;
  setFeature: (feature: Feature | null) => void; // setFeature - used only for skeletons (otherwise it gets loaded by router)
  homepageShown: boolean;
  hideHomepage: () => void;
  showHomepage: () => void;
  preview: Feature | null;
  setPreview: (feature: Feature | null) => void;
}

export const FeatureContext = createContext<FeatureContextType>(undefined);

interface Props {
  featureFromRouter: Feature | null;
  children: ReactNode;
  hpCookie: string;
}

export const FeatureProvider = ({
  children,
  featureFromRouter,
  hpCookie,
}: Props) => {
  const [preview, setPreview] = useState<Feature>(null);
  const [feature, setFeature] = useState<Feature>(featureFromRouter);
  const featureShown = feature != null;

  useEffect(() => {
    // set feature on next.js router transition
    setFeature(featureFromRouter);
  }, [featureFromRouter]);

  const [homepageShown, showHp, hideHp] = useBoolState(
    feature == null && hpCookie !== 'yes',
  );
  const showHomepage = () => {
    Router.push('/');
    setFeature(null);
    showHp();
    Cookies.remove('hideHomepage');
  };
  const hideHomepage = () => {
    hideHp();
    Cookies.set('hideHomepage', 'yes', { expires: 30, path: '/' });
  };

  const value = {
    feature,
    featureShown,
    setFeature,
    homepageShown,
    showHomepage,
    hideHomepage,
    preview,
    setPreview,
  };
  return (
    <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>
  );
};

export const useFeatureContext = () => useContext(FeatureContext);
