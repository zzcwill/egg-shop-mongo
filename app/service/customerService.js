'use strict';

const Service = require('egg').Service;

class CustomerService extends Service {
  async allList() {
    const { Customer } = this.ctx.model;

    let whereData = {}
    const opts = { 
      sort: {
        create_time: -1
      } 
    };
    let rows = await Customer.find(whereData, '', opts).exec();

    return {
      list: rows
    }
  } 
  async list(search) {
    const { Customer } = this.ctx.model;
    const { page, pageSize } = search;
    let offset = (page - 1) * pageSize;
    
    let whereData = {}
    const opts = { 
      skip: offset, 
      limit: pageSize, 
      sort: {
        create_time: -1
      } 
    };
    let customerList = await Customer.find(whereData, '', opts).exec();

    return {
      list: customerList,
      count: customerList.length
    }
  }
  async add(customer) {
    const { Customer } = this.ctx.model;

    let query = {};
    const opts = { 
      skip: 0, 
      limit: 1, 
      sort: {
        id: -1
      } 
    };
    let maxCustomer = await Customer.find(query, '', opts).exec();

    if(maxCustomer.length === 0) {
      customer.id = 1;
    }
    if(maxCustomer.length !== 0) {
      customer.id = maxCustomer[0].toObject().id + 1;
    }

    let tocustomer = new Customer(customer)
    let newCustomer = await tocustomer.save()
    return newCustomer
  }
  async update(search) {
    const { Customer } = this.ctx.model;
		let { id, name, phone, address } = search;

    let updateData = {
      name,
      phone,
      address
    }
    const query = { id: id };
    const update = { $set: { name, phone, address } };
    let isOk = await Customer.update(query, update, { multi: true }).exec();

    return isOk.n
  }
	async delete(search) {
    const { Customer } = this.ctx.model;
		let { id } = search;
    let query = { id: id }

    let result = {
      error: {},
      isOK: 0
    }
    let toDo = await Customer.deleteOne(query).exec();
    
    result.isOk = toDo.n

    return result	
	}  
}

module.exports = CustomerService;

