import { User } from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postUserController = async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
    });
    const response = await newUser.save();
    delete response._doc.password;

    if (response) {
      return res.json({
        status: 'success',
        message: 'Created successfully',
        data: response,
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Opps!! something went wrong',
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validate input
    if (!email && !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'email or password can not be empty',
      });
    }
      //find user
      const authUser = await User.findOne({ email });

      if (!authUser) {
        return res.status(400).json({
          status: 'fail',
          massage: 'User not found',
        });
      }
     
      //compare password
      const isMatch = await bcrypt.compare(password, authUser.password);
      delete isMatch.password
      if (isMatch) {
        const payload = {
          id: authUser.id,
          email: authUser.email,
        };
        //create token
    
        const authToken = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        return res.status(200).json({
          status: 'success',
          massage: 'success',
          token: 'Bearer ' + authToken,
        });
      }
      return res.status(400).json({
        status: "fail",
        message: "email or password not correct"
      })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      err,
    });
  }
}


export const verify = async(req, res, next) => {
  //check for authorization token
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });

  let bearerToken = token.split(' ')[1];

  await jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decode) => {
    if (err)
      return res
        .status(500)
        .json({ status: false, message: 'Failed to authenticate token.' });
    next();
  });
  return res.json(401).json({
    status: 'fail',
    massage: 'unauthorized',
  });
};