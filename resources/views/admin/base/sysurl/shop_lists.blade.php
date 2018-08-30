      <table border="0" cellpadding="5" cellspacing="0" class="r_con_table">
        <thead>
          <tr>
            <td width="10%" nowrap="nowrap">序号</td>
            <td width="20%" nowrap="nowrap">名称</td>
            <td width="60%" nowrap="nowrap" class="last">Url</td>
          </tr>
        </thead>
        <tbody>
		  
          <?php
            $list_column = \App\Models\ShopProduct::where('Products_Status', 1)
                ->orderBy('Products_Index', 'asc')
                ->paginate(40);
		  ?>
          @foreach($list_column as $k=>$v)
          <tr>
            <td nowrap="nowrap">{{$k+1}}</td>
            <td nowrap="nowrap">{{$v["Products_Name"]}}</td>
            <td nowrap="nowrap" class="left last">
            	http://{{$rulreal}}/api/shop/products/{{$v["Products_ID"]}}/
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
	  <div class="blank20"></div>
      {{$list_column->links()}}