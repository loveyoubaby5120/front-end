import { Toast } from 'common/antd/mobile/toast';
import { WithAuth, withAuth } from 'common/component/auth';
import { HttpStatus404 } from 'mobile/app/httpStatus404/page/404';
import * as React from 'react';
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from 'react-router-dom';
import { LoginReg } from './loginReg';

class Logout extends React.Component<RouteComponentProps<any> & WithAuth, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.auth.logout().then((r) => {
            if (r.kind === 'result') {
                this.props.history.push('/promotion/user/login');
                return;
            }
            Toast.info(r.error);
        }).catch(() => {
            this.props.history.push('/promotion/user/login');
        });
    }
    render() {
        return <div>退出中...</div>;
    }
}

export const UserRouter = (
    <div>
        <Switch>
            <Route path='/promotion/user/logout' component={withRouter(withAuth(Logout))} />
            <Route path='/promotion/user/:kind' component={LoginReg} />
            <Route component={HttpStatus404} />
        </Switch>
    </div>
);
