$(function() {
	$('.editor').froalaEditor({
		toolbarInline: true,
		initOnClick: true,
		htmlRemoveTags: ['base'], 
		toolbarButtons: ['bold', 'italic', 'underline', 'fontSize', 'fontFamily','color', 'undo', 'redo']
	});
	//----- OPEN
	$('[data-popup-open]').on('click', function(e) {
		var targeted_popup_class = jQuery(this).attr('data-popup-open');
		$('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
		var clone_ele = $(this).parent().find('.ui-sortable-handle').first(true).clone();
		//$(this).parent().append(clone_ele);
		console.log(clone_ele);
		var ul = $(this).closest('ul');
		var ul_id = ul.attr('id');
		clone_ele.find('.buttons').attr("id", "newelement").css("marginLeft","5px");
		clone_ele.insertBefore($(this));
		$('[data-popup="' + targeted_popup_class + '"]').find("#clickded").remove();
		$('[data-popup="' + targeted_popup_class + '"]').find("#clickded_id").remove();
        $('<input type="hidden" id="clickded" value="newelement" />').insertBefore('#submitbtn');
        $('<input type="hidden" id="clickded_id" value="'+ul_id+'" />').insertBefore('#submitbtn');
		e.preventDefault();
	});

	//----- CLOSE
	$('[data-popup-close]').on('click', function(e) {
		var targeted_popup_class = jQuery(this).attr('data-popup-close');
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

		e.preventDefault();
	});
});
$( function() {
	$( ".swapable" ).sortable();
	$(".inline-buttons").sortable({
		containment: 'parent',
		cursor:'move'   
	});
	
} );


	  

jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
  return this.each(function(){
    var clicks = 0, self = this;
    jQuery(this).on('click',function(event){
      clicks++;
      if (clicks == 1) {
        setTimeout(function(){
          if(clicks == 1) {
            single_click_callback.call(self, event);
          } else {
            double_click_callback.call(self, event);
          }
          clicks = 0;
        }, timeout || 300);
      }
    });
  });
}

$(document).ready(function() {
	//change Foreground Color 
	$('.coloselector').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			 console.log($(el));
			$(el).css("background-color","#"+hex);
			$(el).parent().siblings().find(".buttons").css("color","#"+hex);
			$(el).ColorPickerHide();
		}
	});
	// Change Background Color
	$('.bgcolorselector').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			 console.log($(el));
			$(el).css("background-color","#"+hex);
			$(el).parent().siblings().find(".buttons").css("background-color","#"+hex);
			$(el).ColorPickerHide();
		}
	});

	
	$("#addsection").submit(function(e){
		e.preventDefault();
		var title 		 = $("#btn-title").val();
		var id			 = $("#btn-id").val();
		var section_text = $("#section-des").val();
		var clickded_id  = $("#clickded_id").val();
		$("#newelement").text(title);
		$("#newelement").val(id);
		//$("#newelement").attr("id",id);
		if(clickded_id == 'excitement'){
			var html = '<div class="mainContent" id="'+id+'">'+section_text+'</div>';
			$("#topArea").append(html);
		}else{
			var html = '<div class="rebuttal" id="'+id+'">'+section_text+'</div>';
			$("#rebuttalArea").append(html);
		}
		
		setTimeout(function(){
			$(".popup-close").trigger("click");
		},600);
		
	});
	
	
	
	$('.text-editor').richText({
		// text formatting
		bold: true,
		italic: true,
		underline: true,

		// text alignment
		leftAlign: true,
		centerAlign: true,
		rightAlign: true,

		// lists
		ol: true,
		ul: true,

		// title
		heading: false,

		// fonts
		fonts: false,
		
		fontColor: true,
		fontSize: true,

		// uploads
		imageUpload: false,
		fileUpload: false,

		// media
		videoEmbed: false,

		// link
		urls: false,

		// tables
		table: false,

		// code
		removeStyles: false,
		code: true,

		// colors
		colors: [],

		// dropdowns
		fileHTML: '',
		imageHTML: '',

		
		// dev settings
		useSingleQuotes: false,
		height: 0,
		heightPercentage: 0,
		id: "",
		class: "",
		useParagraph: false
  
	});
	$('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
			
	$("#topArea a").click(function () {
	   var ref = $(this).attr('href');
		window.location.href = ref;
	});
	
	$("#closethis").click(function(){
		$(this).parent().hide();
	});
	
	$("#introPrompt a").click(function () {
	   var ref = $(this).attr('href');
		window.location.href = ref;
	});
	
	
	/*$('#sidebar').notebook({
		autoFocus: false,
		placeholder: 'Your text here...',
		mode: 'multiline', // multiline or inline
		modifiers: ['bold', 'italic', 'underline']
	});*/
	
	
	
	
	
	
	
	$(".inline-buttons").on('click','.buttons',function () {
	  var p= $("#"+this.value);
		p.toggle().siblings().hide();
		$(".section-title").remove();
		p.before('<span class="section-title">'+$(this).text()+'</span>');
		
		$(".inline-buttons").find('.buttons').css('opacity','1');
		$(this).css('opacity','0.7');
		
	});
	$(".inline-buttons").on('dblclick','.buttons',function () {
		console.log($(this));
		var sec_id = $(this).val();
		$(this).parent().remove();
		$("#"+sec_id).remove();
		$(".section-title").remove();
	});
	
	
	$("#savechanges").click(function(e) {
				e.preventDefault();
				$('<textarea class="text-editor" rows="5" id="section-des"></textarea>').insertBefore($(".richText"));
				$(".richText").remove();
				$(".fr-toolbar").remove();
				var blob = new Blob([$("html").html()], {
					type: "text/html;charset=utf-8"
				});
				
					saveAs(blob,"save-senior.html");
				
				
				 location.reload();

			});
			$("#export").click(function(e) {
				e.preventDefault();
				$('<textarea class="text-editor" rows="5" id="section-des"></textarea>').insertBefore($(".richText"));
				$(".richText").remove();
				$(".fr-toolbar").remove();
				$('.editor').removeClass('editor');
				$('.fa-plus-circle').remove();
				$('.fr-element').prop('contenteditable', false );
				$('.coloselector').remove();
				$('.bgcolorselector').remove();
				$('.popup').remove();
				var blob = new Blob([$("html").html()], {
					type: "text/html;charset=utf-8"
				});
				saveAs(blob,"agent-senior.html");
				 location.reload();

			});
});