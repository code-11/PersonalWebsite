
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"
 lang="en" dir="ltr">
<head>
	<title>Brendan Ritter | Split-TCP</title>
	<?php include('pincludes.html') ?> 
</head>
<body>
	<?php include('pmenu.html') ?> 

	<div class="allcontent">
		<div id="subtitlebox">
			<p id="subtitle">
				Split TCP			</p>	
			<hr/>
		</div>
		<p class="snippettext">A group and I designed and ran tests on the split TCP protocol. All code was written in C.  </p><br />
TCP (Transmission Control Protocol) is a type of protocol that determines how two computers talk to one another. There is a variation on this protocol which is refferred to as 'split TCP'. 
<br/><br/>
Under normal TCP, one computer communicates directly with a switch or router, which then communicates with the internet.
However, because of the rise of mobile internet devices, it may be beneficial to have a secondary computer in between the computer and the router. 
This is because wifi signals are easy to loose, and the distance to loss ratio is non-linear. This means that if you halve the distance by adding a secondary computer, you much more than halve the loss rate of messages.
For more information about TCP, wikipedia has an article
<a href='http://en.wikipedia.org/wiki/Transmission_Control_Protocol'>here</a>. 
<br/><br/>
In Software Systems, a team and I devised a series of tests to see whether this was actually the case. A detailed explanation of the methods involved and our results can be found
<a href='../Documents/TcpFinalReport.pdf'>here</a>. 
I apologize for the lack of quality for the pictures in the report, and am working on restoring them to original quality.

Additionally the code we used can also be found in the detailed report.
<br/><br/>
We found that the introduction of a secondary computer did, in some cases, reduce packet loss. 	</div>
</body>
</html>
