import { Button } from 'common/antd/button';
import { Card } from 'common/antd/card';
import { Col } from 'common/antd/col';
import { Form } from 'common/antd/form';
import { Icon } from 'common/antd/icon';
import { Input } from 'common/antd/input';
import { message } from 'common/antd/message';
import { Modal } from 'common/antd/modal';
import { Row } from 'common/antd/row';
import { Select } from 'common/antd/select';
import { Spin } from 'common/antd/spin';
import {mutate} from 'common/component/restFull';
import { SearchTable } from 'common/component/searchTable';
import {BaseForm} from 'common/formTpl/baseForm';
import * as _ from 'lodash';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import {
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import Title from '../../../../common/TitleComponent';
import detail from './detail/router';

@observer
export default class Product extends React.Component<{}, any> {
    @observable private auditVisible: boolean = false;
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Title>
                <Switch>
                </Switch>
            </Title>
        );
    }
}