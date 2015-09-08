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
		console.log(typeof files);
		files.forEach( function(file, index, array){
			
			replaceText( path + '/' + file);

		});
	});


	// this reads the file and replaces the text
	function replaceText(path, callback){
		fs.readFile( path, { encoding:'utf8' } , function(err, body){
			if (err) {
				console.log('something horrible has happened.');
			}
			var modified = body.replace(regex, replacementText);
			console.log(modified + '\n\n');
		});

		callback && callback();
	}