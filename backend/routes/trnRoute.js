import express from 'express'
import { addTransaction, getBarChartData, getCombinedData, getPieChartData, getStatistics, listTransactions } from '../controllers/trnController.js'



const trnRouter = express.Router()

trnRouter.post('/add', addTransaction)
trnRouter.get('/list', listTransactions)
trnRouter.get('/statistics', getStatistics)
trnRouter.get('/barchart', getBarChartData)
trnRouter.get('/piechart', getPieChartData)
trnRouter.get('/combineddata', getCombinedData)






export default trnRouter