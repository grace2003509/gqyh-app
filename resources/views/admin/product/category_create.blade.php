@extends('admin.layouts.main')
@section('ancestors')
    <li>产品管理</li>
@endsection
@section('page', '添加产品类别')
@section('subcontent')

<link href='/admin/css/global.css' rel='stylesheet' type='text/css' />
<link href='/admin/css/main.css' rel='stylesheet' type='text/css' />
<link href='/admin/css/shop.css' rel='stylesheet' type='text/css' />

<script src="/static/js/plugins/jQuery/jQuery-2.2.0.min.js"></script>
<script type='text/javascript' src='/admin/js/global.js'></script>
<script type='text/javascript' src='/admin/js/shop.js'></script>
<script type="text/javascript" src="/admin/js/uploadify/jquery.uploadify.min.js"></script>
<div class="box">
    <div id="iframe_page">
        <div class="iframe_content">

            <div id="products" class="r_con_wrap">
                <div class="category">
                    <div class="m_righter" style="margin-left:0px;">
                        <form action="{{route('admin.product.category_store')}}" name="category_form" id="category_form" method="post">
                            {{csrf_field()}}
                            <h4>添加产品分类</h4>
                            <div class="opt_item">
                                <label>菜单排序：</label>
                                <span class="input">
                                    <input type="number" name="Index" value="{{old('Index')}}" class="form_input" size="5" maxlength="30" />
                                    <span class="fc_red">*</span>请输入数字
                                </span>
                                <div class="clear"></div>
                            </div>
                            <div class="opt_item">
                                <label>类别名称：</label>
                                <span class="input">
                                    <input type="text" name="Name" value="{{old('Name')}}" class="form_input" size="15" maxlength="30" />
                                    <span class="fc_red">*</span>
                                </span>
                                <div class="clear"></div>
                            </div>
                            <div id="cate2" style='display: none'>
                                <div class="opt_item">
                                    <label>保证金：</label>
                                    <span class="input">
                                        <input type="number" name="Category_Bond" value="{{old('Category_Bond')}}" class="form_input" size="15" maxlength="30" />元
                                        <span class="fc_red"></span>
                                    </span>
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div class="opt_item">
                                <label>隶属关系：</label>
                                <span class="input">
                                <select name='ParentID' id="changeCate" onChange="changeCates()">
								<option value='0'>--根节点--</option>
                                    @foreach($pcategory as $key => $value)
                                        <option value="{{$value["Category_ID"]}}" @if(old('ParentID') == $value["Category_ID"]) selected @endif>
                                            &nbsp;├{{$value["Category_Name"]}}
                                        </option>
                                    @endforeach
								</select>
							</span>
                                <div class="clear"></div>
                            </div>
                            <div class="opt_item">
                                <label>分类图片</label>
                                <div class="file">
                                    <input id="ImgUpload" name="ImgUpload" type="file">
                                </div>
                                <br />
                                <br/>
                                <div class="img" id="ImgDetail">
                                    <img style="width:50%" src="@if(old('ImgPath') !='') {{old('ImgPath')}} @else /admin/images/shop/nopic.jpg @endif" />
                                </div>
                                <input type="hidden" id="ImgPath" name="ImgPath" value="{{old('ImgPath')}}" />
                                <div class="pro-list-type"> </div>
                                <div class="clear"></div>
                            </div>

                            <div class="opt_item">
                                <label></label>
                                <span class="input">
                                    <input type="submit" class="btn_green btn_w_120" name="submit_button" value="添加分类" />
                                    <a href="{{route('admin.product.category_index')}}" class="btn_gray">返回</a>
                                </span>
                                <div class="clear"></div>
                            </div>
                        </form>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

        </div>
    </div>

</div>

<script type='text/javascript'>
    $(document).ready(function(){
        shop_obj.category_init();
    });

    function changeCates () {
        var changeCate =  $("#changeCate").val();
        if (changeCate === 0) {
            $("#cate2").css('display','none');
        } else {

            $("#cate2").css('display','block');
        }

    }
</script>

@endsection