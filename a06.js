/*
  Template for CS 433 544 HW6
  
  Base is written by: Amir Mohammad Esmaieeli Sikaroudi
  Note: You are free to change the template as much as you want and do it in your way. The sliders are required to work and the output needs to be downloaded.
  Date: April 29, 2026

  [Your name]

  Date: Mat ?, 2026
 */


//access DOM elements we'll use
var input = document.getElementById("load_image");
var output = document.getElementById("save_image");
var outputP3 = document.getElementById("save_imageP3");
var canvas = document.getElementById('canvas');
var canvasP3 = document.getElementById('canvasP3');
var gammaSlider = document.getElementById('gammaVolume');
var gammaSliderP3 = document.getElementById('gammaVolumeP3');
var ctx = canvas.getContext('2d');
var ctxP3 = canvasP3.getContext('2d');

var hdr_data;//HDR data read from file
var width;
var height;
var LDRData;//Final image in RGB [0,255] ready to download/save
var LDRDataP3;//Final image in RGB [0,255] ready to download/save
var luminance;//"L" that was used in Overleaf


//Connect event listeners
input.addEventListener("change", upload);
output.addEventListener("click", download);
outputP3.addEventListener("click", downloadP3);

gammaSlider.addEventListener("change", function(evt) {
    adjustGamma(gammaSlider.value);
  },false);
gammaSliderP3.addEventListener("change", function(evt) {
    adjustGammaP3(gammaSliderP3.value);
  },false);


//Function to process upload
function upload() {
  if (input.files.length > 0) {
    var file = input.files[0];
    //console.log("You chose", file.name);
    //if (file.type) console.log("It has type", file.type);

    var fReader = new FileReader();
    //for HDR, we'll readAsArrayBuffer
    fReader.readAsArrayBuffer(file)

    fReader.onload = function(e) {
      //if successful, file data has the contents of the uploaded file
      var file_data = fReader.result;

      //calling parseHdr from hdr.js will process the data
      var hdr_data = parseHdr(file_data);

      //hdr_data.shape[0] has the width
      //hdr_data.shape[1] has the height
      //hdr_data.data is an array of size 4xWxH of floats for the pixels

	  //Call "adjustGamma" and "adjustGammaP3" to update the canvases after the file is loaded.
	  //Feel free to do it in your way.
    }
  }
}


//Adjust gamma for part 2 (slider's listener function)
function adjustGamma(gammaValue)
{
	//Update the value in the HTML view
	var gammaLabel = document.getElementById("gammaValueText");
	gammaLabel.innerHTML = gammaSlider.value;
	gammaSlider.label = "Gamma: "+gammaSlider.value;//refresh gamma text
	//TODO: follow the formulas for basic tone mapping then draw it on the first canvas
}

//Adjust gamma for part 3 (slider's listener function)
function adjustGammaP3(gammaValue)
{
	//Update the value in the HTML view
	var gammaLabel = document.getElementById("gammaValueTextP3");
	gammaLabel.innerHTML = gammaSliderP3.value;
	gammaSliderP3.label = "Gamma: "+gammaSliderP3.value;
	//TODO: follow the formulas for part 3 then draw it on the first canvas
}

//Low pass (B)
//TODO: finish this function for part3
function getLowPass()
{

}

//Low pass (H)
//TODO: finish this function for part3
function getHighPass()
{

}

//Uses a library to save a buffer to file "FileSaver.js" (part 2)
function download() {
	if (hdr_data !== undefined && LDRData !== undefined)
	{
		var testBuffer=convertToPPM(hdr_data,LDRData);
		var blob = new Blob([testBuffer]);
		saveAs(blob, "output.ppm");
	}
}

//Uses a library to save a buffer to file "FileSaver.js" (part 3)
function downloadP3() {
	if (hdr_data !== undefined && LDRDataP3 !== undefined)
	{
		var testBuffer=convertToPPM(hdr_data,LDRDataP3);
		var blob = new Blob([testBuffer]);
		saveAs(blob, "outputP3.ppm");
	}
}

//Convert LDR (RGB in [0,255]) to PPM 
function convertToPPM(original,input)
{
	var convertedToPPM="P6";
	convertedToPPM+=(String.fromCharCode('10'));
	convertedToPPM+=(original.shape[0]);
	convertedToPPM+=(" ");
	convertedToPPM+=(original.shape[1]);
	convertedToPPM+=(String.fromCharCode('10'));
	convertedToPPM+=("255");
	convertedToPPM+=(String.fromCharCode('10'));
	var headerBuffer = new Uint8Array(convertedToPPM.length);
	for (var i=0, strLen=convertedToPPM.length; i < strLen; i++) {
		headerBuffer[i] = convertedToPPM.charCodeAt(i);
	}
	var pixelData=new Uint8Array(width*height*3);
	for(var i = 0; i < width*height; i++){
		pixelData[i*3]=input[i*4];
		pixelData[i*3+1]=input[i*4+1];
		pixelData[i*3+2]=input[i*4+2];
	}
	var finalBuffer = new Uint8Array(headerBuffer.length + pixelData.length);
	finalBuffer.set(headerBuffer);
	finalBuffer.set(pixelData, headerBuffer.length);
	convertedToPPM = new TextDecoder("ascii").decode(finalBuffer);
	return finalBuffer;
}