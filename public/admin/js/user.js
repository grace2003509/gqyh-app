

var user_obj={
    lbs_init:function(){
        global_obj.map_init();
        $('#lbs_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#lbs_form input:submit').attr('disabled', true);
            return true;
        });
    },

    getproduct_add:function(){
        $('#Peas_edit_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#Peas_edit_form input:submit').attr('disabled', true);
            return true;
        });
    },
    card_config_init:function(){
        global_obj.file_upload($('#CardLogoUpload'), $('#card_config_form input[name=CardLogo]'), $('#CardLogoDetail'));
        $('#CardLogoDetail').html(global_obj.img_link($('#card_config_form input[name=CardLogo]').val()));
        global_obj.file_upload($('#CustomImgUpload'), $('#card_config_form input[name=CustomImgPath]'), $('#CustomImgDetail'));
        $('#CustomImgDetail').html(global_obj.img_link($('#card_config_form input[name=CustomImgPath]').val()));

        $('#card_style .file .del a').click(function(){
            $('#CardLogoDetail').html('');
            $('#card_config_form input[name=CardLogo]').val('');
            return false;
        });

        if($('input[name=CardStyleCustom]').attr('checked')){
            $('#CardStyleCustomBox, #CustomImgDetail').show();
            $('#card_style_select').hide();
        }else{
            $('#CardStyleCustomBox, #CustomImgDetail').hide();
            $('#card_style_select').show();
        }

        $('input[name=CardStyleCustom]').click(function(){
            if($('input[name=CardStyleCustom]').attr('checked')){
                $('#CardStyleCustomBox, #CustomImgDetail').show();
                $('#card_style_select').hide();
            }else{
                $('#CardStyleCustomBox, #CustomImgDetail').hide();
                $('#card_style_select').show();
            }
        });

        $('a[href=#card_style_list]').click(function(){$('#card_style_list').leanModal();});
        $('#card_style_list .list a').click(function(){
            $('#card_config_form input[name=CardStyle]').val($(this).attr('value'));
            $('#card_style_list .list a').removeClass('cur');
            $(this).addClass('cur');
            $("#card_config_form #card_style .style img").attr('src', $(this).find('img').attr('src'));
            $('.modal_close').click();
        });

        $('#card_config_form').submit(function(){return false;});
        $('#card_config_form input:submit').click(function(){
            if(global_obj.check_form($('*[notnull]'))){return false;};

            $(this).attr('disabled', true);
            $.post('/member/user/card_config.php?', $('#card_config_form').serialize(), function(data){
                if(data.status==1){
                    alert("设置成功");
                    $('#card_config_form input:submit').attr('disabled', false);
                }else{
                    alert(data.msg);
                    $('#card_config_form input:submit').attr('disabled', false);
                }
            }, 'json');
        });
    },

    user_level_init:function(){
        for(i=0;i<7;i++){
            var PicContents=$('#ImgPath_'+i).val()?global_obj.img_link($('#ImgPath_'+i).val())+'<br /><a href="javascript:;" id="'+i+'">删除</a>':'默认背景';
            $('#ImgDetail_'+i).html(PicContents);
        }
        $('#user_level .pic a').click(function(){
            $(this).parent().html('默认背景');
            $('#ImgPath_'+$(this).attr('id')).val('');
        });

        $('.level_table .input_add').click(function(){
            $('.level_table tr[FieldType=text]:hidden').eq(0).show();
            if(!$('.level_table tr[FieldType=text]:hidden').size()){
                $(this).hide();
            }
        });
        $('.level_table .input_del').click(function(){
            $('.level_table .input_add').show();
            $(this).parent().parent().hide().find('input').attr('name','').parent().parent().find('span.pic').html('默认背景');
        });
        $('#level_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#level_form input:submit').attr('disabled', true);
            return true;
        });
    },

    profile_init:function(){
        $('#user_profile img[field]').addClass('pointer').click(function(){
            var img_obj=$(this);
            $.get('?action=profile', 'field='+img_obj.attr('field')+'&Status='+img_obj.attr('Status'), function(data){
                if(data.status==1){
                    var img=img_obj.attr('Status')==0?'on':'off';
                    img_obj.attr('src', '/static/member/images/ico/'+img+'.gif');
                    img_obj.attr('Status', img_obj.attr('Status')==0?1:0);
                }else{
                    alert('设置失败，出现未知错误！');
                }
            }, 'json');
        });

        $('.reverve_field_table .input_add').click(function(){
            $('.reverve_field_table tr[FieldType=text]:hidden').eq(0).show();
            if(!$('.reverve_field_table tr[FieldType=text]:hidden').size()){
                $(this).hide();
            }
        });
        $('.reverve_field_table .input_del').click(function(){
            $('.reverve_field_table .input_add').show();
            $(this).parent().parent().hide().find('input').val('');
        });
        $('.reverve_field_table .select_add').click(function(){
            $('.reverve_field_table tr[FieldType=select]:hidden').eq(0).show();
            if(!$('.reverve_field_table tr[FieldType=select]:hidden').size()){
                $(this).hide();
            }
        });
        $('.reverve_field_table .select_del').click(function(){
            $('.reverve_field_table .select_add').show();
            $(this).parent().parent().hide().find('input').val('');
        });

        $('#Profile_form').submit(function(){return false;});
        $('#Profile_form input:submit').click(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $(this).attr('disabled', true);
            $.post('?', $('#Profile_form').serialize(), function(data){
                if(data.status==1){
                    window.location='user_profile.php';
                }else{
                    alert(data.msg);
                    $('#Profile_form input:submit').attr('disabled', false);
                }
            }, 'json');
        })
    },

    business_password:function(){
        $('#add_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            //$('#add_form input:submit').attr('disabled', true);
            return true;
        });
    },

    card_article_init:function(){
        var date_str=new Date();
        $('#card_article_form input[name=Time]').daterangepicker({
            timePicker:true,
            //minDate:new Date(date_str.getFullYear(), date_str.getMonth(), date_str.getDate()),
            format:'YYYY/MM/DD HH:mm:00'}
        )
        $('#card_article_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#card_article_form input:submit').attr('disabled', true);
            return true;
        });
    },

    card_benefits_init:function(){
        var date_str=new Date();
        $('#card_benefits_form input[name=Time]').daterangepicker({
            timePicker:true,
            //minDate:new Date(date_str.getFullYear(), date_str.getMonth(), date_str.getDate()),
            format:'YYYY/MM/DD HH:mm:00'}
        )
        $('#card_benefits_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#card_benefits_form input:submit').attr('disabled', true);
            return true;
        });
    },

    coupon_list_init:function(){
        global_obj.file_upload($('#ImgUpload'), $('form input[name=ImgPath]'), $('#ImgDetail'));
        $('#ImgDetail').html(global_obj.img_link($('form input[name=ImgPath]').val()));
        global_obj.file_upload($('#PhotoUpload'), $('form input[name=PhotoPath]'), $('#PhotoDetail'));
        $('#PhotoDetail').html(global_obj.img_link($('form input[name=PhotoPath]').val()));

        var date_str=new Date();
        $('#coupon_list_form input[name=Time]').daterangepicker({
            timePicker:true,
            //minDate:new Date(date_str.getFullYear(), date_str.getMonth(), date_str.getDate()),
            format:'YYYY/MM/DD HH:mm:00'}
        )

        $('#coupon_list_form .back').click(function(){window.location='coupon_list.php';});
        $('#coupon_list_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#coupon_list_form input:submit').attr('disabled', true);
            return true;
        });
    },

    coupon_add_init:function(){
        var date_str=new Date();
        $('#coupon_list_form input[name=Time]').daterangepicker({
            timePicker:true,
            //minDate:new Date(date_str.getFullYear(), date_str.getMonth(), date_str.getDate()),
            format:'YYYY/MM/DD HH:mm:00'}
        )

        $('#coupon_list_form .back').click(function(){window.location='coupon_list.php';});
        $('#coupon_list_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#coupon_list_form input:submit').attr('disabled', true);
            return true;
        });
    },

    user_init:function(){
        // $('#search_form input:button').click(function(){
        //     window.location='./?'+$('#search_form').serialize()+'&action=user_export';
        // });

        /*$("#search_form .output_btn").click(function(){
            window.location='/member/shop/output.php?'+$('#search_form').serialize()+'&type=user_list';
        });*/

        $('a[href="#modpass"]').each(function(){
            $(this).click(function(){
                $('#mod_user_pass form input[name=UserID]').val($(this).parent().parent().attr('UserID'));
                $('#mod_user_pass form').show();
                $('#mod_user_pass .tips').hide();
                $('#mod_user_pass').leanModal();
            });
        });

        $('a[href="#modimg"]').each(function(){
            $(this).click(function(){
                $('#mod_user_img form input[name=UserID]').val($(this).parent().parent().attr('UserID'));
                $('#mod_user_img form').show();
                $('#mod_user_img .tips').hide();
                $('#mod_user_img').leanModal();
            });
        });

        $('a[href="#modpay"]').each(function(){
            $(this).click(function(){
                $('#mod_user_pay form input[name=UserID]').val($(this).parent().parent().attr('UserID'));
                $('#mod_user_pay form').show();
                $('#mod_user_pay .tips').hide();
                $('#mod_user_pay').leanModal();
            });
        });

        $('a[href="#doOrder"]').each(function(){
            $(this).click(function(){
                $('#do_order_hand form input[name=UserID]').val($(this).parent().parent().attr('UserID'));
                $('#do_order_hand  form input[name=User_Mobile]').val($(this).attr('Mobile'));
                $('#do_order_hand  form input[name=Mobile]').val($(this).attr('Mobile'));
                $('#do_order_hand form').show();
                $('#do_order_hand .tips').hide();
                $('#do_order_hand').leanModal();
            });
        });

        // $('#mod_user_pass form').submit(function(){return false;});
        // $('#mod_user_pay form').submit(function(){return false;});
        $('#mod_user_img form').submit(function(){return false;});
        /*$('#mod_user_pass form input:submit').click(function(){
            $(this).attr('disabled', true);
            $.post('/member/user/user_list.php?', $('#mod_user_pass form').serialize(), function(data){
                $('#mod_user_pass form input:submit').attr('disabled', false);
                if(data.status==1){
                    $('#mod_user_pass .tips').html('密码重置成功！').show();
                }else{
                    $('#mod_user_pass .tips').html('密码重置失败，出现未知错误！').show();
                };
                $('#mod_user_pass form').hide();
                $('#mod_user_pass').leanModal();
            }, 'json');
        });*/

        $('#mod_user_img form input:submit').click(function(){
            $(this).attr('disabled', true);
            $.post('/admin/member/user_list?', $('#mod_user_img form').serialize(), function(data){
                $('#mod_user_img form input:submit').attr('disabled', false);
                if(data.status==1){
                    $('#mod_user_img .tips').html('头像重置成功！').show();
                }else{
                    $('#mod_user_img .tips').html('头像重置失败，出现未知错误！').show();
                };
                $('#mod_user_img form').hide();
                $('#mod_user_img').leanModal();
            }, 'json');
        });

        /*$('#mod_user_pay form input:submit').click(function(){
            $(this).attr('disabled', true);
            $.post('/admin/member/user_list?', $('#mod_user_pay form').serialize(), function(data){
                $('#mod_user_pay form input:submit').attr('disabled', false);
                if(data.status==1){
                    $('#mod_user_pay .tips').html('密码重置成功！').show();
                }else{
                    $('#mod_user_pay .tips').html('密码重置失败，出现未知错误！').show();
                };
                $('#mod_user_pay form').hide();
                $('#mod_user_pay').leanModal();
            }, 'json');
        });*/

        $('.upd_rows').dblclick(function(){
            var o=$(this).children('.upd_txt');
            if(o.children('input').size()){return false;}

            o.data('text', o.html()).html('<input value=""></span>');
            o.children('input').select();
            o.children('input').keyup(function(event){
                if(event.which==13){
                    $(this).blur();
                    var value=$(this).val();
                    if(value=='' || value=='无' || value==o.data('text')){
                        o.html(o.data('text'));
                        return false;
                    }
                    $('#update_post_tips').html('数据提交中...').css({left:$(window).width()/2-100}).show();

                    $.post('/admin/member/user_update?', "action=user_info&UserID="+o.parent().parent().attr('UserID')+'&field='+o.parent().attr('field')+'&Value='+value, function(data){
                        if(data.status==1){
                            var msg='修改成功！';
                            o.html(value);
                        }else if(data.msg!=''){
                            var msg=data.msg;
                            o.html(o.data('text'));
                        }else{
                            var msg='修改失败，出现未知错误！';
                            o.html(o.data('text'));
                        }
                        $('#update_post_tips').html(msg).fadeOut(3000);
                    }, 'json');
                }
            });
        });

        $('.upd_select').dblclick(function(){
            var o=$(this).children('.upd_txt');
            if(o.children('select').size()){return false;}

            var s_html='<select>';
            for(i=0;i<level_ary.length;i++){
                var selected=o.html()==level_ary[i]?'selected':'';
                s_html+='<option value="'+i+'" '+selected+'>'+level_ary[i]+'</option>';
            }
            s_html+='</select>';
            o.data('text', o.html()).html(s_html);
            o.children('select').focus();

            o.children('select').bind('change blur', function(){
                var value=parseInt($(this).val());
                if(value>=level_ary.length){
                    value=0;
                }

                if(level_ary[value]==o.data('text')){
                    o.html(o.data('text'));
                    return false;
                }
                $('#update_post_tips').html('数据提交中...').css({left:$(window).width()/2-100}).show();

                $.post('/admin/member/user_update?', "action=user_mod&UserID="+o.parent().parent().attr('UserID')+'&field='+o.parent().attr('field')+'&Value='+value, function(data){
                    if(data.status===1){
                        var msg='修改成功！';
                        o.html(level_ary[value]);
                    }else if(data.msg!==''){
                        var msg=data.msg;
                        o.html(o.data('text'));
                    }else{
                        var msg='修改失败，出现未知错误！';
                        o.html(o.data('text'));
                    }
                    $('#update_post_tips').html(msg).fadeOut(3000);
                }, 'json');
            });
        });

        $('.upd_points').dblclick(function(){
            var o=$(this).children('.upd_txt');
            if(o.children('select').size() && o.children('input').size()){return false;}

            var s_html='<select><option value="0">加积分</option><option value="1">减积分</option></select><br /><input value="" />';
            o.data('text', o.html()).html(s_html);
            o.children('input').select();
            o.children('input, select').keyup(function(event){
                if(event.which==13){
                    $(this).blur();
                    var value=isNaN($(this).parent().find('input').val())?0:parseInt($(this).parent().find('input').val());
                    if(value=='' || !value || isNaN(value)){
                        o.html(o.data('text'));
                        return false;
                    }

                    var c=$(this).parent().find('select').val();
                    if(c==1){
                        value=-value;
                    }
                    $('#update_post_tips').html('数据提交中...').css({left:$(window).width()/2-100}).show();

                    $.post('/admin/member/user_update?', "action=integral_mod&UserID="+o.parent().parent().attr('UserID')+'&field='+o.parent().attr('field')+'&Value='+value, function(data){
                        if(data.status==1){
                            var msg='修改成功！';
                            o.html(parseInt(o.data('text'))+value);
                            if(data.lvl==1){
                                //alert(o.parent().parent().children('.upd_select').children('.upd_txt').html());
                                o.parent().parent().children('.upd_select').children('.upd_txt').html(data.level);
                            }
                        }else if(data.status==2){
                            alert('修改失败，修改后积分不能小于0！');
                            o.html(o.data('text'));
                        }else if(data.msg!=''){
                            var msg=data.msg;
                            o.html(o.data('text'));
                        }else{
                            var msg='修改失败，出现未知错误！';
                            o.html(o.data('text'));
                        }
                        $('#update_post_tips').html(msg).fadeOut(3000);
                    }, 'json');
                }
            });
        });

        $('.upd_money').dblclick(function(){
            var o=$(this).children('.upd_txt');
            if(o.children('select').size() && o.children('input').size()){return false;}

            var s_html='<select><option value="0">加余额</option><option value="1">减余额</option></select><br /><input value="" />';
            o.data('text', o.html()).html(s_html);
            o.children('input').select();
            o.children('input, select').keyup(function(event){
                if(event.which==13){
                    $(this).blur();
                    var value=isNaN($(this).parent().find('input').val())?0:parseFloat($(this).parent().find('input').val());
                    if(value=='' || !value || isNaN(value)){
                        o.html(o.data('text'));
                        return false;
                    }

                    var c=$(this).parent().find('select').val();
                    if(c==1){
                        value=-value;
                    }
                    $('#update_post_tips').html('数据提交中...').css({left:$(window).width()/2-100}).show();

                    $.post('/admin/member/user_update?', "action=money_mod&UserID="+o.parent().parent().attr('UserID')+'&field='+o.parent().attr('field')+'&Value='+value, function(data){
                        if(data.status==1){
                            var msg='修改成功！';
                            o.html((parseFloat(o.data('text'))+value).toFixed(2));
                        }else if(data.status==2){
                            alert('修改失败，增加金额不能小于0！');
                            o.html(o.data('text'));
                        }else if(data.msg!=''){
                            var msg=data.msg;
                            o.html(o.data('text'));
                        }else{
                            var msg='修改失败，出现未知错误！';
                            o.html(o.data('text'));
                        }
                        $('#update_post_tips').html(msg).fadeOut(3000);
                    }, 'json');
                }
            });
        });
    },

    message_init:function(){
        $('#user_message_form').submit(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $('#user_message_form input:submit').attr('disabled', true);
            return true;
        });
    },

    shipping_orders_init:function(){
        var logic = function( currentDateTime ){
            if( currentDateTime.getDay()==6 ){
                this.setOptions({
                    minTime:'00:00'
                });
            }else
                this.setOptions({
                    minTime:'00:00'
                });
        };
        $('#search_form input[name=AccTime_S], #search_form input[name=AccTime_E]').datetimepicker({
            lang:'ch',
            onChangeDateTime:logic,
            onShow:logic
        });

        $('.virtual_btn').each(function(){
            $(this).click(function(){
                $('#virtual_div').leanModal();
            });
        });

        $('#virtual_form').submit(function(){return false;});
        $('#virtual_form input:submit').click(function(){
            if(global_obj.check_form($('*[notnull]'))){return false};
            $(this).attr('disabled', true);
            window.self.location='shipping_orders_virtual.php?code='+$('#Code').val();
        });

        $('.recieve_btn').each(function(){
            $(this).click(function(){
                $('#recieve_div').leanModal();
            });
        });

        $('#recieve_form').submit(function(){return false;});
        $('#recieve_form input:submit').click(function(){
            window.self.location='shipping_orders_recieve.php';
        });
    },
}