var restify = require('restify');
var botbuilder = require('botbuilder');

// setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3987, function(){
	console.log('%s bot started at %s', server.name, server.url);
});


// create chat connector
var connector = new botbuilder.ChatConnector({
	appId: process.env.APP_ID,
	appPassword: process.env.APP_SECRET
});


// listening for user inputs
server.post('/api/messages', connector.listen());

// Reply by echoing 
var bot = new botbuilder.UniversalBot(connector, [
	function(session){
		session.beginDialog('greetings');
	},
	// function(session, generic) {
    //     botbuilder.Prompts.text(session, `${generic.temp}`);
    //     session.endConversation("A une prochaine !");
    // }
]);

bot.dialog('greetings', [
	function (session) {	
		session.beginDialog('askName');
	},
	function (session, results ) {
	// function (session, generic ) { 
		// session.endDialogWithResult(generic);
		session.endDialog(`Bonjour ${results.response}`);		
	}
]);

bot.dialog('askName', [
	function (session) {
		botbuilder.Prompts.text(session, 'Hi! What is your name?');
	},
	function(session, results) {
		// var temp = "test";
        // var generic = {
        //     temp: temp,
        //     results: results
        // };
        // session.endDialogWithResult(generic);
		session.endDialogWithResult(results);
	}
]);




