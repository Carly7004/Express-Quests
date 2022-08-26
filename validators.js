//Manual validation method


// const validateMovie = (req, res, next) => {
// const {title, director, year, color, duration } = req.body;

// if (title === null) {
//     res.status(422).send('title is require')
// } else if(director === null) {
//     res.status(422).send('director is require')
// } else if(year === null) {
//     res.status(422).send('year is require')
// } else if(color === null) {
//     res.status(422).send('color is require')
// } else if(duration === null) {
//     res.status(422).send('duration is require')
// } else {
//     next();
// }
// }



// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;

//   if (!title || title.length < 3) {
//     res.status(422).send("title is require and must contain more than 3 characters");
//   }
//   if (!director || director.length < 3) {
//     res.status(422).send("director is require and must contain more than 3 characters");
//   }
//   if (!year || year.length < 3) {
//     res.status(422).send("year is require and must contain more than 3 characters");
//   }
//   if (!color || color.length < 3) {
//     res.status(422).send("color is require and must contain more than 3 characters");
//   }
//   if (!duration || duration.length < 3) {
//     res.status(422).send("duration is require and must contain more than 3 characters");
//   } 

// };


// const validateMovie = (req, res, next) => {
//     const { title, director, year, color, duration } = req.body;
//     const errors = [];
  
//     if (!title || title.length >= 255) {
//       errors.push({ field: "title", message: "This field is required" });
//     }
//     if (!director || director.length >= 255) {
//       errors.push({ field: "director", message: "This field is required" });
//     }
//     if (!year || year.length >= 255) {
//       errors.push({ field: "year", message: "This field is required" });
//     }
//     if (!color || color.length >= 255) {
//       errors.push({ field: "color", message: "This field is required" });
//     }
//     if (!duration || duration.length >= 255) {
//       errors.push({ field: "duration", message: "This field is required" });
//     }
   
//     if (errors.length) {
//       res.status(422).json({ validationErrors: errors });
//     } else {
//       next();
//     }
//   };


//USING JOI VALIDATOR API/APP

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const moviesSchema = Joi.object({
    title: Joi.string().email().max(255).required(),
    director: Joi.string().max(255).required(),
    year: Joi.number().integer().max(4).required(),
    color: Joi.string().max(255).required(),
    duration: Joi.number().integer().max(3).required(),
  });
  
  const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
  
    const { error } = moviesSchema.validate(
        { title, director, year, color, duration },
      { abortEarly: false }
    );
  
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  };

  // USING EXPRESS-VALIDATOR PACKAGE/MIDDLEWARE

// const { body, validationResult } = require('express-validator');

// const validateUser = [
//   body("email").isEmail(),
//   body("firstname").isLength({ max: 255 }),
//   body("lastname").isLength({ max: 255 }),
//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
// ];

module.exports = {
  validateMovie,
  validateUser
};
