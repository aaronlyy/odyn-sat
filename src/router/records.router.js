import express from 'express';
import {
  controllerRecordsDelete,
  controllerRecordsPatch,
} from '../controller/records.controller.js';

const routerRecords = express.Router();

routerRecords.patch('', controllerRecordsPatch);
routerRecords.delete('', controllerRecordsDelete);

export default routerRecords;