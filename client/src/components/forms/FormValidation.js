export default function validate(values) {
  console.log("starting validation with these VALUES: ", values);
  let errors = {};

  //email
  if (values.emailId !== undefined && values.emailId == "") {
    errors.emailId = "Email address is required";
  } else if (
    values.emailId &&
    values.emailId &&
    !/\S+@\S+\.\S+/.test(values.emailId)
  ) {
    errors.emailId = "Email address is invalid";
  }

  //zip
  if (values.zip !== undefined && values.zip == "") {
    errors.zip = "Zip is required";
  } else if (values.zip && !/^[0-9]{5}(?:-[0-9]{4})?$/.test(values.zip)) {
    errors.zip = "Please enter a valid zip code";
  }

  //phone number
  if (values.contact !== undefined && values.contact == "") {
    errors.contact = "Phone number is required";
  } else if (
    values.contact &&
    !/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(values.contact) &&
    !/^[0-9]{10}$/.test(values.contact)
  ) {
    errors.contact = "Please enter a U.S. phone number with area code.";
  }

  //dob

  if (values.dob !== undefined && values.dob == "") {
    errors.dob = "Please enter a valid Date of Birth.";
  } else if (
    values.dob &&
    !/(?:(?:0[1-9]|1[0-2])[/\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[/\-. ]?30)|(?:(?:0[13578]|1[02])[/\-. ]?31))[/\-. ]?(?:19|20)[0-9]{2}/.test(
      values.dob
    )
  ) {
    errors.dob = "Please enter a valid Date of Birth.";
  } else {
    var birthday = +new Date(values.dob);
    var age = ~~((Date.now() - birthday) / 31557600000);
    if (values.dob !== undefined && age < 18) {
      errors.dob = "Player must be over 18.";
    }
  }

  // beach experience
  if (values.beachExperience !== undefined && values.beachExperience == "") {
    errors.beachExperience = "Beach experience is required";
  }

  //password
  if (values.password !== undefined) {
    if (values.password == "") {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters.";
    } else if (values.password.search(/[0-9]/) < 0) {
      errors.password = "Your password must contain at least one digit.";
    }
    var ltrTest = values.password.match(/[a-zA-Z]/);
    console.log("ltrTest: ", ltrTest);
    if (ltrTest !== null) {
      var ltr = values.password.match(/[a-zA-Z]/).pop();
      console.log("ltr: ", ltr);
      if (ltr.match(/[A-Z]/)) {
        errors.password =
          "Your uppercase letter can not be the first character in your password.";
      }
    }
    if (values.password.search(/[A-Z]/) < 0) {
      errors.password =
        "Your password must contain at least one uppercase letter.";
    }
    if (values.password.search(/[!@#$%^&*_=+-]/) < 0) {
      errors.password =
        "Your password must contain at least one special character.";
    }
    if (values.password !== values.passwordConfirm) {
      errors.password = "Passwords must match.";
    }
  }

  // Create League

  // league cost
  if (values.leagueCost !== undefined && values.leagueCost == "") {
    console.log("got leagueCost error");
    errors.leagueCost = "Cost is required";
  }

  // league day
  if (values.dayOfLeague !== undefined && values.dayOfLeague == "") {
    console.log("got dayOfLeague error");
    errors.dayOfLeague = "League Day is required";
  }

  // league time
  if (values.time !== undefined && values.time == "") {
    console.log("got time error");
    errors.time =
      "League Time is required. Different times can be set later at a division level.";
  }

  // league duration
  if (values.duration !== undefined && values.duration == "") {
    console.log("got duration error");
    errors.duration = "Duration is required";
  }

  //registration deadline
  if (
    values.registrationDeadline !== undefined &&
    values.registrationDeadline == ""
  ) {
    errors.registrationDeadline = "Please enter a valid date.";
  } else if (
    values.registrationDeadline &&
    !/(?:(?:0[1-9]|1[0-2])[/\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[/\-. ]?30)|(?:(?:0[13578]|1[02])[/\-. ]?31))[/\-. ]?(?:19|20)[0-9]{2}/.test(
      values.registrationDeadline
    )
  ) {
    errors.registrationDeadline = "Please enter a valid date.";
  } else {
    var reg = +new Date(values.registrationDeadline);
    var today = Date.now();
    console.log("today", today);
    console.log("reg", reg);
    if (today > reg) {
      errors.registrationDeadline = "Registration date can't be in the past.";
    }
  }

  //league start date
  if (values.startDate !== undefined && values.startDate == "") {
    errors.startDate = "Please enter a valid date.";
  } else if (
    values.startDate &&
    !/(?:(?:0[1-9]|1[0-2])[/\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[/\-. ]?30)|(?:(?:0[13578]|1[02])[/\-. ]?31))[/\-. ]?(?:19|20)[0-9]{2}/.test(
      values.startDate
    )
  ) {
    errors.startDate = "Please enter a valid date.";
  } else {
    var sd = +new Date(values.startDate);
    var today = Date.now();
    console.log("today", today);
    console.log("start", sd);
    if (today > sd) {
      errors.startDate = "Start date can't be in the past.";
    }
  }

  // league format
  if (values.format !== undefined && values.format == "") {
    console.log("got format error");
    errors.format = "League format is required.";
  }

  // league type
  if (values.type !== undefined && values.type == "") {
    console.log("got type error");
    errors.type = "Game Type is required";
  }

  // league gender
  if (values.gender !== undefined && values.gender == "") {
    console.log("got gender error");
    errors.gender = "Gender is required";
  }

  // league env
  if (values.environment !== undefined && values.environment == "") {
    console.log("got environment error");
    errors.environment = "Environment is required";
  }

  // league maxteams
  if (values.maxTeams !== undefined && values.maxTeams == "") {
    console.log("got maxTeams error");
    errors.maxTeams = "Gender is required";
  }

  // league preferredSurface
  if (values.preferredSurface !== undefined && values.preferredSurface == "") {
    console.log("got preferredSurface error");
    errors.preferredSurface = "Preferred Surface is required";
  }

  // league noofDivisions
  if (values.noofDivisions !== undefined && values.noofDivisions == "") {
    console.log("got noofDivisions error");
    errors.noofDivisions = "No. of Divisions is required";
  }

  // court - name
  if (values.courtName !== undefined && values.courtName == "") {
    console.log("got courtName error");
    errors.courtName = "Name is required";
  }

  // court - address 1
  if (values.addressLine1 !== undefined && values.addressLine1 == "") {
    console.log("got addressLine1 error");
    errors.addressLine1 = "Street address is required";
  }

  // court - city
  if (values.city !== undefined && values.city == "") {
    console.log("got city error");
    errors.city = "City is required";
  }

  // court - state
  if (values.state !== undefined && values.state == "") {
    console.log("got state error");
    errors.state = "State address is required";
  }

  // court - overall Rating
  if (values.overallRating !== undefined && values.overallRating == "") {
    console.log("got overallRating error");
    errors.overallRating = "Overall Rating address is required";
  }

  // court - net Rating
  if (values.netRating !== undefined && values.netRating == "") {
    console.log("got netRating error");
    errors.netRating = "Net Rating address is required";
  }

  // court - Num of courts
  if (values.noOfCourts !== undefined && values.noOfCourts == "") {
    console.log("got noOfCourts error");
    errors.noOfCourts = "Number of courts is required";
  }

  // court - LInes
  if (values.line !== undefined && values.line == "") {
    console.log("got line error");
    errors.line = "Lines is required";
  }

  // court - antenna
  if (values.antenna !== undefined && values.antenna == "") {
    console.log("got antenna error");
    errors.antenna = "Antennas is required";
  }

  // court - adjustableHeight
  if (values.adjustableHeight !== undefined && values.adjustableHeight == "") {
    console.log("got adjustableHeight error");
    errors.adjustableHeight = "Adjustable Height is required";
  }

  // court - publicRestroom
  if (values.publicRestroom !== undefined && values.publicRestroom == "") {
    console.log("got publicRestroom error");
    errors.publicRestroom = "Public Restroom is required";
  }

  // court - parking
  if (values.parking !== undefined && values.parking == "") {
    console.log("got parking error");
    errors.parking = "Parking is required";
  }

  console.log("errors obj: ", errors);

  return errors;
}
