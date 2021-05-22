'use strict';

const Service = require('egg').Service;

class CustomerService extends Service {
  async allList() {
    const { Customer } = this.ctx.model;

		const rows = await Customer.findAll({
			where: {},
      raw:true
		});

    return {
      list: rows
    }
  } 
  async list(search) {
    const { Customer } = this.ctx.model;
    const { page, pageSize } = search;
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Customer.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize,
      raw:true
		});

    return {
      list: rows,
      count: count
    }
  }
  async add(customer) {
    const { Customer } = this.ctx.model;
    let newCustomer = await Customer.create(customer)
    return newCustomer
  }
  async update(search) {
    const { Customer } = this.ctx.model;
		let { id, name, phone, address } = search;

    let isOk = await Customer.update(
      {
				name: name,
				phone: phone,
				address: address
			},
      {
        //条件
        where: {
					id: id
				}
      }
    )
    return isOk[0]
  }
	async delete(search) {
    const { Customer } = this.ctx.model;
		let { id } = search;
		let isOk = await Customer.destroy({
			where: {
				id: id
			}
		})
    return isOk		
	}  
}

module.exports = CustomerService;

