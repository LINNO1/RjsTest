
/*照片墙： 瀑布流布局 
  使用： 


       var ww= new Waterfull($('容器'),[加载图片后滚动条是否要滚到最底部],[图片数目]，[图片宽度])    
         ww.getImag([图片数目]);
          var ww= new Waterfull($('.ct2'),true,10,190);
          ww.getImag(10);
*/



/*思路:瀑布流布局的图片宽度相同，高度不同
 	   1. 计算每一行能排多少个图片，用数组记下每一列图片的高度
 	   2. 排完一行之后，排下一行，从高度最小的那一列开始排

 	*/
define(['jquery'],function($){
function Waterfull($ct,needBottom,num,width){
        this.$ct = $ct;
        this.num=num || 20;   //一次加载的图片的个数
        this.width=width || 190;
        this.isImagLoad = true;  //状态锁，避免重复要数据
        this.loadNum=0;
        this.needBottom =needBottom || false; //默认不会到最后

        this.creatHtml();
        this.init();


     }
     Waterfull.prototype={
        init: function(){
                 this.$bottom = this.$ct.find('#bottom');
                 this.$imgct=$(this.$ct.find('.img-ct'));            
                 this.itemWidth = this.width; //用来计算高度
                 var ctWidth = this.$imgct.width();
                 var rowLength =parseInt(ctWidth/this.itemWidth);
                 this.rowList=[];
                 for(var i=0;i<rowLength;i++){
                        this.rowList[i]=0;
                    }

                 
           },
        creatHtml: function(){
                 var html ='';
                 html += '<ul class="img-ct"></ul>';
                 html +='<div id="bottom">bottom</div>'
                 this.$ct.addClass('waterfull');
                 this.$ct.append(html);
                 this.$ct.find('#bottom')
                     .css({ width: 10+'px',
                            height: 10+'px',
                            visibility: 'hidden'})

        },
        //向后台要图片
        getImag: function(num){
            
            if(num!==undefined){
               this.num = num;
            } 
            if( !this.isImagLoad ){ return;}            
            this.isImagLoad=false;
            var _this =this;
            var imgHeight,imgWidth,urlArray=[];
            for(var i=0;i<this.num;i++){
                imgHeight = parseInt(Math.random()*250+50);//高度为50~300px
                imgWidth = this.width;     //宽度固定       
                urlArray.push( 'Http://lorempixel.com/'+imgWidth+'/'+imgHeight);            
               }
             this.loadImag(urlArray);
           },
   
        loadImag: function(urlArray){
                var _this=this;
                for(var i=0;i<this.num;i++){
                    var img = new Image();
                    img.src=urlArray[i];                                   
                    img.onload=function(){
                         var imgObj = {
                            imgNode: this,
                            imgHeight: this.height  //注意：这里的高度要存下来
                           }                  
                         _this.waterfull(imgObj);
                      } 
                   }                         
                },
         waterfull: function(img){                      
                var $imgNode=$('<li></li>');
                $imgNode.append($(img.imgNode));
                var minLength = Math.min.apply(null,this.rowList);
                var minIndex = this.rowList.indexOf(minLength);
                this.$imgct.append($imgNode);                 
                $imgNode.css({
                    top: this.rowList[minIndex]+5+'px',
                    left:(this.itemWidth+12.5)*minIndex+'px'  
                })
               //用之前存的图片的真实高度，用$(img.imgNode).height()得出的高度是假的      
               this.rowList[minIndex]+=img.imgHeight+5;                   
               this.$imgct.height(Math.max.apply(null,this.rowList));  //父容器的高度重新设置，不然高度为0，元素一直看得见
               this.loadNum+=1;
               //如果这批图片都加载好了
               if(this.loadNum>=this.num){
                    this.isImagLoad=true;
                    this.loadNum=0;
               }
              //滚动条滚到最底部
                if(this.needBottom){
                    console.log('scroll bottom...')
                    console.log(this.$bottom.offset().top)
                     window.scrollTo(0,this.$bottom.offset().top);
                  }

               }
            }  

return Waterfull;

})
     


     
      