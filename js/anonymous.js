!function ($) {

  $(function () {

	var AnonymousWriter = function(element) {
		$('head').append('<link rel="stylesheet" href="css/anonymous_writer.css" type="text/css" />');
		$(element).append('<span id="cursorAnonymousWriter"><img src="img/cursor.gif"/></span>');

		this.$cursor = $("#cursorAnonymousWriter");
		this.text = "";

		this.update = function(text){
			while (this.text.length < text.length){
				letter = text[this.text.length]
				this.write(letter)
			}
			while (this.text.length > text.length){
				this.remove(letter)
			}
		}

		this.write = function(letter){
			switch (letter){
				case null : break;
				case " " : this.$cursor.before('<span class="letter">&nbsp;</span>');break;
				case "\n" : this.$cursor.before('<BR/>');break;
				default : this.$cursor.before('<span class="'+randomStyle()+'">'+letter+'</span>')

			}
			this.text += letter
		}


		this.remove = function () {
			var letters = this.$cursor.parent().children().slice(0, -1);
			if (letters.length > 0) {
				$(letters[letters.length - 1]).remove();
				this.text = new String(this.text.slice(0, -1));
			}
		}

		function randomStyle(){
			var style = Math.floor(Math.random()*6);
			return "letter letter"+style		
		}		


	}

	$.fn.anonymouswriter = function ( inputId ) {
		// Create writer 
		var writer = new AnonymousWriter(this)
		var $this = $(this);
		//Create hidden text area for inputId
		$this.after("<textarea id='"+inputId+"' cols='999' class='hidden_anonimous_typwriter'></textarea>")
		var input = $("#"+inputId);
		input.keyup(function(e){
			writer.update($(this).val())		
		});		    
		// Bind element to hidden textarea
		$this.click(function(e){
			input.focus()
		})
		// Autofocus
		input.focus();
  	}
	})

}(window.jQuery);
