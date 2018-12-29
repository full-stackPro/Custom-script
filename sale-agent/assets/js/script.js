$(document).ready(function() {
	
	
	$(".inline-buttons").on('click','.buttons',function () {
	  var p= $("#"+this.value);
		p.toggle().siblings().hide();
		$(".section-title").remove();
		p.before('<span class="section-title">'+$(this).text()+'</span>');
		
		$(".inline-buttons").find('.buttons').css('opacity','1');
		$(this).css('opacity','0.7');
		
	});

});