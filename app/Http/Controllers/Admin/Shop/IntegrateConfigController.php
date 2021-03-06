<?php

namespace App\Http\Controllers\Admin\Shop;

use App\Models\ShopConfig;
use App\Models\WechatMaterial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IntegrateConfigController extends Controller
{
    public function index()
    {
        $rsConfig = ShopConfig::find(USERSID);
        $integral_use_laws = json_decode($rsConfig['Integral_Use_Laws'], true);

        return view('admin.shop.integrate_config',
            compact('rsConfig', 'integral_use_laws'));
    }


    /**积分设置提交
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $input = $request->input();

        $man = array();
        if (isset($input['man_reach'])) {
            $man_reach = $input['man_reach'];
            $man_award = $input['man_award'];
            foreach ($man_reach as $key => $item) {
                $man[] = array('reach' => $item, 'award' => $man_award[$key]);
            }
        }

        $Integral_Use_Laws = array();

        if (!empty($input['Integral_Man'])) {
            $integral_man = $input['Integral_Man'];
            $integral_use = $input['Integral_Use'];

            foreach ($integral_man as $key => $item) {
                $Integral_Use_Laws[] = array("man" => $item, "use" => $integral_use[$key]);
            }
        }

        $Data = array(
            "Man" => json_encode($man, JSON_UNESCAPED_UNICODE),
            "Integral_Buy" => isset($input["Integral_Buy"]) ? intval($input["Integral_Buy"]) : 0,
            "Integral_Use_Laws" => json_encode($Integral_Use_Laws, JSON_UNESCAPED_UNICODE),
            "Is_Sign" => isset($input['Is_Sign']) ? $input['Is_Sign'] : 0,
            "Integral_Sign" => isset($input['Integral_Sign']) ? intval($input['Integral_Sign']) : 0,
            "Popularize_Integral" => isset($input['Popularize_Integral']) ? intval($input['Popularize_Integral']) : 0,
            "moneytoscore" => isset($input['moneytoscore']) ? intval($input["moneytoscore"]) : 0,
        );

        $sc_obj = new ShopConfig();
        $sc_obj->set_config($Data);

        return redirect()->back()->with('success', '保存成功');

    }


}
