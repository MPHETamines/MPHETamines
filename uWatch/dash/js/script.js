
insert_officer(); // Call the insert_officer function
delete_officer(); // Call the delete_officer function
view_users();
//edit_officer();

function view_users() {
	$('button.view_users').click(function(){
		$.post('../includes/view-users.php', {}, function( data ) {
			$(data).appendTo('table.usersList tbody').hide().fadeIn();
			delete_officer();
		});
		return false; // Ensure that the form does not submit twice
	});
}

function insert_officer() {

	$('button.insert_officer').click(function(){
		var new_officer_full= $('form.insertOfficer input[name=new-officer-full]').val();
		var new_officer_user= $('form.insertOfficer input[name=new-officer-user]').val();
		var new_officer_pass= $('form.insertOfficer input[name=new-officer-pass]').val();
		var new_role=$('form.insertOfficer select[name=role]').val();
		if( new_officer_full != '' && new_officer_full != undefined &&  new_officer_user != '' && new_officer_user != undefined &&  new_officer_pass != '' && new_officer_pass != undefined && new_role != undefined){
			$.post('../includes/insert-officer.php', { fullname: new_officer_full, username: new_officer_user, password: new_officer_pass, role: new_role }, function( data ) {
				cleanFields();
				$(data).appendTo('table.officerList tbody').hide().fadeIn();
				delete_officer();

			});
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
	$('button.edit-button').click(function(){
		id = $(this).attr('id');
		//color($(this));
		ele = $(this);
		//$('.hey').html(id);
		$('form.update').show();
		$('button.showAddForm').click(function(){
			$('form.update').hide();
			$('button.edit-button').show();
		});
	});
	$('button.update-submit').click(function(){
		var pass1= $('.update input[name=pass1]').val();
		var pass2= $('.update input[name=pass2]').val();
		if(pass1 != '' && pass2 != '' && pass1 === pass2){
			$.post('../includes/update-officer.php', { password: pass1, officer_id: id}, function( data ) {
				ele.parent().fadeOut("fast", function() { $(this).remove(); });
				cleanFields();
				$(data).appendTo('.officerList ul').hide().fadeIn();
				$('form.update').hide();
				delete_officer();
			});
		}
		return false; // Ensure that the form does not submit twice					
	});
}

function cleanFields(){
	$('input[name=new-officer-full]').val('');
	$('input[name=new-officer-user]').val('');
	$('input[name=new-officer-pass]').val('');
}
