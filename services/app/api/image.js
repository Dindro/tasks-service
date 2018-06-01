const multer = require('multer');
const img = require('easyimage');

const imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];

let api = {};

api.upload = async (req, res) => {
	if (imgs.indexOf(getExtension(req.files.userFile.name)) != -1)
		img.info(req.files.userFile.path, function (err, stdout, stderr) {
			if (err) throw err;
			//        console.log(stdout); // could determine if resize needed here
			img.rescrop(
				{
					src: req.files.userFile.path, dst: fnAppend(req.files.userFile.path, 'thumb'),
					width: 50, height: 50
				},
				function (err, image) {
					if (err) throw err;
					res.send({ image: true, file: req.files.userFile.originalname, savedAs: req.files.userFile.name, thumb: fnAppend(req.files.userFile.name, 'thumb') });
				}
			);
		});
	else
		res.send({ image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name });
};

function getExtension(fn) {
	return fn.split('.').pop();
}

function fnAppend(fn, insert) {
	var arr = fn.split('.');
	var ext = arr.pop();
	insert = (insert !== undefined) ? insert : new Date().getTime();
	return arr + '.' + insert + '.' + ext;
}

module.exports = api;