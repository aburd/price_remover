var fs = require('fs');	
	// get the folder called files relative to the current dir
	var path = __dirname+'/files';

	var regex = /lorem/gi;
	var replacementText = 'This is what haunts you';
	var fileArr = [];


	// function to get files
	fs.readdir(path, function(err, files){
	if(err){ 
		console.log('something went wrong');
	}
		
		files.forEach( function(file, index, array){	
			replaceText( path + '/' + file, index, array);

		});
	});


	// this reads the file and replaces the text
	function replaceText(path, index, array, callback){

		fs.readFile( path, { encoding:'utf8' } , function(err, body){
			if (err) {
				console.log('something horrible has happened.');
			}
			else if( index !== 0 ) {
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