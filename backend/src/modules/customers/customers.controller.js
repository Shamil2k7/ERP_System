import customerService from "./customers.service.js";

export const createCustomer = async (req, res) => {

  try {

    const customer = await customerService.createCustomer(req.body);

    res.status(201).json({
      success: true,
      data: customer,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const getCustomers = async (req, res) => {

  try {

    const customers = await customerService.getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};