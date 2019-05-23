import { Button } from 'common/antd/mobile/button';
import { List } from 'common/antd/mobile/list';
import { withAppState, WithAppState } from 'mobile/common/appStateStore';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { style } from 'typestyle';

export class OcrView extends React.Component<RouteComponentProps<any> & WithAppState, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <List>
                    <List.Item extra={'extra content'}>姓名</List.Item>
                    <List.Item extra={'extra content'}>身份证</List.Item>
                </List>
                <Button type='primary'
                    style={{ marginTop: '80px' }}
                    onClick={this.handleSubmit}>下一步</Button>
                <div className={style({
                    fontSize: '14px',
                    textAlign: 'center',
                    margin: '15px',
                })}>若信息有误，请<span className={style({ color: '#E55800' })} onClick={this.resetPhone}>重新拍摄</span></div>
            </div>
        );
    }

    private resetPhone = () => {
        console.log('resetPhone');
    }

    private handleSubmit = () => {
        const stepInfo = this.props.data.stepInfo.steps[this.props.data.stepInfo.stepNumber + 1];

        if (stepInfo) {
            this.props.history.push(`/apply/module/${stepInfo.page_type === 1 ? 'single' : 'multiple'}/${stepInfo.id}`);
        } else {
            this.props.history.push(`/apply/home`);
        }
    }

}

export const Ocr = withRouter(withAppState(OcrView));
