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
		clone_ele.find('.buttons').attr("id", "newelement").css("marginLeft","5px")
		clone_ele.insertBefore($(this));
		$('[data-popup="' + targeted_popup_class + '"]').find("#clickded").remove();
        $('<input type="hidden" id="clickded" value="newelement" />').insertBefore('#submitbtn');
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
		$("#newelement").text(title);
		$("#newelement").val(id);
		//$("#newelement").attr("id",id);
		var html = '<div class="rebuttal" id="'+id+'">'+section_text+'</div>';
		$("#rebuttalArea").append(html);
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
		var type_ = $(this).attr('type');
		if(type_ == 'intro'){
			saveAs(blob,"save-index.html");
		}else if(type_ == 'explaination'){
			saveAs(blob,"save-explanation.html");
		}
		
		 location.reload();

	});
	$("#export").click(function(e) {
		e.preventDefault();
		$('.editor').removeClass('editor');
		$('<textarea class="text-editor" rows="5" id="section-des"></textarea>').insertBefore($(".richText"));
		$(".richText").remove();
		$(".fr-toolbar").remove();
		$('.fa-plus-circle').remove();
		$('.fr-element').prop('contenteditable', false );
		$('.coloselector').remove();
		$('.bgcolorselector').remove();
		$('.popup').remove();
		var blob = new Blob([$("html").html()], {
			type: "text/html;charset=utf-8"
		});
		var type_ = $(this).attr('type');
		if(type_ == 'intro'){
			saveAs(blob,"agent-index.html"); 
		}else if(type_ == 'explaination'){
			saveAs(blob,"agent-explanation.html");
		}
		
		 //location.reload();

	});
});