var bitsok=false;
test( "B create", function() {
	var el = document.getElementById('container');
	b(el,'click',function(){ bitsok=true; });
	$("#container").trigger('onclick');
	ok(1==1,"ok");
});
test( "B clicked",function(){
	ok(bitsok,"click");
});