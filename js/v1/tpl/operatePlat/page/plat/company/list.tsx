import { Button } from 'common/antd/button';
import { Col } from 'common/antd/col';
import { Input } from 'common/antd/input';
import { message } from 'common/antd/message';
import {Modal} from 'common/antd/modal';
import { Popconfirm } from 'common/antd/popconfirm';
import { Row } from 'common/antd/row';
import { Table } from 'common/antd/table';
import { mutate, Querier } from 'common/component/restFull';
import { Radium } from 'common/radium';
import * as _ from 'lodash';
import { autorun, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { withAppState, WithAppState } from 'operatePlat/common/appStateStore';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

@Radium
@observer
export class ListView extends React.Component<RouteComponentProps<any> & WithAppState, {}> {
    private query: Querier<any, any> = new Querier(null);
    private disposers: Array<() => void> = [];
    private columns: any[];

    @observable private loading: boolean = false;
    @observable private resultData: any;

    @observable private short_name: string;
    @observable private name: string;
    @observable private mobile: string;

    @observable private page: number = 1;
    @observable private size: number = 20;

    constructor(props: any) {
        super(props);
        this.setColumns();
    }

    componentWillUnmount() {
        this.disposers.forEach(f => f());
        this.disposers = [];
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        this.query.setReq({
            url: '/api/crm/companys',
            method: 'get',
            variables: {
                mobile: this.mobile && this.mobile.length > 0 ? this.mobile : undefined,
                short_name: this.short_name && this.short_name.length > 0 ? this.short_name : undefined,
                name: this.name && this.name.length > 0 ? this.name : undefined,
                page: this.page,
                per_page: this.size,
            },
        });

        this.disposers.push(autorun(() => {
            this.loading = this.query.refreshing;
        }));

        this.disposers.push(reaction(() => {
            return {
                mobile: this.mobile && this.mobile.length > 0 ? this.mobile : undefined,
                short_name: this.short_name && this.short_name.length > 0 ? this.short_name : undefined,
                name: this.name && this.name.length > 0 ? this.name : undefined,
                page: this.page,
                per_page: this.size,
            };
        }, searchData => {
            this.query.setReq({
                url: '/api/crm/companys',
                method: 'get',
                variables: {
                    mobile: this.mobile && this.mobile.length > 0 ? this.mobile : undefined,
                    short_name: this.short_name && this.short_name.length > 0 ? this.short_name : undefined,
                    name: this.name && this.name.length > 0 ? this.name : undefined,
                    page: this.page,
                    per_page: this.size,
                },
            });
        }));

        this.disposers.push(reaction(() => {
            return (_.get(this.query.result, 'result.data') as any) || [];
        }, searchData => {
            this.resultData = searchData;
        }));
    }

    setColumns() {
        this.columns = [
            {
                title: '编号',
                width: '15%',
                dataIndex: 'id',
            },
            {
                title: '公司名',
                width: '15%',
                dataIndex: 'name',
            },
            {
                title: '公司简称',
                width: '15%',
                dataIndex: 'short_name',
            },
            {
                title: '手机号',
                width: '15%',
                dataIndex: 'mobile',
            },
            {
                title: '操作',
                width: '15%',
                key: 'action',
                dataIndex: 'action',
                render: (text: any, record: any, index: any) => (
                    <div>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/edit/${record.id}`);
                        }} >修改</a>
                        <span style={{ margin: '0 3px' }}>|</span>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/config/edit/${record.id}`);
                        }} >配置项目</a>
                        <span style={{ margin: '0 3px' }}>|</span>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/bank/edit/${record.id}`);
                        }} >银行卡列表</a>
                        <span style={{ margin: '0 3px' }}>|</span>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/recharge/chargeselect/${record.id}`);
                        }} >查询费充值</a>
                        <span style={{ margin: '0 3px' }}>|</span>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/recharge/charge/${record.id}`);
                        }} >手动充值</a>
                        <span style={{ margin: '0 3px' }}>|</span>
                        <a href='javascript:;' style={{ display: 'inline-block' }} onClick={() => {
                            this.props.history.push(`/operatePlat/company/appConfig/edit/${record.id}`);
                        }} >App 配置</a>
                        <span style={{margin: '0 3px'}}>|</span>
                        <a href='javascript:;' style={{display: 'inline-block'}} onClick={() => {
                            mutate<{}, any>({
                                url: `/api/crm/companys/${record.id}/loginid`,
                                method: 'post',
                            }).then(r => {
                                if (r.status_code === 200) {
                                    window.open(`${r.data.domain}/management/user/login?loginFastCode=${r.data.code}`);
                                    return;
                                }
                                message.warn(r.message);
                            }, error => {
                                Modal.error({
                                    title: '警告',
                                    content: `Error: ${JSON.stringify(error)}`,
                                });
                            });
                        }}>快速登陆后台</a>
                    </div>
                ),
            },
        ];
    }

    render() {
        const dataSource = (_.get(toJS(this.resultData), 'list') as any[] || []).map((r, i) => {
            r['key'] = i;
            return r;
        });

        return (
            <div style={{ padding: 24 }}>
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Input.Search
                            placeholder='输入手机号'
                            onSearch={value => this.mobile = value}
                        />
                    </Col>
                    <Col span={8}>
                        <Input.Search
                            placeholder='输入公司名'
                            onSearch={value => this.name = value}
                        />
                    </Col>
                    <Col span={8}>
                        <Input.Search
                            placeholder='输入公司简称'
                            onSearch={value => this.short_name = value}
                        />
                    </Col>
                </Row>
                <div>
                    <Button type='primary'
                        style={{ marginBottom: '15px' }}
                        onClick={() => {
                            this.props.history.push(`/operatePlat/company/edit`);
                        }} >添加</Button>

                    <Button type='primary'
                        style={{ marginBottom: '15px', marginLeft: '15px' }}
                        onClick={() => {
                            this.props.history.push(`/operatePlat/company/recharge/chargefromcode`);
                        }} >充值码充值</Button>
                </div>
                <Table columns={toJS(this.columns)}
                    loading={this.loading}
                    pagination={{
                        current: this.page,
                        total: (_.get(toJS(this.resultData), 'total') as number || 0),
                        defaultPageSize: this.size,
                        onChange: (page, pageSize) => {
                            this.page = page;
                            this.size = pageSize;
                        },
                    }}
                    dataSource={dataSource} />
            </div>
        );
    }
}

export const List = withRouter(withAppState(ListView));
