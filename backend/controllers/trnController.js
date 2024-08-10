import transactionModel from "../models/trnModel.js";
import { ranges } from "../utils/utils.js";

// Add Transaction
const addTransaction = async (req, res) => {
  const transaction = new transactionModel({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    sold: req.body.sold,
    dateOfSale: req.body.dateOfSale,
  });
  try {
    await transaction.save();
    res.json({ success: true, message: "Transaction added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List Transactions
const listTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  try {
    const query = {
      dateOfSale: { $regex: new RegExp(`-${month}-`, "i") },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const searchNumber = Number(search);

    if (!isNaN(searchNumber)) {
      query.$or.push({ price: searchNumber });
    }

    const trns = await transactionModel
      .find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const total = await transactionModel.countDocuments(query);
    res.json({ trns, total, page, perPage });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// get Statistics
const getStatistics = async (month) => {
  try {
    const paddedMonth = month.padStart(2, "0");

    console.log("seraching trns for the month", paddedMonth);

    const trns = await transactionModel.find({
      dateOfSale: { $regex: `-${paddedMonth}-` },
    });

    const totalSales = trns.reduce((acc, transaction) => {
      return acc + (transaction.sold ? transaction.price : 0);
    }, 0);

    const soldItems = trns.filter((trn) => trn.sold).length;

    const notSoldItems = trns.filter((trn) => !trn.sold).length;

    return { totalSales, soldItems, notSoldItems };
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// Bar Chart Data
const getBarChartData = async (month) => {
  try {
    const paddedMonth = month.padStart(2, "0");
    const query = {
      dateOfSale: { $regex: `-${paddedMonth}-` },
    };
    const chartData = await Promise.all(
      ranges.map(async (range) => {
        const count = await transactionModel.countDocuments({
          ...query,
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );
    return chartData;
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// Pie Chart Data
const getPieChartData = async (month) => {
  try {
    const paddedMonth = month.padStart(2, "0");
    const query = {
      dateOfSale: { $regex: `-${paddedMonth}-` },
    };
    const pieChartData = await transactionModel.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    return pieChartData;
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// Combine All Api data to one
const getCombinedData = async (req, res) => {
  const { month } = req.query;
  try {
    const [statistics, barchart, piechart] = await Promise.all([
      getStatistics(month),
      getBarChartData(month),
      getPieChartData(month),
    ]);

    const combinedData = {
      statistics,
      barchart,
      piechart,
    };

    res.json(combinedData);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export {
  addTransaction,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
