Template code for A02UG
------------

Author: Aaron Posey [acposey@arizona.edu]
		Cesar D. Quihuis-Romero [qromeroc@arizona.edu]
  
Course: CS433 533
Date: Apr 30, 2026

**The sample video is just a demo, please read the instructions on Overleaf carefully to implement your code.

**PLEASE UPDATE THIS README TO INCLUDE:**
* a text description of how to run your program, 
* document any idiosyncrasies, behaviors, or bugs of note that you want us to be aware of when grading, and
* any other comments that you feel are relevant.

Executing program:
select "chose file" and select a given file. Of the 3 samples provided:
	- smallOffice.hdr and memorial_o876.hdr work really well in both parts 2 and 3 (.4 is a good gamma value)
	- smalldesignCenter.hdr works okay in part 2 with a low gamma of .1 , but does not render well 
	  in part 3 (even with very low gamma values)
selecting save in either part 2 or 3 saves a .ppm which can be opened using software (we used gimp)
Description:
part 2 uses the luminosity function and ratio outlined in spec
part 3 uses the same steps outlined in spec and a mean/box filter for computing H(x) (high pass filter)

Included files (**PLEASE ADD/UPDATE THIS LIST**):
* images -- a folder with a collection of images to test code
* index.html -- a sample skeleton html file with a canvas
* a06.js -- a sample skeletion javascript file for functionality
* hdr.js -- a javascript library for parsing HDR images, [courtesy of Martin Ignac](https://github.com/vorg/parse-hdr)
* FileSaver.js -- a javascript library for saving Blob. Useful for saving PPM files.


**PLEASE PROVIDE ANY ATTRIBUTION HERE**
* images/smalldesignCenter.hdr -- HDR file from http://people.csail.mit.edu/fredo/PUBLI/Siggraph2002/
* images/smallOffice.hdr -- HDR file from http://people.csail.mit.edu/fredo/PUBLI/Siggraph2002/
* images/memorial.hdr -- HDR file from http://www.anyhere.com/gward/hdrenc/pages/originals.html
* FileSaver.js -- library for saving file locally from https://github.com/eligrey/FileSaver.js/
