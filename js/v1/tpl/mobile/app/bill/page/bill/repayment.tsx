import { Button } from 'common/antd/mobile/button';
import { Toast } from 'common/antd/mobile/toast';
import { mutate } from 'common/component/restFull';
import { BaseForm, BaseFormItem } from 'common/formTpl/mobile/baseForm';
import { regular } from 'common/regular';
import { staticBaseURL } from 'common/staticURL';
import { withAppState, WithAppState } from 'mobile/common/appStateStore';
import { createForm } from 'rc-form';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { style } from 'typestyle';
import { Frame } from './frame';
import { ModalBank } from './modal/bank';

export class RepaymentView extends React.Component<RouteComponentProps<any> & WithAppState & { form: any }, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const formItem: BaseFormItem[] = [
            {
                key: 'name',
                type: 'input',
                itemProps: { label: '本人姓名' },
                typeComponentProps: { cols: 1 },
                required: true,
            },
            {
                key: 'ID',
                type: 'inputNumber',
                itemProps: { label: '身份号' },
                typeComponentProps: { cols: 1 },
                fieldDecoratorOptions: {
                    rules: [
                        {
                            required: true,
                            message: '请输入身份号',
                        },
                        {
                            validator: (rule: any, value: any, callback: any) => {
                                if (!value) {
                                    callback('请输入身份号');
                                    return;
                                }
                                const reg = new RegExp(regular.certification_id.reg);
                                if (!reg.test(value.replace(/\s+/g, '')) && value) {
                                    callback('格式错误，请正确输入身份号');
                                    return;
                                }
                                callback();
                            },
                        },
                    ],
                },
                required: true,
            },
            {
                key: 'cardId',
                type: 'inputBankCard',
                itemProps: { label: '银行卡号' },
                typeComponentProps: { cols: 1 },
                required: true,
            },
            {
                key: 'phone',
                type: 'inputPhone',
                itemProps: { label: '预留手机号' },
                typeComponentProps: { cols: 1 },
                fieldDecoratorOptions: {
                    rules: [
                        {
                            required: true,
                            message: '请输入手机号',
                        },
                        {
                            validator: (rule: any, value: any, callback: any) => {
                                if (!value) {
                                    callback('请输入手机号');
                                    return;
                                }
                                const reg = new RegExp(regular.phone_number.reg);
                                if (!reg.test(value.replace(/\s+/g, '')) && value) {
                                    callback('格式错误，请正确输入手机号');
                                    return;
                                }
                                callback();
                            },
                        },
                    ],
                },
                required: true,
            },
        ];
        return (
            <Frame title='绑定银行卡' bg={staticBaseURL('bg_card.png')} footer={(
                <div style={{ padding: '10px 0' }}>
                    <Button type='primary'
                        onClick={this.handleSubmit}>提交</Button>
                </div>
            )}>
                <div className={style({
                    margin: '0 -20px',
                })}>
                    <BaseForm form={this.props.form}
                        item={formItem} />
                </div>
                {/* <ModalBank /> */}
            </Frame>
        );
    }

    private handleSubmit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log(values);
            }
        });
    }

}

const FormCreate = createForm()(withRouter(withAppState(RepaymentView)));

export const Repayment = FormCreate;