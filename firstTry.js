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
        //设置私有属性jsObj,储存对应的js对象
        this.jsObj = this.init(para);
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
            return arr;
        },

        //CSS
        css : function(){
            var prop = arguments;
            if(prop.length == 2)
            {
                for(var i = 0;i<this.jsObj.length;i++)
                {
                    this.jsObj[i].style[prop[0]] = prop[1];
                }
            }
            else if(prop.length == 1)
            {
                var x = (typeof prop[0]).toLowerCase();
                if(x == 'object')
                {
                    for(key in prop[0]) {
                        for (var i = 0; i < this.jsObj.length; i++) {
                            this.jsObj[i].style[key] = prop[0][key];
                        }
                    }
                } else if(  x == 'string')
                {
                    return this.jsObj[0].currentStyle?this.jsObj[0].currentStyle[prop[0]]:getComputedStyle(this.jsObj[0])[prop[0]];
                }
            }
        },

        //eq
        eq : function(i){
            console.log((this.jsObj[i]).length);
            return  $(this.jsObj[i]);
        }
    },

    window.$ = $;
}();