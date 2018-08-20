//============================================
// Script for Desktop and mobile also
//============================================
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var tableName = "facebookDB";
var request = window.indexedDB.open("newDatabase", 1);

request.onupgradeneeded = function(event) {
	console.log("running onupgradeneeded");
	var db = event.target.result;

	//Create Table
	  if(!db.objectStoreNames.contains(tableName)) {
	    console.log("I need to make the table : " + tableName +" objectstore");
	    var objectStore = db.createObjectStore(tableName, 
	        { keyPath: "userId" });
	  }
}

request.onerror = function(event) {
	console.log("error: in IndexedDB");
};

request.onsuccess = function(event) {
	db = request.result;
	console.log("success: "+ db);
};
request.onerror = function(event) {
	console.log("error: ");
	Location.reload();
};

var intervalForScroll = '';
var liObj = document.querySelectorAll('._698');
var liLength = liObj.length;
var scrollTime = 1;
var fbFriendLogIn = new Array();
var fbFriendLogInUser = new Array();
var loaderImage = 'https://www.creditmutuel.fr/cmne/fr/banques/webservices/nswr/images/loading.gif';
var elem = document.createElement('div'); // Create Div for Loader
elem.style.cssText = 'position:fixed;width:100%;height:100%;opacity:0.3;z-index:100;background:url("'+loaderImage+'") no-repeat center center rgba(0,0,0,0.25)';
elem.setAttribute("id", "facebookLoaderByQbix");
var container = document.body;
container.insertBefore(elem, container.firstChild); //Append in body Of facebook
var mutualFriend  = window.open();
var relationshipObj = null;
var facebookLoder = document.getElementById('facebookLoaderByQbix'); // Get Facebook loader div
var genderObj = null;
var profileLink = null;
var getScroll = function(){ // Start Scrolling Interval For get friends of Logged In User
	window.scrollTo(0,document.body.scrollHeight); // Scroll 
	var allLoad = setTimeout(function (){ // Set Timeout for load user friends
		if(scrollTime){ // Set Variable for continue to scroll 
			var newLength = document.querySelectorAll('._698').length;
			if(liLength != newLength){ // check the length of loaded friend and previously get Friend
				liLength = newLength; 
			}else{
				scrollTime = 0; //Stop Scroll 
			}
		}
	},5000);
	if(!scrollTime){ // complete get logged in users Friend
	try { 			// Start geting Friends of Logged In User
		var liObj = document.querySelectorAll('._698'); //get All user friend object li
		for(var i = 0; i < liObj.length; i++) {
			var userName = liObj[i].querySelectorAll('._6a div.fsl.fwb.fcb a'),
			friendUserId = liObj[i].querySelectorAll('.FriendRequestFriends');
			frienduserIDdone = friendUserId[0].dataset.profileid;

			var userObj = new Object(); // User Object for user data
			userObj = {				
				name :  userName[0].innerHTML,
				userId: friendUserId[0].dataset.profileid,
				mutualFriend : new Array(),
				relationship : relationshipObj,
				gender : genderObj,
				url : "https://mobile.facebook.com/profile.php?v=friends&id="+frienduserIDdone
			};
			fbFriendLogIn.push(userObj); //push to main user object

			if (userObj != null) {
				var request = db.transaction([tableName], "readwrite")
				.objectStore(tableName)
				.add(userObj);

		       	request.onsuccess = function(event) {
		          	console.log("New record has been added to your database.");
		       	};
		       
		       	request.onerror = function(event) {
	         	 	console.log("Unable to add record.\r\nIt is aready exist in your database! ");
		       	}
	       	}
		}
	} catch(err) {
	    console.log(err.message);
	}
	// End geting Friends of Logged In User
	// Start Getting Friend of Friend
		var index = 0;
		var intervalForMutualFriend = null;
		var fbFriendLogInUser = new Array();
		var getMutualFriend = function(){ // Set interval for load friends of friend list
			
			clearInterval(intervalForMutualFriend);
			if(index < fbFriendLogIn.length){ //Check logged in user length for stop to loading friends of friend list currently it checks for 1
				var userFriend = new Object()
				userFriend = fbFriendLogIn[index];
				mutualFriend.location = mutualFriend.location;
				mutualFriend.location = userFriend.url; //set location for window open
				var getMutualFreindFromWindow = setTimeout(function (){  // Set timeout for load current page
					mutualFriend.addEventListener('load', loadWindow(fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow), false); // Event listener after load page 
					index = index + 1;
				}, 5000);
			}else{
				mutualFriend.close(); //when users friend list complete then close the tab
				mutualFriend.parent.focus(); // Focus to parent tab
				console.log(fbFriendLogIn); // result in console
				facebookLoder.style.visibility = "hidden"; // hide loader
			}
		}
		
		intervalForMutualFriend = setInterval(getMutualFriend, 3000); //Interval for new friend load
		var loadWindow = function (fbFriendLogIn,index,mutualFriend,getMutualFreindFromWindow) { // eventlistener function which grab data from friends 
			var userFriend = fbFriendLogIn[index];
			var mutualFriendDom = mutualFriend.document; // get document from popup
			var elemmentForFreinds = document.createElement('div'); //create loader div
			elemmentForFreinds.style.cssText = 'position:fixed;width:100%;height:100%;opacity:0.3;z-index:100;background:url("'+loaderImage+'") no-repeat center center rgba(0,0,0,0.25)';
			elemmentForFreinds.setAttribute("id", "facebookLoaderByQbix");
			var containerFrienOfFrienLoader = mutualFriendDom.body; 
				containerFrienOfFrienLoader.insertBefore(elemmentForFreinds, containerFrienOfFrienLoader.firstChild); //append loader
			var liObjForMutualFriend = mutualFriendDom.querySelectorAll('div.timeline div._55wp._4g33._5pxa'); //grab count for friends li
			var liObjForMutualFriendLength = liObjForMutualFriend.length;
			var intervalForScrollForMutualFriend = '';
			var scrollTimeMutualFreind = 1;
			var getScrollMutualFreind = function() { //set interval for scroll in friends tab
				mutualFriend.scrollTo(0, mutualFriendDom.body.scrollHeight); //scroll
				var allLoadMutualFriend = setTimeout(function (){ // Set timeout for scroll load
					if(scrollTimeMutualFreind){ // Set variable for check scroll complete 
						var newLength = mutualFriendDom.querySelectorAll('div.timeline div._55wo._55x2').length;
						if(liObjForMutualFriendLength != newLength){ // Check length for friends of friends
							liObjForMutualFriendLength = newLength;
						}else{
							scrollTimeMutualFreind = 0;
						}
					}
				},10000);
			try {
				if(scrollTimeMutualFreind == 0) { // scroll stops
					clearTimeout(allLoadMutualFriend); // Clear Timeout for scroll in friends tab
					mutualFriendGetObj = mutualFriendDom.querySelectorAll('div.timeline div._55wp._4g33._5pxa'); //get friends li of friend
					var friendOfFriends = new Array();
					for(var j = 0; j < mutualFriendGetObj.length; j++){
						var mutualFriendUserName = mutualFriendGetObj[j].querySelectorAll('div._4g34._5pxb._5i2i._52we ._52jh._5pxc a'),
							mutualuserFriendLink = mutualFriendUserName[0].href;
						var userMutual = {
							name :  mutualFriendUserName[0].innerText,
							profileLink : mutualuserFriendLink
						}
						userFriend.mutualFriend.push(userMutual);
					}
					var transactions = db.transaction([tableName], 'readwrite');
					var objectStores = transactions.objectStore(tableName);

					var request = objectStores.put(userFriend);

					request.onsuccess = function() {
			          	console.log('update Mutual Friends in indexed DB ...........');
			        };	
					fbFriendLogInUser[index] = userFriend; // set to array
					clearTimeout(getMutualFreindFromWindow);// clear timeout for loading page content 
					clearInterval(intervalForScrollMutualFriend);// clear interval for scroll
					intervalForMutualFriend = setInterval(getMutualFriend, 1500); //Interval for new friend load		
				}
			} catch(err) {
				console.log('error: get Mutual Friends ...');
			    console.log(err.message);
			}
			// ======================================
			// START : to get a Relationship Status and Gender from Friends
			// ======================================
			try {
				var aboutLink = userFriend.url;
				mutualFriend.location = mutualFriend.location;
				mutualFriend.location = aboutLink.replace("friends", "info"); // create a new about page url for each friend
				if ( mutualFriend.document.querySelectorAll('div#basic-info').length > 0 ) {
					if ( mutualFriend.document.querySelectorAll('div#basic-info')) {
						genderObj = mutualFriend.document.querySelectorAll('div#basic-info div._55x2._5ji7 div[title="Gender"] div._5cdv.r')[0].innerText;	
					}

					if (mutualFriend.document.querySelectorAll('div#relationship').length > 0) {
						realtionObj = mutualFriend.document.querySelectorAll('div#relationship div._55x2._5ji7 div._5cds')[0].innerText;
					}

					userFriend.relationship = realtionObj;
					userFriend.gender = genderObj;
					var transactions = db.transaction([tableName], 'readwrite');
					var objectStores = transactions.objectStore(tableName);

					var request = objectStores.put(userFriend);

					request.onsuccess = function() {
			          	console.log('update Relationship Status and Gender in indexed DB ...........');
			        };					
				}
			} catch(err) {
				console.log('error: get Relationship Status and Gender...');
			    console.log(err.message);
			}
			// ====================================
			// END : to get a  Relationship Status and Gender from Friends
			// ====================================
			}
			intervalForScrollMutualFriend = setInterval(getScrollMutualFreind, 1500); //set interval for scroll in friends tab
		}
		//End Getting Friend of friend
		clearInterval(intervalForScroll);// clear interval for logged in user scroll
		clearTimeout(allLoad);// clear timeout for logged in user scroll
	}
}

intervalForScroll = setInterval(getScroll, 5000);// set interval for logged in user scroll