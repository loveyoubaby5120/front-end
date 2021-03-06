import { Button } from 'common/antd/button';
import { Col } from 'common/antd/col';
import { Form } from 'common/antd/form';
import { message } from 'common/antd/message';
import { Modal } from 'common/antd/modal';
import { Row } from 'common/antd/row';
import { Spin } from 'common/antd/spin';
import { Table } from 'common/antd/table';
import { mutate } from 'common/component/restFull';
import { TableList } from 'common/component/searchTable';
import { BaseForm, ComponentFormItem, TypeFormItem } from 'common/formTpl/baseForm';
import * as _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';
import {
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import {withAppState} from '../../../../common/appStateStore';
import CardClass from '../../../../common/CardClass';
import {EmergencyContact, ImageData, PhoneContacts} from '../../../../common/InfoComponent';
import Title from '../../../../common/TitleComponent';
import Audit from './audit';
import Reject from './reject';

interface PassPropsType {
    passVisible: boolean;
    passCancel: () => void;
    id: string | number;
    onOk: () => void;
    form?: any;
    default_amount_date: string;
    default_amount: string;
}
@observer
class PassComponent extends React.Component<PassPropsType, any> {
    @observable private loading: boolean = false;
    constructor(props: any) {
        super(props);
    }
    reject() {
        if (this.loading) {
            return;
        }
        const that = this;
        this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                const json: any = _.assign({}, values);
                if (json.expired_at) {
                    json.expired_at = json.expired_at.format('YYYY-MM-DD');
                }
                this.loading = true;
                const res: any = await mutate<{}, any>({
                    url: '/api/admin/apply/passed/' + this.props.id,
                    method: 'put',
                    variables: json,
                }).catch((error: any) => {
                    Modal.error({
                        title: '警告',
                        content: `Error: ${JSON.stringify(error)}`,
                    });
                    return {};
                });
                that.loading = false;
                if (res.status_code === 200) {
                    message.success('操作成功');
                    this.cancel();
                    this.props.onOk();
                }
            }
        });
    }
    cancel() {
        this.props.form.resetFields();
        this.props.passCancel();
    }
    render() {
        const formItem: Array<TypeFormItem | ComponentFormItem> = [
            { itemProps: { label: '额度' },
                initialValue: this.props.default_amount ? this.props.default_amount : '',
                key: 'amount', type: 'input', required: true },
            { itemProps: { label: '额度有效期' },
                initialValue: this.props.default_amount_date ? moment(this.props.default_amount_date) : undefined,
                key: 'expired_at', type: 'datePicker',
                required: true,
            },
        ];
        return (<Modal
            title={'审核通过'}
            visible={this.props.passVisible}
            onOk={() => this.reject()}
            onCancel={() => this.cancel()}
        >
            <Spin spinning={this.loading}>
                <BaseForm item={formItem} form={this.props.form} />
            </Spin>
        </Modal>);
    }
}
const Pass: any = Form.create()(PassComponent);
interface RemarkPropsType {
    remarkVisible: boolean;
    remarkCancel: () => void;
    onOk: () => void;
    id: string | number;
    form?: any;
    editRmkId?: any;
}

@observer
class RemarkComponent extends React.Component<RemarkPropsType, any> {
    @observable private loading: boolean = false;
    constructor(props: any) {
        super(props);
    }
    remark() {
        if (this.loading) {
            return;
        }
        this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                const json: any = _.assign({}, values);
                let url = '/api/admin/apply/remark/' + this.props.id;
                let method = 'post';
                if (this.props.editRmkId) {
                    method = 'put';
                    url = `/api/admin/apply/remark/${this.props.id}/${this.props.editRmkId}`;
                }
                this.loading = true;
                const res: any = await mutate<{}, any>({
                    url,
                    method,
                    variables: json,
                }).catch((error: any) => {
                    Modal.error({
                        title: '警告',
                        content: `Error: ${JSON.stringify(error)}`,
                    });
                    return {};
                });
                this.loading = false;
                if (res.status_code === 200) {
                    message.success('操作成功');
                    this.cancel();
                    this.props.onOk();
                }
            }
        });
    }
    cancel() {
        this.props.form.setFieldsValue({ content: '' });
        this.props.remarkCancel();
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const formItem: Array<TypeFormItem | ComponentFormItem> = [
            { itemProps: { label: '备注内容' },
                formItemLayout,
                typeComponentProps: {style: { height: 180}},
                required: true,
                initialValue: '',
                key: 'content',
                type: 'textArea',
            },
        ];
        return (<Modal
            forceRender
            title={'备注'}
            width={800}
            visible={this.props.remarkVisible}
            onOk={() => this.remark()}
            onCancel={() => this.cancel()}
        >
            <Spin spinning={this.loading}>
                <BaseForm item={formItem} form={this.props.form} />
            </Spin>
        </Modal>);
    }
}
const Remark: any = Form.create()(RemarkComponent);
interface DetailPropsType {
    data: any;
    location: any;
    history: any;
}
@observer
class Detail extends React.Component<DetailPropsType, {}> {
    @observable private auditVisible: boolean = false;
    @observable private id: string | number = '';
    @observable private loading: boolean = true;
    @observable private auditLoading: boolean = false;
    @observable private passVisible: boolean = false;
    @observable private rejectVisible: boolean = false;
    @observable private rmkVisible: boolean = false;
    @observable private editRmkId: any;
    @observable private editAudit: any;
    @observable private rmkComponent: any;
    @observable private detail: any = {};
    @observable private black: number = 1;
    constructor(props: any) {
        super(props);
        this.id = props.match.params.id;
    }
    componentWillReceiveProps(props: any) {
        if (this.id === props.match.params.id) {
            return;
        } else {
            this.id = props.match.params.id;
            this.getDetail();
        }
    }
    componentDidMount() {
        this.getDetail();
    }
    editRmk(data: any) {
        this.editRmkId = data.id;
        this.rmkComponent.props.form.setFieldsValue({ content: data.content });
        this.rmkVisible = true;
    }
    async getDetail() {
        const res: any = await mutate<{}, any>({
            url: '/api/admin/apply/lists/' + this.id,
            method: 'get',
        });
        if (res.status_code === 200) {
            this.detail = res.data;
            const name = this.detail.customer.name;
            this.props.data.appState.panes.map((item: any) => {
                if (item.url === '/credit/audit/' + this.id) {
                    item.title =  '审核详情|' + (name || '');
                    item.data =  {name};
                }
            });
        }
        const res2: any = await mutate<{}, any>({
            url: '/api/admin/apply/savecreditbutton/' + this.id,
            method: 'get',
        });
        if (res2.status_code === 200) {
            this.editAudit = +res2.data.button_status;
        }
        const res3: any = await mutate<{}, any>({
            url: '/api/admin/apply/modules/status/' + this.id,
            method: 'get',
        });
        if (res3.status_code === 200) {
            this.detail.infoList = res3.data;
        }
        this.loading = false;
    }
    async getAuditAutoReport() {
        const json = {
            apply_id: this.detail.id,
            flow_id: this.detail.flow_id,
        };
        const res: any = await mutate<{}, any>({
            url: '/api/admin/riskflow/anew',
            method: 'get',
            variables: json,
        });
        if (res.status_code === 200) {
            this.getDetail();
        }
    }
    async audit(data: any) {
        if (this.auditLoading) {
            return;
        }
        this.auditLoading = true;
        const res: any = await mutate<{}, any>({
            url: '/api/admin/apply/savecreditresult',
            method: 'post',
            variables: data,
        }).catch((error: any) => {
            this.auditLoading = false;
            Modal.error({
                title: '警告',
                content: `Error: ${JSON.stringify(error)}`,
            });
            return {};
        });
        this.auditLoading = false;
        if (res.status_code === 200) {
            message.success('操作成功');
            this.auditVisible = false;
            this.getDetail();
        } else {
            message.error(res.message);
        }
        return new Promise((reslove) => reslove());
    }
    async reject(data: any) {
        if (this.loading) {
            return;
        }
        const res: any = await mutate<{}, any>({
            url: '/api/admin/apply/reject/' + this.id,
            method: 'put',
            variables: data,
        }).catch((error: any) => {
            Modal.error({
                title: '警告',
                content: `Error: ${JSON.stringify(error)}`,
            });
            return {};
        });
        if (res.status_code === 200) {
            message.success('操作成功');
            this.rejectVisible = false;
            this.getDetail();
        } else {
            message.error(res.message);
        }
        return new Promise((reslove) => reslove());
    }
    async toInfo(key: string) {
        if (key === 'phoneOperator') {
            const res: any = await mutate<{}, any>({
                url: '/api/admin/apply/modules/' + this.id + '/phoneOperator',
                method: 'get',
            });
            if (res.status_code === 200) {
                window.open(res.data);
            }
        } else {
            const infoObj: any = {
                phoneContacts: '/management/credit/audit/' + this.id + '/phoneContacts',
                emergencyContact: '/management/credit/audit/' + this.id + '/emergencyContact',
                imageData: '/management/credit/audit/' + this.id + '/imageData',
            };
            this.props.history.push(infoObj[key]);
        }

    }
    render() {
        const jurisdiction: number[] = this.props.data.appState.jurisdiction || [];
        const remarkColumn = [
            { title: '备注时间', key: 'updated_at_text', dataIndex: 'updated_at_text' },
            { title: '操作人', key: 'account_name', dataIndex: 'account_name' },
            { title: '备注内容', key: 'content', dataIndex: 'content' },
            { title: '操作', key: 'set', render: (data: any) => jurisdiction.indexOf(55) > -1 ? <a onClick={() => this.editRmk(data)}>修改</a> : null },
        ];
        const creditColumn = [
            { title: '时间', key: 'created_at', dataIndex: 'created_at' },
            { title: '操作人', key: 'account_name', dataIndex: 'account_name' },
            { title: '内容', key: 'content', dataIndex: 'content' },
        ];
        const historyColumn = [
            { title: '申请日期', key: 'apply_at_text', dataIndex: 'apply_at_text' },
            { title: '审核结果', key: 'apply_status_text', dataIndex: 'apply_status_text' },
            { title: '提现状态', key: 'withdraw_status_text', dataIndex: 'withdraw_status_text' },
            { title: '借款日期', key: 'loan_at_text', dataIndex: 'loan_at_text' },
            { title: '逾期次数', key: 'overdue_num', dataIndex: 'overdue_num' },
            { title: '展期次数', key: 'extension_num', dataIndex: 'extension_num' },
            { title: '结清日期', key: 'clearing_time_text', dataIndex: 'clearing_time_text' },
        ];
        const resultColumn = [
            { title: '命中规则', key: 'rule_name', dataIndex: 'cl_name' },
            { title: '规则标准', key: 'rule_standard', dataIndex: 'value' },
            { title: '借款人数据', key: 'risk_result', dataIndex: 'actual_value' },
        ];
        (this.detail.risk_rule || []).map((item: any, index: number) => {
            item.key = index;
        });
        (this.detail.apply_history || []).map((item: any, index: number) => {
            item.key = index;
        });
        (this.detail.credit_record || []).map((item: any, index: number) => {
            item.key = index;
        });
        (this.detail.customer_remark || []).map((item: any, index: number) => {
            item.key = index;
        });
        const {apply_history_statistics = {}, auditAuto = {}, customer = {}, apply_status } = this.detail;
        const infoList = this.detail.infoList || {};
        const infoObj: any = {
            phoneContacts: '通讯录',
            phoneOperator: '运营商',
            emergencyContact: '紧急联系人',
            imageData: '影像资料',
        };
        let result: any;
        if (auditAuto.suggest === 1) {
            result = <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '20px'}}>风控结果查询中......请耐心等待</div>
            </div>;
        } else if  (auditAuto.suggest === 5) {
            result = <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '20px'}}>风控结果获取失败，原因：<span style={{color: 'red'}}>{auditAuto.suggest_text}</span></div>
                <div style={{marginTop: '20px'}}><Button type='primary' onClick={() => this.getAuditAutoReport()}>重新获取风控报告</Button></div>
            </div>;
        } else {
            result = <div>
                <Row style={{ fontSize: 22, marginBottom: 24 }}>
                    <Col span={6}>机审结果：{auditAuto.suggest_text}</Col>
                    <Col span={6}>风控建议：{auditAuto.credit_level_text}</Col>
                    <Col span={6}>风险评级：{auditAuto.risk_rating}</Col>
                    <Col span={6}>评分：{auditAuto.score}</Col>
                </Row>
                <Table rowKey={'key'} columns={resultColumn} dataSource={auditAuto.des || []} pagination={false} />
            </div>;
        }
        const history = <div>
            <Row style={{ marginBottom: 24 }}>
                <Col span={4}><Link to={'/management/credit/audit?phone=' + customer.phone}>申请次数：{apply_history_statistics.apply_num}</Link></Col>
                <Col span={4}>通过次数：{apply_history_statistics.pass_num}</Col>
                <Col span={4}>拒绝次数：{apply_history_statistics.reject_num}</Col>
                <Col span={4}><Link to={'/management/credit/withdraw?phone=' + customer.phone + '&loan_status=3'}>借款次数：{apply_history_statistics.loan_num}</Link></Col>
                <Col span={4}>逾期次数：{apply_history_statistics.overdue_num}</Col>
                <Col span={4}>展期次数：{apply_history_statistics.extension_num}</Col>
            </Row>
            <Table rowKey={'key'} columns={historyColumn} dataSource={this.detail.apply_history || []} pagination={false} />
        </div>;
        const info = <div>
            {
                Object.keys(infoList).map((item: any, index: number) =>
                    <Button
                        type='primary'
                        onClick={() => this.toInfo(item)}
                        size={'large'}
                        disabled={!infoList[item]}
                        key={index}
                        style={{ marginRight: 20 }}>
                        {infoObj[item]}
                    </Button>)
            }
        </div>;
        const credit = <div>
            <Table rowKey={'key'} columns={creditColumn} dataSource={this.detail.credit_record || []} pagination={false} />
        </div>;
        const remark = <div>
            <Table rowKey={'key'} columns={remarkColumn} dataSource={this.detail.customer_remark || []} pagination={false} />
        </div>;
        const component = this.loading ? [<Spin />] : [
            <div style={{ height: '110px' }}>
                <div>
                    {
                        this.detail.id
                            ?
                            <Audit
                                onOk={(data: any) => this.audit(data)}
                                default_amount={this.detail.default_amount}
                                default_black_status={this.detail.default_black_status}
                                default_amount_date={this.detail.expiration_date}
                                id={this.id}
                                visible={this.auditVisible}
                                apply_status={apply_status}
                                onCancel={() => { this.auditVisible = false; } }
                            />
                            :
                            null
                    }
                    <Pass
                        onOk={() => this.getDetail()}
                        default_amount={this.detail.default_amount}
                        default_amount_date={this.detail.default_amount_date}
                        id={this.id}
                        passCancel={() => { this.passVisible = false; }}
                        passVisible={this.passVisible} />
                    <Reject
                        rejectVisible={this.rejectVisible}
                        rejectCancel={() => this.rejectVisible = false}
                        onOk={(values: any) => this.reject(values)}
                    />
                    <Remark
                        wrappedComponentRef={(ref: TableList) => { this.rmkComponent = ref; }}
                        onOk={() => this.getDetail()}
                        credit={this.detail.credit}
                        editRmkId={this.editRmkId}
                        id={this.id}
                        remarkCancel={() => { this.rmkVisible = false; }}
                        remarkVisible={this.rmkVisible} />
                </div>
                <div style={{ width: '600px', float: 'left' }}>
                    <div style={{ fontSize: '24px', marginBottom: '15px' }}>
                        {
                            this.detail.customer
                                ?
                                <span>{this.detail.customer.phone}<span style={{ margin: '0 10px' }}>|</span>{this.detail.customer.name}</span>
                                :
                                ''
                        }
                        {
                            +this.detail.apply_status === 1 ?  <span style={{ fontSize: '14px', marginLeft: '60px' }}>{this.detail.audit_level_text}</span> : ''
                        }
                    </div>
                    <Row style={{ marginBottom: '15px' }}>
                        <Col span={12}>申请编号：{this.detail.apply_no}</Col>
                        <Col span={8}>关联渠道：{this.detail.channel ? this.detail.channel.name : ''}</Col>
                        {/*<Col span={8}>负责人：{this.detail.assign_name}</Col>*/}
                    </Row>
                    <Row style={{ marginBottom: '15px' }}>
                        <Col span={8}>审核结果：{this.detail.apply_status_text}</Col>
                        {
                            this.detail.apply_status === 2
                                ?
                                <Col span={8}>额度：{this.detail.credit ? this.detail.credit.credit_amount : ''}</Col>
                                :
                                ''
                        }
                        <Col span={8}>有效期：{this.detail.expiration_date}</Col>
                    </Row>
                </div>
                <div style={{ width: '300px', float: 'right' }}>
                    {
                        jurisdiction.indexOf(42) > -1 && this.detail.apply_status === 1 ? <Button style={{ marginRight: 20 }} type='primary' onClick={() => this.passVisible = true}>通过</Button> : ''
                    }
                    {
                        jurisdiction.indexOf(43) > -1 && this.detail.apply_status === 1 ? <Button style={{ marginRight: 20 }} type='primary' onClick={() => this.rejectVisible = true}>拒绝</Button> : ''
                    }
                    {
                        jurisdiction.indexOf(54) > -1 ? <Button type='primary' style={{ marginRight: 20 }} onClick={() => {this.editRmkId = ''; this.rmkVisible = true; }}>客户备注</Button> : null
                    }
                    {
                        jurisdiction.indexOf(62) > -1 && this.editAudit === 1 ? <Button type='primary' onClick={() => { this.auditVisible = true; }}>更改授信结果</Button> : null
                    }
                </div>
            </div>,
            <CardClass title='机审风控结果' content={result} />,
            apply_history_statistics.apply_num === 0 ? null : <CardClass title='历史统计' content={history} />,
            <CardClass title='资料信息' content={info} />,
            (this.detail.customer_remark || []).length > 0 ? <CardClass title='客户备注' content={remark} /> : null,
            <CardClass title='授信记录' content={credit} />,
        ];
        const phoneOperator = <div>1</div>;
        const url = '/api/admin/apply/modules';
        const getNameUrl = '/api/admin/apply/lists/';
        const emergencyContact = <div><EmergencyContact name={this.detail.customer && this.detail.customer.name} getNameUrl={getNameUrl} url={url}/></div>;
        const phoneContacts = <div><PhoneContacts name={this.detail.customer && this.detail.customer.name} getNameUrl={getNameUrl}  url={url} /></div>;
        const imageData = <div><ImageData name={this.detail.customer && this.detail.customer.name} getNameUrl={getNameUrl}  url={url} /></div>;
        return (<Switch>
                    <Route exact path='/management/credit/audit/:id/phoneOperator'  render={() => phoneOperator} />
                    <Route exact path='/management/credit/audit/:id/emergencyContact' render={() => emergencyContact} />
                    <Route exact path='/management/credit/audit/:id/phoneContacts' render={() => phoneContacts} />
                    <Route exact path='/management/credit/audit/:id/imageData' render={() => imageData} />
                    <Route render={() => <Title component={component} /> } />
                </Switch>);
    }
}
export default withAppState(Detail);
