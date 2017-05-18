/**
 * Created by Administrator on 2017/5/16.
 */



!function(){

    //$接口
    function $(para){
        var typeP = (typeof para).toLowerCase();            //将string小写
        if( typeP == 'string'|| typeP =='object'){
            return new Init(para);                          //创建对象
        }
    };

    //对象的构造函数
    function Init(para){
        this.init(para);
        //设置私有属性jsObj,储存对应的js对象
        //this.jsObj = this.init(para);
        //this.length = this.jsObj.length;
    };


    Init.prototype = {
        //init返回一个储存js对象的数组
        init : function(para){
            var typePa = ( typeof para ).toLowerCase();
            var arr = [];
            if(typePa == 'string'){
                var firstS = para[0];
                switch(firstS){
                    //id选择器
                    case '#':
                        arr.push(document.getElementById(para.replace(/#/,'')));
                        break;
                    //类选择器
                    case '.':
                        if(document.getElementsByClassName)
                        {
                            var cName = document.getElementsByClassName(para.replace(/\./,''));
                            for(var i = 0;i<cName.length;i++){
                                arr.push(cName[i]);
                            }
                        }
                        else{
                            var allE = document.getElementsByTagName('*');
                            for(var i = 0;i<allE.length;i++)
                            {
                                var allCN = allE[i].className.split(' ');
                                for(var j = 0;j<allCN.length;j++)
                                {
                                    if(allCN[j]==para.replace(/\./,'')){
                                        arr.push(allE[i]);
                                    }
                                }
                            }
                        }
                        break;
                    //元素选择器
                    default:
                        var allM =document.getElementsByTagName(para);
                        for(var i = 0;i<allM.length;i++)
                        {
                            arr.push(allM[i]);
                        }
                        break;
                }
            }else if(typePa == 'object')   //传进来document.getElementById或者getElementsByClassName...
            {
                if(para.length != undefined)
                {
                    for(var i = 0;i<para.length;i++)
                    {
                        arr.push(para[i]);
                    }
                }else{

                    arr.push(para);
                }
            }
            for (var j=0;j<arr.length;j++ )     //除去Jq 中相同的js对象
            {
                for (var i=arr.length-1;i>j;i-- )
                {
                    if ( arr[i] == arr[j] )
                    {
                        arr.splice(i , 1);
                    }
                }
            }
            for(var i = 0;i<arr.length;i++)
            {
                this[i] = arr[i];     //this指jq对象（构造函数Init），对jq对象下标拓展指向js对象
            }
            this.length = arr.length;
        },
        //size   返回jq对象长度
        size : function(){
            return this.length;
        },
        //get    jq对象的第i个js对象返回js对象
        get : function(i){
            return  this[i];
        },

        //each   遍历
        each : function(x){
            for(var i = 0;i<this.length;i++){
                x.call( this[i],i );
            }
        },
        //eq   jq对象的第i个js对象返回jq对象
        eq : function(i){
            console.log((this[i]).length);
            return  $(this[i]);
        },

        //CSS   css样式修改/获取
        css : function(){
            var prop = arguments;
            if(prop.length == 2)
            {
                this.each(function(){
                    this.style[prop[0]] = prop[1];
                });
                return this;
            }
            else if(prop.length == 1)
            {
                var x = (typeof prop[0]).toLowerCase();
                if(x == 'object')
                {
                    for(key in prop[0]) {
                        this.each(function(){
                            this.style[key] = prop[0][key];
                        });
                    }
                    return this;
                } else if(  x == 'string')
                {
                    return this[0].currentStyle?this[0].currentStyle[prop[0]]:getComputedStyle(this[0])[prop[0]];
                }
            }
        },
        //html
        html : function(x){
            if(x != undefined)              //修改jq对象的html内容
            {
                this.each(function(){
                    this.innerHTML = x;
                });
                return this;
            }
            else{                           //获取jq独享第一个js对象的html内容
                return this[0].innerHTML;
            }
        },
        //Text
        text : function(x){
            if(x != undefined)
            {
                this.each(function(){
                    this.innerText = x;
                });
                return this;
            }
            else{
                var str ='';
                this.each(function(){
                    str += this.innerText;
                });
                return str;
            }
        },

        //attr     属性修改/获取
        attr : function(){
            var prop = arguments;
            if(prop.length == 2)
            {

                this.each(function(){
                    this.setAttribute( prop[0],prop[1] );
                });
                return this;
            }
            else if(prop.length == 1)
            {
                var x = (typeof prop[0]).toLowerCase();
                if(x == 'object')
                {
                    for(key in prop[0]) {
                        this.each(function(){
                            this.setAttribute( key ,prop[0][key] );
                        });
                    }
                    return this;
                } else if(  x == 'string')
                {
                    return this[0].getAttribute(prop[0]);
                }
            }
        },
        //prop     HTML默认属性修改/获取
        prop : function(){
            var x = arguments;
            if(x.length == 2)
            {
                if(x[0].toLowerCase() == 'class')x[0]='className';
                this.each(function(){
                    this[x[0]] = x[1];
                });
                return this;
            }
            else if(x.length == 1)
            {
                var y = (typeof x[0]).toLowerCase();
                if(y == 'object')
                {
                    for(key in x[0]) {
                        if(key.toLowerCase() == 'class')key = 'className';
                        this.each(function(){
                            this[key] = x[0][key];
                        });
                    }
                    return this;
                } else if(  y == 'string')
                {
                    return this[0][x[0]];
                }
            }
        },
        //removeAttr   移除属性
        removeAttr : function(prop){
            this.each(function(){
                this.removeAttribute(prop);
            });
            return this;
        },
        removeProp : function(prop){
            this.removeAttr(prop);
            return this;
        },

        //addClass   添加类
        addClass : function(prop){
            var typeP = ( typeof prop ).toLowerCase();
            if( typeP == 'string'&& prop.length !=0 )
            {
                var arrProp = prop.split(' ');
                this.each(function(){
                    if (this.className == '') {
                        this.className = prop;
                    }
                    else {
                        for(var i = 0;i<arrProp.length;i++) {
                            var arrC = this.className.split(' ');
                            var onOff = true;
                            for (var j = 0; j < arrC.length; j++) {
                                if (arrProp[i] == arrC[j]) {
                                    onOff = false;
                                    break;
                                }
                            }
                            if(onOff==true){
                                this.className += ' '+arrProp[i];
                            }
                        }
                    }
                });
            }
            return this;
        },

        //removeClass  删除类
        removeClass : function(prop){
            var typeP = ( typeof prop ).toLowerCase();
            if( typeP == 'string'&& prop.length !=0 )
            {
                var arrProp = prop.split(' ');
                this.each(function(){
                    var arrC = this.className.split(' ');
                    if (this.className == '') {
                        this.className = '';
                    }
                    else {
                        for(var i = 0;i<arrProp.length;i++) {
                            for (var j = arrC.length-1; j >=0; j--) {
                                if (arrProp[i] == arrC[j]) {
                                    arrC.splice(j,1);

                                }
                            }
                        }
                        this.className = arrC.join(' ');
                    }
                });
            }
            return this;
        },

        //toggleClass 转换类    可以用正则RegExp('(^|\\s)'+arrD[i]+'(\\s|$)') +++ addClass  removeClass
        toggleClass : function(prop){
            var typeP = ( typeof prop ).toLowerCase();
            if( typeP == 'string'&& prop.length !=0 )
            {
                this.each(function(){
                    var arrProp = prop.split(' ');
                    var arrC = this.className.split(' ');
                    if (this.className == '') {
                        this.className = prop;
                    }
                    else {
                        for(var i = arrProp.length-1;i>=0;i--) {
                            var onOff = false;
                            for (var j = arrC.length-1; j >=0; j--) {
                                if (arrProp[i] == arrC[j]) {
                                    arrC.splice(j,1);
                                    onOff = true;
                                }
                            }
                            if(onOff == true)
                            {
                                arrProp.splice(i,1);
                            }
                        }
                        this.className = arrProp.join(' ')+arrC.join(' ');
                    }
                });
            }
            return this;
        },

        //val  设置/获取value值
        val : function(va){
            if(va){
                this.each(function(){
                    this.value = va;
                });
                return this;
            }
            else{
                return this[0].value;
            }
        },

        //width 设置/获取width值
        width : function(wid){
            if(wid){
                this.each(function(){
                    this.style.width = wid +'px';
                });
                return this;
            }
            else{
                return parseFloat(this.css('width'));
            }
        },
        //height
        height : function(hei){
            if(hei){
                this.each(function(){
                    this.style.height = hei +'px';
                });
                return this;
            }
            else{
                return parseFloat(this.css('height'));
            }
        },

        //innerWidth
        innerWidth : function(inWid){
            if(inWid){
                this.each(function(){
                    this.style.width = inWid - parseFloat($(this).css('paddingLeft'))- parseFloat($(this).css('paddingRight'))+'px';
                });
                return this;
            }
            else{
                return this[0].clientWidth;
            }
        },

        //innerHeight
        innerHeight : function(inHei){
            if(inHei){
                this.each(function(){
                    this.style.height = inHei - parseFloat($(this).css('paddingTop'))- parseFloat($(this).css('paddingBottom'))+'px';
                });
                return this;
            }
            else{
                return this[0].clientHeight;
            }
        },

        //outerWidth
        outerWidth : function(outWid){
            if(outWid){
                this.each(function(){
                    this.style.width = outWid - parseFloat($(this).css('paddingLeft'))- parseFloat($(this).css('paddingRight')) - parseFloat($(this).css('borderLeftWidth')) - parseFloat($(this).css('borderRightWidth'))+'px';
                });
                return this;
            }
            else{
                return this[0].offsetWidth;
            }
        },

        //outerHeight
        outerHeight : function(outHei){
            if(outHei){
                this.each(function(){
                    this.style.height = outHei - parseFloat($(this).css('paddingTop'))- parseFloat($(this).css('paddingBottom')) - parseFloat($(this).css('borderTopWidth')) - parseFloat($(this).css('borderBottomWidth'))+'px';
                });
                return this;
            }
            else{
                return this[0].offsetHeight;
            }
        },

        //hasClass
        hasClass : function( prop ){
            var reg = new RegExp("(^|\\s)"+prop+"(\\s|$)");
            for(var i = 0;i<this.length;i++)
            {
                if(reg.test(this[i].className)){
                    return true ;
                }
            }
            return false;
        },

        //children   一级子元素匹配
        children : function( prop ){
            var arr = [];
            if(!prop){
                this.each(function(){
                    for(var i = 0;i<this.children.length;i++)
                    {
                        arr.push(this.children[i]);
                    }
                });
            }
            else{
                var $Prop = $(prop);
                for(var i = 0;i<$Prop.length;i++){
                    for(var j=0;j<this.length;j++)
                    {
                        if($Prop[i].parentNode == this[j]){
                            arr.push($Prop[i]);
                            break;
                        }
                    }
                }
            }
            return $(arr);
        },

        //parent   一级父元素匹配
        parent : function( prop ){
            var arr =[];
            if(!prop){
                this.each(function(){
                    arr.push(this.parentNode);
                });
            }
            else{
                var $Prop = $(prop);
                for(var i = 0;i<$Prop.length;i++){
                    for(var j=0;j<this.length;j++)
                    {
                        if(this[j].parentNode == $Prop[i]){
                            arr.push($Prop[i]);
                            break;
                        }
                    }
                }
            }
            return $(arr);
        },

        //parents   祖元素匹配
        parents : function(prop){
            var arr = [];
            this.each(function(){
                var oThis = this;
                while(oThis != document.documentElement){
                    oThis = oThis.parentNode;
                    arr.push(oThis);
                }
            });
            if(!prop){
                return $(arr);
            }
            else{
                var newArr = [];
                var $Prop = $(prop);
                for(var i = 0;i<arr.length;i++){
                    for(var j = 0;j<$Prop.length;j++)
                    {
                        if(arr[i] == $Prop[j]){
                            newArr.push(arr[i]);
                            break;
                        }
                    }
                }
                return $(newArr);
            }
        },

        //find   查找所有子元素，必须带参
        find : function(prop){
            if(prop){
                var arr = [];
                var $Prop = $(prop);
                var This = this;
                $Prop.each(function(){
                    var newArr = [];
                    var oThis = this;
                    while(oThis != document.documentElement){
                        oThis = oThis.parentNode;
                        newArr.push(oThis);
                    }
                    for(var i = 0;i<newArr.length;i++){
                        for(var j = 0;j<This.length;j++)
                        {
                            if(newArr[i] == This[j]){
                                arr.push(this);
                            }
                        }
                    }
                });
                return $(arr);
            }
            return null;
        },

        //siblings  同级其他元素
        siblings : function(prop){
            var arr = [];
            this.each(function(){
                var sil = this.parentNode.children;
                var silLen = sil.length;
                for(var i = 0; i<silLen;i++)
                {
                    if(sil[i] != this){
                        arr.push(sil[i]);
                    }
                }
            });
            if(!prop){
                return $(arr);
            }
            else{
                var $Prop = $(prop);
                var newArr = [];
                for(var i = 0;i<$Prop.length;i++){     //each方法也行
                    for(var j = 0;j<arr.length;j++)
                    {
                        if($Prop[i] == arr[j]){
                            newArr.push(arr[j]);
                            break;
                        }
                    }
                }
                return $(newArr);
            }
        }



    };

    window.$ = $;
}();