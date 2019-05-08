import { AuthProvider } from 'common/auth';
import * as React from 'react';
import { render } from 'react-dom';
import { routes } from './routes';

import { SearchToObject } from 'common/fun';
import 'mobile/common/antd_theme.less';
import { AppStateProvider } from 'mobile/common/appStateStore';

declare const window: any;

if (!window.app) {
    window.app = {};
}

if (!window.app.token && SearchToObject(window.location.search)['token']) {
    window.app.token = SearchToObject(window.location.search)['token'];
}

render(
    <AuthProvider loginURL='/bill/user/login'>
        <AppStateProvider>
            {routes}
        </AppStateProvider>
    </AuthProvider>,
    document.getElementById('reactApp'));
