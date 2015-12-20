
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"
 lang="en" dir="ltr">
<head>
	<title>Brendan Ritter | Neural Network API</title>
	<?php include('pincludes.html') ?>
</head>
<body>
	<?php include('pmenu.html') ?>

	<div class="allcontent">
		<div id="subtitlebox">
			<p id="subtitle">
				Neural Network API			</p>	
			<hr/>
		</div>
		<p class="snippettext">I created a Neural Network API in python from scratch. A neural network is series of inter-connected nodes, that upon evaluation, preform a certain task. They are mostly used for object recognition and classification. This API supports feed-foward, single output neural networks and trains the networks using my implementation of the back propagation algorithm.</p><br />
I became interested in neural networks during a guest lecture for an artificial intellegence class that I was taking.
<br/><br/>

I was able to act on my interest by researching more into neural networks, especially into their history and use. 
I wrote a paper on what I had learned, which can be found
<a href='../Documents/Neural Networks.pdf'>here</a>.<br/><br/>

However, simply learning the history of these structures was not good enough for me.
I wanted to understand them at a fundamental level and the only way to do that was to make one myself.
<br/><br/>

Although there are many APIs already in existance for neural networks. I knew I would learn more if I created one myself.
<br/><br/>

So I created a number of classes that, when utilized correctly, would make a neural network.
<br/><br/>

I believe that the most challenging part of the process was the evaluation of the neural network.
Unlike other data constructs, a neural network constantly changes its values in an attempt to find a local minima (Hopefully the answer to the question you are trying to solve),
however, that means the algorithm for calculating the correct values for each node is somewhat complicated.
<br/><br/>

To make matters worse, neural networks and the back-propagation algorithm can take many different forms. It was up to me to decide what forms I wanted for my API.
<br/><br/>

My finished product was able to emulate all basic logic gates including XOR, which is often used as a benchmark for neural networks.
<br/><br/>

The code for this API can be found
<a href='../Documents/Neural_Network.zip'>here</a>.
The .zip file also includes a README, detailing in more detail what the API is capable of, along with some example neural networks.	</div>
</body>
</html>
