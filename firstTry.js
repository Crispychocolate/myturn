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
            }else if(typePa == 'object')
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

    };

    window.$ = $;
}();