
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"
 lang="en" dir="ltr">
<head>
	<title>Brendan Ritter | Webcrawler</title>
	<?php include('pincludes.html') ?> 
</head>
<body>
	<?php include('pmenu.html') ?> 
	<div class="allcontent">
		<div id="subtitlebox">
			<p id="subtitle">
				Web Crawler			</p>	
			<hr/>
		</div>
		<p class="snippettext">A team and I created a rudementary web crawler. The crawler was multi threaded and would find sites, organize them in a database and allow key word searches. All code was written in Java.

</p><br />Our team's web crawler was capable of locating and following links from a given web page. The crawler would then locate all links from those linked web pages and so forth. 
<br/><br/>
The text on ech page would then be collected and sorted by alphabetical order.
This allowed us to generate the 'quality' and 'relavence' of the webpage when a user input a keyword.
We quickly realized that because sheer amount of data we were collecting, we had to multi-thread our program.
<br/><br/>
The code for this web crawler can be found
<a href='https://github.com/ryla/surfer/tree/master/src'>on github</a>. 
The crawler uses jsoup to parse HTML and redis for the database. The main file is surfer.java.	</div>
</body>
</html>
