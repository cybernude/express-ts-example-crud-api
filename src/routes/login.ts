import { Router, Request, Response } from 'express';
// import * as moment from 'moment';
import { JwtModel } from '../models/jwt';
const jwtModel = new JwtModel();
const router: Router = Router();
import * as crypto from 'crypto';



import { LoginModel } from '../models/login';
const loginModel = new LoginModel();

// login with hash password

router.post('/', async (req, res, next) => {
    let db = req.db;
    let username = req.body.username;
    let password = req.body.password;


    try {
      let res_login = await loginModel.login(db, username, password);
    
      console.log(res_login);

      if (res_login[0]) {

        let results: any;  
        res.send({ ok: true, results : res_login });
      } else {
        res.send({ ok: false, error: `status: error` });
      }
    } catch (error) {
      res.send({ ok: false, error: error });
    }
  });


//login with plain text
  
  router.post('/hash', async (req, res, next) => {
    let db = req.db;
    let username = req.body.username;
    let password = req.body.password;
 
    const encPassword = crypto.createHash('sha512').update(password).digest('hex');


    try {
      let res_login = await loginModel.login(db, username, encPassword);
    
      console.log(res_login);

      if (res_login[0]) {

        let results: any;  
        res.send({ ok: true, results : res_login });
      } else {
        res.send({ ok: false, error: `status: error` });
      }
    } catch (error) {
      res.send({ ok: false, error: error });
    }
  });


//login with token
  
  router.post('/token', async (req, res, next) => {
    let db = req.db;
    let username = req.body.username;
    let password = req.body.password;
  
    const encPassword = crypto.createHash('sha512').update(password).digest('hex');


    try {
      let res_login = await loginModel.login(db, username, encPassword);

      if (res_login[0]) {
        let payload: any = {};
        let token = jwtModel.sign({ res_login });
        payload.gateway_token = token;
        payload.info = res_login;  
        res.send({ ok: true, payload });
      } else {
        res.send({ ok: false, error: `status: error` });
      }
      // res.send(payload);
    } catch (error) {
      res.send({ ok: false, error: error });
    }
  });

export default router;