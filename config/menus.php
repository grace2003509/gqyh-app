<?php

return json_encode([                                    // modules
    [
        'name' => '基础设置',
        'icon' => 'gears',
        'route' => null,
        'items' => [
            [
                'name' => '系统设置',
                'route' => 'admin.base.sys_index',
                'description' => null,
                'items' => []
            ],
            [
                'name' => '在线客服设置',
                'route' => 'admin.base.kf_index',
                'description' => null,
                'items' => []
            ],
            [
                'name' => '支付设置',
                'route' => 'admin.base.pay_index',
                'description' => null,
                'items' => [
                    [
                        'name' => '微信授权设置',
                        'route' => 'admin.base.wechat_set',
                        'description' => '',
                        'items' => null,
                    ]
                ]
            ],
            [
                'name' => '快递公司管理',
                'route' => 'admin.base.shipping',
                'description' => null,
                'items' => null,
            ],
            [
                'name' => '自定义URL',
                'route' => 'admin.base.diy_url',
                'description' => null,
                'items' => null,
            ],
            [
                'name' => '系统URL查询',
                'route' => 'admin.base.sys_url',
                'description' => null,
                'items' => null,
            ],
        ],
    ],
    [
        'name' => '我的微信',
        'icon' => 'weixin',
        'route' => null,
        'items' => [
            [
                'name' => '微信接口配置',
                'route' => 'admin.wechat.api_index',
                'description' => null,
                'items' => null,
            ],
            [
                'name' => '首次关注设置',
                'route' => 'admin.wechat.reply_index',
                'description' => null,
                'items' => null,
            ],
            [
                'name' => '自定义菜单设置',
                'route' => 'admin.wechat.menu_index',
                'description' => null,
                'items' => null,
            ],
            [
                'name' => '关键词回复设置',
                'route' => 'admin.wechat.keyword_index',
                'description' => null,
                'items' => null,
            ],
            /*[
                'name' => '图文消息管理',
                'route' => 'admin.wechat.material_index',
                'description' => null,
                'items' => null,
            ],*/
        ],
    ],
    [
        'name' => '商城设置',
        'icon' => 'shopping-bag',
        'route' => null,
        'items' => [
            [
                'name' => '基本配置',
                'route' => 'admin.shop.base_index',
                'description' => null,
                'items' => null,
            ],
        ],
    ],
    [
        'name' => '财务统计',
        'icon' => 'bar-chart',
        'route' => null,
        'items' => [
            [
                'name' => '销售记录',
                'route' => 'admin.statistics.sale_record',
                'description' => null,
                'items' => null,
            ],
            /*[
                'name' => '自动结算配置',
                'route' => 'admin.statistics.balance_index',
                'description' => null,
                'items' => null,
            ],*/
            [
                'name' => '生成报告',
                'route' => 'admin.statistics.report_index',
                'description' => '生成订单统计报表',
                'items' => null,
            ],

        ],
    ],

]);
