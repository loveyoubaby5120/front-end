import { Button } from 'common/antd/mobile/button';
import { Icon } from 'common/antd/mobile/icon';
import { Steps } from 'common/antd/mobile/steps';
import { RadiumStyle } from 'common/component/radium_style';
import { Querier } from 'common/component/restFull';
import { Radium } from 'common/radium';
import * as _ from 'lodash';
import { autorun, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { style } from 'typestyle';
import { EditSvg } from '../../common/svg';

const Step = Steps.Step;

@Radium
@observer
export class Home extends React.Component<{}, {}> {
    private query: Querier<any, any> = new Querier(null);
    private disposers: Array<() => void> = [];

    @observable private loading: boolean = false;
    @observable private resultData: any;

    constructor(props: any) {
        super(props);
    }

    componentWillUnmount() {
        this.disposers.forEach(f => f());
        this.disposers = [];
    }

    componentDidMount() {
        this.getAuth();
    }

    getAuth() {
        this.query.setReq({
            url: '/api/mobile/authdata',
            method: 'get',
        });

        this.disposers.push(autorun(() => {
            this.loading = this.query.refreshing;
        }));

        this.disposers.push(reaction(() => {
            return (_.get(this.query.result, 'result.data') as any) || [];
        }, searchData => {
            this.resultData = searchData;
        }));
    }

    render() {
        return (
            <div>
                <RadiumStyle scopeSelector={['.apply']}
                    rules={{
                        '.am-steps-vertical .am-steps-item-description': {
                            paddingBottom: '20px',
                            color: '#666',
                        },
                    }} />
                <Steps status='process' current={1}>
                    {
                        (this.resultData || []).map((r, i) => {
                            console.log(toJS(r));
                            return (
                                <Step key={i} title={r.name}
                                    description={(
                                        <div>
                                            <span>{r.docs}</span>
                                            {
                                                r.can_edit ?
                                                    (
                                                        <div className={style({
                                                            float: 'right',
                                                            width: '42px',
                                                            height: '42px',
                                                            marginTop: '-10px',
                                                        })}>
                                                            <EditSvg />
                                                        </div>
                                                    ) : null
                                            }
                                        </div>
                                    )} />
                            );
                        })
                    }
                    <Step title='Step 1' icon={<Icon type='check-circle' />}
                        description={(
                            <div>
                                <span>asdfasldkfjasd</span>
                                <div className={style({
                                    float: 'right',
                                    width: '42px',
                                    height: '42px',
                                    marginTop: '-10px',
                                })}>
                                    <EditSvg />
                                </div>
                            </div>
                        )} />
                    <Step title='Step 2' icon={<Icon type='check-circle' />} />
                    <Step title='Step 3' icon={<Icon type='check-circle' />} />
                    <Step title='Step 4' status='error' />
                </Steps>

                <Button type='primary' style={{ marginTop: '80px' }}>提交评估</Button>
            </div>
        );
    }

}
