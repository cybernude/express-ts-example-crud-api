"use strict";
import { Knex, knex } from 'knex'

export class StatusModel {

    //query builder style
    list(knex: Knex) {
        return knex('status')
            .orderBy('status_id', 'ASC');
    }


    // query builder with async style
    async listbuilder(knex: Knex) {
        return knex('status')
            .orderBy('status_id', 'ASC');
    }


    //raw query style
    listRaw(knex: Knex) {
        let sql = ` 
    select * from status order by status_id asc
   `;
        return knex.raw(sql);
    }

    // ค้นหาแบบมีเงื่อนไข
    // query builder style
    // select * from status where status_id = ?
    whereid(knex: Knex, status_id: any) {
        return knex('status')
            .where('status_id', status_id)
    }

    // raw query style
    searchRawCondition(knex: Knex, status_id) {
        let sql = ` 
    select * from status where status_id = ?
   `;
        return knex.raw(sql, [status_id]);
    }

    // การลบข้อมูลแบบมีเงื่อนไข
    delete(knex: Knex, status_id: any) {
        return knex('status')
            .where('status_id', status_id)
            .del()
    }


    // การ Update ข้อมูลแบบมีเงื่อนไข
    // ถ้าเป็นคำสั่ง SQL คือ 
    // update status set status_name = ? where status_id = ?
    update(knex: Knex, status_id: any, status_name: any) {
        return knex('status')
            .where('status_id', status_id)
            .update('status_name', status_name)
    }

    // การ update แบบ raw query
    updateraw(knex: Knex, status_id: any, status_name: any) {
        let sql = ` 
        update status set status_name = ? where status_id = ?
   `;
        return knex.raw(sql, [status_name, status_id]);
    }

    // เพิ่มข้อมูล
    addData(knex: Knex, Datas: any) {
        return knex('status')
            .insert(Datas)
    }



}