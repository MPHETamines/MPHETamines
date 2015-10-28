
search_files();
insert_officer(); // Call the insert_officer function
delete_officer(); // Call the delete_officer function
view_users();
edit_officer();

function view_users() {
	$('button.view_users').click(function(){
		$.post('../includes/view-users.php', {}, function( data ) {
			$(data).appendTo('table.usersList tbody').hide().fadeIn();
			delete_officer();
		});
		return false; // Ensure that the form does not submit twice
	});
}

function search_files(){
	$('a.search-files-location').click(function(){
		var searchVal = $('input.search-value').val();
		if(searchVal != "" &&  searchVal != undefined){
			$.post('../includes/search-files.php', {search: searchVal, location: 'location' }, function( data ) {
				$('input.search-value').val('');
				$(data).appendTo('table.fileList tbody').hide().fadeIn();
				delete_officer();

			});
		}
	});

	$('form.filetype').click(function(){
		$('button.select-file').click(function(){
			var val = $('form.filetype select').val();
			alert(val);
			if(val != undefined && val != 'Select File type' ){
				$.post('../includes/search-files.php', {search: val, filetype: 'filetype' }, function( data ) {
					$('input.search-value').val('');
					$(data).appendTo('table.fileList tbody').hide().fadeIn();
					delete_officer();

				});
			}
		})
	});
}

function insert_officer() {
	$('button.insert_officer').click(function(){
		var new_officer_full= $('form.insertOfficer input[name=new-officer-full]').val();
		var new_officer_user= $('form.insertOfficer input[name=new-officer-user]').val();
		var new_officer_pass= $('form.insertOfficer input[name=new-officer-pass]').val();
		var confirm_officer_pass= $('form.insertOfficer input[name=confirm-officer-pass]').val();
		var new_role=$('form.insertOfficer select[name=role]').val();
		
		if(new_officer_pass == confirm_officer_pass){
			if(new_officer_pass < 5){
				alert('Password is too short, it must be at least 6 characters.');
			}
			else if(new_role == 'Select role'){
				alert('Choose a role');
			}
			else if( new_officer_full != '' && new_officer_full != undefined &&  new_officer_user != '' && new_officer_user != undefined &&  new_officer_pass != '' && new_officer_pass != undefined && new_role != undefined){
				$.post('../includes/insert-officer.php', { fullname: new_officer_full, username: new_officer_user, password: new_officer_pass, role: new_role }, function( data ) {
					cleanFields();
					$(data).appendTo('table.officerList tbody').hide().fadeIn();
					delete_officer();

				});
			}else{
				alert("Please complete all the field.");
			}
		}else{
			alert("Passwords do not match");
		}
		return false; // Ensure that the form does not submit twice
	});
}

function delete_officer() {
	$('.delete-button').click(function(){
		var current_element = $(this);
		var id = $(this).attr('id');
		$.post('../includes/delete-officer.php', { officer_id: id }, function() {
			current_element.parent().fadeOut("fast", function() { $(this).parent().remove(); });
		});
	});
}

var id;
var ele;
function edit_officer() {
	$('li.updateForm').hide();
	$('a.edit-button').click(function(){
		id = $(this).attr('id');
		//color($(this));
		ele = $(this);
		//$('.hey').html(id);
		$('li.registerForm').hide();
		$('li.updateForm').show();
		$('button.update-officer').click(function(){
			var pass1 = $('li.updateForm input[name=update-pass]').val();
			var pass2 = $('li.updateForm input[name=con-update-pass]').val();
			if(pass1 == '' || pass1 == undefined || pass2 == '' || pass2 == undefined){
				alert("Please enter password");
			}
			else if(pass1 != pass2 ){
				alert("Passwords do not match");
			}else{
				$.post('../includes/update-officer.php', { password: pass1, officer_id: id}, function( data ) {
					$('li.updateForm input[name=con-update-pass]').val('');
					$('li.updateForm input[name=update-pass]').val('');
				});
			}
		});
		$('button.cancel').click(function(){
			$('li.registerForm').show();
			$('li.updateForm').hide();
		});
	});
}

function cleanFields(){
	$('input[name=new-officer-full]').val('');
	$('input[name=new-officer-user]').val('');
	$('input[name=new-officer-pass]').val('');
}
