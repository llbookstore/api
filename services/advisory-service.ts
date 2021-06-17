
import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
//db
import sequelize from '../config/connectDB';
import * as db from '../models/init-models';
//config
import normalConfig from '../config/normal';
import { returnSuccess, returnError, getCurrentTimestamp, timestampToDate, isNumeric } from '../utils/common';
import { LooseObject } from '../types/types';
const { advisory } = db.initModels(sequelize);
export async function getAdvisory(req: Request, res: Response, next: NextFunction) {
    try {
        let { q = '', time_start, time_end, status, current_page, row_per_page } = req.query;
        const limit = parseInt(row_per_page as string) || normalConfig.row_per_page;
        let offset = 0;
        if (current_page && isNumeric(current_page as string)) {
            offset = (parseInt(current_page as string) - 1) * limit;
        }

        const condition: LooseObject = {
            [Op.or]: [
                { username: { [Op.substring]: q } },
                { phone: { [Op.substring]: q } },
            ]
        };
        if (status && parseInt(status as string) > -1) condition.status = status;
        if (time_start && time_end) {
            condition.created_at = { [Op.between]: [parseInt(time_start as string), parseInt(time_end as string)] }
        }
        else if (time_start) {
            condition.created_at = { [Op.gte]: parseInt(time_start as string) }
        }
        else if (time_end) {
            condition.created_at = { [Op.lte]: parseInt(time_end as string) }
        }

        const get_advisory = await advisory.findAndCountAll({
            where: condition,
            limit: limit,
            offset: offset,
            distinct: true,
            order: [['advisory_id', 'DESC']],
        });
        get_advisory.rows.map((item: any) => {
            if (item.dataValues.created_at)
                item.dataValues.created_at = timestampToDate(item.dataValues.created_at, 'DD/MM/YYYY LT');
            return item;
        })

        return res.json(returnSuccess(200, 'OK', get_advisory, req.path));
    } catch (err) {
        console.log(err);
        return res.json(returnError(500, err.message, {}, req.path));
    }
}
export async function requestAdvisory(req: Request, res: Response, next: NextFunction) {
    const path = req.path;
    try {
        const { username, phone, user_note, address } = req.body;
        if (!username || !phone || !user_note) return res.json(returnError(500, 'invalid input', {}, path));
        const advisoryData: LooseObject = { username, phone, user_note, address };
        try {
            const item = await advisory.build(advisoryData);
            const validatedItem = await item.validate();
        } catch (err) {
            console.log(err);
            return res.json(returnError('500', err.message, {}, path));
        }

        advisoryData.created_at = getCurrentTimestamp();
        const advisory_new = await advisory.create(advisoryData);
        return res.json(returnSuccess(200, 'request a advisory', advisory_new, path))

    } catch (err) {
        console.log(err);
        return res.json(returnError('500', err.message, {}, path));

    }
}

export async function responseAdvisory(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { status, note = '' } = req.body;
        if (status < 0) {
            return res.json(returnError(500, 'invalid input', {}, req.path));
        }
        const { userId, username } = req.userData;
        const findAdvisoryWithId = await advisory.findOne({ where: { advisory_id: id } });
        if (!findAdvisoryWithId) {
            return res.json(returnError(500, 'can not find this advisory', {}, req.path));
        }

        let { handle_history } = findAdvisoryWithId;
        const handleAt = getCurrentTimestamp();
        const handleAdvisory = {
            admin_id: userId,
            admin_name: username,
            note,
            status,
            handled_at: handleAt
        }
        const newHandleHistory = handle_history ? [...JSON.parse(handle_history), handleAdvisory] : [handleAdvisory];
        const updateAdvisory = { status, handle_history: JSON.stringify(newHandleHistory) };

        const resAdvisory = await advisory.update(updateAdvisory, { where: { advisory_id: id } });
        return res.json(returnSuccess(200, 'ok', resAdvisory, req.path));

    } catch (err) {
        console.log(err);
        return res.json(returnError(500, err.message, {}, req.path));
    }
}
