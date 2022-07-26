//jshint esversion:6
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const bcrypt = require("bcrypt");
//const saltRounds = 10;
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const loginContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const signupContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const studentHomeContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const profileContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "A long string.",
		resave: false,
		saveUninitialized: true,
		//cookie: { secure: true }
	})
);

app.use(passport.initialize());
app.use(passport.session());

//local database
//mongoose.connect("mongod://localhost:27017/userDB", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://username:test123@cluster0.ibx2j.mongodb.net/usersDB", { useNewUrlParser: true });
//adding in multiple databases
// var Mongoose = require('mongoose').Mongoose;

// var instance1 = new Mongoose();
// instance1.connect('foo');

// var instance2 = new Mongoose();
// instance2.connect('bar');

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstname: String,
	lastname: String,
	class: String,
	number: String,
});

userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

app.get("/", function (req, res) {
	res.render("index", { startingContent: homeStartingContent });
});

app.get("/home", function (req, res) {
	res.render("indexLoggedIn", { startingContent: homeStartingContent });
});

app.get("/about", function (req, res) {
	res.render("about", { aboutContent: aboutContent });
});

app.get("/about1", function (req, res) {
	res.render("aboutLoggedIn", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
	res.render("contact", { contactContent: contactContent });
});

app.get("/contact1", function (req, res) {
	res.render("contactLoggedIn", { contactContent: contactContent });
});

app.get("/login", function (req, res) {
	res.render("login", { loginContent: loginContent });
});

app.get("/register", function (req, res) {
	res.render("register", { signupContent: signupContent });
});

app.get("/registerNew", function (req, res) {
	res.render("registerNew", { signupContent: signupContent });
});

// app.get("/studentHome", function(req, res, next) {

//     console.log(res.locals)
//     User.findOne({ "email": app.locals.username }, function(err, foundUsers) {
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUsers) {
//                 console.log(foundUsers)
//                 res.render("studentHome", { user: foundUsers });
//             }
//         }
//     });
// });

app.get("/details", function (req, res) {
	User.find({}, function (err, users) {
		if (err) throw err;
		// object of all the users
		res.render("details", { users: users });
	});
});

app.get("/profile", function (req, res) {
	res.render("profile", {
		user: req.user,
	});

	//res.render("profile", { profileContent: profileContent });

	// User.find({ "firstname": { $ne: null } }, function(err, foundUsers) {
	//     if (err) {
	//         console.log(err);
	//     } else {
	//         if (foundUsers) {
	//             console.log(foundUsers)
	//             res.render("profile", { users: foundUsers });
	//         }
	//     }
	// });
});

app.post("/delete/:id", function (req, res) {
	const requestedPostId = req.params.id;

	User.findOneAndDelete(req.params.id, (err) => {
		if (!err) {
			res.redirect("/details");
		} else {
			console.log("Failed to delete user: " + err);
		}
	});
});

app.post("/register", function (req, res) {
	User.register({ username: req.body.username }, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			res.redrect("/register");
		} else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/studentHome");
			});
		}
	});
});

app.post("/login", function (req, res) {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});

	req.login(user, function (err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/studentHome");
			});
		}
	});
});

app.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.post("/updateProfile", function (req, res) {
	const userFirstName = req.body.firstname;
	const userLastName = req.body.lastname;
	const userClass = req.body.class;
	const userNumber = req.body.number;

	User.findById(req.user.id, function (err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			if (foundUser) {
				foundUser.firstname = userFirstName;
				foundUser.lastname = userLastName;
				foundUser.class = userClass;
				foundUser.number = userNumber;
				foundUser.save(function () {
					res.redirect("/studentHome");
				});
			}
		}
	});
});

app.post("/newAccount", function (req, res) {
	const userName = req.body.username;
	const userFirstName = req.body.firstname;
	const userLastName = req.body.lastname;
	const userClass = req.body.class;
	const userNumber = req.body.number;
	//sconsole.log(userFirstName);
	if (userNumber.length < 9) {
		console.log("number at least 9 digits");
	}
	User.findOne({ firstname: req.body.firstname }).exec((err, user) => {
		console.log(user);
		console.log("This is printed");
		if (user) {
			console.log("email already registered");
			res.render("registerNew");
		}
	});
	User.register(
		{
			username: userName,
			firstname: userFirstName,
			lastname: userLastName,
			class: userClass,
			number: userNumber,
		},
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				res.render("registerNew");
			} else {
				passport.authenticate("local")(req, res, function () {
					res.redirect("/studentHome");
				});
			}
		}
	);

	// User.findById(req.user.id, function(err, foundUser) {
	//     if (err) {
	//         console.log(err);
	//     } else {
	//         if (foundUser) {
	//             foundUser.firstname = userFirstName;
	//             foundUser.lastname = userLastName;
	//             foundUser.class = userClass;
	//             foundUser.number = userNumber;
	//             foundUser.save(function() {
	//                 res.redirect("/studentHome");
	//             });
	//         }
	//     }
	// });
});

app.get("/studentHome", (req, res) => {
	res.render("studentHome", {
		user: req.user,
	});
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server started on port 3000");
});
