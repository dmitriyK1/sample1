import Loadable from 'react-loadable';

import { LoadingView } from '../components/LoadingView';

export const asyncLoad = (loader, loading = LoadingView) =>
  Loadable({
    loader,
    loading,
  });
