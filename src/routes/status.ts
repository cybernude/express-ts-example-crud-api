'use strict';
import * as express from 'express';
const router = express.Router();

//import models to route
import { StatusModel } from '../models/status';
const statusModel = new StatusModel();

// ************* old style with promise then  *************

// get all record with query builder style
router.get('/', (req, res, next) => {
    let db = req.db;

    statusModel.list(db)
        .then((results: any) => {
            res.send({ ok: true, rows: results });
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
});

// get all record with raw query  style   
router.get('/raw', (req, res, next) => {
    let db = req.db;

    statusModel.listRaw(db)
        .then((results: any) => {
            res.send({ ok: true, rows: results[0] });
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
});

// get record with conditions with raw query style   
router.get('/search_raw/:status_id', (req, res, next) => {
    let db = req.db;
    let status_id = req.params.status_id;


    statusModel.searchRawCondition(db, status_id)
        .then((results: any) => {
            res.send({ ok: true, rows: results[0] });
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
});


// insert data with object data style     
router.post('/', (req, res, next) => {
    let db = req.db;
    let status_name = req.body.status_name;

    let datas: any = {
        status_name: status_name
    }

    statusModel.addData(db, datas)
        .then((results: any) => {
            res.send({ ok: true, rows: results[0] });
        })
        .catch(error => {
            res.send({ ok: false, error: error })
        })
});


// ************* new style with promise then  *************

// ค้นหา
router.get('/getstatus', async (req, res, next) => {
    let db = req.db;
    try {
        let liststatus = await statusModel.list(db);
        res.send(liststatus);
    } catch (error) {
        res.send({ ok: false, error: error });
    }
});

// ค้นหาแบบมีเงื่อนไข
router.get('/search/:status_id', async (req, res, next) => {
    let db = req.db;
    let status_id = req.params.status_id;

    try {
        let liststatus = await statusModel.whereid(db, status_id);
        res.send(liststatus);
    } catch (error) {
        res.send({ ok: false, error: error });
    }
});

// ลบ
router.delete('/:status_id', async (req, res, next) => {
    let db = req.db;
    let status_id = req.params.status_id;

    try {
        let delstatus = await statusModel.delete(db, status_id);
        res.send(delstatus);
    } catch (error) {
        res.send({ ok: false, error: error });
    }
});

export default router;