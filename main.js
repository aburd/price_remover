var fs = require('fs');	
	// get the folder called files relative to the current dir
	var path = __dirname+'/files/';

	var regex = /lorem/gi;
	var replacementText = 'This is what haunts you';
	


	// function to get files
	fs.readdir(path, function(err, files){
	if(err){ 
		console.log('something went wrong');
	}

		files.forEach( function(file, index, array) {

			console.log(file);

		  // Don't do this for special or hidden files
		  if( file[0]!== '.' && file != 'modified' ) {
		 	//replaceText( path + file, index, array);			this uses the old code
		    replaceTextOutputToFile(path, file, index, array);
		  }

		});
	});


	// this reads the file and replaces the text
	function replaceText(path, index, array, callback){

		fs.readFile( path, { encoding:'utf8' } , function(err, body){
			if (err) {
				console.log('something horrible has happened.');
			}
			else {
				var modified = body.replace(regex, replacementText);
				console.log(array[index] + '\n++++++++++++++++++++++++');
				console.log(modified + '\n\n');

				fs.writeFile('output.txt', modified, 'utf8', function(){
					console.log( array[index] + ' has been logged in output.txt.');
				});
			}
		});

		callback && callback();
	}

	// This function takes the body of the files and outputs a modified version to a filename with a similar name
	function replaceTextOutputToFile(path, name, index, array, callback) {

		// Get contents of file
		fs.readFile( path+name, { encoding:'utf8' } , function(err, body){
			if(err) {
				console.log("There was an error reading the file.");
				console.log(err);
				console.log('---');
			}
			else {
				// replace text
				var modifiedText = body.replace(regex, replacementText);
				var modifiedPath = path + 'modified/';

				// make directory if it doesn't exist for the modified files
				fs.mkdir(modifiedPath, function(){
					// open file or create it if it does not exist
					fs.open(modifiedPath + 'modified' + name, 'w', function(err, fd){
						if(err) {
							console.log('Oh no, writing has failed!');
						}
						else {
							fs.write(fd, modifiedText, function(err, written, buffer){
								console.log(written + ' bytes written to ' + path + 'modified' + name);
							});
						}
					});
				});
			}
		});

	}