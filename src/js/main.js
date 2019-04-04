//require(['jquery','myCarousel','waterfull_v4','goTop'],function($,myCarousel,Waterfull,goTop){
  require(['jquery','myCarousel','Barrel','goTop'],function($,myCarousel,Barrel,goTop){
	var imgUrlArr=[[
   "./src/img/carou1.jpg",
   "./src/img/carou2.jpg",
   "./src/img/carou3.jpg",
   "./src/img/carou4.jpg"
   
   ]]
  

 myCarousel.start($('.carousel'),imgUrlArr)

 var bar=new Barrel($('.ct2'),true,25,200)
  bar.getImag(20);
   $('#btn-loadMore').click(function(){
         bar.getImag(10);
         //让页面一直在最底部
      console.log('CLICK')
  
   })


  /*   var ww= new Waterfull($('.ct2'),true,10,190);
     $('#btn-loadMore').click(function(){
         ww.getImag(10);
         //让页面一直在最底部 
   })*/
 
   new goTop('LLL')

})