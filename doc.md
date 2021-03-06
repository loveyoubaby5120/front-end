一. 简要介绍

    1. 技术栈
        框架：react
        状态管理：mobx
        UI: antd
        Build: fusebox
        规范：typescript

    2. 目录文件介绍
        *. 代码在 js/v1 里面
        *. common目录：公共组件或函数部分
        *. page目录：业务代码
        *. index.ts: 入口文件

    3. 本地开发相关
        *. js/v1/tpl/build/fuselib.ts 是 build 配置，本地开发时需要注意里面有个代理，如果接口地址有变动请修改这个代理地址
        *. 本地build命令  node ./tpl/build/fuse.js [项目路径(支持正则，详细解析请查看fuselib.ts)] --hash --watch
        *. 上线 build 直接执行  make fuse_prod  或读makefile代码查看相关执行命令

    4.可以在  js/v1/build/fuse-defs.ts 里面查看目前存在多少项目

    5.所有的页面都做了良好的组件化，可在 routes.tsx 这个文件路由文件里面查看写好的可复用页面组件

二. 详细目录介绍

```
├── dist       // build文件
├── js         // 前端代码
│   └── v1
│       ├── tpl
│       │   ├── build                // build 配置
│       │   │   ├── fuse-defs.ts     // 配置需要build的项目    可查看目前存在多少项目
│       │   │   ├── fuse.js          // build 入口文件
│       │   │   ├── fuse_prod.ts     // 生产build文件
│       │   │   ├── fuselib.ts       // build 配置  本地开发时需要注意里面有个代理，如果接口地址有变动请修改这个代理地址
│       │   │   ├── parallel.ts
│       │   │   ├── typecheck.ts     // ts检查工具
│       │   │   └── utils.ts
│       │   ├── common               // 全局公共组件
│       │   │   ├── antd             // antd 组件
│       │   │   │   ├── mobile
│       │   │   │   │   ├── accordion.ts
│       │   │   │   │   ├── activity-indicator.ts
│       │   │   │   │   ├── badge.ts
│       │   │   │   │   ├── button.ts
│       │   │   │   │   ├── card.ts
│       │   │   │   │   ├── checkbox.ts
│       │   │   │   │   ├── default-style.css
│       │   │   │   │   ├── flex.ts
│       │   │   │   │   ├── icon.ts
│       │   │   │   │   ├── input-item.ts
│       │   │   │   │   ├── list-view.ts
│       │   │   │   │   ├── list.ts
│       │   │   │   │   ├── modal.ts
│       │   │   │   │   ├── nav-bar.ts
│       │   │   │   │   ├── notice-bar.ts
│       │   │   │   │   ├── pagination.ts
│       │   │   │   │   ├── picker.ts
│       │   │   │   │   ├── progress.ts
│       │   │   │   │   ├── pull-to-refresh.ts
│       │   │   │   │   ├── radio.ts
│       │   │   │   │   ├── search-bar.ts
│       │   │   │   │   ├── steps.ts
│       │   │   │   │   ├── switch.ts
│       │   │   │   │   ├── tab-bar.ts
│       │   │   │   │   ├── tabs.ts
│       │   │   │   │   ├── tag.ts
│       │   │   │   │   ├── toast.ts
│       │   │   │   │   ├── white-space.ts
│       │   │   │   │   └── wing-blank.ts
│       │   │   │   ├── themes
│       │   │   │   ├── alert.ts
│       │   │   │   ├── anchor.ts
│       │   │   │   ├── auto-complete.ts
│       │   │   │   ├── back-top.ts
│       │   │   │   ├── badge.ts
│       │   │   │   ├── breadcrumb.ts
│       │   │   │   ├── button.ts
│       │   │   │   ├── card.ts
│       │   │   │   ├── carousel.ts
│       │   │   │   ├── cascader.ts
│       │   │   │   ├── checkbox.ts
│       │   │   │   ├── col.ts
│       │   │   │   ├── collapse.ts
│       │   │   │   ├── date-picker.ts
│       │   │   │   ├── default-style.css
│       │   │   │   ├── dropdown.ts
│       │   │   │   ├── form.ts
│       │   │   │   ├── icon.ts
│       │   │   │   ├── input-number.ts
│       │   │   │   ├── input.ts
│       │   │   │   ├── layout.ts
│       │   │   │   ├── list.ts
│       │   │   │   ├── localeProvider.ts
│       │   │   │   ├── menu.ts
│       │   │   │   ├── message.ts
│       │   │   │   ├── modal.ts
│       │   │   │   ├── notification.ts
│       │   │   │   ├── pagination.ts
│       │   │   │   ├── popconfirm.ts
│       │   │   │   ├── popover.ts
│       │   │   │   ├── progress.ts
│       │   │   │   ├── radio.ts
│       │   │   │   ├── rate.ts
│       │   │   │   ├── row.ts
│       │   │   │   ├── search.ts
│       │   │   │   ├── select.ts
│       │   │   │   ├── slider.ts
│       │   │   │   ├── spin.ts
│       │   │   │   ├── steps.ts
│       │   │   │   ├── switch.ts
│       │   │   │   ├── table.ts
│       │   │   │   ├── tabs.ts
│       │   │   │   ├── tag.ts
│       │   │   │   ├── time-picker.ts
│       │   │   │   ├── timeline.ts
│       │   │   │   ├── tooltip.ts
│       │   │   │   ├── tree-select.ts
│       │   │   │   ├── tree.ts
│       │   │   │   └── upload.ts
│       │   │   ├── component                  // 公共组件
│       │   │   │   ├── Link.tsx
│       │   │   │   ├── UploadComponent.tsx
│       │   │   │   ├── auth.tsx
│       │   │   │   ├── graphql.tsx
│       │   │   │   ├── radium_style.tsx
│       │   │   │   ├── restFull.tsx
│       │   │   │   ├── searchTable.tsx
│       │   │   │   └── svg.tsx
│       │   │   ├── formTpl                   // form表单相关组件
│       │   │   │   ├── mobile
│       │   │   │   │   └── baseForm.tsx
│       │   │   │   ├── modules
│       │   │   │   │   ├── between.tsx
│       │   │   │   │   └── tree.tsx
│       │   │   │   └── baseForm.tsx
│       │   │   ├── optchain
│       │   │   │   └── getPath.ts
│       │   │   ├── style                     // 公共样式
│       │   │   │   └── font.less
│       │   │   ├── ajax.ts                   // ajax请求
│       │   │   ├── app.ts                    // 与App交互接口
│       │   │   ├── error_display.exec.js
│       │   │   ├── error_display.noextract.css
│       │   │   ├── errs.ts
│       │   │   ├── external.ts
│       │   │   ├── fun.ts                    // 公共函数
│       │   │   ├── init.js                   // polyfill、错误捕获、请求进度
│       │   │   ├── languageCode.ts           // 国际化
│       │   │   ├── limiter.ts
│       │   │   ├── locale.ts                 // 国际化
│       │   │   ├── locale_error.ts           // 国际化
│       │   │   ├── noCaptcha.ts              // 滑动验证
│       │   │   ├── polyfill.js
│       │   │   ├── radium.ts                 // 样式组件
│       │   │   ├── regular.ts                // 公共正则
│       │   │   ├── staticURL.ts
│       │   │   ├── sys.ts
│       │   │   ├── tools.ts
│       │   │   ├── types.ts
│       │   │   ├── upload.ts                 // 下载组件
│       │   │   └── url.ts
│       │   ├── management                    // 后台管理
│       │   │   ├── common                    // management 公共组件
│       │   │   │   ├── CardClass.tsx
│       │   │   │   ├── Condition.tsx
│       │   │   │   ├── InfoComponent.tsx
│       │   │   │   ├── TitleComponent.tsx
│       │   │   │   ├── antd_theme.less
│       │   │   │   ├── appStateStore.tsx
│       │   │   │   └── publicData.tsx
│       │   │   ├── page                      // 页面代码
│       │   │   │   ├── management
│       │   │   │   │   ├── afterLoaning
│       │   │   │   │   │   └── index.tsx
│       │   │   │   │   ├── basic
│       │   │   │   │   │   ├── account
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── channel
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── init
│       │   │   │   │   │   │   ├── appSet
│       │   │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   │   ├── clientInfo
│       │   │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   │   ├── contract
│       │   │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   │   ├── product
│       │   │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   │   ├── signature
│       │   │   │   │   │   │   │   ├── addSignature.tsx
│       │   │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   └── init.tsx
│       │   │   │   │   │   ├── role
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── consumption
│       │   │   │   │   │   ├── billing
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── note
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── payOrder
│       │   │   │   │   │   │   ├── history.tsx
│       │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   └── list.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── credit
│       │   │   │   │   │   ├── audit
│       │   │   │   │   │   │   ├── audit.tsx
│       │   │   │   │   │   │   ├── detail.tsx
│       │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   ├── list.tsx
│       │   │   │   │   │   │   └── reject.tsx
│       │   │   │   │   │   ├── withdraw
│       │   │   │   │   │   │   ├── detail.tsx
│       │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   └── list.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── custorm
│       │   │   │   │   │   ├── channelRecord
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── custormList
│       │   │   │   │   │   │   ├── detail.tsx
│       │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   ├── list.tsx
│       │   │   │   │   │   │   └── router.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── statistics
│       │   │   │   │   │   ├── conversion
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── overdue
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── wealthManage
│       │   │   │   │   │   ├── extensionsRecord
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── loansRecord
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   ├── paymentRecord
│       │   │   │   │   │   │   └── index.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── home.tsx
│       │   │   │   │   ├── noPermission.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── user
│       │   │   │   │   ├── logAgain.tsx
│       │   │   │   │   ├── login.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   └── layoutBase.tsx
│       │   │   ├── index.devserver.html           // dev html 模板
│       │   │   ├── index.production.html          // pro html 模板
│       │   │   ├── index.tsx                      // 入口文件
│       │   │   └── routes.tsx
│       │   ├── mobile                             // 移动端
│       │   │   ├── app                            // 项目目录
│       │   │   │   ├── apply                      // 申请
│       │   │   │   │   ├── common
│       │   │   │   │   │   └── publicData.ts
│       │   │   │   │   ├── page
│       │   │   │   │   │   ├── apply
│       │   │   │   │   │   │   ├── modules
│       │   │   │   │   │   │   │   ├── base.tsx
│       │   │   │   │   │   │   │   ├── bioassay.tsx
│       │   │   │   │   │   │   │   ├── index.tsx
│       │   │   │   │   │   │   │   ├── ocr.tsx
│       │   │   │   │   │   │   │   ├── operator.tsx
│       │   │   │   │   │   │   │   ├── routes.tsx
│       │   │   │   │   │   │   │   └── single.tsx
│       │   │   │   │   │   │   ├── home.tsx
│       │   │   │   │   │   │   └── routes.tsx
│       │   │   │   │   │   ├── layoutBase.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── index.devserver.html
│       │   │   │   │   ├── index.production.html
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── bill                       // 账单
│       │   │   │   │   ├── page
│       │   │   │   │   │   ├── bill
│       │   │   │   │   │   │   ├── modal
│       │   │   │   │   │   │   │   ├── bank.tsx
│       │   │   │   │   │   │   │   ├── info.tsx
│       │   │   │   │   │   │   │   └── verify.tsx
│       │   │   │   │   │   │   ├── base.tsx
│       │   │   │   │   │   │   ├── boundBank.tsx
│       │   │   │   │   │   │   ├── frame.tsx
│       │   │   │   │   │   │   ├── home.tsx
│       │   │   │   │   │   │   ├── repayment.tsx
│       │   │   │   │   │   │   ├── rollOvers.tsx
│       │   │   │   │   │   │   ├── routes.tsx
│       │   │   │   │   │   │   └── status.tsx
│       │   │   │   │   │   ├── layoutBase.tsx
│       │   │   │   │   │   └── routes.tsx
│       │   │   │   │   ├── index.devserver.html
│       │   │   │   │   ├── index.production.html
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── httpStatus404             // 404 页面
│       │   │   │   │   ├── common
│       │   │   │   │   │   └── antd_theme.less
│       │   │   │   │   ├── page
│       │   │   │   │   │   └── 404.tsx
│       │   │   │   │   ├── index.devserver.html
│       │   │   │   │   ├── index.production.html
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── httpStatus500             // 500 页面
│       │   │   │   │   ├── common
│       │   │   │   │   │   └── antd_theme.less
│       │   │   │   │   ├── page
│       │   │   │   │   │   └── 500.tsx
│       │   │   │   │   ├── index.devserver.html
│       │   │   │   │   ├── index.production.html
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── promotion                // 推广页
│       │   │   │   │   ├── common
│       │   │   │   │   │   └── antd_theme.less
│       │   │   │   │   ├── page
│       │   │   │   │   │   └── user
│       │   │   │   │   │       ├── loginReg.tsx
│       │   │   │   │   │       └── routes.tsx
│       │   │   │   │   ├── index.devserver.html
│       │   │   │   │   ├── index.production.html
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   └── withdraw                 // 提现页
│       │   │   │       ├── page
│       │   │   │       │   ├── withdraw
│       │   │   │       │   │   ├── base.tsx
│       │   │   │       │   │   ├── home.tsx
│       │   │   │       │   │   └── routes.tsx
│       │   │   │       │   ├── layoutBase.tsx
│       │   │   │       │   └── routes.tsx
│       │   │   │       ├── index.devserver.html
│       │   │   │       ├── index.production.html
│       │   │   │       ├── index.tsx
│       │   │   │       └── routes.tsx
│       │   │   └── common                      // mobile 公共代码
│       │   │       ├── antd_theme.less
│       │   │       ├── appStateStore.tsx
│       │   │       ├── fields.ts
│       │   │       ├── publicData.ts
│       │   │       └── showEruda.ts
│       │   ├── operatePlat                     // 运营平台
│       │   │   ├── common
│       │   │   │   ├── appStateStore.tsx
│       │   │   │   └── publicData.tsx
│       │   │   ├── page
│       │   │   │   ├── plat
│       │   │   │   │   ├── account
│       │   │   │   │   │   ├── edit.tsx
│       │   │   │   │   │   └── list.tsx
│       │   │   │   │   ├── company
│       │   │   │   │   │   ├── appConfig.tsx
│       │   │   │   │   │   ├── bank.tsx
│       │   │   │   │   │   ├── config.tsx
│       │   │   │   │   │   ├── edit.tsx
│       │   │   │   │   │   ├── list.tsx
│       │   │   │   │   │   └── recharge.tsx
│       │   │   │   │   └── role
│       │   │   │   │       ├── edit.tsx
│       │   │   │   │       └── list.tsx
│       │   │   │   ├── user
│       │   │   │   │   ├── login.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── layoutBase.tsx
│       │   │   │   └── routes.tsx
│       │   │   ├── index.devserver.html
│       │   │   ├── index.production.html
│       │   │   ├── index.tsx
│       │   │   └── routes.tsx
│       │   ├── statistics                      // 数据平台
│       │   │   ├── common
│       │   │   │   ├── appStateStore.tsx
│       │   │   │   └── publicData.tsx
│       │   │   ├── page
│       │   │   │   ├── statistics
│       │   │   │   │   └── dc
│       │   │   │   │       └── list.tsx
│       │   │   │   ├── user
│       │   │   │   │   ├── login.tsx
│       │   │   │   │   └── routes.tsx
│       │   │   │   ├── layoutBase.tsx
│       │   │   │   └── routes.tsx
│       │   │   ├── index.devserver.html
│       │   │   ├── index.production.html
│       │   │   ├── index.tsx
│       │   │   └── routes.tsx
│       │   └── yarn.lock
│       ├── typings                             // ts补充声明文件
│       │   ├── @antv
│       │   │   └── data-set
│       │   │       └── index.d.ts
│       │   ├── eled
│       │   ├── rc-form
│       │   │   └── index.d.ts
│       │   └── react-load-script
│       │       └── index.d.ts
│       ├── package.json
│       ├── tsconfig.json                       // ts 配置
│       ├── yarn-error.log
│       └── yarn.lock
├── node_modules
├── scripts                   // 脚本文件
│   └── create_tag.sh         // git 自动tag
├── static                    // 静态资源
│   ├── images                // 图片
│   │   ├── 404.png
│   │   ├── 500.png
│   │   ├── 502.png
│   │   ├── bg.png
│   │   ├── bg_card.png
│   │   ├── bg_sucai.png
│   │   ├── bill.png
│   │   ├── fee.png
│   │   ├── identity.png
│   │   ├── identity2.png
│   │   ├── login_bg.png
│   │   ├── noPermission.png
│   │   ├── none.png
│   │   ├── reminder.png
│   │   ├── reminder_1.png
│   │   ├── reminder_2.png
│   │   ├── reminder_3.png
│   │   ├── roll_overs.png
│   │   ├── roll_overs_bg.png
│   │   └── success.png
│   └── js                   // js
│       └── eruda.js
├── CHANGELOG.md
├── CHANGELOG.released.md
├── Makefile                 // 快捷脚本
├── README.md
├── doc.txt                  // 项目目录介绍
├── tslint.json              // tslint 配置
└── yarn.lock
```
